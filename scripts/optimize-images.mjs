// Converts the source PNGs in public/ to WebP and removes the PNGs, so a deploy
// ships one copy of each image at the smallest size that still looks sharp.
//
// Screens: capped at 672px wide. The largest rendered screen is 244 CSS px
// (desktop sticky column) and 224 CSS px (mobile card), so 672 is 2.75x and 3.0x
// respectively - enough for a 3x phone with no upscaling, and it drops 36% of the
// pixels versus the 838px originals. Quality 85 keeps UI text crisp.
// Logo: capped at 160px and encoded losslessly. It is only ever rendered at
// 26-44px, so the 565px original was 304 KB of waste; lossless costs 22 KB
// against 8 KB for q90 and keeps the mark pixel-exact (measured max deviation on
// opaque pixels: 4/255 lossless vs 42/255 at q90).
//
// Re-run after dropping a new PNG into public/screens:  npm run images:optimize
import sharp from "sharp";
import { existsSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SCREENS = { dir: "public/screens", width: 672, quality: 85 };
const LOGO = { file: "public/Logo.png", width: 160, lossless: true };

const kb = (n) => (n / 1024).toFixed(0).padStart(5);

async function convert(src, { width, quality, lossless }) {
  const out = src.replace(/\.png$/, ".webp");
  const before = statSync(src).size;
  const buf = await sharp(src)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, lossless, effort: 6 })
    .toBuffer();
  writeFileSync(out, buf);
  return { out, before, after: buf.length };
}

const results = [];

if (existsSync(SCREENS.dir)) {
  for (const f of readdirSync(SCREENS.dir).filter((f) => f.endsWith(".png"))) {
    results.push({ name: f, ...(await convert(join(SCREENS.dir, f), SCREENS)) });
  }
}
if (existsSync(LOGO.file)) {
  results.push({ name: "Logo.png", ...(await convert(LOGO.file, LOGO)) });
}

if (results.length === 0) {
  console.log("No PNG sources found in public/ - nothing to do.");
  process.exit(0);
}

let before = 0;
let after = 0;
console.log("  before -> after (WebP)");
for (const r of results) {
  before += r.before;
  after += r.after;
  console.log(
    `  ${r.name.padEnd(34)} ${kb(r.before)} KB -> ${kb(r.after)} KB  (-${Math.round((1 - r.after / r.before) * 100)}%)`,
  );
}
console.log(
  `\n  ${results.length} files: ${kb(before)} KB -> ${kb(after)} KB  (-${Math.round((1 - after / before) * 100)}%)`,
);

// Drop the PNGs so the deployed site does not ship both formats. The originals
// stay recoverable in git history.
for (const r of results) rmSync(r.out.replace(/\.webp$/, ".png"), { force: true });
console.log("Removed the source PNGs (recoverable from git history).");
