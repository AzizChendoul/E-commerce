import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "@/lib/generated/prisma/client";

/**
 * A single PrismaClient for the process, created on first use.
 *
 * Two problems this solves:
 *
 * 1. Next.js clears the module registry on every hot reload, so a plain
 *    `new PrismaClient()` at module scope opens a fresh connection pool on
 *    each edit until Postgres refuses more. Stashing it on `globalThis`
 *    survives the reload; in production the module is evaluated once.
 *
 * 2. Constructing eagerly would make merely *importing* this module require a
 *    database URL. Pre-rendering a page that imports it transitively but never
 *    queries would then fail the build. The proxy defers construction to the
 *    first actual property access.
 *
 * Prisma 7 connects through a driver adapter rather than a URL in the schema.
 * The adapter takes the **pooled** connection string (PgBouncer, :6543);
 * migrations use the direct one, configured separately in prisma.config.ts.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set. Copy .env.example to .env.local and fill it in.");
  }

  return new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
    log: process.env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["error"],
  });
}

function getPrismaClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }
  return globalForPrisma.prisma;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, property, receiver) {
    return Reflect.get(getPrismaClient(), property, receiver);
  },
});
