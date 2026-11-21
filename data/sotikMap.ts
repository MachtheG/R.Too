// Sotik ward geometry from IEBC boundaries. Regenerate with scripts/build-sotik-map.mjs.
import geo from "./sotik-map.generated.json";
import { wards } from "./wards";

export type WardShape = {
  slug: string;
  iebcWardCode: string;
  path: string;
  areaKm2: number;
  label: { x: number; y: number; r: number };
  neighbours: { constituency: string; county: string }[];
};

export const sotikMap = geo as { source: string; viewBox: string; outline: string; wards: WardShape[] };
export const shapeFor = (slug: string) => sotikMap.wards.find((w) => w.slug === slug);

/** Registered voters per km², from the 2022 ward figures and the IEBC boundary area. */
export const densityFor = (slug: string) => {
  const w = wards.find((x) => x.slug === slug);
  const s = shapeFor(slug);
  return w && s ? Math.round(w.voters2022 / s.areaKm2) : 0;
};

export const MAP_SOURCE_ID = "iebc-ward-boundaries";
