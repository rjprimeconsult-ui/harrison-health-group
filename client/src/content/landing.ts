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
  formKind?: "consumer" | "business";
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

const florida = states[0];

const cobraPage: LandingPage = {
  path: "/cobra-alternative-florida",
  eyebrow: "COBRA and job loss",
  title: "Lost Job-Based Coverage? Compare Your Options to COBRA",
  intro: "Leaving a job, or holding a COBRA notice? COBRA lets you keep your employer's plan, but you usually pay the full cost yourself. Before you decide, compare it with private plans you can apply for any time of year. A licensed advisor will walk you through both.",
  benefits: [
    { title: "Apply any time of year", text: "Start a private plan we help with when your job coverage ends, not months later at open enrollment." },
    { title: "Compare before you choose", text: "Bring your COBRA notice and we will look at it next to the private options available to you." },
    { title: "Keep your doctors in view", text: "Check how your doctors and prescriptions fit each option before you make a switch." },
    florida.local,
  ],
  situationsHeading: "We often help people who are",
  situations: [
    "Holding a COBRA election notice",
    "Laid off or leaving a job",
    "Losing coverage when a spouse's job ends",
    "Coming off a parent's plan",
    "Starting their own business after a W-2 job",
  ],
  steps: steps("the dates on your COBRA notice"),
  faqs: [
    { question: "Can I switch from COBRA to a private plan?", answer: "You can apply for the private plans we work with any time of year, including while you are on COBRA." },
    { question: "How long do I have to decide on COBRA?", answer: "Your COBRA notice lists your election deadline. Check it first, and talk with us well before it passes so you can compare both options." },
    { question: "What should I have ready?", answer: "Your COBRA notice, the ages and ZIP code of everyone who needs coverage, any doctors or prescriptions you want to keep, and a monthly budget range." },
    { question: "Where can I learn more first?", answer: "Our guide comparing private and Marketplace coverage explains what to compare side by side.", link: { href: "/resources/private-vs-marketplace", label: "Read the comparison guide" } },
  ],
};

const smallBusinessPage: LandingPage = {
  path: "/small-business-health-insurance-florida",
  eyebrow: "Small business health insurance",
  title: "Health Benefits for Florida Small Businesses",
  intro: "Thinking about offering health coverage to your team, or reviewing the plan you have? Start with your team size, timeline and goals, and a licensed advisor will walk you through the options for your business.",
  benefits: [
    { title: "One conversation for your team", text: "Tell us about your team once, and we will go over the options that fit your business." },
    { title: "Built around your budget", text: "Talk through what you want to contribute and what matters most to your employees." },
    florida.local,
    { title: "Plain answers before you decide", text: "Review the actual plan documents before you commit, so you know what you are offering." },
  ],
  situationsHeading: "This page is for owners who are",
  situations: [
    "Offering health benefits for the first time",
    "Reviewing an upcoming renewal",
    "Running a team of a few people",
    "Looking for coverage for themselves and key staff",
    "Comparing group and individual options",
  ],
  steps: [
    { title: "Tell us about your business", text: "Send the short form or call us. Share team size and timing, never employees' medical information." },
    { title: "Talk with a licensed advisor", text: "We go over your goals, budget, timeline and what your team needs." },
    { title: "Review and decide", text: "Compare the plan documents for the options available to your business and move forward only if one fits." },
  ],
  faqs: [
    { question: "What should I have ready?", answer: "Your approximate team size, ZIP code, your current plan and renewal date if you have one, and a budget range per employee." },
    { question: "I work for myself with no employees. Is this page for me?", answer: "Individual plans are usually the better fit when it is just you, or you and your family.", link: { href: "/self-employed-health-insurance-florida", label: "See health insurance for the self-employed" } },
    { question: "Where can I learn more first?", answer: "Our small employer checklist covers what to gather before a benefits conversation.", link: { href: "/resources/small-business-benefits", label: "Read the small business checklist" } },
  ],
  formKind: "business",
};

export const landingPages: LandingPage[] = [...states.flatMap((s) => [individualPage(s), selfEmployedPage(s)]), cobraPage, smallBusinessPage];
