import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

/**
 * Locale-aware replacements for the next/navigation primitives.
 *
 * Import `Link` from here, never from `next/link`, or the locale prefix is
 * dropped and the user is bounced through the middleware on every click.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
