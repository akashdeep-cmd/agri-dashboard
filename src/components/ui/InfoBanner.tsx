"use client";

import { useState } from "react";
import { Info, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface InfoBannerProps {
  title?: string;
  message: string;
  linkText: string;
  dismissible?: boolean;
}

export function InfoBanner({
  title,
  message,
  linkText,
  dismissible = false,
}: InfoBannerProps) {
  const { t } = useLanguage();
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-line bg-card px-5 py-4 shadow-sm">
      <Info className="h-5 w-5 shrink-0 text-brand-600" aria-hidden />
      <p className="flex-1 text-sm text-slate-700">
        {title ? (
          <span className="font-semibold text-slate-900">{title}: </span>
        ) : null}
        {message}{" "}
        <a
          href="#"
          className="font-semibold text-brand-600 underline underline-offset-2 transition-colors duration-150 hover:text-brand-700"
        >
          {linkText}
        </a>
      </p>
      {dismissible ? (
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label={t("Dismiss notice")}
          className="rounded-full p-1.5 text-slate-500 transition-colors duration-150 hover:bg-surface hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      ) : null}
    </div>
  );
}
