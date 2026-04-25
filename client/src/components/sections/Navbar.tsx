/*
 * HARRISON HEALTH GROUP — Navbar
 * Transparent on load, dark glass on scroll. Logo + nav links + CTA.
 * Design: Midnight Gradient Luxury — purple accent, glass morphism
 */

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, Phone, Shield } from "lucide-react";
import { AnimatedButton } from "@/components/motion/AnimationWrappers";

const navLinks = [
  { label: "Coverage", href: "#coverage" },
  { label: "Why Us", href: "#why-us" },
  { label: "Our Team", href: "#team" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
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
            ? "rgba(8, 8, 14, 0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(139, 92, 246, 0.15)" : "none",
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
              className="flex items-center gap-3 no-underline"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #8B5CF6, #6D28D9)",
                  boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)",
                }}
              >
                <Shield size={20} color="#fff" />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    fontSize: "1.2rem",
                    color: "#ffffff",
                    lineHeight: 1.1,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Harrison Health
                </div>
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#A78BFA",
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
                  className="text-sm font-medium text-white/75 hover:text-white transition-colors duration-200 bg-transparent border-none"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
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
                href="tel:+18005551234"
                className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Phone size={14} />
                (800) 555-1234
              </motion.a>
              <AnimatedButton
                onClick={() => handleNavClick("#contact")}
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
        style={{ background: "rgba(8, 8, 14, 0.97)", backdropFilter: "blur(20px)" }}
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
              href="tel:+18005551234"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <Phone size={16} />
              (800) 555-1234
            </a>
            <button
              onClick={() => handleNavClick("#contact")}
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
