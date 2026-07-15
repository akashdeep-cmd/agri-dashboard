"use client";

import {
  BadgeCheck,
  CalendarCheck,
  Clock,
  FileWarning,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { IconTile } from "@/components/ui/IconTile";
import type { SchemeResult } from "@/lib/data";
import { formatInr } from "@/lib/format";
import { useLanguage } from "@/lib/i18n";
import { getIcon } from "@/lib/icons";

export function SchemeCard({ scheme, result }: SchemeResult) {
  const { t } = useLanguage();

  const benefitText =
    result.estimatedAnnualBenefitInr > 0
      ? t("{amount} / year", {
          amount: formatInr(result.estimatedAnnualBenefitInr),
        })
      : t(scheme.benefit.summary);

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-line bg-card p-5 shadow-sm sm:flex-row">
      <IconTile icon={getIcon(scheme.icon)} accent={scheme.accent} size="lg" />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-bold text-slate-900">{t(scheme.name)}</h3>
          {result.status === "eligible" ? (
            <Badge tone="success" icon={BadgeCheck}>
              {t("Eligible")}
            </Badge>
          ) : result.status === "missing_documents" ? (
            <Badge tone="warning" icon={FileWarning}>
              {t("Missing Documents")}
            </Badge>
          ) : (
            <Badge tone="neutral" icon={Clock}>
              {t("Pending")}
            </Badge>
          )}
        </div>

        <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
          {t(scheme.description)}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm">
          <span className="inline-flex items-center gap-1.5 font-semibold text-brand-700">
            <Wallet className="h-4 w-4" aria-hidden />
            {benefitText}
          </span>
          {result.status === "missing_documents" ? (
            <span className="inline-flex items-center gap-1.5 font-medium text-warning-700">
              <FileWarning className="h-4 w-4" aria-hidden />
              {t("Needs: {docs}", {
                docs: result.missingDocuments.map((doc) => t(doc)).join(", "),
              })}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-slate-600">
              <CalendarCheck className="h-4 w-4" aria-hidden />
              {t(scheme.applicationRoute)}
            </span>
          )}
        </div>

        {result.note ? (
          <p className="mt-2 text-xs text-slate-500">{t(result.note)}</p>
        ) : null}
      </div>

      <div className="flex shrink-0 flex-row gap-2 sm:w-40 sm:flex-col">
        {result.status === "eligible" ? (
          <button
            type="button"
            className="w-full rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            {t("Apply Now")}
          </button>
        ) : result.status === "missing_documents" ? (
          <button
            type="button"
            className="w-full rounded-lg bg-warning-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-warning-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warning-600"
          >
            {t("Upload Docs")}
          </button>
        ) : null}
        <a
          href={scheme.portal.url}
          target="_blank"
          rel="noreferrer"
          className="w-full rounded-lg border border-line bg-card px-4 py-2.5 text-center text-sm font-semibold text-slate-700 transition-colors duration-150 hover:border-brand-300 hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          {t("View Details")}
        </a>
      </div>
    </article>
  );
}
