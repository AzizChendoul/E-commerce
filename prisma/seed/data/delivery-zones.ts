import type { DeliveryZoneSeed } from "../types";

/**
 * Tunisian delivery zones. Fees are in millimes: 7_000 is 7,000 TND.
 *
 * The rates follow the shape a Tunisian courier actually charges — Grand Tunis
 * cheapest, the coastal cities a step above, the south and the islands highest —
 * rather than a flat national fee. Free shipping kicks in at 300,000 TND in the
 * three Grand Tunis zones only, which is where the margin supports it.
 *
 * A final catch-all zone matters more than it looks: without it, a customer in
 * a governorate nobody listed cannot complete checkout at all.
 */
export const deliveryZones: DeliveryZoneSeed[] = [
  {
    code: "tunis",
    shippingFee: 7_000,
    freeShippingThreshold: 300_000,
    estimatedDaysMin: 1,
    estimatedDaysMax: 2,
    sortOrder: 1,
    translations: { AR: { name: "تونس" }, EN: { name: "Tunis" }, FR: { name: "Tunis" } },
  },
  {
    code: "ariana",
    shippingFee: 7_000,
    freeShippingThreshold: 300_000,
    estimatedDaysMin: 1,
    estimatedDaysMax: 2,
    sortOrder: 2,
    translations: { AR: { name: "أريانة" }, EN: { name: "Ariana" }, FR: { name: "Ariana" } },
  },
  {
    code: "ben-arous",
    shippingFee: 7_000,
    freeShippingThreshold: 300_000,
    estimatedDaysMin: 1,
    estimatedDaysMax: 2,
    sortOrder: 3,
    translations: {
      AR: { name: "بن عروس" },
      EN: { name: "Ben Arous" },
      FR: { name: "Ben Arous" },
    },
  },
  {
    code: "manouba",
    shippingFee: 7_500,
    estimatedDaysMin: 1,
    estimatedDaysMax: 3,
    sortOrder: 4,
    translations: { AR: { name: "منوبة" }, EN: { name: "Manouba" }, FR: { name: "Manouba" } },
  },
  {
    code: "nabeul",
    shippingFee: 8_000,
    estimatedDaysMin: 2,
    estimatedDaysMax: 3,
    sortOrder: 5,
    translations: { AR: { name: "نابل" }, EN: { name: "Nabeul" }, FR: { name: "Nabeul" } },
  },
  {
    code: "bizerte",
    shippingFee: 8_500,
    estimatedDaysMin: 2,
    estimatedDaysMax: 3,
    sortOrder: 6,
    translations: { AR: { name: "بنزرت" }, EN: { name: "Bizerte" }, FR: { name: "Bizerte" } },
  },
  {
    code: "sousse",
    shippingFee: 8_500,
    estimatedDaysMin: 2,
    estimatedDaysMax: 3,
    sortOrder: 7,
    translations: { AR: { name: "سوسة" }, EN: { name: "Sousse" }, FR: { name: "Sousse" } },
  },
  {
    code: "monastir",
    shippingFee: 8_500,
    estimatedDaysMin: 2,
    estimatedDaysMax: 3,
    sortOrder: 8,
    translations: {
      AR: { name: "المنستير" },
      EN: { name: "Monastir" },
      FR: { name: "Monastir" },
    },
  },
  {
    code: "sfax",
    shippingFee: 9_000,
    estimatedDaysMin: 2,
    estimatedDaysMax: 4,
    sortOrder: 9,
    translations: { AR: { name: "صفاقس" }, EN: { name: "Sfax" }, FR: { name: "Sfax" } },
  },
  {
    code: "kairouan",
    shippingFee: 9_000,
    estimatedDaysMin: 2,
    estimatedDaysMax: 4,
    sortOrder: 10,
    translations: {
      AR: { name: "القيروان" },
      EN: { name: "Kairouan" },
      FR: { name: "Kairouan" },
    },
  },
  {
    code: "djerba",
    shippingFee: 12_000,
    estimatedDaysMin: 3,
    estimatedDaysMax: 6,
    sortOrder: 11,
    translations: { AR: { name: "جربة" }, EN: { name: "Djerba" }, FR: { name: "Djerba" } },
  },
  {
    code: "other",
    shippingFee: 10_500,
    estimatedDaysMin: 3,
    estimatedDaysMax: 6,
    sortOrder: 99,
    translations: {
      AR: { name: "باقي الولايات" },
      EN: { name: "Other governorates" },
      FR: { name: "Autres gouvernorats" },
    },
  },
];
