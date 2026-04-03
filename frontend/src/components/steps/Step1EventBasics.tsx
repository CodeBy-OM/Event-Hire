"use client";
import { useForm } from "react-hook-form";
import { Input, Select, Textarea } from "@/components/ui/FormControls";
import type { EventBasics, HiringCategory } from "@/types";
import clsx from "clsx";

const EVENT_TYPES = [
  { value: "Wedding", label: "Wedding" },
  { value: "Corporate", label: "Corporate" },
  { value: "Birthday", label: "Birthday" },
  { value: "Concert", label: "Concert" },
  { value: "Festival", label: "Festival" },
  { value: "Conference", label: "Conference" },
  { value: "Other", label: "Other" },
];

const HIRING_OPTIONS: { value: HiringCategory; label: string; icon: string; desc: string }[] = [
  { value: "planner", label: "Event Planner", icon: "✦", desc: "Coordinate every detail" },
  { value: "performer", label: "Performer", icon: "◈", desc: "Musicians, DJs, artists & more" },
  { value: "crew", label: "Crew", icon: "◉", desc: "Technical & operational staff" },
];

interface Step1Props {
  defaultValues?: Partial<EventBasics>;
  onNext: (data: EventBasics) => void;
}

export default function Step1EventBasics({ defaultValues, onNext }: Step1Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EventBasics>({
    defaultValues: {
      dateType: "single",
      hiringFor: defaultValues?.hiringFor,
      ...defaultValues,
    },
  });

  const dateType = watch("dateType");
  const hiringFor = watch("hiringFor");

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-8 animate-step-slide">
      <div>
        <h2 className="font-display text-3xl text-ink mb-1">Event Details</h2>
        <p className="text-ink/50 font-body text-sm">Tell us about your event so we can find the right people.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Input
            label="Event Name"
            placeholder="e.g. Sarah & James Wedding Reception"
            required
            error={errors.eventName?.message}
            {...register("eventName", { required: "Event name is required" })}
          />
        </div>

        <Select
          label="Event Type"
          placeholder="Select type"
          required
          options={EVENT_TYPES}
          value={watch("eventType") || ""}
          error={errors.eventType?.message}
          {...register("eventType", { required: "Event type is required" })}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-mono uppercase tracking-widest text-ink/50">
            Date Type
          </label>
          <div className="flex gap-3 mt-1">
            {["single", "range"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setValue("dateType", t as "single" | "range")}
                className={clsx(
                  "flex-1 py-2.5 text-sm font-body border transition-all",
                  dateType === t
                    ? "bg-gold/10 border-gold text-gold-dark font-medium"
                    : "border-surface-3 text-ink/40 hover:border-gold/40"
                )}
              >
                {t === "single" ? "Single Day" : "Multi-Day"}
              </button>
            ))}
          </div>
        </div>

        <Input
          label={dateType === "range" ? "Start Date" : "Event Date"}
          type="date"
          required
          error={errors.startDate?.message}
          {...register("startDate", { required: "Date is required" })}
        />

        {dateType === "range" && (
          <Input
            label="End Date"
            type="date"
            error={errors.endDate?.message}
            {...register("endDate", {
              validate: (val) => {
                const start = watch("startDate");
                if (start && val && val < start) return "End date must be after start date";
                return true;
              },
            })}
          />
        )}

        <div className="md:col-span-2">
          <Input
            label="Location / City"
            placeholder="e.g. Mumbai, Maharashtra"
            required
            error={errors.location?.message}
            {...register("location", { required: "Location is required" })}
          />
        </div>

        <div className="md:col-span-2">
          <Input
            label="Venue (optional)"
            placeholder="e.g. The Grand Hyatt"
            hint="Leave blank if not yet decided"
            {...register("venue")}
          />
        </div>
      </div>

      {/* Hiring For Section */}
      <div className="flex flex-col gap-3">
        <label className="text-xs font-mono uppercase tracking-widest text-ink/50">
          I am hiring for <span className="text-gold">*</span>
        </label>
        {errors.hiringFor && (
          <p className="text-xs text-blush font-body">{errors.hiringFor.message}</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {HIRING_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setValue("hiringFor", opt.value, { shouldValidate: true })}
              className={clsx(
                "relative p-5 border-2 text-left transition-all duration-200 group",
                hiringFor === opt.value
                  ? "border-gold bg-gold/5 shadow-[inset_0_0_0_1px_#C9A84C20]"
                  : "border-surface-3 hover:border-gold/40 hover:bg-surface-1"
              )}
            >
              <span
                className={clsx(
                  "text-2xl block mb-2 transition-colors",
                  hiringFor === opt.value ? "text-gold" : "text-ink/20 group-hover:text-gold/50"
                )}
              >
                {opt.icon}
              </span>
              <span className="font-display text-lg block text-ink">{opt.label}</span>
              <span className="text-xs font-body text-ink/40 mt-0.5 block">{opt.desc}</span>
              {hiringFor === opt.value && (
                <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-gold flex items-center justify-center">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1.5 4l2 2 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
        {/* Hidden input for validation */}
        <input
          type="hidden"
          {...register("hiringFor", { required: "Please select what you are hiring for" })}
        />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="group flex items-center gap-3 bg-ink text-paper px-8 py-4 font-body font-medium text-sm uppercase tracking-wider hover:bg-gold transition-colors duration-200"
        >
          Continue
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-1 transition-transform">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </form>
  );
}
