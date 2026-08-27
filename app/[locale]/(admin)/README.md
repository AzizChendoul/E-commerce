# Admin route group

Private dashboard at `/[locale]/admin`, behind Supabase Auth.

Every page and every mutation in this group re-checks the session and the
caller's role **on the server**. A client-side guard is a convenience for the
user, never a security boundary.

Planned (Phase 3–4):

```
(admin)/
  admin/layout.tsx        sidebar, role guard
  admin/page.tsx          KPIs, recent orders, low stock
  admin/products/         CRUD, multi-image upload, bulk actions
  admin/orders/           list, detail, status transitions, invoice
  admin/suppliers/        CRUD, restock records
  admin/deliveries/       assignment, carriers, zones and fees
  admin/content/          content blocks in ar/en/fr side by side
  admin/media/            logo, favicon, media library
  admin/settings/         store info, contact, socials, currency, locales
```

Read `design-system/souk/pages/admin-dashboard.md` before building any of it —
the admin runs at a different density from the storefront.
