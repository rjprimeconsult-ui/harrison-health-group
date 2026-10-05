# Release checklist — Harrison Health Group

- [ ] Owner approved exact public content and deployment (current task authorizes preview/code only).
- [ ] Brand/legal/entity/phone/address/NPN/credentials/31-state map and product availability verified.
- [ ] Review provenance and rights approved; no seeded review presented as authentic.
- [x] Legacy seed examples archived outside the public bundle; production review-admin route returns HTTP 404/noindex. Existing browser-local records preserved.
- [ ] Counsel signed off privacy, terms, consent, TCPA/DNC, insurance licensing and health/PII handling.
- [ ] Web3Forms key activated and inbox delivery tested by owner or with explicit SEND approval; CRM receipt/persistence configured if required.
- [x] All built routes return distinct raw HTML, title, H1, canonical, schema, links and status in a local production server; repeat on public domain after approved release.
- [x] Built robots/sitemap and AdsBot/Googlebot/Android responses verified; no admin page is emitted. Actual search indexing remains unverified.
- [x] Desktop + mobile browser QA passes for menu, form errors, mocked success/failure, and computed native select placeholder/closed/selected/disabled/focus/hover/checked-option states.
- [ ] Manually inspect the OS-native **open** option popup on real target desktop and phone browsers; headless computed styles do not establish OS popup rendering.
- [ ] Lead failure fallback works; analytics contains no PII/PHI; tracking consent design approved.
- [ ] Exact active Google Ads Final URLs, mobile/asset URLs, tracking templates, and historical slugs obtained and tested with click-ID preservation.
- [x] `pnpm verify` passed after the Delaware/New Mexico correction: 6/6 unit tests, TypeScript, production build, 12 public route checks, 7 managed asset references, robots/sitemap/internal links, production HTTP 200/308/404, and bot user agents. Desktop/mobile QA verified the map and form warning. Seven media URLs independently returned 200 on current managed domain; repeat after release.
- [ ] Save WebDev checkpoint **before** publication.
- [ ] After approved release, verify Search Console property, submit sitemap, inspect priority URLs; do not equate submitted with indexed.

**Current release status: HOLD — owner facts/compliance approval and exact publication approval pending.**
