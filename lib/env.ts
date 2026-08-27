import { z } from "zod";

/**
 * Environment contract.
 *
 * Parsed once at module load so a missing or malformed variable fails the
 * build or the first request with a readable message, instead of surfacing
 * as `undefined` somewhere deep in a query.
 *
 * Server-only values must never be read from a Client Component. Next.js
 * inlines `NEXT_PUBLIC_*` into the browser bundle and leaves everything else
 * on the server; the split below mirrors that boundary.
 */

const serverSchema = z.object({
  // Pooled connection (PgBouncer, port 6543) — what the app runs queries on.
  DATABASE_URL: z.string().url(),
  // Direct connection (port 5432) — migrations only. PgBouncer's transaction
  // pooling cannot run the advisory locks and DDL that migrate needs.
  DIRECT_URL: z.string().url(),

  // Service-role key. Bypasses Row Level Security, so it is server-only and
  // must never appear in a NEXT_PUBLIC_ variable.
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),

  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

const clientSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
});

/**
 * Docker builds and CI type-checks run without a database or a Supabase
 * project. `SKIP_ENV_VALIDATION=1` lets those pass; it must never be set in a
 * running deployment, where a missing variable should fail loudly.
 */
const skipValidation = process.env.SKIP_ENV_VALIDATION === "1";

function parse<T extends z.ZodTypeAny>(schema: T, source: unknown, label: string): z.infer<T> {
  if (skipValidation) {
    return source as z.infer<T>;
  }
  const result = schema.safeParse(source);
  if (!result.success) {
    const detail = result.error.issues
      .map((issue) => `  ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(
      `Invalid ${label} environment variables:\n${detail}\n\n` +
        `See .env.example for the full list.`,
    );
  }
  return result.data;
}

/**
 * Client-safe values. Each is referenced through the full literal
 * `process.env.NEXT_PUBLIC_*` expression because Next.js replaces those
 * statically at build time — a dynamic lookup would come back undefined in
 * the browser.
 */
export const clientEnv = parse(
  clientSchema,
  {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
  "client",
);

/**
 * Server-only values.
 *
 * Reading this from a Client Component throws rather than silently shipping
 * an empty object, which would otherwise turn a security mistake into a
 * confusing runtime bug.
 */
export const serverEnv = (() => {
  if (typeof window !== "undefined") {
    return new Proxy({} as z.infer<typeof serverSchema>, {
      get(_target, prop) {
        throw new Error(
          `serverEnv.${String(prop)} was read in the browser. ` +
            `Server-only environment variables are not available to Client Components.`,
        );
      },
    });
  }
  return parse(serverSchema, process.env, "server");
})();
