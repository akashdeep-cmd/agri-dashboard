"use client";

import Image from "next/image";
import Link from "next/link";
import { CircleUser, CloudUpload, Languages, UserPlus } from "lucide-react";
import { LanguageDropdown } from "@/components/ui/LanguageDropdown";
import { useLanguage } from "@/lib/i18n";

export function AppTopBar() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 flex h-12 items-center justify-between gap-2 border-b border-line bg-card pl-4 pr-1 lg:pl-6 lg:pr-3">
      <Link
        href="/"
        aria-label="SwanSAT"
        className="flex shrink-0 items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      >
        <Image
          src="/brand/swansat-logo.png"
          alt="SwanSAT"
          width={148}
          height={20}
          priority
        />
      </Link>

      <div className="flex items-center gap-1">
        <button
          type="button"
          title={t("Register New Farmer")}
          className="inline-flex h-10 items-center gap-3 bg-brand-600 px-3 text-sm font-normal tracking-body text-white transition-colors duration-150 hover:bg-brand-700 active:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 sm:px-4"
        >
          <span className="hidden sm:inline">{t("Register New Farmer")}</span>
          <UserPlus className="h-4 w-4 shrink-0" aria-hidden />
        </button>
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
