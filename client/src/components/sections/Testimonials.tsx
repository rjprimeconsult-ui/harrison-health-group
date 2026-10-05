import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Star } from "lucide-react";
import { site } from "@shared/site";
import { fetchHarrisonGoogleReviews, HARRISON_GOOGLE_MAPS_URL, type GoogleReviewSnapshot } from "@/lib/google-reviews";

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);
  const [snapshot, setSnapshot] = useState<GoogleReviewSnapshot | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "unavailable">("loading");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (typeof IntersectionObserver === "undefined") { setEntered(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setEntered(true); observer.disconnect(); }
    }, { rootMargin: "240px" });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!entered) return;
    let active = true;
    fetchHarrisonGoogleReviews()
      .then((next) => { if (active) { setSnapshot(next); setState("ready"); } })
      .catch(() => { if (active) setState("unavailable"); });
    return () => { active = false; };
  }, [entered]);

  const mapsUrl = snapshot?.mapsUrl || HARRISON_GOOGLE_MAPS_URL;
  return <section ref={sectionRef} id="testimonials" className="page-section google-reviews" aria-labelledby="google-reviews-title">
    <div className="page-shell">
      <div className="google-reviews-header">
        <div>
          <p className="page-eyebrow">In their own words</p>
          <h2 id="google-reviews-title" className="page-heading">The conversation, from their side.</h2>
          <p className="google-reviews-intro">Read comments shared on Harrison Health Group’s Google Business Profile. Reviews are supplied by Google, not written or edited by this website.</p>
        </div>
        <div className="google-reviews-aside">
          {state === "ready" && snapshot?.rating !== null && snapshot?.rating !== undefined &&
            <div className="google-rating" aria-label={`Google rating ${snapshot.rating.toFixed(1)} out of 5 stars${snapshot.ratingCount !== null ? ` from ${snapshot.ratingCount} ratings` : ""}`}>
              <strong>{snapshot.rating.toFixed(1)}</strong>
              <span aria-hidden="true" className="google-rating-stars">{Array.from({ length: 5 }, (_, i) => i < Math.round(snapshot.rating!) ? "★" : "☆").join("")}</span>
              {snapshot.ratingCount !== null && <small>{snapshot.ratingCount} Google {snapshot.ratingCount === 1 ? "rating" : "ratings"}</small>}
            </div>}
          <a className="google-reviews-link" href={mapsUrl} target="_blank" rel="noopener noreferrer">Explore all reviews on Google Maps <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
      </div>

      <div aria-busy={state === "loading"}>
        {state === "loading" && <p className="google-reviews-status" role="status">Loading reviews from Google Maps…</p>}
        {state === "unavailable" && <p className="google-reviews-status" role="status">Live reviews are unavailable right now. You can read the current reviews on Google Maps.</p>}
        {state === "ready" && snapshot && (snapshot.reviews.length ?
          <div className="google-reviews-grid">
            {snapshot.reviews.map((review, index) =>
              <article className="google-review-card" key={`${review.author}-${review.date || index}-${index}`}>
                <div className="google-review-stars" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }, (_, i) => <Star key={i} size={18} aria-hidden="true" fill={i < Math.round(review.rating) ? "currentColor" : "none"} />)}
                </div>
                {review.text ? <blockquote><p>“{review.text}”</p></blockquote> : <p className="google-review-no-text">This reviewer left a star rating without a written comment.</p>}
                <div className="google-review-byline">
                  <div className="google-review-author-group">
                    {review.authorPhotoUrl && (review.authorUrl ? <a href={review.authorUrl} target="_blank" rel="noopener noreferrer" className="google-review-avatar"><img src={review.authorPhotoUrl} alt={`Profile photo of ${review.author}`} width="40" height="40" loading="lazy" referrerPolicy="no-referrer" /></a> : <span className="google-review-avatar"><img src={review.authorPhotoUrl} alt={`Profile photo of ${review.author}`} width="40" height="40" loading="lazy" referrerPolicy="no-referrer" /></span>)}
                    <div>
                      {review.authorUrl ? <a href={review.authorUrl} target="_blank" rel="noopener noreferrer" className="google-review-author">{review.author}<ArrowUpRight size={14} aria-hidden="true" /></a> : <strong className="google-review-author">{review.author}</strong>}
                      {(review.date || review.relativeDate) && <span className="google-review-date">{[review.date, review.relativeDate].filter(Boolean).join(" · ")}</span>}
                    </div>
                  </div>
                  <a href={review.reviewUrl} target="_blank" rel="noopener noreferrer" className="google-review-source" translate="no">View on Google Maps <ArrowUpRight size={14} aria-hidden="true" /></a>
                </div>
              </article>)}
          </div>
        : <p className="google-reviews-status" role="status">Google has not supplied reviews for this listing. See its current ratings and feedback on Google Maps.</p>)}
      </div>
      {state === "ready" && <p className="google-reviews-note">Google supplies this selection ordered by relevance. Harrison Health Group does not filter or reorder it; up to five reviews are shown as returned, including rating-only entries. This is not the complete review history.</p>}
      {state === "ready" && snapshot?.attributions.length ? <p className="google-reviews-attributions">Additional data attribution: {snapshot.attributions.map((source, index) => <span key={`${source.name}-${index}`}>{index > 0 && " · "}{source.url ? <a href={source.url} target="_blank" rel="noopener noreferrer">{source.name}</a> : source.name}</span>)}</p> : null}
      <div className="google-reviews-footer"><div className="google-reviews-brand"><a href={mapsUrl} target="_blank" rel="noopener noreferrer" aria-label="View Harrison Health Group on Google Maps"><img src="/google-maps-logo-white.svg" width="98" height="18" alt="Google Maps" loading="lazy" /></a><span>Reviews are independently submitted by their authors. <a href="https://support.google.com/contributionpolicy/answer/7422880" target="_blank" rel="noopener noreferrer">Learn about Google’s review policy</a>.</span></div><a href={site.reviewUrl} target="_blank" rel="noopener noreferrer">Share your experience on Google <ArrowUpRight size={16} aria-hidden="true" /></a></div>
    </div>
  </section>;
}
