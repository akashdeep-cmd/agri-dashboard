"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  Info,
  Languages,
  Lock,
  LogIn,
  Mail,
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
          buttonClassName="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-2 text-sm font-medium text-slate-700 transition-colors duration-150 hover:border-brand-300 hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        />
      </div>

      <main className="w-full max-w-md">
        <div className="rounded-2xl border border-line bg-card p-8 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <Image
              src="/brand/swansat-logo.png"
              alt="SwanSAT"
              width={170}
              height={23}
              priority
            />
            <h1 className="mt-6 text-xl font-bold text-slate-900">
              {t("Sign in to Shetkari Seva Kendra")}
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              {t("Operator access for Kendra staff")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                {t("Email")}
              </label>
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                  aria-hidden
                />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operator@swansat.in"
                  className="w-full rounded-lg border border-line bg-card py-2.5 pl-9 pr-4 text-sm text-slate-900 placeholder:text-slate-600 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                {t("Password")}
              </label>
              <div className="relative">
                <Lock
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                  aria-hidden
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-line bg-card py-2.5 pl-9 pr-11 text-sm text-slate-900 placeholder:text-slate-600 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? t("Hide password") : t("Show password")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-slate-500 transition-colors duration-150 hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
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
                className="flex items-center gap-2 rounded-lg bg-danger-50 px-3 py-2.5 text-sm font-medium text-danger-700"
              >
                <TriangleAlert className="h-4 w-4 shrink-0" aria-hidden />
                {t("Invalid email or password. Use the demo credentials below.")}
              </p>
            ) : null}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              <LogIn className="h-4 w-4" aria-hidden />
              {t("Sign In")}
            </button>
          </form>
        </div>

        <div className="mt-4 rounded-2xl border border-brand-200 bg-brand-50 px-5 py-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-brand-800">
            <Info className="h-4 w-4 shrink-0" aria-hidden />
            {t("Demo credentials")}
          </p>
          <dl className="mt-2 space-y-1 text-sm text-brand-900">
            <div className="flex gap-2">
              <dt className="w-24 shrink-0 text-brand-700">{t("Email")}</dt>
              <dd className="font-mono">{credentials.email}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-24 shrink-0 text-brand-700">{t("Password")}</dt>
              <dd className="font-mono">{credentials.password}</dd>
            </div>
          </dl>
          <button
            type="button"
            onClick={fillDemoCredentials}
            className="mt-3 rounded-full border border-brand-300 px-3 py-1.5 text-xs font-semibold text-brand-700 transition-colors duration-150 hover:bg-brand-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            {t("Fill demo credentials")}
          </button>
        </div>
      </main>
    </div>
  );
}
