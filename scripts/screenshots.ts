// Usage: npm run screenshots -- [baseUrl] [phase]
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const base = process.argv[2] ?? "http://localhost:3000";
const phase = process.argv[3] ?? "current";
const tabs = ["", "/record", "/projects", "/map", "/plan", "/story", "/gallery", "/news", "/get-involved", "/contact", "/qa", "/wards", "/wards/kapletundo", "/privacy", "/sources", "/credits", "/styleguide"];
const routes = [...tabs.map((t) => `/en${t}`), "/sw", "/sw/map"];
const widths = [375, 768, 1440];
const out = `docs/screenshots/${phase}`;
mkdirSync(out, { recursive: true });

async function main() {
const browser = await chromium.launch();
for (const w of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  for (const r of routes) {
    await page.goto(base + r, { waitUntil: "networkidle" });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    if (overflow) console.warn(`⚠ horizontal overflow at ${w}px on ${r}`);
    const name = `${r.replace(/\//g, "_").replace(/^_/, "") || "root"}-${w}.png`;
    await page.screenshot({ path: `${out}/${name}`, fullPage: true });
    console.log(`✓ ${out}/${name}`);
  }
  await page.close();
}
await browser.close();
}

main().catch((e) => { console.error(e); process.exit(1); });
