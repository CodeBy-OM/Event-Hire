"use client";
import React from "react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export function Input({ label, error, hint, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-mono uppercase tracking-widest text-ink/50">
        {label}
        {props.required && <span className="text-gold ml-1">*</span>}
      </label>
      <input
        {...props}
        className={clsx(
          "w-full bg-surface-1 border-b-2 border-surface-3 px-0 py-2.5",
          "font-body text-[15px] text-ink placeholder:text-ink/25",
          "transition-all duration-200",
          "focus:border-gold focus:bg-transparent",
          "disabled:opacity-40",
          error && "border-blush",
          className
        )}
      />
      {hint && !error && <p className="text-xs text-ink/40 font-body">{hint}</p>}
      {error && <p className="text-xs text-blush font-body">{error}</p>}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function Select({ label, error, options, placeholder, className, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-mono uppercase tracking-widest text-ink/50">
        {label}
        {props.required && <span className="text-gold ml-1">*</span>}
      </label>
      <div className="relative">
        <select
          {...props}
          className={clsx(
            "w-full bg-surface-1 border-b-2 border-surface-3 px-0 py-2.5 pr-8",
            "font-body text-[15px] text-ink appearance-none",
            "transition-all duration-200",
            "focus:border-gold",
            "disabled:opacity-40",
            props.value === "" && "text-ink/25",
            error && "border-blush",
            className
          )}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-gold">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      {error && <p className="text-xs text-blush font-body">{error}</p>}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
}

export function Textarea({ label, error, hint, className, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-mono uppercase tracking-widest text-ink/50">
        {label}
        {props.required && <span className="text-gold ml-1">*</span>}
      </label>
      <textarea
        {...props}
        rows={props.rows || 3}
        className={clsx(
          "w-full bg-surface-1 border-b-2 border-surface-3 px-0 py-2.5",
          "font-body text-[15px] text-ink placeholder:text-ink/25",
          "transition-all duration-200 resize-none",
          "focus:border-gold",
          error && "border-blush",
          className
        )}
      />
      {hint && !error && <p className="text-xs text-ink/40 font-body">{hint}</p>}
      {error && <p className="text-xs text-blush font-body">{error}</p>}
    </div>
  );
}

interface CheckboxGroupProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function CheckboxGroup({ label, options, selected, onChange }: CheckboxGroupProps) {
  const toggle = (val: string) => {
    if (selected.includes(val)) {
      onChange(selected.filter((s) => s !== val));
    } else {
      onChange([...selected, val]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-mono uppercase tracking-widest text-ink/50">{label}</label>
      <div className="flex flex-wrap gap-2 mt-1">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={clsx(
              "px-3 py-1.5 text-sm font-body border transition-all duration-150",
              selected.includes(opt)
                ? "bg-gold/10 border-gold text-gold-dark font-medium"
                : "bg-transparent border-surface-3 text-ink/50 hover:border-gold/50 hover:text-ink/70"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

interface ToggleProps {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Toggle({ label, hint, checked, onChange }: ToggleProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-[15px] font-body text-ink">{label}</p>
        {hint && <p className="text-xs text-ink/40 font-body mt-0.5">{hint}</p>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={clsx(
          "relative flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-200",
          checked ? "bg-gold" : "bg-surface-3"
        )}
      >
        <span
          className={clsx(
            "absolute top-1 left-1 w-4 h-4 bg-paper rounded-full shadow transition-transform duration-200",
            checked && "translate-x-5"
          )}
        />
      </button>
    </div>
  );
}
