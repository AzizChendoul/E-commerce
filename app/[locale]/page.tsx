import { getTranslations, setRequestLocale } from "next-intl/server";

import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { type Locale, localeDirection } from "@/i18n/routing";
import { formatMoney } from "@/lib/money";

/**
 * Phase 1 scaffold verification page.
 *
 * Temporary. It exists to prove the foundation works end to end — locale
 * routing, direction, fonts, tokens, theming, money formatting — and is
 * replaced by the real landing page in Phase 5, where every string comes from
 * the database.
 */

// Swatches read from the same tokens the whole app uses; nothing here is a
// hex value. If a token is wrong, it is wrong here too.
const swatches = [
  { name: "background / foreground", className: "bg-background text-foreground border" },
  { name: "card / card-foreground", className: "bg-card text-card-foreground border" },
  { name: "primary", className: "bg-primary text-primary-foreground" },
  { name: "cta", className: "bg-cta text-cta-foreground" },
  { name: "secondary", className: "bg-secondary text-secondary-foreground" },
  { name: "muted", className: "bg-muted text-muted-foreground" },
  { name: "destructive", className: "bg-destructive text-destructive-foreground" },
  { name: "success", className: "bg-success text-success-foreground" },
] as const;

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Home");
  const typedLocale = locale as Locale;
  const direction = localeDirection(typedLocale);

  return (
    <main id="main" className="mx-auto w-full max-w-5xl px-4 py-12 md:px-6 lg:px-8">
      <header className="mb-12 flex flex-wrap items-center justify-between gap-4">
        <LocaleSwitcher />
        <ThemeToggle />
      </header>

      <section className="mb-16">
        <p className="mb-3 text-sm font-medium tracking-wide text-cta uppercase">
          {t("heroEyebrow")}
        </p>
        <h1 className="mb-5 text-4xl font-semibold text-balance md:text-5xl">
          {t("heroTitle")}
        </h1>
        <p className="max-w-2xl text-lg text-pretty text-muted-foreground">{t("heroBody")}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="cta" size="lg">
            {formatMoney(129_500, "TND", typedLocale)}
          </Button>
          <Button variant="outline" size="lg">
            {formatMoney(0, "TND", typedLocale)}
          </Button>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-2 text-2xl font-semibold">{t("tokensHeading")}</h2>
        <p className="mb-6 text-muted-foreground">{t("tokensBody")}</p>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {swatches.map((swatch) => (
            <li
              key={swatch.name}
              className={`rounded-lg border-border p-4 text-sm ${swatch.className}`}
            >
              {swatch.name}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-2 text-2xl font-semibold">{t("directionHeading")}</h2>
        <p className="text-pretty text-muted-foreground">
          {t("directionBody", { dir: direction.toUpperCase() })}
        </p>
        {/* ps-/border-s- are logical: they resolve to the left in LTR and the
            right in RTL without a single direction check in the markup. */}
        <p className="mt-6 border-s-4 border-cta ps-4 text-sm text-muted-foreground">
          <code>ps-4 border-s-4</code>
        </p>
      </section>
    </main>
  );
}
