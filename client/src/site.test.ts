import { describe, expect, it, vi } from "vitest";
import { indexablePages, publicPages } from "../../shared/site";
import { renderMeta } from "../../shared/seo";
import { guides, faqs } from "./content/guides";
import { validateLead, sendLead } from "./components/LeadForm";
import { mappedStates } from "../../shared/service-area";

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
