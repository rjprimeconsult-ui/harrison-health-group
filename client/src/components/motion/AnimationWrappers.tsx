/*
 * HARRISON HEALTH GROUP — Animation Wrappers
 * Framer Motion reusable components for scroll-triggered reveals and interactions
 */

import { motion, AnimatePresence, MotionProps } from "framer-motion";
import { ReactNode } from "react";

// FadeUp — scroll-triggered fade + translate-y reveal
export const FadeUp = ({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
  >
    {children}
  </motion.div>
);

// FadeIn — pure opacity reveal
export const FadeIn = ({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.7, ease: "easeOut", delay }}
  >
    {children}
  </motion.div>
);

// SlideInLeft — slide from left
export const SlideInLeft = ({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, x: -48 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
  >
    {children}
  </motion.div>
);

// SlideInRight — slide from right
export const SlideInRight = ({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, x: 48 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
  >
    {children}
  </motion.div>
);

// StaggerContainer + StaggerItem — orchestrated list animations
export const StaggerContainer = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-60px" }}
    variants={{
      hidden: {},
      visible: {
        transition: { staggerChildren: 0.08, delayChildren: 0.1 },
      },
    }}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <motion.div
    className={className}
    variants={{
      hidden: { opacity: 0, y: 28 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
      },
    }}
  >
    {children}
  </motion.div>
);

// AnimatedButton — spring hover/tap
export const AnimatedButton = ({
  children,
  onClick,
  className = "",
  disabled = false,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
}) => (
  <motion.button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={className}
    whileHover={disabled ? {} : { scale: 1.03 }}
    whileTap={disabled ? {} : { scale: 0.97 }}
    transition={{ type: "spring", stiffness: 420, damping: 22 }}
  >
    {children}
  </motion.button>
);

// HoverCard — lift + purple glow on hover
export const HoverCard = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <motion.div
    className={className}
    whileHover={{
      y: -6,
      boxShadow: "0 20px 60px rgba(201, 168, 76, 0.25)",
    }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    {children}
  </motion.div>
);

// WordReveal — word-by-word stagger headline reveal
export const WordReveal = ({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
}) => {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={`inline-block mr-[0.25em] ${wordClassName}`}
          variants={{
            hidden: { opacity: 0, y: 24, rotateX: -20 },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};
