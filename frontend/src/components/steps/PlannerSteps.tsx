"use client";
import { useForm } from "react-hook-form";
import { Input, Select, Textarea, CheckboxGroup, Toggle } from "@/components/ui/FormControls";
import type { PlannerDetails } from "@/types";

const PLANNER_TYPES = [
  { value: "Full-Service", label: "Full-Service Planner" },
  { value: "Day-Of", label: "Day-Of Coordinator" },
  { value: "Partial", label: "Partial Planning" },
  { value: "Destination", label: "Destination Event Specialist" },
];

const SERVICES = [
  "Vendor Management",
  "Budget Planning",
  "Venue Selection",
  "Guest Management",
  "Décor & Styling",
  "Catering Coordination",
  "AV & Tech",
  "Transport Logistics",
  "Entertainment Booking",
  "Post-Event Wrap-Up",
];

const URGENCY = [
  { value: "Flexible", label: "Flexible timeline" },
  { value: "Within 1 week", label: "Within 1 week" },
  { value: "ASAP", label: "ASAP — urgent" },
];

const CONTACT = [
  { value: "Email", label: "Email" },
  { value: "Phone", label: "Phone" },
  { value: "WhatsApp", label: "WhatsApp" },
];

const BUDGET_RANGES = [
  { value: "Under ₹50K", label: "Under ₹50,000" },
  { value: "₹50K–₹1L", label: "₹50,000 – ₹1,00,000" },
  { value: "₹1L–₹5L", label: "₹1,00,000 – ₹5,00,000" },
  { value: "₹5L–₹20L", label: "₹5,00,000 – ₹20,00,000" },
  { value: "Above ₹20L", label: "Above ₹20,00,000" },
  { value: "Discuss", label: "Prefer to discuss" },
];

interface Props {
  defaultValues?: Partial<PlannerDetails>;
  onNext: (data: PlannerDetails) => void;
  onBack: () => void;
  stepLabel: string;
}

export default function PlannerSteps({ defaultValues, onNext, onBack, stepLabel }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PlannerDetails>({
    defaultValues: {
      servicesNeeded: [],
      equipmentProvided: false,
      ...defaultValues,
    },
  });

  const servicesNeeded = watch("servicesNeeded") || [];

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-8 animate-step-slide">
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-gold mb-1">{stepLabel}</p>
        <h2 className="font-display text-3xl text-ink mb-1">Planner Requirements</h2>
        <p className="text-ink/50 font-body text-sm">Help us find a planner that fits your vision perfectly.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Select
            label="Type of Planner"
            placeholder="Select planner type"
            required
            options={PLANNER_TYPES}
            value={watch("plannerType") || ""}
            error={errors.plannerType?.message}
            {...register("plannerType", { required: "Please select a planner type" })}
          />
        </div>

        <Input
          label="Expected Guest Count"
          type="number"
          placeholder="e.g. 200"
          hint="Approximate number is fine"
          {...register("guestCount", { min: { value: 1, message: "Must be at least 1" } })}
          error={errors.guestCount?.message}
        />

        <Select
          label="Budget Range"
          placeholder="Select budget"
          required
          options={BUDGET_RANGES}
          value={watch("budget") || ""}
          error={errors.budget?.message}
          {...register("budget", { required: "Budget range is required" })}
        />

        <div className="md:col-span-2">
          <CheckboxGroup
            label="Services Needed"
            options={SERVICES}
            selected={servicesNeeded}
            onChange={(val) => setValue("servicesNeeded", val)}
          />
        </div>

        <div className="md:col-span-2">
          <Input
            label="Experience Required"
            placeholder="e.g. Minimum 3 years, luxury weddings preferred"
            {...register("experienceRequired")}
          />
        </div>

        <Select
          label="Urgency"
          placeholder="Select urgency"
          required
          options={URGENCY}
          value={watch("urgency") || ""}
          error={errors.urgency?.message}
          {...register("urgency", { required: "Please select urgency" })}
        />

        <Select
          label="Preferred Contact Method"
          placeholder="Select method"
          required
          options={CONTACT}
          value={watch("preferredContactMethod") || ""}
          error={errors.preferredContactMethod?.message}
          {...register("preferredContactMethod", { required: "Contact method is required" })}
        />

        <div className="md:col-span-2">
          <Textarea
            label="Additional Notes"
            placeholder="Any specific requirements, themes, or preferences..."
            hint="Optional — but the more detail, the better the match"
            rows={4}
            {...register("additionalNotes")}
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
