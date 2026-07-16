"use client";

import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import type { DashboardData } from "@/lib/types";

/* Carbon categorical pair: blue 60 + teal 50 */
const SERIES_COLORS: Record<"inPerson" | "online", string> = {
  inPerson: "bg-brand-600",
  online: "bg-teal-500",
};

export function ActivityChart({
  activity,
}: {
  activity: DashboardData["weeklyActivity"];
}) {
  const { t } = useLanguage();
  const rawMax = Math.max(
    ...activity.days.flatMap((d) => [d.inPerson, d.online]),
  );
  const niceMax = Math.max(20, Math.ceil(rawMax / 20) * 20);
  const gridValues = [niceMax, (niceMax / 4) * 3, niceMax / 2, niceMax / 4];

  return (
    <section className="flex flex-col border border-line bg-card p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            {t("Center Activity")}
          </h2>
          <p className="mt-0.5 text-sm tracking-body text-slate-600">
            {t("Farmer footfall vs. Online applications")}
          </p>
        </div>
        <button
          type="button"
          className="inline-flex h-8 shrink-0 items-center gap-2 px-3 text-xs tracking-label text-slate-600 transition-colors duration-150 hover:bg-hover hover:text-slate-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-600"
        >
          {t(activity.rangeLabel)}
          <ChevronDown className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>

      <div className="relative mt-6 h-56" aria-hidden>
        {/* Hairline gridlines with value labels */}
        {gridValues.map((value, i) => (
          <div
            key={value}
            className="absolute inset-x-0 flex items-center gap-2"
            style={{ top: `${(i / 4) * 100}%` }}
          >
            <span className="w-6 text-right text-xs leading-none text-slate-500">
              {value}
            </span>
            <div className="h-px flex-1 bg-line" />
          </div>
        ))}
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-2">
          <span className="w-6 text-right text-xs leading-none text-slate-500">
            0
          </span>
          <div className="h-px flex-1 bg-slate-300" />
        </div>

        {/* Bars */}
        <div className="absolute inset-y-0 left-8 right-0 flex items-end justify-around">
          {activity.days.map((day) => (
            <div
              key={day.day}
              className="group relative flex h-full items-end gap-px"
            >
              <span className="pointer-events-none absolute -top-1 left-1/2 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap bg-slate-700 px-2 py-1 text-xs tracking-label text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                {t("{day}: {inPerson} in-person · {online} online", {
                  day: t(day.day),
                  inPerson: day.inPerson,
                  online: day.online,
                })}
              </span>
              <div
                className={`w-4 ${SERIES_COLORS.inPerson}`}
                style={{ height: `${(day.inPerson / niceMax) * 100}%` }}
              />
              <div
                className={`w-4 ${SERIES_COLORS.online}`}
                style={{ height: `${(day.online / niceMax) * 100}%` }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="ml-8 mt-2 flex justify-around" aria-hidden>
        {activity.days.map((day) => (
          <span
            key={day.day}
            className="text-xs tracking-label text-slate-600"
          >
            {t(day.day)}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-6">
        {activity.series.map((series) => (
          <span
            key={series.key}
            className="inline-flex items-center gap-2 text-sm tracking-body text-slate-700"
          >
            <span
              className={`h-2.5 w-2.5 ${SERIES_COLORS[series.key]}`}
              aria-hidden
            />
            {t(series.label)}
          </span>
        ))}
      </div>

      {/* Screen-reader data table */}
      <table className="sr-only">
        <caption>
          {t(
            "Center activity, {range}: farmer footfall vs. online applications",
            { range: t(activity.rangeLabel) },
          )}
        </caption>
        <thead>
          <tr>
            <th scope="col">{t("Day")}</th>
            {activity.series.map((series) => (
              <th scope="col" key={series.key}>
                {t(series.label)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {activity.days.map((day) => (
            <tr key={day.day}>
              <th scope="row">{t(day.day)}</th>
              <td>{day.inPerson}</td>
              <td>{day.online}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
