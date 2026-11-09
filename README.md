# Polar Bear Media Dashboards

Private technical-review snapshot for Enotecca, Little Kitchen Academy (LKA), and ThriveBox. Prepared November 8, 2026. This is a source handoff, not a completed hosting migration.

## Contents

- `dashboards/enotecca`, `dashboards/lka`, `dashboards/thrivebox`: HTML/CSS/JavaScript UI, original Sites Worker adapters, and build scripts.
- `backend/src/server.js`: latest backend uploaded by Fernando, including client routes, hashed report-key checks, and Meta pagination fixes.
- `backend/package.json`: dependency manifest from the connector project. Verify against Cloud Shell before a production rebuild; no current lockfile was supplied.
- `backend/.env.example`: names and placeholders only; the app does not load this file automatically.
- `SECURITY.md`: credential and migration requirements.

## Current architecture

Browser -> private ChatGPT Site -> per-client Sites Worker -> Google Cloud Run reporting connector -> Google Ads / Meta APIs.

Google OAuth refresh credentials and Meta tokens stay server-side. The browser calls same-origin report routes; each Site supplies its report key from a runtime secret. Opening a report or applying dates triggers queries. No unattended daily refresh scheduler is included.

The connector project is `pb-ads-dashboard`, service `pb-ads-google-connector`, region `us-central1`. Enotecca/LKA currently use the `enotecca-lka-test` tag; ThriveBox uses `thrivebox-test`. The source contains those endpoint addresses, which are configuration, not credentials. Do not change production traffic or remove tags during review.

## Important: not directly deployable to Railway or a standard Node server

The UI is plain HTML/CSS/JavaScript, but the server adapters are Cloudflare Worker ES modules. They use `oai-authenticated-user-id`, a trusted identity header supplied by Sites. A new host will not supply that identity boundary.

Before moving off Sites, Ali/Ariel must implement real authentication, a server-side client authorization map, secure session management, and same-origin API proxy routes. Never trust an identity header supplied directly by an Internet client. Do not move report keys into browser code. Keep Google Cloud Run initially if suitable; there is no need to move the connector merely to change dashboard hosting.

## Review/build checks

Use Node.js 20 or newer (verify the deployed runtime before production changes).

```bash
cd backend
npm install
npm run check
```

Starting the backend requires runtime configuration and Google Cloud credentials with narrow access to the necessary Secret Manager secrets. Use application-default/service identity credentials, not committed service-account JSON.

For each dashboard, run these commands from its own directory:

```bash
node --check dist/app.js
node --check worker/index.mjs
node scripts/build-worker.mjs
```

This produces the original Sites-compatible Worker bundle, not a portable Node server. Retained `.openai/hosting.json` files preserve current Site identity for maintenance; do not reuse those IDs for a new project.

## Working source / validation limits

- Enotecca/LKA have server-managed Google and Meta client routes; ThriveBox's current dedicated adapter reports Meta data.
- October Google report queries and Meta spend reconciliations passed earlier connector tests. That does not establish every UI panel or date range as verified.
- Enotecca/LKA UX includes sorting, creative previews, daily labels, conversion selectors and audience tables. Google rows currently represent campaigns, not individual ad creatives.
- Meta placement requests exist; request failure returns unavailable data. Verify live payloads for each account.
- Enotecca combines LaStella and Le Vieux Pin accounts. LKA's correct shared Meta account contains both Fraser and Edgemont; the UI classifies by campaign name. The backend still allows one legacy LKA account ID; remove it only after review.
- Social readers in this backend are ThriveBox-only. Enotecca/LKA require their own verified Facebook/Instagram mappings and permissions.
- Video-retention reporting is not implemented in this snapshot.
- Commerce7, Jumbula and verified Shopify/order integrations are not included. Platform-attributed events are not verified orders or registrations.
- Reach/frequency are non-additive. Do not sum them across ads, dates or overlapping accounts. UI displays unavailable where safe totals cannot be established.
- Some legacy template/sample constants and old comment-center files remain in source. Review and remove obsolete paths before production migration; included comment-center files do not imply a completed comment API integration.
- Comments currently saved by these dashboard pages use browser localStorage; they are not shared team records.
- No automatic deployment workflow or GitHub Actions is configured. Browser end-to-end QA remains required; syntax checks alone do not verify live loading.

## Migration acceptance checklist

1. Confirm ownership, narrow developer access, dependency versions and current Cloud Run configuration without exposing secret values.
2. Agree dashboard host and domain with Saman, Ali and Ariel.
3. Implement team/client login and server-side tenant authorization; test cross-client access denial.
4. Configure secret values in the chosen secret manager. Preserve the per-client raw key / server verification-hash pairing.
5. Test Google and Meta independently for October 1–31 and a recent period. Reconcile spend, clicks and conversion definitions with platform reports.
6. Verify filtered totals, thumbnails, daily charts, breakdowns, unavailable states and timezones.
7. Complete missing social/business connections separately; do not report unavailable data as zero.
8. Validate with another authorized user before any DNS or traffic cutover. Retain the current Sites and connector tags for rollback.

## Upload to the existing private GitHub repository

Extract the ZIP locally. Upload the **contents** (dashboards, backend, README.md, SECURITY.md, CHECKSUMS.sha256, .gitignore), not the ZIP itself. Replace the initial README when prompted. Confirm the repository remains private and no credentials are staged. Browser upload may omit hidden dotfiles; enable hidden files on macOS with Cmd+Shift+Period, or have Ali/Ariel use Git to preserve the full tree. The snapshot should be reviewed before deploying.
