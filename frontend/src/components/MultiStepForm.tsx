"use client";
import { useState } from "react";
import StepIndicator from "@/components/ui/StepIndicator";
import Step1EventBasics from "@/components/steps/Step1EventBasics";
import PlannerSteps from "@/components/steps/PlannerSteps";
import PerformerSteps from "@/components/steps/PerformerSteps";
import CrewSteps from "@/components/steps/CrewSteps";
import Step4Review from "@/components/steps/Step4Review";
import SuccessScreen from "@/components/steps/SuccessScreen";
import type { FormData, HiringCategory, EventBasics, PlannerDetails, PerformerDetails, CrewDetails } from "@/types";

const STEP_LABELS = ["Basics", "Details", "More Info", "Review"];

function getCategoryStepLabel(category: HiringCategory | undefined, step: number): string {
  const labels: Record<HiringCategory, string[]> = {
    planner: ["Event Basics", "Planner Profile", "Requirements", "Review"],
    performer: ["Event Basics", "Performer Type", "Requirements", "Review"],
    crew: ["Event Basics", "Crew Type", "Requirements", "Review"],
  };
  if (!category) return STEP_LABELS[step - 1];
  return labels[category][step - 1];
}

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [successId, setSuccessId] = useState<string | null>(null);

  const category = formData.eventBasics?.hiringFor;

  const handleStep1 = (data: EventBasics) => {
    setFormData((prev) => ({ ...prev, eventBasics: data }));
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryStep = (
    data: PlannerDetails | PerformerDetails | CrewDetails,
    cat: HiringCategory
  ) => {
    if (cat === "planner") setFormData((p) => ({ ...p, plannerDetails: data as PlannerDetails }));
    if (cat === "performer") setFormData((p) => ({ ...p, performerDetails: data as PerformerDetails }));
    if (cat === "crew") setFormData((p) => ({ ...p, crewDetails: data as CrewDetails }));

    // For this flow: steps 2 & 3 are combined in one form, so go straight to review (step 4)
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setCurrentStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSuccess = (id: string) => {
    setSuccessId(id);
    setCurrentStep(5);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setFormData({});
    setSuccessId(null);
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Determine step label for category-specific steps
  const stepLabel2 = category
    ? `Step 2 & 3 — ${getCategoryStepLabel(category, 2)} & ${getCategoryStepLabel(category, 3)}`
    : "Step 2 & 3";

  return (
    <div className="w-full">
      {currentStep < 5 && (
        <div className="mb-14">
          <StepIndicator
            currentStep={Math.min(currentStep, 4)}
            totalSteps={4}
            labels={
              category
                ? [
                    "Basics",
                    getCategoryStepLabel(category, 2),
                    getCategoryStepLabel(category, 3),
                    "Review",
                  ]
                : STEP_LABELS
            }
          />
        </div>
      )}

      {currentStep === 1 && (
        <Step1EventBasics
          defaultValues={formData.eventBasics}
          onNext={handleStep1}
        />
      )}

      {currentStep === 2 && category === "planner" && (
        <PlannerSteps
          defaultValues={formData.plannerDetails}
          onNext={(data) => handleCategoryStep(data, "planner")}
          onBack={handleBack}
          stepLabel={stepLabel2}
        />
      )}

      {currentStep === 2 && category === "performer" && (
        <PerformerSteps
          defaultValues={formData.performerDetails}
          onNext={(data) => handleCategoryStep(data, "performer")}
          onBack={handleBack}
          stepLabel={stepLabel2}
        />
      )}

      {currentStep === 2 && category === "crew" && (
        <CrewSteps
          defaultValues={formData.crewDetails}
          onNext={(data) => handleCategoryStep(data, "crew")}
          onBack={handleBack}
          stepLabel={stepLabel2}
        />
      )}

      {currentStep === 4 && category && (
        <Step4Review
          formData={formData as FormData}
          category={category}
          onBack={handleBack}
          onSuccess={handleSuccess}
        />
      )}

      {currentStep === 5 && successId && category && (
        <SuccessScreen
          category={category}
          eventName={formData.eventBasics?.eventName || "Your Event"}
          requirementId={successId}
          onPostAnother={handleReset}
        />
      )}
    </div>
  );
}
