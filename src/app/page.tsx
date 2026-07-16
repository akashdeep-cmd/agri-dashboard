"use client";

import { QrCode } from "lucide-react";
import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { QuickActionCard } from "@/components/dashboard/QuickActionCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { Fab } from "@/components/ui/Fab";
import { InfoBanner } from "@/components/ui/InfoBanner";
import { getDashboard } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

export default function OperatorDashboardPage() {
  const dashboard = getDashboard();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen lg:flex">
      <AppSidebar />

      <main className="flex-1 space-y-6 p-6 lg:p-8">
        <DashboardHeader lastSyncedLabel={dashboard.center.lastSyncedLabel} />

        <div className="grid gap-5 md:grid-cols-3">
          {dashboard.stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-3">
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-slate-900">
              {t("Quick Actions")}
            </h2>
            {dashboard.quickActions.map((action) => (
              <QuickActionCard key={action.id} action={action} />
            ))}
          </section>

          <div className="lg:col-span-2">
            <ActivityChart activity={dashboard.weeklyActivity} />
          </div>
        </div>

        <InfoBanner
          title={t(dashboard.policyNotice.title)}
          message={t(dashboard.policyNotice.message)}
          linkText={t(dashboard.policyNotice.linkText)}
          dismissible
        />
      </main>

      <Fab icon={QrCode} label={t("Scan QR code")} />
    </div>
  );
}
