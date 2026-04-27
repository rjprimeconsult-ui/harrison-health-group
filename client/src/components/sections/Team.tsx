/*
 * HARRISON HEALTH GROUP — Team Section
 * 3D flip cards with blank photo placeholders (headshots pending).
 * Front: placeholder + name + title. Back: bio + specialties + Book a Call CTA.
 * Design: Midnight Gradient Luxury
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, ChevronRight, Camera, Award } from "lucide-react";
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
    photoUrl: "/manus-storage/shaquille_processed_7c0a1ce6.png",
  },
  {
    id: 2,
    name: "Chevaur Harrison",
    title: "Licensed Health Advisor",
    bio: "Chevaur brings a client-first approach to every consultation, helping families navigate the complex world of health insurance with clarity and confidence. Dedicated to finding the right plan at the right price for every client.",
    specialties: ["Individual Plans", "Family Coverage", "Private Health Plans"],
    phone: "+19546000342",
    photoReady: true,
    photoUrl: "/manus-storage/chevaur_processed_4c228628.png",
  },
  {
    id: 3,
    name: "Walter Joseph",
    title: "Licensed Advisor",
    bio: "Walter is dedicated to helping individuals and families find the right private health coverage. From comprehensive PPO options to supplemental plans, he ensures every client gets the protection they need at a price they can afford.",
    specialties: ["Private Health Plans", "Supplemental Coverage", "Dental & Vision"],
    phone: "+19546000342",
    photoReady: true,
    photoUrl: "/manus-storage/walter_processed_010e9ec2.png",
  },
  {
    id: 4,
    name: "Team Member",
    title: "Group Benefits Consultant",
    bio: "Dedicated to helping small and mid-size businesses build competitive employee benefits packages. From 2-person startups to 500-employee companies, we design plans that attract talent and control costs.",
    specialties: ["Group Health", "Employer Benefits", "Small Business"],
    phone: "+19546000342",
    photoReady: false,
  },
];

function FlipCard({ member, index: _index }: { member: TeamMember; index?: number }) {
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
      {/* Outer glow ring — animates on hover */}
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
            ? "0 0 0 1.5px rgba(201,168,76,0.65), 0 20px 56px rgba(201,168,76,0.20), 0 6px 20px rgba(0,0,0,0.60)"
            : "0 0 0 1px rgba(201,168,76,0.10), 0 4px 16px rgba(0,0,0,0.28)",
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
        {/* FRONT */}
        <div
          className="flip-card-front rounded-2xl overflow-hidden"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            background: "rgba(28,28,28,0.90)",
            border: "1px solid rgba(201,168,76,0.15)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {/* Photo area */}
          <div
            className="relative flex items-center justify-center"
            style={{
              height: 280,
              background: "linear-gradient(135deg, #1C1C1C 0%, #2A2A2A 100%)",
              overflow: "hidden",
            }}
          >
            {member.photoReady ? (
              <motion.img
                src={member.photoUrl ?? ""}
                alt={member.name}
                animate={{ scale: hovered ? 1.07 : 1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                }}
              />
            ) : (
              <>
                {/* Silhouette placeholder — no image needed */}
                {/* "Photo Coming Soon" overlay */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-end pb-5"
                  style={{
                    background: "linear-gradient(to top, rgba(8,8,14,0.85) 0%, transparent 60%)",
                  }}
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
              </>
            )}

            {/* Purple glow at bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 h-16"
              style={{
                background: "linear-gradient(to top, rgba(28,28,28,0.80), transparent)",
              }}
            />
          </div>

          {/* Info */}
          <div className="p-6">
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: "1.3rem",
                color: "#F8F5F0",
                marginBottom: "0.25rem",
                lineHeight: 1.2,
              }}
            >
              {member.name}
            </h3>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.82rem",
                color: "#C9A84C",
                fontWeight: 500,
                marginBottom: "1rem",
              }}
            >
              {member.title}
            </p>

            {/* Hover hint */}
            <div className="flex items-center gap-1.5">
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.62rem",
                  letterSpacing: "0.12em",
                  color: "rgba(201,168,76,0.45)",
                  textTransform: "uppercase",
                }}
              >
                Hover to learn more
              </span>
              <ChevronRight size={11} style={{ color: "rgba(201,168,76,0.40)" }} />
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className="flip-card-back rounded-2xl flex flex-col"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(145deg, #1E1E1E 0%, #252520 60%, #1A1A15 100%)",
            border: "1px solid rgba(201,168,76,0.25)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            padding: "20px 22px 20px",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {/* Shimmer accent line at top of back face */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "8%",
              right: "8%",
              height: 1,
              background: "linear-gradient(to right, transparent, rgba(201,168,76,0.60), transparent)",
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
                color: "#F8F5F0",
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
              background: "linear-gradient(to right, rgba(201,168,76,0.35), transparent)",
              marginBottom: "10px",
              flexShrink: 0,
            }}
          />

          {/* Bio — full text, no clamp */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.78rem",
              color: "rgba(248,245,240,0.72)",
              lineHeight: 1.6,
              marginBottom: "12px",
              flexShrink: 0,
            }}
          >
            {member.bio}
          </p>

          {/* Specialties — compact inline row */}
          <div style={{ marginBottom: "12px", flexShrink: 0 }}>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.55rem",
                letterSpacing: "0.12em",
                color: "rgba(201,168,76,0.45)",
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
                    background: "rgba(201,168,76,0.08)",
                    border: "1px solid rgba(201,168,76,0.22)",
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
            className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              background: "linear-gradient(135deg, #E2C97E, #C9A84C, #A8852D)",
              color: "#0A0A0A",
              textDecoration: "none",
            }}
            whileHover={{ scale: 1.03, boxShadow: "0 8px 24px rgba(201,168,76,0.30)" }}
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
      style={{ background: "#111111" }}
    >
      {/* Ambient orbs */}
      <div
        className="ambient-orb"
        style={{
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
          top: "20%",
          right: "-200px",
          animationDelay: "-8s",
        }}
      />

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
                color: "#F8F5F0",
                lineHeight: 1.1,
                marginBottom: "1rem",
              }}
            >
              Meet Your{" "}
              <span className="gold-text">
                Dedicated Advisors
              </span>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(248,245,240,0.55)",
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

        {/* Flip Cards Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <StaggerItem key={member.id}>
              <FlipCard member={member} index={member.id} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
