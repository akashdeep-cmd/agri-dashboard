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
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center bg-brand-600 text-white shadow-lg transition-colors duration-150 hover:bg-brand-700 active:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
    >
      <Icon className="h-5 w-5" aria-hidden />
    </button>
  );
}
