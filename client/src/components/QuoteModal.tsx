/*
 * HARRISON HEALTH GROUP — Multi-Step Quote Form Modal
 * Design: Solid Black (#0A0A0A) background, White text, Gold accents — NO gradients/glass
 * Steps: 1. Personal Info → 2. Coverage Needs → 3. Household Details → 4. Confirmation
 * Submission: Web3Forms email + Google Sheets CRM logging
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, User, Users, Shield, ChevronRight,
  ChevronLeft, Check, Loader2, AlertCircle
} from "lucide-react";

const WEB3FORMS_ACCESS_KEY = "97a6d29a-4a4c-42e5-8644-c6f2d14a4a40";
const SHEETS_WEBHOOK_URL   = "YOUR_GOOGLE_SHEETS_WEBHOOK";

interface FormData {
  firstName: string; lastName: string; email: string; phone: string;
  state: string; zipCode: string; coverageType: string; currentInsurance: string;
  budget: string; dob: string; householdSize: string; tobaccoUser: string;
  employmentStatus: string; preferredContact: string; bestTime: string; additionalNotes: string;
}

const INITIAL: FormData = {
  firstName: "", lastName: "", email: "", phone: "", state: "", zipCode: "",
  coverageType: "", currentInsurance: "", budget: "",
  dob: "", householdSize: "", tobaccoUser: "", employmentStatus: "",
  preferredContact: "", bestTime: "", additionalNotes: "",
};

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada",
  "New Hampshire","New Jersey","New Mexico","New York","North Carolina",
  "North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island",
  "South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont",
  "Virginia","Washington","West Virginia","Wisconsin","Wyoming",
];

const COVERAGE_TYPES = [
  "Individual Plan","Family Plan","Self-Employed / 1099","Small Business Group",
  "Dental & Vision Only","Supplemental Coverage","Private vs. Marketplace","Not Sure — Need Guidance",
];

const BUDGET_RANGES = [
  "Under $200/month","$200–$400/month","$400–$600/month",
  "$600–$800/month","$800–$1,000/month","$1,000+/month","Not Sure",
];

const HOUSEHOLD_SIZES = ["Just Me","Me + Spouse","Me + Child(ren)","Me + Spouse + Child(ren)","Other"];
const EMPLOYMENT_STATUSES = ["Employed (W-2)","Self-Employed / 1099","Business Owner","Unemployed","Retired","Student"];
const CONTACT_PREFS = ["Phone Call","Text Message","Email","Any — Whatever's Fastest"];
const BEST_TIMES = ["Morning (8am–12pm)","Afternoon (12pm–5pm)","Evening (5pm–8pm)","Weekends Only"];

// ─── Step Progress Bar ───────────────────────────────────────────────────────
function StepBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2 flex-1">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all duration-300"
            style={{
              background: i <= step
                ? "linear-gradient(135deg, #E2C97E, #C9A84C)"
                : "rgba(255,255,255,0.10)",
              color: i <= step ? "#0A0A0A" : "rgba(255,255,255,0.35)",
              boxShadow: i === step ? "0 0 16px rgba(201,168,76,0.50)" : "none",
            }}
          >
            {i < step ? <Check size={13} /> : i + 1}
          </div>
          {i < total - 1 && (
            <div
              className="h-px flex-1 transition-all duration-500"
              style={{
                background: i < step
                  ? "linear-gradient(90deg, #C9A84C, rgba(201,168,76,0.3))"
                  : "rgba(255,255,255,0.12)",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Field + Input Components ────────────────────────────────────────────────
function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", fontWeight: 600, color: "rgba(255,255,255,0.80)", letterSpacing: "0.02em" }}>
        {label}
        {required && <span style={{ color: "#C9A84C", marginLeft: 3 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.65rem 0.9rem",
  borderRadius: 8,
  background: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(201,168,76,0.30)",
  color: "#FFFFFF",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "0.9rem",
  outline: "none",
  transition: "border-color 0.2s, background 0.2s",
};

const focusIn = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  e.target.style.borderColor = "rgba(201,168,76,0.80)";
  e.target.style.background = "rgba(255,255,255,0.11)";
};
const focusOut = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  e.target.style.borderColor = "rgba(201,168,76,0.30)";
  e.target.style.background = "rgba(255,255,255,0.07)";
};

function TextInput({ value, onChange, placeholder, type = "text" }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder} style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
  );
}

function SelectInput({ value, onChange, options, placeholder }: {
  value: string; onChange: (v: string) => void; options: string[]; placeholder?: string;
}) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}
      style={{ ...inputStyle, appearance: "none" }} onFocus={focusIn} onBlur={focusOut}>
      <option value="" disabled style={{ background: "#111111", color: "#FFFFFF" }}>{placeholder || "Select…"}</option>
      {options.map((o) => (
        <option key={o} value={o} style={{ background: "#111111", color: "#FFFFFF" }}>{o}</option>
      ))}
    </select>
  );
}

function PhoneInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const format = (raw: string) => {
    const d = raw.replace(/\D/g, "").slice(0, 10);
    if (d.length <= 3) return d;
    if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  };
  return (
    <input type="tel" value={value} onChange={(e) => onChange(format(e.target.value))}
      placeholder="(954) 000-0000" style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
  );
}

// ─── Steps ───────────────────────────────────────────────────────────────────
function Step1({ data, set }: { data: FormData; set: (k: keyof FormData, v: string) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="First Name" required><TextInput value={data.firstName} onChange={(v) => set("firstName", v)} placeholder="John" /></Field>
      <Field label="Last Name" required><TextInput value={data.lastName} onChange={(v) => set("lastName", v)} placeholder="Smith" /></Field>
      <Field label="Email Address" required><TextInput value={data.email} onChange={(v) => set("email", v)} placeholder="john@email.com" type="email" /></Field>
      <Field label="Phone Number" required><PhoneInput value={data.phone} onChange={(v) => set("phone", v)} /></Field>
      <Field label="State" required><SelectInput value={data.state} onChange={(v) => set("state", v)} options={US_STATES} placeholder="Select your state" /></Field>
      <Field label="ZIP Code" required><TextInput value={data.zipCode} onChange={(v) => set("zipCode", v.replace(/\D/g, "").slice(0, 5))} placeholder="33323" /></Field>
    </div>
  );
}

function Step2({ data, set }: { data: FormData; set: (k: keyof FormData, v: string) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Coverage Type Needed" required>
        <SelectInput value={data.coverageType} onChange={(v) => set("coverageType", v)} options={COVERAGE_TYPES} placeholder="Select coverage type" />
      </Field>
      <Field label="Current Insurance Status">
        <SelectInput value={data.currentInsurance} onChange={(v) => set("currentInsurance", v)}
          options={["Uninsured","Currently Insured — Looking to Switch","COBRA","Medicaid / Medicare","Employer Plan — Losing Coverage"]}
          placeholder="Current status" />
      </Field>
      <Field label="Monthly Budget" required>
        <SelectInput value={data.budget} onChange={(v) => set("budget", v)} options={BUDGET_RANGES} placeholder="Select budget range" />
      </Field>
      <Field label="Employment Status" required>
        <SelectInput value={data.employmentStatus} onChange={(v) => set("employmentStatus", v)} options={EMPLOYMENT_STATUSES} placeholder="Select status" />
      </Field>
    </div>
  );
}

function Step3({ data, set }: { data: FormData; set: (k: keyof FormData, v: string) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="Date of Birth" required><TextInput value={data.dob} onChange={(v) => set("dob", v)} type="date" /></Field>
      <Field label="Household Size" required>
        <SelectInput value={data.householdSize} onChange={(v) => set("householdSize", v)} options={HOUSEHOLD_SIZES} placeholder="Select household size" />
      </Field>
      <Field label="Tobacco User?">
        <SelectInput value={data.tobaccoUser} onChange={(v) => set("tobaccoUser", v)}
          options={["No","Yes — Currently","Yes — Quit Within Last 12 Months"]} placeholder="Select" />
      </Field>
      <div className="sm:col-span-2">
        <Field label="Preferred Contact Method">
          <SelectInput value={data.preferredContact} onChange={(v) => set("preferredContact", v)} options={CONTACT_PREFS} placeholder="How should we reach you?" />
        </Field>
      </div>
      <Field label="Best Time to Reach You">
        <SelectInput value={data.bestTime} onChange={(v) => set("bestTime", v)} options={BEST_TIMES} placeholder="Select time" />
      </Field>
      <div className="sm:col-span-2">
        <Field label="Additional Notes">
          <textarea
            value={data.additionalNotes}
            onChange={(e) => set("additionalNotes", e.target.value)}
            placeholder="Any specific needs, questions, or details we should know…"
            rows={3}
            style={{ ...inputStyle, resize: "vertical" }}
            onFocus={focusIn as React.FocusEventHandler<HTMLTextAreaElement>}
            onBlur={focusOut as React.FocusEventHandler<HTMLTextAreaElement>}
          />
        </Field>
      </div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-4 py-2" style={{ borderBottom: "1px solid rgba(201,168,76,0.12)" }}>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: "rgba(201,168,76,0.70)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</span>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#FFFFFF", textAlign: "right" }}>{value}</span>
    </div>
  );
}

function Step4Review({ data }: { data: FormData }) {
  return (
    <div className="flex flex-col gap-1">
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", marginBottom: "1rem", lineHeight: 1.6 }}>
        Please review your information before submitting. A licensed advisor from Harrison Health Group will contact you within 1 business day.
      </p>
      <ReviewRow label="Name" value={`${data.firstName} ${data.lastName}`} />
      <ReviewRow label="Email" value={data.email} />
      <ReviewRow label="Phone" value={data.phone} />
      <ReviewRow label="Location" value={`${data.zipCode}, ${data.state}`} />
      <ReviewRow label="Coverage Type" value={data.coverageType} />
      <ReviewRow label="Employment" value={data.employmentStatus} />
      <ReviewRow label="Budget" value={data.budget} />
      <ReviewRow label="Household" value={data.householdSize} />
      <ReviewRow label="Date of Birth" value={data.dob} />
      <ReviewRow label="Tobacco" value={data.tobaccoUser} />
      <ReviewRow label="Best Contact" value={`${data.preferredContact} — ${data.bestTime}`} />
      {data.additionalNotes && <ReviewRow label="Notes" value={data.additionalNotes} />}
    </div>
  );
}

// ─── Submission ───────────────────────────────────────────────────────────────
async function submitLead(data: FormData): Promise<void> {
  const body = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: `New Quote Request — ${data.firstName} ${data.lastName} | ${data.state}`,
    from_name: "Harrison Health Group Website",
    name: `${data.firstName} ${data.lastName}`,
    email: data.email, phone: data.phone, state: data.state, zip: data.zipCode,
    coverage_type: data.coverageType, current_insurance: data.currentInsurance,
    budget: data.budget, employment: data.employmentStatus, dob: data.dob,
    household_size: data.householdSize, tobacco: data.tobaccoUser,
    preferred_contact: data.preferredContact, best_time: data.bestTime,
    notes: data.additionalNotes, redirect: "false",
  };
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Web3Forms submission failed");
  if (SHEETS_WEBHOOK_URL !== "YOUR_GOOGLE_SHEETS_WEBHOOK") {
    await fetch(SHEETS_WEBHOOK_URL, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, submittedAt: new Date().toISOString() }),
    }).catch(() => {});
  }
}

// ─── Main Modal ───────────────────────────────────────────────────────────────
const STEP_TITLES = [
  { title: "Personal Information", subtitle: "Tell us a bit about yourself", icon: User },
  { title: "Coverage Needs", subtitle: "What kind of coverage are you looking for?", icon: Shield },
  { title: "Household Details", subtitle: "Help us find the best plan for your situation", icon: Users },
  { title: "Review & Submit", subtitle: "Almost done — confirm your details", icon: Check },
];

interface QuoteModalProps { isOpen: boolean; onClose: () => void; }

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const set = (k: keyof FormData, v: string) => setData((prev) => ({ ...prev, [k]: v }));

  const validateStep = (): boolean => {
    if (step === 0) {
      if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.state || !data.zipCode) {
        setError("Please fill in all required fields."); return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        setError("Please enter a valid email address."); return false;
      }
    }
    if (step === 1 && (!data.coverageType || !data.budget || !data.employmentStatus)) {
      setError("Please fill in all required fields."); return false;
    }
    if (step === 2 && (!data.dob || !data.householdSize)) {
      setError("Please fill in all required fields."); return false;
    }
    setError(""); return true;
  };

  const next = () => { if (!validateStep()) return; if (step < 3) setStep((s) => s + 1); };
  const back = () => { setError(""); setStep((s) => Math.max(0, s - 1)); };

  const handleSubmit = async () => {
    setSubmitting(true); setError("");
    try { await submitLead(data); setSubmitted(true); }
    catch { setError("Something went wrong. Please call us directly at (954) 600-0342."); }
    finally { setSubmitting(false); }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setStep(0); setData(INITIAL); setSubmitted(false); setError(""); }, 400);
  };

  const CurrentIcon = STEP_TITLES[step]?.icon ?? User;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — pure dark, no blur */}
          <motion.div
            className="fixed inset-0 z-50"
            style={{ background: "rgba(0,0,0,0.88)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal container */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-2xl"
              style={{
                background: "#0A0A0A",          /* solid black — no gradient */
                border: "1px solid rgba(201,168,76,0.35)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.90), 0 0 0 1px rgba(201,168,76,0.10)",
              }}
              initial={{ scale: 0.92, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.65)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.16)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
              >
                <X size={14} />
              </button>

              <div className="p-7">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #E2C97E, #C9A84C)", boxShadow: "0 0 20px rgba(201,168,76,0.35)" }}
                  >
                    {submitted ? <Check size={18} color="#0A0A0A" /> : <CurrentIcon size={18} color="#0A0A0A" />}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1.5rem", color: "#FFFFFF", lineHeight: 1.1 }}>
                      {submitted ? "Request Received!" : STEP_TITLES[step].title}
                    </h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "rgba(201,168,76,0.75)" }}>
                      {submitted ? "We'll be in touch within 1 business day" : STEP_TITLES[step].subtitle}
                    </p>
                  </div>
                </div>

                {/* Success State */}
                {submitted ? (
                  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{ background: "rgba(201,168,76,0.12)", border: "2px solid rgba(201,168,76,0.45)" }}>
                      <Check size={36} style={{ color: "#C9A84C" }} />
                    </div>
                    <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1.8rem", color: "#FFFFFF", marginBottom: "0.75rem" }}>
                      Thank You, {data.firstName}!
                    </h4>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: 360, margin: "0 auto 2rem" }}>
                      Your quote request has been received. A licensed advisor will contact you at{" "}
                      <strong style={{ color: "#C9A84C" }}>{data.phone}</strong> within 1 business day.
                    </p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.40)" }}>
                      Need immediate assistance?{" "}
                      <a href="tel:+19546000342" style={{ color: "#C9A84C", textDecoration: "none" }}>Call (954) 600-0342</a>
                    </p>
                    <button onClick={handleClose} className="mt-6 btn-primary">Close</button>
                  </motion.div>
                ) : (
                  <>
                    <StepBar step={step} total={4} />

                    <AnimatePresence mode="wait">
                      <motion.div key={step}
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}>
                        {step === 0 && <Step1 data={data} set={set} />}
                        {step === 1 && <Step2 data={data} set={set} />}
                        {step === 2 && <Step3 data={data} set={set} />}
                        {step === 3 && <Step4Review data={data} />}
                      </motion.div>
                    </AnimatePresence>

                    {/* Error */}
                    <AnimatePresence>
                      {error && (
                        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                          className="flex items-center gap-2 mt-4 px-4 py-3 rounded-lg"
                          style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.35)" }}>
                          <AlertCircle size={14} style={{ color: "#F87171", flexShrink: 0 }} />
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "#F87171" }}>{error}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-6 pt-5" style={{ borderTop: "1px solid rgba(201,168,76,0.15)" }}>
                      <button
                        onClick={back} disabled={step === 0}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          background: step === 0 ? "transparent" : "rgba(255,255,255,0.07)",
                          border: "1px solid rgba(255,255,255,0.10)",
                          color: step === 0 ? "rgba(255,255,255,0.20)" : "rgba(255,255,255,0.75)",
                          cursor: step === 0 ? "not-allowed" : "pointer",
                        }}
                      >
                        <ChevronLeft size={15} />Back
                      </button>

                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: "rgba(201,168,76,0.60)", letterSpacing: "0.1em" }}>
                        STEP {step + 1} OF 4
                      </div>

                      {step < 3 ? (
                        <button onClick={next} className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold btn-primary">
                          Continue <ChevronRight size={15} />
                        </button>
                      ) : (
                        <button onClick={handleSubmit} disabled={submitting}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold btn-primary"
                          style={{ opacity: submitting ? 0.7 : 1 }}>
                          {submitting
                            ? <><Loader2 size={15} className="animate-spin" />Submitting…</>
                            : <><Shield size={15} />Submit Request</>}
                        </button>
                      )}
                    </div>

                    {/* TCPA Disclaimer */}
                    <p className="mt-4 text-center" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", color: "rgba(255,255,255,0.30)", lineHeight: 1.5 }}>
                      By submitting, you consent to be contacted by Harrison Health Group via phone, text,
                      or email regarding health insurance options. No obligation. NPN: 20611469.
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
