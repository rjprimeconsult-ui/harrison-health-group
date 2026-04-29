/*
 * HARRISON HEALTH GROUP — Stats Section
 * Animated count-up numbers with parallax background.
 * Design: Midnight Gradient Luxury
 */

import { useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { FadeUp } from "@/components/motion/AnimationWrappers";

const STATS_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663441385223/aeUWcF9B5vWVriiiqFVf4u/hhg-stats-bg-8c9TuxPafzsWhAFkR5Gx7o.webp";

function CountUp({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 55, damping: 18 });

  useEffect(() => {
    if (isInView) motionVal.set(target);
  }, [isInView, target, motionVal]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = prefix + Math.round(v).toLocaleString() + suffix;
      }
    });
  }, [spring, suffix, prefix]);

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}

const stats = [
  { target: 20, suffix: "+", label: "Carrier Partners", description: "Top-rated national and regional insurers" },
  { target: 31, suffix: "", prefix: "", label: "States Served", description: "Licensed to help clients nationwide" },
  { target: 93, suffix: "%", prefix: "", label: "Client Satisfaction", description: "Based on post-enrollment surveys" },
  { target: 24, suffix: "hrs", label: "Avg. Enrollment", description: "From first call to active coverage" },
];

export default function Stats() {
  return (
    <section
      className="relative py-28 overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={STATS_BG}
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.20 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, #FFFFFF 0%, rgba(10,10,10,0.7) 50%, #FFFFFF 100%)",
          }}
        />
      </div>

      <div className="container relative z-10">
        <FadeUp>
          <div className="text-center mb-16">
            <div className="section-label mb-4">By the Numbers</div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                  color: "#0A0A0A",
                  lineHeight: 1.1,
                }}
              >
                Results That{" "}
                <span className="gold-text">
                  Speak for Themselves
                </span>
            </h2>
          </div>
        </FadeUp>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Number */}
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: "clamp(3rem, 6vw, 4.5rem)",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                  background: "linear-gradient(135deg, #E2C97E, #C9A84C, #A8852D)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                <CountUp target={stat.target} suffix={stat.suffix} prefix={stat.prefix} />
              </div>

              {/* Label */}
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: "#0A0A0A",
                  marginBottom: "0.4rem",
                }}
              >
                {stat.label}
              </div>

              {/* Description */}
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8rem",
                  color: "#0A0A0A",
                  lineHeight: 1.5,
                }}
              >
                {stat.description}
              </div>

              {/* Divider */}
              <motion.div
                className="mx-auto mt-5"
                style={{
                  width: 40,
                  height: 2,
                  background: "linear-gradient(to right, transparent, #C9A84C, transparent)",
                  borderRadius: 1,
                }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
