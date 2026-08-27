# Landing Page Overrides

> **PROJECT:** Souk
> **Page Type:** Storefront home
> **Authored** — replaces the generator's stub, which prescribed an 800px single-column
> centred layout and per-segment A/B colour testing. Neither fits a product catalogue.

> ⚠️ Rules here **override** `design-system/souk/MASTER.md`. Anything not listed
> follows the Master.

---

## Section Order (fixed)

1. Hero
2. Best Sellers
3. New Arrivals
4. Three value propositions
5. Client feedback
6. Footer

Every string, image and product set in these sections comes from the database
(`ContentBlock`, `SiteSetting`, `Product`, `Testimonial`). Nothing is hardcoded.

## Layout Overrides

- **Content max width:** `1280px`, gutters `16px` mobile / `24px` md / `32px` lg.
- **Hero:** full-bleed, breaks the container. Min height `72svh` mobile, `88svh` lg —
  `svh` not `vh`, so the mobile browser chrome does not clip the CTA.
- **Section rhythm:** `--space-3xl` (64px) between sections on mobile, `96px` at `lg`.
  The value-prop band sits on `--color-muted` to break the page into two visual halves.

## Product Grid

| Breakpoint | Columns | Gap |
|---|---|---|
| 375px | 2 | `--space-md` |
| 768px | 3 | `--space-lg` |
| 1024px | 4 | `--space-lg` |
| 1440px | 4 (wider cards, container caps at 1280px) | `--space-xl` |

Two columns on mobile, not one: shoppers scan a catalogue, and a single column turns
eight products into eight screens. Card aspect ratio is fixed at `3/4` for the image so
the grid never reflows as images load (CLS).

Best Sellers shows 8, New Arrivals shows 8, each with a "Show more" link to the listing
page pre-filtered on that sort order.

## Typography Overrides

- **Hero headline:** `clamp(2.25rem, 6vw, 3.75rem)`, weight 600, `letter-spacing: -0.02em`.
  The stub suggested `clamp(3rem, 10vw, 12rem)` at weight 900 — that is a poster, not a
  storefront, and Arabic has no 900 weight in IBM Plex Sans Arabic, so the `ar` hero
  would silently fall back and look different from `en`/`fr`.
- **Never apply negative letter-spacing under `:lang(ar)`.** Arabic is cursive; tightening
  tracking breaks the joins. Scope it: `:where(:not(:lang(ar))) .hero-title`.

## Color Overrides

- Hero text sits on an image. Use a `--color-foreground`-derived scrim
  (`linear-gradient` to `rgb(12 10 9 / 0.55)`), not a blanket opacity on the image —
  the contrast check must pass against the darkest scrim value, not the average.
- Exactly one `--color-accent` CTA above the fold. The accent is also the price colour;
  it must not compete with itself.

## Motion

Motion dial is 3/10 (Subtle). One effect only: fade-up on scroll-enter, 300–400ms,
8–16px travel, `power1.out`, `toggleActions: 'play none none reverse'`.

- Wrapped in `matchMedia('(prefers-reduced-motion: reduce)')` — reduced motion renders
  the final state immediately, it does not merely shorten the duration.
- Content is **visible by default** in CSS and animated from a class added on mount, so
  a crawler or a no-JS client sees the copy. Never `opacity: 0` in the stylesheet.
- No parallax on the hero image: it costs a scroll listener and janks on mid-range
  Android, which is the primary device class here.

## RTL

- Hero content block is `start`-aligned via `text-align: start`, not `text-align: left`.
- The "Show more" chevron must mirror. Use a logical icon swap on `dir`, not
  `transform: scaleX(-1)` — that also mirrors any glyph inside it.
- Carousel drag direction and the testimonial next/previous controls invert in RTL.

## Page-Specific Components

- `HeroSection` — server component; background image via `next/image` with
  `priority` and `sizes="100vw"`. It is the LCP element.
- `ProductCarouselSection` — shared by Best Sellers and New Arrivals.
- `ValuePropCards` — 3 cards, Lucide SVG icons, never emoji.
- `TestimonialCarousel` — client component; keyboard-operable (arrow keys), pauses on
  focus and hover, `aria-roledescription="carousel"` with a live region for the index.

## Checklist Additions

- [ ] Hero LCP under 2.5s on a 4x-throttled mobile profile
- [ ] Hero renders correctly at 375px with the CTA above the fold
- [ ] `ar` hero headline verified for joined letterforms (no tracking applied)
- [ ] Product grid does not reflow while images load
