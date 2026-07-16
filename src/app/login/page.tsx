"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  Info,
  Languages,
  LogIn,
  TriangleAlert,
} from "lucide-react";
import { LanguageDropdown } from "@/components/ui/LanguageDropdown";
import { getDemoCredentials } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

export default function LoginPage() {
  const router = useRouter();
  const credentials = getDemoCredentials();
  const { t } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (
      email.trim().toLowerCase() === credentials.email &&
      password === credentials.password
    ) {
      localStorage.setItem("ssk-demo-session", "1");
      router.push("/");
    } else {
      setError(true);
    }
  }

  function fillDemoCredentials() {
    setEmail(credentials.email);
    setPassword(credentials.password);
    setError(false);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-surface p-6">
      <div className="absolute right-6 top-6">
        <LanguageDropdown
          icon={Languages}
          direction="down"
          align="end"
          buttonClassName="inline-flex h-10 items-center gap-2 border border-slate-400 bg-card px-3 text-sm tracking-body text-slate-700 transition-colors duration-150 hover:bg-hover hover:text-slate-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-600"
        />
      </div>

      <main className="w-full max-w-md">
        <div className="border border-line bg-card p-8">
          <div className="flex flex-col items-start">
            <Image
              src="/brand/swansat-logo.png"
              alt="SwanSAT"
              width={170}
              height={23}
              priority
            />
            <h1 className="mt-6 text-xl font-normal text-slate-900">
              {t("Sign in to Shetkari Seva Kendra")}
            </h1>
            <p className="mt-1 text-sm tracking-body text-slate-600">
              {t("Operator access for Kendra staff")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs tracking-label text-slate-600"
              >
                {t("Email")}
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@swansat.in"
                className="h-10 w-full border-b border-slate-400 bg-field px-4 text-sm tracking-body text-slate-900 placeholder:text-slate-500 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-600"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-xs tracking-label text-slate-600"
              >
                {t("Password")}
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-10 w-full border-b border-slate-400 bg-field px-4 pr-11 text-sm tracking-body text-slate-900 placeholder:text-slate-500 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? t("Hide password") : t("Show password")}
                  className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center text-slate-600 transition-colors duration-150 hover:text-slate-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" aria-hidden />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden />
                  )}
                </button>
              </div>
            </div>

            {error ? (
              <p
                role="alert"
                className="flex items-center gap-2 border border-danger-100 border-l-[3px] border-l-danger-600 bg-danger-50 py-2.5 pl-3 pr-3 text-sm tracking-body text-slate-900"
              >
                <TriangleAlert
                  className="h-4 w-4 shrink-0 text-danger-600"
                  aria-hidden
                />
                {t("Invalid email or password. Use the demo credentials below.")}
              </p>
            ) : null}

            <button
              type="submit"
              className="flex h-12 w-full items-center justify-between gap-3 bg-brand-600 px-4 text-sm tracking-body text-white transition-colors duration-150 hover:bg-brand-700 active:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              {t("Sign In")}
              <LogIn className="h-4 w-4" aria-hidden />
            </button>
          </form>
        </div>

        <div className="mt-4 border border-brand-200 border-l-[3px] border-l-brand-700 bg-brand-50 px-4 py-4">
          <p className="flex items-center gap-2 text-sm font-semibold tracking-body text-slate-900">
            <Info className="h-4 w-4 shrink-0 text-brand-700" aria-hidden />
            {t("Demo credentials")}
          </p>
          <dl className="mt-2 space-y-1 text-sm tracking-body text-slate-700">
            <div className="flex gap-2">
              <dt className="w-24 shrink-0 text-slate-600">{t("Email")}</dt>
              <dd className="font-mono">{credentials.email}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-24 shrink-0 text-slate-600">{t("Password")}</dt>
              <dd className="font-mono">{credentials.password}</dd>
            </div>
          </dl>
          <button
            type="button"
            onClick={fillDemoCredentials}
            className="mt-3 inline-flex h-8 items-center border border-brand-600 px-3 text-xs tracking-label text-brand-700 transition-colors duration-150 hover:bg-brand-700 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            {t("Fill demo credentials")}
          </button>
        </div>
      </main>
    </div>
  );
}
