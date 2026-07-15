import type { LucideIcon } from "lucide-react";

type SummaryTone = "success" | "brand" | "danger";

const TONE_CLASSES: Record<
  SummaryTone,
  { border: string; value: string; icon: string }
> = {
  success: {
    border: "border-success-600/40",
    value: "text-success-700",
    icon: "text-success-600",
  },
  brand: {
    border: "border-brand-600/40",
    value: "text-brand-700",
    icon: "text-brand-600",
  },
  danger: {
    border: "border-danger-600/40",
    value: "text-danger-700",
    icon: "text-danger-600",
  },
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
    <article className={`rounded-2xl border-2 bg-card p-5 ${classes.border}`}>
      <p className="text-sm font-medium text-slate-700">{label}</p>
      <p className={`mt-2 text-4xl font-bold tracking-tight ${classes.value}`}>
        {value}
      </p>
      <p className="mt-3 flex items-center gap-1.5 text-sm text-slate-600">
        <Icon className={`h-4 w-4 ${classes.icon}`} aria-hidden />
        {footnote}
      </p>
    </article>
  );
}
