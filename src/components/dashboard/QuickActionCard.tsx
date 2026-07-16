"use client";

import { ArrowRight } from "lucide-react";
import { IconTile, type IconTileAccent } from "@/components/ui/IconTile";
import { useLanguage } from "@/lib/i18n";
import { getIcon } from "@/lib/icons";
import type { QuickAction } from "@/lib/types";

const ACTION_ACCENTS: Record<string, IconTileAccent> = {
  register: "success",
  advisory: "brand",
  whatsapp: "warning",
};

/* Carbon clickable tile */
export function QuickActionCard({ action }: { action: QuickAction }) {
  const { t } = useLanguage();

  return (
    <button
      type="button"
      className="group flex w-full items-center gap-4 border border-line bg-card p-4 text-left transition-colors duration-150 hover:bg-hover focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-600"
    >
      <IconTile
        icon={getIcon(action.icon)}
        accent={ACTION_ACCENTS[action.id] ?? "brand"}
      />
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-slate-900">
          {t(action.title)}
        </span>
        <span className="mt-0.5 block text-sm tracking-body text-slate-600">
          {t(action.description)}
        </span>
      </span>
      <ArrowRight
        className="h-5 w-5 shrink-0 text-brand-600 transition-transform duration-150 group-hover:translate-x-0.5"
        aria-hidden
      />
    </button>
  );
}
