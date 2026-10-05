import { site } from "@shared/site";
import { loadGoogleMaps } from "@/components/Map";

// Verified against the owner-provided Google link and Google Places identity fields:
// Harrison Health Group, 1550 Sawgrass Corporate Pkwy, Sunrise, FL 33323,
// (954) 600-0342, https://harrisonhealthgroup.com/.
export const HARRISON_PLACE_ID = "ChIJhzfl-t8J2YgRtQtGVKrF4mg";
export const HARRISON_GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=Harrison%20Health%20Group&query_place_id=${HARRISON_PLACE_ID}`;
export const GOOGLE_REVIEWS_TIMEOUT_MS = 12_000;

type ListingIdentity = Pick<google.maps.places.Place, "id" | "displayName" | "formattedAddress" | "websiteURI">;
type ReviewWithMapsUri = google.maps.places.Review & { googleMapsURI?: string | null };

export interface LiveGoogleReview {
  author: string;
  authorUrl: string | null;
  authorPhotoUrl: string | null;
  reviewUrl: string;
  rating: number;
  text: string | null;
  date: string | null;
  relativeDate: string | null;
}

export interface GoogleReviewSnapshot {
  rating: number | null;
  ratingCount: number | null;
  reviews: LiveGoogleReview[];
  mapsUrl: string;
  attributions: { name: string; url: string | null }[];
}

function parseHttpsUrl(value: string | null | undefined): URL | null {
  if (!value) return null;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" && !parsed.username && !parsed.password ? parsed : null;
  } catch {
    return null;
  }
}

function hasAllowedSuffix(host: string, suffix: string): boolean {
  return host === suffix || host.endsWith(`.${suffix}`);
}

/** Accepts provider links that may be hosted outside Google, but never credentials or a non-HTTPS protocol. */
export function safeExternalUrl(value: string | null | undefined): string | null {
  return parseHttpsUrl(value)?.href || null;
}

/** Google Maps/profile links from the API must remain on a Google-owned host. */
export function safeGoogleMapsUrl(value: string | null | undefined): string | null {
  const parsed = parseHttpsUrl(value);
  return parsed && hasAllowedSuffix(parsed.hostname.toLowerCase(), "google.com") ? parsed.href : null;
}

/** Author thumbnails are supplied from Google content domains only. */
export function safeGoogleAvatarUrl(value: string | null | undefined): string | null {
  const parsed = parseHttpsUrl(value);
  if (!parsed) return null;
  const host = parsed.hostname.toLowerCase();
  return hasAllowedSuffix(host, "googleusercontent.com") || hasAllowedSuffix(host, "ggpht.com") ? parsed.href : null;
}

export function isHarrisonListing(place: ListingIdentity): boolean {
  try {
    const host = new URL(place.websiteURI || "").hostname.replace(/^www\./, "").toLowerCase();
    return place.id === HARRISON_PLACE_ID
      && place.displayName?.trim().toLowerCase() === site.name.toLowerCase()
      && /sunrise,\s*fl\s*33323/i.test(place.formattedAddress || "")
      && host === "harrisonhealthgroup.com";
  } catch {
    return false;
  }
}

export function toGoogleReviewSnapshot(place: google.maps.places.Place): GoogleReviewSnapshot {
  if (!isHarrisonListing(place)) throw new Error("The Google listing identity did not match Harrison Health Group");

  const reviews = (place.reviews || []).flatMap((rawReview) => {
    const review = rawReview as ReviewWithMapsUri;
    const author = review.authorAttribution?.displayName?.trim();
    const text = review.text?.trim();
    const rating = review.rating;
    const reviewUrl = safeGoogleMapsUrl(review.googleMapsURI);
    // Google requires direct access to the individual source review. Do not display any item without it.
    if (!author || !reviewUrl || typeof rating !== "number" || rating < 1 || rating > 5) return [];
    return [{
      author,
      authorUrl: safeGoogleMapsUrl(review.authorAttribution?.uri),
      authorPhotoUrl: safeGoogleAvatarUrl(review.authorAttribution?.photoURI),
      reviewUrl,
      rating,
      text: text || null,
      date: review.publishTime instanceof Date && !Number.isNaN(review.publishTime.valueOf())
        ? new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(review.publishTime)
        : null,
      relativeDate: review.relativePublishTimeDescription?.trim() || null,
    }];
  }).slice(0, 5);

  const rating = place.rating;
  const ratingCount = place.userRatingCount;
  return {
    rating: typeof rating === "number" && rating >= 1 && rating <= 5 ? rating : null,
    ratingCount: typeof ratingCount === "number" && Number.isInteger(ratingCount) && ratingCount >= 0 ? ratingCount : null,
    reviews,
    mapsUrl: safeGoogleMapsUrl(place.googleMapsURI) || HARRISON_GOOGLE_MAPS_URL,
    attributions: (place.attributions || []).filter((item) => !!item.provider).map((item) => ({
      name: item.provider!, url: safeExternalUrl(item.providerURI),
    })),
  };
}

function withTimeout<T>(work: Promise<T>, milliseconds = GOOGLE_REVIEWS_TIMEOUT_MS): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error("Google review request timed out")), milliseconds);
    work.then(resolve, reject).finally(() => window.clearTimeout(timer));
  });
}

export async function fetchHarrisonGoogleReviews(): Promise<GoogleReviewSnapshot> {
  return withTimeout((async () => {
    await loadGoogleMaps();
    const { Place } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
    const place = new Place({ id: HARRISON_PLACE_ID });
    await place.fetchFields({
      fields: ["displayName", "formattedAddress", "websiteURI", "rating", "userRatingCount", "reviews", "googleMapsURI"],
    });
    return toGoogleReviewSnapshot(place);
  })());
}
