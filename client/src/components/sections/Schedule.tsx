/*
 * HARRISON HEALTH GROUP — Schedule a Consultation Section
 * Design: Charcoal & Gold Luxury
 * Embeds Calendly inline widget for booking a free consultation.
 * Placed after the Licensed States Map section.
 */

import { useEffect, useRef } from "react";
import { CalendarCheck, Clock, Video, ShieldCheck } from "lucide-react";
import { FadeUp } from "@/components/motion/AnimationWrappers";

const CALENDLY_URL = "https://calendly.com/harrisonhealthgroup/consultation";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

export default function Schedule() {
  const widgetRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    // Load Calendly script once
    const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);

    const initWidget = () => {
      if (initialized.current) return;
      if (window.Calendly && widgetRef.current) {
        widgetRef.current.innerHTML = "";
        window.Calendly.initInlineWidget({
          url: `${CALENDLY_URL}?hide_gdpr_banner=1&background_color=0a0a0a&text_color=ffffff&primary_color=c9a84c`,
          parentElement: widgetRef.current,
        });
        initialized.current = true;
      }
    };

    if (existing) {
      initWidget();
    } else {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onload = initWidget;
      document.body.appendChild(script);
    }

    // Also load the stylesheet
    const CSS_HREF = "https://assets.calendly.com/assets/external/widget.css";
    if (!document.querySelector(`link[href="${CSS_HREF}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = CSS_HREF;
      document.head.appendChild(link);
    }
  }, []);

  const perks = [
    { icon: Clock, label: "30-Minute Call" },
    { icon: Video, label: "Phone or Video" },
    { icon: ShieldCheck, label: "No Obligation" },
  ];

  return (
    <section
      id="schedule"
      className="py-28 relative overflow-hidden"
      style={{ background: "#0A0A0A" }}
    >
      {/* Ambient gold orb */}
      <div
        className="ambient-orb"
        style={{
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(201,168,76,0.10) 0%, transparent 70%)",
          top: "-150px",
          right: "-100px",
          animationDelay: "-12s",
        }}
      />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-start">
          {/* Left: Copy */}
          <FadeUp>
            <div className="lg:sticky lg:top-32">
              <div className="section-label mb-4">Book a Time</div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
                  color: "#FFFFFF",
                  lineHeight: 1.1,
                  marginBottom: "1.25rem",
                }}
              >
                Schedule Your Free{" "}
                <span className="gold-text">Consultation</span>
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#B8B8B8",
                  fontSize: "1.02rem",
                  lineHeight: 1.75,
                  marginBottom: "2rem",
                  maxWidth: 420,
                }}
              >
                Pick a time that works for you and one of our licensed advisors will
                walk you through your options — no pressure, no cost. Just honest
                guidance to help you find the right coverage.
              </p>

              {/* Perks */}
              <div className="space-y-3 mb-8">
                {perks.map((perk) => {
                  const Icon = perk.icon;
                  return (
                    <div key={perk.label} className="flex items-center gap-3">
                      <div
                        className="flex items-center justify-center rounded-lg"
                        style={{
                          width: 38,
                          height: 38,
                          background: "rgba(201,168,76,0.10)",
                          border: "1px solid rgba(201,168,76,0.25)",
                        }}
                      >
                        <Icon size={18} style={{ color: "#C9A84C" }} />
                      </div>
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          color: "#FFFFFF",
                          fontSize: "0.95rem",
                          fontWeight: 500,
                        }}
                      >
                        {perk.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Fallback direct link */}
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #C9A84C 0%, #E5C76B 100%)",
                  color: "#0A0A0A",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  boxShadow: "0 8px 30px rgba(201,168,76,0.25)",
                }}
              >
                <CalendarCheck size={17} />
                Open Scheduler in New Tab
              </a>
            </div>
          </FadeUp>

          {/* Right: Calendly inline widget */}
          <FadeUp delay={0.15}>
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "#0A0A0A",
                border: "1px solid rgba(201,168,76,0.20)",
                boxShadow: "0 25px 70px rgba(0,0,0,0.5)",
              }}
            >
              <div
                ref={widgetRef}
                style={{ minWidth: "320px", height: "700px" }}
              />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
