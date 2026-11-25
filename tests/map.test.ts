import { describe, expect, it } from "vitest";
import { tokens } from "@/lib/tokens";
import { shadeFor, SELECTED } from "@/components/map/wardShades";
import { wards } from "../data/wards";
import { shapeFor } from "../data/sotikMap";
import { planFor } from "../data/wardPlans";

const lum = (h: string) => {
  const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a: string, b: string) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };

describe("map shading", () => {
  it("every step meets WCAG AA (4.5:1) for its label text", () => {
    for (let v = 12000; v <= 21000; v += 500) {
      const s = shadeFor(v, 12000, 21000);
      expect(ratio(s.fill, s.text)).toBeGreaterThanOrEqual(4.5);
    }
  });
  it("largest ward gets the darkest step", () => {
    expect(shadeFor(21000, 12000, 21000).fill).toBe(tokens.primary);
  });
  it("selected (yellow) ward label meets AA", () => {
    expect(ratio(SELECTED.fill, SELECTED.text)).toBeGreaterThanOrEqual(4.5);
  });
  it("every ward has IEBC geometry and a draft plan", () => {
    for (const w of wards) {
      expect(shapeFor(w.slug)?.path.startsWith("M")).toBe(true);
      expect(planFor(w.slug)?.draft).toBe(true);
    }
  });
});
