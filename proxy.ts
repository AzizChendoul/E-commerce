import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

/**
 * Locale negotiation and redirect.
 *
 * Next.js 16 renamed this file convention from `middleware` to `proxy`; the
 * export shape is unchanged, and next-intl's helper is still exported under
 * its `middleware` path.
 *
 * Runs on every non-asset request: reads the Accept-Language header and the
 * NEXT_LOCALE cookie, and redirects an unprefixed path to the negotiated
 * locale. In a later phase this also refreshes the Supabase session so admin
 * routes see a live token.
 */
export default createMiddleware(routing);

export const config = {
  matcher: [
    // Everything except Next internals, the API surface, and any path that
    // looks like a static file. Without the file-extension exclusion the
    // middleware rewrites /logo.png to /ar/logo.png and the asset 404s.
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
