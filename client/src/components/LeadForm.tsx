import { useEffect, useId, useRef, useState } from "react";
import { site } from "@shared/site";
import { mappedStates } from "@shared/service-area";
import { emitEvent, getAttribution, trackGoogleAdsQuoteConversion } from "@/lib/measurement";

export type LeadKind = "consumer" | "business";
type FieldName = "coverage_intent" | "state" | "zip" | "timeline" | "company_name" | "team_size" | "decision_role" | "first_name" | "last_name" | "email" | "phone" | "preferred_contact" | "consent";
type Lead = Record<FieldName, string>;
const initial: Lead = {
  coverage_intent: "", state: "", zip: "", timeline: "", company_name: "", team_size: "", decision_role: "",
  first_name: "", last_name: "", email: "", phone: "", preferred_contact: "", consent: "",
};
const states = "AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY".split(" ");
export const consentVersion = "contact-request-v1-2026-10-04";
const dashboardWebhook = "https://leads.harrisonhealthgroup.com/webhooks/web-form";
const consentText = "I request that Harrison Health Group contact me by my selected method about this inquiry. I have read the privacy information and site-use information.";

export function validateLead(data: Lead, kind: LeadKind, step: number): Partial<Record<FieldName, string>> {
  const errors: Partial<Record<FieldName, string>> = {};
  if (step === 0) {
    if (!data.coverage_intent) errors.coverage_intent = "Choose the type of conversation you need.";
    if (!states.includes(data.state)) errors.state = "Choose a state.";
    if (!/^\d{5}$/.test(data.zip)) errors.zip = "Enter a five-digit ZIP code.";
    if (kind === "business") {
      if (!data.company_name.trim()) errors.company_name = "Enter the business name.";
      if (!data.team_size) errors.team_size = "Select an approximate team size.";
    }
  }
  if (step === 1) {
    if (!data.first_name.trim()) errors.first_name = "Enter your first name.";
    if (!data.last_name.trim()) errors.last_name = "Enter your last name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Enter a valid email address.";
    if (data.phone.replace(/\D/g, "").length !== 10) errors.phone = "Enter a ten-digit US phone number.";
    if (!data.preferred_contact) errors.preferred_contact = "Choose how to reach you.";
  }
  if (step === 2 && data.consent !== "yes") errors.consent = "Please confirm how we may contact you about your request.";
  return errors;
}

export async function sendLead(data: Lead, kind: LeadKind) {
  const payload = {
    access_key: "97a6d29a-4a4c-42e5-8644-c6f2d14a4a40",
    subject: `Harrison Health Group website ${kind} request`,
    from_name: "Harrison Health Group Website",
    lead_type: kind,
    ...Object.fromEntries(Object.entries(data).filter(([key]) => key !== "consent")),
    consent_text_version: consentVersion,
    consent_at_client_utc: new Date().toISOString(),
    ...getAttribution(),
  };
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
  });
  const result = await response.json().catch(() => null) as { success?: boolean } | null;
  if (!response.ok || result?.success !== true) throw new Error("Lead provider did not confirm acceptance");
  const dashboardLead = Object.fromEntries(Object.entries(payload).filter(([key]) => !["access_key", "subject", "from_name"].includes(key)));
  const pageUrl = typeof window === "undefined" ? "" : `${window.location.origin}${window.location.pathname}`;
  // The dashboard is an operational routing copy, not the form success gate. Web3Forms remains the email backup.
  void fetch(dashboardWebhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    keepalive: true,
    body: JSON.stringify({
      ...dashboardLead,
      consent: data.consent === "yes",
      consent_text: consentText,
      page_url: pageUrl,
    }),
  }).catch(() => { /* routing failure must not turn a confirmed quote request into a visitor-facing error */ });
  return result;
}

interface FieldProps { name: FieldName; label: string; data: Lead; errors: Partial<Record<FieldName, string>>; set: (name: FieldName, value: string) => void; options?: { value: string; label: string }[]; type?: string; hint?: string; required?: boolean; }
function Field({ name, label, data, errors, set, options, type = "text", hint, required = true }: FieldProps) {
  const id = `lead-${name}`;
  return <div className="form-field">
    <label htmlFor={id}>{label}{required ? " *" : ""}</label>
    {options ? <select id={id} name={name} className="form-control" value={data[name]} required={required} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${id}-error` : undefined} onChange={(e) => set(name, e.target.value)}>
      <option value="" disabled>Select an option</option>
      {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select> : <input id={id} name={name} className="form-control" type={type} value={data[name]} required={required} placeholder={hint} autoComplete={name === "zip" ? "postal-code" : name === "state" ? "address-level1" : name.replace("_", "-")} inputMode={name === "zip" || name === "phone" ? "numeric" : undefined} maxLength={name === "zip" ? 5 : name === "phone" ? 18 : 120} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${id}-error` : undefined} onChange={(e) => set(name, name === "zip" ? e.target.value.replace(/\D/g, "").slice(0, 5) : e.target.value)} />}
    {errors[name] && <p id={`${id}-error`} className="field-error" role="alert">{errors[name]}</p>}
  </div>;
}
const options = (labels: string[]) => labels.map((label) => ({ value: label, label }));

export default function LeadForm({ kind = "consumer" }: { kind?: LeadKind }) {
  const [data, setData] = useState<Lead>(initial);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);
  const id = useId();
  const started = useRef(false);
  useEffect(() => { emitEvent(kind === "business" ? "business_form_view" : "form_view", { form: kind }); }, [kind]);
  const set = (name: FieldName, value: string) => {
    if (!started.current) { emitEvent("form_start", { form: kind }); started.current = true; }
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };
  const goNext = () => {
    const invalid = validateLead(data, kind, step);
    if (Object.keys(invalid).length) {
      setErrors(invalid); emitEvent("form_validation_error", { form: kind, step: step + 1 });
      setTimeout(() => document.getElementById(`lead-${Object.keys(invalid)[0]}`)?.focus(), 0);
      return;
    }
    setErrors({}); emitEvent("form_step_complete", { form: kind, step: step + 1 }); setStep((previous) => previous + 1);
  };
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy || success) return;
    const invalid = validateLead(data, kind, 2);
    if (Object.keys(invalid).length) { setErrors(invalid); emitEvent("form_validation_error", { form: kind, step: 3 }); document.getElementById("lead-consent")?.focus(); return; }
    setBusy(true); setSubmissionError(false);
    emitEvent(kind === "business" ? "business_form_submitted" : "form_submitted", { form: kind });
    try {
      await sendLead(data, kind);
      trackGoogleAdsQuoteConversion();
      setSuccess(true);
      emitEvent("form_submission_success", { form: kind });
    }
    catch { setSubmissionError(true); }
    finally { setBusy(false); }
  };
  if (success) return <div className="form-dark" role="status" aria-live="polite"><h2 className="text-3xl font-semibold mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Request accepted</h2><p>The form provider confirmed your request. If you need to speak with us now, call <a href={site.phoneHref} onClick={() => emitEvent("click_to_call", { surface: "form_success" })}>{site.phoneDisplay}</a>. A specific response time is not guaranteed.</p></div>;
  return <form className="form-dark" onSubmit={submit} noValidate aria-label={kind === "business" ? "Business coverage inquiry" : "Private coverage inquiry"}>
    <div className="flex items-center justify-between gap-3 mb-5"><strong className="text-sm" style={{ color: "#E2C97E" }}>{["Coverage and location", "Contact information", "Review and submit"][step]}</strong><span className="text-sm">Step {step + 1} of 3</span></div>
    <div className="h-1 mb-7" style={{ background: "#555555" }} role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={3} aria-label="Form progress"><div style={{ background: "#C9A84C", width: `${((step + 1) / 3) * 100}%`, height: "100%" }} /></div>
    {step === 0 && <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field name="coverage_intent" label="What would you like to discuss?" data={data} errors={errors} set={set} options={options(kind === "business" ? ["New group coverage", "Review current group coverage", "Planning for renewal", "Not sure yet"] : ["Individual coverage", "Family coverage", "Self-employed coverage", "Not sure yet"])} />
      <Field name="state" label="State" data={data} errors={errors} set={set} options={states.map((s) => ({ value: s, label: s }))} />
      <Field name="zip" label="ZIP code" data={data} errors={errors} set={set} hint="Five-digit ZIP" />
      <Field name="timeline" label="When would you like to talk?" data={data} errors={errors} set={set} required={false} options={options(["Soon", "Within a month", "Later / exploring"])} />
      {kind === "business" && <><Field name="company_name" label="Business name" data={data} errors={errors} set={set} hint="Business name" /><Field name="team_size" label="Approximate team size" data={data} errors={errors} set={set} options={options(["1–4", "5–19", "20–49", "50+"])} /><Field name="decision_role" label="Your role" data={data} errors={errors} set={set} required={false} options={options(["Owner", "HR / benefits", "Other"])} /></>}
    </div>}
    {step === 0 && data.state && !mappedStates.has(data.state) && <p className="text-sm leading-6 mt-5 p-3" style={{ border: "1px solid #C9A84C", color: "#FFFFFF" }}>This state is not on our current service-area map. You may send a general inquiry, but coverage availability or a referral is not guaranteed; the team must confirm the next step.</p>}
    {step === 1 && <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field name="first_name" label="First name" data={data} errors={errors} set={set} hint="First name" />
      <Field name="last_name" label="Last name" data={data} errors={errors} set={set} hint="Last name" />
      <Field name="email" label="Email" data={data} errors={errors} set={set} hint="you@example.com" type="email" />
      <Field name="phone" label="Phone" data={data} errors={errors} set={set} hint="(954) 000-0000" type="tel" />
      <Field name="preferred_contact" label="Preferred contact" data={data} errors={errors} set={set} options={options(["Phone call", "Email"])} />
    </div>}
    {step === 2 && <div className="space-y-5">
      <p className="text-sm leading-7">Please check your contact details: <strong>{data.first_name} {data.last_name}</strong> · {data.email} · {data.phone}. You asked to discuss {data.coverage_intent.toLowerCase()} in {data.state}.</p>
      <p className="text-sm">This is a request for a conversation, not a coverage quote or application. Please do not send medical information in this form.</p>
      <label className="form-checkbox" htmlFor="lead-consent"><input id="lead-consent" name="consent" type="checkbox" checked={data.consent === "yes"} aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "consent-error" : `${id}-consent-note`} onChange={(e) => set("consent", e.target.checked ? "yes" : "")} /><span>I request that Harrison Health Group contact me by my selected method about this inquiry. I have read the <a href="/privacy" target="_blank" rel="noopener noreferrer">privacy information</a> and <a href="/terms" target="_blank" rel="noopener noreferrer">site-use information</a>.</span></label>
      <p id={`${id}-consent-note`} className="text-xs" style={{ color: "#D7D7D7" }}>Consent text is subject to owner and counsel approval before public release. No marketing text-message authorization is requested here.</p>
      {errors.consent && <p id="consent-error" className="field-error" role="alert">{errors.consent}</p>}
    </div>}
    {submissionError && <div className="form-error-banner mt-5" role="alert">We could not confirm receipt. Please call <a href={site.phoneHref}>{site.phoneDisplay}</a> or <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">book a conversation</a>. Do not assume the request was delivered.</div>}
    <div className="flex justify-between gap-3 mt-7 pt-5" style={{ borderTop: "1px solid #4B432E" }}>
      <button type="button" className="page-link" style={{ color: "#FFFFFF", opacity: step === 0 ? .5 : 1 }} disabled={step === 0 || busy} onClick={() => { setErrors({}); setStep((current) => current - 1); }}>Back</button>
      {step < 2 ? <button type="button" className="btn-primary" onClick={goNext}>Continue</button> : <button type="submit" className="btn-primary" disabled={busy}>{busy ? "Submitting…" : "Submit request"}</button>}
    </div>
    <p className="text-xs mt-5" style={{ color: "#D7D7D7" }}>Need another route? <a href={site.phoneHref} onClick={() => emitEvent("click_to_call", { surface: "form" })}>Call {site.phoneDisplay}</a> or <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" onClick={() => emitEvent("booking_click", { surface: "form" })}>schedule a conversation</a>.</p>
  </form>;
}
