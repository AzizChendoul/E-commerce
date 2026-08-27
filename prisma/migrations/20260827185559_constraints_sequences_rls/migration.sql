-- =============================================================================
-- Integrity constraints, the order-number sequence, and Row Level Security.
--
-- None of this is expressible in the Prisma schema, so it lives in a
-- hand-written migration alongside the generated one. It is still a migration:
-- it runs in order, in every environment, and is never applied by hand in the
-- Supabase SQL editor.
-- =============================================================================


-- -----------------------------------------------------------------------------
-- 1. CHECK CONSTRAINTS
--
-- Application code validates with Zod, but validation that only exists in the
-- application is a convention, not a guarantee: a bad migration, a manual fix
-- in a SQL console, or a code path someone forgets will write the row anyway.
-- These are the invariants that must hold no matter who is writing.
-- -----------------------------------------------------------------------------

-- Money is never negative, and a "was" price below the selling price is a false
-- discount, not a discount.
ALTER TABLE "products"
  ADD CONSTRAINT "products_price_non_negative" CHECK ("price" >= 0),
  ADD CONSTRAINT "products_stock_non_negative" CHECK ("stock" >= 0),
  ADD CONSTRAINT "products_low_stock_threshold_non_negative" CHECK ("low_stock_threshold" >= 0),
  ADD CONSTRAINT "products_compare_at_price_above_price"
    CHECK ("compare_at_price" IS NULL OR "compare_at_price" > "price");

-- The stock check above is what makes the checkout transaction safe: two
-- concurrent orders for the last unit cannot both succeed, because the second
-- UPDATE violates it and the transaction rolls back. Without it, the losing
-- request would happily write stock = -1.

-- A line total that disagrees with quantity x unit price is an invoice that does
-- not add up. Keep the two in step at the database.
ALTER TABLE "order_items"
  ADD CONSTRAINT "order_items_quantity_positive" CHECK ("quantity" > 0),
  ADD CONSTRAINT "order_items_unit_price_non_negative" CHECK ("unit_price" >= 0),
  ADD CONSTRAINT "order_items_line_total_matches"
    CHECK ("line_total" = "unit_price" * "quantity");

ALTER TABLE "orders"
  ADD CONSTRAINT "orders_subtotal_non_negative" CHECK ("subtotal" >= 0),
  ADD CONSTRAINT "orders_shipping_cost_non_negative" CHECK ("shipping_cost" >= 0),
  ADD CONSTRAINT "orders_discount_non_negative" CHECK ("discount" >= 0),
  ADD CONSTRAINT "orders_total_matches"
    CHECK ("total" = "subtotal" + "shipping_cost" - "discount"),
  -- ISO 4217 minor units run from 0 (JPY, no decimals) to 4 (CLF). TND is 3.
  ADD CONSTRAINT "orders_currency_decimals_in_range"
    CHECK ("currency_decimals" BETWEEN 0 AND 4),
  ADD CONSTRAINT "orders_currency_is_iso_code"
    CHECK ("currency" ~ '^[A-Z]{3}$');

ALTER TABLE "delivery_zones"
  ADD CONSTRAINT "delivery_zones_shipping_fee_non_negative" CHECK ("shipping_fee" >= 0),
  ADD CONSTRAINT "delivery_zones_free_threshold_non_negative"
    CHECK ("free_shipping_threshold" IS NULL OR "free_shipping_threshold" >= 0),
  ADD CONSTRAINT "delivery_zones_estimated_days_ordered"
    CHECK (
      "estimated_days_min" IS NULL
      OR "estimated_days_max" IS NULL
      OR "estimated_days_min" <= "estimated_days_max"
    );

ALTER TABLE "deliveries"
  ADD CONSTRAINT "deliveries_shipping_fee_non_negative" CHECK ("shipping_fee" >= 0);

-- The storefront renders this as a five-star row. A 7 would render as seven.
ALTER TABLE "testimonials"
  ADD CONSTRAINT "testimonials_rating_in_range" CHECK ("rating" BETWEEN 1 AND 5);

ALTER TABLE "restock_records"
  ADD CONSTRAINT "restock_records_quantity_positive" CHECK ("quantity" > 0),
  ADD CONSTRAINT "restock_records_unit_cost_non_negative"
    CHECK ("unit_cost" IS NULL OR "unit_cost" >= 0);

-- Alt text is a locale map, not a bare string. Guarding the shape here stops a
-- malformed write from reaching a component that expects to index into it.
ALTER TABLE "product_images"
  ADD CONSTRAINT "product_images_alt_text_is_object"
    CHECK (jsonb_typeof("alt_text") = 'object');

ALTER TABLE "media_assets"
  ADD CONSTRAINT "media_assets_alt_text_is_object"
    CHECK ("alt_text" IS NULL OR jsonb_typeof("alt_text") = 'object'),
  ADD CONSTRAINT "media_assets_size_non_negative" CHECK ("size_bytes" >= 0);

ALTER TABLE "order_items"
  ADD CONSTRAINT "order_items_product_name_is_object"
    CHECK (jsonb_typeof("product_name") = 'object');


-- -----------------------------------------------------------------------------
-- 2. PARTIAL UNIQUE INDEX: one primary image per product
--
-- A plain UNIQUE (product_id, is_primary) would also forbid a second non-primary
-- image, which is the opposite of what is wanted. The WHERE clause constrains
-- only the rows that claim to be primary.
-- -----------------------------------------------------------------------------

CREATE UNIQUE INDEX "product_images_one_primary_per_product"
  ON "product_images" ("product_id")
  WHERE "is_primary";

-- Same shape, for the customer's default address.
CREATE UNIQUE INDEX "customer_addresses_one_default_per_customer"
  ON "customer_addresses" ("customer_id")
  WHERE "is_default";


-- -----------------------------------------------------------------------------
-- 3. ORDER NUMBERS
--
-- Counting existing orders in application code races: two checkouts reading the
-- same count both produce the same number, and one of them fails on the unique
-- index after the customer has already paid attention to it. A sequence is
-- atomic and never hands out the same value twice, even across connections.
--
-- Sequence gaps are expected and harmless — a rolled-back transaction consumes
-- a value. An order number is an identifier, not a count of orders.
--
-- Checkout calls this inside its transaction:
--     SELECT next_order_number();
-- -----------------------------------------------------------------------------

CREATE SEQUENCE IF NOT EXISTS "order_number_seq" START WITH 1000 INCREMENT BY 1;

CREATE OR REPLACE FUNCTION "next_order_number"()
RETURNS text
LANGUAGE sql
VOLATILE
AS $$
  SELECT 'SK-'
      || to_char(now() AT TIME ZONE 'UTC', 'YYYY')
      || '-'
      || lpad(nextval('order_number_seq')::text, 6, '0');
$$;


-- -----------------------------------------------------------------------------
-- 4. ROW LEVEL SECURITY
--
-- Read this before changing anything below, because the threat model is not the
-- obvious one:
--
--   * Prisma connects as the database owner, which has BYPASSRLS. Nothing here
--     constrains the application's own queries. Admin authorisation is enforced
--     in server code — session checked, role checked, on every admin route and
--     every mutation. RLS is not a substitute for that and never was.
--
--   * What RLS does protect is the OTHER door: Supabase exposes every table in
--     `public` through PostgREST, reachable from any browser with the anon key,
--     which is public by design. Without RLS, `GET /rest/v1/orders` returns
--     every customer's name, phone and address to anyone who opens dev tools.
--
-- So: enable RLS on every table, and add SELECT policies only for data that is
-- already public on the storefront. No INSERT, UPDATE or DELETE policy exists
-- anywhere — writes go through the application, which knows who is asking.
-- -----------------------------------------------------------------------------

-- Supabase provisions the `anon` and `authenticated` roles. A plain Postgres —
-- a local docker container, or a CI database — does not, and the policies below
-- would fail on an unknown role. Create them only if they are missing, so this
-- migration runs unchanged in both places.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
    CREATE ROLE "anon" NOLOGIN NOINHERIT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
    CREATE ROLE "authenticated" NOLOGIN NOINHERIT;
  END IF;
END
$$;

ALTER TABLE "users"                       ENABLE ROW LEVEL SECURITY;
ALTER TABLE "categories"                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE "category_translations"       ENABLE ROW LEVEL SECURITY;
ALTER TABLE "products"                    ENABLE ROW LEVEL SECURITY;
ALTER TABLE "product_translations"        ENABLE ROW LEVEL SECURITY;
ALTER TABLE "product_images"              ENABLE ROW LEVEL SECURITY;
ALTER TABLE "suppliers"                   ENABLE ROW LEVEL SECURITY;
ALTER TABLE "restock_records"             ENABLE ROW LEVEL SECURITY;
ALTER TABLE "customers"                   ENABLE ROW LEVEL SECURITY;
ALTER TABLE "customer_addresses"          ENABLE ROW LEVEL SECURITY;
ALTER TABLE "delivery_zones"              ENABLE ROW LEVEL SECURITY;
ALTER TABLE "delivery_zone_translations"  ENABLE ROW LEVEL SECURITY;
ALTER TABLE "deliveries"                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE "orders"                      ENABLE ROW LEVEL SECURITY;
ALTER TABLE "order_items"                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE "order_status_events"         ENABLE ROW LEVEL SECURITY;
ALTER TABLE "testimonials"                ENABLE ROW LEVEL SECURITY;
ALTER TABLE "testimonial_translations"    ENABLE ROW LEVEL SECURITY;
ALTER TABLE "content_blocks"              ENABLE ROW LEVEL SECURITY;
ALTER TABLE "content_block_translations"  ENABLE ROW LEVEL SECURITY;
ALTER TABLE "site_settings"               ENABLE ROW LEVEL SECURITY;
ALTER TABLE "media_assets"                ENABLE ROW LEVEL SECURITY;

-- --- Public read: the published catalogue --------------------------------

-- Only PUBLISHED products. A draft is a product the shop has not decided to
-- sell yet; its name and price are not public.
CREATE POLICY "published_products_are_public"
  ON "products" FOR SELECT TO anon, authenticated
  USING ("status" = 'PUBLISHED');

-- Translations and images inherit their parent's visibility. Without the
-- EXISTS clause, the name and photographs of every unreleased product would be
-- readable even though the product row is not.
CREATE POLICY "published_product_translations_are_public"
  ON "product_translations" FOR SELECT TO anon, authenticated
  USING (EXISTS (
    SELECT 1 FROM "products" p
    WHERE p."id" = "product_translations"."product_id" AND p."status" = 'PUBLISHED'
  ));

CREATE POLICY "published_product_images_are_public"
  ON "product_images" FOR SELECT TO anon, authenticated
  USING (EXISTS (
    SELECT 1 FROM "products" p
    WHERE p."id" = "product_images"."product_id" AND p."status" = 'PUBLISHED'
  ));

CREATE POLICY "active_categories_are_public"
  ON "categories" FOR SELECT TO anon, authenticated
  USING ("is_active");

CREATE POLICY "active_category_translations_are_public"
  ON "category_translations" FOR SELECT TO anon, authenticated
  USING (EXISTS (
    SELECT 1 FROM "categories" c
    WHERE c."id" = "category_translations"."category_id" AND c."is_active"
  ));

-- --- Public read: site content -------------------------------------------

CREATE POLICY "published_testimonials_are_public"
  ON "testimonials" FOR SELECT TO anon, authenticated
  USING ("is_published");

CREATE POLICY "published_testimonial_translations_are_public"
  ON "testimonial_translations" FOR SELECT TO anon, authenticated
  USING (EXISTS (
    SELECT 1 FROM "testimonials" t
    WHERE t."id" = "testimonial_translations"."testimonial_id" AND t."is_published"
  ));

-- Content blocks are the storefront's own copy — hero text, value propositions,
-- footer. All of it is rendered publicly by definition.
CREATE POLICY "content_blocks_are_public"
  ON "content_blocks" FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "content_block_translations_are_public"
  ON "content_block_translations" FOR SELECT TO anon, authenticated
  USING (true);

-- --- Public read: shipping options ---------------------------------------

-- Checkout shows these in a dropdown, so they are public. The fee is public
-- too; it is printed on the order.
CREATE POLICY "active_delivery_zones_are_public"
  ON "delivery_zones" FOR SELECT TO anon, authenticated
  USING ("is_active");

CREATE POLICY "active_delivery_zone_translations_are_public"
  ON "delivery_zone_translations" FOR SELECT TO anon, authenticated
  USING (EXISTS (
    SELECT 1 FROM "delivery_zones" z
    WHERE z."id" = "delivery_zone_translations"."zone_id" AND z."is_active"
  ));

-- --- Deliberately NOT public ---------------------------------------------
--
-- No policy is defined for: users, orders, order_items, order_status_events,
-- customers, customer_addresses, deliveries, suppliers, restock_records,
-- media_assets, site_settings.
--
-- RLS with no policy denies every row, which is the correct default for all of
-- them. Two are worth spelling out because someone will be tempted:
--
--   site_settings  holds the store's own configuration. Most of it is harmless,
--                  but it is a key/value table that will accumulate keys nobody
--                  audits. The storefront reads it through the server, which
--                  returns the handful of values a page actually needs.
--
--   orders         order tracking is by order number, and it is served by the
--                  application after checking the number — not by exposing the
--                  table and filtering in the browser.
