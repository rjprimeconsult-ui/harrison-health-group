/*
 * HARRISON HEALTH GROUP — Hero Section
 * Real headline: "Health Insurance Made Simple"
 * Real phone: (954) 600-0342 | Owner: Shaquille Harrison
 * Design: Charcoal & Gold Luxury
 */

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Phone, Star, Award, Users } from "lucide-react";
import { AnimatedButton } from "@/components/motion/AnimationWrappers";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663441385223/aeUWcF9B5vWVriiiqFVf4u/hhg-hero-bg-wDNgKVGBxBxXJPLMSMFGEQ.webp";
const LOGO_URL = "/manus-storage/hhg-logo_8b865777.jpg";

const trustBadges = [
  { icon: Shield, label: "Licensed & Independent" },
  { icon: Star, label: "20+ Carrier Partners" },
  { icon: Users, label: "Families & Businesses" },
  { icon: Award, label: "No-Cost Service" },
];

interface HeroProps { onQuoteClick?: () => void; }

export default function Hero({ onQuoteClick }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#0A0A0A" }}
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY }}
      >
        <img
          src={HERO_IMG}
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.45 }}
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, rgba(10,10,10,0.92) 40%, rgba(10,10,10,0.55) 100%)",
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40"
          style={{ background: "linear-gradient(to top, #0A0A0A, transparent)" }}
        />
      </motion.div>

      {/* Gold ambient glow */}
      <div
        className="ambient-orb"
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)",
          top: "20%",
          left: "-100px",
        }}
      />

      {/* Content */}
      <div className="container relative z-10 pt-28 pb-20">
        <motion.div
          className="max-w-2xl"
          style={{ y: textY }}
        >
          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="rounded overflow-hidden"
              style={{ width: 32, height: 32, border: "1px solid rgba(201,168,76,0.35)" }}
            >
              <img src={LOGO_URL} alt="HH" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#C9A84C",
              }}
            >
              Harrison Health Group · NPN 20611469
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              color: "#F8F5F0",
              lineHeight: 1.0,
              marginBottom: "1.5rem",
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            Health Insurance{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #E2C97E, #C9A84C, #A8852D)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "block",
              }}
            >
              Made Simple.
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(1rem, 2vw, 1.15rem)",
              color: "rgba(248,245,240,0.70)",
              lineHeight: 1.75,
              maxWidth: 520,
              marginBottom: "2.5rem",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            We shop 20+ top-rated carriers to find you the best health insurance
            at the lowest cost — at no charge to you. Independent. Unbiased. Yours.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4 mb-12"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatedButton onClick={() => onQuoteClick ? onQuoteClick() : scrollToContact()} className="btn-primary text-base px-7 py-4">
              <Shield size={17} />
              Get Your Free Quote
            </AnimatedButton>
            <motion.a
              href="tel:+19546000342"
              className="flex items-center gap-2 px-7 py-4 rounded-md text-base font-semibold no-underline transition-all duration-300"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: "rgba(201,168,76,0.08)",
                border: "1px solid rgba(201,168,76,0.30)",
                color: "#F8F5F0",
              }}
              whileHover={{ background: "rgba(201,168,76,0.15)", borderColor: "rgba(201,168,76,0.55)", scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              <Phone size={17} style={{ color: "#C9A84C" }} />
              Speak to an Advisor
            </motion.a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(201,168,76,0.07)",
                  border: "1px solid rgba(201,168,76,0.18)",
                }}
              >
                <badge.icon size={12} style={{ color: "#C9A84C" }} />
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.75rem",
                    color: "rgba(248,245,240,0.70)",
                    fontWeight: 500,
                  }}
                >
                  {badge.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={() => {
          const el = document.querySelector("#why-us");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.55rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(201,168,76,0.60)",
          }}
        >
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "rgba(201,168,76,0.60)" }}
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}
