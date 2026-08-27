"use client";

import { useSyncExternalStore } from "react";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

const options = [
  { value: "light", Icon: Sun, key: "light" },
  { value: "dark", Icon: Moon, key: "dark" },
  { value: "system", Icon: Monitor, key: "system" },
] as const;

export function ThemeToggle() {
  const t = useTranslations("Theme");
  const { theme, setTheme } = useTheme();

  // The active theme is only known in the browser, so rendering the selected
  // state on the server would guarantee a hydration mismatch. This returns
  // false during SSR and the first client render, then true — the same effect
  // as a mounted flag, without a setState in an effect and the cascading
  // render that causes.
  //
  // The control is rendered either way, just unselected at first: one that
  // appears late shifts the layout.
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  return (
    <div
      role="radiogroup"
      aria-label={t("label")}
      className="inline-flex items-center rounded-md border border-input p-0.5"
    >
      {options.map(({ value, Icon, key }) => {
        const isActive = isHydrated && theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => setTheme(value)}
            className={cn(
              "inline-flex size-9 cursor-pointer items-center justify-center rounded transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              isActive
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {/* Lucide SVGs, never emoji. The icon alone carries no meaning to
                assistive tech, so the label is provided separately. */}
            <Icon aria-hidden className="size-4" />
            <span className="sr-only">{t(key)}</span>
          </button>
        );
      })}
    </div>
  );
}
