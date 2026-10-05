import { useState } from "react";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import WhyUs from "@/components/sections/WhyUs";
import Coverage from "@/components/sections/Coverage";
import About from "@/components/sections/About";
import Team from "@/components/sections/Team";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import LicensedStatesMap from "@/components/sections/LicensedStatesMap";
import Schedule from "@/components/sections/Schedule";
import Footer from "@/components/sections/Footer";
import StickyCallButton from "@/components/StickyCallButton";
import QuoteModal from "@/components/QuoteModal";

export default function Home() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  return <div className="site-page">
    <Navbar onQuoteClick={() => setQuoteOpen(true)} />
    <main id="main-content">
      <Hero onQuoteClick={() => setQuoteOpen(true)} />
      <WhyUs />
      <Coverage onQuoteClick={() => setQuoteOpen(true)} />
      <section className="page-section page-dark" aria-labelledby="business-teaser-title"><div className="page-shell grid md:grid-cols-[1fr_auto] gap-8 items-center"><div><p className="page-eyebrow">For employers</p><h2 id="business-teaser-title">A separate path for your business.</h2><p>Bring your team size, timing, and benefits questions to a focused conversation—without sending employee health details.</p></div><a className="btn-primary" href="/business">Explore business coverage</a></div></section>
      <About />
      <Team />
      <Testimonials />
      <LicensedStatesMap />
      <Schedule />
      <section className="page-section" aria-labelledby="resource-teaser-title"><div className="page-shell grid md:grid-cols-[1fr_auto] gap-8 items-center"><div><p className="page-eyebrow">Before you decide</p><h2 id="resource-teaser-title">Get clearer on your questions.</h2><p>Read original preparation guides for households, independent workers, and small employers.</p></div><a className="page-link" href="/resources">Explore the guides</a></div></section>
      <Contact onQuoteClick={() => setQuoteOpen(true)} />
    </main>
    <Footer />
    <StickyCallButton />
    <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
  </div>;
}
