/*
 * HARRISON HEALTH GROUP — Team Section
 * 3D flip cards with blank photo placeholders (headshots pending).
 * Front: placeholder + name + title. Back: bio + specialties + Book a Call CTA.
 * Design: Midnight Gradient Luxury
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Star, ChevronRight, Camera } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion/AnimationWrappers";

const PLACEHOLDER_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663441385223/aeUWcF9B5vWVriiiqFVf4u/hhg-team-placeholder-NCsqqmdVHnUAp5G2cpA7VJ.webp";

interface TeamMember {
  id: number;
  name: string;
  title: string;
  bio: string;
  specialties: string[];
  phone: string;
  photoReady: boolean;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Team Member",
    title: "Licensed Health Insurance Specialist",
    bio: "A dedicated health insurance professional committed to finding the right coverage for every client. Specializes in ACA Marketplace plans and individual family coverage.",
    specialties: ["ACA Marketplace", "Individual Plans", "Family Coverage"],
    phone: "+18005551234",
    photoReady: false,
  },
  {
    id: 2,
    name: "Team Member",
    title: "Medicare & Senior Benefits Advisor",
    bio: "Expert in Medicare Supplement and Medicare Advantage plans. Helps clients 65+ navigate their options with clarity and confidence.",
    specialties: ["Medicare Supplement", "Medicare Advantage", "Senior Benefits"],
    phone: "+18005551234",
    photoReady: false,
  },
  {
    id: 3,
    name: "Team Member",
    title: "Group Benefits Consultant",
    bio: "Specializes in employer-sponsored health benefits for small to mid-size businesses. Helps companies attract and retain talent with competitive benefits packages.",
    specialties: ["Group Health", "Employer Benefits", "Business Plans"],
    phone: "+18005551234",
    photoReady: false,
  },
  {
    id: 4,
    name: "Team Member",
    title: "Self-Employed & 1099 Specialist",
    bio: "Dedicated to helping freelancers, contractors, and self-employed professionals find affordable, comprehensive health coverage that maximizes their tax advantages.",
    specialties: ["1099 Plans", "Self-Employed", "Tax Optimization"],
    phone: "+18005551234",
    photoReady: false,
  },
];

function FlipCard({ member }: { member: TeamMember }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="flip-card relative cursor-pointer"
      style={{ perspective: "1200px", height: 480 }}
      onClick={() => setFlipped((f) => !f)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        className="flip-card-inner w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d", position: "relative", width: "100%", height: "100%" }}
      >
        {/* FRONT */}
        <div
          className="flip-card-front rounded-2xl overflow-hidden"
          style={{
            background: "rgba(139,92,246,0.06)",
            border: "1px solid rgba(139,92,246,0.18)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {/* Photo area */}
          <div
            className="relative flex items-center justify-center"
            style={{
              height: 280,
              background: "linear-gradient(135deg, #110D1E, #1A1033)",
              overflow: "hidden",
            }}
          >
            {member.photoReady ? (
              <img
                src={PLACEHOLDER_IMG}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                {/* Placeholder silhouette */}
                <img
                  src={PLACEHOLDER_IMG}
                  alt="Photo coming soon"
                  className="w-full h-full object-cover"
                  style={{ opacity: 0.7 }}
                />
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
                      background: "rgba(139,92,246,0.20)",
                      border: "1px solid rgba(139,92,246,0.35)",
                    }}
                  >
                    <Camera size={11} style={{ color: "#A78BFA" }} />
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.6rem",
                        letterSpacing: "0.12em",
                        color: "#A78BFA",
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
                background: "linear-gradient(to top, rgba(139,92,246,0.15), transparent)",
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
                color: "#ffffff",
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
                color: "#A78BFA",
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
                  color: "rgba(255,255,255,0.30)",
                  textTransform: "uppercase",
                }}
              >
                Hover to learn more
              </span>
              <ChevronRight size={11} style={{ color: "rgba(255,255,255,0.30)" }} />
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className="flip-card-back rounded-2xl p-7 flex flex-col"
          style={{
            background: "linear-gradient(135deg, #1A1033, #110D1E)",
            border: "1px solid rgba(139,92,246,0.30)",
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
                color: "#ffffff",
                marginBottom: "0.2rem",
              }}
            >
              {member.name}
            </h3>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.8rem",
                color: "#A78BFA",
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
              background: "linear-gradient(to right, rgba(139,92,246,0.4), transparent)",
              marginBottom: "1rem",
            }}
          />

          {/* Bio */}
          <p
            className="flex-1"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.65)",
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
                color: "rgba(255,255,255,0.35)",
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
                    background: "rgba(139,92,246,0.15)",
                    border: "1px solid rgba(139,92,246,0.25)",
                    color: "#A78BFA",
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
              background: "linear-gradient(135deg, #8B5CF6, #6D28D9)",
              boxShadow: "0 0 20px rgba(139,92,246,0.35)",
              textDecoration: "none",
            }}
            whileHover={{ scale: 1.03, boxShadow: "0 0 32px rgba(139,92,246,0.55)" }}
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
      style={{ background: "#08080E" }}
    >
      {/* Ambient orbs */}
      <div
        className="ambient-orb"
        style={{
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(109,40,217,0.12) 0%, transparent 70%)",
          top: "20%",
          right: "-200px",
          animationDelay: "-8s",
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <FadeUp>
          <div className="text-center mb-16">
            <div className="section-label mb-4">Meet Our Team</div>
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
              The Specialists Behind{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #A78BFA, #8B5CF6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Your Coverage
              </span>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(255,255,255,0.55)",
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
                background: "rgba(139,92,246,0.08)",
                border: "1px solid rgba(139,92,246,0.20)",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Camera size={13} style={{ color: "#A78BFA" }} />
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.12em",
                  color: "rgba(167,139,250,0.80)",
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
              <FlipCard member={member} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
