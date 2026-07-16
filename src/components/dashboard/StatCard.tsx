"use client";

import { BadgeCheck, History, TrendingUp, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { IconTile, type IconTileAccent } from "@/components/ui/IconTile";
import { useLanguage } from "@/lib/i18n";
import { getIcon } from "@/lib/icons";
import type { DashboardStat } from "@/lib/types";

const TILE_ACCENTS: Record<string, IconTileAccent> = {
  farmers: "success",
  enrollments: "brand",
  applications: "warning",
};

const FOOTNOTE_ICONS: Record<string, LucideIcon> = {
  farmers: BadgeCheck,
  enrollments: TrendingUp,
  applications: History,
};

export function StatCard({ stat }: { stat: DashboardStat }) {
  const { t } = useLanguage();
  const FootnoteIcon = FOOTNOTE_ICONS[stat.id] ?? BadgeCheck;

  return (
    <article className="border border-line bg-card p-5">
      <div className="flex items-start justify-between">
        <IconTile icon={getIcon(stat.icon)} accent={TILE_ACCENTS[stat.id] ?? "brand"} size="lg" />
        {stat.badge ? <Badge tone={stat.badge.tone}>{t(stat.badge.text)}</Badge> : null}
      </div>
      <p className="mt-5 text-xs tracking-label text-slate-600">
        {t(stat.label)}
      </p>
      <p className="mt-1 text-5xl font-light leading-none text-slate-900">
        {stat.value}
      </p>
      <p className="mt-4 flex items-center gap-1.5 text-sm tracking-body text-slate-600">
        <FootnoteIcon className="h-4 w-4" aria-hidden />
        {t(stat.footnote)}
      </p>
    </article>
  );
}
