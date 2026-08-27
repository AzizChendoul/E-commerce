#!/usr/bin/env node
/**
 * Generate the placeholder product imagery used by the seed data.
 *
 * The demo catalogue needs pictures or the storefront looks broken on first
 * run, and the brief asks for a site that is never empty. Rather than pull from
 * an image host — an external dependency, a licence question, and a remote
 * pattern in next.config for something that is not real product photography —
 * these are generated locally from SVG, in the design system's own palette, and
 * committed.
 *
 * They are deliberately abstract: a geometric motif per category, obviously a
 * placeholder, so nobody mistakes one for a real photograph of the product.
 *
 * Output is WebP at 900x1200 — the 3:4 ratio the product card locks to, so the
 * grid never reflows as images load.
 *
 * Run: node scripts/generate-seed-images.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "seed", "products");

const WIDTH = 900;
const HEIGHT = 1200;

/** Straight from app/globals.css. No colour is invented here. */
const palette = {
  background: "#fafaf9",
  card: "#ffffff",
  primary: "#1c1917",
  secondary: "#44403c",
  cta: "#a16207",
  muted: "#f5f5f4",
  border: "#d6d3d1",
};

/** An eight-point star, the motif that runs through Tunisian zellige tilework. */
function star(cx, cy, outer, inner) {
  const points = [];
  for (let i = 0; i < 16; i++) {
    const radius = i % 2 === 0 ? outer : inner;
    const angle = (Math.PI / 8) * i - Math.PI / 2;
    points.push(
      `${(cx + radius * Math.cos(angle)).toFixed(2)},${(cy + radius * Math.sin(angle)).toFixed(2)}`,
    );
  }
  return points.join(" ");
}

/** A horseshoe arch, the other motif that reads instantly as North African. */
function arch(x, y, w, h) {
  const r = w / 2;
  const d = `M ${x} ${y + h} L ${x} ${y + r} A ${r} ${r} 0 0 1 ${x + w} ${y + r} L ${x + w} ${y + h} Z`;
  return `<path d="${d}" />`;
}

const motifs = {
  lighting: () => `
    ${arch(300, 300, 300, 620)}
  `,
  ceramics: () => `
    <circle cx="450" cy="620" r="210" />
    <circle cx="450" cy="620" r="120" />
  `,
  textiles: () =>
    Array.from(
      { length: 7 },
      (_, i) => `<rect x="255" y="${360 + i * 76}" width="390" height="38" />`,
    ).join(""),
  woodwork: () => `
    <polygon points="${star(450, 620, 220, 92)}" />
  `,
  basketry: () =>
    Array.from({ length: 5 }, (_, row) =>
      Array.from({ length: 5 }, (_, col) => {
        if ((row + col) % 2 !== 0) return "";
        return `<rect x="${270 + col * 76}" y="${440 + row * 76}" width="60" height="60" rx="6" />`;
      }).join(""),
    ).join(""),
};

/**
 * `index` shifts the motif's opacity and offset so four products in the same
 * category do not render four identical tiles.
 */
function svg(category, index) {
  const motif = motifs[category] ?? motifs.ceramics;
  const opacity = (0.1 + (index % 4) * 0.045).toFixed(3);
  const rotation = (index % 4) * 6 - 9;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${palette.card}" />
      <stop offset="100%" stop-color="${palette.muted}" />
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" />
  <rect x="60" y="60" width="${WIDTH - 120}" height="${HEIGHT - 120}" fill="none"
        stroke="${palette.border}" stroke-width="2" />
  <g transform="rotate(${rotation} 450 620)" fill="${palette.primary}" fill-opacity="${opacity}"
     stroke="${palette.cta}" stroke-opacity="0.45" stroke-width="3">
    ${motif()}
  </g>
  <polygon points="${star(450, 1055, 26, 11)}" fill="${palette.cta}" fill-opacity="0.55" />
</svg>`;
}

const categories = ["lighting", "ceramics", "textiles", "woodwork", "basketry"];

await mkdir(outDir, { recursive: true });

let count = 0;
for (const category of categories) {
  for (let index = 0; index < 4; index++) {
    const name = `${category}-${index + 1}.webp`;
    const buffer = await sharp(Buffer.from(svg(category, index)))
      .webp({ quality: 82, effort: 6 })
      .toBuffer();
    await writeFile(join(outDir, name), buffer);
    count++;
  }
}

// A neutral fallback for anything without its own image — an empty category
// header, a product an admin created before uploading a photograph.
const placeholder = await sharp(Buffer.from(svg("ceramics", 0)))
  .webp({ quality: 78, effort: 6 })
  .toBuffer();
await writeFile(join(outDir, "placeholder.webp"), placeholder);

console.log(`Generated ${count + 1} placeholder images in public/seed/products/`);
