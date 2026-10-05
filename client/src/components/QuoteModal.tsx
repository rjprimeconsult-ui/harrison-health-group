import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import LeadForm from "./LeadForm";

export default function QuoteModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!isOpen) return;
    triggerRef.current = document.activeElement as HTMLElement;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", escape);
    closeRef.current?.focus();
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", escape); triggerRef.current?.focus(); };
  }, [isOpen, onClose]);
  const trapFocus = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !dialogRef.current) return;
    const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled])')).filter((element) => element.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5" role="presentation">
    <div className="absolute inset-0" style={{ background: "rgba(0,0,0,.88)" }} onClick={onClose} aria-hidden="true" />
    <div ref={dialogRef} onKeyDown={trapFocus} className="relative w-full max-w-2xl max-h-[94dvh] overflow-y-auto rounded-xl form-dark" style={{ background: "#0A0A0A", color: "#FFFFFF", border: "1px solid #C9A84C", boxShadow: "0 28px 75px rgba(0,0,0,.5)" }} role="dialog" aria-modal="true" aria-label="Request private health coverage guidance">
      <div className="p-5 sm:p-8">
        <div className="flex items-start justify-between gap-3 mb-5"><div><span className="page-eyebrow">Harrison Health Group</span><h2 className="text-3xl sm:text-4xl" style={{ fontFamily: "'Cormorant Garamond',serif" }}>Request a coverage conversation</h2><p className="text-sm mt-2" style={{ color: "#D7D7D7" }}>Share the basics so our team can follow up about your request.</p></div><button ref={closeRef} type="button" onClick={onClose} aria-label="Close quote form" className="inline-flex shrink-0 items-center justify-center w-11 h-11 rounded-full" style={{ border: "1px solid #C9A84C", color: "#FFFFFF" }}><X size={20} /></button></div>
        <LeadForm kind="consumer" />
      </div>
    </div>
  </div>;
}
