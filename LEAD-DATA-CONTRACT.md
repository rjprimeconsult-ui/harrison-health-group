# Lead data contract — draft, subject to owner/compliance review

**Current delivery:** Web3Forms client-side POST using owner-provided key. Browser response must include `success: true` before displaying success. Inbox/key activation is unverified. No durable application-owned lead store, authenticated CRM, Sheets endpoint, or authoritative server timestamp exists in this static project. Do not claim CRM synchronization or delivery success merely from a 2xx status.

Consumer lead: `lead_type=consumer`, `first_name`, `last_name`, `email`, `phone`, `state`, `zip`, `coverage_intent`, `timeline`, `preferred_contact`, plus `consent_text_version` and `consent_at_client_utc` when the user intentionally opts in. Business lead adds `company_name`, `team_size`, `renewal_timing`, and `decision_role` as optional routing fields. No DOB, income, diagnosis, tobacco, employee health status, free-text health details, or medical history in public inquiry forms. Avoid placing PII in URLs or analytics.

Attribution (first landing, landing path, referrer origin when safe, `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid`, `gbraid`, `wbraid`, random session ID) is captured from the landing URL and sent with the form to the lead destination where lawfully appropriate. These values are **not** proof of sales qualification; storage/retention review is pending. `consent_at_client_utc` is non-authoritative and separate from provider/server receipt time. Without a trusted backend, `received_at_server_utc` is unavailable.

Validation: names, valid email, ten-digit US phone, five-digit ZIP, state, coverage intent, checkbox before submit. Accessible inline errors, success/failure states, phone/booking fallback. No duplicate submit while in flight. Sensitive values never enter event payloads.

State handling: all US states can submit a **general inquiry**. When a state is absent from the existing 31-state map, the form warns that service or referral is not guaranteed. Owner must approve any active lead-routing/referral policy and verify the map against current licenses before release.

Analytics taxonomy: `form_view`, `form_start`, `form_step_complete`, `form_validation_error`, `form_submitted`, `form_submission_success`, `click_to_call`, `booking_click`, `resource_guide_view`, `resource_cta_click`, `business_form_view`, `business_form_submitted`. Events are local custom events until analytics consent/configuration and external IDs are approved; no GA4/Ads success claim.

The preview debug collector is disabled because it would otherwise capture applicant form values and provider POST bodies. No production analytics destination is connected by this change.

To complete operational routing: provision a durable private database/CRM and server endpoint; server validates and timestamps UTC on receipt, persists lead, sends owner alert, then attempts non-blocking CRM sync; secure PII at rest/in transit, restrict access, define retention/deletion. Do not attach an unconfigured webhook in production.
