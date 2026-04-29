/*
 * HARRISON HEALTH GROUP — Carrier Marquee
 * Real carriers: UHC, BCBS, Cigna, Aetna, Ambetter, Molina, Oscar
 * Design: Charcoal & Gold Luxury
 */

const carriers = [
  "United HealthCare",
  "Blue Cross Blue Shield",
  "Cigna",
  "Aetna",
  "Ambetter",
  "Molina Healthcare",
  "Oscar Health",
];

const allCarriers = [...carriers, ...carriers]; // doubled for seamless loop

export default function CarrierMarquee() {
  return (
    <section
      style={{
        background: "#FFFFFF",
        borderTop: "1px solid rgba(201,168,76,0.10)",
        borderBottom: "1px solid rgba(201,168,76,0.10)",
        padding: "1.25rem 0",
        overflow: "hidden",
      }}
    >
      {/* Label */}
      <div className="text-center mb-3">
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.55rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(201,168,76,0.45)",
          }}
        >
          Carrier Partners
        </span>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #FFFFFF, transparent)" }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #FFFFFF, transparent)" }}
        />

        <div className="marquee-track">
          {allCarriers.map((carrier, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-8"
              style={{ whiteSpace: "nowrap" }}
            >
              {/* Gold diamond separator */}
              {i > 0 && (
                <span
                  style={{
                    color: "rgba(201,168,76,0.30)",
                    fontSize: "0.5rem",
                    marginRight: "-1rem",
                  }}
                >
                  ◆
                </span>
              )}
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 600,
                  fontSize: "1.05rem",
                  color: "rgba(10,10,10,0.45)",
                  letterSpacing: "0.04em",
                  transition: "color 0.2s",
                }}
              >
                {carrier}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
