
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getRequirements } from "@/lib/api";
import type { HiringCategory } from "@/types";
import clsx from "clsx";

type Requirement = {
  _id: string;
  category: HiringCategory;
  status: string;
  createdAt: string;
  eventBasics: {
    eventName: string;
    eventType: string;
    startDate: string;
    endDate?: string;
    location: string;
    venue?: string;
    dateType: string;
  };
};

const CAT_META: Record<HiringCategory, { label: string; icon: string; dot: string }> = {
  planner: { label: "Event Planner", icon: "✦", dot: "bg-sage" },
  performer: { label: "Performer", icon: "◈", dot: "bg-blush" },
  crew: { label: "Crew", icon: "◉", dot: "bg-gold" },
};

const FILTERS: { value: HiringCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "planner", label: "Planners" },
  { value: "performer", label: "Performers" },
  { value: "crew", label: "Crew" },
];

export default function RequirementsPage() {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<HiringCategory | "all">("all");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const cat = filter === "all" ? undefined : filter;
    getRequirements(cat)
      .then((res) => setRequirements(res.data || []))
      .catch(() => setError("Failed to load requirements. Is the backend running?"))
      .finally(() => setLoading(false));
  }, [filter]);

  return (
    <main className="min-h-screen bg-paper">
      {/* Header */}
      <header className="border-b border-surface-3 bg-paper/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-7 h-7 bg-gold flex items-center justify-center">
              <span className="text-paper text-xs font-mono font-bold">EH</span>
            </div>
            <span className="font-display text-xl text-ink tracking-tight">EventHire</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-ink/40 hover:text-ink transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1l6 6-6 6M1 7h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            Post Requirement
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 pt-10 pb-20">
        <div className="mb-8">
          <p className="text-xs font-mono uppercase tracking-widest text-gold mb-2">Browse</p>
          <h1 className="font-display text-4xl text-ink">All Requirements</h1>
          <div className="w-12 h-0.5 bg-gold mt-4" />
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={clsx(
                "px-4 py-2 text-xs font-mono uppercase tracking-widest border transition-all",
                filter === f.value
                  ? "bg-ink text-paper border-ink"
                  : "bg-transparent text-ink/40 border-surface-3 hover:border-ink/30 hover:text-ink/70"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 bg-surface-2 border border-surface-3 animate-pulse" />
            ))}
          </div>
        )}

        {error && (
          <div className="border border-blush/30 bg-blush/5 px-6 py-4 text-sm font-body text-blush">
            {error}
          </div>
        )}

        {!loading && !error && requirements.length === 0 && (
          <div className="text-center py-20">
            <p className="font-display text-2xl text-ink/20 mb-3">No requirements yet</p>
            <p className="text-sm font-body text-ink/30 mb-6">
              Be the first to post a requirement.
            </p>
            <Link
              href="/"
              className="inline-block bg-ink text-paper px-6 py-3 text-xs font-mono uppercase tracking-widest hover:bg-gold hover:text-ink transition-all"
            >
              Post Now
            </Link>
          </div>
        )}

        {!loading && !error && requirements.length > 0 && (
          <div className="flex flex-col gap-4">
            {requirements.map((req, i) => {
              const meta = CAT_META[req.category];
              const date = new Date(req.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              });
              return (
                <div
                  key={req._id}
                  className="group border border-surface-3 bg-surface-1 p-6 hover:border-gold/40 hover:shadow-sm transition-all animate-fade-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={clsx("w-2 h-2 rounded-full flex-shrink-0", meta.dot)} />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-ink/35">
                          {meta.icon} {meta.label}
                        </span>
                        <span className="text-[10px] font-mono text-ink/20">·</span>
                        <span className="text-[10px] font-mono text-ink/25">{date}</span>
                      </div>
                      <h3 className="font-display text-xl text-ink mb-1 truncate">
                        {req.eventBasics.eventName}
                      </h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                        <span className="text-xs font-body text-ink/40 flex items-center gap-1.5">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 4.5c0-2.2 1.8-4 4-4s4 1.8 4 4c0 3-4 7-4 7S2 7.5 2 4.5z" stroke="currentColor" strokeWidth="1" />
                            <circle cx="6" cy="4.5" r="1.2" stroke="currentColor" strokeWidth="1" />
                          </svg>
                          {req.eventBasics.location}
                          {req.eventBasics.venue && ` · ${req.eventBasics.venue}`}
                        </span>
                        <span className="text-xs font-body text-ink/40 flex items-center gap-1.5">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <rect x="1" y="2" width="10" height="9" rx="1" stroke="currentColor" strokeWidth="1" />
                            <path d="M4 1v2M8 1v2M1 5h10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                          </svg>
                          {req.eventBasics.eventType}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={clsx(
                          "text-[10px] font-mono uppercase tracking-widest px-2 py-1",
                          req.status === "active"
                            ? "bg-sage/10 text-sage"
                            : "bg-surface-3 text-ink/30"
                        )}
                      >
                        {req.status}
                      </span>
                      <span className="text-[10px] font-mono text-ink/20 text-right max-w-[140px] truncate">
                        #{req._id.slice(-8)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
