"use client";

import Link from "next/link";
import { CircleUser, CloudUpload, Languages } from "lucide-react";
import { LanguageDropdown } from "@/components/ui/LanguageDropdown";
import { useLanguage } from "@/lib/i18n";

export function DashboardHeader({ lastSyncedLabel }: { lastSyncedLabel: string }) {
  const { t } = useLanguage();

  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h1 className="text-[1.75rem] font-normal leading-9 text-slate-900">
          {t("Operator Dashboard")}
        </h1>
        <span className="inline-flex items-center gap-2 text-xs tracking-label text-slate-600">
          <span className="h-2 w-2 rounded-full bg-success-600" aria-hidden />
          {t("Last Synced: {time}", { time: t(lastSyncedLabel) })}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <LanguageDropdown
          icon={Languages}
          direction="down"
          align="end"
          buttonClassName="inline-flex h-10 items-center gap-2 px-3 text-sm tracking-body text-slate-600 transition-colors duration-150 hover:bg-hover hover:text-slate-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-600"
        />
        <button
          type="button"
          aria-label={t("Sync to cloud")}
          className="flex h-10 w-10 items-center justify-center text-slate-600 transition-colors duration-150 hover:bg-hover hover:text-slate-900"
        >
          <CloudUpload className="h-5 w-5" aria-hidden />
        </button>
        <Link
          href="/login"
          aria-label={t("Account — sign in")}
          className="flex h-10 w-10 items-center justify-center text-slate-600 transition-colors duration-150 hover:bg-hover hover:text-slate-900"
        >
          <CircleUser className="h-5 w-5" aria-hidden />
        </Link>
      </div>
    </header>
  );
}
