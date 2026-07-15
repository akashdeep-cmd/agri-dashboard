const SIZE_CLASSES = {
  sm: "h-9 w-9 text-xs",
  md: "h-11 w-11 text-sm",
} as const;

interface AvatarProps {
  initials: string;
  size?: keyof typeof SIZE_CLASSES;
}

export function Avatar({ initials, size = "md" }: AvatarProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-brand-100 font-semibold text-brand-800 ${SIZE_CLASSES[size]}`}
      aria-hidden
    >
      {initials}
    </span>
  );
}
