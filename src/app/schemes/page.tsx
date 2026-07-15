"use client";

import {
  CircleUser,
  FileWarning,
  Plus,
  Printer,
  RefreshCw,
  RotateCw,
  Search,
  TrendingUp,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppSidebar } from "@/components/layout/AppSidebar";
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
    <div className="min-h-screen lg:flex">
      <AppSidebar />

      <main className="flex-1 space-y-6 p-6 lg:p-8">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <h1 className="text-2xl font-bold text-slate-900">
              {t("Scheme Matcher")}
            </h1>
            <FarmerChip farmer={farmer} />
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-2">
              <label className="relative hidden sm:block">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                  aria-hidden
                />
                <span className="sr-only">{t("Search schemes")}</span>
                <input
                  type="search"
                  placeholder={t("Search schemes...")}
                  className="w-64 rounded-full border border-line bg-card py-2 pl-9 pr-4 text-sm text-slate-900 placeholder:text-slate-600 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
                />
              </label>
              <button
                type="button"
                aria-label={t("Refresh")}
                className="rounded-full p-2 text-slate-600 transition-colors duration-150 hover:bg-card hover:text-slate-900"
              >
                <RefreshCw className="h-5 w-5" aria-hidden />
              </button>
              <Link
                href="/login"
                aria-label={t("Account — sign in")}
                className="rounded-full p-2 text-slate-600 transition-colors duration-150 hover:bg-card hover:text-slate-900"
              >
                <CircleUser className="h-5 w-5" aria-hidden />
              </Link>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors duration-150 hover:border-brand-300 hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                <Printer className="h-4 w-4" aria-hidden />
                {t("Print Report")}
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                <RotateCw className="h-4 w-4" aria-hidden />
                {t("Re-scan Eligibility")}
              </button>
            </div>
          </div>
        </header>

        <div className="grid gap-5 md:grid-cols-3">
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
      </main>

      <Fab icon={Plus} label={t("Add scheme application")} />
    </div>
  );
}
