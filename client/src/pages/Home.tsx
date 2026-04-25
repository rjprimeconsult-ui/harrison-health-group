/*
 * HARRISON HEALTH GROUP — Home Page
 * Assembles all sections in order.
 * Design: Midnight Gradient Luxury
 */

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
import Footer from "@/components/sections/Footer";
import StickyCallButton from "@/components/StickyCallButton";

export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "#08080E", color: "#ffffff" }}
    >
      <Navbar />
      <Hero />
      <CarrierMarquee />
      <WhyUs />
      <Coverage />
      <About />
      <Stats />
      <Team />
      <Testimonials />
      <Contact />
      <Footer />
      <StickyCallButton />
    </div>
  );
}
