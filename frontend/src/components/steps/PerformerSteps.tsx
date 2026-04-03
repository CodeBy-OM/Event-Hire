"use client";
import { useForm } from "react-hook-form";
import { Input, Select, Textarea, Toggle } from "@/components/ui/FormControls";
import type { PerformerDetails } from "@/types";

const PERFORMER_TYPES = [
  { value: "Band", label: "Live Band" },
  { value: "DJ", label: "DJ" },
  { value: "Solo Artist", label: "Solo Artist / Singer" },
  { value: "Dancer", label: "Dancer / Dance Troupe" },
  { value: "Comedian", label: "Stand-up Comedian" },
  { value: "Magician", label: "Magician / Illusionist" },
  { value: "Speaker", label: "Keynote Speaker" },
  { value: "Other", label: "Other" },
];

const DURATION_OPTIONS = [
  { value: "30 mins", label: "30 minutes" },
  { value: "1 hour", label: "1 hour" },
  { value: "1.5 hours", label: "1.5 hours" },
  { value: "2 hours", label: "2 hours" },
  { value: "3 hours", label: "3 hours" },
  { value: "Full day", label: "Full day" },
  { value: "Multiple sets", label: "Multiple sets" },
];

const BUDGET_RANGES = [
  { value: "Under ₹25K", label: "Under ₹25,000" },
  { value: "₹25K–₹75K", label: "₹25,000 – ₹75,000" },
  { value: "₹75K–₹2L", label: "₹75,000 – ₹2,00,000" },
  { value: "₹2L–₹10L", label: "₹2,00,000 – ₹10,00,000" },
  { value: "Above ₹10L", label: "Above ₹10,00,000" },
  { value: "Discuss", label: "Prefer to discuss" },
];

const STYLES = [
  { value: "Upbeat & Energetic", label: "Upbeat & Energetic" },
  { value: "Elegant & Soulful", label: "Elegant & Soulful" },
  { value: "Retro & Nostalgic", label: "Retro & Nostalgic" },
  { value: "Contemporary", label: "Contemporary" },
  { value: "Traditional / Folk", label: "Traditional / Folk" },
  { value: "Fusion", label: "Fusion" },
];

interface Props {
  defaultValues?: Partial<PerformerDetails>;
  onNext: (data: PerformerDetails) => void;
  onBack: () => void;
  stepLabel: string;
}

export default function PerformerSteps({ defaultValues, onNext, onBack, stepLabel }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PerformerDetails>({
    defaultValues: {
      equipmentProvided: false,
      ...defaultValues,
    },
  });

  const equipmentProvided = watch("equipmentProvided") ?? false;

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-8 animate-step-slide">
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-gold mb-1">{stepLabel}</p>
        <h2 className="font-display text-3xl text-ink mb-1">Performer Requirements</h2>
        <p className="text-ink/50 font-body text-sm">Define the act you need to make your event unforgettable.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Select
            label="Type of Performer"
            placeholder="Select performer type"
            required
            options={PERFORMER_TYPES}
            value={watch("performerType") || ""}
            error={errors.performerType?.message}
            {...register("performerType", { required: "Performer type is required" })}
          />
        </div>

        <Input
          label="Genre / Style of Music or Art"
          placeholder="e.g. Bollywood, Jazz, Classical, Hip-Hop"
          hint="Be specific for better matches"
          {...register("genre")}
        />

        <Select
          label="Performance Duration"
          placeholder="Select duration"
          required
          options={DURATION_OPTIONS}
          value={watch("performanceDuration") || ""}
          error={errors.performanceDuration?.message}
          {...register("performanceDuration", { required: "Duration is required" })}
        />

        <Input
          label="Number of Performers"
          type="number"
          placeholder="e.g. 1, 5, 10"
          hint="Total headcount needed"
          {...register("numberOfPerformers", { min: { value: 1, message: "At least 1" } })}
          error={errors.numberOfPerformers?.message}
        />

        <Select
          label="Budget Range"
          placeholder="Select budget"
          required
          options={BUDGET_RANGES}
          value={watch("budgetRange") || ""}
          error={errors.budgetRange?.message}
          {...register("budgetRange", { required: "Budget is required" })}
        />

        <div className="md:col-span-2 bg-surface-2 p-4 border border-surface-3">
          <Toggle
            label="Equipment / Sound System Provided by Us"
            hint="Toggle on if you will supply PA system, mics, stage setup etc."
            checked={equipmentProvided}
            onChange={(val) => setValue("equipmentProvided", val)}
          />
        </div>

        <div className="md:col-span-2">
          <Select
            label="Preferred Style / Vibe"
            placeholder="Select vibe"
            options={STYLES}
            value={watch("preferredStyle") || ""}
            {...register("preferredStyle")}
          />
        </div>

        <div className="md:col-span-2">
          <Input
            label="Previous Experience Expected"
            placeholder="e.g. Min. 5 years, performed at 5-star venues"
            {...register("previousExperience")}
          />
        </div>

        <div className="md:col-span-2">
          <Textarea
            label="Special Requirements"
            placeholder="Stage setup, lighting, sound checks, rider requirements, special effects..."
            hint="Optional — technical and rider details are helpful"
            rows={4}
            {...register("specialRequirements")}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 border border-surface-3 text-ink/50 px-6 py-4 font-body text-sm uppercase tracking-wider hover:border-ink/30 hover:text-ink transition-all"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
        <button
          type="submit"
          className="group flex items-center gap-3 bg-ink text-paper px-8 py-4 font-body font-medium text-sm uppercase tracking-wider hover:bg-gold transition-colors duration-200"
        >
          Review & Submit
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-1 transition-transform">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </form>
  );
}
