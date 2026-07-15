import type { LucideIcon } from "lucide-react";

interface FabProps {
  icon: LucideIcon;
  label: string;
}

export function Fab({ icon: Icon, label }: FabProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/30 transition-colors duration-150 hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
    >
      <Icon className="h-6 w-6" aria-hidden />
    </button>
  );
}
