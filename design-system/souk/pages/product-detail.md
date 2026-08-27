# Product Detail Overrides

> **PROJECT:** Souk
> **Page Type:** Product detail (PDP)
> **Authored** — replaces the generator's stub.

> ⚠️ Rules here **override** `design-system/souk/MASTER.md`.

---

## Layout Overrides

- **Content max width:** `1280px`.
- **Desktop (`lg+`):** two columns — gallery `58%` / buy panel `42%`, gap `--space-2xl`.
  The buy panel is `position: sticky; top: <header height>` so price and "Add to cart"
  stay reachable while the description scrolls.
- **Mobile:** single column, gallery first, then title/price, then buy actions.
- **Sticky mobile buy bar:** appears once the inline "Add to cart" scrolls out of view.
  `position: fixed; bottom: 0`, respects `env(safe-area-inset-bottom)`, height ≥ `64px`
  so the button itself clears the 44px touch minimum with padding.

## Gallery

- Aspect ratio locked to `1/1`. Thumbnails run inline-start of the main image on `lg+`,
  and below it on mobile as a horizontally scrollable strip with `scroll-snap-type: x mandatory`.
- The primary image is the LCP element: `priority`, explicit `sizes`, and a
  `ProductImage.altText` value that is required at upload, not optional.
- Zoom is click-to-open a dialog, not hover-magnify — hover-only interactions are
  unreachable on touch and the anti-pattern list forbids them.

## Typography Overrides

- **Product title:** `--text-3xl` mobile, `--text-4xl` at `lg`, weight 600.
- **Price:** `--text-2xl`, weight 600, `--color-accent`. Compare-at price sits beside it
  at `--text-lg`, `--color-muted-foreground`, with `text-decoration: line-through`.
  A struck price must also carry a visually hidden "was" label — strikethrough alone
  conveys nothing to a screen reader.

## Component Overrides

- **Quantity stepper:** buttons are `44×44px` minimum. The numeric field is a real
  `<input type="number">` with a label, not a display-only span.
- **Stock indicator:** three states — in stock, low stock (below the threshold in
  `SiteSetting`), out of stock. Colour is never the only signal; each state carries text.
- **Out of stock:** the "Add to cart" button is `disabled` **and** the reason is stated
  next to it. Stock is re-checked server-side at order time regardless of what the page
  showed.

## States

- **Loading** — skeleton with the gallery square and three text bars at the real sizes.
- **Not found** — 404 with a link back to the category, not a blank page.
- **Add-to-cart failure** — toast plus an inline message on the button; the optimistic
  cart count rolls back.

## RTL

- The two-column order flips: buy panel on the inline-start in `ar`. Use `grid` with
  logical column placement so nothing needs a `dir`-conditional rule.
- The thumbnail strip scrolls right-to-left; `scroll-snap` handles this natively once
  `dir="rtl"` is set on the container.
- The quantity stepper's minus/plus keep their visual left/right order in both
  directions — decrement on the left, increment on the right. Mirroring these is a known
  usability regression: they map to a number line, not to reading order.
- `<bdi>` around price and SKU.

## Checklist Additions

- [ ] Sticky buy bar does not overlap the footer or the last content block
- [ ] Gallery keyboard-navigable; dialog focus-trapped and restores focus on close
- [ ] Every image has a non-empty `altText` from the database
- [ ] Stepper reachable and operable at 375px with one thumb
