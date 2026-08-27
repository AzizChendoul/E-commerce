/**
 * Seed the database with demo content.
 *
 * Run: npm run db:seed
 *
 * IDEMPOTENT BY DESIGN. Every write is an upsert on a stable natural key —
 * a slug, an SKU, a zone code, a setting key — so running this twice produces
 * the same database as running it once. It never truncates: seeding is
 * something you do on a fresh environment *and* something you re-run after
 * adding a content block, and a script that wipes tables cannot be the second
 * of those.
 *
 * Because the keys are natural, editing the text in prisma/seed/data and
 * re-running updates the existing rows rather than duplicating them.
 *
 * WHAT THIS DOES NOT SEED: admin users. Credentials belong to Supabase Auth,
 * which owns `auth.users`, and Prisma cannot create an account there. The admin
 * bootstrap ships with the auth module in Phase 3.
 */
import { PrismaPg } from "@prisma/adapter-pg";

import { Prisma, PrismaClient } from "../lib/generated/prisma/client";
import { categories } from "./seed/data/categories";
import { contentBlocks, siteSettings } from "./seed/data/content";
import { deliveryZones } from "./seed/data/delivery-zones";
import { products } from "./seed/data/products";
import { suppliers } from "./seed/data/suppliers";
import { testimonials } from "./seed/data/testimonials";
import { seedLocales, type SeedLocale } from "./seed/types";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set. Copy .env.example to .env.local and fill it in.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
  log: ["error"],
});

/** Console counters, so the run reports what it actually did. */
const counts: Record<string, number> = {};
function tally(label: string, n = 1) {
  counts[label] = (counts[label] ?? 0) + n;
}

async function seedSuppliers() {
  const bySlug = new Map<string, string>();

  for (const supplier of suppliers) {
    // Supplier has no unique column other than the id, so this is a find-then-
    // write rather than an upsert. Adding a unique constraint on `name` would
    // be wrong: two workshops can legitimately share a name, and the admin
    // must be able to create the second one.
    const existing = await prisma.supplier.findFirst({ where: { name: supplier.name } });

    const row = existing
      ? await prisma.supplier.update({ where: { id: existing.id }, data: supplier })
      : await prisma.supplier.create({ data: supplier });

    bySlug.set(supplier.name, row.id);
    tally("suppliers");
  }

  return bySlug;
}

async function seedCategories() {
  const bySlug = new Map<string, string>();

  // Parents must exist before their children can point at them. The data file
  // is ordered that way; this asserts it rather than trusting it, because a
  // reordering would otherwise fail with an opaque foreign-key error.
  for (const category of categories) {
    if (category.parentSlug && !bySlug.has(category.parentSlug)) {
      throw new Error(
        `Category "${category.slug}" lists parent "${category.parentSlug}", which has not been ` +
          `seeded yet. Move the parent above it in prisma/seed/data/categories.ts.`,
      );
    }

    const parentId = category.parentSlug ? bySlug.get(category.parentSlug)! : null;

    const row = await prisma.category.upsert({
      where: { slug: category.slug },
      create: { slug: category.slug, sortOrder: category.sortOrder, parentId },
      update: { sortOrder: category.sortOrder, parentId },
    });
    bySlug.set(category.slug, row.id);
    tally("categories");

    for (const locale of seedLocales) {
      const t = category.translations[locale];
      await prisma.categoryTranslation.upsert({
        where: { categoryId_locale: { categoryId: row.id, locale } },
        create: { categoryId: row.id, locale, ...t },
        update: t,
      });
      tally("category translations");
    }
  }

  return bySlug;
}

async function seedDeliveryZones() {
  for (const zone of deliveryZones) {
    const { translations, ...fields } = zone;

    const row = await prisma.deliveryZone.upsert({
      where: { code: zone.code },
      create: fields,
      update: fields,
    });
    tally("delivery zones");

    for (const locale of seedLocales) {
      const t = translations[locale];
      await prisma.deliveryZoneTranslation.upsert({
        where: { zoneId_locale: { zoneId: row.id, locale } },
        create: { zoneId: row.id, locale, ...t },
        update: t,
      });
      tally("delivery zone translations");
    }
  }
}

async function seedProducts(
  categoryIds: Map<string, string>,
  supplierIds: Map<string, string>,
) {
  for (const product of products) {
    const categoryId = categoryIds.get(product.categorySlug);
    if (!categoryId) {
      throw new Error(
        `Product ${product.sku} references category "${product.categorySlug}", which is not in ` +
          `prisma/seed/data/categories.ts.`,
      );
    }

    const supplierId = supplierIds.get(product.supplierName);
    if (!supplierId) {
      throw new Error(
        `Product ${product.sku} references supplier "${product.supplierName}", which is not in ` +
          `prisma/seed/data/suppliers.ts.`,
      );
    }

    const fields = {
      price: product.price,
      compareAtPrice: product.compareAtPrice ?? null,
      stock: product.stock,
      isNew: product.isNew ?? false,
      isFeatured: product.isFeatured ?? false,
      salesCount: product.salesCount,
      weightGrams: product.weightGrams ?? null,
      categoryId,
      supplierId,
      // Demo data is meant to be visible: a draft catalogue would leave the
      // storefront empty, which is exactly what seeding is for.
      status: "PUBLISHED" as const,
      publishedAt: new Date(),
    };

    const row = await prisma.product.upsert({
      where: { sku: product.sku },
      create: { sku: product.sku, ...fields },
      update: fields,
    });
    tally("products");

    for (const locale of seedLocales) {
      const t = product.translations[locale];
      await prisma.productTranslation.upsert({
        where: { productId_locale: { productId: row.id, locale } },
        create: { productId: row.id, locale, ...t },
        update: t,
      });
      tally("product translations");
    }

    // Alt text is a locale map and is required — the design system treats it as
    // part of the image, not an optional extra. Deriving it from the product
    // name is honest for a placeholder; real photography needs real alt text
    // written at upload.
    const altText = Object.fromEntries(
      seedLocales.map((locale) => [locale, product.translations[locale].name]),
    ) as Record<SeedLocale, string>;

    const existingImage = await prisma.productImage.findFirst({
      where: { productId: row.id, url: product.image },
    });

    if (existingImage) {
      await prisma.productImage.update({
        where: { id: existingImage.id },
        data: { altText, isPrimary: true, sortOrder: 0, width: 900, height: 1200 },
      });
    } else {
      await prisma.productImage.create({
        data: {
          productId: row.id,
          url: product.image,
          altText,
          isPrimary: true,
          sortOrder: 0,
          // Intrinsic dimensions, so next/image can reserve the box before the
          // file arrives and the grid does not reflow as images load.
          width: 900,
          height: 1200,
        },
      });
    }
    tally("product images");
  }
}

async function seedTestimonials() {
  for (const testimonial of testimonials) {
    const { translations, ...fields } = testimonial;

    const existing = await prisma.testimonial.findFirst({
      where: { customerName: testimonial.customerName },
    });

    const row = existing
      ? await prisma.testimonial.update({
          where: { id: existing.id },
          data: { ...fields, isPublished: true },
        })
      : await prisma.testimonial.create({ data: { ...fields, isPublished: true } });
    tally("testimonials");

    for (const locale of seedLocales) {
      const t = translations[locale];
      await prisma.testimonialTranslation.upsert({
        where: { testimonialId_locale: { testimonialId: row.id, locale } },
        create: { testimonialId: row.id, locale, ...t },
        update: t,
      });
      tally("testimonial translations");
    }
  }
}

async function seedContentBlocks() {
  for (const block of contentBlocks) {
    const fields = {
      label: block.label,
      group: block.group,
      isMultiline: block.isMultiline ?? false,
    };

    const row = await prisma.contentBlock.upsert({
      where: { slug: block.slug },
      create: { slug: block.slug, ...fields },
      update: fields,
    });
    tally("content blocks");

    for (const locale of seedLocales) {
      const value = block.translations[locale];
      await prisma.contentBlockTranslation.upsert({
        where: { blockId_locale: { blockId: row.id, locale } },
        create: { blockId: row.id, locale, value },
        update: { value },
      });
      tally("content block translations");
    }
  }
}

async function seedSiteSettings() {
  for (const setting of siteSettings) {
    // `SiteSetting.value` is a non-nullable Json column, so "not set yet" —
    // the logo before anyone uploads one — is the JSON value `null`, not SQL
    // NULL. Passing a bare `null` to Prisma means "leave this field alone" on
    // an update and is rejected on a create; `Prisma.JsonNull` is what actually
    // writes a JSON null. The distinction is easy to miss and produces a
    // setting that silently never changes.
    const value =
      setting.value === null ? Prisma.JsonNull : (setting.value as Prisma.InputJsonValue);

    const fields = { value, group: setting.group, label: setting.label };

    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      create: { key: setting.key, ...fields },
      update: fields,
    });
    tally("site settings");
  }
}

async function main() {
  console.log("Seeding…\n");

  const supplierIds = await seedSuppliers();
  const categoryIds = await seedCategories();
  await seedDeliveryZones();
  await seedProducts(categoryIds, supplierIds);
  await seedTestimonials();
  await seedContentBlocks();
  await seedSiteSettings();

  const width = Math.max(...Object.keys(counts).map((k) => k.length));
  for (const [label, n] of Object.entries(counts)) {
    console.log(`  ${label.padEnd(width)}  ${String(n).padStart(4)}`);
  }

  console.log(
    "\nDone. Admin accounts are not seeded — Supabase Auth owns credentials, " +
      "and the bootstrap ships with the auth module.",
  );
}

main()
  .catch((error) => {
    console.error("\nSeed failed:\n", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
