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
  { icon: Shield, label: "Private Coverage Focus" },
  { icon: Users, label: "Individuals & Families" },
  { icon: Award, label: "Business Inquiries" },
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
      style={{ background: "#FFFFFF" }}
    >
      {/* Pure white background — no tint overlays */}

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
        className="hidden md:flex"  /* desktop only — hidden on mobile */
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "55%",          /* right 55% of the hero — clear of left text column */
          y: logoY,
          pointerEvents: "none",
          overflow: "hidden",
          zIndex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "80px",     /* push below navbar */
        }}
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      >
        {/* HH Monogram + HARRISON HEALTH bar — grouped together, matching original logo layout */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            userSelect: "none",
          }}
        >
          {/* Two H letters side by side — left H higher (larger), right H lower (smaller) */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",   /* baseline-align so right H sits lower */
              lineHeight: 1,
              gap: "clamp(6px, 1vw, 16px)",
            }}
          >
            {/* Left H — taller, sits higher because it's larger */}
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(150px, 18vw, 260px)",
                lineHeight: 0.85,
                color: "#0A0A0A",
                display: "block",
                /* Push left H up by adding extra bottom margin so its baseline is higher */
                marginBottom: "clamp(28px, 3.5vw, 55px)",
              }}
            >
              H
            </span>
            {/* Right H — smaller, sits at the shared baseline (no extra margin) */}
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(110px, 14vw, 200px)",
                lineHeight: 0.85,
                color: "#0A0A0A",
                display: "block",
                marginBottom: 0,
              }}
            >
              H
            </span>
          </div>

          {/* HARRISON HEALTH bar — directly below the letters, tight gap */}
          <div
            style={{
              marginTop: "clamp(4px, 0.5vw, 10px)",
              width: "100%",
            background: "rgba(255,255,255,0.90)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1.5px solid rgba(10,10,10,0.55)",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              padding: "10px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                fontSize: "clamp(0.6rem, 1.1vw, 0.85rem)",
                letterSpacing: "0.42em",
                textTransform: "uppercase",
                color: "#0A0A0A",
                whiteSpace: "nowrap",
              }}
            >
              Harrison Health
            </span>
          </div>
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
            initial={false}
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
                background: "#FFFFFF",
                border: "1.5px solid #0A0A0A",
                borderRadius: 4,
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  color: "#0A0A0A",
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
                color: "#795E20",
              }}
            >
              Harrison Health Group · Private Coverage Guidance
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              color: "#0A0A0A",
              lineHeight: 1.0,
              marginBottom: "1.5rem",
            }}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            Private Health Coverage{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #795E20, #A8852D, #795E20)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "block",
              }}
            >
              Starts with Clarity.
            </span>
          </motion.h1>

          {/* Mobile-only HH watermark — shown below headline, hidden on desktop */}
          <motion.div
            className="flex md:hidden flex-col items-center mt-6 mb-6"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ pointerEvents: "none", userSelect: "none" }}
          >
            {/* HH letters */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                lineHeight: 1,
                gap: "6px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "clamp(80px, 22vw, 120px)",
                  lineHeight: 0.85,
                  color: "#0A0A0A",
                  display: "block",
                  marginBottom: "clamp(14px, 4vw, 24px)",
                }}
              >
                H
              </span>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "clamp(60px, 17vw, 92px)",
                  lineHeight: 0.85,
                  color: "#0A0A0A",
                  display: "block",
                  marginBottom: 0,
                }}
              >
                H
              </span>
            </div>
            {/* HARRISON HEALTH bar */}
            <div
              style={{
                marginTop: "6px",
                width: "100%",
                background: "rgba(255,255,255,0.90)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1.5px solid rgba(10,10,10,0.55)",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                padding: "8px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 500,
                  fontSize: "0.65rem",
                  letterSpacing: "0.38em",
                  textTransform: "uppercase",
                  color: "#0A0A0A",
                  whiteSpace: "nowrap",
                }}
              >
                Harrison Health
              </span>
            </div>
          </motion.div>

          {/* Sub-headline */}
          <motion.p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(1rem, 2vw, 1.15rem)",
                color: "#0A0A0A",
              lineHeight: 1.75,
              maxWidth: 520,
              marginBottom: "2.5rem",
            }}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            Explore questions about private health plans for your household or business.
            Tell us what matters, then review the actual options and documents with an advisor.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4 mb-12"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatedButton
              onClick={() => onQuoteClick ? onQuoteClick() : scrollToContact()}
              className="btn-primary text-base px-7 py-4"
            >
              <Shield size={17} />
              Request a Coverage Conversation
            </AnimatedButton>
            <motion.a
              href="tel:+19546000342"
              className="flex items-center gap-2 px-7 py-4 rounded-md text-base font-semibold no-underline transition-all duration-300"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: "rgba(201,168,76,0.07)",
                border: "1px solid rgba(201,168,76,0.30)",
                color: "#0A0A0A",
              }}
              whileHover={{ background: "rgba(201,168,76,0.15)", borderColor: "rgba(201,168,76,0.55)", scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              <Phone size={17} style={{ color: "#C9A84C" }} />
              Speak to Our Team
            </motion.a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            className="flex flex-wrap gap-3"
            initial={false}
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
                color: "#0A0A0A",
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
            color: "#C9A84C",
          }}
        >
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "#C9A84C" }}
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}
