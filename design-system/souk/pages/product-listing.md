# Product Listing Overrides

> **PROJECT:** Souk
> **Page Type:** Catalogue / search results
> **Authored** — replaces the generator's stub.

> ⚠️ Rules here **override** `design-system/souk/MASTER.md`.

---

## Layout Overrides

- **Content max width:** `1440px` — wider than the landing page; this view is dense by
  intent and a 4-column grid at 1280px wastes the outer thirds on large screens.
- **Desktop (`lg+`):** filter rail `280px` on the inline-start edge, `position: sticky`,
  `top: <header height>`, own scroll container. Results grid fills the rest.
- **Mobile / tablet:** filters collapse into a bottom sheet opened by a sticky
  "Filter & sort" bar. The bar is `position: sticky; bottom: 0` and must clear
  `env(safe-area-inset-bottom)`.

## Grid

| Breakpoint | Columns |
|---|---|
| 375px | 2 |
| 768px | 3 |
| 1024px | 3 (rail visible) |
| 1440px | 4 (rail visible) |

## Spacing Overrides

- Density steps up from 4/10 to **6/10**. Card padding `--space-md`, not `--space-lg`.

## Component Overrides

- **Product card** loses the hover lift from the Master `.card` spec. A grid of 24 cards
  that each rise on hover reads as noise; instead the image gets a 200ms
  `filter: brightness(0.96)` and the title takes the accent colour.
- **Pagination**: numbered, not infinite scroll. Infinite scroll makes the footer
  unreachable and breaks back-navigation to a product the shopper already opened.
  Page state lives in the URL (`?page=`, `?sort=`, `?category=`) so results are
  shareable and the back button restores the exact view.

## States (all four required)

- **Loading** — skeleton cards matching the real card's exact dimensions, same count as
  the page size. Not a spinner: a spinner in a grid causes a full reflow on arrival.
- **Empty (no products)** — illustration, one line of explanation, a "clear filters"
  action. Never a bare "No results".
- **Empty (filters too narrow)** — distinct from above; lists the active filters as
  removable chips.
- **Error** — retry action, and the filter state is preserved across the retry.

## RTL

- The filter rail moves to the right edge in `ar`. Achieved with `grid-template-areas`
  and logical properties, never a `direction`-conditional `left`/`right`.
- Sort dropdown alignment, chip removal "×" position, and pagination arrow direction all
  mirror. Pagination arrows: "next" points inline-end, which is *left* in RTL.
- Price and quantity remain LTR-rendered inside RTL text — wrap numerals in
  `<bdi>` so `120 TND` does not reorder to `TND 120` unintentionally.

## Checklist Additions

- [ ] Filter sheet is keyboard-operable and focus-trapped
- [ ] Sticky mobile bar does not cover the last row of results
- [ ] URL fully describes the view; reload and back both restore it
- [ ] Skeletons match real card dimensions exactly
