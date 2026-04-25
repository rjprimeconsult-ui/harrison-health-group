/*
 * HARRISON HEALTH GROUP — Hero Section
 * Design: Charcoal & Gold Luxury — Midnight Gradient
 * Logo Treatment: Full-width watermark "Hh" monogram blended into dark hero background
 *   — Large ghosted serif "Hh" letters at ~4% opacity in the open space above the headline
 *   — Charcoal bar with gold "HARRISON HEALTH" text spanning the width, matching brand logo style
 */

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Phone, Star, Award, Users } from "lucide-react";
import { AnimatedButton } from "@/components/motion/AnimationWrappers";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663441385223/aeUWcF9B5vWVriiiqFVf4u/hhg-hero-bg-wDNgKVGBxBxXJPLMSMFGEQ.webp";

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
  const logoY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

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
      {/* Parallax background image */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src={HERO_IMG}
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.35 }}
        />
        {/* Dark overlay — heavier on left for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, rgba(10,10,10,0.95) 35%, rgba(10,10,10,0.60) 100%)",
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
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)",
          top: "10%",
          left: "-120px",
          pointerEvents: "none",
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
          WATERMARK LOGO TREATMENT
          Right-aligned in the hero — mirrors the original HH logo layout.
          The large ghosted "Hh" letters sit in the right 55% of the hero,
          spanning from the navbar down to ~70% of the hero height.
          The "HARRISON HEALTH" bar is anchored below the monogram.
          Both are behind the content (z-index 1) and never overlap the
          left-aligned headline text.
      ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "55%",          /* right 55% of the hero — clear of left text column */
          height: "75%",
          y: logoY,
          pointerEvents: "none",
          overflow: "hidden",
          zIndex: 1,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      >
        {/* Large ghosted "Hh" monogram — two serif letters side by side, centered in this column */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.02em",
            paddingTop: "60px",   /* clear the navbar */
          }}
        >
          {/* Capital H */}
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(180px, 22vw, 320px)",
              lineHeight: 1,
              color: "rgba(248,245,240,0.05)",
              letterSpacing: "-0.04em",
              userSelect: "none",
              display: "block",
            }}
          >
            H
          </span>
          {/* Lowercase h — slightly smaller, dropped down */}
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(130px, 16vw, 230px)",
              lineHeight: 1,
              color: "rgba(248,245,240,0.04)",
              letterSpacing: "-0.04em",
              userSelect: "none",
              display: "block",
              marginTop: "clamp(30px, 4vw, 65px)",
            }}
          >
            h
          </span>
        </div>

        {/* "HARRISON HEALTH" charcoal bar — anchored to bottom of the monogram block */}
        <div
          style={{
            position: "absolute",
            bottom: "12%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "clamp(220px, 32vw, 420px)",
            background: "rgba(28,26,20,0.75)",
            backdropFilter: "blur(3px)",
            WebkitBackdropFilter: "blur(3px)",
            border: "1px solid rgba(201,168,76,0.14)",
            padding: "9px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: "clamp(0.65rem, 1.2vw, 0.9rem)",
              letterSpacing: "0.40em",
              textTransform: "uppercase",
              color: "rgba(201,168,76,0.65)",
              userSelect: "none",
              whiteSpace: "nowrap",
            }}
          >
            Harrison Health
          </span>
        </div>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          HERO CONTENT — sits below the watermark logo area
      ───────────────────────────────────────────────────────────── */}
      <div className="container relative z-10 pt-36 pb-20">
        <motion.div className="max-w-2xl" style={{ y: textY }}>

          {/* Eyebrow — NPN badge */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Small HH monogram pill */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 30,
                height: 30,
                background: "rgba(201,168,76,0.10)",
                border: "1px solid rgba(201,168,76,0.30)",
                borderRadius: 4,
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  color: "#C9A84C",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                HH
              </span>
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
            <AnimatedButton
              onClick={() => onQuoteClick ? onQuoteClick() : scrollToContact()}
              className="btn-primary text-base px-7 py-4"
            >
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
