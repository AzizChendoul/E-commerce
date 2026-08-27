# Admin Dashboard Overrides

> **PROJECT:** Souk
> **Page Type:** Private admin (`/[locale]/admin`)
> **Authored** — replaces the generator's stub.

> ⚠️ Rules here **override** `design-system/souk/MASTER.md`.

---

## Density

The storefront runs at density 4/10. **Admin runs at 7/10.** Operators work here all day
and scan tables, not marketing copy.

| Token | Storefront | Admin |
|---|---|---|
| Card padding | `--space-lg` (24px) | `--space-md` (16px) |
| Section gap | `--space-3xl` (64px) | `--space-xl` (32px) |
| Table row height | — | `44px` (still meets the touch minimum) |
| Base font | 16px | 14px for table cells, 16px for all form inputs |

Form inputs stay at 16px even in admin — the iOS zoom-on-focus problem does not care
which side of the app you are on, and the admin is used on phones for order status updates.

## Layout Overrides

- **Full width**, no `max-width` cap. Tables use the screen they are given.
- **Desktop:** persistent sidebar `256px`, collapsible to a `64px` icon rail.
- **Mobile:** sidebar becomes a drawer; a bottom tab bar carries the four most-used
  destinations (Orders, Products, Deliveries, Dashboard).

## Color Overrides

- The gold `--color-accent` is reserved for the single primary action per screen
  ("Save", "Create product"). It is **not** the storefront's price colour here.
- **Order status colours** are a dedicated scale, not reused semantic tokens, and each
  status always ships with its text label — colour alone never encodes status:

  | Status | Role |
  |---|---|
  | `PENDING` | neutral / muted |
  | `CONFIRMED` | info |
  | `PREPARING` | info, stronger |
  | `SHIPPED` | accent |
  | `DELIVERED` | success |
  | `CANCELLED` | destructive, de-emphasised |
  | `RETURNED` | warning |

  All seven must clear 4.5:1 as badge text against their own background, in both themes.
  Add them to `design-system/scripts/check-contrast.py` when they are defined.

## Component Overrides

- **Data table** is the primary component. Sticky header, sortable columns, per-column
  filters, row selection for bulk actions, and a column-visibility control. Horizontal
  overflow scrolls **inside the table container**, never the page body.
- **Mobile tables become cards.** A horizontally scrolling table at 375px is unusable;
  below `md` each row renders as a stacked card with the two or three fields that matter.
- **Destructive actions** open a confirm dialog naming the specific record
  ("Delete product *Fanous en laiton*?"), not a generic "Are you sure?". Bulk deletes
  name the count.
- **Toasts** for every mutation result, success and failure alike. A silent save leaves
  the operator re-checking.
- **Optimistic UI** for status transitions and reordering; anything that writes money or
  stock waits for the server.

## KPI Cards

Four across on `xl`, two on `md`, one on mobile. Each shows a value, a label, and a
period-over-period delta. The delta's arrow direction plus its sign carry the meaning —
red/green alone fails for colour-blind operators.

## Charts

- Recharts, themed from the CSS variables. No chart library default palettes.
- Every chart has a table equivalent reachable from the same card, because a canvas is
  invisible to a screen reader.
- Axis labels and tooltips are translated and locale-formatted.

## States

Empty states matter more here than on the storefront — a fresh install has no orders.
Every list needs a first-run empty state with the action that fills it ("No products
yet — create your first product"), distinct from a no-results-for-this-filter state.

## RTL

- The sidebar moves to the right edge in `ar`; table column order reverses; sort
  indicators and pagination mirror.
- **Numeric and currency columns stay LTR-rendered** inside RTL tables, right-aligned by
  logical property, so figures remain scannable in a column.
- The admin is a plausible place to work in one language while the store serves three:
  the admin locale is independent of the content locale being edited. The text-management
  screens show all three content languages side by side regardless of the admin's own UI
  language.

## Checklist Additions

- [ ] Every table usable at 375px (card fallback, not horizontal scroll)
- [ ] All seven status colours pass 4.5:1 in light and dark
- [ ] Status, KPI deltas, and stock levels never rely on colour alone
- [ ] Every destructive action names its target
- [ ] Every chart has a text/table equivalent
- [ ] Sidebar and drawer fully keyboard-navigable, focus trapped in the drawer
