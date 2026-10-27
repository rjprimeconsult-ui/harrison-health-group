export const site = {
  name: "Harrison Health Group",
  origin: "https://harrisonhealthgroup.com",
  phoneDisplay: "(954) 600-0342",
  phoneHref: "tel:+19546000342",
  email: "info@harrisonhealthgroup.com",
  bookingUrl: "https://calendly.com/harrisonhealthgroup/consultation",
  reviewUrl: "https://share.google/bSs51zOJBQF8q6ygR",
  colors: { white: "#FFFFFF", black: "#0A0A0A", gold: "#C9A84C" },
} as const;

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  kind: "home" | "landing" | "business" | "contact" | "about" | "hub" | "article" | "faq" | "careers" | "legal";
  indexable: boolean;
}

export const publicPages: PageMeta[] = [
  { path: "/", title: "Private Health Coverage Guidance | Harrison Health Group", description: "Explore private health coverage with Harrison Health Group. Compare questions, prepare for a conversation, or request an individual or family consultation.", kind: "home", indexable: true },
  { path: "/florida-health-insurance", title: "Florida Health Insurance: Private Plans Year-Round | Harrison Health Group", description: "Private health insurance for Florida individuals and families. Apply any time of year, not only in open enrollment, with a licensed advisor.", kind: "landing", indexable: true },
  { path: "/self-employed-health-insurance-florida", title: "Health Insurance for Self-Employed Floridians | Harrison Health Group", description: "Health insurance for Florida 1099 contractors, freelancers and owners without a group plan. Apply any time of year with a licensed advisor.", kind: "landing", indexable: true },
  { path: "/business", title: "Small Business Health Coverage | Harrison Health Group", description: "Prepare for a group health benefits conversation. Explore what employers can gather before discussing coverage choices with Harrison Health Group.", kind: "business", indexable: true },
  { path: "/contact", title: "Contact and Schedule | Harrison Health Group", description: "Call, email, or schedule a conversation with Harrison Health Group about private health coverage for your household or business.", kind: "contact", indexable: true },
  { path: "/about", title: "About the Team | Harrison Health Group", description: "Meet the Harrison Health Group team and learn how to reach us for a conversation about private health coverage.", kind: "about", indexable: true },
  { path: "/resources", title: "Private Health Coverage Guides | Harrison Health Group", description: "Decision-focused guides for families, self-employed people, and small employers preparing to review health coverage options.", kind: "hub", indexable: true },
  { path: "/resources/private-vs-marketplace", title: "Private and Marketplace Coverage: What to Compare | Harrison Health Group", description: "A practical checklist for comparing private coverage documents with Marketplace options, including costs, providers, benefits, and questions to ask.", kind: "article", indexable: true },
  { path: "/resources/self-employed-coverage", title: "Coverage Questions for Self-Employed People | Harrison Health Group", description: "Prepare for a health coverage conversation as an independent worker: timelines, budget questions, providers, and policy documents to review.", kind: "article", indexable: true },
  { path: "/resources/small-business-benefits", title: "A Small Employer's Health Benefits Checklist | Harrison Health Group", description: "An employer-friendly guide to preparing team details, renewal timing, decision criteria, and questions before a group benefits discussion.", kind: "article", indexable: true },
  { path: "/faq", title: "Health Coverage Questions | Harrison Health Group", description: "Answers to common questions about preparing for a coverage conversation, business inquiries, scheduling, and sharing personal information.", kind: "faq", indexable: true },
  { path: "/careers", title: "Careers and Future Interest | Harrison Health Group", description: "Interested in future opportunities with Harrison Health Group? Learn how to get in touch; no specific openings are advertised here.", kind: "careers", indexable: true },
  { path: "/privacy", title: "Privacy Policy | Harrison Health Group", description: "Privacy Policy for Harrison Health Group (STAH Health LLC): what we collect, how we use it, text message (SMS) privacy, and how to contact us.", kind: "legal", indexable: false },
  { path: "/terms", title: "Terms and Conditions | Harrison Health Group", description: "Website use terms and SMS terms for Harrison Health Group Lead Alerts, operated by STAH Health LLC.", kind: "legal", indexable: false },
];

export const indexablePages = publicPages.filter((page) => page.indexable);
export const getPage = (path: string) => publicPages.find((page) => page.path === path);
