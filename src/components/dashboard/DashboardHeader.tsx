"use client";

import { useLanguage } from "@/lib/i18n";

export function DashboardHeader({ lastSyncedLabel }: { lastSyncedLabel: string }) {
  const { t } = useLanguage();

  return (
    <header className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <h1 className="text-[1.75rem] font-normal leading-9 text-slate-900">
        {t("Operator Dashboard")}
      </h1>
      <span className="inline-flex items-center gap-2 text-xs tracking-label text-slate-600">
        <span className="h-2 w-2 rounded-full bg-success-600" aria-hidden />
        {t("Last Synced: {time}", { time: t(lastSyncedLabel) })}
      </span>
    </header>
  );
}
