import type { LucideIcon } from "lucide-react";
import type { BadgeTone } from "@/lib/types";

const TONE_CLASSES: Record<BadgeTone, string> = {
  success: "bg-success-50 text-success-700",
  warning: "bg-warning-50 text-warning-700",
  danger: "bg-danger-50 text-danger-700",
  brand: "bg-brand-50 text-brand-700",
  neutral: "bg-slate-100 text-slate-700",
};

interface BadgeProps {
  tone: BadgeTone;
  icon?: LucideIcon;
  children: React.ReactNode;
}

export function Badge({ tone, icon: Icon, children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${TONE_CLASSES[tone]}`}
    >
      {Icon ? <Icon className="h-3.5 w-3.5" aria-hidden /> : null}
      {children}
    </span>
  );
}
