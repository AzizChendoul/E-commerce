import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Must come last: turns off every stylistic rule that would fight Prettier.
  prettier,
  {
    rules: {
      // An unused variable is usually a leftover. `_`-prefixed names are the
      // documented way to say "required by the signature, deliberately unused".
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    // Locale-aware navigation only. next/link drops the locale prefix, which
    // sends every click through the middleware for a redirect.
    files: ["app/**/*.tsx", "components/**/*.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "next/link",
              message: "Import Link from '@/i18n/navigation' so the locale prefix is kept.",
            },
            {
              name: "next/navigation",
              importNames: ["redirect", "permanentRedirect", "useRouter", "usePathname"],
              message: "Import these from '@/i18n/navigation' so the locale prefix is kept.",
            },
          ],
        },
      ],
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
    // Prisma output — regenerated, never edited.
    "lib/generated/**",
    // Vendored design tooling and its data, not project source.
    ".claude/**",
    "design-system/**",
  ]),
]);

export default eslintConfig;
