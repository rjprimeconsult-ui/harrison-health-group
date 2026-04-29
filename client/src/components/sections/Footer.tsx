/*
 * HARRISON HEALTH GROUP — Footer + Compliance Footer
 * Full footer with logo, links, social, contact.
 * Compliance ribbon with 9 standard health insurance blocks.
 * Design: Midnight Gradient Luxury
 */

import { motion } from "framer-motion";
import { Shield, Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion/AnimationWrappers";

const footerLinks = {
  Coverage: [
    "Individual & Family",
    "Group & Business",
    "Dental & Vision",
    "Self-Employed Plans",
    "Supplemental Coverage",
    "Private vs. Marketplace",
  ],
  Company: ["About Us", "Our Team", "Testimonials", "Careers", "Blog"],
  Resources: [
    "Private vs. Marketplace",
    "Group Benefits Guide",
    "1099 Insurance Tips",
    "Plan Comparison",
    "FAQ",
  ],
  Legal: ["Privacy Policy", "Terms of Service", "Accessibility", "Sitemap"],
};

const complianceBlocks = [
  {
    title: "Licensing & Registration",
    text: "Harrison Health Group is a licensed independent insurance agency. NPN: 20611469 (Shaquille Harrison). Licensed to sell health insurance products in FL, TX, GA, NC, SC, and 26 additional states. License numbers available upon request. Not affiliated with any government agency.",
  },
  {
    title: "Not a Government Website",
    text: "This website is not operated by, affiliated with, or endorsed by the federal government or any state government. We are an independent private insurance agency. We do not offer Medicare or Medicaid products.",
  },
  {
    title: "TCPA & Communications Consent",
    text: "By contacting us, you consent to receive calls, texts, and emails from Harrison Health Group and its licensed agents regarding health insurance products. Message and data rates may apply. You may opt out at any time by replying STOP or contacting us directly.",
  },
  {
    title: "CAN-SPAM & Email Compliance",
    text: "All commercial email communications from Harrison Health Group comply with the CAN-SPAM Act. You may unsubscribe from marketing emails at any time by clicking the unsubscribe link in any email or by emailing info@harrisonhealthgroup.com.",
  },
  {
    title: "HIPAA Notice of Privacy Practices",
    text: "Harrison Health Group is committed to protecting the privacy of your health information. We collect and use health-related information only to facilitate insurance enrollment and related services. We do not sell your personal health information to third parties. Full HIPAA Notice available upon request.",
  },
  {
    title: "Plan Availability & Rate Disclaimers",
    text: "Plan availability, benefits, and premiums vary by location, age, health status, and other factors. Quoted rates are estimates only and are not a guarantee of coverage or final premium. Actual rates are determined by the insurance carrier upon application review.",
  },
  {
    title: "FTC & Advertising Compliance",
    text: "Harrison Health Group receives compensation from insurance carriers for plans enrolled through our agency. This compensation does not influence our recommendations. We are required to disclose this material connection in accordance with FTC guidelines.",
  },
  {
    title: "Privacy Policy Summary",
    text: "We collect personal information including name, contact details, and health-related data solely to facilitate insurance enrollment. We do not sell your data. Data is shared only with carriers and service providers necessary to complete your enrollment. Full Privacy Policy available upon request.",
  },
  {
    title: "ADA Accessibility",
    text: "Harrison Health Group is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards. If you experience barriers, please contact us at info@harrisonhealthgroup.com or (954) 600-0342.",
  },
];

export default function Footer() {
  return (
    <>
      {/* Main Footer */}
      <footer
        style={{
          background: "#FFFFFF",
          borderTop: "1px solid rgba(201,168,76,0.08)",
        }}
      >
        <div className="container py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
          background: "linear-gradient(135deg, #E2C97E, #C9A84C, #A8852D)",
                  boxShadow: "0 0 20px rgba(201,168,76,0.25)",
                  }}
                >
                  <Shield size={20} color="#FFFFFF" />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                  color: "#0A0A0A",
                  lineHeight: 1.1,
                }}
              >
                Harrison Health
              </div>
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.55rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#C9A84C",
                    }}
                  >
                    Group
                  </div>
                </div>
              </div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.85rem",
                  color: "#0A0A0A",
                  lineHeight: 1.7,
                  marginBottom: "1.5rem",
                }}
              >
                Independent health insurance specialists serving individuals,
                families, and businesses nationwide.
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="tel:+19546000342"
                  className="flex items-center gap-2 text-sm transition-colors no-underline"
                  style={{ color: "#0A0A0A", fontFamily: "'DM Sans', sans-serif" }}
                >
                  <Phone size={13} style={{ color: "#C9A84C" }} />
                  (954) 600-0342
                </a>
                <a
                  href="mailto:info@harrisonhealthgroup.com"
                  className="flex items-center gap-2 text-sm transition-colors no-underline"
                  style={{ color: "#0A0A0A", fontFamily: "'DM Sans', sans-serif" }}
                >
                  <Mail size={13} style={{ color: "#C9A84C" }} />
                  info@harrisonhealthgroup.com
                </a>
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.62rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  color: "#C9A84C",
                  marginBottom: "1rem",
                  }}
                >
                  {category}
                </div>
                <ul className="flex flex-col gap-2.5" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm transition-colors no-underline"
                        style={{ color: "#0A0A0A", fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
            style={{ borderTop: "1px solid rgba(201,168,76,0.10)" }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.78rem",
                color: "#333333",
              }}
            >
              © {new Date().getFullYear()} Harrison Health Group. All rights reserved.
              Licensed Independent Insurance Agency.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://nipr.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs transition-colors no-underline"
                style={{ color: "#333333", fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.1em" }}
              >
                Verify License
                <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Compliance Footer */}
      <div
        style={{
          background: "#FFFFFF",
          borderTop: "1px solid rgba(201,168,76,0.12)",
        }}
      >
        <div className="container py-10">
          <FadeUp>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(201,168,76,0.45)",
                marginBottom: "1.5rem",
              }}
            >
              Important Disclosures & Compliance
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complianceBlocks.map((block, i) => (
              <StaggerItem key={block.title}>
                <div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.72rem",
                      color: "#0A0A0A",
                      marginBottom: "0.4rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {block.title}
                  </div>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.72rem",
                      color: "#666666",
                      lineHeight: 1.65,
                    }}
                  >
                    {block.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </>
  );
}
