import { cookies } from "next/headers";

import { createServerClient } from "@supabase/ssr";

import { clientEnv, serverEnv } from "@/lib/env";

/**
 * Supabase client for Server Components, Route Handlers and Server Actions.
 *
 * Still the anon key — this client acts as the signed-in user and remains
 * subject to Row Level Security. Session cookies are read and refreshed
 * through the Next.js cookie store.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    clientEnv.NEXT_PUBLIC_SUPABASE_URL,
    clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Server Components cannot set cookies. The middleware refreshes
            // the session on every request, so the write is redundant here
            // rather than lost.
          }
        },
      },
    },
  );
}

/**
 * Privileged client that bypasses Row Level Security.
 *
 * Only for work the user genuinely cannot be allowed to do under their own
 * identity — administrative jobs, webhooks, seeding. Every call site must
 * have already established who the caller is and what they may do; this
 * client performs no checks of its own.
 *
 * Never import this into a Client Component: the service-role key is a
 * full-database credential.
 */
export function createServiceRoleClient() {
  return createServerClient(
    clientEnv.NEXT_PUBLIC_SUPABASE_URL,
    serverEnv.SUPABASE_SERVICE_ROLE_KEY,
    {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {
          // Never carries a user session; there is nothing to persist.
        },
      },
    },
  );
}
