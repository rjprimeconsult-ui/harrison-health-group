/*
 * HARRISON HEALTH GROUP — Carrier Marquee
 * Design: Charcoal & Gold Luxury
 * Real carrier logos in an infinite horizontal scroll marquee
 * White background, full-color logos, edge fade masks, smooth CSS animation
 */

const carriers = [
  { name: "Aetna",              src: "/manus-storage/aetna_a2dfa3bb.jpg" },
  { name: "UnitedHealthcare",   src: "/manus-storage/unitedhealthcare_0feda939.png" },
  { name: "Humana",             src: "/manus-storage/humana_6de3058c.jpg" },
  { name: "Cigna",              src: "/manus-storage/cigna_33656fe8.png" },
  { name: "Blue Cross Blue Shield", src: "/manus-storage/bcbs_23f0dee6.png" },
  { name: "Ambetter",           src: "/manus-storage/ambetter_9afc373a.png" },
  { name: "Molina Healthcare",  src: "/manus-storage/molina_742ed3af.png" },
  { name: "Oscar Health",       src: "/manus-storage/oscar_8a6009dd.png" },
];

const allCarriers = [...carriers, ...carriers];

export default function CarrierMarquee() {
  return (
    <section
      style={{
        background: "#FFFFFF",
        borderTop: "1px solid rgba(201,168,76,0.12)",
        borderBottom: "1px solid rgba(201,168,76,0.12)",
        padding: "1.5rem 0",
        overflow: "hidden",
      }}
    >
      <div className="text-center mb-4">
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.55rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(201,168,76,0.55)",
          }}
        >
          Trusted Carrier Partners
        </span>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #FFFFFF 40%, transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #FFFFFF 40%, transparent)" }}
        />

        <div
          className="marquee-track"
          style={{ display: "flex", alignItems: "center", gap: 0 }}
        >
          {allCarriers.map((carrier, i) => (
            <div
              key={i}
              className="flex items-center justify-center flex-shrink-0"
              style={{ padding: "0 3rem", height: 64 }}
            >
              <img
                src={carrier.src}
                alt={carrier.name}
                title={carrier.name}
                style={{
                  height: 40,
                  width: "auto",
                  maxWidth: 140,
                  objectFit: "contain",
                  display: "block",
                  filter: "grayscale(20%) opacity(0.85)",
                  transition: "filter 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0%) opacity(1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLImageElement).style.filter = "grayscale(20%) opacity(0.85)";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
