# Shop route group

Public storefront. Nothing in here requires authentication.

Planned (Phase 5–6):

```
(shop)/
  layout.tsx              header, footer, cart drawer, mobile bottom nav
  page.tsx                landing page — moves here from app/[locale]/page.tsx
  products/page.tsx       listing: search, filter, sort, pagination
  products/[slug]/page.tsx  detail: gallery, add to cart
  cart/page.tsx
  checkout/page.tsx
  orders/[number]/page.tsx  confirmation
  track/page.tsx          order tracking by number
  contact/page.tsx
```

Read `design-system/souk/pages/<page>.md` before building each of these.
