/**
 * HARRISON HEALTH GROUP — Admin Reviews Page
 * Manage reviews: approve, reject, delete, add new ones manually.
 * Accessible at /admin/reviews
 */

import { useState } from "react";
import { useReviews, type Review } from "@/contexts/ReviewContext";
import { Star, Check, X, Trash2, RotateCcw, Plus, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

function StarDisplay({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < count ? "#C9A84C" : "transparent"}
          style={{ color: i < count ? "#C9A84C" : "#555" }}
        />
      ))}
    </div>
  );
}

function AddReviewModal({ onClose }: { onClose: () => void }) {
  const { addReview } = useReviews();
  const [form, setForm] = useState({
    name: "",
    location: "",
    coverage: "",
    stars: 5,
    quote: "",
    source: "manual" as "manual" | "google" | "website",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.quote) return;
    addReview(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.8)" }}>
      <div
        className="w-full max-w-lg rounded-xl p-6"
        style={{ background: "#1A1A1A", border: "1px solid #333" }}
      >
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#fff",
            marginBottom: "1.5rem",
          }}
        >
          Add New Review
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Client Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg text-white"
              style={{ background: "#0A0A0A", border: "1px solid #333" }}
              placeholder="e.g., John D."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Location</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full px-3 py-2 rounded-lg text-white"
                style={{ background: "#0A0A0A", border: "1px solid #333" }}
                placeholder="e.g., Florida"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Coverage Type</label>
              <input
                type="text"
                value={form.coverage}
                onChange={(e) => setForm({ ...form, coverage: e.target.value })}
                className="w-full px-3 py-2 rounded-lg text-white"
                style={{ background: "#0A0A0A", border: "1px solid #333" }}
                placeholder="e.g., Family Plan"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Stars</label>
              <select
                value={form.stars}
                onChange={(e) => setForm({ ...form, stars: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg text-white"
                style={{ background: "#0A0A0A", border: "1px solid #333" }}
              >
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Source</label>
              <select
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value as "manual" | "google" | "website" })}
                className="w-full px-3 py-2 rounded-lg text-white"
                style={{ background: "#0A0A0A", border: "1px solid #333" }}
              >
                <option value="google">Google Review</option>
                <option value="website">Website Submission</option>
                <option value="manual">Manual Entry</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Review Text *</label>
            <textarea
              value={form.quote}
              onChange={(e) => setForm({ ...form, quote: e.target.value })}
              className="w-full px-3 py-2 rounded-lg text-white resize-none"
              style={{ background: "#0A0A0A", border: "1px solid #333", minHeight: "100px" }}
              placeholder="Enter the client's review..."
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg font-semibold text-sm"
              style={{ background: "#C9A84C", color: "#0A0A0A" }}
            >
              Add Review (Pending Approval)
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg text-sm text-gray-400"
              style={{ border: "1px solid #333" }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ReviewCard({
  review,
  onApprove,
  onReject,
  onDelete,
  onRestore,
}: {
  review: Review;
  onApprove: () => void;
  onReject: () => void;
  onDelete: () => void;
  onRestore: () => void;
}) {
  const statusColors = {
    pending: { bg: "rgba(234,179,8,0.15)", text: "#EAB308", label: "Pending" },
    approved: { bg: "rgba(34,197,94,0.15)", text: "#22C55E", label: "Approved" },
    rejected: { bg: "rgba(239,68,68,0.15)", text: "#EF4444", label: "Rejected" },
  };

  const status = statusColors[review.status];

  return (
    <div
      className="rounded-xl p-5 relative"
      style={{ background: "#1A1A1A", border: "1px solid #2A2A2A" }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-white font-semibold text-sm">{review.name}</span>
            <span
              className="px-2 py-0.5 rounded-full text-xs font-medium"
              style={{ background: status.bg, color: status.text }}
            >
              {status.label}
            </span>
            {review.source === "google" && (
              <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: "rgba(66,133,244,0.15)", color: "#4285F4" }}>
                Google
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>{review.location}</span>
            {review.coverage && <span>• {review.coverage}</span>}
            <span>• {new Date(review.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <StarDisplay count={review.stars} />
      </div>

      <p className="text-gray-300 text-sm leading-relaxed mb-4" style={{ fontStyle: "italic" }}>
        "{review.quote}"
      </p>

      <div className="flex gap-2">
        {review.status === "pending" && (
          <>
            <button
              onClick={onApprove}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
              style={{ background: "rgba(34,197,94,0.15)", color: "#22C55E" }}
            >
              <Check size={13} /> Approve
            </button>
            <button
              onClick={onReject}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
              style={{ background: "rgba(239,68,68,0.15)", color: "#EF4444" }}
            >
              <X size={13} /> Reject
            </button>
          </>
        )}
        {review.status === "rejected" && (
          <button
            onClick={onRestore}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
            style={{ background: "rgba(234,179,8,0.15)", color: "#EAB308" }}
          >
            <RotateCcw size={13} /> Restore
          </button>
        )}
        {review.status === "approved" && (
          <button
            onClick={onReject}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
            style={{ background: "rgba(239,68,68,0.15)", color: "#EF4444" }}
          >
            <X size={13} /> Unpublish
          </button>
        )}
        <button
          onClick={onDelete}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ml-auto"
          style={{ background: "rgba(239,68,68,0.08)", color: "#888" }}
        >
          <Trash2 size={13} /> Delete
        </button>
      </div>
    </div>
  );
}

export default function AdminReviews() {
  const {
    approvedReviews,
    pendingReviews,
    rejectedReviews,
    approveReview,
    rejectReview,
    deleteReview,
    restoreReview,
  } = useReviews();

  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "rejected">("pending");

  const tabs = [
    { key: "pending" as const, label: "Pending", count: pendingReviews.length, color: "#EAB308" },
    { key: "approved" as const, label: "Approved", count: approvedReviews.length, color: "#22C55E" },
    { key: "rejected" as const, label: "Rejected", count: rejectedReviews.length, color: "#EF4444" },
  ];

  const currentReviews =
    activeTab === "pending"
      ? pendingReviews
      : activeTab === "approved"
      ? approvedReviews
      : rejectedReviews;

  return (
    <div className="min-h-screen" style={{ background: "#0A0A0A" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between"
        style={{ background: "#0A0A0A", borderBottom: "1px solid #1A1A1A" }}
      >
        <div className="flex items-center gap-4">
          <Link href="/">
            <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer">
              <ArrowLeft size={18} />
              <span className="text-sm">Back to Site</span>
            </div>
          </Link>
          <div className="h-5 w-px bg-gray-700" />
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.3rem",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            Review Management
          </h1>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
          style={{ background: "#C9A84C", color: "#0A0A0A" }}
        >
          <Plus size={16} /> Add Review
        </button>
      </header>

      {/* Stats */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="rounded-xl p-4" style={{ background: "#1A1A1A", border: "1px solid #2A2A2A" }}>
            <div className="text-2xl font-bold text-white">{pendingReviews.length}</div>
            <div className="text-xs text-yellow-500 font-medium">Awaiting Approval</div>
          </div>
          <div className="rounded-xl p-4" style={{ background: "#1A1A1A", border: "1px solid #2A2A2A" }}>
            <div className="text-2xl font-bold text-white">{approvedReviews.length}</div>
            <div className="text-xs text-green-500 font-medium">Published on Site</div>
          </div>
          <div className="rounded-xl p-4" style={{ background: "#1A1A1A", border: "1px solid #2A2A2A" }}>
            <div className="text-2xl font-bold text-white">{rejectedReviews.length}</div>
            <div className="text-xs text-red-500 font-medium">Rejected</div>
          </div>
        </div>

        {/* Google Reviews Link */}
        <div
          className="rounded-xl p-4 mb-6 flex items-center justify-between"
          style={{ background: "rgba(66,133,244,0.08)", border: "1px solid rgba(66,133,244,0.2)" }}
        >
          <div>
            <div className="text-white text-sm font-semibold mb-1">Google Reviews</div>
            <div className="text-gray-400 text-xs">Share this link with clients to collect Google reviews</div>
          </div>
          <a
            href="https://share.google/bSs51zOJBQF8q6ygR"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg text-sm font-medium"
            style={{ background: "#4285F4", color: "#fff" }}
          >
            View Google Reviews
          </a>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: activeTab === tab.key ? "#1A1A1A" : "transparent",
                color: activeTab === tab.key ? tab.color : "#666",
                border: activeTab === tab.key ? `1px solid ${tab.color}33` : "1px solid transparent",
              }}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Review List */}
        <div className="space-y-3">
          {currentReviews.length === 0 ? (
            <div className="text-center py-12 text-gray-500 text-sm">
              No {activeTab} reviews yet.
            </div>
          ) : (
            currentReviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onApprove={() => approveReview(review.id)}
                onReject={() => rejectReview(review.id)}
                onDelete={() => deleteReview(review.id)}
                onRestore={() => restoreReview(review.id)}
              />
            ))
          )}
        </div>
      </div>

      {showAddModal && <AddReviewModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
}
