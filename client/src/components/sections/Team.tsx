/**
 * HARRISON HEALTH GROUP — Team Section
 * Design: White/Black/Gold — black card info panel with gold typography
 * Order: Shaquille, Chevaur, Raquel, Walter, Matthew, Raziya
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, ChevronRight, Camera } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion/AnimationWrappers";

interface TeamMember {
  id: number;
  name: string;
  title: string;
  npn?: string;
  bio: string;
  specialties: string[];
  phone: string;
  photoReady: boolean;
  photoUrl?: string;
  photoBg?: string; // custom bg color per photo
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Shaquille Harrison",
    title: "Senior Health Advisor & Founder",
    npn: "20611469",
    bio: "Shaquille founded Harrison Health Group with a mission to make quality health insurance accessible and affordable for every family and business. His expertise spans individual, family, and group health plans across 31 states.",
    specialties: ["Individual & Family", "Group Benefits", "Supplemental Coverage"],
    phone: "+19546000342",
    photoReady: true,
    photoUrl: "/manus-storage/shaquille_new_bbc2b30c.webp",
    photoBg: "#2A2A2A",
  },
  {
    id: 2,
    name: "Chevaur Harrison",
    title: "Licensed Health Advisor",
    bio: "Chevaur brings a client-first approach to every consultation, helping families navigate the complex world of health insurance with clarity and confidence. Dedicated to finding the right plan at the right price for every client.",
    specialties: ["Individual Plans", "Family Coverage", "Private Health Plans"],
    phone: "+19546000342",
    photoReady: true,
    photoUrl: "/manus-storage/chevaur_new_386101c9.webp",
    photoBg: "#2A2A2A",
  },
  {
    id: 3,
    name: "Raquel Gray",
    title: "Licensed Health Advisor",
    bio: "Raquel is passionate about helping individuals and families find the right coverage that fits their lifestyle and budget. She specializes in guiding clients through marketplace options and private plans with patience and expertise.",
    specialties: ["Marketplace Plans", "Individual Coverage", "Family Health Plans"],
    phone: "+19546000342",
    photoReady: true,
    photoUrl: "/manus-storage/raquel_1b64a632.webp",
    photoBg: "#111111",
  },
  {
    id: 4,
    name: "Walter Joseph",
    title: "Licensed Advisor",
    bio: "Walter is dedicated to helping individuals and families find the right private health coverage. From comprehensive PPO options to supplemental plans, he ensures every client gets the protection they need at a price they can afford.",
    specialties: ["Private Health Plans", "Supplemental Coverage", "Dental & Vision"],
    phone: "+19546000342",
    photoReady: true,
    photoUrl: "/manus-storage/walter_new_f4f47bad.webp",
    photoBg: "#2A2A2A",
  },
  {
    id: 5,
    name: "Matthew Grossman",
    title: "Licensed Health Advisor",
    bio: "Matthew brings deep knowledge of group and individual health plans to every client interaction. He is committed to finding cost-effective solutions for small businesses and individuals navigating their coverage options.",
    specialties: ["Group Health", "Individual Plans", "Small Business Benefits"],
    phone: "+19546000342",
    photoReady: true,
    photoUrl: "/manus-storage/matthew_34bb264f.webp",
    photoBg: "#2A2A2A",
  },
  {
    id: 6,
    name: "Raziya Beersingh",
    title: "Senior Health Advisor",
    bio: "Raziya is committed to helping individuals and families navigate their health insurance options with confidence. She brings warmth, expertise, and a personalized approach to every client interaction, ensuring each person finds the coverage that truly fits their needs.",
    specialties: ["Individual Plans", "Family Coverage", "Marketplace Options"],
    phone: "+19546000342",
    photoReady: true,
    photoUrl: "/manus-storage/raziya_grey_bg_v2_9734ffdf.jpg",
    photoBg: "#2D2D2D",
  },
];

function FlipCard({ member }: { member: TeamMember }) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="flip-card-wrapper cursor-pointer"
      style={{
        perspective: "1400px",
        height: 520,
        position: "relative",
        zIndex: hovered ? 10 : 1,
      }}
      animate={{
        y: hovered ? -10 : 0,
        scale: hovered ? 1.025 : 1,
      }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      onClick={() => setFlipped((f) => !f)}
      onMouseEnter={() => { setFlipped(true); setHovered(true); }}
      onMouseLeave={() => { setFlipped(false); setHovered(false); }}
    >
      {/* Outer glow ring */}
      <motion.div
        style={{
          position: "absolute",
          inset: -1,
          borderRadius: "1rem",
          pointerEvents: "none",
          zIndex: 20,
        }}
        animate={{
          boxShadow: hovered
            ? "0 0 0 2px #C9A84C, 0 20px 48px rgba(0,0,0,0.18), 0 6px 20px rgba(201,168,76,0.22)"
            : "0 0 0 1.5px rgba(201,168,76,0.25), 0 4px 20px rgba(0,0,0,0.08)",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />

      <motion.div
        className="flip-card-inner"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 28 }}
        style={{
          transformStyle: "preserve-3d",
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {/* ── FRONT ── */}
        <div
          className="flip-card-front rounded-2xl overflow-hidden"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            background: "#0A0A0A",
            border: "1px solid rgba(201,168,76,0.20)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Photo area — centered */}
          <div
            style={{
              height: 340,
              background: member.photoBg ?? "#2A2A2A",
              overflow: "hidden",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {member.photoReady ? (
              <motion.img
                src={member.photoUrl ?? ""}
                alt={member.name}
                animate={{ scale: hovered ? 1.06 : 1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                }}
              />
            ) : (
              <div
                className="flex flex-col items-center justify-center w-full h-full"
                style={{ background: "#1A1A1A" }}
              >
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(201,168,76,0.10)",
                    border: "1px solid rgba(201,168,76,0.25)",
                  }}
                >
                  <Camera size={11} style={{ color: "#C9A84C" }} />
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.6rem",
                      letterSpacing: "0.12em",
                      color: "rgba(201,168,76,0.80)",
                      textTransform: "uppercase",
                    }}
                  >
                    Photo Coming Soon
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Info section — solid black with gold text */}
          <div
            style={{
              flex: 1,
              background: "#0A0A0A",
              padding: "18px 20px 16px",
              borderTop: "1px solid rgba(201,168,76,0.18)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: "1.25rem",
                color: "#FFFFFF",
                marginBottom: "0.2rem",
                lineHeight: 1.2,
              }}
            >
              {member.name}
            </h3>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.80rem",
                color: "#C9A84C",
                fontWeight: 500,
                marginBottom: "0.75rem",
              }}
            >
              {member.title}
            </p>

            {/* Hover hint */}
            <div className="flex items-center gap-1.5">
              <motion.span
                animate={{ opacity: hovered ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.60rem",
                  letterSpacing: "0.12em",
                  color: "rgba(201,168,76,0.55)",
                  textTransform: "uppercase",
                }}
              >
                Hover to learn more
              </motion.span>
              <motion.div
                animate={{ x: hovered ? 4 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20, repeat: Infinity, repeatType: "reverse" }}
              >
                <ChevronRight size={11} style={{ color: "rgba(201,168,76,0.50)" }} />
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="flip-card-back rounded-2xl flex flex-col"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            background: "#0A0A0A",
            border: "1px solid rgba(201,168,76,0.30)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            padding: "20px 22px 20px",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {/* Shimmer accent line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "8%",
              right: "8%",
              height: 1,
              background: "linear-gradient(to right, transparent, rgba(201,168,76,0.70), transparent)",
              borderRadius: 1,
            }}
          />

          {/* Name on back */}
          <div style={{ marginBottom: "8px" }}>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: "1.25rem",
                color: "#FFFFFF",
                marginBottom: "2px",
                lineHeight: 1.2,
              }}
            >
              {member.name}
            </h3>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.73rem",
                color: "#C9A84C",
                fontWeight: 500,
                lineHeight: 1.3,
              }}
            >
              {member.title}
            </p>
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background: "linear-gradient(to right, rgba(201,168,76,0.45), transparent)",
              marginBottom: "10px",
              flexShrink: 0,
            }}
          />

          {/* Bio */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.78rem",
              color: "rgba(255,255,255,0.88)",
              lineHeight: 1.6,
              marginBottom: "12px",
              flexShrink: 0,
            }}
          >
            {member.bio}
          </p>

          {/* Specialties */}
          <div style={{ marginBottom: "12px", flexShrink: 0 }}>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.55rem",
                letterSpacing: "0.12em",
                color: "rgba(201,168,76,0.60)",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}
            >
              Specialties
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
              {member.specialties.map((s) => (
                <span
                  key={s}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: "rgba(201,168,76,0.10)",
                    border: "1px solid rgba(201,168,76,0.30)",
                    color: "#C9A84C",
                    fontSize: "0.65rem",
                    padding: "3px 9px",
                    borderRadius: "999px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.a
            href={`tel:${member.phone}`}
            className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              background: "linear-gradient(135deg, #E2C97E, #C9A84C, #A8852D)",
              color: "#0A0A0A",
              textDecoration: "none",
            }}
            whileHover={{ scale: 1.03, boxShadow: "0 8px 24px rgba(201,168,76,0.35)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 420, damping: 22 }}
          >
            <Phone size={15} />
            Book a Consultation
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Team() {
  return (
    <section
      id="team"
      className="py-28 relative overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      <div className="container relative z-10">
        {/* Header */}
        <FadeUp>
          <div className="text-center mb-16">
            <div className="section-label mb-4">Our Team</div>
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
              Meet Your{" "}
              <span className="gold-text">Dedicated Advisors</span>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "#0A0A0A",
                fontSize: "1rem",
                maxWidth: 480,
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Licensed professionals dedicated to finding the right plan for your
              unique situation. Hover any card to learn more.
            </p>
          </div>
        </FadeUp>

        {/* Flip Cards Grid — 6 agents, 3 on top row, 3 on bottom row */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {teamMembers.slice(0, 3).map((member) => (
            <StaggerItem key={member.id}>
              <FlipCard member={member} />
            </StaggerItem>
          ))}
        </StaggerContainer>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.slice(3).map((member) => (
            <StaggerItem key={member.id}>
              <FlipCard member={member} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
