/*
 * HARRISON HEALTH GROUP — Coverage Section
 * Plan comparison table: Without Us vs With Us, plus coverage type cards.
 * Design: Midnight Gradient Luxury
 */

import { motion } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem, AnimatedButton } from "@/components/motion/AnimationWrappers";

const comparisonRows = [
  { label: "Compare 20+ carriers at once", without: false, with: true },
  { label: "Unbiased, independent advice", without: false, with: true },
  { label: "Zero cost to you", without: false, with: true },
  { label: "Dedicated licensed specialist", without: false, with: true },
  { label: "Year-round plan support", without: false, with: true },
  { label: "Fast 24–48 hr enrollment", without: false, with: true },
  { label: "Hidden fees or commissions", without: true, with: false },
  { label: "One-size-fits-all plans", without: true, with: false },
];

const coverageTypes = [
  {
    title: "Individual & Family",
    description: "ACA Marketplace plans, short-term coverage, and supplemental options tailored to your household.",
    tag: "Most Popular",
  },
  {
    title: "Group & Business",
    description: "Employer-sponsored health benefits for teams of 2 to 500. Attract and retain top talent.",
    tag: "Businesses",
  },
  {
    title: "Medicare Solutions",
    description: "Medicare Supplement (Medigap) and Medicare Advantage plans for those 65+ or with qualifying disabilities.",
    tag: "Seniors",
  },
  {
    title: "Dental & Vision",
    description: "Standalone dental and vision plans that pair with any health coverage. Preventive care included.",
    tag: "Add-On",
  },
  {
    title: "Life Insurance",
    description: "Term and whole life policies to protect your family's financial future at every stage of life.",
    tag: "Protection",
  },
  {
    title: "Self-Employed / 1099",
    description: "Specialized plans for freelancers and independent contractors. Maximize deductions, minimize costs.",
    tag: "Contractors",
  },
];

export default function Coverage() {
  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="coverage"
      className="py-28 relative overflow-hidden"
      style={{ background: "#0D0A1A" }}
    >
      {/* Ambient orbs */}
      <div
        className="ambient-orb"
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)",
          top: "-100px",
          right: "-100px",
          animationDelay: "-5s",
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <FadeUp>
          <div className="text-center mb-16">
            <div className="section-label mb-4">Coverage Options</div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                color: "#ffffff",
                lineHeight: 1.1,
                marginBottom: "1rem",
              }}
            >
              Plans for Every{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #A78BFA, #8B5CF6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Stage of Life
              </span>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(255,255,255,0.60)",
                fontSize: "1.05rem",
                maxWidth: 500,
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              From individual coverage to Medicare and group benefits —
              we have the right solution for every situation.
            </p>
          </div>
        </FadeUp>

        {/* Coverage Type Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {coverageTypes.map((plan) => (
            <StaggerItem key={plan.title}>
              <motion.div
                className="glass-card p-7 h-full relative overflow-hidden group"
                whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(139,92,246,0.20)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 700,
                      fontSize: "1.3rem",
                      color: "#ffffff",
                      lineHeight: 1.2,
                    }}
                  >
                    {plan.title}
                  </h3>
                  <span
                    className="shrink-0 ml-3 px-2 py-1 rounded-full text-xs font-medium"
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                      background: "rgba(139,92,246,0.15)",
                      color: "#A78BFA",
                      border: "1px solid rgba(139,92,246,0.25)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {plan.tag}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "rgba(255,255,255,0.58)",
                    fontSize: "0.9rem",
                    lineHeight: 1.65,
                  }}
                >
                  {plan.description}
                </p>
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(to right, #8B5CF6, #A78BFA, transparent)" }}
                />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Comparison Table */}
        <FadeUp>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="section-label mb-3">The Difference</div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  color: "#ffffff",
                  lineHeight: 1.1,
                }}
              >
                Going Alone vs. Working With Us
              </h3>
            </div>

            <div className="glass-card overflow-hidden">
              {/* Table Header */}
              <div
                className="grid grid-cols-3 px-6 py-4"
                style={{ borderBottom: "1px solid rgba(139,92,246,0.15)" }}
              >
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.50)",
                  }}
                >
                  Feature
                </div>
                <div
                  className="text-center"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.40)",
                  }}
                >
                  Without Us
                </div>
                <div
                  className="text-center"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    color: "#A78BFA",
                  }}
                >
                  With Harrison HG
                </div>
              </div>

              {/* Table Rows */}
              {comparisonRows.map((row, i) => (
                <motion.div
                  key={row.label}
                  className="grid grid-cols-3 px-6 py-4 items-center"
                  style={{
                    borderBottom: i < comparisonRows.length - 1 ? "1px solid rgba(139,92,246,0.08)" : "none",
                    background: i % 2 === 0 ? "transparent" : "rgba(139,92,246,0.03)",
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.88rem",
                      color: "rgba(255,255,255,0.75)",
                    }}
                  >
                    {row.label}
                  </span>
                  <div className="flex justify-center">
                    {row.without ? (
                      <Check size={18} className="check-yes" />
                    ) : (
                      <X size={18} className="check-no" />
                    )}
                  </div>
                  <div className="flex justify-center">
                    {row.with ? (
                      <Check size={18} className="check-yes" />
                    ) : (
                      <X size={18} className="check-no" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <AnimatedButton onClick={scrollToContact} className="btn-primary">
                Start Your Free Consultation
                <ArrowRight size={16} />
              </AnimatedButton>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
