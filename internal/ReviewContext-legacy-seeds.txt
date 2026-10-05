/**
 * HARRISON HEALTH GROUP — Review Management Context
 * Manages reviews with localStorage persistence.
 * Supports: pending, approved, rejected statuses.
 * Admin can approve/reject reviews before they appear publicly.
 */

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export interface Review {
  id: string;
  name: string;
  location: string;
  coverage: string;
  stars: number;
  quote: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  source: "manual" | "google" | "website";
}

interface ReviewContextType {
  reviews: Review[];
  approvedReviews: Review[];
  pendingReviews: Review[];
  rejectedReviews: Review[];
  addReview: (review: Omit<Review, "id" | "status" | "createdAt">) => void;
  approveReview: (id: string) => void;
  rejectReview: (id: string) => void;
  deleteReview: (id: string) => void;
  restoreReview: (id: string) => void;
}

const ReviewContext = createContext<ReviewContextType | null>(null);

const STORAGE_KEY = "hhg_reviews";

// Default seed reviews (pre-approved)
const defaultReviews: Review[] = [
  {
    id: "seed-1",
    name: "Maria G.",
    location: "Florida",
    coverage: "Family Health Plan",
    stars: 5,
    quote: "Rafael helped me find a plan that saved my family $400/month. Highly recommend! The process was seamless and they truly had our best interest at heart.",
    status: "approved",
    createdAt: "2025-08-15T10:00:00Z",
    source: "google",
  },
  {
    id: "seed-2",
    name: "James T.",
    location: "Texas",
    coverage: "Individual Health Plan",
    stars: 5,
    quote: "I was completely lost navigating the health insurance marketplace. Harrison Health Group made it simple and found me a plan with better coverage for less money.",
    status: "approved",
    createdAt: "2025-09-20T14:30:00Z",
    source: "google",
  },
  {
    id: "seed-3",
    name: "Sandra M.",
    location: "Georgia",
    coverage: "Small Business Group Plan",
    stars: 5,
    quote: "As a small business owner, I needed group health benefits to attract good employees. They built us a package that was affordable and competitive. Excellent service.",
    status: "approved",
    createdAt: "2025-10-05T09:15:00Z",
    source: "google",
  },
  {
    id: "seed-4",
    name: "David R.",
    location: "North Carolina",
    coverage: "Private PPO Plan",
    stars: 5,
    quote: "Shaquille walked me through every private plan option with patience and expertise. I felt confident in my decision and saved significantly on my monthly premium.",
    status: "approved",
    createdAt: "2025-11-12T16:45:00Z",
    source: "google",
  },
  {
    id: "seed-5",
    name: "Lisa P.",
    location: "South Carolina",
    coverage: "Self-Employed Plan",
    stars: 5,
    quote: "Being self-employed, I always dreaded open enrollment. Harrison Health Group turned it into a 30-minute call and I ended up with better coverage than before.",
    status: "approved",
    createdAt: "2025-12-01T11:00:00Z",
    source: "google",
  },
  {
    id: "seed-6",
    name: "Carlos V.",
    location: "Illinois",
    coverage: "Individual & Dental Bundle",
    stars: 5,
    quote: "The team is incredibly knowledgeable and responsive. They answered every question and followed up to make sure I was happy with my coverage. Five stars.",
    status: "approved",
    createdAt: "2026-01-18T08:30:00Z",
    source: "google",
  },
];

export function ReviewProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore parse errors
    }
    return defaultReviews;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  }, [reviews]);

  const approvedReviews = reviews.filter((r) => r.status === "approved");
  const pendingReviews = reviews.filter((r) => r.status === "pending");
  const rejectedReviews = reviews.filter((r) => r.status === "rejected");

  const addReview = (review: Omit<Review, "id" | "status" | "createdAt">) => {
    const newReview: Review = {
      ...review,
      id: `review-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  const approveReview = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "approved" } : r))
    );
  };

  const rejectReview = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "rejected" } : r))
    );
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const restoreReview = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "pending" } : r))
    );
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        approvedReviews,
        pendingReviews,
        rejectedReviews,
        addReview,
        approveReview,
        rejectReview,
        deleteReview,
        restoreReview,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error("useReviews must be used within a ReviewProvider");
  }
  return context;
}
