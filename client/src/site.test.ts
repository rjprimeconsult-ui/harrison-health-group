import { describe, expect, it, vi } from "vitest";
import { indexablePages, publicPages } from "../../shared/site";
import { renderMeta } from "../../shared/seo";
import { guides, faqs } from "./content/guides";
import { validateLead, sendLead } from "./components/LeadForm";
import { mappedStates } from "../../shared/service-area";
import { HARRISON_GOOGLE_MAPS_URL, HARRISON_PLACE_ID, isHarrisonListing, safeExternalUrl, safeGoogleAvatarUrl, safeGoogleMapsUrl, toGoogleReviewSnapshot } from "./lib/google-reviews";

const valid = { coverage_intent: "Individual coverage", state: "FL", zip: "33323", timeline: "", company_name: "Business", team_size: "1–4", decision_role: "", first_name: "Pat", last_name: "Example", email: "pat@example.org", phone: "9546000342", preferred_contact: "Email", consent: "yes" };
describe("Harrison facts and routes", () => {
  it("uses the owner-corrected 31-state map: Delaware in, New Mexico out", () => {
    expect(mappedStates.size).toBe(31);
    expect(mappedStates.has("DE")).toBe(true);
    expect(mappedStates.has("NM")).toBe(false);
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
  it("has three substantive original guides with linked related slugs", () => {
    expect(guides.map((guide) => guide.slug)).toEqual(["private-vs-marketplace", "self-employed-coverage", "small-business-benefits"]);
    for (const guide of guides) {
      const text = [guide.intro, ...guide.sections.flatMap((section) => section.body), ...guide.checklist, ...guide.faqs.map(({ question, answer }) => `${question} ${answer}`)].join(" ");
      expect(text.trim().split(/\s+/).length).toBeGreaterThanOrEqual(800);
      expect(guide.related.every((slug) => guides.some((item) => item.slug === slug && slug !== guide.slug))).toBe(true);
    }
    expect(faqs.length).toBeGreaterThanOrEqual(6);
  });
});

describe("lead validation and provider acknowledgements", () => {
  it("rejects missing routing fields, malformed contacts, and unchecked consent", () => {
    expect(Object.keys(validateLead({ ...valid, zip: "3", state: "XX" }, "consumer", 0))).toEqual(["state", "zip"]);
    expect(Object.keys(validateLead({ ...valid, company_name: "", team_size: "" }, "business", 0))).toEqual(["company_name", "team_size"]);
    expect(Object.keys(validateLead({ ...valid, email: "bad", phone: "123" }, "consumer", 1))).toEqual(["email", "phone"]);
    expect(validateLead({ ...valid, consent: "" }, "consumer", 2).consent).toBeTruthy();
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
