import type { LucideIcon } from "lucide-react";

export type IconTileAccent = "brand" | "success" | "warning" | "danger";

const ACCENT_CLASSES: Record<IconTileAccent, string> = {
  brand: "bg-brand-100 text-brand-700",
  success: "bg-success-100 text-success-700",
  warning: "bg-warning-50 text-warning-700",
  danger: "bg-danger-100 text-danger-700",
};

const SIZE_CLASSES = {
  md: "h-10 w-10 [&>svg]:h-5 [&>svg]:w-5",
  lg: "h-12 w-12 [&>svg]:h-6 [&>svg]:w-6",
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
