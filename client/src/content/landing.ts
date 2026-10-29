// Google Ads landing pages. Owner-requested 2026-10-27 (see CONTENT-LEDGER.md).
// Claims follow BRAND-FACTS.md: no prices, savings, statistics, carrier names or counts, guarantees or "free".
// "Apply any time of year" is owner-stated (2026-10-27) for the private plans the team offers.
// Each state below is on the shared licensed-states map (shared/service-area.ts).
// County pages: owner-requested 2026-10-27 (Broward, Miami-Dade, Palm Beach). Sunrise is in Broward County.
// COBRA and small business pages for Texas and Georgia: owner-requested 2026-10-29 (same wording as Florida).
// Spanish page: owner-stated 2026-10-27 that a team member (Erick) speaks Spanish with clients.
// Spanish pages for Texas and Georgia: owner-requested 2026-10-29; owner stated Erick is licensed in all states served.

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
  lang?: "es";
  ui?: Partial<LandingUi>;
}

export interface LandingUi {
  why: string; how: string; faq: string; call: string; book: string; requestCall: string;
  formNote?: string; disclaimer: string;
}

export const englishUi: LandingUi = {
  why: "Why people call us", how: "How it works", faq: "Common questions", call: "Call",
  book: "Prefer to pick a time?", requestCall: "Request a quote call",
  disclaimer: "Plan availability, eligibility, benefits and costs vary by plan and applicant. A request on this page is not an application, a quote or a coverage decision; review the official plan documents before you apply. Harrison Health Group is a DBA of STAH Health LLC.",
};

interface State {
  name: string;      // Florida
  slug: string;      // florida
  people: string;    // Floridians
  local: { title: string; text: string };
  esLocal: { title: string; text: string };   // the same line in Spanish
}

const states: State[] = [
  {
    name: "Florida", slug: "florida", people: "Floridians",
    local: { title: "Based in South Florida", text: "Our team works from Sunrise, Florida, and helps Florida households compare their options." },
    esLocal: { title: "Con base en el sur de Florida", text: "Nuestro equipo trabaja desde Sunrise, Florida, y ayuda a hogares de Florida a comparar sus opciones." },
  },
  {
    name: "Texas", slug: "texas", people: "Texans",
    local: { title: "Help by phone across Texas", text: "Texas is one of the states our team serves. We work by phone, so there is no office to visit." },
    esLocal: { title: "Ayuda por teléfono en todo Texas", text: "Texas es uno de los estados donde trabaja nuestro equipo. Atendemos por teléfono, así que no tiene que visitar una oficina." },
  },
  {
    name: "Georgia", slug: "georgia", people: "Georgians",
    local: { title: "Help by phone across Georgia", text: "Georgia is one of the states our team serves. We work by phone, so there is no office to visit." },
    esLocal: { title: "Ayuda por teléfono en todo Georgia", text: "Georgia es uno de los estados donde trabaja nuestro equipo. Atendemos por teléfono, así que no tiene que visitar una oficina." },
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


interface County {
  name: string;          // Broward County
  slug: string;          // broward-county
  cities: string;        // Fort Lauderdale, Hollywood, ...
  local: { title: string; text: string };
  situation: string;
}

const counties: County[] = [
  {
    name: "Broward County", slug: "broward-county",
    cities: "Fort Lauderdale, Hollywood, Pembroke Pines, Coral Springs, Miramar, Sunrise, Plantation and Davie",
    local: { title: "Right here in Broward", text: "Our team works from Sunrise, in Broward County, and helps households across the county compare their options." },
    situation: "Commuting between Broward and Miami-Dade or Palm Beach for work",
  },
  {
    name: "Miami-Dade County", slug: "miami-dade",
    cities: "Miami, Hialeah, Miami Gardens, Homestead, Kendall, Doral, Miami Beach and North Miami",
    local: { title: "A South Florida team", text: "Our team works from Sunrise in neighboring Broward County and helps Miami-Dade households by phone." },
    situation: "Working for themselves in Miami-Dade's small business and gig economy",
  },
  {
    name: "Palm Beach County", slug: "palm-beach-county",
    cities: "West Palm Beach, Boca Raton, Boynton Beach, Delray Beach, Wellington, Jupiter and Lake Worth Beach",
    local: { title: "A South Florida team", text: "Our team works from Sunrise in neighboring Broward County and helps Palm Beach County households by phone." },
    situation: "Retiring early or leaving a job before Medicare age",
  },
];

function countyPage(c: County): LandingPage {
  return {
    path: `/${c.slug}-health-insurance`,
    eyebrow: `${c.name} health insurance`,
    title: `Private Health Insurance in ${c.name}`,
    intro: `Looking for health insurance in ${c.cities}? The private plans we work with are not limited to open enrollment: you can apply any time of year. Tell us who needs coverage in ${c.name}, and a licensed advisor will walk you through the options available to you.`,
    benefits: [
      c.local,
      { title: "Apply any time of year", text: "No waiting for open enrollment or a qualifying life event to start the private plans we help with." },
      { title: "Keep your doctors in view", text: `Bring the names of your doctors and the ${c.name} hospitals you use, and check how each option fits before you choose.` },
      { title: "A licensed advisor, not a website", text: "Talk through your prescriptions and monthly budget with a licensed member of our team." },
    ],
    situationsHeading: `We often help ${c.name} residents who are`,
    situations: [
      "Paying more than they want to for their current plan",
      "Losing job-based coverage or facing COBRA",
      "Self-employed, 1099 or between jobs",
      c.situation,
      "Past the open enrollment deadline",
    ],
    steps: steps("what matters most to your household"),
    faqs: [
      {
        question: `Can I get health insurance in ${c.name} outside open enrollment?`,
        answer: "Yes, for the private plans we work with: you can apply any time of year. Marketplace plans follow their own enrollment periods. If a Marketplace plan looks like a better fit for you, we can point you to the right place to start.",
      },
      {
        question: "Will my doctors be in network?",
        answer: "Networks differ from plan to plan. Share the doctors and hospitals you want to keep, and check them against each plan's provider directory with your advisor before you apply.",
      },
      {
        question: "I'm self-employed. Is there a page for me?",
        answer: "Yes. Our self-employed page covers 1099 contractors, freelancers and owners without a group plan.",
        link: { href: "/self-employed-health-insurance-florida", label: "See health insurance for the self-employed" },
      },
      readyFaq,
    ],
  };
}

function spanishPage(s: State): LandingPage {
  return {
  path: `/seguro-medico-${s.slug}`,
  lang: "es",
  eyebrow: `Seguro médico en ${s.name}`,
  title: `Seguro médico privado para familias e individuos en ${s.name}`,
  intro: `¿Busca seguro médico en ${s.name}? Los planes privados con los que trabajamos no dependen del período de inscripción abierta: puede solicitarlos en cualquier momento del año. En nuestro equipo hay un asesor que habla español y que le explicará las opciones disponibles para usted.`,
  benefits: [
    { title: "Atención en español", text: "Llámenos y pida hablar en español. Le comunicamos con el asesor de nuestro equipo que habla español." },
    { title: "Solicite en cualquier momento del año", text: "No tiene que esperar la inscripción abierta ni un evento de vida calificado para los planes privados con los que trabajamos." },
    { title: "Un asesor, no una página web", text: "Hable de sus médicos, sus recetas y su presupuesto mensual con un miembro de nuestro equipo." },
    s.esLocal,
  ],
  situationsHeading: "Con frecuencia ayudamos a personas que",
  situations: [
    "Pagan más de lo que quisieran por su plan actual",
    "Pierden la cobertura de su empleo o recibieron un aviso de COBRA",
    "Trabajan por cuenta propia, con 1099 o están entre empleos",
    "Compran seguro médico por primera vez",
    "Ya pasaron la fecha límite de la inscripción abierta",
  ],
  steps: [
    { title: "Díganos quién necesita cobertura", text: "Llámenos o envíe el formulario breve. Solo pedimos datos básicos de contacto, nunca su historial médico." },
    { title: "Hable con un asesor", text: "Repasamos sus médicos, sus recetas, su presupuesto y lo que más le importa a su familia." },
    { title: "Revise y decida", text: "Compare los documentos de los planes disponibles para usted y presente la solicitud solo si alguno le conviene." },
  ],
  faqs: [
    { question: "¿Puedo hablar con alguien en español?", answer: "Sí. Llame al (954) 429-5138 y pida hablar en español. Si envía el formulario, le indicaremos a nuestro asesor que usted prefiere español." },
    {
      question: "¿Puedo obtener seguro médico fuera de la inscripción abierta?",
      answer: "Sí, para los planes privados con los que trabajamos: puede solicitarlos en cualquier momento del año. Los planes del Mercado de Seguros (Marketplace) tienen sus propios períodos de inscripción. Si un plan del Mercado le conviene más, le indicamos dónde empezar.",
    },
    {
      question: `¿Cuánto cuesta el seguro médico en ${s.name}?`,
      answer: "Depende de quién necesita cobertura, sus edades, dónde vive, el plan que elija y las respuestas de la solicitud. Un asesor puede darle cifras reales para su hogar después de una conversación breve.",
    },
    { question: "¿Qué debo tener a mano?", answer: "Las edades y el código postal de todas las personas que necesitan cobertura, los médicos o recetas que quiere mantener y un rango de presupuesto mensual." },
  ],
  ui: {
    why: "Por qué nos llaman", how: "Cómo funciona", faq: "Preguntas frecuentes", call: "Llame al",
    book: "¿Prefiere elegir un horario?", requestCall: "Pida que le llamemos",
    formNote: "El formulario está en inglés. Si lo prefiere, llámenos y pida hablar en español.",
    disclaimer: "La disponibilidad, la elegibilidad, los beneficios y los costos varían según el plan y el solicitante. Una solicitud en esta página no es una aplicación, una cotización ni una decisión de cobertura; revise los documentos oficiales del plan antes de presentar una solicitud. Harrison Health Group es un nombre comercial (DBA) de STAH Health LLC.",
  },
};
}

function cobraPage(s: State): LandingPage {
  return {
  path: `/cobra-alternative-${s.slug}`,
  eyebrow: "COBRA and job loss",
  title: "Lost Job-Based Coverage? Compare Your Options to COBRA",
  intro: "Leaving a job, or holding a COBRA notice? COBRA lets you keep your employer's plan, but you usually pay the full cost yourself. Before you decide, compare it with private plans you can apply for any time of year. A licensed advisor will walk you through both.",
  benefits: [
    { title: "Apply any time of year", text: "Start a private plan we help with when your job coverage ends, not months later at open enrollment." },
    { title: "Compare before you choose", text: "Bring your COBRA notice and we will look at it next to the private options available to you." },
    { title: "Keep your doctors in view", text: "Check how your doctors and prescriptions fit each option before you make a switch." },
    s.local,
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
}

function smallBusinessPage(s: State): LandingPage {
  return {
  path: `/small-business-health-insurance-${s.slug}`,
  eyebrow: "Small business health insurance",
  title: `Health Benefits for ${s.name} Small Businesses`,
  intro: "Thinking about offering health coverage to your team, or reviewing the plan you have? Start with your team size, timeline and goals, and a licensed advisor will walk you through the options for your business.",
  benefits: [
    { title: "One conversation for your team", text: "Tell us about your team once, and we will go over the options that fit your business." },
    { title: "Built around your budget", text: "Talk through what you want to contribute and what matters most to your employees." },
    s.local,
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
    { question: "I work for myself with no employees. Is this page for me?", answer: "Individual plans are usually the better fit when it is just you, or you and your family.", link: { href: `/self-employed-health-insurance-${s.slug}`, label: "See health insurance for the self-employed" } },
    { question: "Where can I learn more first?", answer: "Our small employer checklist covers what to gather before a benefits conversation.", link: { href: "/resources/small-business-benefits", label: "Read the small business checklist" } },
  ],
  formKind: "business",
};
}

export const landingPages: LandingPage[] = [
  ...states.flatMap((s) => [individualPage(s), selfEmployedPage(s)]),
  ...states.flatMap((s) => [cobraPage(s), smallBusinessPage(s)]), ...counties.map(countyPage), ...states.map(spanishPage),
];
