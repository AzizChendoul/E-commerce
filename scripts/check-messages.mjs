#!/usr/bin/env node
/**
 * Assert that every locale message catalogue has exactly the same key set.
 *
 * next-intl falls back to the message key when a translation is missing, so a
 * gap ships silently as `Nav.trackOrder` rendered on the page. This turns that
 * into a build failure instead.
 *
 * Run: node scripts/check-messages.mjs
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const locales = ["ar", "en", "fr"];
const reference = "en";

function flatten(object, prefix = "") {
  const keys = [];
  for (const [key, value] of Object.entries(object)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      keys.push(...flatten(value, path));
    } else {
      keys.push(path);
    }
  }
  return keys;
}

/** Named placeholders, e.g. {count} in "You have {count} items". */
function placeholders(value) {
  return [...String(value).matchAll(/\{(\w+)/g)].map((match) => match[1]).sort();
}

function valueAt(object, path) {
  return path.split(".").reduce((node, key) => node?.[key], object);
}

const catalogues = Object.fromEntries(
  locales.map((locale) => [
    locale,
    JSON.parse(readFileSync(join(root, "messages", `${locale}.json`), "utf8")),
  ]),
);

const expected = flatten(catalogues[reference]).sort();
let failures = 0;

for (const locale of locales) {
  if (locale === reference) continue;

  const actual = flatten(catalogues[locale]).sort();
  const missing = expected.filter((key) => !actual.includes(key));
  const extra = actual.filter((key) => !expected.includes(key));

  for (const key of missing) {
    console.error(`${locale}: missing key  ${key}`);
    failures++;
  }
  for (const key of extra) {
    console.error(`${locale}: unknown key  ${key} (not in ${reference}.json)`);
    failures++;
  }

  // A placeholder that exists in one language and not another renders as
  // literal braces, or drops the value entirely.
  for (const key of expected.filter((k) => actual.includes(k))) {
    const from = placeholders(valueAt(catalogues[reference], key)).join(",");
    const to = placeholders(valueAt(catalogues[locale], key)).join(",");
    if (from !== to) {
      console.error(
        `${locale}: placeholder mismatch at ${key} — ${reference} has {${from}}, ${locale} has {${to}}`,
      );
      failures++;
    }
  }
}

if (failures > 0) {
  console.error(`\n${failures} message catalogue problem(s).`);
  process.exit(1);
}

console.log(`Message catalogues match across ${locales.join(", ")} (${expected.length} keys).`);
