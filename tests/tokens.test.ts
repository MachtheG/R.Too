import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { tokens } from "@/lib/tokens";

const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");
const root = css.slice(css.indexOf(":root {"), css.indexOf("}", css.indexOf(":root {")));

describe("design tokens", () => {
  it("src/lib/tokens.ts matches the :root tokens in globals.css", () => {
    for (const [name, hex] of Object.entries(tokens)) {
      const m = root.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`));
      expect(m?.[1].toLowerCase(), `--${name}`).toBe(hex);
    }
  });
  it("components hard-code no colours outside the token files", () => {
    for (const f of ["src/components/map/wardShades.ts", "src/app/[locale]/opengraph-image.tsx"]) {
      const src = readFileSync(join(process.cwd(), f), "utf8");
      expect(src.match(/#[0-9a-fA-F]{6}\b/g) ?? [], f).toEqual([]);
    }
  });
});
