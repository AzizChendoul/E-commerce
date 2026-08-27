# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Souk
**Generated:** 2026-08-27 18:24:35
**Category:** E-commerce Luxury
**Design Dials:** Variance 4/10 (Balanced / Modern) | Motion 3/10 (Subtle) | Density 4/10 (Standard)

> **Overrides applied after generation.** Four sections below were changed from the
> generator's output. Each override and its rationale is recorded in
> `design-system/README.md`; every colour pair is machine-verified by
> `python3 design-system/scripts/check-contrast.py`.
>
> | Section | Generated | Now | Why |
> |---|---|---|---|
> | Typography | Cormorant + Montserrat | IBM Plex Sans Arabic + Inter | Neither generated face supports Arabic; `ar` is a required locale. |
> | Style | Liquid Glass | Minimalism & Swiss Style | Liquid Glass is `risk:conditional` / `cost:moderate` (blur-driven); the project targets WCAG AA and Lighthouse ≥ 90. Replacement taken from the same `styles.csv`. |
> | Colour tokens | — | `muted`, `muted-foreground`, `destructive` retoned; `input` added | Generated `muted` was cool slate (`#E8ECF0`) inside a warm stone ramp; no token met the 3:1 boundary minimum for form controls. |
> | Dark mode | not generated | full second palette | Dark mode is a project requirement. |

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable | Notes |
|------|-----|--------------|-------|
| Primary | `#1C1917` | `--color-primary` | Brand / primary action |
| On Primary | `#FFFFFF` | `--color-on-primary` | 17.49:1 |
| Secondary | `#44403C` | `--color-secondary` | |
| On Secondary | `#FFFFFF` | `--color-on-secondary` | 10.27:1 |
| Accent/CTA | `#A16207` | `--color-accent` | "Add to cart", price emphasis |
| On Accent/CTA | `#FFFFFF` | `--color-on-accent` | 4.92:1 |
| Background | `#FAFAF9` | `--color-background` | |
| Foreground | `#0C0A09` | `--color-foreground` | 18.92:1 |
| Card | `#FFFFFF` | `--color-card` | |
| Card Foreground | `#0C0A09` | `--color-card-foreground` | 19.76:1 |
| Muted | `#F5F5F4` | `--color-muted` | Retoned warm (was `#E8ECF0`) |
| Muted Foreground | `#57534E` | `--color-muted-foreground` | Retoned warm (was `#475569`), 7.30:1 |
| Border | `#D6D3D1` | `--color-border` | **Decorative hairline only** |
| Input | `#8C8681` | `--color-input` | **Added.** Control boundary, 3.44:1 |
| Destructive | `#B91C1C` | `--color-destructive` | Darkened from `#DC2626` for 4.5:1 with white |
| On Destructive | `#FFFFFF` | `--color-on-destructive` | 6.47:1 |
| Ring | `#1C1917` | `--color-ring` | Focus ring, 16.74:1 |

`--color-border` is a hairline between surfaces that are already distinguished by
their own background, so WCAG 1.4.11 does not apply to it. Any boundary that is the
**only** indicator of a control — text inputs, selects, checkboxes, outline buttons —
must use `--color-input`.

### Color Palette — Dark Mode

| Role | Hex | CSS Variable | Notes |
|------|-----|--------------|-------|
| Primary | `#FAFAF9` | `--color-primary` | Inverted: light surface on dark |
| On Primary | `#1C1917` | `--color-on-primary` | 16.74:1 |
| Secondary | `#292524` | `--color-secondary` | |
| On Secondary | `#E7E5E4` | `--color-on-secondary` | 12.08:1 |
| Accent/CTA | `#D6A312` | `--color-accent` | Brightened gold; `#A16207` is too dark here |
| On Accent/CTA | `#1C1917` | `--color-on-accent` | 7.58:1 |
| Background | `#0C0A09` | `--color-background` | |
| Foreground | `#FAFAF9` | `--color-foreground` | 18.92:1 |
| Card | `#1C1917` | `--color-card` | |
| Card Foreground | `#FAFAF9` | `--color-card-foreground` | 16.74:1 |
| Muted | `#292524` | `--color-muted` | |
| Muted Foreground | `#A8A29E` | `--color-muted-foreground` | 7.83:1 |
| Border | `#44403C` | `--color-border` | Decorative hairline only |
| Input | `#78716C` | `--color-input` | Control boundary, 4.12:1 |
| Destructive | `#F87171` | `--color-destructive` | |
| On Destructive | `#1C1917` | `--color-on-destructive` | 6.32:1 |
| Ring | `#D6D3D1` | `--color-ring` | 13.26:1 |

**Color Notes:** Premium dark + gold accent. Neutral base so product photography
carries the colour. Verified with `python3 design-system/scripts/check-contrast.py`.

### Typography

- **Heading Font:** IBM Plex Sans Arabic (Arabic) / Inter (Latin)
- **Body Font:** IBM Plex Sans Arabic (Arabic) / Inter (Latin)
- **Mood:** modern, refined, neutral, highly legible, multilingual
- **Overridden** from the generated Cormorant + Montserrat: neither covers Arabic, and
  `ar` is a required locale. The skill's `typography.csv` holds only one Arabic pairing
  (Noto Naskh + Noto Sans Arabic); Naskh is a traditional calligraphic face with weak
  Latin coverage, so this pairing was chosen outside the database.

**Loading:** both faces are variable and self-hosted through `next/font/google`, so
there is no render-blocking `@import` and no layout shift. The Arabic face is applied
via the `ar` locale on `<html>`, not per element.

```ts
// app/[locale]/layout.tsx
import { Inter } from "next/font/google";
import { IBM_Plex_Sans_Arabic } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-latin", display: "swap" });
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});
```

```css
/* Latin locales lead with Inter and fall back to the Arabic face for stray glyphs;
   the ar locale reverses the order. One rule, no per-component font classes. */
:root       { --font-sans: var(--font-latin), var(--font-arabic), system-ui, sans-serif; }
:root:lang(ar) { --font-sans: var(--font-arabic), var(--font-latin), system-ui, sans-serif; }
```

### Type Scale

Base 16px, 1.25 (major third). Line-height loosens for Arabic, which sits taller and
needs more leading than Latin at the same size.

| Token | Size | Line-height (Latin) | Line-height (Arabic) | Usage |
|-------|------|--------------------|----------------------|-------|
| `--text-xs` | `0.75rem` / 12px | 1.5 | 1.7 | Labels, badges |
| `--text-sm` | `0.875rem` / 14px | 1.5 | 1.7 | Secondary text |
| `--text-base` | `1rem` / 16px | 1.6 | 1.8 | Body — never below this |
| `--text-lg` | `1.125rem` / 18px | 1.5 | 1.7 | Lead paragraph |
| `--text-xl` | `1.25rem` / 20px | 1.4 | 1.6 | Card titles |
| `--text-2xl` | `1.5rem` / 24px | 1.3 | 1.5 | Section headings (mobile) |
| `--text-3xl` | `1.875rem` / 30px | 1.25 | 1.45 | Section headings |
| `--text-4xl` | `2.25rem` / 36px | 1.2 | 1.4 | Page titles |
| `--text-5xl` | `3rem` / 48px | 1.1 | 1.3 | Hero (mobile) |
| `--text-6xl` | `3.75rem` / 60px | 1.05 | 1.25 | Hero (desktop) |

### Spacing Variables

*Density: 4/10 — Standard*

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: #A16207;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #1C1917;
  border: 2px solid #1C1917;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}
```

### Cards

```css
.card {
  background: #FFFFFF;      /* --color-card -- #FAFAF9 is --color-background */
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  transition: all 200ms ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #8C8681;   /* --color-input -- #E2E8F0 is 1.3:1 and fails WCAG 1.4.11 */
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #1C1917;
  outline: none;
  box-shadow: 0 0 0 3px #1C191720;
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Minimalism & Swiss Style *(overrides the generated "Liquid Glass")*

**Keywords:** Clean, simple, spacious, functional, white space, high contrast, geometric,
sans-serif, grid-based, essential

**Best For:** Enterprise apps, dashboards, documentation sites, SaaS platforms,
professional tools — and, here, a product catalogue where the photography carries the
visual weight and the chrome stays out of its way.

**Key Effects:** Subtle hover (200-250ms), smooth transitions, sharp shadows if any,
clear type hierarchy, fast loading

**Performance:** `cost:low | drivers:none` — against Liquid Glass's
`cost:moderate | drivers:animation,blur`
**Accessibility:** `risk:low` — against Liquid Glass's `risk:conditional`
**Light / Dark:** both supported

**Implementation checklist** (from `styles.csv`):

- [ ] Grid-based layout, 12-16 columns
- [ ] Typography hierarchy clear
- [ ] No unnecessary decorations
- [ ] Text contrast measured against the project target (4.5:1)
- [ ] Mobile responsive grid

**Design system variables** (from `styles.csv`): `--spacing: 2rem`, `--border-radius: 0px`,
`--font-weight: 400-700`, `--shadow: none`, `--accent-color: single primary only`

> **Deviation from the Swiss defaults, deliberate:** the row above prescribes
> `border-radius: 0` and `shadow: none`. This project keeps the 8px/12px radii and the
> shadow scale defined above, because touch affordance on mobile reads better with a
> soft edge and the card grid needs a lift cue that is not a border. Everything else in
> the checklist is followed as written.

### Page Pattern

**Pattern Name:** Feature-Rich Showcase

- **Conversion Strategy:** Clear feature hierarchy. One key message per card. Strong CTA repetition.
- **CTA Placement:** Hero (sticky) + After features + Bottom
- **Section Order:** Hero (value prop) > Feature grid/cards (4-6) > Use cases or benefits > Social proof or logos > CTA

---

## Motion

**Scroll Reveal** (Subtle) — Trigger: scroll (viewport enter) | Duration: 300-400ms | Easing: `power1.out`

```js
gsap.from(el, { opacity: 0, y: 12, duration: 0.35, ease: 'power1.out', scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' } });
```

**Framework notes:** Requires the ScrollTrigger plugin registered once via gsap.registerPlugin(ScrollTrigger); Use matchMedia('(prefers-reduced-motion: reduce)') to skip non-essential motion and render the final state immediately

- ✅ Keep the y offset small (8-16px) so it reads as a fade, not a slide
- ❌ Don't reveal below-the-fold content needed for SEO/crawlers as invisible-by-default without a no-JS fallback
- ⚡ toggleActions 'play none none reverse' avoids re-triggering on every scroll direction change

---

## Anti-Patterns (Do NOT Use)

- ❌ Vibrant & Block-based
- ❌ Playful colors

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
