/*
 * HARRISON HEALTH GROUP — Licensed States Map
 * Design: Charcoal & Gold Luxury
 * Uses real Albers Equal-Area Conic projected SVG paths for accurate US geography.
 * Licensed states highlighted in gold; unlicensed in dark charcoal.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { FadeUp } from "@/components/motion/AnimationWrappers";
import { STATE_PATHS, STATE_CENTROIDS } from "./usMapData";
import { mappedStates } from "@shared/service-area";

const LICENSED_STATES = mappedStates;

const STATE_NAMES: Record<string, string> = {
  AL:"Alabama", AK:"Alaska", AZ:"Arizona", AR:"Arkansas", CA:"California",
  CO:"Colorado", CT:"Connecticut", DE:"Delaware", FL:"Florida", GA:"Georgia",
  HI:"Hawaii", ID:"Idaho", IL:"Illinois", IN:"Indiana", IA:"Iowa",
  KS:"Kansas", KY:"Kentucky", LA:"Louisiana", ME:"Maine", MD:"Maryland",
  MA:"Massachusetts", MI:"Michigan", MN:"Minnesota", MS:"Mississippi", MO:"Missouri",
  MT:"Montana", NE:"Nebraska", NV:"Nevada", NH:"New Hampshire", NJ:"New Jersey",
  NM:"New Mexico", NY:"New York", NC:"North Carolina", ND:"North Dakota", OH:"Ohio",
  OK:"Oklahoma", OR:"Oregon", PA:"Pennsylvania", RI:"Rhode Island", SC:"South Carolina",
  SD:"South Dakota", TN:"Tennessee", TX:"Texas", UT:"Utah", VT:"Vermont",
  VA:"Virginia", WA:"Washington", WV:"West Virginia", WI:"Wisconsin", WY:"Wyoming",
};

interface TooltipState {
  abbr: string;
  x: number;
  y: number;
}

export default function LicensedStatesMap() {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [svgRect, setSvgRect] = useState<DOMRect | null>(null);

  const handleMouseEnter = (abbr: string, e: React.MouseEvent<SVGPathElement>) => {
    const svg = e.currentTarget.ownerSVGElement as SVGSVGElement;
    const rect = svg.getBoundingClientRect();
    setSvgRect(rect);
    const svgX = ((e.clientX - rect.left) / rect.width) * 100;
    const svgY = ((e.clientY - rect.top) / rect.height) * 100;
    setTooltip({ abbr, x: svgX, y: svgY });
  };

  const handleMouseLeave = () => setTooltip(null);

  const licensedCount = LICENSED_STATES.size;

  return (
    <section
      id="licensed-states"
      style={{ background: "#FFFFFF", padding: "100px 0 80px" }}
    >
      <div className="container">
        <FadeUp>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.7rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(201,168,76,0.7)",
                display: "block",
                marginBottom: "12px",
              }}
            >
              Service Area
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#0A0A0A",
                marginBottom: "12px",
              }}
            >
              Licensed in{" "}
              <span style={{ color: "#A8852D" }}>{licensedCount} States</span>
            </h2>
            <p style={{ color: "#0A0A0A", fontSize: "0.95rem", maxWidth: "520px", margin: "0 auto" }}>
              Gold states reflect the current site list. Confirm advisor licensing and plan availability for your state before discussing coverage.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div
            style={{
              background: "rgba(255,255,255,0.90)",
              border: "1px solid rgba(201,168,76,0.20)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              borderRadius: "12px",
              padding: "24px",
              position: "relative",
            }}
          >
            {/* Legend */}
            <div style={{ display: "flex", gap: "24px", marginBottom: "16px", justifyContent: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: 14, height: 14, borderRadius: 3, background: "#C9A84C" }} />
                <span style={{ color: "#0A0A0A", fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Licensed</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: 14, height: 14, borderRadius: 3, background: "rgba(10,10,10,0.10)" }} />
                <span style={{ color: "#0A0A0A", fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Not Listed</span>
              </div>
            </div>

            {/* SVG Map */}
            <div style={{ position: "relative", width: "100%", paddingBottom: "62.5%" }}>
              <svg
                viewBox="0 0 960 600"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  overflow: "visible",
                }}
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Render all state paths */}
                {Object.entries(STATE_PATHS).map(([abbr, d]) => {
                  const licensed = LICENSED_STATES.has(abbr);
                  const isHovered = tooltip?.abbr === abbr;
                  return (
                    <path
                      key={abbr}
                      d={d}
                      tabIndex={0}
                      role="img"
                      aria-label={`${STATE_NAMES[abbr] ?? abbr}: ${licensed ? "shown on licensed-state map" : "not listed on map"}`}
                      fill={
                        licensed
                          ? isHovered ? "#E2C97E" : "#C9A84C"
                          : isHovered ? "rgba(10,10,10,0.14)" : "rgba(10,10,10,0.08)"
                      }
                      stroke="rgba(255,255,255,0.90)"
                      strokeWidth={0.6}
                      style={{
                        cursor: "pointer",
                        transition: "fill 0.15s ease",
                        filter: isHovered && licensed
                          ? "drop-shadow(0 0 4px rgba(201,168,76,0.6))"
                          : "none",
                      }}
                      onMouseEnter={(e) => handleMouseEnter(abbr, e)}
                      onMouseLeave={handleMouseLeave}
                      onFocus={() => setTooltip({ abbr, x: 50, y: 50 })}
                      onBlur={handleMouseLeave}
                    />
                  );
                })}

                {/* State abbreviation labels */}
                {Object.entries(STATE_CENTROIDS).map(([abbr, [cx, cy]]) => {
                  const licensed = LICENSED_STATES.has(abbr);
                  // Skip tiny states that are too small for labels
                  const skipLabel = ["RI", "CT", "DE", "DC", "NJ", "MD"].includes(abbr);
                  if (skipLabel) return null;
                  return (
                    <text
                      key={`label-${abbr}`}
                      x={cx}
                      y={cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={abbr === "AK" || abbr === "HI" ? "9" : "8"}
                      fontFamily="'Cormorant Garamond', serif"
                      fontWeight="700"
                      fill={licensed ? "#FFFFFF" : "rgba(10,10,10,0.35)"}
                      style={{ pointerEvents: "none", userSelect: "none" }}
                    >
                      {abbr}
                    </text>
                  );
                })}
              </svg>

              {/* Tooltip */}
              {tooltip && (
                <motion.div
                  key={tooltip.abbr}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.12 }}
                  style={{
                    position: "absolute",
                    left: `${Math.min(tooltip.x + 2, 80)}%`,
                    top: `${Math.max(tooltip.y - 12, 2)}%`,
                    background: "rgba(255,255,255,0.97)",
                    border: `1px solid ${LICENSED_STATES.has(tooltip.abbr) ? "rgba(201,168,76,0.5)" : "rgba(10,10,10,0.12)"}`,
                    boxShadow: LICENSED_STATES.has(tooltip.abbr)
                      ? "0 4px 20px rgba(201,168,76,0.18)"
                      : "0 4px 12px rgba(0,0,0,0.08)",
                    borderRadius: "6px",
                    padding: "6px 12px",
                    pointerEvents: "none",
                    zIndex: 20,
                    whiteSpace: "nowrap",
                  }}
                >
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    color: "#0A0A0A",
                  }}>
                    {STATE_NAMES[tooltip.abbr] ?? tooltip.abbr}
                  </div>
                  <div style={{
                    fontSize: "0.72rem",
                    color: LICENSED_STATES.has(tooltip.abbr) ? "#A8852D" : "rgba(10,10,10,0.40)",
                    marginTop: "2px",
                  }}>
                    {LICENSED_STATES.has(tooltip.abbr) ? "Shown on service-area map" : "Not listed — ask about referrals"}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Stats bar */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                borderTop: "1px solid rgba(201,168,76,0.15)",
                marginTop: "20px",
              }}
            >
              {[
                { value: `${licensedCount}`, label: "States on Map" },
                { value: "Private", label: "Coverage Focus" },
                { value: "1:1", label: "Conversation" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  style={{
                    padding: "16px",
                    textAlign: "center",
                    borderRight: i < 2 ? "1px solid rgba(201,168,76,0.10)" : "none",
                  }}
                >
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    fontSize: "2rem",
                    color: "#A8852D",
                    lineHeight: 1,
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#0A0A0A",
                    marginTop: "4px",
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            <details className="mt-5 text-sm" style={{ color: "#0A0A0A" }}>
              <summary className="cursor-pointer font-semibold">See the full state list</summary>
              <p className="mt-3 leading-7">{Array.from(LICENSED_STATES).map((abbr) => STATE_NAMES[abbr]).join(", ")}. Confirm licensing and product availability before a specific discussion.</p>
            </details>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
