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

// States Harrison Health Group is licensed in — exactly matching the provided reference map
// GREEN states from the image: MT, WY, ND, SD, NE, MN, IA, WI, MI, IL, IN, OH,
//   KS, MO, KY, WV, OK, AR, TN, NC, SC, TX, LA, MS, AL, GA, FL,
//   NM, CO, NV, UT, AZ, ID, VA, PA
// NOT licensed: WA, OR, CA, AK, HI, NY, VT, ME, NH, MA, CT, RI, NJ, DE, MD, MT(check)
const LICENSED_STATES = new Set([
  // Northwest / Mountain
  "ID", "MT", "WY", "NV", "UT", "CO", "AZ", "NM",
  // Plains / Midwest
  "ND", "SD", "NE", "KS", "MN", "IA", "MO",
  // Great Lakes / Ohio Valley
  "WI", "MI", "IL", "IN", "OH", "KY", "WV",
  // South Central
  "OK", "TX", "AR", "LA",
  // Southeast
  "TN", "MS", "AL", "GA", "FL", "SC", "NC",
  // Mid-Atlantic
  "VA", "PA",
]);

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
      style={{ background: "#0A0A0A", padding: "100px 0 80px" }}
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
                color: "#F8F5F0",
                marginBottom: "12px",
              }}
            >
              Licensed in{" "}
              <span style={{ color: "#C9A84C" }}>{licensedCount} States</span>
            </h2>
            <p style={{ color: "rgba(248,245,240,0.55)", fontSize: "0.95rem", maxWidth: "520px", margin: "0 auto" }}>
              Hover over any state to see if we serve your area. Gold states are where Harrison Health Group is actively licensed.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div
            style={{
              background: "rgba(20,18,14,0.8)",
              border: "1px solid rgba(201,168,76,0.15)",
              borderRadius: "12px",
              padding: "24px",
              position: "relative",
            }}
          >
            {/* Legend */}
            <div style={{ display: "flex", gap: "24px", marginBottom: "16px", justifyContent: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: 14, height: 14, borderRadius: 3, background: "#C9A84C" }} />
                <span style={{ color: "rgba(248,245,240,0.7)", fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Licensed</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: 14, height: 14, borderRadius: 3, background: "rgba(248,245,240,0.12)" }} />
                <span style={{ color: "rgba(248,245,240,0.7)", fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Not Available</span>
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
                      fill={
                        licensed
                          ? isHovered ? "#E8C46A" : "#C9A84C"
                          : isHovered ? "rgba(248,245,240,0.22)" : "rgba(248,245,240,0.10)"
                      }
                      stroke="rgba(10,10,10,0.8)"
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
                      fill={licensed ? "rgba(10,10,10,0.9)" : "rgba(248,245,240,0.5)"}
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
                    background: "rgba(20,18,14,0.97)",
                    border: `1px solid ${LICENSED_STATES.has(tooltip.abbr) ? "rgba(201,168,76,0.6)" : "rgba(248,245,240,0.15)"}`,
                    borderRadius: "6px",
                    padding: "6px 12px",
                    pointerEvents: "none",
                    zIndex: 20,
                    whiteSpace: "nowrap",
                    boxShadow: LICENSED_STATES.has(tooltip.abbr)
                      ? "0 4px 20px rgba(201,168,76,0.2)"
                      : "0 4px 12px rgba(0,0,0,0.4)",
                  }}
                >
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    color: "#F8F5F0",
                  }}>
                    {STATE_NAMES[tooltip.abbr] ?? tooltip.abbr}
                  </div>
                  <div style={{
                    fontSize: "0.72rem",
                    color: LICENSED_STATES.has(tooltip.abbr) ? "#C9A84C" : "rgba(248,245,240,0.45)",
                    marginTop: "2px",
                  }}>
                    {LICENSED_STATES.has(tooltip.abbr) ? "✓ Licensed & Serving" : "✗ Not Available"}
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
                { value: `${licensedCount}`, label: "States Licensed" },
                { value: "20+", label: "Carrier Partners" },
                { value: "$0", label: "Cost to You" },
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
                    color: "#C9A84C",
                    lineHeight: 1,
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "rgba(248,245,240,0.45)",
                    marginTop: "4px",
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
