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

// Unverified legacy examples are archived under internal/ and are not bundled or published.
const defaultReviews: Review[] = [];

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

  // Existing browser storage is left intact. Legacy seed records are not shown as real reviews.
  const visibleReviews = reviews.filter((r) => !r.id.startsWith("seed-"));
  const approvedReviews = visibleReviews.filter((r) => r.status === "approved");
  const pendingReviews = visibleReviews.filter((r) => r.status === "pending");
  const rejectedReviews = visibleReviews.filter((r) => r.status === "rejected");

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
