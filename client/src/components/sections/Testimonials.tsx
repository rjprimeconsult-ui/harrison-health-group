/*
 * HARRISON HEALTH GROUP — Testimonials Section
 * 3-card grid with stars, quote, name/location. Staggered fade-up.
 * Design: Midnight Gradient Luxury
 */

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion/AnimationWrappers";

const testimonials = [
  {
    stars: 5,
    quote:
      "Rafael helped me find a plan that saved my family $400/month. Highly recommend! The process was seamless and they truly had our best interest at heart.",
    name: "Maria G.",
    location: "Florida",
    coverage: "Family Health Plan",
  },
  {
    stars: 5,
    quote:
      "I was completely lost navigating the health insurance marketplace. Harrison Health Group made it simple and found me a plan with better coverage for less money.",
    name: "James T.",
    location: "Texas",
    coverage: "Individual Health Plan",
  },
  {
    stars: 5,
    quote:
      "As a small business owner, I needed group health benefits to attract good employees. They built us a package that was affordable and competitive. Excellent service.",
    name: "Sandra M.",
    location: "Georgia",
    coverage: "Small Business Group Plan",
  },
  {
    stars: 5,
    quote:
      "Shaquille walked me through every private plan option with patience and expertise. I felt confident in my decision and saved significantly on my monthly premium.",
    name: "David R.",
    location: "North Carolina",
    coverage: "Private PPO Plan",
  },
  {
    stars: 5,
    quote:
      "Being self-employed, I always dreaded open enrollment. Harrison Health Group turned it into a 30-minute call and I ended up with better coverage than before.",
    name: "Lisa P.",
    location: "South Carolina",
    coverage: "Self-Employed Plan",
  },
  {
    stars: 5,
    quote:
      "The team is incredibly knowledgeable and responsive. They answered every question and followed up to make sure I was happy with my coverage. Five stars.",
    name: "Carlos V.",
    location: "Illinois",
    coverage: "Individual & Dental Bundle",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} fill="#A855F7" style={{ color: "#A855F7" }} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-28 relative overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      {/* Ambient orbs */}
      <div
        className="ambient-orb"
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)",
          top: "-100px",
          left: "30%",
          animationDelay: "-25s",
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <FadeUp>
          <div className="text-center mb-16">
            <div className="section-label mb-4">Client Stories</div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                color: "#0A0A0A",
                lineHeight: 1.1,
                marginBottom: "1rem",
              }}
            >
              Real People,{" "}
              <span className="gold-text">
                Real Results
              </span>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(10,10,10,0.50)",
                fontSize: "1rem",
                maxWidth: 460,
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Thousands of clients trust us with their most important coverage decisions.
              Here's what they have to say.
            </p>
          </div>
        </FadeUp>

        {/* Testimonial Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <StaggerItem key={i}>
              <motion.div
                className="glass-card p-7 h-full flex flex-col relative overflow-hidden"
                whileHover={{ y: -5, boxShadow: "0 20px 60px rgba(168,85,247,0.12)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Quote icon */}
                <Quote
                  size={32}
                  style={{
                    color: "rgba(168,85,247,0.25)",
                    marginBottom: "1rem",
                  }}
                />

                {/* Stars */}
                <div className="mb-4">
                  <StarRating count={t.stars} />
                </div>

                {/* Quote text */}
                <p
                  className="flex-1"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.9rem",
                    color: "rgba(240,238,255,0.72)",
                    lineHeight: 1.75,
                    fontStyle: "italic",
                    marginBottom: "1.5rem",
                  }}
                >
                  "{t.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        color: "#0A0A0A",
                      }}
                    >
                      {t.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.78rem",
                        color: "rgba(10,10,10,0.38)",
                      }}
                    >
                      {t.location}
                    </div>
                  </div>
                  <span
                    className="px-2.5 py-1 rounded-full"
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.6rem",
                      letterSpacing: "0.08em",
                      background: "rgba(168,85,247,0.08)",
                      border: "1px solid rgba(168,85,247,0.18)",
                      color: "#A855F7",
                    }}
                  >
                    {t.coverage}
                  </span>
                </div>

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{
                    background: "linear-gradient(to right, #A855F7, transparent)",
                    opacity: 0.4,
                  }}
                />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
