# Lead data contract — Step 1 only

## Owner authorization and current flow

Harrison confirmed the deployed dashboard contract on November 8, 2026 and directed Juan to build **Step 1 only**, leaving Step 2's handoff off until a real update endpoint is deployed. This supersedes the original three-stage inquiry flow. The supplied backend behavior is owner-reported; mocked website tests do not independently prove live dashboard persistence, alert delivery, retention, or rate limiting.

Web3Forms remains the success gate and email backup. A successful HTTP response must also contain exactly `success: true`. Only then does the browser initiate one non-blocking dashboard create POST to `https://leads.harrisonhealthgroup.com/webhooks/web-form`, display acceptance, and attempt one existing Google Ads Request quote conversion. Dashboard rejection, network failure, or pending response does not reverse provider-confirmed acceptance. Tracking errors likewise must not reopen an accepted request. Synchronous in-flight and accepted refs guard duplicate form submits while the component is mounted.

## Step 1 UI and payload

Owner revision November 13, 2026: required UI is **first name, US phone, five-digit ZIP, and the contact-permission checkbox** on one screen. State fills from the ZIP; a manual state control appears only for missing/ambiguous data or an intentional visitor correction. Contact method is visibly **Phone call**, stored as `preferred_contact="Phone call"`. The first-name field uses `autocomplete="given-name"`; `last_name` and email remain empty. Phone formats as typed to `(XXX) XXX-XXXX`, supports a single explicit US `1`/`+1` country prefix, and sends ten digits. Extra digits are not discarded by repeated normalization. Phone uses `autocomplete="tel"` and the telephone keypad; ZIP uses `autocomplete="postal-code"` and the numeric keypad. The exceptional state selector retains `autocomplete="address-level1"`. A prominent mobile-only **Call now (954) 429-5138** link points to `tel:+19544295138` before the fields.

The lead payload retains `lead_type` (`consumer` or `business`), `first_name`, `last_name`, `phone`, `state`, `zip`, `email`, `coverage_intent`, `timeline`, `company_name`, `team_size`, `decision_role`, `preferred_contact`, `consent_text_version`, `consent_at_client_utc`, and the existing allowlisted attribution fields. Email, coverage, timing, and business details are empty at this stage and never block submission. Backend acceptance of these empty values is explicitly confirmed by the owner.

The dashboard copy excludes Web3Forms `access_key`, `subject`, and `from_name`; it includes `consent=true`, the exact visible `consent_text`, and `page_url` reduced to public origin/path without query or fragment. The consent version and wording remain unchanged:

> I request that Harrison Health Group contact me by my selected method about this inquiry. I have read the privacy information and site-use information.

No DOB, income, diagnosis, tobacco, employee health status, free-text health details, or medical history is requested. Contact details never enter analytics events. No marketing text-message authorization is added by this change.

## State handling

State comes from an exact offline GeoNames postal-code administrative-state dataset (CC BY 4.0), with unambiguous US-territory-only USPS supplementation. The November 13 build has 41,191 ZIP entries; every compressed range independently round-trips to its source. GeoNames attribution and license links are displayed below the form. No ZIP entry is sent to a geocoding API. USPS postal-facility state is explicitly not used for mainland ZIPs: known postal/facility mismatches `02914` and `19964` resolve to RI and DE, respectively; `06390` resolves to NY, not a three-digit-prefix CT guess.

The landing-page state and first-landing attribution no longer prefill residence. Every ZIP edit replaces or clears the previous inferred state. A missing, ambiguous or newly established five-digit ZIP permits manual state selection rather than blocking a genuine request. The inferred state is correctable via **Change state**. ZIP postal state is routing context, not proof of residence or license eligibility.

The native state menu separates the 31 states on the existing licensed-state list (Delaware included; New Mexico excluded) from other states, which remain general-inquiry options. A visitor selecting an unlisted state sees the existing availability/referral caveat. Current licensing and product availability still require verification by the team. All native closed-control, option, optgroup, selected, placeholder, disabled, focus, and hover styling remains explicitly defined by the existing light/dark CSS.

## Deployed dashboard contract — owner confirmed

- Creation accepts JSON or form encoding; at least phone or email, `consent: true`, and exact `consent_text` are required. Missing required values return 422.
- Browser CORS allows `https://harrisonhealthgroup.com` and `https://www.harrisonhealthgroup.com`.
- Limit: five POSTs per visitor IP per ten minutes, as reported by the owner.
- Creation response: `{ "ok": true, "lead_id": 123 }`; this Step 1-only website intentionally does not depend on or persist that response.
- A second POST creates another record marked as duplicate, retains the existing agent, and sends a second new-lead alert. **Do not send optional details to this create route.**

## Step 2 is not enabled

The proposed future route is `POST /webhooks/web-form/{lead_id}/details`, authenticated by a one-time `update_token` returned from initial creation. Expected future response is `{ "ok": true, "lead_id": 123, "updated": true }`, with 403 for a bad/used token and 404 for an unknown lead. The owner says this is **not deployed** and will confirm when available. There is currently no Step 2 UI, no details request, no second create POST, and no token storage. Do not enable updates merely because GitHub access is restored; obtain deployment confirmation and verify the exact contract first.

## Attribution, timestamps, and release boundaries

Existing attribution includes first/current landing path, safe referrer origin, allowlisted UTMs/click IDs, and a random session ID. These are routing context, not proof of consent, identity, or qualification. Client consent timestamps are non-authoritative; trusted server receipt time is outside this website's contract.

The existing Request quote conversion destination and website-call configuration are unchanged. Only one destination-only conversion is attempted after provider acceptance; no name, phone, ZIP, state, or coverage answers are sent to Google by this helper. A mocked dataLayer event is not proof of a live Google Ads conversion or call-forwarding swap.

Privacy-page wording remains unchanged pending counsel approval. Historical step-2 `form_validation_error` came from the old mandatory last-name/email/preference checks and phone digits-length check; an otherwise valid `+1` number was rejected as 11 digits. The new form has no step 2; its validation and completion events are step 1. Record the deployment cutover when comparing the November 13–27 ad-freeze funnel, because the meaning of step completion changed. Existing telemetry stores aggregate event/page/step/device/ad flags, not the failed values or field identity; historical field-level causes cannot be reconstructed without additional existing evidence.

November 13 authorization permits one labeled live QA lead using the user-supplied test number after publication. No real lead has yet been sent by this implementation QA. Preview CORS preflight was independently verified: Manus preview HTTP 400/no allow-origin; production domain HTTP 200/matching allow-origin. The owner explicitly approved moving the one real test to the live domain immediately after publication. Do not spoof Origin, relay through an undocumented proxy, retry an accepted create request, or report mocks as real dashboard/Google confirmation. Dashboard Inbox and live Google diagnostics remain to be verified with authorized sign-in. User authorized publication and its required release checkpoint on a local repair branch; no GitHub remote access or push is authorized by this change.
