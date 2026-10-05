import { ExternalLink, Mail, Phone } from "lucide-react";
import { site } from "@shared/site";
import { emitEvent } from "@/lib/measurement";

const groups = [
  { title: "Explore", links: [["Home", "/"], ["Private coverage", "/#coverage"], ["Business coverage", "/business"], ["Contact", "/contact"]] },
  { title: "Learn", links: [["Resources", "/resources"], ["Coverage questions", "/faq"], ["Our team", "/about"], ["Careers", "/careers"]] },
  { title: "Site", links: [["Privacy information", "/privacy"], ["Website use", "/terms"], ["Sitemap", "/sitemap.xml"]] },
] as const;

export default function Footer() {
  return <footer style={{ background: "#FFFFFF", borderTop: "1px solid rgba(201,168,76,.35)", color: "#0A0A0A" }}>
    <div className="container py-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_repeat(3,1fr)] gap-10">
        <div><a href="/" className="brand-lockup mb-5"><img src="/favicon-192x192.png" width="42" height="42" alt="" /><span className="brand-words"><strong>Harrison Health</strong><small>GROUP</small></span></a><p className="text-sm leading-7 max-w-xs">A conversation about private health coverage begins with your situation and the questions that matter to you.</p><a href={site.phoneHref} className="flex items-center gap-2 mt-5 text-sm" onClick={() => emitEvent("click_to_call", { surface: "footer" })}><Phone size={15} />{site.phoneDisplay}</a><a href={`mailto:${site.email}`} className="flex items-center gap-2 mt-3 text-sm"><Mail size={15} />{site.email}</a></div>
        {groups.map((group) => <div key={group.title}><h2 className="page-eyebrow">{group.title}</h2><ul className="space-y-3">{group.links.map(([label, href]) => <li key={href}><a href={href} className="text-sm no-underline hover:underline" style={{ color: "#0A0A0A" }}>{label}</a></li>)}</ul></div>)}
      </div>
      <div className="mt-12 pt-7 flex flex-col md:flex-row justify-between gap-5 text-xs leading-6" style={{ borderTop: "1px solid #DED4B4" }}><p>© {new Date().getFullYear()} {site.name}. Not a government website. Product availability and advisor licensing must be confirmed for your state before discussing a specific plan.</p><a href="https://nipr.com/" target="_blank" rel="noopener noreferrer" className="inline-flex gap-1 items-center shrink-0" style={{ color: "#795E20" }}>Insurance license lookup <ExternalLink size={12} /></a></div>
    </div>
  </footer>;
}
