import { useState } from "react";
import { Phone, RotateCcw } from "lucide-react";
import { site } from "@shared/site";
import { emitEvent } from "@/lib/measurement";

type Member = { name: string; title: string; image: string; position: string; focus?: string };
const members: Member[] = [
  { name: "Shaquille Harrison", title: "Team Member", image: "/manus-storage/shaquille_new_bbc2b30c.webp", position: "center top" },
  { name: "Chevaur Harrison", title: "Team Member", image: "/manus-storage/chevaur_new_386101c9.webp", position: "center top" },
  { name: "Raziya Beersingh", title: "Senior Health Advisor", image: "/manus-storage/raziya_professional_headshot_v2_9bc49c0b.png", position: "center 15%", focus: "Group Health Coverage" },
  { name: "Raquel Gray", title: "Team Member", image: "/manus-storage/raquel_1b64a632.webp", position: "center top" },
  { name: "Walter Joseph", title: "Team Member", image: "/manus-storage/walter_new_f4f47bad.webp", position: "center top" },
  { name: "Matthew Grossman", title: "Team Member", image: "/manus-storage/matthew_34bb264f.webp", position: "center top" },
];
function MemberCard({ member }: { member: Member }) {
  const [flipped, setFlipped] = useState(false);
  return <article className="relative" style={{ height: 490, perspective: 1000 }}>
    <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0)", transition: "transform .45s cubic-bezier(.23,1,.32,1)" }}>
      <div className="rounded-xl overflow-hidden" aria-hidden={flipped} inert={flipped} style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", background: "#0A0A0A", border: "1px solid #C9A84C", color: "#FFFFFF" }}>
        <img src={member.image} alt={member.name} loading="lazy" className="w-full object-cover" style={{ height: 330, objectPosition: member.position, background: "#2D2D2D" }} />
        <div className="p-5"><h3 className="text-2xl" style={{ fontFamily: "'Cormorant Garamond',serif" }}>{member.name}</h3><p className="text-sm mt-1" style={{ color: "#E2C97E" }}>{member.title}</p><button type="button" className="mt-4 text-sm underline underline-offset-4" style={{ color: "#FFFFFF" }} onClick={() => setFlipped(true)} aria-label={`View details for ${member.name}`}>View details</button></div>
      </div>
      <div className="rounded-xl flex flex-col justify-between p-7" aria-hidden={!flipped} inert={!flipped} style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: "#0A0A0A", border: "1px solid #C9A84C", color: "#FFFFFF" }}>
        <div><p className="page-eyebrow">Our team</p><h3 className="text-3xl" style={{ fontFamily: "'Cormorant Garamond',serif" }}>{member.name}</h3><p className="mt-2" style={{ color: "#E2C97E" }}>{member.title}</p><div className="my-6" style={{ height: 1, background: "#C9A84C" }} /><p className="leading-7">{member.focus ? `Ask about ${member.focus.toLowerCase()} and the questions relevant to your situation.` : "Bring your coverage questions and current documents to a conversation with our team."}</p><p className="text-sm mt-4" style={{ color: "#D7D7D7" }}>Specific credentials and state availability should be verified before discussing a product.</p></div>
        <div className="space-y-3"><a href={site.phoneHref} className="btn-primary w-full justify-center" onClick={() => emitEvent("click_to_call", { surface: "team" })}><Phone size={15} />Call the team</a><button type="button" className="page-link w-full" style={{ color: "#FFFFFF" }} onClick={() => setFlipped(false)}><RotateCcw size={14} /> Back to photo</button></div>
      </div>
    </div>
  </article>;
}
export default function Team() { return <section id="team" className="page-section" style={{ background: "#FFFFFF" }}><div className="page-shell"><div className="text-center mb-12"><p className="page-eyebrow">Our team</p><h2 className="page-heading">Meet Harrison Health Group.</h2><p className="max-w-xl mx-auto mt-4">Tap or use the keyboard to view card details. Advisor credentials and licensing should be confirmed for your state.</p></div><div className="page-grid">{members.map((member) => <MemberCard key={member.name} member={member} />)}</div></div></section>; }
