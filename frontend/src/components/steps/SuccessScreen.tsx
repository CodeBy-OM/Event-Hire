"use client";
import type { HiringCategory } from "@/types";
import clsx from "clsx";
import Link from "next/link";

interface Props {
  category: HiringCategory;
  eventName: string;
  requirementId: string;
  onPostAnother: () => void;
}

const CATEGORY_META: Record<HiringCategory, { label: string; color: string; bg: string }> = {
  planner: { label: "Event Planner", color: "text-sage", bg: "bg-sage/10" },
  performer: { label: "Performer", color: "text-blush", bg: "bg-blush/10" },
  crew: { label: "Crew", color: "text-gold-dark", bg: "bg-gold/10" },
};

export default function SuccessScreen({ category, eventName, requirementId, onPostAnother }: Props) {
  const meta = CATEGORY_META[category];

  return (
    <div className="flex flex-col items-center text-center py-8 animate-fade-up space-y-8">
      {/* Animated checkmark */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full bg-gold/10 animate-ping" />
        <div className="relative w-20 h-20 rounded-full bg-gold/15 border-2 border-gold flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M6 16l7 7 13-13"
              stroke="#C9A84C"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="font-display text-4xl text-ink">Requirement Posted!</h2>
        <p className="text-ink/50 font-body text-base max-w-sm mx-auto leading-relaxed">
          Your requirement for <strong className="text-ink font-medium">{eventName}</strong> has been
          successfully published.
        </p>
      </div>

      {/* Category tag */}
      <div className={clsx("inline-flex items-center gap-2 px-4 py-2 rounded-sm", meta.bg)}>
        <span className={clsx("text-sm font-body font-medium", meta.color)}>
          Category: {meta.label}
        </span>
      </div>

      {/* ID */}
      <div className="border border-surface-3 bg-surface-1 px-5 py-3 text-center">
        <p className="text-[10px] font-mono uppercase tracking-widest text-ink/35 mb-1">Reference ID</p>
        <p className="font-mono text-sm text-ink/70">{requirementId}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
        <button
          onClick={onPostAnother}
          className="flex-1 border-2 border-ink text-ink px-6 py-3.5 font-body text-sm uppercase tracking-wider hover:bg-ink hover:text-paper transition-all"
        >
          Post Another
        </button>
        <Link
          href="/requirements"
          className="flex-1 bg-gold text-ink px-6 py-3.5 font-body text-sm uppercase tracking-wider text-center hover:bg-gold-dark hover:text-paper transition-all font-medium"
        >
          View All
        </Link>
      </div>
    </div>
  );
}
