// DRAFT — educational content for Harrison Health Group owner review. Not published.

export interface Guide {
  slug: string;
  title: string;
  description: string;
  kicker: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
  checklist: string[];
  faqs: { question: string; answer: string }[];
  related: string[];
}

export const guides: Guide[] = [
  {
    slug: "private-vs-marketplace",
    title: "Private Coverage and Marketplace Coverage: A Practical Comparison",
    description:
      "A decision framework for individuals and families comparing private health plan options with Marketplace coverage.",
    kicker: "Coverage decision guide",
    intro:
      "Choosing between a private health plan and Marketplace coverage is less about finding one universally better answer and more about matching a real household situation to the details that matter. Start with who needs coverage, how often care is used, the doctors and medicines that are important, and what level of monthly cost and out-of-pocket responsibility feels manageable. This draft guide is designed to help individuals and families organize that comparison before they make a decision. Harrison Health Group’s established focus is private health plans, while a Marketplace review may be a useful referral route in some situations. The final answer should come from the actual plan materials and, when useful, a qualified advisor who can speak to your circumstances.",
    sections: [
      {
        heading: "Begin with your household, not a plan label",
        body: [
          "The words private and Marketplace describe different routes for exploring coverage, but neither label tells you whether a particular option fits your life. Write down every person who may need coverage, their ages, anticipated changes during the year, and the care they expect to use. A household with regular prescriptions, ongoing specialist visits, or a planned procedure may evaluate options differently from a household that mainly wants protection against unexpected events.",
          "Also decide what trade-offs deserve the most weight. Some people want a lower monthly payment even if they may pay more when they receive care. Others prefer more predictable costs during a year when they expect to use services. Neither preference is automatically right. Naming it early keeps a conversation from drifting toward a feature that sounds attractive but is not central to your decision."
        ]
      },
      {
        heading: "Compare the whole cost pattern",
        body: [
          "A monthly premium is only one part of the financial picture. Review the deductible, the amounts you may pay for visits or medicines, coinsurance where it applies, and the plan’s out-of-pocket limit. Then ask how those pieces would work in an ordinary month and in a difficult health year. A lower monthly premium can be meaningful, but it should be considered alongside the amount you could be asked to pay when care is needed.",
          "Use a simple worksheet rather than relying on memory. Put each option in its own column and copy figures from its official summary and policy documents. Include the cost of coverage, likely routine care, recurring prescriptions, and a high-use scenario. These are planning exercises, not predictions or promises. If a term is unclear, ask for a plain-language explanation and confirm the answer in the documents that govern the policy."
        ]
      },
      {
        heading: "Check how care is accessed",
        body: [
          "A plan may organize care in different ways. Before giving extra weight to a familiar plan name or benefit list, check the plan’s current provider directory, prescription information, referral rules if any, and procedures for non-routine care. A doctor’s office can also help confirm how it works with a specific plan, but the plan materials remain important because arrangements and rules can change.",
          "Think beyond your current primary care visit. Consider whether anyone in the household uses behavioral health services, maternity care, pediatric care, physical therapy, specialty medicine, or care while traveling. You do not need to predict every event. The goal is to notice practical needs that could create friction later and to ask targeted questions before enrollment."
        ]
      },
      {
        heading: "Treat timing and enrollment rules as separate questions",
        body: [
          "Do not assume that a coverage route is available at any time or that a life change will be handled the same way by every option. Enrollment rules, effective-date rules, required documents, and deadlines can shape what you are able to consider. Review the current official materials for the option you are evaluating and keep copies of any forms or confirmations you receive.",
          "If a Marketplace review appears relevant to your situation, ask whether an appropriate referral route is available rather than assuming it is directly handled. The important point is to understand which organization is helping with which part of the process, what information it needs, and where to find the official rules. Avoid making a decision based only on a verbal description of timing."
        ]
      },
      {
        heading: "Make a decision you can explain",
        body: [
          "After comparing documents, summarize your choice in a few sentences: who is covered, what you expect to pay each month, what you may pay when care is used, and the main trade-off you accepted. If you cannot explain those points clearly, you may need another review. This short summary is useful for both partners in a household and for any advisor helping you sort through questions.",
          "A sound decision does not remove uncertainty. Health needs and plan details can change. It does give you a documented reason for choosing an option based on the information available at the time. Keep the final policy documents, enrollment confirmation, payment records, and customer-service contacts together so you can refer back to them if questions arise."
        ]
      }
    ],
    checklist: [
      "List every person who may need coverage and any expected household changes.",
      "Write down regular doctors, care types, and prescriptions to investigate.",
      "Collect the official summary and policy documents for each option under consideration.",
      "Compare monthly premiums, deductible, cost sharing, and out-of-pocket limit in one worksheet.",
      "Review current provider, prescription, and care-access information for each specific option.",
      "Confirm enrollment steps, dates, documents, and any questions about a Marketplace referral route.",
      "Ask a qualified advisor about points you do not understand and retain the final documents."
    ],
    faqs: [
      {
        question: "Is a lower monthly premium always the better choice?",
        answer:
          "Not necessarily. It may fit one household’s budget and care expectations, while another household may place more value on a different cost pattern. Compare the full policy terms and think through both routine and higher-use situations before deciding."
      },
      {
        question: "Can I rely on a provider directory alone when comparing options?",
        answer:
          "A directory is a useful starting point, but it should not be your only check. Review the plan’s current materials and confirm details relevant to the care you expect to receive. Keep in mind that plan and provider arrangements can change."
      }
    ],
    related: ["self-employed-coverage", "small-business-benefits"]
  },
  {
    slug: "self-employed-coverage",
    title: "Health Coverage for Self-Employed Households: How to Prepare",
    description:
      "A practical framework for freelancers, owners, and independent professionals evaluating health coverage for themselves and their families.",
    kicker: "Self-employed planning guide",
    intro:
      "Being self-employed can make health coverage feel like one more business decision with personal consequences. Income may vary, family needs may change, and there may be no human resources department to organize the details. A useful approach is to separate what you know from what you need to verify. Start with the care needs of the household, your comfort with different cost patterns, and the information required by the coverage route you are considering. This draft is educational and not a recommendation for any one plan. Harrison Health Group focuses on private health plans; if another route, including a Marketplace review, appears more relevant, ask about an appropriate referral path and consult the official sources and qualified advisors needed for your situation.",
    sections: [
      {
        heading: "Separate business cash flow from household care needs",
        body: [
          "Self-employment income can rise and fall, but health needs do not always wait for a strong month. Begin with a realistic view of the household rather than an idealized revenue forecast. List anticipated recurring care, prescriptions, children’s needs, and any appointments that are already scheduled. Then identify a monthly amount that feels sustainable and a larger amount that would be difficult but possible if care were needed.",
          "This exercise is not about selecting the cheapest-looking option. It is about understanding the range of financial responsibility you could carry. Keep a personal worksheet separate from business bookkeeping if that makes the comparison clearer. A tax professional or other qualified advisor can explain how your own records and circumstances should be handled; do not assume general online guidance applies to you."
        ]
      },
      {
        heading: "Build a coverage comparison from primary documents",
        body: [
          "Marketing summaries can help you identify questions, but decisions should be checked against the actual policy documents. For each option, record the monthly premium, deductible, visit and prescription cost structure, coinsurance where applicable, out-of-pocket limit, exclusions, waiting or authorization language, and cancellation or renewal provisions. If a document uses unfamiliar terms, ask what they mean in plain language before treating two options as comparable.",
          "Use the same assumptions for every option. For example, compare a routine year with expected office visits and prescriptions, then separately note a higher-use scenario. Do not add up only the numbers that are easiest to see. The purpose is to expose differences in how the policy responds when care is used, not to create a false estimate of what your year will cost."
        ]
      },
      {
        heading: "Map the care you do not want to interrupt",
        body: [
          "A self-employed person may postpone care because leaving work feels difficult. That makes continuity questions worth checking before coverage begins. List clinicians, pharmacies, treatment locations, and prescription names that matter to your household. Review current plan information for how care is accessed and whether particular services have rules, then make direct inquiries when the documents tell you to do so.",
          "Also consider who can help if you are ill or managing a family health issue during a busy period. This is not a plan feature comparison; it is practical planning. Setting aside account access, policy documents, and a short list of important contacts can reduce stress when an unexpected question comes up."
        ]
      },
      {
        heading: "Document changes that could affect your options",
        body: [
          "Independent work often changes shape: a contract ends, a spouse changes jobs, a child joins or leaves the household, or you hire your first employee. Do not assume each change has the same effect across coverage routes. Keep records of relevant dates and documents, and check the current official rules before acting. A qualified advisor can help you identify questions to take to the appropriate source.",
          "If you are looking at a private health plan and also wondering about Marketplace coverage, keep the processes distinct in your notes. Ask who is responsible for explaining each route and what they are authorized to assist with. If a referral is needed, make sure you understand the handoff before sharing documents or assuming an application has been completed."
        ]
      },
      {
        heading: "Choose a process you can maintain",
        body: [
          "The best preparation method is one you will update. Store policy documents, enrollment confirmations, payment information, and renewal notices in a secure place. Put a recurring reminder on your calendar to review household changes and read communications from the organization administering your coverage. That habit can be more useful than trying to remember every detail from the original decision.",
          "Before finalizing anything, state your reasons in writing: the household need you prioritized, the cost trade-off you accepted, and the items you verified. This note is not a substitute for policy documents. It is a way to make sure the decision reflects your real situation rather than a rushed response to an email, an ad, or a single conversation."
        ]
      }
    ],
    checklist: [
      "List each household member’s expected care, medications, and scheduled appointments.",
      "Set a planning range for a typical month and a higher-use health month.",
      "Gather official plan summaries, policy documents, and enrollment instructions.",
      "Compare cost structure, exclusions, and care rules using the same worksheet for every option.",
      "Check current information related to clinicians, pharmacies, prescriptions, and care access.",
      "Keep dated records of household or work changes that may require a coverage review.",
      "Ask qualified tax, legal, or insurance advisors only about questions within their expertise.",
      "Store the final policy, confirmation, and payment records securely."
    ],
    faqs: [
      {
        question: "Should I pick coverage based only on what my business earned last month?",
        answer:
          "A single month may not show the full picture. Consider the variability of your household budget, expected care, and the policy’s full cost structure. A qualified financial or tax advisor can help with questions specific to your records, but they should not replace reading the policy itself."
      },
      {
        question: "What should I do if I am unsure whether a Marketplace review is relevant?",
        answer:
          "Ask what route is being discussed, who can assist with it, and where to find the current official information. If a referral route is appropriate, make sure you understand the handoff and retain copies of information you provide."
      }
    ],
    related: ["private-vs-marketplace", "small-business-benefits"]
  },
  {
    slug: "small-business-benefits",
    title: "Small-Business Health Benefits: A Decision Process Before You Offer Coverage",
    description:
      "A preparation guide for small-business owners weighing health benefit approaches for a team and their families.",
    kicker: "Small-business planning guide",
    intro:
      "Considering health benefits for a small business is both a people decision and an operating decision. Employees may value support with health coverage, but an owner also needs to understand the administrative work, the financial commitment, and the limits of what has actually been communicated. A thoughtful process begins before any option is presented to the team. This draft guide helps business owners create that process in plain language. It does not promise that any plan, contribution approach, or enrollment path will be available or suitable. Harrison Health Group’s focus is private health plans, and other routes may require separate research or an appropriate referral. Read actual policy and program documents, and use qualified legal, tax, payroll, and insurance advisors for advice that applies to your business.",
    sections: [
      {
        heading: "Define the business question before shopping",
        body: [
          "Start by explaining why you are exploring benefits. You may be responding to employee questions, trying to make hiring conversations clearer, or building a more formal people process. The reason matters because it shapes what success looks like. For example, a solution designed to simplify administration may be evaluated differently from one designed around a broader set of employee needs.",
          "Write down the guardrails before comparing options: who may be considered, the budget process, the staff time available for administration, and the decisions that need owner approval. These are internal planning choices, not promises to employees. Avoid announcing a benefit concept before you know the documents, costs, requirements, and administration steps behind it."
        ]
      },
      {
        heading: "Learn the population without collecting more than you need",
        body: [
          "A small team can have very different household situations. You can learn what questions employees have without asking for private medical details. Consider a short, voluntary listening process focused on general topics: whether people want clearer information, what communication format works, and what timing concerns they have. Be clear that feedback is exploratory and does not guarantee an offering or a particular outcome.",
          "Keep health information appropriately private and limit access to anyone who truly needs it for a legitimate process. When a question moves into personal medical, legal, or tax territory, do not improvise an answer. Direct the employee to the relevant official source or qualified professional. Respectful boundaries protect both the employee and the business."
        ]
      },
      {
        heading: "Compare administration as carefully as benefits",
        body: [
          "An option can look straightforward until the business has to enroll people, manage payments, answer routine questions, maintain records, or respond when someone joins or leaves. Ask for a clear description of who handles each task and what the employer, employee, advisor, payroll provider, and coverage organization are each expected to do. Put those responsibilities in writing before committing.",
          "Review the official documents for contribution rules, employee communications, enrollment steps, billing, changes, and ongoing requirements. Do not assume a feature discussed in a meeting is included unless you can find it in the governing materials. Qualified payroll, legal, tax, and insurance advisors can help the owner identify which questions require specialized review."
        ]
      },
      {
        heading: "Communicate facts, choices, and limits clearly",
        body: [
          "Employees need plain explanations, but plain language should not turn into unsupported certainty. Tell people what has been decided, what is still being reviewed, what documents control, and where they can ask questions. Avoid telling an employee that a plan will cover a particular service or cost unless the official plan materials support that statement and the employee has been directed to the applicable process.",
          "A good communication packet may include an overview, links or copies of official documents, deadlines that have been confirmed, and a contact path for questions. It should also say that individual circumstances can differ and that employees should review materials carefully. This improves clarity without asking managers to act as personal coverage advisors."
        ]
      },
      {
        heading: "Review the decision after implementation",
        body: [
          "If the business moves forward, the first cycle should be treated as a learning period. Note questions that repeated, where forms caused confusion, and which administrative tasks took more time than expected. Do not use informal feedback to make promises about next year. Instead, capture it as input for a future documented review with the appropriate advisors and official materials.",
          "Create a secure file for governing documents, employee notices, approvals, and records required for your process. Schedule a review before any future decision point, allowing time to revisit budget, staffing, business changes, and the current terms of anything being considered. A disciplined review is more reliable than carrying forward an old assumption because it was convenient."
        ]
      }
    ],
    checklist: [
      "State the business reason for exploring benefits and the decisions that need approval.",
      "Set internal planning guardrails for budget, administration time, and employee communication.",
      "Gather voluntary employee questions without requesting unnecessary personal health details.",
      "Identify who would handle enrollment, payroll coordination, records, and routine questions.",
      "Read official documents covering terms, administration, billing, changes, and employee materials.",
      "Confirm which questions need payroll, legal, tax, or insurance advisor review.",
      "Prepare a factual employee communication that distinguishes confirmed details from items still under review.",
      "Securely retain final documents, approvals, and records required for the business process."
    ],
    faqs: [
      {
        question: "Can I tell employees what a plan will cover based on a sales conversation?",
        answer:
          "It is safer to point employees to the official plan materials and the appropriate question process. Coverage and cost questions can depend on the policy terms and an individual situation, so avoid making guarantees that are not supported by governing documents."
      },
      {
        question: "Do I need to decide everything before asking employees for input?",
        answer:
          "No. You can invite general, voluntary feedback while making clear that you are researching and have not made a promise. Keep the questions focused on communication and planning needs, and avoid collecting medical details that are not necessary."
      }
    ],
    related: ["private-vs-marketplace", "self-employed-coverage"]
  }
];

export const faqs: { question: string; answer: string }[] = [
  {
    question: "Can I get health insurance outside open enrollment?",
    answer:
      "Yes, for the private plans we work with: you can apply any time of year, not only during open enrollment. Marketplace plans follow their own enrollment periods, so if a Marketplace plan looks like a better fit, we can point you to the right place to start."
  },
  {
    question: "What is the difference between private and Marketplace health plans?",
    answer:
      "They are different routes to coverage, with different enrollment rules, costs and benefits. The private-versus-Marketplace guide in our Resources section walks through what to compare side by side."
  },
  {
    question: "How much is health insurance for a self-employed person?",
    answer:
      "It depends on who needs coverage, their ages, where you live, the plan you choose and the answers on the application. A licensed advisor can go over real numbers for your household after a short conversation."
  },
  {
    question: "Can I switch from COBRA to a private plan?",
    answer:
      "You can apply for the private plans we work with any time of year, including while you are on COBRA. Compare both before you decide, and check your COBRA notice for its deadlines."
  },
  {
    question: "Which states do you help with?",
    answer:
      "Our team is based in Sunrise, Florida, and serves the states shown on our map. If your state is not listed, ask, and we will tell you whether we can help or point you somewhere that can."
  },
  {
    question: "What information should I gather before discussing health coverage?",
    answer:
      "Bring the household or employee situation you are trying to solve, expected care needs you are comfortable sharing, current policy documents, and a list of questions. Official plan materials are the place to confirm terms."
  },
  {
    question: "Why should I read the policy documents if I have a summary?",
    answer:
      "A summary can orient you, but the governing documents explain the terms that apply. Read them carefully and ask for clarification when a term or process is unclear."
  },
  {
    question: "Can an advisor tell me which option is right for me?",
    answer:
      "An appropriately qualified advisor can help explain options within their area of expertise. Your decision should also reflect your circumstances and the actual documents for the option you are considering."
  },
  {
    question: "How do I keep coverage decisions organized?",
    answer:
      "Use one worksheet for comparisons and keep final documents, confirmations, and important communications in a secure place. Write down the questions you asked and where the answers were confirmed."
  },
  {
    question: "What if my family or business situation changes after I make a decision?",
    answer:
      "Review the current official materials and contact the relevant organization or qualified advisor promptly. Do not assume a past rule or conversation applies to a new situation."
  },
  {
    question: "Is Marketplace coverage handled the same way as private health plan options?",
    answer:
      "They can involve different processes and sources of official information. If a Marketplace review may be relevant, ask what assistance or referral route is available and verify the current details through the appropriate official sources."
  },
  {
    question: "What should I do when I do not understand a coverage term?",
    answer:
      "Ask for a plain-language explanation, then check the term in the actual policy or program documents. For personal legal, tax, or financial questions, consult a qualified advisor in that field."
  }
];
