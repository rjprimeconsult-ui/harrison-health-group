# Harrison Health Group — playbook implementation plan

**Mode:** extension/preserve redesign; keep approved white/black/gold and team/media contracts. **ASSUMPTION:** code + preview only, no public release without approval.

1. **Audit / evidence** — CERTAIN: one React/Vite homepage, supplied email/Calendly/review URL, 6 ordered team cards. LIKELY: public phone and 31-state map. UNVERIFIED: legal entity/licensing/NPN, claims/reviews, Web3Forms delivery, CRM/analytics/ad URLs. Baseline raw production HTML is empty and unknown route returns 200; footer has `#` links.
2. **Foundation** — fact pack and ledger; statically prerender public route HTML with shared metadata/schema; real 404; canonical-only sitemap, robots AdsBot allowance, llms.txt, semantic nav/footer, privacy/terms placeholders **not represented as approved legal policy**.
3. **Conversion** — preserve home CTA and booking flow, strip unsupported superlatives/statistics, quarantine seeded testimonials; reduce quote form to minimum nonsensitive routing fields; validate/accessibility/consent; separate business path, no invented pricing/calculator or meeting type. Web3Forms delivery remains unverified and no server timestamp/CRM will be falsely asserted.
4. **Authority/content** — original decision-based resource hub + 3 guides, FAQ, about (agency/team only), careers (future inquiries only), contact page. No individual Person schema or city-spun pages without approved facts.
5. **Validation** — unit/route regression tests, TypeScript, build, raw HTML by route, robots/sitemap/internal-link/canonical checks, AdsBot/Android on known preview paths, desktop/mobile browser check of all form select states. Exact Google Ads inventory and Search Console account steps remain blocked by account access/URLs.

Compliance: TCPA/DNC consent and opt-out, CAN-SPAM messaging, state licensing, and HIPAA-adjacent/PII handling need owner/counsel review before public release. These are informational flags, not legal advice.

## Execution status — 2026-10-04

Phases 0–3 and reversible phase-4 code are implemented in preview. A read-only adversarial review found legacy review and preview telemetry exposures; both were corrected. Production `/admin/reviews` is intentionally 404 until an authenticated shared review workflow is approved. All seven existing `/manus-storage/` media paths returned 200 on the managed public domain; bare local Express without the managed proxy is not representative for those URLs. `pnpm verify` and desktop/phone browser QA pass. No public publication, real lead transmission, Search Console submission, or Google Ads account inspection was performed. Exact ad URL inventory and CRM/server receipt architecture remain owner/account dependent.
