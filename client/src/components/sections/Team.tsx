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
    title: "Founder & Licensed Health Insurance Specialist",
    npn: "20611469",
    bio: "Shaquille founded Harrison Health Group with a mission to make quality health insurance accessible and affordable for every family and business. His expertise spans individual, family, and group health plans across 31 states.",
    specialties: ["Individual & Family", "Group Benefits", "Life Insurance"],
    phone: "+19546000342",
    photoReady: false,
  },
  {
    id: 2,
    name: "Rafael Perez",
    title: "Licensed Health Insurance Specialist",
    npn: "19153319",
    bio: "With 10+ years helping families find affordable coverage, Rafael brings deep expertise in individual and family health plans. He specializes in comparing private carrier options to find the best value for every client's unique situation.",
    specialties: ["Individual Plans", "Family Coverage", "Private Health Plans"],
    phone: "+19546000342",
    photoReady: false,
  },
  {
    id: 3,
    name: "Team Member",
    title: "Licensed Health Insurance Specialist",
    bio: "Dedicated to helping individuals and families find the right private health coverage. From short-term plans to comprehensive PPO options, we ensure every client gets the protection they need at a price they can afford.",
    specialties: ["Private Health Plans", "Short-Term Coverage", "Dental & Vision"],
    phone: "+19546000342",
    photoReady: false,
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

  return (
    <div
      className="flip-card-wrapper cursor-pointer"
      style={{
        perspective: "1200px",
        height: 480,
        position: "relative",
      }}
      onClick={() => setFlipped((f) => !f)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        className="flip-card-inner"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
              <img
                src={member.photoUrl ?? ""}
                alt={member.name}
                className="w-full h-full object-cover"
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
          className="flip-card-back rounded-2xl p-7 flex flex-col"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, #1C1C1C 0%, #222222 100%)",
            border: "1px solid rgba(201,168,76,0.25)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Name on back */}
          <div className="mb-4">
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: "1.4rem",
                color: "#F8F5F0",
                marginBottom: "0.2rem",
              }}
            >
              {member.name}
            </h3>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.8rem",
                color: "#C9A84C",
                fontWeight: 500,
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
              marginBottom: "1rem",
            }}
          />

          {/* Bio */}
          <p
            className="flex-1"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.875rem",
              color: "rgba(248,245,240,0.62)",
              lineHeight: 1.7,
            }}
          >
            {member.bio}
          </p>

          {/* Specialties */}
          <div className="mt-4 mb-5">
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.12em",
                color: "rgba(201,168,76,0.45)",
                textTransform: "uppercase",
                marginBottom: "0.6rem",
              }}
            >
              Specialties
            </div>
            <div className="flex flex-wrap gap-2">
              {member.specialties.map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-1 rounded-full text-xs"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: "rgba(201,168,76,0.08)",
                    border: "1px solid rgba(201,168,76,0.20)",
                    color: "#C9A84C",
                    fontSize: "0.72rem",
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
    </div>
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

            {/* Photo notice */}
            <motion.div
              className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full"
              style={{
              background: "rgba(201,168,76,0.07)",
              border: "1px solid rgba(201,168,76,0.18)",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Camera size={13} style={{ color: "#C9A84C" }} />
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.12em",
                  color: "rgba(201,168,76,0.70)",
                  textTransform: "uppercase",
                }}
              >
                Professional headshots coming soon
              </span>
            </motion.div>
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
