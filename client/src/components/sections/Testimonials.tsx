/*
 * HARRISON HEALTH GROUP — Testimonials Section
 * Shows approved reviews from ReviewContext.
 * Includes Google Reviews badge/link.
 * Design: White background with gold accents.
 */

import { motion } from "framer-motion";
import { Star, Quote, ExternalLink } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion/AnimationWrappers";
import { useReviews } from "@/contexts/ReviewContext";

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} fill="#C9A84C" style={{ color: "#C9A84C" }} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { approvedReviews } = useReviews();

  // Show up to 6 most recent approved reviews
  const displayReviews = approvedReviews.slice(0, 6);

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
          background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)",
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
                color: "#0A0A0A",
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
          {displayReviews.map((t) => (
            <StaggerItem key={t.id}>
              <motion.div
                className="glass-card p-7 h-full flex flex-col relative overflow-hidden"
                whileHover={{ y: -5, boxShadow: "0 20px 60px rgba(201,168,76,0.12)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Quote icon */}
                <Quote
                  size={32}
                  style={{
                    color: "#0A0A0A",
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
                    color: "#0A0A0A",
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
                        color: "#333333",
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
                      background: "rgba(201,168,76,0.10)",
                      border: "1px solid #C9A84C",
                      color: "#0A0A0A",
                    }}
                  >
                    {t.coverage}
                  </span>
                </div>

                {/* Google badge for google-sourced reviews */}
                {t.source === "google" && (
                  <div
                    className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(66,133,244,0.1)", border: "1px solid rgba(66,133,244,0.2)" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span style={{ fontSize: "0.6rem", color: "#4285F4", fontWeight: 500 }}>Google</span>
                  </div>
                )}

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{
                    background: "linear-gradient(to right, #C9A84C, transparent)",
                    opacity: 0.8,
                  }}
                />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Google Reviews CTA */}
        <FadeUp>
          <div className="mt-12 text-center">
            <a
              href="https://share.google/bSs51zOJBQF8q6ygR"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all hover:scale-105"
              style={{
                background: "#0A0A0A",
                color: "#fff",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 600,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Leave Us a Google Review
              <ExternalLink size={14} />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
