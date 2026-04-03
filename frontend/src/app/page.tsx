import MultiStepForm from "@/components/MultiStepForm";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-paper relative overflow-hidden">
      {/* Background texture */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0D0D0D 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Header */}
      <header className="border-b border-surface-3 bg-paper/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-gold flex items-center justify-center">
              <span className="text-paper text-xs font-mono font-bold">EH</span>
            </div>
            <span className="font-display text-xl text-ink tracking-tight">EventHire</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link
              href="/requirements"
              className="text-xs font-mono uppercase tracking-widest text-ink/40 hover:text-ink transition-colors"
            >
              View Requirements
            </Link>
          </nav>
        </div>
      </header>

      {/* Page hero */}
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-6">
        <div className="flex items-start justify-between gap-4 mb-1">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-gold mb-2">
              Post a Requirement
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight">
              Find the right talent <br />
              <em className="text-gold">for your event.</em>
            </h1>
          </div>
          <div className="hidden md:flex flex-col gap-1 items-end mt-2">
            {["Event Planner", "Performer", "Crew"].map((label, i) => (
              <span
                key={label}
                className="text-[10px] font-mono uppercase tracking-widest text-ink/25 animate-fade-in"
                style={{ animationDelay: `${i * 100 + 200}ms` }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
        <div className="w-12 h-0.5 bg-gold mt-4 mb-8" />
      </div>

      {/* Form card */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <div className="bg-surface-1 border border-surface-3 shadow-sm p-8 md:p-12">
          <MultiStepForm />
        </div>
      </div>
    </main>
  );
}
