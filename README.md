# Souk

A multilingual e-commerce platform: a public storefront in Arabic, English and
French, and a private admin dashboard where every piece of site content —
text, logo, images, products, sections — is editable. Nothing shown on the
storefront is hardcoded.

> **Status: Phase 1 of 7 complete.** The foundation is in place and verified:
> locale routing with RTL, design tokens, theming, database and auth wiring,
> and the check suite. The data model, admin and storefront are not built yet.
> See [Roadmap](#roadmap).

## Stack

| Concern        | Choice                                               |
| -------------- | ---------------------------------------------------- |
| Framework      | Next.js 16 (App Router, React 19, TypeScript strict) |
| Database       | Supabase Postgres                                    |
| ORM            | Prisma 7 (driver adapters)                           |
| Auth & Storage | Supabase                                             |
| Styling        | Tailwind CSS 4 + shadcn/ui primitives                |
| i18n           | next-intl — `ar`, `en`, `fr`, full RTL               |
| Validation     | Zod, shared between client and server                |
| Client data    | TanStack Query                                       |

Next.js serves both the frontend and the API layer (Route Handlers and Server
Actions). There is no separate backend: one repository, one deployment.

## Getting started

Requires Node.js 20+ and a Supabase project.

```bash
npm install                 # runs `prisma generate` afterwards
cp .env.example .env.local  # then fill it in — see below
npm run dev                 # http://localhost:3000
```

`/` redirects to a locale based on the `Accept-Language` header, so the first
page you land on is `/ar`, `/en` or `/fr`.

### Environment

Every variable is documented in [`.env.example`](.env.example). The one that
catches people out is the pair of connection strings:

| Variable       | Port | Used by          | Why                                                                                                              |
| -------------- | ---- | ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL` | 6543 | the running app  | Pooled through PgBouncer. Serverless functions open a connection per invocation and would exhaust a direct pool. |
| `DIRECT_URL`   | 5432 | `prisma migrate` | Migrations take advisory locks and run DDL, neither of which survives transaction pooling.                       |

`SUPABASE_SERVICE_ROLE_KEY` bypasses Row Level Security. It is server-only. If
it ever reaches a `NEXT_PUBLIC_` variable, client code, or a commit, rotate it.

Note for anyone used to earlier Prisma versions: `prisma/schema.prisma` carries
**no** `url` or `directUrl`. Prisma 7 takes connection strings from a driver
adapter at runtime ([`lib/prisma.ts`](lib/prisma.ts)) and from
[`prisma.config.ts`](prisma.config.ts) for CLI commands.

## Scripts

```bash
npm run dev              # dev server
npm run build            # production build
npm run check            # typecheck + lint + message parity + colour contrast

npm run typecheck        # tsc --noEmit
npm run lint             # eslint
npm run format           # prettier --write
npm run check:messages   # every locale has the same keys and placeholders
npm run check:contrast   # every colour pair meets WCAG 2.1

npm run db:generate      # prisma generate
npm run db:migrate       # prisma migrate dev   (needs DIRECT_URL)
npm run db:deploy        # prisma migrate deploy
npm run db:seed          # seed demo data       (Phase 2)
npm run db:studio        # prisma studio
```

`npm run check` is what CI runs. Two of its four steps are unusual and worth
knowing about:

- **`check:messages`** — next-intl falls back to the message _key_ when a
  translation is missing, so a gap ships silently as `Nav.trackOrder` rendered
  on the page. This turns that into a build failure, and also catches
  placeholder mismatches between languages.
- **`check:contrast`** — asserts 15 colour pairs per theme against WCAG 2.1
  minimums. The design system's generated palette shipped three failures; this
  keeps them from coming back.

## Layout

```
app/[locale]/          all routes are locale-prefixed
  (shop)/              public storefront          — Phase 5–6
  (admin)/             admin dashboard            — Phase 3–4
  layout.tsx           root layout: fonts, dir, providers
components/
  ui/                  design-system primitives
  layout/              header, footer, switchers
i18n/                  routing, navigation, request config
lib/
  supabase/            browser, server and service-role clients
  env.ts               Zod-validated environment
  money.ts             integer minor units, locale formatting
  prisma.ts            lazy singleton client
messages/              ar.json, en.json, fr.json
prisma/                schema and migrations
design-system/         MASTER.md, page overrides, contrast checker
scripts/               repository checks
```

### Conventions

- **Never hardcode a colour, size or font.** Everything resolves through a
  token defined in [`app/globals.css`](app/globals.css), sourced from
  [`design-system/souk/MASTER.md`](design-system/souk/MASTER.md).
- **Import `Link` from `@/i18n/navigation`**, never from `next/link`. ESLint
  enforces this: the plain version drops the locale prefix and sends every
  click through a middleware redirect.
- **Use logical properties** — `ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`.
  No component should contain the words left or right. `dir` on `<html>` does
  the rest.
- **Money is an integer in the currency's minor unit.** Never a float. TND has
  **three** decimal places, so code that assumes two is wrong by 100×. See
  [`lib/money.ts`](lib/money.ts).
- **Read `design-system/souk/pages/<page>.md` before building a page.** Its
  rules override MASTER.md for that page.

## Design system

`design-system/` is the source of truth for the visual language. It was
generated by the UI/UX Pro Max skill and then corrected — the generated output
had three contrast failures and no dark-mode palette. Every correction and
override is recorded in [`design-system/README.md`](design-system/README.md).

Palette: near-black `#1C1917` with a gold call-to-action `#A16207` on warm
off-white. Type: IBM Plex Sans Arabic + Inter, swapped per locale so each
script leads with the face designed for it, with looser line-heights for
Arabic.

## Internationalisation

Three locales — `ar`, `en`, `fr` — every one carrying its own URL prefix, so
each has a single canonical address and `hreflang` stays honest.

Arabic is right-to-left. Direction is set once, on `<html>`, and read from
`localeDirection()` rather than compared against `"ar"` anywhere, so adding
another RTL locale is a one-line change in
[`i18n/routing.ts`](i18n/routing.ts).

UI strings live in `messages/*.json`. **Database content — product names,
descriptions, section text — is translatable too**, and is edited in all three
languages side by side in the admin (Phase 4).

## Deployment

Vercel, with the repository connected:

1. Set every variable from `.env.example` in the project settings.
   `NEXT_PUBLIC_SITE_URL` must be the production origin, no trailing slash.
2. `npm install` runs `prisma generate` through `postinstall`, so no custom
   build command is needed.
3. Run `npm run db:deploy` against production to apply migrations. Point
   `DIRECT_URL` at the direct connection when you do.
4. Add the deployed origin to Supabase → Authentication → URL Configuration,
   or the admin login redirect will be rejected.

## Roadmap

| Phase | Scope                                                  | Status |
| ----- | ------------------------------------------------------ | ------ |
| 0     | Design tooling, design system, page overrides          | Done   |
| 1     | Scaffold, Tailwind tokens, next-intl, Prisma, Supabase | Done   |
| 2     | Prisma schema, first migration, seed script            | Next   |
| 3     | Admin auth, layout, product management                 |        |
| 4     | Orders, suppliers, delivery, content, media, settings  |        |
| 5     | Storefront: landing, listing, product detail           |        |
| 6     | Cart, checkout, order flow, delivery fee calculation   |        |
| 7     | i18n completion, PWA, accessibility pass, performance  |        |
