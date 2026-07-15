"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import translationsJson from "@/data/translations.json";

export type Lang = "en" | "mr";

const MARATHI = translationsJson as Record<string, string>;
const STORAGE_KEY = "ssk-lang";

type TranslateVars = Record<string, string | number>;

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** Looks up the English source string in the Marathi map, then fills {placeholders}. */
  t: (key: string, vars?: TranslateVars) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function substitute(template: string, vars?: TranslateVars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in vars ? String(vars[name]) : match,
  );
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    // The language can only be restored after mount: localStorage is
    // unavailable during SSR and reading it in the initializer would cause a
    // hydration mismatch. A ?lang=mr URL param overrides the stored choice.
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    const stored = localStorage.getItem(STORAGE_KEY);
    const initial: Lang =
      fromUrl === "mr" || fromUrl === "en"
        ? fromUrl
        : stored === "mr"
          ? "mr"
          : "en";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLangState(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    localStorage.setItem(STORAGE_KEY, next);
    setLangState(next);
  }, []);

  const t = useCallback(
    (key: string, vars?: TranslateVars) =>
      substitute(lang === "mr" ? (MARATHI[key] ?? key) : key, vars),
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
