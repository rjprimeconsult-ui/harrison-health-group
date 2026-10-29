export const site = {
  name: "Harrison Health Group",
  origin: "https://harrisonhealthgroup.com",
  phoneDisplay: "(954) 429-5138",
  phoneHref: "tel:+19544295138",
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
  { path: "/", title: "Health Insurance in Florida, Texas & Georgia | Harrison Health Group", description: "Private health insurance for families, self-employed people and small businesses in Florida, Texas and Georgia. Apply any time of year with a licensed advisor.", kind: "home", indexable: true },
  { path: "/florida-health-insurance", title: "Florida Health Insurance: Private Plans Year-Round | Harrison Health Group", description: "Private health insurance for Florida individuals and families. Apply any time of year, not only in open enrollment, with a licensed advisor.", kind: "landing", indexable: true },
  { path: "/self-employed-health-insurance-florida", title: "Health Insurance for Self-Employed Floridians | Harrison Health Group", description: "Health insurance for Florida 1099 contractors, freelancers and owners without a group plan. Apply any time of year with a licensed advisor.", kind: "landing", indexable: true },
  { path: "/texas-health-insurance", title: "Texas Health Insurance: Private Plans Year-Round | Harrison Health Group", description: "Private health insurance for Texas individuals and families. Apply any time of year, not only in open enrollment, with a licensed advisor.", kind: "landing", indexable: true },
  { path: "/self-employed-health-insurance-texas", title: "Health Insurance for Self-Employed Texans | Harrison Health Group", description: "Health insurance for Texas 1099 contractors, freelancers and owners without a group plan. Apply any time of year with a licensed advisor.", kind: "landing", indexable: true },
  { path: "/georgia-health-insurance", title: "Georgia Health Insurance: Private Plans Year-Round | Harrison Health Group", description: "Private health insurance for Georgia individuals and families. Apply any time of year, not only in open enrollment, with a licensed advisor.", kind: "landing", indexable: true },
  { path: "/self-employed-health-insurance-georgia", title: "Health Insurance for Self-Employed Georgians | Harrison Health Group", description: "Health insurance for Georgia 1099 contractors, freelancers and owners without a group plan. Apply any time of year with a licensed advisor.", kind: "landing", indexable: true },
  { path: "/cobra-alternative-florida", title: "COBRA Alternatives in Florida | Harrison Health Group", description: "Lost job-based coverage? Compare COBRA with private health plans you can apply for any time of year, with a licensed Florida advisor.", kind: "landing", indexable: true },
  { path: "/small-business-health-insurance-florida", title: "Small Business Health Insurance in Florida | Harrison Health Group", description: "Health benefits for Florida small businesses. Tell us your team size and timeline, and a licensed advisor will walk you through your options.", kind: "landing", indexable: true },
  { path: "/cobra-alternative-texas", title: "COBRA Alternatives in Texas | Harrison Health Group", description: "Lost job-based coverage? Compare COBRA with private health plans you can apply for any time of year, with a licensed advisor who serves Texas.", kind: "landing", indexable: true },
  { path: "/small-business-health-insurance-texas", title: "Small Business Health Insurance in Texas | Harrison Health Group", description: "Health benefits for Texas small businesses. Tell us your team size and timeline, and a licensed advisor will walk you through your options.", kind: "landing", indexable: true },
  { path: "/cobra-alternative-georgia", title: "COBRA Alternatives in Georgia | Harrison Health Group", description: "Lost job-based coverage? Compare COBRA with private health plans you can apply for any time of year, with a licensed advisor who serves Georgia.", kind: "landing", indexable: true },
  { path: "/small-business-health-insurance-georgia", title: "Small Business Health Insurance in Georgia | Harrison Health Group", description: "Health benefits for Georgia small businesses. Tell us your team size and timeline, and a licensed advisor will walk you through your options.", kind: "landing", indexable: true },
  { path: "/broward-county-health-insurance", title: "Broward County Health Insurance | Harrison Health Group", description: "Private health insurance in Fort Lauderdale, Hollywood, Pembroke Pines and across Broward County. Apply any time of year with a licensed advisor.", kind: "landing", indexable: true },
  { path: "/miami-dade-health-insurance", title: "Miami-Dade Health Insurance | Harrison Health Group", description: "Private health insurance in Miami, Hialeah, Homestead and across Miami-Dade County. Apply any time of year with a licensed advisor.", kind: "landing", indexable: true },
  { path: "/palm-beach-county-health-insurance", title: "Palm Beach County Health Insurance | Harrison Health Group", description: "Private health insurance in West Palm Beach, Boca Raton, Delray Beach and across Palm Beach County. Apply any time of year with a licensed advisor.", kind: "landing", indexable: true },
  { path: "/seguro-medico-florida", title: "Seguro médico privado en Florida | Harrison Health Group", description: "Seguro médico privado para familias e individuos en Florida. Solicítelo en cualquier momento del año y hable con un asesor en español.", kind: "landing", indexable: true },
  { path: "/seguro-medico-texas", title: "Seguro médico privado en Texas | Harrison Health Group", description: "Seguro médico privado para familias e individuos en Texas. Solicítelo en cualquier momento del año y hable con un asesor en español.", kind: "landing", indexable: true },
  { path: "/seguro-medico-georgia", title: "Seguro médico privado en Georgia | Harrison Health Group", description: "Seguro médico privado para familias e individuos en Georgia. Solicítelo en cualquier momento del año y hable con un asesor en español.", kind: "landing", indexable: true },
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
