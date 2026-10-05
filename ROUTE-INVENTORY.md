# Route inventory

Baseline (2026-10-04): `/` is a client-rendered homepage; `/admin/reviews` is a localStorage-only, unauthenticated review UI; `/404` and unknown paths render a JS 404 but return HTTP 200. Production raw HTML contains `<div id="root"></div>`. `robots.txt` disallows `/admin/`; `sitemap.xml` lists only `/`. Existing footer route labels mostly point to `#`. No verified paid URL/campaign slug inventory.

Planned public route and distinct intent:

| Path | Purpose | Indexing | CTA |
| --- | --- | --- | --- |
| `/` | Private-coverage entry, known brand, call/quote/booking | index | Quote request |
| `/business` | Employer/group discovery and timing | index | Business inquiry |
| `/contact` | Direct call, email, Calendly | index | Book or call |
| `/about` | Agency/team identity only, no unapproved founder biography | index | Meet team/contact |
| `/resources` | Original decision-guide hub | index | Read guide |
| `/resources/private-vs-marketplace` | Preparing a comparison of coverage routes | index | Talk to an advisor |
| `/resources/self-employed-coverage` | Independent worker preparation | index | Request review |
| `/resources/small-business-benefits` | Employer benefits preparation | index | Business inquiry |
| `/faq` | Visible plain-language Q&A | index | Contact |
| `/careers` | Future-interest inquiry, no advertised job | index | Email careers inquiry |
| `/privacy`, `/terms` | Factual site-use and contact/data summaries pending counsel | noindex until legal approval | Contact |
| `/admin/reviews` | Legacy browser-local review UI retained in source/dev only; **no authenticated shared admin** | production HTTP 404 + noindex; not prerendered or linked publicly | None |
| `/404`, unknown paths | True not-found response | noindex, HTTP 404 | Home |

Canonical policy: HTTPS non-`www`, no trailing slash except `/`; public priority paths are included in sitemap only when indexable. Existing hash anchors remain on homepage. Exact paid URLs and redirects remain unknown; do not fabricate legacy slugs.

**Managed media:** Seven approved existing image URLs use the platform’s `/manus-storage/` proxy. All seven returned HTTP 200 on the current public Harrison domain at verification time. A bare local Express server does not implement that platform media proxy; production URL checks must run on managed hosting after any release.
