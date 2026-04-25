/*
 * HARRISON HEALTH GROUP — Navbar
 * Real HH monogram logo, gold accent, charcoal glass on scroll.
 * Real phone: (954) 600-0342
 */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { AnimatedButton } from "@/components/motion/AnimationWrappers";

const LOGO_URL = "/manus-storage/hhg-logo_8b865777.jpg";

const navLinks = [
  { label: "Coverage", href: "#coverage" },
  { label: "Why Us", href: "#why-us" },
  { label: "Our Team", href: "#team" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps { onQuoteClick?: () => void; }

export default function Navbar({ onQuoteClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(10, 10, 10, 0.95)"
            : "rgba(10, 10, 10, 0.55)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: scrolled ? "1px solid rgba(201, 168, 76, 0.18)" : "1px solid transparent",
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center gap-4 no-underline"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {/* Monogram mark — two stacked letters in gold, no white box */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 42,
                  height: 42,
                  flexShrink: 0,
                  background: "rgba(201,168,76,0.08)",
                  border: "1px solid rgba(201,168,76,0.30)",
                  borderRadius: 6,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    fontSize: "1.35rem",
                    color: "#C9A84C",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  HH
                </span>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: "#F8F5F0",
                    lineHeight: 1.1,
                    letterSpacing: "0.02em",
                  }}
                >
                  Harrison Health
                </div>
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.52rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "#C9A84C",
                    lineHeight: 1,
                  }}
                >
                  Group
                </div>
              </div>
            </motion.a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium transition-colors duration-200 bg-transparent border-none"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(248,245,240,0.70)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A84C")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(248,245,240,0.70)")}
                  whileHover={{ y: -1 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <motion.a
                href="tel:+19546000342"
                className="flex items-center gap-2 text-sm font-medium transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(248,245,240,0.65)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A84C")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(248,245,240,0.65)")}
              >
                <Phone size={14} style={{ color: "#C9A84C" }} />
                (954) 600-0342
              </motion.a>
              <AnimatedButton
                onClick={() => onQuoteClick ? onQuoteClick() : handleNavClick("#contact")}
                className="btn-primary text-sm"
              >
                Get Free Quote
              </AnimatedButton>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-white/80 hover:text-white p-2 bg-transparent border-none"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        className="fixed inset-0 z-40 lg:hidden"
        initial={false}
        animate={mobileOpen ? { opacity: 1, pointerEvents: "auto" } : { opacity: 0, pointerEvents: "none" }}
        transition={{ duration: 0.25 }}
          style={{ background: "rgba(10, 10, 10, 0.98)", backdropFilter: "blur(20px)" }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <motion.button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-2xl font-medium text-white/80 hover:text-white transition-colors bg-transparent border-none"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={mobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: i * 0.07 }}
            >
              {link.label}
            </motion.button>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center gap-4 mt-4"
          >
            <a
              href="tel:+19546000342"
              className="flex items-center gap-2 transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(248,245,240,0.70)" }}
            >
              <Phone size={16} style={{ color: "#C9A84C" }} />
              (954) 600-0342
            </a>
            <button
              onClick={() => onQuoteClick ? onQuoteClick() : handleNavClick("#contact")}
              className="btn-primary"
            >
              Get Free Quote
            </button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
