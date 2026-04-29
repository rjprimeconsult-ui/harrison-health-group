/*
 * HARRISON HEALTH GROUP — Why Us Section
 * 3-column benefit cards with stagger animation and glass morphism.
 * Design: Charcoal & Gold Luxury
 */

import { motion } from "framer-motion";
import {
  Search, DollarSign, HeartHandshake, ShieldCheck, Clock, Globe,
} from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem, HoverCard } from "@/components/motion/AnimationWrappers";

const benefits = [
  {
    icon: Search,
    title: "We Shop Every Carrier",
    description:
      "We compare plans from 20+ top-rated carriers side by side, so you never overpay or miss a better option. One call, every option.",
  },
  {
    icon: DollarSign,
    title: "Zero Cost to You",
    description:
      "Our service is completely free. We're compensated by the carriers — never by you. You get expert guidance at no charge.",
  },
  {
    icon: HeartHandshake,
    title: "Personalized Guidance",
    description:
      "No call centers. No scripts. A dedicated licensed specialist who learns your situation and stays with you year after year.",
  },
  {
    icon: ShieldCheck,
    title: "Licensed & Independent",
    description:
      "We're not tied to any single carrier. Our only obligation is to you — finding the plan that truly fits your life and budget.",
  },
  {
    icon: Clock,
    title: "Fast Enrollment",
    description:
      "From first call to active coverage, we move quickly. Most clients are enrolled within 24–48 hours of their consultation.",
  },
  {
    icon: Globe,
    title: "31 States Served",
    description:
      "We serve clients across FL, TX, GA, NC, SC, IN, OH, MD, MI and 22 more states. Wherever you are, we have you covered.",
  },
];

interface WhyUsProps { onQuoteClick?: () => void; }

export default function WhyUs({ onQuoteClick }: WhyUsProps) {
  return (
    <section
      id="why-us"
      className="py-28 relative overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      {/* Ambient orb */}
      <div
        className="ambient-orb"
        style={{
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animationDelay: "-10s",
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <FadeUp>
          <div className="text-center mb-16">
            <div className="section-label mb-4">Why Harrison Health Group</div>
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
              The Difference Is{" "}
              <span className="gold-text">Personal</span>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(10,10,10,0.50)",
                fontSize: "1.05rem",
                maxWidth: 520,
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              We don't just sell insurance — we build long-term relationships
              grounded in trust, expertise, and genuine care for your wellbeing.
            </p>
          </div>
        </FadeUp>

        {/* Cards Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <StaggerItem key={benefit.title}>
              <HoverCard className="glass-card p-8 h-full">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: "rgba(201,168,76,0.10)",
                    border: "1px solid rgba(201,168,76,0.20)",
                  }}
                >
                  <benefit.icon size={22} style={{ color: "#C9A84C" }} />
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    fontSize: "1.35rem",
                    color: "#0A0A0A",
                    marginBottom: "0.75rem",
                    lineHeight: 1.2,
                  }}
                >
                  {benefit.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "rgba(10,10,10,0.50)",
                    fontSize: "0.92rem",
                    lineHeight: 1.7,
                  }}
                >
                  {benefit.description}
                </p>
                {/* Gold accent line */}
                <motion.div
                  className="mt-6"
                  style={{
                    height: 2,
                    background: "linear-gradient(to right, #C9A84C, transparent)",
                    borderRadius: 1,
                  }}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                />
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
