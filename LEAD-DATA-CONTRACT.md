# Lead data contract — five required fields, one step

## Owner authorization and current flow

On November 16, 2026, Harrison requested exactly **Full name, Phone, Email, ZIP code, and Age**, all required on one step, plus the existing unchanged consent checkbox. State remains automatically derived from ZIP. The dashboard is owner-confirmed to accept and display `age` and to receive the full name as a single `name` field. This supersedes the November 13 first-name/phone/ZIP-only field contract; it does not authorize an optional second-step create, a real QA submission, a new checkpoint, GitHub access, or publication.

Web3Forms remains the success gate and email backup. Its HTTP response must be successful and contain exactly `success: true`. Only then does the browser initiate one non-blocking dashboard create POST to `https://leads.harrisonhealthgroup.com/webhooks/web-form`, display acceptance, and attempt the unchanged Google Ads Request quote conversion. Dashboard rejection, network failure, or a pending response does not reverse provider-confirmed acceptance. Tracking errors must not reopen an accepted request. Synchronous in-flight and accepted refs guard duplicate submissions while the component is mounted.

## Required UI and validation

Fields appear in the owner-specified order: **Full name → Phone → Email → ZIP code → Age**, followed by the unchanged consent checkbox. There is no coverage, timeline, last-name, preferred-contact, company, team-size, decision-role, income, date-of-birth, or health-history field.

- Full name: one input with `autocomplete="name"`, required, trimmed, maximum 120 characters. Spaces, accents, hyphens and single-word legal names are not rejected merely for their format. The value is never split for either delivery destination.
- Phone: required US ten-digit national number, `autocomplete="tel"`, telephone keypad, as-typed `(XXX) XXX-XXXX` formatting. One explicit `1`/`+1` country prefix is supported; excess digits are not silently discarded by repeated normalization. The sent value contains ten digits.
- Email: required, `type="email"`, `autocomplete="email"`, maximum 254 characters. Surrounding autofill whitespace is trimmed; plus addressing and letter case are preserved. Missing or malformed values prevent submission.
- ZIP: required five digits, `autocomplete="postal-code"`, numeric keypad. State derives from the exact local postal-state lookup. Unknown/ambiguous ZIP or an intentional correction exposes the existing state selector.
- Age: required age in whole years, not date of birth. **Assumption: 0–120 inclusive**; zero is valid and is not treated as an empty value. Decimals, negatives, scientific notation, blank and out-of-range values are rejected. Native control is `type="number"`, `min="0"`, `max="120"`, `step="1"`, numeric input mode. This bound is input sanity checking, not a product eligibility rule; no pricing calculation or coverage decision is made.
- Consent: required and initially unchecked. Wording and version remain byte-for-byte unchanged. Contact method remains visibly **Phone call**; no new contact preference or marketing SMS permission is requested.

A prominent mobile-only **Call now (954) 429-5138** link remains before the fields and uses `tel:+19544295138`. Error and success contact fallbacks, GeoNames attribution, and privacy/terms links remain supporting UI, not additional questions.

## Delivery payload

Both Web3Forms and the dashboard receive `name` (trimmed full string), `phone` (ten digits), `email` (trimmed, case preserved), `zip` (string preserving leading zeros), `state` (postal abbreviation), and `age` (**JSON number**, whole years). Both retain existing `lead_type` (`consumer`/`business`), `consent_text_version`, `consent_at_client_utc`, and source/campaign attribution. Empty legacy answers and `first_name`/`last_name` are no longer sent. Payload fields are explicitly selected rather than spreading the complete form-data object.

Web3Forms retains the exact existing access key, subject format, and `from_name`. The dashboard never receives those provider-specific values. Its copy adds `consent: true`, the exact visible `consent_text`, and `page_url` reduced to public origin/path without query or fragment:

> I request that Harrison Health Group contact me by my selected method about this inquiry. I have read the privacy information and site-use information.

Existing attribution includes `gclid`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gbraid`, `wbraid`, first/current landing paths, referrer origin and random session ID where available. No age, contact details, medical information or form-entry values are added to analytics. Consent timestamps are client-generated and are not independent evidence of server receipt or identity.

## State handling and native controls

State uses the unchanged exact offline GeoNames postal-code administrative-state dataset (CC BY 4.0), with unambiguous US-territory-only USPS supplementation. The November 13 build contains 41,191 ZIP entries. Attribution/license links remain below the form. No ZIP is sent to a geocoding service. ZIPs `02914` and `19964` map to RI and DE, not physical postal-facility states; `06390` maps to NY, not an approximate CT prefix rule.

Every ZIP edit replaces or clears the prior inferred state; landing-page context never determines residence. Unknown/ambiguous ZIP allows manual selection. A recognized state is correctable via **Change state**. Postal state is routing context, not proof of residence, licensing or product eligibility. The selector separates the owner-supplied 31 mapped states (DE included, NM excluded) from general-inquiry locations. Existing availability caveats and explicit closed-control, option, optgroup, placeholder, selected/checked, disabled, focused and hovered colors remain unchanged and must be checked on desktop/mobile.

## Dashboard boundaries

The owner previously confirmed JSON/form encoding, consent requirements, production-domain CORS, five create POSTs per IP per ten minutes, and `{ "ok": true, "lead_id": 123 }` responses. A repeat create can make a duplicate record and another alert; do not resend optional details to this route. The website does not depend on the create response for user-visible acceptance. The proposed token-protected details endpoint is not enabled; there is no Step 2 UI, update-token storage, details request, or second quote conversion.

The November 13 real test independently returned Web3Forms HTTP200/success:true and dashboard HTTP200/ok:true/lead42. That tested the previous field set, not the new name/age contract. No new real lead is authorized by the November 16 edit request; current validation uses mocks. Do not claim current-age persistence, Inbox appearance or alerts from an earlier test.

## Privacy and release boundaries

The previous privacy page named contact/routing details and old optional fields but did **not** explicitly disclose age. A narrow **local draft** now names full name, phone, email, ZIP and age, local ZIP-derived state, consent, Web3Forms, the private lead-dashboard handoff, source page and campaign attribution. It explicitly excludes age and form entries from Google Ads measurement. Its draft date is November 16, 2026. SMS/Terms wording and the consent checkbox remain unchanged. Counsel review remains a release prerequisite; no legal adequacy or approval is implied by this factual code/disclosure check.

The Google Ads base/call setup and Request quote conversion remain unchanged. One destination-only event follows explicit Web3Forms success. New name, email and age are never added to the conversion payload. Site funnel events remain aggregate event/page/step/device/ad context; failed values and individual field identities are not recorded.

November 13–27 advertising measurement freeze remains owner-reported. Requiring email/age changes funnel friction; any future deployment must record its actual cutover and compare post-change completion separately. Current changes are preview-only and uncommitted: no GitHub fetch/push, checkpoint, publication, real lead, SMS, paid-ad click or live conversion test is included.
