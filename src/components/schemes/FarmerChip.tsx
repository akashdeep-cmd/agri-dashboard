"use client";

import { Avatar } from "@/components/ui/Avatar";
import { useLanguage } from "@/lib/i18n";
import type { Farmer } from "@/lib/types";

export function FarmerChip({ farmer }: { farmer: Farmer }) {
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-3">
      <Avatar initials={farmer.initials} />
      <div>
        <p className="font-semibold leading-tight text-slate-900">
          {t(farmer.name)}
        </p>
        <p className="text-sm text-slate-600">
          {t("ID: {id}", { id: farmer.id })}
        </p>
      </div>
    </div>
  );
}
