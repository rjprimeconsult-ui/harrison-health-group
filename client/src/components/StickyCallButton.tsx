/*
 * HARRISON HEALTH GROUP — Sticky Call Button
 * Floating green phone button after 400px scroll. Pulsing ring animation.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";

export default function StickyCallButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="tel:+19546000342"
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ type: "spring", stiffness: 420, damping: 22 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full text-white font-bold shadow-2xl no-underline"
          style={{
            background: "linear-gradient(135deg, #22C55E, #16A34A)",
            minHeight: 52,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.9rem",
          }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Pulse ring */}
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ border: "2px solid rgba(34,197,94,0.5)" }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <Phone size={18} />
          <span className="hidden sm:inline">(954) 600-0342</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
