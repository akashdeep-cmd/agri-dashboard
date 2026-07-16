"use client";

import {
  FileWarning,
  Plus,
  Printer,
  RotateCw,
  Search,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { notFound } from "next/navigation";
import { FarmerChip } from "@/components/schemes/FarmerChip";
import { SchemeMatcherResults } from "@/components/schemes/SchemeMatcherResults";
import { SummaryCard } from "@/components/schemes/SummaryCard";
import { Fab } from "@/components/ui/Fab";
import { InfoBanner } from "@/components/ui/InfoBanner";
import {
  getFarmer,
  getFarmerEligibility,
  getFarmerSchemeResults,
  getFarmerSummary,
} from "@/lib/data";
import { formatInr, padCount } from "@/lib/format";
import { useLanguage } from "@/lib/i18n";

const DEMO_FARMER_ID = "SSK-442";

export default function SchemeMatcherPage() {
  const { t } = useLanguage();
  const farmer = getFarmer(DEMO_FARMER_ID);
  if (!farmer) notFound();

  const summary = getFarmerSummary(DEMO_FARMER_ID);
  const results = getFarmerSchemeResults(DEMO_FARMER_ID);
  const aiNotice = getFarmerEligibility(DEMO_FARMER_ID)?.aiNotice;

  return (
    <>
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-3">
          <h1 className="text-[1.75rem] font-normal leading-9 text-slate-900">
            {t("Scheme Matcher")}
          </h1>
          <FarmerChip farmer={farmer} />
        </div>
        <div className="flex flex-col items-end gap-3">
          <label className="relative hidden sm:block">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
              aria-hidden
            />
            <span className="sr-only">{t("Search schemes")}</span>
            <input
              type="search"
              placeholder={t("Search schemes...")}
              className="h-10 w-64 border-b border-slate-400 bg-card pl-9 pr-4 text-sm tracking-body text-slate-900 placeholder:text-slate-500 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-600"
            />
          </label>
          <div className="flex gap-px">
            <button
              type="button"
              className="inline-flex h-10 items-center justify-between gap-6 border border-brand-600 px-4 text-sm tracking-body text-brand-600 transition-colors duration-150 hover:bg-brand-700 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              {t("Print Report")}
              <Printer className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              className="inline-flex h-10 items-center justify-between gap-6 bg-brand-600 px-4 text-sm tracking-body text-white transition-colors duration-150 hover:bg-brand-700 active:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              {t("Re-scan Eligibility")}
              <RotateCw className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          tone="success"
          label={t("Eligible Schemes")}
          value={padCount(summary.eligibleCount)}
          footnote={t("Based on verified land records")}
          icon={TrendingUp}
        />
        <SummaryCard
          tone="brand"
          label={t("Potential Benefits")}
          value={formatInr(summary.totalBenefitInr)}
          footnote={t("Estimated annual payout")}
          icon={Wallet}
        />
        <SummaryCard
          tone="danger"
          label={t("Action Required")}
          value={padCount(summary.actionRequiredCount)}
          footnote={t(
            summary.missingDocsSchemeCount === 1
              ? "Documents missing for {count} scheme"
              : "Documents missing for {count} schemes",
            { count: summary.missingDocsSchemeCount },
          )}
          icon={FileWarning}
        />
      </div>

      <SchemeMatcherResults items={results} />

      {aiNotice ? (
        <InfoBanner
          message={t(
            "Our AI-engine just matched {count} additional sub-schemes based on your crop pattern ({crop}).",
            {
              count: aiNotice.extraMatches,
              crop: t(aiNotice.cropTrigger),
            },
          )}
          linkText={t("View matches")}
        />
      ) : null}

      <Fab icon={Plus} label={t("Add scheme application")} />
    </>
  );
}
