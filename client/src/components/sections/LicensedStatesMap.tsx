/*
 * HARRISON HEALTH GROUP — Licensed States Interactive Map
 * SVG-based US map showing licensed states in gold, unlicensed in dark charcoal.
 * Hover tooltip shows state name + "Licensed" or "Not Available".
 * Design: Midnight Gradient Luxury — charcoal + gold palette
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp } from "@/components/motion/AnimationWrappers";

// Licensed states from the provided map image
const LICENSED_STATES = new Set([
  "MT","ND","SD","MN","WI","MI","WY","NE","IA","IL","IN","OH",
  "NY","VT","ME","NV","UT","CO","KS","MO","KY","WV","VA","PA",
  "NJ","AZ","NM","OK","AR","TN","NC","SC","TX","LA","MS","AL",
  "GA","FL","ID","MD","DE","CT","RI","MA","NH",
]);

// Full state name map
const STATE_NAMES: Record<string, string> = {
  AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",
  CO:"Colorado",CT:"Connecticut",DE:"Delaware",FL:"Florida",GA:"Georgia",
  HI:"Hawaii",ID:"Idaho",IL:"Illinois",IN:"Indiana",IA:"Iowa",
  KS:"Kansas",KY:"Kentucky",LA:"Louisiana",ME:"Maine",MD:"Maryland",
  MA:"Massachusetts",MI:"Michigan",MN:"Minnesota",MS:"Mississippi",MO:"Missouri",
  MT:"Montana",NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",NJ:"New Jersey",
  NM:"New Mexico",NY:"New York",NC:"North Carolina",ND:"North Dakota",OH:"Ohio",
  OK:"Oklahoma",OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",SC:"South Carolina",
  SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",VT:"Vermont",
  VA:"Virginia",WA:"Washington",WV:"West Virginia",WI:"Wisconsin",WY:"Wyoming",
};

interface TooltipState {
  abbr: string;
  x: number;
  y: number;
}

// SVG path data for each US state (simplified but accurate proportional map)
const STATE_PATHS: Record<string, string> = {
  AL: "M 520 340 L 530 340 L 535 390 L 525 395 L 515 390 L 515 345 Z",
  AK: "M 60 420 L 120 420 L 130 450 L 100 470 L 60 460 L 50 440 Z",
  AZ: "M 155 295 L 200 295 L 205 360 L 155 370 L 140 355 L 140 310 Z",
  AR: "M 480 305 L 530 305 L 530 340 L 480 340 L 470 325 Z",
  CA: "M 95 220 L 140 210 L 155 295 L 140 355 L 95 330 L 80 280 Z",
  CO: "M 215 255 L 295 255 L 295 300 L 215 300 Z",
  CT: "M 660 190 L 675 190 L 675 205 L 660 208 Z",
  DE: "M 645 215 L 655 215 L 655 235 L 645 235 Z",
  FL: "M 520 395 L 565 395 L 590 410 L 590 440 L 555 460 L 530 450 L 520 430 Z",
  GA: "M 535 340 L 575 340 L 580 390 L 555 400 L 535 395 Z",
  HI: "M 200 470 L 260 470 L 260 490 L 200 490 Z",
  ID: "M 155 155 L 195 155 L 200 215 L 175 230 L 155 215 Z",
  IL: "M 490 230 L 515 230 L 520 295 L 495 300 L 480 285 Z",
  IN: "M 515 230 L 540 230 L 540 285 L 520 295 Z",
  IA: "M 430 210 L 490 210 L 490 250 L 430 255 Z",
  KS: "M 340 275 L 430 275 L 430 315 L 340 315 Z",
  KY: "M 520 285 L 590 280 L 595 305 L 520 310 Z",
  LA: "M 460 370 L 510 370 L 520 395 L 490 410 L 460 400 Z",
  ME: "M 680 130 L 710 125 L 715 165 L 685 170 Z",
  MD: "M 620 230 L 655 225 L 658 245 L 625 248 Z",
  MA: "M 655 175 L 695 170 L 698 190 L 660 192 Z",
  MI: "M 520 175 L 565 170 L 570 210 L 540 220 L 520 210 Z",
  MN: "M 415 145 L 470 140 L 475 210 L 430 215 L 415 200 Z",
  MS: "M 490 340 L 520 340 L 520 395 L 490 395 L 480 370 Z",
  MO: "M 430 255 L 495 255 L 495 305 L 430 310 Z",
  MT: "M 195 130 L 310 125 L 315 185 L 200 190 Z",
  NE: "M 330 230 L 430 225 L 430 270 L 330 275 Z",
  NV: "M 130 210 L 165 205 L 175 270 L 155 295 L 120 285 Z",
  NH: "M 660 155 L 675 152 L 678 190 L 660 190 Z",
  NJ: "M 645 200 L 660 198 L 662 225 L 645 228 Z",
  NM: "M 205 300 L 265 300 L 265 365 L 205 365 Z",
  NY: "M 600 165 L 655 158 L 660 200 L 625 205 L 600 195 Z",
  NC: "M 575 295 L 645 285 L 648 310 L 580 315 Z",
  ND: "M 315 145 L 415 140 L 418 185 L 315 190 Z",
  OH: "M 540 225 L 580 220 L 585 270 L 545 275 Z",
  OK: "M 330 315 L 430 310 L 435 350 L 330 355 Z",
  OR: "M 100 155 L 160 150 L 165 205 L 130 215 L 100 200 Z",
  PA: "M 580 195 L 645 190 L 648 225 L 582 230 Z",
  RI: "M 675 190 L 685 188 L 686 202 L 675 204 Z",
  SC: "M 575 310 L 615 305 L 620 335 L 580 340 Z",
  SD: "M 315 185 L 415 180 L 418 225 L 315 230 Z",
  TN: "M 490 305 L 580 298 L 582 325 L 490 330 Z",
  TX: "M 265 320 L 430 315 L 440 390 L 380 430 L 310 420 L 265 380 Z",
  UT: "M 175 230 L 215 225 L 220 295 L 180 300 Z",
  VT: "M 645 155 L 660 152 L 662 190 L 648 192 Z",
  VA: "M 580 260 L 645 252 L 650 285 L 582 290 Z",
  WA: "M 100 115 L 165 108 L 168 155 L 102 158 Z",
  WV: "M 575 245 L 610 240 L 615 275 L 578 280 Z",
  WI: "M 460 165 L 510 160 L 515 215 L 462 220 Z",
  WY: "M 200 190 L 310 185 L 315 240 L 200 245 Z",
};

// Label positions for state abbreviations
const STATE_LABELS: Record<string, [number, number]> = {
  AL:[522,368],AK:[85,445],AZ:[170,330],AR:[500,322],CA:[112,275],
  CO:[255,278],CT:[667,198],DE:[650,225],FL:[550,425],GA:[555,368],
  HI:[230,480],ID:[175,192],IL:[500,263],IN:[527,258],IA:[460,232],
  KS:[385,295],KY:[557,292],LA:[488,385],ME:[695,148],MD:[638,237],
  MA:[677,180],MI:[545,192],MN:[445,178],MS:[500,368],MO:[462,282],
  MT:[255,158],NE:[380,250],NV:[148,248],NH:[668,172],NJ:[652,212],
  NM:[235,332],NY:[628,182],NC:[610,300],ND:[365,163],OH:[562,248],
  OK:[382,332],OR:[130,178],PA:[612,208],RI:[680,196],SC:[597,322],
  SD:[365,205],TN:[535,312],TX:[352,372],UT:[198,262],VT:[652,172],
  VA:[612,272],WA:[132,132],WV:[592,258],WI:[487,188],WY:[257,215],
};

export default function LicensedStatesMap() {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const licensedCount = LICENSED_STATES.size;

  const handleMouseEnter = (abbr: string, e: React.MouseEvent<SVGPathElement>) => {
    const rect = (e.currentTarget.closest("svg") as SVGSVGElement).getBoundingClientRect();
    const svgX = e.clientX - rect.left;
    const svgY = e.clientY - rect.top;
    setTooltip({ abbr, x: svgX, y: svgY });
    setHoveredState(abbr);
  };

  const handleMouseMove = (abbr: string, e: React.MouseEvent<SVGPathElement>) => {
    const rect = (e.currentTarget.closest("svg") as SVGSVGElement).getBoundingClientRect();
    const svgX = e.clientX - rect.left;
    const svgY = e.clientY - rect.top;
    setTooltip({ abbr, x: svgX, y: svgY });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
    setHoveredState(null);
  };

  const isLicensed = (abbr: string) => LICENSED_STATES.has(abbr);

  return (
    <section
      id="licensed-states"
      className="py-24 relative overflow-hidden"
      style={{ background: "#0D0D0D" }}
    >
      {/* Ambient gold orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <FadeUp>
          <div className="text-center mb-12">
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.22em",
                color: "rgba(201,168,76,0.60)",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              Service Area
            </div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: "clamp(2rem, 5vw, 3.4rem)",
                color: "#F8F5F0",
                lineHeight: 1.1,
                marginBottom: "0.75rem",
              }}
            >
              Licensed in{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #E2C97E, #C9A84C)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {licensedCount} States
              </span>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "rgba(248,245,240,0.50)",
                fontSize: "1rem",
                maxWidth: 480,
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Hover over any state to see if we serve your area. Highlighted states are where Harrison Health Group is actively licensed.
            </p>
          </div>
        </FadeUp>

        {/* Map Container */}
        <FadeUp delay={0.2}>
          <div
            className="relative mx-auto rounded-2xl overflow-hidden"
            style={{
              maxWidth: 820,
              background: "rgba(18,18,18,0.80)",
              border: "1px solid rgba(201,168,76,0.12)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.50)",
              padding: "2rem 1.5rem",
            }}
          >
            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 3,
                    background: "linear-gradient(135deg, #C9A84C, #A8852D)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.62rem",
                    letterSpacing: "0.1em",
                    color: "rgba(201,168,76,0.80)",
                    textTransform: "uppercase",
                  }}
                >
                  Licensed
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 3,
                    background: "#2A2A2A",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.62rem",
                    letterSpacing: "0.1em",
                    color: "rgba(248,245,240,0.30)",
                    textTransform: "uppercase",
                  }}
                >
                  Not Available
                </span>
              </div>
            </div>

            {/* SVG Map */}
            <div className="relative" style={{ userSelect: "none" }}>
              <svg
                viewBox="0 0 780 500"
                style={{ width: "100%", height: "auto", display: "block" }}
                aria-label="US Licensed States Map"
              >
                <defs>
                  <filter id="glow-gold">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="gold-fill" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E2C97E" />
                    <stop offset="100%" stopColor="#A8852D" />
                  </linearGradient>
                  <linearGradient id="gold-hover" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F0D98A" />
                    <stop offset="100%" stopColor="#C9A84C" />
                  </linearGradient>
                </defs>

                {Object.entries(STATE_PATHS).map(([abbr, path]) => {
                  const licensed = isLicensed(abbr);
                  const hovered = hoveredState === abbr;
                  const [lx, ly] = STATE_LABELS[abbr] || [0, 0];

                  return (
                    <g key={abbr}>
                      <path
                        d={path}
                        fill={
                          hovered && licensed
                            ? "url(#gold-hover)"
                            : licensed
                            ? "url(#gold-fill)"
                            : hovered
                            ? "#3A3A3A"
                            : "#222222"
                        }
                        stroke={licensed ? "rgba(201,168,76,0.35)" : "rgba(255,255,255,0.06)"}
                        strokeWidth={hovered ? 1.5 : 0.8}
                        filter={hovered && licensed ? "url(#glow-gold)" : undefined}
                        style={{
                          cursor: "pointer",
                          transition: "fill 0.2s ease",
                        }}
                        onMouseEnter={(e) => handleMouseEnter(abbr, e)}
                        onMouseMove={(e) => handleMouseMove(abbr, e)}
                        onMouseLeave={handleMouseLeave}
                      />
                      {/* State abbreviation label */}
                      <text
                        x={lx}
                        y={ly}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "7px",
                          fontWeight: 600,
                          fill: licensed
                            ? hovered ? "#0A0A0A" : "rgba(10,10,10,0.85)"
                            : "rgba(255,255,255,0.20)",
                          pointerEvents: "none",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {abbr}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Tooltip */}
              <AnimatePresence>
                {tooltip && (
                  <motion.div
                    key={tooltip.abbr}
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      position: "absolute",
                      left: tooltip.x + 12,
                      top: tooltip.y - 36,
                      pointerEvents: "none",
                      zIndex: 50,
                    }}
                  >
                    <div
                      style={{
                        background: isLicensed(tooltip.abbr)
                          ? "linear-gradient(135deg, rgba(201,168,76,0.95), rgba(168,133,45,0.95))"
                          : "rgba(30,30,30,0.95)",
                        border: isLicensed(tooltip.abbr)
                          ? "1px solid rgba(201,168,76,0.50)"
                          : "1px solid rgba(255,255,255,0.10)",
                        borderRadius: 8,
                        padding: "6px 12px",
                        boxShadow: isLicensed(tooltip.abbr)
                          ? "0 8px 24px rgba(201,168,76,0.30)"
                          : "0 8px 24px rgba(0,0,0,0.50)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 700,
                          fontSize: "0.78rem",
                          color: isLicensed(tooltip.abbr) ? "#0A0A0A" : "#F8F5F0",
                          marginBottom: "1px",
                        }}
                      >
                        {STATE_NAMES[tooltip.abbr] || tooltip.abbr}
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "0.58rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: isLicensed(tooltip.abbr)
                            ? "rgba(10,10,10,0.70)"
                            : "rgba(248,245,240,0.45)",
                        }}
                      >
                        {isLicensed(tooltip.abbr) ? "✓ Licensed" : "Not Available"}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom stat bar */}
            <div
              className="flex items-center justify-center gap-8 mt-6 pt-5"
              style={{ borderTop: "1px solid rgba(201,168,76,0.10)" }}
            >
              <div className="text-center">
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    fontSize: "2rem",
                    color: "#C9A84C",
                    lineHeight: 1,
                  }}
                >
                  {licensedCount}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.58rem",
                    letterSpacing: "0.12em",
                    color: "rgba(248,245,240,0.35)",
                    textTransform: "uppercase",
                    marginTop: "0.25rem",
                  }}
                >
                  States Licensed
                </div>
              </div>
              <div
                style={{
                  width: 1,
                  height: 36,
                  background: "rgba(201,168,76,0.15)",
                }}
              />
              <div className="text-center">
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    fontSize: "2rem",
                    color: "#C9A84C",
                    lineHeight: 1,
                  }}
                >
                  20+
                </div>
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.58rem",
                    letterSpacing: "0.12em",
                    color: "rgba(248,245,240,0.35)",
                    textTransform: "uppercase",
                    marginTop: "0.25rem",
                  }}
                >
                  Carrier Partners
                </div>
              </div>
              <div
                style={{
                  width: 1,
                  height: 36,
                  background: "rgba(201,168,76,0.15)",
                }}
              />
              <div className="text-center">
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    fontSize: "2rem",
                    color: "#C9A84C",
                    lineHeight: 1,
                  }}
                >
                  $0
                </div>
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.58rem",
                    letterSpacing: "0.12em",
                    color: "rgba(248,245,240,0.35)",
                    textTransform: "uppercase",
                    marginTop: "0.25rem",
                  }}
                >
                  Cost to You
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
