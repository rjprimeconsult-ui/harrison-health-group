/*
 * Anonymous visitor counts for the lead dashboard (owner request 2026-11-03: see where ad visitors drop off).
 *
 * Sends one tiny message per page view and per quote-form step to the dashboard, e.g.
 *   {"e":"form_start","p":"/florida-health-insurance","s":0,"ad":true,"d":"mobile"}
 * No cookie, no visitor ID, no name, phone, email, ZIP or form answer: the dashboard keeps only daily counts.
 * It reuses the existing local funnel events from measurement.ts (which already strip personal data) and does
 * not change the Google Ads tag or conversion code. Runs only on the live site, never in previews or tests.
 */
import { getAttribution, type FunnelEvent } from "@/lib/measurement";

const ENDPOINT = "https://leads.harrisonhealthgroup.com/webhooks/site-event";
const LIVE_HOSTS = new Set(["harrisonhealthgroup.com", "www.harrisonhealthgroup.com"]);
type SiteEvent = FunnelEvent | "page_view" | "quote_cta_click";
const FORWARDED = new Set<SiteEvent>([
  "form_view", "form_start", "form_step_complete", "form_validation_error", "form_submitted",
  "form_submission_success", "click_to_call", "booking_click",
]);

const BUSINESS_ALIASES: Record<string, SiteEvent> = { business_form_view: "form_view", business_form_submitted: "form_submitted" };

/** The event name the dashboard counts for a funnel event, or null when it isn't counted. */
export function forwardedName(name: string): SiteEvent | null {
  const mapped = (BUSINESS_ALIASES[name] ?? name) as SiteEvent;
  return FORWARDED.has(mapped) ? mapped : null;
}

function deviceType(): "mobile" | "tablet" | "desktop" {
  if (window.matchMedia?.("(max-width: 767px)").matches) return "mobile";
  if (window.matchMedia?.("(max-width: 1023px)").matches) return "tablet";
  return "desktop";
}

function cameFromAd(): boolean {
  try {
    const a = getAttribution();
    return Boolean(a.gclid || a.gbraid || a.wbraid || a.utm_medium === "cpc");
  } catch { return false; }
}

export function sendSiteEvent(name: SiteEvent, step = 0): void {
  if (typeof window === "undefined" || !LIVE_HOSTS.has(window.location.hostname) || navigator.webdriver) return;
  const body = JSON.stringify({ e: name, p: window.location.pathname.slice(0, 120), s: step, ad: cameFromAd(), d: deviceType() });
  try {
    // text/plain keeps this a simple request (no CORS preflight); the dashboard only accepts our own origin.
    if (navigator.sendBeacon?.(ENDPOINT, new Blob([body], { type: "text/plain" }))) return;
    void fetch(ENDPOINT, { method: "POST", body, keepalive: true, headers: { "Content-Type": "text/plain" } }).catch(() => {});
  } catch { /* counting must never affect a visitor */ }
}

let started = false;
export function startSiteAnalytics(): void {
  if (started || typeof window === "undefined") return;
  started = true;
  let lastPath = window.location.pathname;
  sendSiteEvent("page_view");
  window.addEventListener("hhg:funnel", (event) => {
    const detail = (event as CustomEvent<{ name: SiteEvent; context?: Record<string, unknown> }>).detail;
    if (!detail) return;
    // The business version of the quote form names two events differently; count them like the consumer form
    // (fixed 2026-11-05: the small-business pages showed quote-button taps but never "saw form").
    const name = forwardedName(detail.name);
    if (name) sendSiteEvent(name, Number(detail.context?.step) || 0);
  });
  // Count page changes inside the site (links handled without a full page load).
  const onRouteChange = () => {
    if (window.location.pathname !== lastPath) { lastPath = window.location.pathname; sendSiteEvent("page_view"); }
  };
  for (const method of ["pushState", "replaceState"] as const) {
    const original = history[method].bind(history);
    history[method] = ((...args: Parameters<History["pushState"]>) => { original(...args); onRouteChange(); }) as History["pushState"];
  }
  window.addEventListener("popstate", onRouteChange);
}
