import { describe, expect, it, vi } from "vitest";
import { indexablePages, moreStates, publicPages, stateSlug } from "../../shared/site";
import { renderMeta } from "../../shared/seo";
import { guides, faqs } from "./content/guides";
import { validateLead, sendLead, normalizePhone, splitContactName, stateForLandingPath } from "./components/LeadForm";
import { mappedStates } from "../../shared/service-area";
import { HARRISON_GOOGLE_MAPS_URL, HARRISON_PLACE_ID, isHarrisonListing, safeExternalUrl, safeGoogleAvatarUrl, safeGoogleMapsUrl, toGoogleReviewSnapshot } from "./lib/google-reviews";
import { teamMembers } from "./content/team";
import { formatPhoneInput, stateForZip } from "./lib/zip-state";
import zipData from "./content/zip-state-data.json";

const valid = { coverage_intent: "Individual coverage", state: "FL", zip: "33323", timeline: "", company_name: "Business", team_size: "1–4", decision_role: "", first_name: "Pat", last_name: "Example", email: "pat@example.org", phone: "9546000342", preferred_contact: "Email", consent: "yes" };
describe("Harrison facts and routes", () => {
  it("uses the owner-corrected 31-state map: Delaware in, New Mexico out", () => {
    expect(mappedStates.size).toBe(31);
    expect(mappedStates.has("DE")).toBe(true);
    expect(mappedStates.has("NM")).toBe(false);
    // Every state on the map has its own page (owner request 2026-11-05).
    const paths = new Set(publicPages.map((page) => page.path));
    const names: Record<string, string> = { FL: "Florida", TX: "Texas", GA: "Georgia", ...Object.fromEntries(moreStates.map((s) => [s.abbr, s.name])) };
    for (const abbr of mappedStates) {
      expect(names[abbr], abbr).toBeTruthy();
      expect(paths.has(`/${stateSlug(names[abbr])}-health-insurance`), abbr).toBe(true);
    }
    expect(moreStates.length).toBe(28);
  });
  it("keeps one canonical path and unique, bounded metadata per indexable route", () => {
    expect(new Set(publicPages.map((page) => page.path)).size).toBe(publicPages.length);
    expect(new Set(indexablePages.map((page) => page.title)).size).toBe(indexablePages.length);
    for (const page of publicPages) {
      expect(page.description.length).toBeGreaterThanOrEqual(50);
      expect(page.description.length).toBeLessThanOrEqual(160);
      const html = renderMeta(page.path);
      expect((html.match(/rel="canonical"/g) || []).length).toBe(1);
      expect(html).toContain(page.indexable ? 'content="index,follow' : 'content="noindex,nofollow"');
      expect(html).not.toMatch(/AggregateRating|SearchAction|FAQPage|openingHoursSpecification|priceRange|20\+|lowest cost|93%/);
    }
  });
  it("has five substantive original guides with linked related slugs", () => {
    // Fourth guide (off-exchange) added 2026-11-04 at the owner's request, from the Semrush keyword review.
    expect(guides.map((guide) => guide.slug)).toEqual(["private-vs-marketplace", "self-employed-coverage", "small-business-benefits", "off-exchange-health-insurance", "compare-private-health-insurance-companies"]);   // fifth guide 2026-11-06 (owner request, Semrush clusters)
    for (const guide of guides) {
      const text = [guide.intro, ...guide.sections.flatMap((section) => section.body), ...guide.checklist, ...guide.faqs.map(({ question, answer }) => `${question} ${answer}`)].join(" ");
      expect(text.trim().split(/\s+/).length).toBeGreaterThanOrEqual(800);
      expect(guide.related.every((slug) => guides.some((item) => item.slug === slug && slug !== guide.slug))).toBe(true);
    }
    expect(faqs.length).toBeGreaterThanOrEqual(6);
  });
  it("keeps the owner-confirmed advisor titles and a distinct specialty for every team member", () => {
    expect(teamMembers).toHaveLength(9);   // owner added Kevin, Erick and Jermaine 2026-10-29
    expect(teamMembers[0]).toMatchObject({ name: "Shaquille Harrison", title: "Founder and Senior Health Advisor" });
    expect(teamMembers.slice(1, 8).every((member) => member.title === "Licensed Health Advisor")).toBe(true);
    expect(teamMembers[8]).toMatchObject({ name: "Jermaine Robinson", title: "Chief Operations Officer and Executive Assistant" });
    expect(new Set(teamMembers.map((member) => member.specialty)).size).toBe(teamMembers.length);
    expect(teamMembers.every((member) => member.specialty.trim().length >= 100)).toBe(true);
    expect(teamMembers.map((member) => member.title)).not.toContain("Team Member");
  });
});

describe("lead validation and provider acknowledgements", () => {
  it("rejects missing routing fields, malformed contacts, and unchecked consent", () => {
    expect(Object.keys(validateLead({ ...valid, zip: "3", state: "XX" }))).toEqual(["state", "zip"]);
    expect(validateLead({ ...valid, first_name: "" }).first_name).toBeTruthy();
    expect(validateLead({ ...valid, phone: "123" }).phone).toBeTruthy();
    expect(validateLead({ ...valid, phone: "abc9546000342" }).phone).toBeTruthy();
    expect(validateLead({ ...valid, consent: "" }).consent).toBeTruthy();
    expect(validateLead({ ...valid, first_name: "x".repeat(121) }).first_name).toBeTruthy();
  });
  it("accepts the owner-approved Step 1 with no email, coverage, timeline or business details", () => {
    const minimal = { ...valid, last_name: "", email: "", coverage_intent: "", timeline: "", company_name: "", team_size: "", decision_role: "", preferred_contact: "Phone call" };
    expect(validateLead(minimal)).toEqual({});
    expect(normalizePhone("+1 (954) 600-0342")).toBe("9546000342");
    expect(validateLead({ ...minimal, phone: "+1 (954) 600-0342" })).toEqual({});
    expect(splitContactName("  Pat  Jordan Example  ")).toEqual({ first_name: "Pat", last_name: "Jordan Example" });
    expect(splitContactName("Pat")).toEqual({ first_name: "Pat", last_name: "" });
  });
  it("does not let optional email, last name, coverage or contact preference block the phone-call request", () => {
    expect(validateLead({ ...valid, last_name: "", email: "", preferred_contact: "", coverage_intent: "", timeline: "", company_name: "", team_size: "" })).toEqual({});
    // The email is not collected in this short form; even a stale optional value must not gate a valid phone callback.
    expect(validateLead({ ...valid, email: "stale-incomplete-email", phone: "+1 (754) 276-7544" })).toEqual({});
    expect(validateLead({ ...valid, phone: "754\u2011276\u20117544" })).toEqual({});
    expect(validateLead({ ...valid, phone: "123456789012" }).phone).toBeTruthy();
  });
  it("formats phone input as typed without discarding unsupported excess digits", () => {
    expect(formatPhoneInput("754")).toBe("754");
    expect(formatPhoneInput("7542")).toBe("(754) 2");
    expect(formatPhoneInput("7542767544")).toBe("(754) 276-7544");
    expect(formatPhoneInput("+1 (754) 276-7544")).toBe("(754) 276-7544");
    expect(normalizePhone(formatPhoneInput("123456789012"))).toBe("123456789012");
    const excessiveCountryDigits = formatPhoneInput("+1 19546000342");
    expect(excessiveCountryDigits).toBe("(195) 460-00342");
    expect(formatPhoneInput(excessiveCountryDigits)).toBe(excessiveCountryDigits);
    expect(normalizePhone(excessiveCountryDigits)).toBe("19546000342");
    expect(validateLead({ ...valid, phone: excessiveCountryDigits }).phone).toBeTruthy();
  });
  it("uses postal-state ZIP records rather than approximate prefixes, facility states or a landing-page guess", () => {
    expect(stateForZip("33323")).toBe("FL");
    expect(stateForZip("00501")).toBe("NY");
    expect(stateForZip("06390")).toBe("NY"); // Not CT despite its 063 prefix.
    expect(stateForZip("02914")).toBe("RI"); // Not the preferred USPS facility's MA state.
    expect(stateForZip("19964")).toBe("DE"); // Not the postal facility's MD state.
    expect(stateForZip("75001")).toBe("TX");
    expect(stateForZip("19701")).toBe("DE");
    expect(stateForZip("87101")).toBe("NM");
    expect(stateForZip("20001")).toBe("DC");
    expect(stateForZip("00601")).toBe("PR");
    expect(stateForZip("20020")).toBe("DC");
    for (const zip of ["", "3332", "00000", "99999", "ABCDE", "33323-0000"]) expect(stateForZip(zip)).toBe("");
  });
  it("keeps every postal-state lookup range ordered, disjoint, and consistent with the source ZIP count", () => {
    let count = 0, previousEnd = -1;
    for (const [first, last, state] of zipData.ranges) {
      expect(typeof first).toBe("number"); expect(typeof last).toBe("number");
      expect(Number(first)).toBeGreaterThan(previousEnd);
      expect(Number(last)).toBeGreaterThanOrEqual(Number(first));
      expect(stateForZip(String(first).padStart(5, "0"))).toBe(state);
      expect(stateForZip(String(last).padStart(5, "0"))).toBe(state);
      count += Number(last) - Number(first) + 1;
      previousEnd = Number(last);
    }
    expect(count).toBe(zipData.zipCount);
    expect(zipData.source).toBe("https://www.geonames.org/postal-codes/postal-codes-us.html");
    expect(zipData.sourceLicense).toBe("https://creativecommons.org/licenses/by/4.0/");
  });
  it("prefills only registered state, county, Spanish, self-employed and business landing pages", () => {
    for (const page of publicPages.filter((page) => page.kind === "landing")) {
      expect(mappedStates.has(stateForLandingPath(page.path)), page.path).toBe(true);
    }
    expect(stateForLandingPath("/broward-county-health-insurance")).toBe("FL");
    expect(stateForLandingPath("/seguro-medico-texas")).toBe("TX");
    expect(stateForLandingPath("/north-carolina-health-insurance?gclid=test#quote-form")).toBe("NC");
    expect(stateForLandingPath("/small-business-health-insurance-georgia/")).toBe("GA");
    expect(stateForLandingPath("/unknown-florida")).toBe("");
    expect(stateForLandingPath("/contact")).toBe("");
  });
  it("never treats HTTP 200 with success:false as a confirmed lead", async () => {
    const mock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: false }) });
    vi.stubGlobal("fetch", mock);
    await expect(sendLead(valid, "consumer")).rejects.toThrow("did not confirm acceptance");
    expect(mock).toHaveBeenCalledTimes(1);
    const payload = JSON.parse(mock.mock.calls[0][1].body);
    expect(payload).not.toHaveProperty("dob");
    expect(payload).not.toHaveProperty("budget");
    expect(payload).toHaveProperty("consent_at_client_utc");
    vi.unstubAllGlobals();
  });
  it("accepts only an explicit provider success acknowledgement", async () => {
    const mock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) });
    vi.stubGlobal("fetch", mock);
    await expect(sendLead(valid, "business")).resolves.toEqual({ success: true });
    vi.unstubAllGlobals();
  });
  it("routes one sanitized, consent-backed dashboard copy only after explicit provider confirmation", async () => {
    const mock = vi.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ success: true }) })
      .mockRejectedValueOnce(new Error("dashboard unavailable"));
    vi.stubGlobal("fetch", mock);
    vi.stubGlobal("window", { location: { origin: "https://harrisonhealthgroup.com", pathname: "/florida-health-insurance", href: "https://harrisonhealthgroup.com/florida-health-insurance?email=unsafe@example.com#gclid" } });
    await expect(sendLead(valid, "business")).resolves.toEqual({ success: true });
    expect(mock).toHaveBeenCalledTimes(2);
    const [dashboardUrl, dashboardRequest] = mock.mock.calls[1];
    const dashboardPayload = JSON.parse(dashboardRequest.body);
    expect(dashboardUrl).toBe("https://leads.harrisonhealthgroup.com/webhooks/web-form");
    expect(dashboardRequest).toMatchObject({ method: "POST", keepalive: true, headers: { "Content-Type": "application/json" } });
    expect(dashboardPayload).toMatchObject({ first_name: "Pat", last_name: "Example", lead_type: "business", consent: true, consent_text: "I request that Harrison Health Group contact me by my selected method about this inquiry. I have read the privacy information and site-use information.", page_url: "https://harrisonhealthgroup.com/florida-health-insurance" });
    expect(dashboardPayload).not.toHaveProperty("access_key");
    expect(dashboardPayload).not.toHaveProperty("subject");
    expect(dashboardPayload).not.toHaveProperty("from_name");
    expect(dashboardPayload.page_url).not.toContain("unsafe@example.com");
    vi.unstubAllGlobals();
  });
  it("sends the minimal Step 1 schema once and isolates a dashboard 422 from confirmed Web3Forms receipt", async () => {
    const mock = vi.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ success: true }) })
      .mockResolvedValueOnce({ ok: false, status: 422, json: async () => ({ ok: false }) });
    vi.stubGlobal("fetch", mock);
    const minimal = { ...valid, email: "", coverage_intent: "", company_name: "", team_size: "", phone: "+1 (954) 600-0342", preferred_contact: "Phone call" };
    await expect(sendLead(minimal, "business")).resolves.toEqual({ success: true });
    expect(mock).toHaveBeenCalledTimes(2);
    const payload = JSON.parse(mock.mock.calls[1][1].body);
    expect(payload).toMatchObject({ lead_type: "business", phone: "9546000342", email: "", company_name: "", team_size: "", coverage_intent: "", consent: true });
    expect(payload).not.toHaveProperty("update_token");
    expect(mock.mock.calls.map(([url]) => url)).toEqual(["https://api.web3forms.com/submit", "https://leads.harrisonhealthgroup.com/webhooks/web-form"]);
    vi.unstubAllGlobals();
  });
});

describe("live Google review identity and attribution", () => {
  const listing = { id: HARRISON_PLACE_ID, displayName: "Harrison Health Group", formattedAddress: "1550 Sawgrass Corporate Pkwy, Sunrise, FL 33323, USA", websiteURI: "https://harrisonhealthgroup.com/" };
  it("shows only the verified Harrison listing and never substitutes a similarly named location", () => {
    expect(isHarrisonListing(listing)).toBe(true);
    expect(isHarrisonListing({ ...listing, id: "different-place" })).toBe(false);
    expect(isHarrisonListing({ ...listing, displayName: "Harrison Health Group of Sunrise" })).toBe(false);
    expect(isHarrisonListing({ ...listing, websiteURI: "https://example.com" })).toBe(false);
    expect(isHarrisonListing({ ...listing, formattedAddress: "Miami, FL 33101" })).toBe(false);
    expect(() => toGoogleReviewSnapshot({ ...listing, id: "different-place" } as google.maps.places.Place)).toThrow("listing identity");
  });
  it("keeps Google authors, original text and rating-only entries without inventing quotes", () => {
    const place = { ...listing, rating: 4.2, userRatingCount: 17, googleMapsURI: "https://maps.google.com/?cid=123", attributions: [], reviews: [
      { rating: 5, text: "A real review fixture.", relativePublishTimeDescription: "a month ago", googleMapsURI: "https://www.google.com/maps/reviews/example", authorAttribution: { displayName: "Example Reviewer", uri: "https://www.google.com/maps/contrib/test", photoURI: "https://lh3.googleusercontent.com/a-/example" }, publishTime: new Date("2026-09-01") },
      { rating: 4, text: null, relativePublishTimeDescription: null, googleMapsURI: "https://www.google.com/maps/reviews/example-two", authorAttribution: { displayName: "Another Reviewer", uri: "https://www.google.com/maps/contrib/test2", photoURI: null }, publishTime: null },
    ] } as google.maps.places.Place;
    const snapshot = toGoogleReviewSnapshot(place);
    expect(snapshot.reviews).toHaveLength(2);
    expect(snapshot.reviews[0]).toMatchObject({ author: "Example Reviewer", rating: 5, text: "A real review fixture.", relativeDate: "a month ago", reviewUrl: "https://www.google.com/maps/reviews/example", authorPhotoUrl: "https://lh3.googleusercontent.com/a-/example" });
    expect(snapshot.reviews[1]).toMatchObject({ author: "Another Reviewer", rating: 4, text: null, date: null, reviewUrl: "https://www.google.com/maps/reviews/example-two" });
    expect(snapshot.rating).toBe(4.2);
    expect(snapshot.ratingCount).toBe(17);
  });
  it("keeps direct review and author links on Google-owned hosts and permits only safe provider attribution URLs", () => {
    expect(safeExternalUrl("javascript:alert(1)")).toBeNull();
    expect(safeExternalUrl("https://name:password@example.com")).toBeNull();
    expect(safeExternalUrl("http://www.google.com/maps")).toBeNull();
    expect(safeExternalUrl("https://www.google.com/maps")).toBe("https://www.google.com/maps");
    expect(safeGoogleMapsUrl("https://www.google.com/maps/reviews/1")).toBe("https://www.google.com/maps/reviews/1");
    expect(safeGoogleMapsUrl("https://maps.google.com/maps/reviews/1")).toBe("https://maps.google.com/maps/reviews/1");
    expect(safeGoogleMapsUrl("https://google.com.evil.example/maps")).toBeNull();
    expect(safeGoogleAvatarUrl("https://lh3.googleusercontent.com/a-/avatar")).toBe("https://lh3.googleusercontent.com/a-/avatar");
    expect(safeGoogleAvatarUrl("https://images.example.com/avatar")).toBeNull();
    expect(new URL(HARRISON_GOOGLE_MAPS_URL).hostname).toBe("www.google.com");
  });
  it("fails closed when Google does not supply the individual review source URL", () => {
    const place = { ...listing, rating: 5, userRatingCount: 1, googleMapsURI: "https://www.google.com/maps/?cid=123", attributions: [], reviews: [
      { rating: 5, text: "Unlinked review", authorAttribution: { displayName: "Reviewer", uri: "https://www.google.com/maps/contrib/test", photoURI: null }, publishTime: null },
    ] } as google.maps.places.Place;
    expect(toGoogleReviewSnapshot(place).reviews).toEqual([]);
  });
});

describe("anonymous visitor counts", () => {
  const setup = (hostname: string, search = "") => {
    const beacons: { url: string; body: Blob }[] = [];
    vi.stubGlobal("window", { location: { hostname, pathname: "/florida-health-insurance", search, origin: `https://${hostname}` }, matchMedia: () => ({ matches: true }) });
    vi.stubGlobal("navigator", { webdriver: false, sendBeacon: (url: string, body: Blob) => { beacons.push({ url, body }); return true; } });
    vi.stubGlobal("sessionStorage", { getItem: () => null, setItem: () => {} });
    vi.stubGlobal("document", { referrer: "" });
    return beacons;
  };
  it("sends only the page, event, step, ad flag and device type to the dashboard, and only from the live site", async () => {
    const { sendSiteEvent } = await import("./lib/site-analytics");
    const beacons = setup("harrisonhealthgroup.com", "?gclid=abc&email=pat@example.org");
    sendSiteEvent("form_step_complete", 1);
    expect(beacons).toHaveLength(1);
    expect(beacons[0].url).toBe("https://leads.harrisonhealthgroup.com/webhooks/site-event");
    const sent = JSON.parse(await beacons[0].body.text());
    expect(sent).toEqual({ e: "form_step_complete", p: "/florida-health-insurance", s: 1, ad: true, d: "mobile" });
    expect(JSON.stringify(sent)).not.toContain("pat@example.org");

    // The business version of the form is counted like the consumer form (2026-11-05).
    const { forwardedName } = await import("./lib/site-analytics");
    expect(forwardedName("business_form_view")).toBe("form_view");
    expect(forwardedName("business_form_submitted")).toBe("form_submitted");
    expect(forwardedName("form_start")).toBe("form_start");
    expect(forwardedName("resource_guide_view")).toBeNull();

    const preview = setup("preview.manus.space");
    sendSiteEvent("page_view");
    expect(preview).toHaveLength(0);
    vi.unstubAllGlobals();
  });
});
