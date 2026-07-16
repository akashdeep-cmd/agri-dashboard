"use client";

import { UserPlus } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function DashboardHeader({ lastSyncedLabel }: { lastSyncedLabel: string }) {
  const { t } = useLanguage();

  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h1 className="text-[1.75rem] font-normal leading-9 text-slate-900">
          {t("Ajit Dada Pawar Shetkari Seva Kendra")}
        </h1>
        <span className="inline-flex items-center gap-2 text-xs tracking-label text-slate-600">
          <span className="h-2 w-2 rounded-full bg-success-600" aria-hidden />
          {t("Last Synced: {time}", { time: t(lastSyncedLabel) })}
        </span>
      </div>
      <button
        type="button"
        className="inline-flex h-10 items-center gap-3 bg-brand-600 px-4 text-sm font-normal tracking-body text-white transition-colors duration-150 hover:bg-brand-700 active:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      >
        {t("Register New Farmer")}
        <UserPlus className="h-4 w-4 shrink-0" aria-hidden />
      </button>
    </header>
  );
}
