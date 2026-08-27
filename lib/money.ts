import { type Locale, localeTags } from "@/i18n/routing";

/**
 * Money handling.
 *
 * Every amount in this application is an **integer in the currency's minor
 * unit** — millimes for TND, centimes for MAD, cents for EUR. Floating point
 * cannot represent 0.1 exactly, so `0.1 + 0.2 !== 0.3`; an order total
 * accumulated in floats drifts by a millime or two and the invoice stops
 * matching the sum of its lines. Integers do not drift.
 *
 * The currency and its precision come from `SiteSetting`, never from a
 * constant in a component. TND has **three** decimal places, which is unusual
 * enough that code assuming two will silently produce totals off by 100x.
 */

export type CurrencyCode = "TND" | "MAD" | "DZD" | "EUR" | "USD";

/** Minor units per major unit, per ISO 4217. */
const MINOR_UNITS: Record<CurrencyCode, number> = {
  TND: 3,
  MAD: 2,
  DZD: 2,
  EUR: 2,
  USD: 2,
};

export function minorUnitDigits(currency: CurrencyCode): number {
  return MINOR_UNITS[currency];
}

/** `12.345` TND -> `12345`. Rounds half away from zero at the minor unit. */
export function toMinorUnits(amount: number, currency: CurrencyCode): number {
  const factor = 10 ** minorUnitDigits(currency);
  return Math.round(amount * factor);
}

/** `12345` millimes -> `12.345`. For display and API boundaries only. */
export function fromMinorUnits(amount: number, currency: CurrencyCode): number {
  return amount / 10 ** minorUnitDigits(currency);
}

/**
 * Format an integer minor-unit amount for a locale.
 *
 * The digits are wrapped by the caller in `<bdi>` when they appear inside
 * Arabic text, so `120 TND` does not visually reorder.
 */
export function formatMoney(
  amountInMinorUnits: number,
  currency: CurrencyCode,
  locale: Locale,
): string {
  const digits = minorUnitDigits(currency);
  return new Intl.NumberFormat(localeTags[locale], {
    style: "currency",
    currency,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(fromMinorUnits(amountInMinorUnits, currency));
}

/**
 * Sum line totals.
 *
 * Takes and returns minor units, so there is no point in the pipeline where a
 * fractional value exists to be rounded.
 */
export function sumMinorUnits(amounts: readonly number[]): number {
  return amounts.reduce((total, amount) => total + amount, 0);
}

/**
 * Apply a percentage (e.g. VAT) to a minor-unit amount.
 *
 * Rounds once, at the end, rather than per operation.
 */
export function applyRate(amountInMinorUnits: number, rate: number): number {
  return Math.round(amountInMinorUnits * rate);
}
