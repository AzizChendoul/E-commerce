import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Providers } from "@/components/providers";
import { type Locale, localeDirection, localeTags, routing } from "@/i18n/routing";

import "../globals.css";

/**
 * Both faces are variable and self-hosted by next/font, so there is no
 * render-blocking stylesheet request and no layout shift when they land.
 * `display: "swap"` shows fallback text immediately rather than holding the
 * page blank.
 *
 * The variables feed `--font-sans` in globals.css, which reorders them under
 * `:lang(ar)` so each script leads with the face designed for it.
 */
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-latin",
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: "Metadata" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return {
    metadataBase: new URL(siteUrl),
    title: { default: t("title"), template: `%s · ${t("title")}` },
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      // Search engines need every translation of a page declared, or they
      // treat the three locales as competing duplicates.
      languages: Object.fromEntries(routing.locales.map((l) => [localeTags[l], `/${l}`])),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Opts this subtree into static rendering. Without it every page under
  // [locale] is rendered per request, because reading the locale counts as
  // reading a dynamic value.
  setRequestLocale(locale);

  const typedLocale = locale as Locale;
  const direction = localeDirection(typedLocale);
  const t = await getTranslations({ locale, namespace: "Common" });

  return (
    // `dir` on <html> is what makes every logical CSS property (ms-, me-, ps-,
    // pe-, start, end) resolve correctly. No component needs to know which
    // direction it is in.
    //
    // suppressHydrationWarning is required by next-themes: it writes the theme
    // class onto <html> before React hydrates, so the server and client markup
    // differ by design on this one element.
    <html
      lang={locale}
      dir={direction}
      className={`${inter.variable} ${plexArabic.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* First focusable element on the page. Keyboard and screen-reader
            users should not have to tab through the whole header to reach the
            content. Visually hidden until focused. */}
        <a
          href="#main"
          className="sr-only rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:ring-2 focus:ring-ring"
        >
          {t("skipToContent")}
        </a>
        <NextIntlClientProvider>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
