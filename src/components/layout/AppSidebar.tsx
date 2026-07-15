"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ClipboardList,
  Globe,
  Landmark,
  LayoutDashboard,
  Map,
  PanelLeftClose,
  PanelLeftOpen,
  Phone,
  RefreshCw,
  Sparkles,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { LanguageDropdown } from "@/components/ui/LanguageDropdown";
import { getDashboard } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "Farmers", icon: Users, href: "#" },
  { label: "Farm Map", icon: Map, href: "#" },
  { label: "AI Advisory", icon: Sparkles, href: "#" },
  { label: "Schemes", icon: Landmark, href: "/schemes" },
  { label: "Tasks", icon: ClipboardList, href: "#" },
  { label: "Profile", icon: User, href: "#" },
];

const STORAGE_KEY = "ssk-sidebar-collapsed";

export function AppSidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [collapsed, setCollapsed] = useState(false);
  const { center } = getDashboard();

  useEffect(() => {
    // localStorage is unavailable during SSR, so the persisted collapse state
    // can only be restored after mount without causing a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCollapsed(localStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  function toggleCollapsed() {
    setCollapsed((current) => {
      localStorage.setItem(STORAGE_KEY, current ? "0" : "1");
      return !current;
    });
  }

  return (
    <aside
      className={`sticky top-0 hidden h-screen flex-col border-r border-line bg-card transition-[width] duration-200 lg:flex ${
        collapsed ? "w-[76px]" : "w-72"
      }`}
    >
      <div
        className={`flex pt-6 ${
          collapsed
            ? "flex-col items-center gap-3 px-3"
            : "items-center justify-between gap-2 px-6"
        }`}
      >
        {collapsed ? (
          <Image
            src="/brand/swansat-icon.png"
            alt="SwanSAT"
            width={32}
            height={32}
            priority
          />
        ) : (
          <Image
            src="/brand/swansat-logo.png"
            alt="SwanSAT"
            width={148}
            height={20}
            priority
          />
        )}
        <button
          type="button"
          onClick={toggleCollapsed}
          title={collapsed ? t("Expand sidebar") : t("Collapse sidebar")}
          aria-label={collapsed ? t("Expand sidebar") : t("Collapse sidebar")}
          aria-expanded={!collapsed}
          className="rounded-full p-1.5 text-slate-500 transition-colors duration-150 hover:bg-surface hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          {collapsed ? (
            <PanelLeftOpen className="h-5 w-5" aria-hidden />
          ) : (
            <PanelLeftClose className="h-5 w-5" aria-hidden />
          )}
        </button>
      </div>

      {!collapsed ? (
        <div className="px-6 pt-4">
          <p className="text-lg font-bold leading-tight text-slate-900">
            {t(center.name)}
          </p>
          <p className="text-sm text-slate-600">{t(center.subtitle)}</p>
        </div>
      ) : null}

      <div className={`py-4 ${collapsed ? "px-3" : "px-4"}`}>
        <button
          type="button"
          title={collapsed ? t("Register New Farmer") : undefined}
          className={`flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
            collapsed ? "px-0 py-2.5" : "px-4 py-2.5"
          }`}
        >
          <UserPlus className="h-4 w-4 shrink-0" aria-hidden />
          {!collapsed && t("Register New Farmer")}
        </button>
      </div>

      <nav
        className={`flex-1 space-y-1 overflow-y-auto ${collapsed ? "px-3" : "px-4"}`}
        aria-label={t("Main")}
      >
        {NAV_ITEMS.map(({ label, icon: Icon, href }) => {
          const active = href !== "#" && pathname === href;
          return (
            <Link
              key={label}
              href={href}
              title={collapsed ? t(label) : undefined}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-full py-2.5 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
                collapsed ? "justify-center px-0" : "px-4"
              } ${
                active
                  ? "bg-brand-100 font-semibold text-brand-800"
                  : "text-slate-700 hover:bg-surface hover:text-slate-900"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" aria-hidden />
              {!collapsed && t(label)}
            </Link>
          );
        })}
      </nav>

      <div className={`space-y-2 border-t border-line py-4 ${collapsed ? "px-3" : "px-4"}`}>
        {collapsed ? (
          <button
            type="button"
            title={t("Helpline 1800-123-XXXX")}
            className="flex w-full items-center justify-center rounded-xl bg-brand-600 py-2.5 text-white transition-colors duration-150 hover:bg-brand-700"
          >
            <Phone className="h-4 w-4" aria-hidden />
            <span className="sr-only">{t("Helpline 1800-123-XXXX")}</span>
          </button>
        ) : (
          <div className="rounded-2xl bg-brand-600 px-5 py-4 text-white">
            <p className="flex items-center gap-2 text-xs font-medium text-brand-100">
              <Phone className="h-3.5 w-3.5" aria-hidden />
              {t("Helpline")}
            </p>
            <p className="mt-1 text-lg font-bold tracking-wide">1800-123-XXXX</p>
          </div>
        )}

        <button
          type="button"
          title={collapsed ? t("Refresh") : undefined}
          className={`flex w-full items-center gap-3 rounded-full py-2 text-sm font-medium text-slate-700 transition-colors duration-150 hover:bg-surface hover:text-slate-900 ${
            collapsed ? "justify-center px-0" : "px-4"
          }`}
        >
          <RefreshCw className="h-4 w-4 shrink-0" aria-hidden />
          {!collapsed && t("Refresh")}
        </button>
        <LanguageDropdown
          icon={Globe}
          direction="up"
          align="start"
          labelHidden={collapsed}
          buttonClassName={`flex w-full items-center gap-3 rounded-full py-2 text-sm font-medium text-slate-700 transition-colors duration-150 hover:bg-surface hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
            collapsed ? "justify-center px-0" : "px-4"
          }`}
        />

        <div
          className={`flex items-center gap-3 pt-2 ${collapsed ? "justify-center" : "px-4"}`}
          title={
            collapsed
              ? `${t(center.operator.name)} · ${center.operator.centerId}`
              : undefined
          }
        >
          <Avatar
            initials={center.operator.name
              .split(" ")
              .map((part) => part[0])
              .join("")}
            size="sm"
          />
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">
                {t(center.operator.name)}
              </p>
              <p className="text-xs text-slate-600">
                {t("Center ID: {id}", { id: center.operator.centerId })}
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
