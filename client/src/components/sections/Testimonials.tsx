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
      "I had no idea how to navigate health insurance after leaving my corporate job. Harrison Health Group made it completely stress-free. They found me a plan that was $200 less per month than what I was looking at on my own.",
    name: "Sarah M.",
    location: "Austin, TX",
    coverage: "Individual Plan",
  },
  {
    stars: 5,
    quote:
      "As a small business owner, I needed group health benefits to attract good employees. The team at Harrison Health Group set everything up quickly and professionally. My staff is thrilled with the coverage.",
    name: "James R.",
    location: "Miami, FL",
    coverage: "Group Benefits",
  },
  {
    stars: 5,
    quote:
      "Turning 65 was overwhelming with all the Medicare options. My advisor walked me through everything patiently and helped me pick the perfect Medicare Supplement plan. I feel completely taken care of.",
    name: "Dorothy K.",
    location: "Phoenix, AZ",
    coverage: "Medicare Supplement",
  },
  {
    stars: 5,
    quote:
      "I'm a freelance designer and always struggled with health insurance costs. Harrison Health Group found me an ACA plan with a subsidy I didn't even know I qualified for. Saved me thousands.",
    name: "Marcus T.",
    location: "Denver, CO",
    coverage: "Self-Employed Plan",
  },
  {
    stars: 5,
    quote:
      "The whole process took less than an hour. I answered a few questions, they compared everything for me, and I was enrolled the same day. Incredible service — I've already referred three friends.",
    name: "Priya S.",
    location: "Chicago, IL",
    coverage: "Family Coverage",
  },
  {
    stars: 5,
    quote:
      "What sets Harrison Health Group apart is that they actually follow up. When my plan changed at renewal, they called me proactively and found a better option. That kind of service is rare.",
    name: "Robert L.",
    location: "Atlanta, GA",
    coverage: "Individual Plan",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} fill="#A78BFA" style={{ color: "#A78BFA" }} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
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
                color: "#ffffff",
                lineHeight: 1.1,
                marginBottom: "1rem",
              }}
            >
              Real People,{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #A78BFA, #8B5CF6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Real Results
              </span>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(255,255,255,0.55)",
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
                whileHover={{ y: -5, boxShadow: "0 20px 60px rgba(139,92,246,0.18)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Quote icon */}
                <Quote
                  size={32}
                  style={{
                    color: "rgba(139,92,246,0.25)",
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
                    color: "rgba(255,255,255,0.72)",
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
                        color: "#ffffff",
                      }}
                    >
                      {t.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.78rem",
                        color: "rgba(255,255,255,0.40)",
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
                      background: "rgba(139,92,246,0.12)",
                      border: "1px solid rgba(139,92,246,0.22)",
                      color: "#A78BFA",
                    }}
                  >
                    {t.coverage}
                  </span>
                </div>

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{
                    background: "linear-gradient(to right, #8B5CF6, transparent)",
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
