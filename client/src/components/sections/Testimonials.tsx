import { ExternalLink } from "lucide-react";
import { site } from "@shared/site";

export default function Testimonials() {
  return <section id="testimonials" className="page-section" style={{ background: "#FFFFFF" }}><div className="page-shell review-neutral"><p className="page-eyebrow">Reviews</p><h2 className="page-heading">Hear from clients directly.</h2><p className="mt-4 mb-7">Visit the business profile through the link below to explore available feedback or share your experience.</p><a href={site.reviewUrl} target="_blank" rel="noopener noreferrer" className="page-link" style={{ color: "#0A0A0A" }}>Visit the Google link <ExternalLink size={15} /></a></div></section>;
}
