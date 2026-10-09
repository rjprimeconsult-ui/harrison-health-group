export type FunnelEvent =
  | "form_view" | "form_start" | "form_step_complete" | "form_validation_error"
  | "form_submitted" | "form_submission_success" | "click_to_call"
  | "booking_click" | "resource_guide_view" | "resource_cta_click"
  | "business_form_view" | "business_form_submitted";

const allowedContext = new Set(["form", "step", "route", "intent", "surface", "outcome"]);
export function emitEvent(name: FunnelEvent, context: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  const safe = Object.fromEntries(Object.entries(context).filter(([key]) => allowedContext.has(key)));
  // A local event only. Do not forward PII or health answers to GA4/Ads without an approved consent-aware integration.
  window.dispatchEvent(new CustomEvent("hhg:funnel", { detail: { name, context: safe } }));
}

const GOOGLE_ADS_QUOTE_DESTINATION = "AW-18221337260/__DOCJGJyLocEKyVzvBD";

declare global {
  interface Window {
    gtag?: (command: "event", eventName: "conversion", parameters: { send_to: string }) => void;
  }
}

/**
 * Fires only after Web3Forms explicitly confirms a quote request. Deliberately
 * sends no name, contact information, location, coverage, or health data.
 */
export function trackGoogleAdsQuoteConversion() {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return false;
  window.gtag("event", "conversion", { send_to: GOOGLE_ADS_QUOTE_DESTINATION });
  return true;
}

const ATTR_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid"] as const;
const SESSION_KEY = "hhg_attribution_v1";
export type Attribution = Partial<Record<(typeof ATTR_KEYS)[number], string>> & {
  first_landing_path: string;
  landing_path: string;
  referrer_origin: string;
  session_id: string;
};

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return { first_landing_path: "/", landing_path: "/", referrer_origin: "", session_id: "" };
  let first: Partial<Attribution> = {};
  try { first = JSON.parse(sessionStorage.getItem(SESSION_KEY) || "{}"); } catch { /* bad storage should not block a form */ }
  const params = new URLSearchParams(window.location.search);
  const current = Object.fromEntries(ATTR_KEYS.flatMap((key) => {
    const value = params.get(key);
    return value ? [[key, value.slice(0, 200)]] : [];
  }));
  let referrerOrigin = "";
  try { referrerOrigin = document.referrer ? new URL(document.referrer).origin : ""; } catch { /* ignore invalid referrer */ }
  const record: Attribution = {
    ...current,
    ...first,
    first_landing_path: first.first_landing_path || window.location.pathname,
    landing_path: window.location.pathname,
    referrer_origin: first.referrer_origin || referrerOrigin,
    session_id: first.session_id || crypto.randomUUID(),
  };
  for (const key of ATTR_KEYS) {
    const value = params.get(key);
    if (value && !record[key]) record[key] = value.slice(0, 200);
  }
  try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(record)); } catch { /* storage may be blocked */ }
  return record;
}
