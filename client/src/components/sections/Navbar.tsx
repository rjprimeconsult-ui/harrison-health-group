import { useEffect, useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { site } from "@shared/site";
import { emitEvent } from "@/lib/measurement";

const primary = [
  { label: "Home", href: "/" },
  { label: "Coverage", href: "/#coverage" },
  { label: "Business", href: "/business" },
  { label: "Resources", href: "/resources" },
  { label: "FAQ", href: "/faq" },
];
const company = [
  { label: "Our Team", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({ onQuoteClick }: { onQuoteClick?: () => void }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("popstate", close);
    return () => window.removeEventListener("popstate", close);
  }, []);
  return (
    <header className="site-nav">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <nav className="container nav-inner" aria-label="Main navigation">
        <a className="brand-lockup" href="/" aria-label="Harrison Health Group — Home" onClick={() => setOpen(false)}>
          <img src="/favicon-192x192.png" width="42" height="42" alt="" />
          <span className="brand-words"><strong>Harrison Health</strong><small>GROUP</small></span>
        </a>
        <div className="nav-desktop">
          {primary.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
          <details className="nav-company">
            <summary>Company <ChevronDown size={13} aria-hidden="true" /></summary>
            <div className="nav-company-menu">{company.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}</div>
          </details>
        </div>
        <div className="nav-actions">
          <a className="nav-phone" href={site.phoneHref} onClick={() => emitEvent("click_to_call", { surface: "nav" })}><Phone size={14} aria-hidden="true" />{site.phoneDisplay}</a>
          {onQuoteClick ? <button className="btn-primary nav-quote" onClick={onQuoteClick}>Request a Quote</button> : <a className="btn-primary nav-quote" href="/contact">Get in Touch</a>}
        </div>
        <button className="nav-menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X size={26} /> : <Menu size={26} />}</button>
      </nav>
      <div id="mobile-navigation" className={`nav-mobile ${open ? "is-open" : ""}`} hidden={!open}>
        {[...primary, ...company].map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
        <a href={site.phoneHref} onClick={() => emitEvent("click_to_call", { surface: "mobile_nav" })}>{site.phoneDisplay}</a>
        {onQuoteClick ? <button className="btn-primary" onClick={() => { setOpen(false); onQuoteClick(); }}>Request a Quote</button> : <a className="btn-primary" href="/contact">Get in Touch</a>}
      </div>
    </header>
  );
}
