/*
 * HARRISON HEALTH GROUP — About Section
 * Owner: Shaquille Harrison | Address: 1550 Sawgrass Corporate Pkwy
 * Design: Charcoal & Gold Luxury
 */

import { motion } from "framer-motion";
import { ShieldCheck, Users, Award, MapPin, Phone, Mail } from "lucide-react";
import { FadeUp, SlideInLeft, SlideInRight } from "@/components/motion/AnimationWrappers";

const ABOUT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663441385223/aeUWcF9B5vWVriiiqFVf4u/hhg-about-bg-PTMYQWofTNBAP75qwr9U8h.webp";

const highlights = [
  { icon: ShieldCheck, label: "Licensed in 31+ States" },
  { icon: Users, label: "Family-Owned & Operated" },
  { icon: Award, label: "A+ Carrier Relationships" },
  { icon: MapPin, label: "1550 Sawgrass Corporate Pkwy" },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-28 relative overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      {/* Ambient orb */}
      <div
        className="ambient-orb"
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)",
          bottom: "-100px",
          left: "-100px",
          animationDelay: "-15s",
        }}
      />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Column */}
          <SlideInLeft>
            <div className="relative">
              {/* Main image */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  border: "1px solid rgba(201,168,76,0.18)",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.08)",
                }}
              >
                <img
                  src={ABOUT_IMG}
                  alt="Harrison Health Group consultation"
                  className="w-full object-cover"
                  style={{ height: 480 }}
                />
                {/* Warm gold color grade overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(160deg, rgba(201,168,76,0.15) 0%, rgba(248,247,255,0.08) 40%, rgba(248,247,255,0.25) 100%)",
                    mixBlendMode: "multiply",
                  }}
                />
                {/* Bottom fade */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(255,255,255,0.70) 0%, transparent 55%)",
                  }}
                />
              </div>

              {/* Floating stat card */}
              <motion.div
                className="absolute -bottom-6 -right-6 glass-card p-5"
                style={{ minWidth: 180 }}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, boxShadow: "0 20px 50px rgba(201,168,76,0.15)" }}
              >
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    fontSize: "2.5rem",
                    color: "#C9A84C",
                    lineHeight: 1,
                  }}
                >
                  20+
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.82rem",
                    color: "#0A0A0A",
                    marginTop: 4,
                  }}
                >
                  Top Carrier Partners
                </div>
              </motion.div>

              {/* Purple accent line — top-left corner decoration */}
              <div
                style={{
                  position: "absolute",
                  top: -2,
                  left: -2,
                  width: 48,
                  height: 48,
                  borderTop: "2px solid #C9A84C",
                  borderLeft: "2px solid #C9A84C",
                  borderTopLeftRadius: 12,
                  pointerEvents: "none",
                }}
              />
            </div>
          </SlideInLeft>

          {/* Content Column */}
          <SlideInRight>
            <div>
              <div className="section-label mb-4">Our Story</div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                  color: "#0A0A0A",
                  lineHeight: 1.1,
                  marginBottom: "1.5rem",
                }}
              >
                Built on Trust,{" "}
                <span className="gold-text">
                  Driven by Results
                </span>
              </h2>

              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#0A0A0A",
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  marginBottom: "2rem",
                }}
              >
                <p style={{ marginBottom: "1rem" }}>
                  Harrison Health Group was founded by Shaquille Harrison with a single
                  mission: make quality health insurance accessible, understandable, and
                  affordable for every family and business we serve.
                </p>
                <p style={{ marginBottom: "1rem" }}>
                  As an independent agency, we work exclusively for our clients — not the
                  carriers. That independence means we can shop 20+ top-rated carriers,
                  compare every option, and recommend the plan that genuinely fits your needs.
                </p>
                <p>
                  From individuals navigating the marketplace for the first time to small
                  business owners building benefits packages for their teams, we bring the
                  same level of dedication and expertise to every client relationship.
                </p>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4">
                {highlights.map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.45 }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: "rgba(201,168,76,0.08)",
                        border: "1px solid rgba(201,168,76,0.18)",
                      }}
                    >
                      <item.icon size={16} style={{ color: "#C9A84C" }} />
                    </div>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.85rem",
                        color: "#0A0A0A",
                        fontWeight: 500,
                      }}
                    >
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </SlideInRight>
        </div>
      </div>
    </section>
  );
}
