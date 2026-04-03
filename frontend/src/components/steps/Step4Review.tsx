"use client";
import { useState } from "react";
import type { FormData, HiringCategory } from "@/types";
import clsx from "clsx";
import { submitRequirement } from "@/lib/api";
import toast from "react-hot-toast";

interface Props {
  formData: FormData;
  category: HiringCategory;
  onBack: () => void;
  onSuccess: (id: string) => void;
}

const CATEGORY_LABELS: Record<HiringCategory, { label: string; icon: string; color: string }> = {
  planner: { label: "Event Planner", icon: "✦", color: "text-sage" },
  performer: { label: "Performer", icon: "◈", color: "text-blush" },
  crew: { label: "Crew", icon: "◉", color: "text-gold" },
};

function ReviewSection({ title, data }: { title: string; data: Record<string, unknown> }) {
  const entries = Object.entries(data).filter(
    ([, v]) => v !== undefined && v !== null && v !== "" && !(Array.isArray(v) && v.length === 0)
  );
  if (entries.length === 0) return null;

  return (
    <div className="border border-surface-3 bg-surface-1">
      <div className="px-5 py-3 border-b border-surface-3 bg-surface-2">
        <h3 className="font-mono text-xs uppercase tracking-widest text-ink/50">{title}</h3>
      </div>
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {entries.map(([key, value]) => (
          <div key={key} className="flex flex-col gap-0.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-ink/35">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </span>
            <span className="text-sm font-body text-ink">
              {Array.isArray(value) ? value.join(", ") : String(value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Step4Review({ formData, category, onBack, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const cat = CATEGORY_LABELS[category];

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        category,
        eventBasics: formData.eventBasics,
        ...(category === "planner" && { plannerDetails: formData.plannerDetails }),
        ...(category === "performer" && { performerDetails: formData.performerDetails }),
        ...(category === "crew" && { crewDetails: formData.crewDetails }),
      };
      const res = await submitRequirement(payload);
      toast.success("Requirement posted successfully!");
      onSuccess(res.data._id);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { error?: string } } })?.response?.data?.error ||
        "Failed to submit. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const { eventBasics, plannerDetails, performerDetails, crewDetails } = formData;

  return (
    <div className="space-y-8 animate-step-slide">
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-gold mb-1">Step 4 — Review</p>
        <h2 className="font-display text-3xl text-ink mb-1">Review Your Requirement</h2>
        <p className="text-ink/50 font-body text-sm">Double-check everything before posting.</p>
      </div>

      {/* Category badge */}
      <div className={clsx("inline-flex items-center gap-2 px-4 py-2 border border-surface-3 bg-surface-2")}>
        <span className={clsx("text-lg", cat.color)}>{cat.icon}</span>
        <span className="font-body text-sm font-medium text-ink">Hiring for: {cat.label}</span>
      </div>

      <div className="space-y-4">
        <ReviewSection
          title="Event Basics"
          data={{
            "Event Name": eventBasics.eventName,
            "Event Type": eventBasics.eventType,
            "Date": eventBasics.dateType === "range"
              ? `${eventBasics.startDate} → ${eventBasics.endDate}`
              : eventBasics.startDate,
            "Location": eventBasics.location,
            "Venue": eventBasics.venue,
          }}
        />

        {category === "planner" && plannerDetails && (
          <ReviewSection
            title="Planner Details"
            data={{
              "Planner Type": plannerDetails.plannerType,
              "Guest Count": plannerDetails.guestCount,
              "Budget": plannerDetails.budget,
              "Services Needed": plannerDetails.servicesNeeded,
              "Experience": plannerDetails.experienceRequired,
              "Urgency": plannerDetails.urgency,
              "Contact Method": plannerDetails.preferredContactMethod,
              "Notes": plannerDetails.additionalNotes,
            }}
          />
        )}

        {category === "performer" && performerDetails && (
          <ReviewSection
            title="Performer Details"
            data={{
              "Performer Type": performerDetails.performerType,
              "Genre": performerDetails.genre,
              "Duration": performerDetails.performanceDuration,
              "No. of Performers": performerDetails.numberOfPerformers,
              "Budget Range": performerDetails.budgetRange,
              "Equipment Provided": performerDetails.equipmentProvided ? "Yes" : "No",
              "Preferred Style": performerDetails.preferredStyle,
              "Experience": performerDetails.previousExperience,
              "Special Requirements": performerDetails.specialRequirements,
            }}
          />
        )}

        {category === "crew" && crewDetails && (
          <ReviewSection
            title="Crew Details"
            data={{
              "Crew Type": crewDetails.crewType,
              "Number Needed": crewDetails.numberOfCrewNeeded,
              "Shift Duration": crewDetails.shiftDuration,
              "Experience Level": crewDetails.experienceLevel,
              "Budget Per Person": crewDetails.budgetPerPerson,
              "Certifications": crewDetails.certificationsRequired,
              "Equipment": crewDetails.equipmentFamiliarity,
              "Uniform Required": crewDetails.uniformRequired ? "Yes" : "No",
              "Briefing Time": crewDetails.briefingTime,
            }}
          />
        )}
      </div>

      {/* Disclaimer */}
      <div className="border-l-2 border-gold/40 pl-4 py-1">
        <p className="text-xs font-body text-ink/40 leading-relaxed">
          By submitting, you confirm this requirement will be posted on the EventHire platform
          and matched with relevant professionals in your category.
        </p>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="flex items-center gap-2 border border-surface-3 text-ink/50 px-6 py-4 font-body text-sm uppercase tracking-wider hover:border-ink/30 hover:text-ink transition-all disabled:opacity-40"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className={clsx(
            "group flex items-center gap-3 px-8 py-4 font-body font-medium text-sm uppercase tracking-wider transition-all",
            loading
              ? "bg-gold/50 text-paper cursor-not-allowed"
              : "bg-gold text-ink hover:bg-gold-dark hover:text-paper"
          )}
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-paper/40 border-t-paper rounded-full animate-spin" />
              Posting...
            </>
          ) : (
            <>
              Post Requirement
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-1 transition-transform">
                <path d="M8 2l6 6-6 6M14 8H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
