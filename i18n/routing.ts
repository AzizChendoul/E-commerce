import { defineRouting } from "next-intl/routing";

/**
 * The three locales the storefront ships in.
 *
 * `ar` is right-to-left; everything that depends on direction reads it from
 * `localeDirection` rather than hardcoding a check, so adding another RTL
 * locale (fa, he, ur) is a one-line change here.
 */
export const locales = ["ar", "en", "fr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ar";

const rtlLocales = new Set<Locale>(["ar"]);

export function localeDirection(locale: Locale): "ltr" | "rtl" {
  return rtlLocales.has(locale) ? "rtl" : "ltr";
}

/** Display names, each written in its own language. */
export const localeNames: Record<Locale, string> = {
  ar: "العربية",
  en: "English",
  fr: "Français",
};

/** BCP 47 tags for `Intl.NumberFormat` / `Intl.DateTimeFormat`. */
export const localeTags: Record<Locale, string> = {
  ar: "ar-TN",
  en: "en-US",
  fr: "fr-FR",
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  // Every locale carries its prefix, including the default. A single
  // canonical URL per locale keeps hreflang honest and avoids the duplicate
  // "/" and "/ar" content pair that "as-needed" produces.
  localePrefix: "always",
  localeDetection: true,
});
