"use client";

import { BadgeCheck, History, TrendingUp, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useLanguage } from "@/lib/i18n";
import { getIcon } from "@/lib/icons";
import type { DashboardStat } from "@/lib/types";

const ICON_COLORS: Record<string, string> = {
  farmers: "text-success-600",
  enrollments: "text-brand-600",
  applications: "text-warning-600",
};

const FOOTNOTE_ICONS: Record<string, LucideIcon> = {
  farmers: BadgeCheck,
  enrollments: TrendingUp,
  applications: History,
};

function StatIcon({ icon: Icon, className }: { icon: LucideIcon; className: string }) {
  return <Icon className={className} aria-hidden />;
}

export function StatCard({ stat }: { stat: DashboardStat }) {
  const { t } = useLanguage();
  const FootnoteIcon = FOOTNOTE_ICONS[stat.id] ?? BadgeCheck;

  return (
    <article className="bg-card p-3">
      <div className="flex items-start justify-between">
        <StatIcon
          icon={getIcon(stat.icon)}
          className={`h-6 w-6 ${ICON_COLORS[stat.id] ?? "text-brand-600"}`}
        />
        {stat.badge ? <Badge tone={stat.badge.tone}>{t(stat.badge.text)}</Badge> : null}
      </div>
      <p className="mt-4 text-xs tracking-label text-slate-600">
        {t(stat.label)}
      </p>
      <p className="mt-1 text-[1.75rem] font-light leading-9 text-slate-900">
        {stat.value}
      </p>
      <p className="mt-0.5 flex items-center gap-1.5 text-sm tracking-body text-slate-600">
        <FootnoteIcon className="h-4 w-4" aria-hidden />
        {t(stat.footnote)}
      </p>
    </article>
  );
}
