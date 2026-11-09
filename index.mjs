const endpoint = 'https://thrivebox-test---pb-ads-google-connector-r6hihlwcra-uc.a.run.app/api/client/thrivebox/meta-performance';
const types = {
  checkouts: 'offsite_conversion.fb_pixel_initiate_checkout',
  purchases: 'offsite_conversion.fb_pixel_purchase',
};
const json = (body, status = 200) => Response.json(body, {
  status, headers: {'Cache-Control': 'private, no-store'},
});
const metric = value => value != null && String(value).trim() !== '' &&
  Number.isFinite(Number(value)) && Number(value) >= 0 ? Number(value) : null;
const label = value => typeof value === 'string' ? value.slice(0, 300) : '';
function imageUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password &&
      /(^|\.)(fbcdn\.net|fbsbx\.com|cdninstagram\.com)$/i.test(url.hostname) ? url.href : null;
  } catch { return null; }
}
function day(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? '')) return NaN;
  const parsed = Date.parse(value + 'T00:00:00Z');
  return Number.isFinite(parsed) && new Date(parsed).toISOString().slice(0, 10) === value ? parsed : NaN;
}
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method !== 'GET' && request.method !== 'HEAD') return json({error:'Method not allowed'}, 405);
    if (url.pathname !== '/api/thrivebox-conversions') {
      const asset = Object.hasOwn(assets, url.pathname) ? assets[url.pathname] : null;
      return asset ? new Response(request.method === 'HEAD' ? null : Uint8Array.from(atob(asset.body), c => c.charCodeAt(0)), {
        headers:{'Content-Type':asset.type,'X-Content-Type-Options':'nosniff','Cache-Control':'private, no-cache'},
      }) : new Response('Not found', {status:404});
    }
    if (!request.headers.get('oai-authenticated-user-id')) return json({error:'Sign in required'}, 401);
    if (request.method !== 'GET') return json({error:'Method not allowed'}, 405);
    const startDate = url.searchParams.get('startDate'), endDate = url.searchParams.get('endDate');
    const start = day(startDate), end = day(endDate);
    if (!Number.isFinite(start) || !Number.isFinite(end) || end < start || end-start > 366*86400000) {
      return json({error:'Invalid reporting dates'}, 400);
    }
    const key = typeof env.THRIVEBOX_REPORT_KEY === 'string' ? env.THRIVEBOX_REPORT_KEY.trim() : '';
    if (!key) return json({error:'Report connection not configured'}, 503);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45000);
    let stage = 'connector_request';
    try {
      const upstream = await fetch(endpoint + '?' + new URLSearchParams({startDate,endDate}).toString(), {
        headers:{'x-thrivebox-report-key':key},
        redirect:'manual', signal:controller.signal,
      });
      if (!upstream.ok) return json({error:'Meta conversion data unavailable',stage:'connector_http',connectorStatus:upstream.status}, 502);
      stage = 'connector_response';
      const data = await upstream.json();
      if (!Array.isArray(data.insights)) throw Error('Invalid report');
      const counts = {checkouts:0,purchases:0};
      const details = [];
      const hasLandingPageViews = data.insights.some(row => Array.isArray(row?.actions) &&
        row.actions.some(action => action?.action_type === 'landing_page_view'));
      const metadata = new Map((Array.isArray(data.ads) ? data.ads : []).map(ad => [String(ad?.id), ad]));
      let spendCents = 0, spendAvailable = true;
      for (const row of data.insights) {
        if (!row || (row.actions != null && !Array.isArray(row.actions))) throw Error('Invalid actions');
        const rawSpend = row.spend;
        const cents = Math.round(Number(rawSpend)*100);
        if (rawSpend == null || String(rawSpend).trim() === '' || !Number.isSafeInteger(cents) || cents < 0) spendAvailable = false;
        else spendCents += cents;
        const events = {checkouts:0,purchases:0};
        for (const name of Object.keys(types)) {
          const match = row.actions?.find(event => event?.action_type === types[name]);
          if (!match) continue;
          const count = Number(match.value);
          if (match.value == null || match.value === '' || !Number.isFinite(count) || count < 0) throw Error('Invalid count');
          counts[name] += count;
          events[name] = count;
        }
        const meta = metadata.get(String(row.ad_id)), creative = meta?.creative, spec = creative?.object_story_spec;
        details.push({
          id:label(String(row.ad_id ?? '')), name:label(row.ad_name ?? meta?.name),
          campaign:label(row.campaign_name ?? meta?.campaign?.name),
          campaignId:label(String(row.campaign_id ?? meta?.campaign?.id ?? '')),
          objective:label(row.objective ?? meta?.campaign?.objective),
          adSetId:label(String(row.adset_id ?? meta?.adset?.id ?? '')),
          adSet:label(row.adset_name ?? meta?.adset?.name), date:label(row.date_start),
          spend:metric(rawSpend), impressions:metric(row.impressions), clicks:metric(row.clicks),
          landingPageViews:hasLandingPageViews ? metric(row.actions?.find(action =>
            action?.action_type === 'landing_page_view')?.value ?? 0) : null,
          format:spec?.video_data ? 'Video' : spec?.link_data?.child_attachments?.length > 1 ? 'Carousel' : '',
          image:[creative?.image_url, spec?.video_data?.image_url, creative?.thumbnail_url,
            spec?.link_data?.picture, spec?.link_data?.child_attachments?.[0]?.picture].map(imageUrl).find(Boolean) ?? null,
          ...events,
        });
      }
      const sum = key => details.every(row => row[key] !== null) ? details.reduce((n,row) => n + row[key], 0) : null;
      // Only a single account-level, all-days row is valid. Never sum reach
      // or average frequencies across ads, days or demographic breakdowns.
      const summaryRows = Array.isArray(data.accountSummary) ? data.accountSummary : [];
      const summary = summaryRows.length === 1 ? summaryRows[0] : null;
      const periodMatches = summary?.date_start === startDate && summary?.date_stop === endDate;
      const reach = periodMatches ? metric(summary.reach) : null;
      const frequency = periodMatches && reach > 0 ? metric(summary.frequency) : null;
      const dailySocialValues = rows => Array.isArray(rows) ? rows.filter(row =>
        Number.isSafeInteger(row?.value) && row.value >= 0 && typeof row.endTime === 'string' &&
        Number.isFinite(Date.parse(row.endTime)),
      ).map(row => ({endTime:new Date(row.endTime).toISOString(), value:row.value}))
        .sort((a,b) => b.endTime.localeCompare(a.endTime)).slice(0, 7) : null;
      const instagramDailyReach = dailySocialValues(data.socialInsights?.instagramDailyReach);
      const facebookDailyViewers = dailySocialValues(data.socialInsights?.facebookDailyViewers);
      const breakdowns = Object.fromEntries(Object.entries({
        devices:['impression_device'], demographics:['age','gender'], regions:['region'],
        placements:['publisher_platform','platform_position'],
      }).map(([key, fields]) => [key, Array.isArray(data[key]) ? data[key].filter(row => row && fields.some(field => label(row[field]))).map(row => ({
        ...Object.fromEntries(fields.map(field => [field,label(row[field])])),
        spend:metric(row.spend), impressions:metric(row.impressions), clicks:metric(row.clicks),
        ...(key === 'regions' ? {
          reach:row.date_start === startDate && row.date_stop === endDate ? metric(row.reach) : null,
        } : {}),
        ...Object.fromEntries(Object.entries(types).map(([name,type]) => [name,Array.isArray(row.actions)
          ? metric(row.actions.find(action => action?.action_type === type)?.value ?? 0) : null])),
      })) : []]));
      return json({startDate,endDate,...counts,spend:spendAvailable ? spendCents/100 : null,
        impressions:sum('impressions'),clicks:sum('clicks'),reach,frequency,details,breakdowns,
        instagramDailyReach,facebookDailyViewers,placementStatus:Array.isArray(data.placements)?'available':'unavailable'});
    } catch {
      return json({error:'Meta conversion data unavailable',stage:controller.signal.aborted?'connector_timeout':stage}, 502);
    } finally {
      clearTimeout(timeout);
    }
  },
};
