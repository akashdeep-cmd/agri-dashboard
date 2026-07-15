"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, type LucideIcon } from "lucide-react";
import { useLanguage, type Lang } from "@/lib/i18n";

const LANGUAGES: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "mr", label: "मराठी" },
];

interface LanguageDropdownProps {
  icon: LucideIcon;
  buttonClassName: string;
  /** Which way the menu opens relative to the button. */
  direction?: "up" | "down";
  /** Which button edge the menu aligns to. */
  align?: "start" | "end";
  /** Icon-only trigger (collapsed sidebar). */
  labelHidden?: boolean;
}

export function LanguageDropdown({
  icon: Icon,
  buttonClassName,
  direction = "down",
  align = "end",
  labelHidden = false,
}: LanguageDropdownProps) {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const currentLabel =
    LANGUAGES.find(({ code }) => code === lang)?.label ?? "English";

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        title={labelHidden ? t("Language") : undefined}
        aria-label={t("Language")}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={buttonClassName}
      >
        <Icon className="h-4 w-4 shrink-0" aria-hidden />
        {!labelHidden && (
          <>
            <span className="flex-1 text-left">{currentLabel}</span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
              aria-hidden
            />
          </>
        )}
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label={t("Language")}
          className={`absolute z-50 min-w-36 rounded-xl border border-line bg-card p-1 shadow-lg ${
            direction === "up" ? "bottom-full mb-2" : "top-full mt-2"
          } ${align === "end" ? "right-0" : "left-0"}`}
        >
          {LANGUAGES.map(({ code, label }) => (
            <li key={code} role="option" aria-selected={lang === code}>
              <button
                type="button"
                onClick={() => {
                  setLang(code);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-150 ${
                  lang === code
                    ? "bg-brand-50 font-semibold text-brand-700"
                    : "text-slate-700 hover:bg-surface hover:text-slate-900"
                }`}
              >
                {label}
                {lang === code ? (
                  <Check className="h-4 w-4" aria-hidden />
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
