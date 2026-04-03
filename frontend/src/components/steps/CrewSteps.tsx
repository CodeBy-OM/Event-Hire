"use client";
import { useForm } from "react-hook-form";
import { Input, Select, Textarea, CheckboxGroup, Toggle } from "@/components/ui/FormControls";
import type { CrewDetails } from "@/types";

const CREW_TYPES = [
  { value: "AV Technician", label: "AV Technician" },
  { value: "Stage Manager", label: "Stage Manager" },
  { value: "Lighting", label: "Lighting Operator" },
  { value: "Sound", label: "Sound Engineer" },
  { value: "Photography", label: "Photographer" },
  { value: "Videography", label: "Videographer" },
  { value: "Security", label: "Security Personnel" },
  { value: "Catering", label: "Catering Staff" },
  { value: "Usher", label: "Usher / Greeter" },
  { value: "Other", label: "Other" },
];

const EXPERIENCE_LEVELS = [
  { value: "Entry", label: "Entry level (0–2 yrs)" },
  { value: "Mid", label: "Mid level (2–5 yrs)" },
  { value: "Senior", label: "Senior (5–10 yrs)" },
  { value: "Expert", label: "Expert (10+ yrs)" },
];

const SHIFT_DURATIONS = [
  { value: "4 hours", label: "4 hours" },
  { value: "8 hours", label: "8 hours (full shift)" },
  { value: "12 hours", label: "12 hours" },
  { value: "Setup only", label: "Setup only" },
  { value: "Event day only", label: "Event day only" },
  { value: "Full event period", label: "Full event period" },
];

const CERTIFICATIONS = [
  "First Aid / CPR",
  "CCTV Operation",
  "Fire Safety",
  "Food Safety",
  "Rigging",
  "Electrical Safety",
  "Crowd Management",
];

const BUDGET_OPTIONS = [
  { value: "Under ₹2K/day", label: "Under ₹2,000/day" },
  { value: "₹2K–₹5K/day", label: "₹2,000 – ₹5,000/day" },
  { value: "₹5K–₹10K/day", label: "₹5,000 – ₹10,000/day" },
  { value: "₹10K–₹20K/day", label: "₹10,000 – ₹20,000/day" },
  { value: "Above ₹20K/day", label: "Above ₹20,000/day" },
  { value: "Discuss", label: "Prefer to discuss" },
];

interface Props {
  defaultValues?: Partial<CrewDetails>;
  onNext: (data: CrewDetails) => void;
  onBack: () => void;
  stepLabel: string;
}

export default function CrewSteps({ defaultValues, onNext, onBack, stepLabel }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CrewDetails>({
    defaultValues: {
      certificationsRequired: [],
      uniformRequired: false,
      ...defaultValues,
    },
  });

  const certifications = watch("certificationsRequired") || [];
  const uniformRequired = watch("uniformRequired") ?? false;

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-8 animate-step-slide">
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-gold mb-1">{stepLabel}</p>
        <h2 className="font-display text-3xl text-ink mb-1">Crew Requirements</h2>
        <p className="text-ink/50 font-body text-sm">Specify the operational staff you need for the event.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Select
            label="Type of Crew"
            placeholder="Select crew type"
            required
            options={CREW_TYPES}
            value={watch("crewType") || ""}
            error={errors.crewType?.message}
            {...register("crewType", { required: "Crew type is required" })}
          />
        </div>

        <Input
          label="Number of Crew Needed"
          type="number"
          placeholder="e.g. 4"
          required
          error={errors.numberOfCrewNeeded?.message}
          {...register("numberOfCrewNeeded", {
            required: "Number of crew is required",
            min: { value: 1, message: "At least 1" },
          })}
        />

        <Select
          label="Shift Duration"
          placeholder="Select shift"
          required
          options={SHIFT_DURATIONS}
          value={watch("shiftDuration") || ""}
          error={errors.shiftDuration?.message}
          {...register("shiftDuration", { required: "Shift duration is required" })}
        />

        <Select
          label="Experience Level Required"
          placeholder="Select level"
          required
          options={EXPERIENCE_LEVELS}
          value={watch("experienceLevel") || ""}
          error={errors.experienceLevel?.message}
          {...register("experienceLevel", { required: "Experience level is required" })}
        />

        <Select
          label="Budget Per Person"
          placeholder="Select budget"
          required
          options={BUDGET_OPTIONS}
          value={watch("budgetPerPerson") || ""}
          error={errors.budgetPerPerson?.message}
          {...register("budgetPerPerson", { required: "Budget is required" })}
        />

        <div className="md:col-span-2">
          <CheckboxGroup
            label="Certifications Required"
            options={CERTIFICATIONS}
            selected={certifications}
            onChange={(val) => setValue("certificationsRequired", val)}
          />
        </div>

        <div className="md:col-span-2">
          <Input
            label="Equipment / Tools Familiarity"
            placeholder="e.g. Yamaha sound boards, Christie projectors, Canon cameras"
            hint="Mention specific brands or equipment if required"
            {...register("equipmentFamiliarity")}
          />
        </div>

        <div className="md:col-span-2 bg-surface-2 p-4 border border-surface-3">
          <Toggle
            label="Uniform / Dress Code Required"
            hint="Toggle on if crew must arrive in specific uniform or formal attire"
            checked={uniformRequired}
            onChange={(val) => setValue("uniformRequired", val)}
          />
        </div>

        <div className="md:col-span-2">
          <Input
            label="Briefing / Arrival Time Before Event"
            placeholder="e.g. 2 hours before event start"
            hint="When should crew report for setup and briefing?"
            {...register("briefingTime")}
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
