"use client";

import { useState } from "react";
import { Info, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

/* Carbon inline notification (informational, low contrast) */
export function InfoBanner({
  title,
  message,
  linkText,
  dismissible = false,
}: {
  title?: string;
  message: string;
  linkText: string;
  dismissible?: boolean;
}) {
  const { t } = useLanguage();
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="flex items-center gap-3 border border-brand-200 border-l-[3px] border-l-brand-700 bg-brand-50 py-3 pl-4 pr-3">
      <Info className="h-5 w-5 shrink-0 text-brand-700" aria-hidden />
      <p className="flex-1 text-sm tracking-body text-slate-700">
        {title ? (
          <span className="font-semibold text-slate-900">{title}: </span>
        ) : null}
        {message}{" "}
        <a
          href="#"
          className="font-normal text-brand-700 underline underline-offset-2 transition-colors duration-150 hover:text-brand-800"
        >
          {linkText}
        </a>
      </p>
      {dismissible ? (
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label={t("Dismiss notice")}
          className="p-1.5 text-slate-600 transition-colors duration-150 hover:bg-brand-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      ) : null}
    </div>
  );
}
