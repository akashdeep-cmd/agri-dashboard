"use client";

import { useState } from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { SchemeCard } from "@/components/schemes/SchemeCard";
import type { SchemeResult } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

type Filter = "all" | "eligible" | "pending";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "eligible", label: "Eligible" },
  { key: "pending", label: "Pending" },
];

function matches(filter: Filter, item: SchemeResult): boolean {
  if (filter === "all") return true;
  if (filter === "eligible") return item.result.status === "eligible";
  return (
    item.result.status === "missing_documents" ||
    item.result.status === "pending"
  );
}

export function SchemeMatcherResults({ items }: { items: SchemeResult[] }) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");
  const visible = items.filter((item) => matches(filter, item));

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-normal text-slate-900">
          {t("Recommended Schemes")}
        </h2>
        {/* Carbon content switcher */}
        <div
          className="inline-flex divide-x divide-slate-400 border border-slate-400"
          role="group"
          aria-label={t("Filter schemes")}
        >
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              aria-pressed={filter === key}
              onClick={() => setFilter(key)}
              className={`h-8 px-4 text-sm tracking-body transition-colors duration-150 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-600 ${
                filter === key
                  ? "bg-slate-800 text-white"
                  : "bg-card text-slate-700 hover:bg-hover hover:text-slate-900"
              }`}
            >
              {t(label)}
            </button>
          ))}
        </div>
      </div>

      {visible.length > 0 ? (
        <div className="space-y-4">
          {visible.map((item) => (
            <SchemeCard key={item.scheme.id} {...item} />
          ))}
        </div>
      ) : (
        <EmptyState
          title={t("No schemes in this view")}
          message={t(
            "No recommended schemes match the selected filter for this farmer. Try another filter or re-scan eligibility.",
          )}
        />
      )}
    </section>
  );
}
