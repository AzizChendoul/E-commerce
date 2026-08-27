"use client";

import { useEffect } from "react";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

/**
 * Route-level error boundary. Catches anything thrown while rendering a page
 * in this segment so a single failing query does not blank the whole site.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // The digest is the only handle on the server-side stack trace, which is
    // deliberately withheld from the browser.
    console.error(error);
  }, [error]);

  const t = useTranslations("Error");
  const tCommon = useTranslations("Common");

  return (
    <main
      id="main"
      className="mx-auto flex min-h-[60svh] max-w-xl flex-col justify-center px-4 py-16 text-center"
    >
      <h1 className="mb-3 text-3xl font-semibold">{t("title")}</h1>
      <p className="mb-8 text-pretty text-muted-foreground">{t("body")}</p>
      <div>
        <Button variant="cta" onClick={reset}>
          {tCommon("retry")}
        </Button>
      </div>
      {error.digest ? (
        <p className="mt-8 text-xs text-muted-foreground">
          <code>{error.digest}</code>
        </p>
      ) : null}
    </main>
  );
}
