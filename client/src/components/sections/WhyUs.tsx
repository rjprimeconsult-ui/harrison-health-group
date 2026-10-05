import { FileSearch, MessagesSquare, ClipboardCheck } from "lucide-react";

const steps = [
  { icon: MessagesSquare, title: "Start with your situation", text: "Tell us who needs coverage, where you live, and what questions you want answered. Keep sensitive medical details off the public form." },
  { icon: FileSearch, title: "Review the actual documents", text: "Compare the applicable costs, care-access rules, and policy terms for any specific option being considered. Availability must be confirmed for your state." },
  { icon: ClipboardCheck, title: "Know the next step", text: "Ask about timing, requirements, and who is responsible for each part of the process before you make a decision." },
];
export default function WhyUs() { return <section id="why-us" className="page-section" style={{ background: "#FFFFFF" }}><div className="page-shell"><div className="text-center mb-10"><p className="page-eyebrow">Why talk with us</p><h2 className="page-heading">A clearer way to begin.</h2><p className="max-w-xl mx-auto mt-4">A conversation should make the decision easier to understand—not bury the important questions.</p></div><div className="page-grid">{steps.map(({ icon: Icon, title, text }) => <div className="editorial-card" key={title}><Icon size={28} color="#9B772C" aria-hidden="true" /><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>; }
