import { useEffect, useState } from "react";
import { site } from "@shared/site";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Team from "@/components/sections/Team";
import LeadForm from "@/components/LeadForm";
import { guides, faqs, type Guide } from "@/content/guides";
import { publicPages } from "@shared/site";
import { englishUi, type LandingPage } from "@/content/landing";
import { emitEvent, getAttribution } from "@/lib/measurement";
import { sendSiteEvent } from "@/lib/site-analytics";

// Calendly link tagged with where the visitor booked from, so bookings show their source in Calendly
// (owner request 2026-11-02). Only the page name and "google_ads"/"website" go to Calendly, never contact details.
export function bookingHref(surface: string, fromAd = false): string {
  const url = new URL(site.bookingUrl);
  url.searchParams.set("utm_source", fromAd ? "google_ads" : "website");
  url.searchParams.set("utm_medium", "website");
  url.searchParams.set("utm_campaign", surface || "site");
  return url.toString();
}
function cameFromAd(): boolean {
  try { const a = getAttribution(); return Boolean(a.gclid || a.gbraid || a.wbraid); } catch { return false; }
}

function Layout({ children }: { children: React.ReactNode }) { return <div className="site-page"><Navbar /><main id="main-content" className="page-main">{children}</main><Footer /></div>; }
function Hero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) { return <header className="page-hero page-shell"><p className="page-eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></header>; }
function BookLink({ label = "Schedule a conversation", surface, className = "btn-primary" }: { label?: string; surface: string; className?: string }) { return <a className={className} href={bookingHref(surface)} target="_blank" rel="noopener noreferrer" onClick={(e) => { e.currentTarget.href = bookingHref(surface, cameFromAd()); emitEvent("booking_click", { surface }); }}>{label}</a>; }

// Phones only: a bar pinned to the bottom of ad landing pages with Call and Request a quote call (owner request
// 2026-11-02; most ad clicks come from phones and the form sits below the first screen). It appears after the
// visitor scrolls past the top buttons and hides while the form itself is on screen so it never covers it.
function MobileQuoteBar({ surface, callLabel, quoteLabel }: { surface: string; callLabel: string; quoteLabel: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 450);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const form = document.getElementById("quote-form");
    const observer = form && "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), { threshold: 0.15 })
      : null;
    if (form && observer) observer.observe(form);
    return () => { window.removeEventListener("scroll", onScroll); observer?.disconnect(); };
  }, []);
  const show = scrolled && !formVisible;
  return <div className="lg:hidden fixed inset-x-0 bottom-0 z-50 flex gap-3 px-4 pt-3" aria-hidden={!show}
    style={{ paddingBottom: "max(.75rem, env(safe-area-inset-bottom))", background: "rgba(10,10,10,.96)", borderTop: "1px solid #C9A84C", transform: show ? "translateY(0)" : "translateY(110%)", transition: "transform .25s ease" }}>
    <a className="page-link flex-1" style={{ color: "#FFFFFF", padding: ".7rem .5rem", fontSize: ".85rem", lineHeight: 1.2, textAlign: "center", minWidth: 0 }} href="#quote-form" tabIndex={show ? 0 : -1} onClick={() => sendSiteEvent("quote_cta_click", 2)}>{quoteLabel}</a>
    <a className="btn-primary flex-1 justify-center" style={{ padding: ".7rem .5rem", fontSize: ".85rem", lineHeight: 1.2, letterSpacing: ".02em", textAlign: "center", minWidth: 0 }} href={site.phoneHref} tabIndex={show ? 0 : -1} onClick={() => emitEvent("click_to_call", { surface: `${surface}-mobile-bar` })}><span>{callLabel} <span style={{ whiteSpace: "nowrap" }}>{site.phoneDisplay}</span></span></a>
  </div>;
}
function CallLink({ surface }: { surface: string }) { return <a className="page-link" href={site.phoneHref} onClick={() => emitEvent("click_to_call", { surface })}>Call {site.phoneDisplay}</a>; }
function Boundary() { return <aside className="page-disclaimer">Educational information only—not a quote, application, coverage determination, or legal, medical, tax, or financial advice. Check current official policy documents, availability in your state, and advisor licensing before making a decision.</aside>; }

export function BusinessPage() { return <Layout>
  <Hero eyebrow="For business owners" title="Plan a clearer benefits conversation." description="Exploring group health coverage for a small team? Start with your goals, timeline, and questions—then discuss what may fit your business. No price or availability is promised here." />
  <section className="page-section page-shell"><h2>What to prepare before you meet</h2><div className="page-grid"><div className="editorial-card"><span className="page-eyebrow">01 / Your team</span><h3>People and timing</h3><p>Bring an approximate team size, state, and the date you want to make a decision. Do not send employees’ medical information through this website.</p></div><div className="editorial-card"><span className="page-eyebrow">02 / Your process</span><h3>Current approach</h3><p>Note whether you are considering a first offering, reviewing an existing arrangement, or preparing for a future renewal.</p></div><div className="editorial-card"><span className="page-eyebrow">03 / Your questions</span><h3>Decision criteria</h3><p>List the administration tasks, employee communication needs, and official plan documents you want to review.</p></div></div><p className="mt-7"><a href="/resources/small-business-benefits" className="page-link">Read the small-business guide</a></p></section>
  <section className="page-section page-dark" id="business-inquiry"><div className="page-shell grid lg:grid-cols-[.8fr_1.2fr] gap-12 items-start"><div><p className="page-eyebrow">Business inquiry</p><h2>Start with the basics.</h2><p>A short request helps us understand the conversation you need. It does not enroll a business or generate a quote.</p><div className="page-actions"><BookLink surface="business" /><CallLink surface="business" /></div><p className="text-sm mt-5">One general consultation URL is currently confirmed. A separate business appointment type is pending owner confirmation.</p></div><div className="rounded-xl p-5 sm:p-8" style={{ border: "1px solid #C9A84C" }}><LeadForm kind="business" /></div></div></section>
  <section className="page-section page-shell"><Boundary /></section>
</Layout>; }

export function ContactPage() { return <Layout><Hero eyebrow="Reach the team" title="A straightforward next step." description="Call, write, or choose a time to talk about your private health coverage questions. Share only basic contact and routing information through this website." /><section className="page-section page-shell"><div className="page-grid"><div className="editorial-card"><h2>Call</h2><p>Speak with the team about your question and confirm whether a relevant advisor is available for your state.</p><CallLink surface="contact" /></div><div className="editorial-card"><h2>Email</h2><p>Send a general inquiry. Please do not include medical history, diagnoses, or other sensitive information.</p><a href={`mailto:${site.email}`}>{site.email}</a></div><div className="editorial-card"><h2>Schedule</h2><p>Use the owner-provided booking page to choose an available appointment. Duration and format are shown by the provider.</p><BookLink surface="contact" /></div></div><p className="mt-8"><a href="/faq" className="page-link">Read common questions first</a></p></section>
  <section className="page-section page-shell"><h2>What happens when you reach out</h2><div className="page-grid mt-6"><div className="editorial-card"><span className="page-eyebrow">01</span><h3>A short conversation</h3><p>A licensed advisor asks who needs coverage, where you live, when you need it to start and what matters most to you, such as keeping a doctor or a predictable monthly cost.</p></div><div className="editorial-card"><span className="page-eyebrow">02</span><h3>Options explained</h3><p>The advisor walks you through private plans that may fit, explains that they ask health questions on the application, and tells you if a Marketplace plan looks like a better fit.</p></div><div className="editorial-card"><span className="page-eyebrow">03</span><h3>You decide</h3><p>Take time to read the plan documents. If you choose to apply, your advisor helps with the application and the insurer makes its decision. You can apply for the private plans we work with any time of year.</p></div></div></section>
  <section className="page-section page-shell"><h2>Where we are</h2><p className="mt-3 max-w-3xl">Harrison Health Group is based at 1550 Sawgrass Corporate Pkwy, Ste 300, Sunrise, Florida 33323, in Broward County. We help families and businesses by phone across the states shown on our homepage map, including Florida, Texas and Georgia.</p><div className="page-actions"><a className="page-link" href="/florida-health-insurance">Florida health insurance</a><a className="page-link" href="/broward-county-health-insurance">Fort Lauderdale and Broward</a><a className="page-link" href="/resources/off-exchange-health-insurance">Private plans outside the Marketplace</a></div></section></Layout>; }

export function AboutPage() { return <Layout><Hero eyebrow="About Harrison Health Group" title="People behind the conversation." description="Get to know the team and choose a direct way to ask about private health coverage. Specific credentials, licensing, and personal biographies are subject to owner verification." /><Team /><section className="page-section page-dark"><div className="page-shell"><h2>Talk with the team</h2><p>Bring your questions and the documents you want help understanding. Confirm advisor licensing and plan availability for your state before discussing a specific product.</p><div className="page-actions"><BookLink surface="about" /><CallLink surface="about" /></div></div></section></Layout>; }

export function ResourcesPage() { return <Layout><Hero eyebrow="Decision guides" title="Know what to ask before you choose." description="Practical, original preparation guides for households, independent workers, and small employers. Use them to organize questions, then confirm details in current policy documents." /><section className="page-section page-shell"><div className="page-grid">{guides.map((guide, index) => <article className="editorial-card" key={guide.slug}><p className="page-eyebrow">0{index + 1} / {guide.kicker}</p><h2 className="!text-3xl">{guide.title}</h2><p>{guide.description}</p><a href={`/resources/${guide.slug}`} onClick={() => emitEvent("resource_cta_click", { surface: "hub", route: guide.slug })}>Read guide →</a></article>)}</div></section>
  <section className="page-section page-shell"><h2>Health insurance by state and situation</h2><p className="mt-3 max-w-3xl">Ready to look at plans? These pages explain how we help in Florida, Texas and Georgia, whether you need coverage for your family, you are self-employed or on a 1099, you are leaving COBRA, or you run a small business. You can request a quote call from any of them.</p>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">{SITE_MAP_GROUPS.filter((group) => !["Guides", "About us"].includes(group.title)).map((group) => { const pages = publicPages.filter((page) => page.kind === "landing" && group.match(page.path)); return pages.length ? <div className="editorial-card" key={group.title}><h3 className="text-2xl">{group.title}</h3><ul className="mt-4 space-y-2">{pages.map((page) => <li key={page.path}><a className="underline underline-offset-4" href={page.path}>{page.title.split(" | ")[0]}</a></li>)}</ul></div> : null; })}</div>
    <div className="mt-10"><Boundary /></div></section></Layout>; }

export function GuidePage({ guide }: { guide: Guide }) {
  useEffect(() => { emitEvent("resource_guide_view", { route: guide.slug }); }, [guide.slug]);
  return <Layout><article><div className="page-hero page-shell"><nav className="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/resources">Resources</a><span aria-hidden="true">/</span><span>{guide.title}</span></nav><p className="page-eyebrow">{guide.kicker}</p><h1>{guide.title}</h1><p>{guide.intro}</p><p className="text-sm">Updated {guide.updated ?? "October 4, 2026"} · Harrison Health Group</p></div><div className="page-section page-shell prose-content">{guide.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}<section><h2>Preparation checklist</h2><ul>{guide.checklist.map((item) => <li key={item}>{item}</li>)}</ul></section><section><h2>Questions to consider</h2>{guide.faqs.map((faq) => <div key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></div>)}</section><Boundary /><section><h2>Continue exploring</h2><div className="page-actions">{guide.related.map((slug) => { const match = guides.find((item) => item.slug === slug); return match ? <a className="page-link" href={`/resources/${slug}`} key={slug} onClick={() => emitEvent("resource_cta_click", { route: guide.slug, surface: "related" })}>{match.title}</a> : null; })}</div><div className="page-actions"><BookLink label="Talk through your questions" surface="guide" /><a className="page-link" href="/business">Business inquiry</a></div></section></div></article></Layout>;
}

export function FAQPage() { return <Layout><Hero eyebrow="Frequently asked questions" title="Better questions lead to clearer decisions." description="These answers help you prepare for a conversation. Confirm any product-specific details in the actual documents and with an appropriately qualified advisor." /><section className="page-section page-shell"><div className="prose-content">{faqs.map((faq) => <details className="editorial-card mb-3" key={faq.question}><summary className="cursor-pointer text-xl font-semibold" style={{ fontFamily: "'Cormorant Garamond',serif" }}>{faq.question}</summary><p className="mt-3">{faq.answer}</p></details>)}<div className="mt-8"><Boundary /></div><div className="page-actions"><BookLink surface="faq" /><a className="page-link" href="/resources">Browse guides</a></div></div></section></Layout>; }

export function CareersPage() { return <Layout><Hero eyebrow="Careers" title="Interested in future opportunities?" description="We are not advertising a specific opening on this page. If you would like to introduce yourself, contact the team with a short professional note." /><section className="page-section page-shell prose-content"><h2>Start a conversation</h2><p>Tell us about the type of work you are interested in and the experience you would like us to know about. Do not send personal health information. Job availability, role requirements, credentials, location, compensation, and benefits have not been confirmed for this page.</p><div className="page-actions"><a className="btn-primary" href={`mailto:${site.email}?subject=Careers%20inquiry`}>Email a careers inquiry</a><a className="page-link" href="/about">Meet the team</a></div>
  <h2>About the work</h2><p>Harrison Health Group is a health insurance agency based in Sunrise, Florida. Our advisors help individuals, families, self-employed people and small businesses understand private health coverage, by phone and by appointment, across the states the team serves. The work is about listening first: who needs coverage, what they want to keep, and what a sensible next step looks like for them.</p>
  <h2>What to include in your note</h2><ul><li>The kind of role you are interested in.</li><li>Your relevant experience, in a few sentences.</li><li>The state you live in and the best way to reach you.</li></ul><p>You can learn more about how we help clients on our <a href="/florida-health-insurance">Florida health insurance</a> page and in our <a href="/resources">guides</a>.</p></section></Layout>; }

export function PrivacyPage() { return <Layout><Hero eyebrow="Privacy Policy" title="Privacy Policy" description="How Harrison Health Group, a DBA of STAH Health LLC, collects and uses information when you contact us, request a quote, or work with our team. Last updated October 26, 2026." /><section className="page-section page-shell prose-content">
  <h2>Who we are</h2><p>Harrison Health Group is a doing-business-as name of STAH Health LLC (“Harrison Health Group,” “we,” “us”), 1550 Sawgrass Corporate Pkwy, Ste 300, Sunrise, FL 33323. This Privacy Policy explains what information we collect and how we use it.</p>
  <h2>Information you choose to send</h2><p>The inquiry form asks for your name, contact details, state, ZIP code, coverage conversation type, and optional business routing information. It sends the request to Web3Forms, a third-party form service configured by Harrison Health Group. It also includes limited source and campaign attribution where available. Do not include medical history in a website inquiry. When you call us, we receive your phone number; when a call is recorded for quality and training, the caller is told at the start of the call.</p>
  <h2>How we use information</h2><p>We use your information to respond to your request, to assign it to a licensed member of our team, to keep the records an insurance agency is required to keep, and to measure and improve our advertising. We do not sell personal information.</p>
  <h2>Text messages (SMS)</h2><p>Harrison Health Group sends text messages only to people who have agreed to receive them. Our licensed agents receive lead alert texts after giving written consent. <strong>We do not sell or share your SMS opt-in data or personal information with third parties for marketing purposes.</strong> Mobile numbers and SMS consent are used only to send the messages you agreed to receive and are shared only with the service providers that deliver those messages. Reply STOP to any message to opt out or HELP for help. See our <a href="/terms">Terms and Conditions</a> for the full SMS terms.</p>
  <h2>Google advertising measurement</h2><p>This website loads the Google Ads base tag to measure page visits and, after Web3Forms explicitly confirms receipt, a successful quote request. The site does not intentionally pass form entries, contact information, ZIP codes, coverage selections, medical information, or other inquiry content to Google Ads through this tag. Google may process website-visit data under the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a> and <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">Google’s information about partner sites</a>.</p>
  <h2>Booking, reviews, and external links</h2><p>Scheduling uses Calendly. When the homepage review section comes into view, the Google Maps Places service may load to obtain current Google ratings, written reviews, author profile links, author avatars, and direct review links. The site does not store or cache that content. External providers have their own privacy terms; review them before submitting information on their pages.</p>
  <h2>Sharing</h2><p>We share information with insurance carriers you choose to apply with, with service providers who help us operate (such as our form, phone, messaging, scheduling, hosting, and advertising providers) under confidentiality obligations, and when required by law.</p>
  <h2>Security</h2><p>We limit access to the information you send to the people who need it to help you and use reasonable safeguards to protect it.</p>
  <h2>Your choices and contact</h2><p>To ask us to stop contacting you, or to access or correct your information, call <a href={site.phoneHref}>{site.phoneDisplay}</a> or email <a href={`mailto:${site.email}`}>{site.email}</a>. We may update this policy and will change the date above when we do.</p>
</section></Layout>; }

export function TermsPage() { return <Layout><Hero eyebrow="Terms and Conditions" title="Terms and Conditions" description="Website use and SMS terms for Harrison Health Group, a DBA of STAH Health LLC. Last updated October 26, 2026." /><section className="page-section page-shell prose-content">
  <h2>Educational, not an enrollment decision</h2><p>Website guides and inquiry forms do not create insurance coverage, determine eligibility, or replace current official policy documents. A submitted request is not an application or binding quote. Confirm product availability, advisor licensing, terms, costs, and effective dates with the appropriate provider before acting.</p>
  <h2>SMS terms: Harrison Health Group Lead Alerts</h2>
  <p><strong>Program.</strong> Harrison Health Group Lead Alerts, operated by STAH Health LLC doing business as Harrison Health Group.</p>
  <p><strong>What you receive.</strong> Licensed insurance agents working with Harrison Health Group receive text alerts when a new insurance lead or call is assigned to them. Alerts contain the lead’s first name, state, and a secure link to our internal system. These messages are sent only to our agents and are not marketing messages.</p>
  <p><strong>How to join.</strong> Agents opt in by signing our <a href="/sms-consent-form.pdf" target="_blank" rel="noopener noreferrer">Lead Alert Text Message Consent form</a>.</p>
  <p><strong>Frequency and cost.</strong> Message frequency varies with lead volume. Message and data rates may apply.</p>
  <p><strong>Opt out.</strong> Reply STOP to any message to stop receiving texts. You will receive one confirmation message and no further texts.</p>
  <p><strong>Help.</strong> Reply HELP, call <a href={site.phoneHref}>{site.phoneDisplay}</a>, or email <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
  <p><strong>Carriers.</strong> Mobile carriers are not liable for delayed or undelivered messages.</p>
  <p><strong>Privacy.</strong> See our <a href="/privacy">Privacy Policy</a>. We do not sell or share your SMS opt-in data or personal information with third parties for marketing purposes.</p>
  <h2>Google Maps content</h2><p>For the Google Maps and Google Places content displayed on this website, these terms incorporate the <a href="https://cloud.google.com/maps-platform/terms" target="_blank" rel="noopener noreferrer">Google Maps Platform Terms of Service</a> and the <a href="https://cloud.google.com/maps-platform/terms/maps-service-terms" target="_blank" rel="noopener noreferrer">Google Maps Platform Service Specific Terms</a>. Google-supplied ratings, reviews, author attribution, and links are shown only as returned in the visitor’s session and remain subject to Google’s applicable terms and content policies.</p>
  <h2>Contact and updates</h2><p>Information may change. If a link or page appears incorrect, contact <a href={`mailto:${site.email}`}>{site.email}</a>. We may update these terms and will change the date above when we do.</p>
</section></Layout>; }

export function AdLandingPage({ page }: { page: LandingPage }) {
  const surface = page.path.slice(1);
  const ui = { ...englishUi, ...page.ui };
  return <Layout><div lang={page.lang}>
    <section className="page-section page-dark" id="quote"><div className="page-shell grid lg:grid-cols-[1fr_1fr] gap-12 items-start">
      <div className="flex flex-col lg:block"><p className="page-eyebrow">{page.eyebrow}</p><h1 className="page-heading" style={{ fontSize: "clamp(2.4rem,4.2vw,3.7rem)", marginTop: ".8rem" }}>{page.title}</h1><p className="mt-5 text-lg leading-relaxed order-last lg:order-none">{page.intro}</p>
        {/* Call first (owner request 2026-11-06): phone visitors rarely finish the form, and calls convert. */}
        <div className="page-actions"><a className="btn-primary" href={site.phoneHref} onClick={() => emitEvent("click_to_call", { surface })}>{ui.call} {site.phoneDisplay}</a><a className="page-link lg:hidden" href="#quote-form" onClick={() => sendSiteEvent("quote_cta_click", 1)}>{ui.requestCall}</a><BookLink label={ui.book} surface={surface} className="page-link" /></div>
        {ui.hours && <p className="mt-3 text-sm" style={{ color: "#C9A84C" }}>{ui.hours}</p>}
      </div>
      <div id="quote-form" className="rounded-xl p-5 sm:p-8" style={{ border: "1px solid #C9A84C", scrollMarginTop: "88px" }}>{ui.formNote && <p className="text-sm leading-6 mb-4">{ui.formNote}</p>}<div lang="en"><LeadForm kind={page.formKind ?? "consumer"} /></div></div>
    </div></section>
    <section className="page-section page-shell"><h2>{ui.why}</h2><div className="grid sm:grid-cols-2 gap-5 mt-6">{page.benefits.map((benefit) => <div className="editorial-card" key={benefit.title}><h3>{benefit.title}</h3><p>{benefit.text}</p></div>)}</div></section>
    <section className="page-section page-shell"><h2>{page.situationsHeading}</h2><ul className="list-disc pl-6 mt-5 space-y-2 text-lg">{page.situations.map((item) => <li key={item}>{item}</li>)}</ul></section>
    <section className="page-section page-shell"><h2>{ui.how}</h2><div className="page-grid">{page.steps.map((step, index) => <div className="editorial-card" key={step.title}><span className="page-eyebrow">0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></div>)}</div></section>
    <section className="page-section page-shell"><h2>{ui.faq}</h2><div className="prose-content">{page.faqs.map((faq) => <details className="editorial-card mb-3" key={faq.question}><summary className="cursor-pointer text-xl font-semibold" style={{ fontFamily: "'Cormorant Garamond',serif" }}>{faq.question}</summary><p>{faq.answer}</p>{faq.link && <a href={faq.link.href}>{faq.link.label}</a>}</details>)}</div>
      <div className="page-actions"><a className="btn-primary" href="#quote">{ui.requestCall}</a><a className="page-link" href={site.phoneHref} onClick={() => emitEvent("click_to_call", { surface })}>{ui.call} {site.phoneDisplay}</a></div></section>
    <section className="page-section page-shell"><aside className="page-disclaimer">{ui.disclaimer}</aside></section>
    <div className="lg:hidden" style={{ height: 76 }} aria-hidden="true" />
    <MobileQuoteBar surface={surface} callLabel={ui.call} quoteLabel={ui.requestCall} />
  </div>  </Layout>;
}

// Human-friendly site map (owner request 2026-10-29). /sitemap.xml stays for search engines.
const SITE_MAP_GROUPS: { title: string; match: (path: string) => boolean }[] = [
  { title: "Individuals and families", match: (p) => /^\/(florida|texas|georgia)-health-insurance$/.test(p) },
  { title: "Self-employed and 1099", match: (p) => p.startsWith("/self-employed-health-insurance-") },
  { title: "COBRA and job loss", match: (p) => p.startsWith("/cobra-alternative-") },
  { title: "Small business", match: (p) => p === "/business" || p.startsWith("/small-business-health-insurance-") },
  { title: "South Florida counties", match: (p) => /-(county|dade)-health-insurance$/.test(p) },
  { title: "En español", match: (p) => p.startsWith("/seguro-medico-") },
  { title: "Guides", match: (p) => p.startsWith("/resources") },
  { title: "About us", match: (p) => ["/", "/about", "/contact", "/faq", "/careers", "/privacy", "/terms"].includes(p) },
];
export function SiteMapPage() {
  const label = (title: string) => title.split(" | ")[0];
  return <Layout>
    <Hero eyebrow="Site map" title="Find your way around." description="Every page on our website, grouped by what you are looking for. Not sure where to start? Call us and we will point you in the right direction." />
    <section className="page-section page-shell"><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{SITE_MAP_GROUPS.map((group) => {
      const pages = publicPages.filter((page) => page.path !== "/site-map" && group.match(page.path));
      return pages.length ? <div className="editorial-card" key={group.title}><h2 className="text-2xl">{group.title}</h2><ul className="mt-4 space-y-2">{pages.map((page) => <li key={page.path}><a className="underline underline-offset-4" href={page.path}>{page.path === "/" ? "Home" : label(page.title)}</a></li>)}</ul></div> : null;
    })}</div>
    <div className="page-actions"><CallLink surface="site_map" /><BookLink surface="site_map" /></div></section>
  </Layout>;
}
