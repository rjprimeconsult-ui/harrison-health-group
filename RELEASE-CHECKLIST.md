# Release checklist — Harrison Health Group

- [ ] Owner approved exact public content and deployment (current task authorizes preview/code only).
- [ ] Brand/legal/entity/phone/address/NPN/credentials/31-state map and product availability verified.
- [x] Owner approved automatic display of authentic reviews returned by the verified Google Places listing. No seeded review is presented as authentic; reviewer avatar/name/profile attribution, a direct individual Google Maps review link, relevance-order/unfiltered notice, unmodified official Google Maps mark, and third-party attributions remain visible.
- [x] Local production build verifies the official Google Maps asset is emitted unmodified, returns HTTP 200, legal pages include Google policy links, the exact listing identity gates display, live source links/avatars render, and a forced Maps-script failure reaches the verified Google Maps fallback at desktop and phone sizes.
- [ ] On the released managed domain, verify the Google Places proxy loads, exact listing identity matches, every direct individual-review and author-attribution link opens correctly, the official attribution remains visible, and a temporarily unavailable request keeps the verified Google Maps fallback.
- [x] Legacy seed examples archived outside the public bundle; production review-admin route returns HTTP 404/noindex. Existing browser-local records preserved.
- [ ] Counsel signed off privacy, terms, consent, TCPA/DNC, insurance licensing and health/PII handling.
- [ ] Web3Forms key activated and inbox delivery tested by owner or with explicit SEND approval; CRM receipt/persistence configured if required.
- [x] All built routes return distinct raw HTML, title, H1, canonical, schema, links and status in a local production server; repeat on public domain after approved release.
- [x] Built robots/sitemap and AdsBot/Googlebot/Android responses verified; no admin page is emitted. Actual search indexing remains unverified.
- [x] Desktop + mobile browser QA passes for menu, form errors, mocked success/failure, and computed native select placeholder/closed/selected/disabled/focus/hover/checked-option states.
- [ ] Manually inspect the OS-native **open** option popup on real target desktop and phone browsers; headless computed styles do not establish OS popup rendering.
- [ ] Lead failure fallback works; analytics contains no PII/PHI; tracking consent design approved.
- [ ] Exact active Google Ads Final URLs, mobile/asset URLs, tracking templates, and historical slugs obtained and tested with click-ID preservation.
- [x] `pnpm verify` passed after the team-role restoration: 11/11 unit tests, TypeScript, production build, 12 public route checks, unmodified Google Maps logo integrity check, robots/sitemap/internal links, production HTTP 200/308/404, and bot user agents. Desktop/mobile QA verified the restored owner-confirmed roles, founder-card specialty flip, map/form warning, plus live and forced-unavailable Google review states. Repeat on the released managed domain.
- [ ] Save WebDev checkpoint **before** publication.
- [ ] After approved release, verify Search Console property, submit sitemap, inspect priority URLs; do not equate submitted with indexed.

**Current release status: HOLD — owner facts/compliance approval and exact publication approval pending.**
