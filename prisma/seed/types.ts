/**
 * Shared shapes for the seed data.
 *
 * Every translatable field is a full record over the three locales rather than
 * a partial: TypeScript then refuses to compile seed data that forgets a
 * language, which is the mistake this catalogue is most likely to accumulate.
 */

export const seedLocales = ["AR", "EN", "FR"] as const;

export type SeedLocale = (typeof seedLocales)[number];

export type Translated<T> = Record<SeedLocale, T>;

export interface CategorySeed {
  /** Locale-neutral key. Stable across renames — never regenerate it. */
  slug: string;
  parentSlug?: string;
  sortOrder: number;
  translations: Translated<{ name: string; slug: string; description: string }>;
}

export interface ProductSeed {
  sku: string;
  categorySlug: string;
  supplierName: string;
  /** Millimes. 129_500 renders as 129,500 TND. */
  price: number;
  compareAtPrice?: number;
  stock: number;
  isNew?: boolean;
  isFeatured?: boolean;
  /** Drives the Best Sellers ordering on the landing page. */
  salesCount: number;
  weightGrams?: number;
  image: string;
  translations: Translated<{
    name: string;
    slug: string;
    shortDescription: string;
    description: string;
  }>;
}

export interface SupplierSeed {
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  notes?: string;
}

export interface DeliveryZoneSeed {
  code: string;
  /** Millimes. */
  shippingFee: number;
  freeShippingThreshold?: number;
  estimatedDaysMin: number;
  estimatedDaysMax: number;
  sortOrder: number;
  translations: Translated<{ name: string }>;
}

export interface TestimonialSeed {
  customerName: string;
  rating: number;
  sortOrder: number;
  translations: Translated<{ message: string; role: string }>;
}

export interface ContentBlockSeed {
  slug: string;
  label: string;
  group: "GENERAL" | "CONTACT" | "SOCIAL" | "APPEARANCE" | "COMMERCE";
  isMultiline?: boolean;
  translations: Translated<string>;
}

export interface SiteSettingSeed {
  key: string;
  label: string;
  group: "GENERAL" | "CONTACT" | "SOCIAL" | "APPEARANCE" | "COMMERCE";
  value: unknown;
}
