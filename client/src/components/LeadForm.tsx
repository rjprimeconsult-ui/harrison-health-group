import { useEffect, useId, useRef, useState } from "react";
import { Phone } from "lucide-react";
import { moreStates, publicPages, site, stateSlug } from "@shared/site";
import { mappedStates } from "@shared/service-area";
import { emitEvent, getAttribution, trackGoogleAdsQuoteConversion } from "@/lib/measurement";
import { formatPhoneInput, stateForZip } from "@/lib/zip-state";

export type LeadKind = "consumer" | "business";
type FieldName = "name" | "phone" | "email" | "zip" | "age" | "state" | "consent";
export type Lead = Record<FieldName, string>;
const initial: Lead = { name: "", phone: "", email: "", zip: "", age: "", state: "", consent: "" };
const stateNames: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California", CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa", KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland", MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota", OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
  DC: "District of Columbia", PR: "Puerto Rico", GU: "Guam", VI: "US Virgin Islands", AS: "American Samoa", MP: "Northern Mariana Islands", FM: "Federated States of Micronesia", MH: "Marshall Islands", PW: "Palau",
};
const stateChoices = Object.entries(stateNames).sort((a, b) => a[1].localeCompare(b[1]));
export const consentVersion = "contact-request-v1-2026-10-04";
const dashboardWebhook = "https://leads.harrisonhealthgroup.com/webhooks/web-form";
export const consentText = "I request that Harrison Health Group contact me by my selected method about this inquiry. I have read the privacy information and site-use information.";

/** Compatibility helper only; residence comes from ZIP, never the landing-page state. */
export function stateForLandingPath(path: string): string {
  const cleanPath = path.split(/[?#]/)[0].replace(/\/$/, "") || "/";
  if (!publicPages.some((page) => page.kind === "landing" && page.path === cleanPath)) return "";
  if (["/broward-county-health-insurance", "/miami-dade-health-insurance", "/palm-beach-county-health-insurance"].includes(cleanPath)) return "FL";
  const candidates = [{ abbr: "FL", name: "Florida" }, { abbr: "TX", name: "Texas" }, { abbr: "GA", name: "Georgia" }, ...moreStates];
  return candidates.find(({ name }) => cleanPath === `/${stateSlug(name)}-health-insurance` || cleanPath.endsWith(`-${stateSlug(name)}`))?.abbr || "";
}

export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  const explicitCountryPrefix = phone.trim().startsWith("+1") || phone.trim().startsWith("1");
  return explicitCountryPrefix && digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
}

/** Legacy compatibility helper; the current form and both destinations keep one full name. */
export function splitContactName(name: string): { first_name: string; last_name: string } {
  const parts = name.trim().split(/\s+/);
  return { first_name: parts[0] || "", last_name: parts.slice(1).join(" ") };
}

function validEmail(value: string): boolean {
  const email = value.trim();
  if (email.length > 254) return false;
  const parts = email.split("@");
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  const localPattern = new RegExp("^[\\p{L}\\p{M}\\p{N}!#$%&'*+/=?^_`{|}~.-]+$", "u");
  if (!local || local.length > 64 || !localPattern.test(local) || local.startsWith(".") || local.endsWith(".") || local.includes("..")) return false;
  const labels = domain.split(".");
  const domainLabelPattern = new RegExp("^[\\p{L}\\p{N}](?:[\\p{L}\\p{N}-]*[\\p{L}\\p{N}])?$", "u");
  return labels.length >= 2 && labels.every((label) => label.length <= 63 && domainLabelPattern.test(label));
}

export function validateLead(data: Lead): Partial<Record<FieldName, string>> {
  const errors: Partial<Record<FieldName, string>> = {};
  if (!data.name.trim() || data.name.trim().length > 120) errors.name = "Enter your full name (up to 120 characters).";
  if (!/^[+\d\s().\-\u2010-\u2014]+$/.test(data.phone) || !/^\d{10}$/.test(normalizePhone(data.phone))) errors.phone = "Enter a ten-digit US phone number.";
  if (!validEmail(data.email)) errors.email = "Enter a valid email address.";
  if (!/^\d{5}$/.test(data.zip)) errors.zip = "Enter a five-digit ZIP code.";
  const age = data.age.trim();
  if (!/^\d{1,3}$/.test(age) || Number(age) > 120) errors.age = "Enter your age in whole years, from 0 to 120.";
  if (!Object.prototype.hasOwnProperty.call(stateNames, data.state)) errors.state = "Choose your state to continue.";
  if (data.consent !== "yes") errors.consent = "Please confirm how we may contact you about your request.";
  return errors;
}

export async function sendLead(data: Lead, kind: LeadKind) {
  // Explicit fields prevent old optional answers or name parts from leaking into the new contract.
  // Session storage is not trusted: select only the established campaign and routing keys.
  const attribution = getAttribution();
  const attributionKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid", "first_landing_path", "landing_path", "referrer_origin", "session_id"] as const;
  const sourceDetails = Object.fromEntries(attributionKeys.flatMap((key) => typeof attribution[key] === "string" ? [[key, attribution[key]]] : []));
  const leadDetails = {
    ...sourceDetails,
    name: data.name.trim(), phone: normalizePhone(data.phone), email: data.email.trim(),
    zip: data.zip, state: data.state, age: Number(data.age.trim()),
    lead_type: kind,
    consent_text_version: consentVersion,
    consent_at_client_utc: new Date().toISOString(),
  };
  const payload = {
    access_key: "97a6d29a-4a4c-42e5-8644-c6f2d14a4a40",
    subject: `Harrison Health Group website ${kind} request`,
    from_name: "Harrison Health Group Website",
    ...leadDetails,
  };
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
  });
  const result = await response.json().catch(() => null) as { success?: boolean } | null;
  if (!response.ok || result?.success !== true) throw new Error("Lead provider did not confirm acceptance");
  const pageUrl = typeof window === "undefined" ? "" : `${window.location.origin}${window.location.pathname}`;
  // One create request only; no optional second-step handoff or second alert.
  // Dashboard delivery must never change the already-confirmed Web3Forms success state.
  try {
    void fetch(dashboardWebhook, {
      method: "POST", headers: { "Content-Type": "application/json" }, keepalive: true,
      body: JSON.stringify({ ...leadDetails, consent: data.consent === "yes", consent_text: consentText, page_url: pageUrl }),
    }).catch(() => { /* Web3Forms remains the success gate and email backup. */ });
  } catch { /* Also isolate synchronous routing failures from the form success state. */ }
  return result;
}

export default function LeadForm({ kind = "consumer" }: { kind?: LeadKind }) {
  const [data, setData] = useState<Lead>(initial);
  const [manualState, setManualState] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);
  const id = useId();
  const started = useRef(false);
  const submitting = useRef(false);
  const accepted = useRef(false);
  useEffect(() => { emitEvent(kind === "business" ? "business_form_view" : "form_view", { form: kind }); }, [kind]);
  const inferredState = stateForZip(data.zip);
  const stateFallback = data.zip.length === 5 && (manualState || !inferredState);
  const begin = () => {
    if (!started.current) { emitEvent("form_start", { form: kind }); started.current = true; }
  };
  const set = (field: FieldName, value: string) => {
    begin();
    if (field === "zip") {
      const zip = value.replace(/\D/g, "").slice(0, 5);
      setManualState(false);
      setData((previous) => ({ ...previous, zip, state: stateForZip(zip) }));
      setErrors((previous) => ({ ...previous, zip: undefined, state: undefined }));
    } else {
      setData((previous) => ({ ...previous, [field]: field === "phone" ? formatPhoneInput(value) : value }));
      setErrors((previous) => ({ ...previous, [field]: undefined }));
    }
  };
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting.current || accepted.current) return;
    const lead = { ...data, name: data.name.trim(), email: data.email.trim() };
    const invalid = validateLead(lead);
    if (Object.keys(invalid).length) {
      setErrors(invalid); emitEvent("form_validation_error", { form: kind, step: 1 });
      const first = Object.keys(invalid)[0];
      // The state control appears only for exceptional ZIPs; never focus a nonexistent hidden field.
      document.getElementById(`lead-${first === "state" && !stateFallback ? "zip" : first}`)?.focus();
      return;
    }
    submitting.current = true;
    setBusy(true); setSubmissionError(false); setErrors({});
    emitEvent(kind === "business" ? "business_form_submitted" : "form_submitted", { form: kind });
    try {
      await sendLead(lead, kind);
      accepted.current = true;
      setSuccess(true);
      // Tracking failure must not re-open an accepted request or encourage a duplicate submission.
      try { trackGoogleAdsQuoteConversion(); } catch { /* Contact delivery is already confirmed. */ }
      emitEvent("form_step_complete", { form: kind, step: 1 });
      emitEvent("form_submission_success", { form: kind });
    } catch { setSubmissionError(true); }
    finally { submitting.current = false; setBusy(false); }
  };
  const mobileCall = <a href={site.phoneHref} className="btn-primary w-full justify-center gap-2 sm:hidden" onClick={() => emitEvent("click_to_call", { surface: "quote_form_mobile" })}><Phone size={17} aria-hidden="true" /><span>Call now <span className="whitespace-nowrap">{site.phoneDisplay}</span></span></a>;
  if (success) return <div className="form-dark" role="status" aria-live="polite"><h2 className="text-3xl font-semibold mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Request accepted</h2><p>The form provider confirmed your request. You can discuss coverage and any additional details on your call.</p><div className="mt-4">{mobileCall}</div><p className="text-sm mt-4" style={{ color: "#D7D7D7" }}>Need to speak now? <a href={site.phoneHref} onClick={() => emitEvent("click_to_call", { surface: "form_success" })}>Call {site.phoneDisplay}</a>. A specific response time is not guaranteed.</p></div>;
  const fieldError = (field: FieldName) => errors[field] ? <p id={`lead-${field}-error`} className="field-error" role="alert">{errors[field]}</p> : null;
  return <form className="form-dark" onSubmit={submit} noValidate aria-busy={busy} aria-label={kind === "business" ? "Business coverage inquiry" : "Private coverage inquiry"}>
    <div className="mb-4"><strong className="text-sm" style={{ color: "#E2C97E" }}>Your quote request</strong><p className="text-sm leading-6 mt-1">Complete these five details to request a call.</p></div>
    <div className="mb-4 sm:hidden">{mobileCall}<p className="text-xs text-center mt-2" style={{ color: "#D7D7D7" }}>Or request a call below.</p></div>
    <fieldset disabled={busy} className="min-w-0">
      <legend className="sr-only">Contact details and permission for a phone call</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="form-field sm:col-span-2"><label htmlFor="lead-name">Full name *</label><input id="lead-name" name="name" className="form-control" type="text" value={data.name} required placeholder="Full name" autoComplete="name" maxLength={120} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "lead-name-error" : undefined} onChange={(event) => set("name", event.target.value)} />{fieldError("name")}</div>
        <div className="form-field"><label htmlFor="lead-phone">Phone *</label><input id="lead-phone" name="phone" className="form-control" type="tel" value={data.phone} required placeholder="(954) 000-0000" autoComplete="tel" inputMode="tel" maxLength={22} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "lead-phone-error" : undefined} onChange={(event) => set("phone", event.target.value)} />{fieldError("phone")}</div>
        <div className="form-field"><label htmlFor="lead-email">Email *</label><input id="lead-email" name="email" className="form-control" type="email" value={data.email} required placeholder="you@example.com" autoComplete="email" maxLength={254} autoCapitalize="none" spellCheck={false} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "lead-email-error" : undefined} onChange={(event) => set("email", event.target.value)} />{fieldError("email")}</div>
        <div className="form-field"><label htmlFor="lead-zip">ZIP code *</label><input id="lead-zip" name="zip" className="form-control" type="text" value={data.zip} required placeholder="Five-digit ZIP" autoComplete="postal-code" inputMode="numeric" maxLength={10} aria-invalid={Boolean(errors.zip)} aria-describedby={errors.zip ? "lead-zip-error" : `${id}-state-note`} onChange={(event) => set("zip", event.target.value)} />{fieldError("zip")}</div>
        <div className="form-field"><label htmlFor="lead-age">Age *</label><input id="lead-age" name="age" className="form-control" type="number" value={data.age} required placeholder="Age in years" min={0} max={120} step={1} inputMode="numeric" aria-invalid={Boolean(errors.age)} aria-describedby={errors.age ? "lead-age-error" : `${id}-age-note`} onChange={(event) => set("age", event.target.value)} /><p id={`${id}-age-note`} className="text-xs mt-2" style={{ color: "#D7D7D7" }}>Age in whole years, not date of birth.</p>{fieldError("age")}</div>
      </div>
      <div id={`${id}-state-note`} className="text-xs leading-5 mt-2" style={{ color: "#D7D7D7" }} aria-live="polite">{inferredState && !manualState ? <>State: <strong>{stateNames[inferredState] || inferredState}</strong> (from ZIP). <button type="button" className="underline underline-offset-4 p-1" onClick={() => setManualState(true)}>Change state</button></> : inferredState && manualState ? "Confirm your state if it differs from the ZIP's postal location." : stateFallback ? "We could not identify one state for this ZIP. Choose your state below to continue." : "State fills automatically from your ZIP."}</div>
      {stateFallback && <div className="form-field mt-3"><label htmlFor="lead-state">State *</label><select id="lead-state" name="state" className="form-control" value={data.state} required autoComplete="address-level1" aria-invalid={Boolean(errors.state)} aria-describedby={errors.state ? "lead-state-error" : `${id}-state-note`} onChange={(event) => set("state", event.target.value)}>
        <option value="" disabled>Select your state</option>
        <optgroup label="On our licensed-states list (31)">{stateChoices.filter(([abbr]) => mappedStates.has(abbr)).map(([abbr, label]) => <option key={abbr} value={abbr}>{label} ({abbr})</option>)}</optgroup>
        <optgroup label="Other locations — general inquiries only">{stateChoices.filter(([abbr]) => !mappedStates.has(abbr)).map(([abbr, label]) => <option key={abbr} value={abbr}>{label} ({abbr}) — not on our list</option>)}</optgroup>
      </select>{fieldError("state")}</div>}
      {data.state && !mappedStates.has(data.state) && <p className="text-sm leading-6 mt-3 p-3" style={{ border: "1px solid #C9A84C", color: "#FFFFFF" }}>This state is not on our current service-area map. You may send a general inquiry, but coverage availability or a referral is not guaranteed; the team must confirm the next step.</p>}
      <p className="text-xs leading-5 mt-3" style={{ color: "#D7D7D7" }}>Contact method: <strong>Phone call</strong>. Please do not send medical information in this form.</p>
      <label className="form-checkbox mt-3" htmlFor="lead-consent"><input id="lead-consent" name="consent" type="checkbox" required checked={data.consent === "yes"} aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "lead-consent-error" : `${id}-consent-note`} onChange={(event) => set("consent", event.target.checked ? "yes" : "")} /><span>I request that Harrison Health Group contact me by my selected method about this inquiry. I have read the <a href="/privacy" target="_blank" rel="noopener noreferrer">privacy information</a> and <a href="/terms" target="_blank" rel="noopener noreferrer">site-use information</a>.</span></label>
      <p id={`${id}-consent-note`} className="text-xs mt-3" style={{ color: "#D7D7D7" }}>Consent text is subject to owner and counsel approval before public release. No marketing text-message authorization is requested here.</p>
      {fieldError("consent")}
      {submissionError && <div className="form-error-banner mt-5" role="alert">We could not confirm receipt. Please call <a href={site.phoneHref}>{site.phoneDisplay}</a> or <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">book a conversation</a>. Do not assume the request was delivered.</div>}
      <div className="mt-4 pt-4" style={{ borderTop: "1px solid #4B432E" }}><button type="submit" className="btn-primary w-full justify-center" disabled={busy}>{busy ? "Submitting…" : "Request a call"}</button></div>
    </fieldset>
    <p className="text-xs mt-3" style={{ color: "#D7D7D7" }}>ZIP-state data: <a href="https://www.geonames.org/" target="_blank" rel="noopener noreferrer">GeoNames</a> (<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a>). State can be corrected above.</p>
    <p className="text-xs mt-4" style={{ color: "#D7D7D7" }}>Need another route? <a href={site.phoneHref} onClick={() => emitEvent("click_to_call", { surface: "form" })}>Call {site.phoneDisplay}</a> or <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" onClick={() => emitEvent("booking_click", { surface: "form" })}>schedule a conversation</a>.</p>
  </form>;
}
