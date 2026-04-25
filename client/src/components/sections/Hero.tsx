/*
 * HARRISON HEALTH GROUP — Hero Section
 * Full-viewport with Ken Burns parallax background, word-by-word headline reveal,
 * ambient purple orbs, trust pills, and a "Quote Coming Soon" placeholder panel.
 * Design: Midnight Gradient Luxury
 */

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Star, Users, Award, ChevronDown, Phone } from "lucide-react";
import { WordReveal, FadeUp, AnimatedButton } from "@/components/motion/AnimationWrappers";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663441385223/aeUWcF9B5vWVriiiqFVf4u/hhg-hero-bg-N3aneUggEhYUJ2Gz8TqYEM.webp";

const trustPills = [
  { icon: Shield, label: "Licensed & Independent" },
  { icon: Star, label: "20+ Top Carriers" },
  { icon: Users, label: "Families & Businesses" },
  { icon: Award, label: "No-Cost Service" },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToNext = () => {
    const el = document.querySelector("#carriers");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#08080E" }}
    >
      {/* Background Image with Ken Burns */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY, scale: 1.12 }}
      >
        <motion.img
          src={HERO_BG}
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.55 }}
          animate={{
            scale: [1, 1.07, 1.04, 1.08, 1.02, 1],
            x: ["0%", "1.5%", "-1%", "0.8%", "-0.4%", "0%"],
            y: ["0%", "-1%", "0.8%", "-0.5%", "0.6%", "0%"],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(8,8,14,0.85) 0%, rgba(17,13,30,0.70) 50%, rgba(8,8,14,0.80) 100%)",
          }}
        />
      </motion.div>

      {/* Ambient Purple Orbs */}
      <div
        className="ambient-orb"
        style={{
          width: 700,
          height: 700,
          background: "radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)",
          top: "-200px",
          left: "-200px",
          animationDelay: "0s",
        }}
      />
      <div
        className="ambient-orb"
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(109,40,217,0.20) 0%, transparent 70%)",
          bottom: "-100px",
          right: "-100px",
          animationDelay: "-20s",
        }}
      />

      {/* Light streak sweep */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(115deg, transparent 30%, rgba(167,139,250,0.04) 50%, transparent 70%)",
        }}
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 8, repeat: Infinity, repeatDelay: 6, ease: "easeInOut" }}
      />

      {/* Content */}
      <motion.div className="relative z-10 container" style={{ y: textY }}>
        <div className="max-w-3xl">
          {/* Section label */}
          <FadeUp delay={0.1}>
            <div className="flex items-center gap-3 mb-6">
              <div
                className="section-label"
                style={{ color: "#A78BFA" }}
              >
                Harrison Health Group
              </div>
              <div
                style={{
                  width: 40,
                  height: 1,
                  background: "linear-gradient(to right, #8B5CF6, transparent)",
                }}
              />
            </div>
          </FadeUp>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              lineHeight: 1.05,
              color: "#ffffff",
              marginBottom: "1.5rem",
            }}
          >
            <WordReveal
              text="Health Coverage"
              delay={0.2}
            />
            <br />
            <WordReveal
              text="Built Around"
              delay={0.4}
              wordClassName="text-white"
            />
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #A78BFA, #8B5CF6, #6D28D9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <WordReveal text="Your Life." delay={0.6} />
            </span>
          </h1>

          {/* Subheadline */}
          <FadeUp delay={0.8}>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                color: "rgba(255,255,255,0.70)",
                lineHeight: 1.7,
                maxWidth: "560px",
                marginBottom: "2.5rem",
              }}
            >
              We shop 20+ top-rated carriers to find you the best health insurance
              at the lowest cost — at no charge to you. Independent. Unbiased. Yours.
            </p>
          </FadeUp>

          {/* CTA Buttons */}
          <FadeUp delay={1.0}>
            <div className="flex flex-wrap gap-4 mb-10">
              <AnimatedButton
                onClick={scrollToContact}
                className="btn-primary text-base px-8 py-4"
              >
                <Shield size={18} />
                Get Your Free Quote
              </AnimatedButton>
              <motion.a
                href="tel:+18005551234"
                className="flex items-center gap-2 px-8 py-4 rounded-lg text-base font-semibold text-white transition-all duration-300"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  background: "rgba(139, 92, 246, 0.08)",
                  border: "1px solid rgba(139, 92, 246, 0.25)",
                }}
                whileHover={{
                  background: "rgba(139, 92, 246, 0.15)",
                  borderColor: "rgba(139, 92, 246, 0.5)",
                  scale: 1.02,
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
              >
                <Phone size={18} />
                Speak to an Advisor
              </motion.a>
            </div>
          </FadeUp>

          {/* Trust Pills */}
          <FadeUp delay={1.2}>
            <div className="flex flex-wrap gap-3">
              {trustPills.map((pill, i) => (
                <motion.div
                  key={pill.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{
                    background: "rgba(139, 92, 246, 0.08)",
                    border: "1px solid rgba(139, 92, 246, 0.20)",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.75)",
                  }}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 + i * 0.08, duration: 0.4 }}
                >
                  <pill.icon size={13} style={{ color: "#A78BFA" }} />
                  {pill.label}
                </motion.div>
              ))}
            </div>
          </FadeUp>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors bg-transparent border-none"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Explore
        </span>
        <ChevronDown size={18} />
      </motion.button>
    </section>
  );
}
