import type { LucideIcon } from "lucide-react";

type SummaryTone = "success" | "brand" | "danger";

const TONE_CLASSES: Record<SummaryTone, { value: string; icon: string }> = {
  success: { value: "text-success-600", icon: "text-success-600" },
  brand: { value: "text-brand-600", icon: "text-brand-600" },
  danger: { value: "text-danger-600", icon: "text-danger-600" },
};

interface SummaryCardProps {
  tone: SummaryTone;
  label: string;
  value: string;
  footnote: string;
  icon: LucideIcon;
}

export function SummaryCard({ tone, label, value, footnote, icon: Icon }: SummaryCardProps) {
  const classes = TONE_CLASSES[tone];

  return (
    <article className="bg-card p-4">
      <p className="text-sm tracking-body text-slate-600">{label}</p>
      <p className={`mt-2 text-[1.75rem] font-light leading-9 ${classes.value}`}>
        {value}
      </p>
      <p className="mt-4 flex items-center gap-1.5 text-sm tracking-body text-slate-600">
        <Icon className={`h-4 w-4 ${classes.icon}`} aria-hidden />
        {footnote}
      </p>
    </article>
  );
}
