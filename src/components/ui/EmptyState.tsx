import Image from "next/image";

interface EmptyStateProps {
  title: string;
  message: string;
}

export function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 border border-line bg-card px-6 py-12 text-center">
      <Image
        src="/icons/no-programs-shield.svg"
        alt=""
        width={32}
        height={40}
        className="opacity-70"
      />
      <p className="font-semibold text-slate-900">{title}</p>
      <p className="max-w-sm text-sm tracking-body text-slate-600">{message}</p>
    </div>
  );
}
