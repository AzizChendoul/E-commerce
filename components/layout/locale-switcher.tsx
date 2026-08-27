"use client";

import { useTransition } from "react";

import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { type Locale, localeNames, locales } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * Switches locale while staying on the current page.
 *
 * `usePathname` here comes from i18n/navigation and returns the path *without*
 * the locale prefix, so the router can re-prefix it with the new locale. The
 * next/navigation version would return the prefixed path and produce
 * `/fr/ar/products`.
 */
export function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const current = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: Locale) {
    if (next === current) return;
    startTransition(() => {
      // `pathname` here is the locale-less path, so replacing it under a new
      // locale keeps the reader on the same page rather than sending them home.
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <nav aria-label={t("label")}>
      <ul className="flex items-center gap-1">
        {locales.map((locale) => {
          const isCurrent = locale === current;
          return (
            <li key={locale}>
              <button
                type="button"
                lang={locale}
                onClick={() => switchTo(locale)}
                disabled={isPending}
                // aria-current tells a screen reader which one is active.
                // The visual weight difference alone does not.
                aria-current={isCurrent ? "true" : undefined}
                className={cn(
                  "inline-flex h-11 min-w-11 cursor-pointer items-center justify-center rounded-md px-3 text-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  isCurrent
                    ? "bg-accent font-medium text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  isPending && "opacity-60",
                )}
              >
                {localeNames[locale]}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
