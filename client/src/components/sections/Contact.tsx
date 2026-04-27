/*
 * HARRISON HEALTH GROUP — Contact / CTA Section
 * Full-width dark section. No web form yet — phone + email CTAs only.
 * Design: Midnight Gradient Luxury
 */

import { motion } from "framer-motion";
import { Phone, Mail, Clock, MapPin, ArrowRight, Shield } from "lucide-react";
import { FadeUp, AnimatedButton } from "@/components/motion/AnimationWrappers";

const contactMethods = [
  {
    icon: Phone,
    label: "Call Us Directly",
    value: "(954) 600-0342",
    sub: "Mon–Fri, 8am–7pm EST",
    href: "tel:+19546000342",
  },
  {
    icon: Mail,
    label: "Send an Email",
    value: "info@harrisonhealthgroup.com",
    sub: "We respond within 2 hours",
    href: "mailto:info@harrisonhealthgroup.com",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Mon–Fri: 8am–7pm",
    sub: "Sat: 9am–3pm EST",
    href: null,
  },
  {
    icon: MapPin,
    label: "Serving",
    value: "31 States & Growing",
    sub: "Licensed across the US",
    href: null,
  },
];

interface ContactProps { onQuoteClick?: () => void; }

export default function Contact({ onQuoteClick }: ContactProps) {
  return (
    <section
      id="contact"
      className="py-28 relative overflow-hidden"
      style={{ background: "#08080E" }}
    >
      {/* Ambient orbs */}
      <div
        className="ambient-orb"
        style={{
          width: 700,
          height: 700,
          background: "radial-gradient(circle, rgba(109,40,217,0.18) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animationDelay: "-12s",
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <FadeUp>
          <div className="text-center mb-16">
            <div className="section-label mb-4">Get in Touch</div>
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
              Your Coverage Journey{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #A78BFA, #8B5CF6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Starts Here
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
              Ready to find the right plan? Reach out today for a free,
              no-obligation consultation with a licensed specialist.
            </p>
          </div>
        </FadeUp>

        {/* Main CTA Card */}
        <FadeUp delay={0.15}>
          <div
            className="max-w-4xl mx-auto rounded-2xl p-10 md:p-14 mb-12 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(109,40,217,0.08))",
              border: "1px solid rgba(139,92,246,0.25)",
            }}
          >
            {/* Decorative corner */}
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-bl-full"
              style={{
                background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
              }}
            />

            <div className="relative z-10 text-center">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{
                  background: "linear-gradient(135deg, #8B5CF6, #6D28D9)",
                  boxShadow: "0 0 32px rgba(139,92,246,0.40)",
                }}
              >
                <Shield size={28} color="#fff" />
              </div>

              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  color: "#ffffff",
                  marginBottom: "1rem",
                  lineHeight: 1.1,
                }}
              >
                Get Your Free Quote Today
              </h3>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "rgba(255,255,255,0.60)",
                  fontSize: "1rem",
                  maxWidth: 420,
                  margin: "0 auto 2rem",
                  lineHeight: 1.7,
                }}
              >
                No pressure. No hidden fees. Just expert guidance to find the
                coverage that's right for you.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <AnimatedButton
                  onClick={() => onQuoteClick ? onQuoteClick() : (window.location.href = "tel:+19546000342")}
                  className="btn-primary text-base px-8 py-4"
                >
                  <Phone size={18} />
                  Call (954) 600-0342
                </AnimatedButton>
                <motion.a
                  href="mailto:info@harrisonhealthgroup.com"
                  className="flex items-center gap-2 px-8 py-4 rounded-lg text-base font-semibold text-white transition-all duration-300"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: "rgba(139,92,246,0.08)",
                    border: "1px solid rgba(139,92,246,0.25)",
                    textDecoration: "none",
                  }}
                  whileHover={{
                    background: "rgba(139,92,246,0.15)",
                    borderColor: "rgba(139,92,246,0.5)",
                    scale: 1.02,
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                >
                  <Mail size={18} />
                  Send an Email
                  <ArrowRight size={16} />
                </motion.a>
              </div>

              {/* Form coming soon notice */}
              <motion.div
                className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full"
                style={{
                  background: "rgba(139,92,246,0.06)",
                  border: "1px solid rgba(139,92,246,0.15)",
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.62rem",
                    letterSpacing: "0.12em",
                    color: "rgba(167,139,250,0.65)",
                    textTransform: "uppercase",
                  }}
                >
                  Online quote form coming soon
                </span>
              </motion.div>
            </div>
          </div>
        </FadeUp>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
          {contactMethods.map((method, i) => (
            <motion.div
              key={method.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
            >
              {method.href ? (
                <motion.a
                  href={method.href}
                  className="glass-card p-5 flex flex-col gap-3 no-underline block"
                  whileHover={{ y: -8, boxShadow: "0 20px 48px rgba(109,40,217,0.45), 0 0 0 1px rgba(139,92,246,0.30)" }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      background: "rgba(201,168,76,0.10)",
                      border: "1px solid rgba(201,168,76,0.20)",
                    }}
                  >
                    <method.icon size={18} style={{ color: "#C9A84C" }} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.6rem",
                        letterSpacing: "0.12em",
                        color: "rgba(201,168,76,0.50)",
                        textTransform: "uppercase",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {method.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        color: "#ffffff",
                        marginBottom: "0.2rem",
                        wordBreak: "break-word",
                      }}
                    >
                      {method.value}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.75rem",
                        color: "rgba(255,255,255,0.40)",
                      }}
                    >
                      {method.sub}
                    </div>
                  </div>
                </motion.a>
              ) : (
                <motion.div
                  className="glass-card p-5 flex flex-col gap-3"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      background: "rgba(201,168,76,0.10)",
                      border: "1px solid rgba(201,168,76,0.20)",
                    }}
                  >
                    <method.icon size={18} style={{ color: "#C9A84C" }} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.6rem",
                        letterSpacing: "0.12em",
                        color: "rgba(201,168,76,0.50)",
                        textTransform: "uppercase",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {method.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                      color: "#F8F5F0",
                      marginBottom: "0.2rem",
                    }}
                  >
                    {method.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.75rem",
                      color: "rgba(248,245,240,0.40)",
                      }}
                    >
                      {method.sub}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
