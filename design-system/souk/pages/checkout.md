# Checkout Overrides

> **PROJECT:** Souk
> **Page Type:** Cart → checkout → confirmation
> **Authored** — replaces the generator's stub.

> ⚠️ Rules here **override** `design-system/souk/MASTER.md`.

---

## Layout Overrides

- **Content max width:** `1120px` — narrower than the catalogue. This is a form, and a
  form column wider than ~65 characters measurably slows completion.
- **Desktop (`lg+`):** form `62%` / order summary `38%`, summary `position: sticky`.
- **Mobile:** single column. The order summary collapses into an expandable row pinned
  to the top showing only the total; the full breakdown is one tap away. The shopper
  should never scroll past a summary to reach the fields.
- **Form column max width:** `560px`.

## Chrome Reduction

Checkout drops the full site header and the footer navigation: logo, a step indicator,
a "back to cart" link, and a trust line. Every other exit is a chance to abandon.
The language switcher stays — a shopper who switches to Arabic mid-checkout must not
lose their cart.

## Component Overrides

- **Inputs are `--text-base` (16px) minimum.** Below 16px iOS Safari zooms the viewport
  on focus and the layout jumps. This is not negotiable on any checkout field.
- **Labels are always visible**, above the field. Placeholder-as-label is on the
  anti-pattern list and fails the moment the field has content.
- **Errors render next to their field**, not only in a summary at the top, and the field
  gets `aria-invalid` plus `aria-describedby` pointing at the message.
- **Autocomplete attributes on every field** — `name`, `tel`, `email`,
  `address-line1`, `address-level2`, `postal-code`. This is the single highest-value
  mobile checkout improvement available.
- **Delivery zone** is a `<select>` populated from `DeliveryZone`. Selecting it updates
  the shipping fee and the total. The change must be announced in an `aria-live="polite"`
  region — a silently changing total is a dark pattern.

## Money

- The shipping fee and the total are recomputed **server-side** at order creation from
  the zone id. The client figure is a preview; it is never trusted.
- Currency and its decimal precision come from `SiteSetting`, not a hardcoded constant.
  TND uses **three** decimals, unlike most currencies — anything that assumes two will
  produce wrong totals. Store money in integer minor units.
- Prices render through `Intl.NumberFormat` with the active locale, wrapped in `<bdi>`.

## Cash on Delivery

COD is the default and, for now, the only method. The payment step still exists as its
own component with a method selector showing one option, so adding a gateway later is a
new branch in one place rather than a restructure.

## States

- **Empty cart** — an explanation and a route back to the catalogue, never a bare zero.
- **Submitting** — the submit button enters a loading state and is disabled; the form is
  guarded against double submission server-side too, via an idempotency key on the order.
- **Failure** — the entered data survives. A checkout error that clears the form is worse
  than the error.
- **Confirmation** — order number displayed prominently and copyable, since order
  tracking is by number.

## RTL

- Field labels, error icons, and the step indicator progress direction all mirror.
- Phone number and order number inputs stay LTR (`dir="ltr"` on the input) inside the
  RTL form — an Arabic-direction phone field puts the digits in the wrong order visually.
- The summary's price column aligns to the inline-end in both directions.

## Checklist Additions

- [ ] All inputs ≥ 16px; no viewport zoom on focus on iOS
- [ ] Every field has a visible label and an `autocomplete` attribute
- [ ] Total change on zone selection is announced to assistive tech
- [ ] Server recomputes shipping and total; client values discarded
- [ ] Double submission produces one order
- [ ] Full flow completed at 375px in `ar` with the keyboard only
