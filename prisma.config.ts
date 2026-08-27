import { defineConfig } from "prisma/config";

/**
 * Prisma CLI configuration.
 *
 * The split between two connection strings is the important part:
 *
 *   schema.prisma  `url = env("DATABASE_URL")`  -> pooled (PgBouncer, :6543)
 *                                                  used by the running app
 *   here           `datasource.url = DIRECT_URL` -> direct (:5432)
 *                                                  used by migrate/introspect
 *
 * Migrations take Postgres advisory locks and run DDL. Transaction pooling
 * cannot hold either across statements, so pointing migrations at the pooler
 * fails in ways that look like random lock timeouts.
 */
export default defineConfig({
  schema: "prisma/schema.prisma",

  datasource: {
    // Read straight from process.env rather than through Prisma's `env()`
    // helper: `env()` throws while the config file is being loaded, which
    // breaks `prisma generate` — a command that needs no database — in CI and
    // container builds. Deferring the empty value lets generate succeed and
    // lets the commands that do connect report the missing variable properly.
    url: process.env.DIRECT_URL ?? "",
  },

  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
});
