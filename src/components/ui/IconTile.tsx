import type { LucideIcon } from "lucide-react";

export type IconTileAccent = "brand" | "success" | "warning" | "danger";

const ACCENT_CLASSES: Record<IconTileAccent, string> = {
  brand: "bg-brand-50 text-brand-600",
  success: "bg-success-50 text-success-600",
  warning: "bg-warning-50 text-warning-600",
  danger: "bg-danger-50 text-danger-600",
};

const SIZE_CLASSES = {
  md: "h-11 w-11 rounded-xl [&>svg]:h-5 [&>svg]:w-5",
  lg: "h-14 w-14 rounded-2xl [&>svg]:h-6 [&>svg]:w-6",
} as const;

interface IconTileProps {
  icon: LucideIcon;
  accent?: IconTileAccent;
  size?: keyof typeof SIZE_CLASSES;
}

export function IconTile({ icon: Icon, accent = "brand", size = "md" }: IconTileProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${ACCENT_CLASSES[accent]} ${SIZE_CLASSES[size]}`}
      aria-hidden
    >
      <Icon />
    </span>
  );
}
