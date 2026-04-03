"use client";
import clsx from "clsx";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

export default function StepIndicator({ currentStep, totalSteps, labels }: StepIndicatorProps) {
  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="h-0.5 bg-surface-3 relative mb-8">
        <div
          className="absolute left-0 top-0 h-full bg-gold transition-all duration-500 ease-out"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
        {/* Step dots */}
        <div className="absolute inset-0 flex items-center justify-between">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
            <div
              key={step}
              className={clsx(
                "relative flex flex-col items-center",
              )}
            >
              <div
                className={clsx(
                  "w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 font-mono text-xs font-medium",
                  step < currentStep
                    ? "bg-gold border-gold text-paper"
                    : step === currentStep
                    ? "bg-paper border-gold text-gold shadow-[0_0_0_4px_#C9A84C20]"
                    : "bg-paper border-surface-3 text-ink/30"
                )}
              >
                {step < currentStep ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  step
                )}
              </div>
              <span
                className={clsx(
                  "absolute -bottom-6 text-[10px] font-mono uppercase tracking-wider whitespace-nowrap",
                  step === currentStep ? "text-gold" : "text-ink/30"
                )}
              >
                {labels[step - 1]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
