/*
 * HARRISON HEALTH GROUP — Home Page
 * Assembles all sections in order. Manages QuoteModal state globally.
 * Design: Charcoal & Gold Luxury
 */

import { useState } from "react";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import CarrierMarquee from "@/components/sections/CarrierMarquee";
import WhyUs from "@/components/sections/WhyUs";
import Coverage from "@/components/sections/Coverage";
import About from "@/components/sections/About";
import Stats from "@/components/sections/Stats";
import Team from "@/components/sections/Team";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import LicensedStatesMap from "@/components/sections/LicensedStatesMap";
import Footer from "@/components/sections/Footer";
import StickyCallButton from "@/components/StickyCallButton";
import QuoteModal from "@/components/QuoteModal";

export default function Home() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <div
      className="min-h-screen"
      style={{ background: "#08060F", color: "#FFFFFF" }}
    >
      <Navbar onQuoteClick={() => setQuoteOpen(true)} />
      <Hero onQuoteClick={() => setQuoteOpen(true)} />
      <CarrierMarquee />
      <WhyUs onQuoteClick={() => setQuoteOpen(true)} />
      <Coverage onQuoteClick={() => setQuoteOpen(true)} />
      <About />
      <Stats />
      <Team />
      <Testimonials />
      <LicensedStatesMap />
      <Contact onQuoteClick={() => setQuoteOpen(true)} />
      <Footer />
      <StickyCallButton />
      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
