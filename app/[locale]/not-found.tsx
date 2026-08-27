import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <main
      id="main"
      className="mx-auto flex min-h-[60svh] max-w-xl flex-col justify-center px-4 py-16 text-center"
    >
      <h1 className="mb-3 text-3xl font-semibold">{t("title")}</h1>
      <p className="mb-8 text-pretty text-muted-foreground">{t("body")}</p>
      <div>
        <Link href="/" className={buttonVariants({ variant: "cta" })}>
          {t("backHome")}
        </Link>
      </div>
    </main>
  );
}
