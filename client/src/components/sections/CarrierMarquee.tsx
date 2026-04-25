/*
 * HARRISON HEALTH GROUP — Carrier Marquee
 * Infinite CSS scroll with carrier logos. Grayscale on default, full color on hover.
 * Design: Midnight Gradient Luxury
 */

import { FadeUp } from "@/components/motion/AnimationWrappers";

const carriers = [
  { name: "Blue Cross Blue Shield", abbr: "BCBS" },
  { name: "Aetna", abbr: "Aetna" },
  { name: "Cigna", abbr: "Cigna" },
  { name: "UnitedHealthcare", abbr: "UHC" },
  { name: "Humana", abbr: "Humana" },
  { name: "Oscar Health", abbr: "Oscar" },
  { name: "Ambetter", abbr: "Ambetter" },
  { name: "Molina Healthcare", abbr: "Molina" },
  { name: "Florida Blue", abbr: "FL Blue" },
  { name: "Centene", abbr: "Centene" },
];

function CarrierLogo({ name, abbr }: { name: string; abbr: string }) {
  return (
    <div
      className="flex items-center justify-center px-8 py-4 rounded-xl mx-3 transition-all duration-300 group"
      style={{
        background: "rgba(139, 92, 246, 0.05)",
        border: "1px solid rgba(139, 92, 246, 0.12)",
        minWidth: 140,
        cursor: "default",
      }}
      title={name}
    >
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
          fontSize: "0.9rem",
          color: "rgba(255,255,255,0.45)",
          letterSpacing: "0.02em",
          transition: "color 0.3s ease",
          whiteSpace: "nowrap",
        }}
        className="group-hover:!text-purple-400"
      >
        {abbr}
      </span>
    </div>
  );
}

export default function CarrierMarquee() {
  const doubled = [...carriers, ...carriers];

  return (
    <section
      id="carriers"
      className="py-16 overflow-hidden"
      style={{ background: "#0D0A1A", borderTop: "1px solid rgba(139,92,246,0.10)", borderBottom: "1px solid rgba(139,92,246,0.10)" }}
    >
      <div className="container mb-8">
        <FadeUp>
          <div className="flex items-center justify-center gap-4">
            <div style={{ width: 60, height: 1, background: "linear-gradient(to right, transparent, rgba(139,92,246,0.5))" }} />
            <p
              className="section-label text-center"
              style={{ color: "rgba(255,255,255,0.40)" }}
            >
              Trusted Carrier Partners
            </p>
            <div style={{ width: 60, height: 1, background: "linear-gradient(to left, transparent, rgba(139,92,246,0.5))" }} />
          </div>
        </FadeUp>
      </div>

      <div className="marquee-fade overflow-hidden">
        <div className="marquee-track">
          {doubled.map((carrier, i) => (
            <CarrierLogo key={`${carrier.abbr}-${i}`} name={carrier.name} abbr={carrier.abbr} />
          ))}
        </div>
      </div>
    </section>
  );
}
