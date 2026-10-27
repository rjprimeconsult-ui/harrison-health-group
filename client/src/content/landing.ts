// Google Ads landing pages. Owner-requested 2026-10-27 (see CONTENT-LEDGER.md).
// Claims follow BRAND-FACTS.md: no prices, savings, statistics, carrier names or counts, guarantees or "free".
// "Apply any time of year" is owner-stated (2026-10-27) for the private plans the team offers.
// Each state below is on the shared licensed-states map (shared/service-area.ts).

export interface LandingPage {
  path: string;
  eyebrow: string;
  title: string;
  intro: string;
  benefits: { title: string; text: string }[];
  situationsHeading: string;
  situations: string[];
  steps: { title: string; text: string }[];
  faqs: { question: string; answer: string; link?: { href: string; label: string } }[];
}

interface State {
  name: string;      // Florida
  slug: string;      // florida
  people: string;    // Floridians
  local: { title: string; text: string };
}

const states: State[] = [
  {
    name: "Florida", slug: "florida", people: "Floridians",
    local: { title: "Based in South Florida", text: "Our team works from Sunrise, Florida, and helps Florida households compare their options." },
  },
  {
    name: "Texas", slug: "texas", people: "Texans",
    local: { title: "Help by phone across Texas", text: "Texas is one of the states our team serves. We work by phone, so there is no office to visit." },
  },
  {
    name: "Georgia", slug: "georgia", people: "Georgians",
    local: { title: "Help by phone across Georgia", text: "Georgia is one of the states our team serves. We work by phone, so there is no office to visit." },
  },
];

const steps = (extra: string) => [
  { title: "Tell us who needs coverage", text: "Send the short form or call us. Share only basic contact details, never medical history." },
  { title: "Talk with a licensed advisor", text: `We go over your doctors, prescriptions, budget and ${extra}.` },
  { title: "Review and decide", text: "Compare the plan documents for the options available to you and apply only if one fits." },
];

const readyFaq = {
  question: "What should I have ready?",
  answer: "The ages and ZIP code of everyone who needs coverage, any doctors or prescriptions you want to keep, and a monthly budget range.",
};

function individualPage(s: State): LandingPage {
  return {
    path: `/${s.slug}-health-insurance`,
    eyebrow: `${s.name} health insurance`,
    title: `Private Health Insurance for ${s.name} Families and Individuals`,
    intro: `Looking for health insurance in ${s.name}? The private plans we work with are not limited to open enrollment: you can apply any time of year. Tell us who needs coverage, and a licensed advisor will walk you through the options available to you.`,
    benefits: [
      { title: "Apply any time of year", text: "No waiting for open enrollment or a qualifying life event to start the private plans we help with." },
      { title: "A licensed advisor, not a website", text: "Talk through your doctors, prescriptions and monthly budget with a licensed member of our team." },
      s.local,
      { title: "Plain answers before you decide", text: "Review the actual plan documents with your advisor before you apply, so you know what you are choosing." },
    ],
    situationsHeading: "We often help people who are",
    situations: [
      "Paying more than they want to for their current plan",
      "Losing job-based coverage or facing COBRA",
      "Self-employed, 1099 or between jobs",
      "Buying health insurance for the first time",
      "Past the open enrollment deadline",
    ],
    steps: steps("what matters most to your household"),
    faqs: [
      {
        question: `Can I get health insurance in ${s.name} outside open enrollment?`,
        answer: "Yes, for the private plans we work with: you can apply any time of year. Marketplace plans follow their own enrollment periods. If a Marketplace plan looks like a better fit for you, we can point you to the right place to start.",
      },
      {
        question: "What is the difference between private and Marketplace plans?",
        answer: "They are different routes to coverage, with different enrollment rules, costs and benefits. Our guide walks through what to compare side by side.",
        link: { href: "/resources/private-vs-marketplace", label: "Read the comparison guide" },
      },
      {
        question: `How much does health insurance cost in ${s.name}?`,
        answer: "It depends on who needs coverage, their ages, where you live, the plan you choose and the answers on the application. An advisor can go over real numbers for your household after a short conversation.",
      },
      readyFaq,
    ],
  };
}

function selfEmployedPage(s: State): LandingPage {
  return {
    path: `/self-employed-health-insurance-${s.slug}`,
    eyebrow: "Self-employed health insurance",
    title: `Health Insurance for Self-Employed ${s.people}`,
    intro: "Freelancer, 1099 contractor, gig worker or owner without a group plan? The private plans we work with let you apply any time of year, with no waiting for open enrollment. A licensed advisor will help you weigh the monthly cost against what you would pay when you need care.",
    benefits: [
      { title: "Apply any time of year", text: "Start when your work changes, not when the calendar says so, for the private plans we help with." },
      { title: "Coverage in your own name", text: "An individual or family plan is yours, so it is not tied to a single client or employer." },
      { title: "Built around your budget", text: "We talk through a monthly amount that works with income that changes from month to month." },
      s.local,
    ],
    situationsHeading: "This page is for you if you are",
    situations: [
      "A 1099 contractor or freelancer",
      "Driving or delivering for an app",
      "A business owner with no employees",
      "Leaving a W-2 job to work for yourself",
      "Covering a spouse or children on your own plan",
    ],
    steps: steps("how your income moves through the year"),
    faqs: [
      { question: "Can I get coverage outside open enrollment?", answer: "Yes, for the private plans we work with: you can apply any time of year." },
      { question: "Can I cover my family on the same plan?", answer: "You can ask about coverage for your spouse and children in the same conversation." },
      readyFaq,
      {
        question: "Where can I learn more first?",
        answer: "Our guide for independent workers covers timing, budget questions and the documents to review.",
        link: { href: "/resources/self-employed-coverage", label: "Read the self-employed guide" },
      },
    ],
  };
}

export const landingPages: LandingPage[] = states.flatMap((s) => [individualPage(s), selfEmployedPage(s)]);
