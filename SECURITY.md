# Security and secret handling

No runtime credentials are intentionally included. A common-pattern scan was run, but is not a security audit. Review staged files before every commit.

- Never commit `.env`, raw report keys, OAuth refresh tokens, Meta/Page tokens, service-account JSON, browser cookies, private keys, or deployment bypass tokens.
- Secret **names** and public account IDs in source are not secret values. Keep the repository private regardless.
- Enotecca/LKA raw report keys live in Sites runtime `PB_REPORT_KEY`; the connector verifies SHA256 values held in Secret Manager. Do not use the stored verification hash as the client request key.
- ThriveBox uses its own report key and header. Do not substitute another client's key.
- Share/configure secrets through an approved secret manager or secure process, not WhatsApp, GitHub issues or README files.
- Preserve platform identity enforcement while maintaining Sites. Replace it with actual server-side authentication/authorization on any new host.
- APIs need per-client account allowlists and fixed Google customer mappings. Never accept arbitrary customer IDs or proxy URLs from the browser.
- Preserve date bounds, pagination-completeness checks, no-store responses, and redirect restrictions on credentialed fetches.
- On suspected credential exposure: stop distribution, restrict access, rotate the affected credential and review repository history and access logs. Deleting a file in a later commit does not remove it from history.
