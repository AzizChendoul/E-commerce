import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names, letting later Tailwind utilities win over earlier ones.
 *
 * `clsx` resolves conditionals; `twMerge` then drops the losing half of any
 * conflicting pair, so a caller's `p-6` replaces a component's default `p-4`
 * instead of both landing in the class list and the outcome depending on
 * stylesheet order.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
