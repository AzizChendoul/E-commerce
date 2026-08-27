import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/**
 * Product images, the logo and every media asset live in Supabase Storage, so
 * next/image has to be told that host is allowed. It is derived from the
 * environment rather than hardcoded, so staging and production each optimise
 * their own bucket without a config change.
 */
function supabaseImagePattern() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return [];
  try {
    return [
      {
        protocol: "https" as const,
        hostname: new URL(url).hostname,
        pathname: "/storage/v1/object/public/**",
      },
    ];
  } catch {
    // A malformed URL is reported properly by lib/env.ts at runtime; the
    // build should not die here with a less useful message.
    return [];
  }
}

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: supabaseImagePattern(),
    formats: ["image/avif", "image/webp"],
  },

  typescript: {
    // Type errors always fail the build. Never set this to true.
    ignoreBuildErrors: false,
  },
};

export default withNextIntl(nextConfig);
