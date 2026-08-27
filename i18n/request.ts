import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { defaultLocale, routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    // Server and client must agree on the time zone, or a date rendered on
    // the server hydrates to different text in the browser.
    timeZone: "Africa/Tunis",
    formats: {
      dateTime: {
        short: { day: "numeric", month: "short", year: "numeric" },
        long: { dateStyle: "long", timeStyle: "short" },
      },
    },
    onError(error) {
      // A missing message is a content bug, not a crash. Surface it loudly in
      // development; in production fall back to the key.
      if (process.env.NODE_ENV === "development") {
        console.error(error);
      }
    },
    getMessageFallback({ key }) {
      return process.env.NODE_ENV === "development" ? `⟨${key}⟩` : key;
    },
  };
});
