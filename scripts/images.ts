// npm run images
// Scans public/images/<category>/ for new photos, writes AVIF + WebP at 640/1280/1920 px
// to public/images/_generated/, and records a blur placeholder and dimensions in
// data/photos.generated.json. Files not yet in data/photos.ts are listed so they can be registered.
import sharp from "sharp";
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { basename, extname, join } from "node:path";
import { photoCategories, photos } from "../data/photos";

const ROOT = "public/images";
const OUT = join(ROOT, "_generated");
const WIDTHS = [640, 1280, 1920];
const EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff"]);

type Entry = { file: string; width: number; height: number; blurDataURL: string; variants: string[] };

async function main() {
  mkdirSync(OUT, { recursive: true });
  const manifest: Record<string, Entry> = {};
  const known = new Set(photos.map((p) => p.file).filter(Boolean));
  const unregistered: string[] = [];

  for (const cat of photoCategories) {
    const dir = join(ROOT, cat);
    if (!existsSync(dir)) continue;
    for (const name of readdirSync(dir)) {
      if (!EXTS.has(extname(name).toLowerCase())) continue;
      const rel = `${cat}/${name}`;
      const src = join(dir, name);
      const img = sharp(src).rotate();
      const meta = await img.metadata();
      const stem = `${cat}-${basename(name, extname(name))}`;
      const variants: string[] = [];
      for (const w of WIDTHS.filter((x) => !meta.width || x <= meta.width)) {
        for (const fmt of ["avif", "webp"] as const) {
          const out = join(OUT, `${stem}-${w}.${fmt}`);
          if (!existsSync(out)) await img.clone().resize({ width: w }).toFormat(fmt, { quality: fmt === "avif" ? 50 : 72 }).toFile(out);
          variants.push(out.replace(/^public/, ""));
        }
      }
      const blur = await img.clone().resize(16).blur().webp({ quality: 40 }).toBuffer();
      manifest[rel] = { file: rel, width: meta.width ?? 0, height: meta.height ?? 0, blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`, variants };
      if (!known.has(rel)) unregistered.push(rel);
      console.log(`✓ ${rel} (${variants.length} variants)`);
    }
  }

  writeFileSync("data/photos.generated.json", JSON.stringify(manifest, null, 2) + "\n");
  console.log(`\n${Object.keys(manifest).length} photos processed → data/photos.generated.json`);
  if (unregistered.length) {
    console.log("\nAdd these to data/photos.ts (with alt, caption in both languages, credit and licence):");
    unregistered.forEach((f) => console.log(`  - ${f}`));
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
