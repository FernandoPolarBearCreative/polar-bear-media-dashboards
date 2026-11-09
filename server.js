const crypto = require("crypto");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { OAuth2Client } = require("google-auth-library");
const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");

const app = express();
const secretManager = new SecretManagerServiceClient();

const PORT = Number(process.env.PORT || 8080);
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT;
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const SESSION_SECRET = process.env.SESSION_SECRET;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;
const OAUTH_REDIRECT_URI = process.env.OAUTH_REDIRECT_URI;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "google-oauth-refresh-token";
const ALLOWED_DOMAIN = process.env.ALLOWED_DOMAIN || "polarbearcreative.com";
const GOOGLE_ADS_API_VERSION = process.env.GOOGLE_ADS_API_VERSION || "v25";
const META_GRAPH_API_VERSION = process.env.META_GRAPH_API_VERSION || "v26.0";
const META_ACCESS_TOKEN_SECRET = process.env.META_ACCESS_TOKEN_SECRET || "meta-access-token";
const META_ALLOWED_AD_ACCOUNTS = new Set(
  String(
    process.env.META_ALLOWED_AD_ACCOUNTS ||
      "913601552530100,2880495615400590,1462400408056476,4250540271898801",
  )
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean),
);
const SESSION_TTL_SECONDS = 60 * 60 * 12;

const required = {
  GOOGLE_CLOUD_PROJECT: PROJECT_ID,
  GOOGLE_CLIENT_ID: CLIENT_ID,
  GOOGLE_CLIENT_SECRET: CLIENT_SECRET,
  SESSION_SECRET,
  FRONTEND_ORIGIN,
  OAUTH_REDIRECT_URI,
};

for (const [key, value] of Object.entries(required)) {
  if (!value) console.warn(`Missing runtime setting: ${key}`);
}

app.disable("x-powered-by");
app.use(express.json({ limit: "200kb" }));
app.use(cookieParser());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || origin === FRONTEND_ORIGIN) return callback(null, true);
      return callback(new Error("Origin not allowed"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"],
  }),
);

app.use((req, res, next) => {
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  next();
});

function base64url(value) {
  return Buffer.from(value).toString("base64url");
}

function sign(value) {
  return crypto.createHmac("sha256", SESSION_SECRET).update(value).digest("base64url");
}

function timingSafeEqual(a, b) {
  const first = Buffer.from(a || "");
  const second = Buffer.from(b || "");
  return first.length === second.length && crypto.timingSafeEqual(first, second);
}

function createSession(email) {
  const payload = base64url(
    JSON.stringify({ email, exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS }),
  );
  return `${payload}.${sign(payload)}`;
}

function verifySession(token) {
  const [payload, signature] = String(token || "").split(".");
  if (!payload || !signature || !timingSafeEqual(signature, sign(payload))) return null;
  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!parsed.email || parsed.exp < Math.floor(Date.now() / 1000)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function requireSession(req, res, next) {
  const header = req.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  const session = verifySession(token);
  if (!session) return res.status(401).json({ error: "Authentication required" });
  req.session = session;
  return next();
}

function oauthClient() {
  return new OAuth2Client(CLIENT_ID, CLIENT_SECRET, OAUTH_REDIRECT_URI);
}

function secretName(name) {
  return `projects/${PROJECT_ID}/secrets/${name}`;
}

async function storeRefreshToken(token) {
  await secretManager.addSecretVersion({
    parent: secretName(REFRESH_TOKEN_SECRET),
    payload: { data: Buffer.from(token, "utf8") },
  });
}

async function readRefreshToken() {
  const [version] = await secretManager.accessSecretVersion({
    name: `${secretName(REFRESH_TOKEN_SECRET)}/versions/latest`,
  });
  return version.payload.data.toString("utf8");
}

async function readThriveBoxFacebookViewers() {
  const signal = AbortSignal.timeout(6500);
  const timeout = new Promise(resolve =>
    signal.addEventListener("abort", () => resolve(null), { once: true })
  );
  const work = (async () => {
    try {
      const userToken = (await readSecret("thrivebox-organic-user-token")).trim();
      if (!userToken || signal.aborted) return null;
      const id = "1349179144934667";
      const page = "https://graph.facebook.com/v26.0/" + id;
      const get = async (path, token) => {
        const response = await fetch(page + path, {
          headers: { Authorization: "Bearer " + token }, signal, redirect: "error"
        });
        return response.ok ? await response.json() : null;
      };
      const account = await get("?fields=id,access_token", userToken);
      if (account?.id !== id || typeof account.access_token !== "string" || !account.access_token) return null;
      const metric = "page_total_media_view_unique";
      const body = await get("/insights?metric=" + metric + "&period=day", account.access_token);
      const values = body?.data?.find(row => row?.name === metric)?.values;
      return Array.isArray(values) ? values
        .filter(row => Number.isSafeInteger(row?.value) && row.value >= 0 &&
          typeof row.end_time === "string" && Number.isFinite(Date.parse(row.end_time)))
        .map(row => ({ endTime: new Date(row.end_time).toISOString(), value: row.value })) : null;
    } catch {
      return null;
    }
  })();
  return Promise.race([work, timeout]);
}

async function readThriveBoxSocialInsights() {
  const unavailable = { instagramDailyReach: null };
  const signal = AbortSignal.timeout(6500);
  const timeout = new Promise(resolve =>
    signal.addEventListener("abort", () => resolve(unavailable), { once: true })
  );
  const request = (async () => {
    try {
      const token = (await readSecret("thrivebox-organic-user-token")).trim();
      if (!token || signal.aborted) return unavailable;
      const response = await fetch(
        "https://graph.facebook.com/v26.0/17841436661114561/insights?metric=reach&period=day",
        { headers: { Authorization: "Bearer " + token }, signal, redirect: "error" }
      );
      if (!response.ok) return unavailable;
      const body = await response.json();
      const values = body.data?.find(row => row.name === "reach" && row.period === "day")?.values;
      if (!Array.isArray(values)) return unavailable;
      return { instagramDailyReach: values
        .filter(row => Number.isSafeInteger(row.value) && row.value >= 0 &&
          typeof row.end_time === "string" && Number.isFinite(Date.parse(row.end_time)))
        .map(row => ({ endTime: new Date(row.end_time).toISOString(), value: row.value })) };
    } catch {
      return unavailable;
    }
  })();
  return Promise.race([request, timeout]);
}

async function readSecret(name) {
  const [version] = await secretManager.accessSecretVersion({
    name: `${secretName(name)}/versions/latest`,
  });
  return version.payload.data.toString("utf8");
}

async function authenticatedOAuthClient() {
  const client = oauthClient();
  client.setCredentials({ refresh_token: await readRefreshToken() });
  return client;
}

async function googleAdsRequest(path, options = {}) {
  const client = await authenticatedOAuthClient();
  const { token } = await client.getAccessToken();
  if (!token) throw new Error("Unable to obtain Google access token");

  const response = await fetch(`https://googleads.googleapis.com/${GOOGLE_ADS_API_VERSION}${path}`, {
    method: options.method || "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.loginCustomerId
        ? { "login-customer-id": String(options.loginCustomerId).replace(/-/g, "") }
        : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};
  if (!response.ok) {
    const error = new Error(data?.error?.message || `Google Ads request failed (${response.status})`);
    error.status = response.status;
    error.details = data;
    throw error;
  }
  return data;
}

async function metaGraphRequest(path, params = {}) {
  const token = await readSecret(META_ACCESS_TOKEN_SECRET);
  const url = new URL(`https://graph.facebook.com/${META_GRAPH_API_VERSION}/${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, value);
  });

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok || data.error) {
    const error = new Error(data?.error?.message || `Meta request failed (${response.status})`);
    error.status = response.status;
    error.details = data;
    throw error;
  }
  return data;
}

async function metaGraphCollection(path, params = {}, maxPages = 200) {
  const rows = [];
  let data = await metaGraphRequest(path, params);
  let page = 0;
  while (data && page < maxPages) {
    rows.push(...(data.data || []));
    const next = data.paging?.next;
    if (!next) break;
    const token = await readSecret(META_ACCESS_TOKEN_SECRET);
    const response = await fetch(next, { headers: { Authorization: `Bearer ${token}` } });
    data = await response.json();
    if (!response.ok || data.error) {
      const error = new Error(data?.error?.message || `Meta pagination failed (${response.status})`);
      error.status = response.status;
      error.details = data;
      throw error;
    }
    page += 1;
  }
  if (data && page >= maxPages) throw new Error("Meta pagination limit reached; report incomplete");
  return rows;
}

function validatedMetaRequest(req, res, fixedAccountId) {
  const accountId = fixedAccountId || String(req.query.accountId || "").replace(/^act_/, "");
  const startDate = String(req.query.startDate || "");
  const endDate = String(req.query.endDate || "");
  if (!META_ALLOWED_AD_ACCOUNTS.has(accountId)) {
    res.status(403).json({ error: "This Meta ad account is not mapped to the dashboard" });
    return null;
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate) || !/^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
    res.status(400).json({ error: "Dates must use YYYY-MM-DD" });
    return null;
  }
  if (startDate > endDate) {
    res.status(400).json({ error: "The end date must be on or after the start date" });
    return null;
  }
  return { accountId, startDate, endDate };
}


// PB_CLIENT_REPORT_ROUTES_V1: server-to-server only; never expose report keys to browsers.
const CLIENT_REPORTS = Object.freeze({
  enotecca: { google: "1099466129", meta: ["913601552530100", "2880495615400590"] },
  lka: { google: "7928636633", meta: ["1462400408056476", "4250540271898801"] }
});

function clientReportDates(req, res) {
  const start = req.query.startDate, end = req.query.endDate;
  const valid = value => typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
  if (!valid(start) || !valid(end) || start > end ||
      (Date.parse(end) - Date.parse(start)) / 86400000 > 365) {
    res.status(400).json({ error: "Use valid YYYY-MM-DD dates, in order, covering at most 366 days" });
    return false;
  }
  return true;
}

function clientReportAuth(client) {
  return async (req, res, next) => {
    res.set("Cache-Control", "private, no-store");
    const supplied = req.get("x-pb-report-key");
    if (typeof supplied !== "string" || supplied.length < 32 || supplied.length > 256)
      return res.status(401).json({ error: "Authentication required" });
    try {
      const expected = (await readSecret(client + "-report-key")).trim();
      const candidate = expected.startsWith("sha256:")
        ? "sha256:" + crypto.createHash("sha256").update(supplied).digest("hex")
        : supplied;
      if (expected.length < 32 || !timingSafeEqual(candidate, expected))
        return res.status(401).json({ error: "Authentication required" });
    } catch {
      return res.status(503).json({ error: "Report connection is not configured" });
    }
    if (!clientReportDates(req, res)) return;
    return next();
  };
}

for (const [client, config] of Object.entries(CLIENT_REPORTS)) {
  app.get("/api/client/" + client + "/google-performance", clientReportAuth(client), (req, res, next) =>
    sendGooglePerformance(req, res, next, { customerId: config.google, loginCustomerId: config.google }));
  app.get("/api/client/" + client + "/meta-performance", clientReportAuth(client), (req, res, next) => {
    const id = req.query.accountId;
    if (typeof id !== "string" || !config.meta.includes(id))
      return res.status(403).json({ error: "Account is not mapped to this client" });
    return sendMetaPerformance(req, res, next, id);
  });
}

app.get("/health", (req, res) => {
  res.json({ ok: true, service: "pb-ads-connector", sources: ["google-ads", "meta-ads"] });
});

app.get("/auth/google/start", (req, res) => {
  const state = crypto.randomBytes(24).toString("base64url");
  const stateSignature = sign(state);
  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 10 * 60 * 1000,
  };
  res.cookie("oauth_state", state, cookieOptions);
  res.cookie("oauth_state_sig", stateSignature, cookieOptions);

  const url = oauthClient().generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    include_granted_scopes: true,
    state,
    scope: ["openid", "email", "https://www.googleapis.com/auth/adwords"],
  });
  res.redirect(url);
});

app.get("/auth/google/callback", async (req, res) => {
  try {
    const state = String(req.query.state || "");
    if (
      !state ||
      state !== req.cookies.oauth_state ||
      !timingSafeEqual(req.cookies.oauth_state_sig, sign(state))
    ) {
      return res.status(400).send("OAuth state validation failed.");
    }

    const client = oauthClient();
    const { tokens } = await client.getToken(String(req.query.code || ""));
    if (!tokens.refresh_token) {
      return res.status(400).send("Google did not return a refresh token. Please reconnect and approve access.");
    }

    const ticket = await client.verifyIdToken({ idToken: tokens.id_token, audience: CLIENT_ID });
    const payload = ticket.getPayload();
    const email = String(payload?.email || "").toLowerCase();
    if (!payload?.email_verified || !email.endsWith(`@${ALLOWED_DOMAIN}`)) {
      return res.status(403).send("This Google account is not authorized for Polar Bear Creative.");
    }

    await storeRefreshToken(tokens.refresh_token);
    const session = createSession(email);
    const targetOrigin = JSON.stringify(FRONTEND_ORIGIN);
    const message = JSON.stringify({ type: "google-ads-connected", token: session, email });

    res.type("html").send(`<!doctype html>
      <html lang="en"><head><meta charset="utf-8"><title>Google Ads connected</title></head>
      <body style="font-family:system-ui;padding:32px;color:#2e2e2e">
        <h1>Google Ads connected</h1><p>You may close this window.</p>
        <script>
          if (window.opener) window.opener.postMessage(${message}, ${targetOrigin});
          setTimeout(() => window.close(), 700);
        </script>
      </body></html>`);
  } catch (error) {
    console.error("OAuth callback failed", error);
    res.status(500).send("Google Ads connection failed. Check the service logs and try again.");
  }
});

app.get("/api/google-ads/accessible-customers", requireSession, async (req, res, next) => {
  try {
    const data = await googleAdsRequest("/customers:listAccessibleCustomers");
    res.json(data);
  } catch (error) {
    next(error);
  }
});

app.get("/api/google-ads/accounts", requireSession, async (req, res, next) => {
  try {
    const loginCustomerId = String(req.query.loginCustomerId || "").replace(/-/g, "");
    if (!/^\d{10}$/.test(loginCustomerId)) {
      return res.status(400).json({ error: "A 10-digit loginCustomerId is required" });
    }
    const query = `
      SELECT
        customer_client.client_customer,
        customer_client.descriptive_name,
        customer_client.level,
        customer_client.manager,
        customer_client.status,
        customer_client.currency_code,
        customer_client.time_zone
      FROM customer_client
      WHERE customer_client.level <= 1
    `;
    const data = await googleAdsRequest(`/customers/${loginCustomerId}/googleAds:searchStream`, {
      method: "POST",
      loginCustomerId,
      body: { query },
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
});

app.get("/api/google-ads/performance", requireSession, sendGooglePerformance);

async function sendGooglePerformance(req, res, next, fixedAccount) {
  try {
    const loginCustomerId = fixedAccount?.loginCustomerId || String(req.query.loginCustomerId || "").replace(/-/g, "");
    const customerId = fixedAccount?.customerId || String(req.query.customerId || "").replace(/-/g, "");
    const startDate = String(req.query.startDate || "");
    const endDate = String(req.query.endDate || "");
    if (!/^\d{10}$/.test(loginCustomerId) || !/^\d{10}$/.test(customerId)) {
      return res.status(400).json({ error: "Valid 10-digit customer IDs are required" });
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate) || !/^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
      return res.status(400).json({ error: "Dates must use YYYY-MM-DD" });
    }

    const query = `
      SELECT
        segments.date,
        campaign.id,
        campaign.name,
        campaign.status,
        campaign.advertising_channel_type,
        metrics.impressions,
        metrics.clicks,
        metrics.cost_micros,
        metrics.conversions,
        metrics.conversions_value
      FROM campaign
      WHERE segments.date BETWEEN '${startDate}' AND '${endDate}'
      ORDER BY segments.date ASC
    `;
    const data = await googleAdsRequest(`/customers/${customerId}/googleAds:searchStream`, {
      method: "POST",
      loginCustomerId,
      body: { query },
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
}

app.get("/api/meta-ads/accounts", requireSession, async (req, res, next) => {
  try {
    const accounts = await metaGraphCollection("me/adaccounts", {
      fields: "id,account_id,name,account_status,currency,timezone_name,business_name",
      limit: "200",
    });
    res.json({
      data: accounts.filter((account) => META_ALLOWED_AD_ACCOUNTS.has(String(account.account_id))),
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/meta-ads/performance", requireSession, sendMetaPerformance);

app.get("/api/client/thrivebox/meta-performance", (req, res, next) => {
  res.set("Cache-Control", "private, no-store");
  const expected = process.env.THRIVEBOX_REPORT_KEY;
  const supplied = req.get("x-thrivebox-report-key") || "";
  if (!expected || !timingSafeEqual(supplied, expected)) {
    return res.status(401).json({ error: "Authentication required" });
  }
  return sendMetaPerformance(req, res, next, "1057304140431707");
});

async function sendMetaPerformance(req, res, next, fixedAccountId) {
  try {
    const request = validatedMetaRequest(req, res, fixedAccountId);
    if (!request) return;
    const { accountId, startDate, endDate } = request;
    const timeRange = JSON.stringify({ since: startDate, until: endDate });
    const insightFields = [
      "ad_id",
      "ad_name",
      "adset_id",
      "adset_name",
      "campaign_id",
      "campaign_name",
      "objective",
      "spend",
      "impressions",
      "reach",
      "frequency",
      "clicks",
      "inline_link_clicks",
      "ctr",
      "cpc",
      "cpm",
      "actions",
      "action_values",
      "cost_per_action_type",
      "purchase_roas",
      "date_start",
      "date_stop",
    ].join(",");
    const summaryFields = "spend,impressions,reach,frequency,clicks,inline_link_clicks,ctr,cpc,cpm,actions,action_values,cost_per_action_type,purchase_roas,date_start,date_stop";
    const common = {
      time_range: timeRange,
      limit: accountId === "4250540271898801" ? "25" : "500",
      action_report_time: "conversion",
      use_account_attribution_setting: "true",
    };

    const [socialInsights, facebookDailyViewers, placements, accountSummary, ads, insights, devices, demographics, regions] = await Promise.all([
      accountId === "1057304140431707" ? readThriveBoxSocialInsights() : Promise.resolve({ instagramDailyReach: null }),
      accountId === "1057304140431707" ? readThriveBoxFacebookViewers() : Promise.resolve(null),
      metaGraphCollection(`act_${accountId}/insights`, {
        ...common,
        fields: "spend,impressions,clicks,actions,date_start,date_stop",
        level: "account",
        time_increment: "all_days",
        breakdowns: "publisher_platform,platform_position",
      }).catch(() => null),
      metaGraphCollection(`act_${accountId}/insights`, {
        ...common,
        fields: "reach,frequency,impressions,date_start,date_stop",
        level: "account",
        time_increment: "all_days",
      }),
      metaGraphCollection(`act_${accountId}/ads`, {
        fields:
          "id,name,status,effective_status,campaign{id,name,objective,status,effective_status},adset{id,name,status,effective_status},creative{id,name,thumbnail_url,image_url,effective_object_story_id,object_story_spec}",
        limit: accountId === "4250540271898801" ? "25" : "500",
      }),
      metaGraphCollection(`act_${accountId}/insights`, {
        ...common,
        fields: insightFields,
        level: "ad",
        time_increment: "1",
      }),
      metaGraphCollection(`act_${accountId}/insights`, {
        ...common,
        fields: summaryFields,
        level: "account",
        breakdowns: "impression_device",
      }),
      metaGraphCollection(`act_${accountId}/insights`, {
        ...common,
        fields: summaryFields,
        level: "account",
        breakdowns: "age,gender",
      }),
      metaGraphCollection(`act_${accountId}/insights`, {
        ...common,
        fields: summaryFields,
        level: "account",
        breakdowns: "region",
      }),
    ]);

    res.json({ accountId, startDate, endDate, ads, insights, devices, demographics, regions, accountSummary, placements, socialInsights: { ...socialInsights, facebookDailyViewers } });
  } catch (error) {
    next(error);
  }
}

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).json({
    error: error.message || "Unexpected connector error",
    details: process.env.NODE_ENV === "development" ? error.details : undefined,
  });
});

app.listen(PORT, () => console.log(`PB Ads Google connector listening on ${PORT}`));
