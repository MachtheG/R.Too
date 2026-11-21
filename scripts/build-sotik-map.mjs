// Builds data/sotik-map.generated.json from IEBC ward boundaries.
//
// Source: IEBC ward + constituency boundaries as published on HDX ("Kenya Elections"),
// in GeoJSON from github.com/tigawanna/kenya_wards_geojson_data (MIT), src/data/{wards,constituencies}.
// Those files are ~36 MB, so they are not committed. Download them, then:
//   node scripts/build-sotik-map.mjs <dir-with-wards.geojson-and-constituencies.geojson>
import fs from "node:fs";

const dir = process.argv[2];
if (!dir) throw new Error("usage: node scripts/build-sotik-map.mjs <geojson dir>");
const wardsGeo = JSON.parse(fs.readFileSync(`${dir}/wards.geojson`, "utf8"));
const constGeo = JSON.parse(fs.readFileSync(`${dir}/constituencies.geojson`, "utf8"));

const SLUG = { KAPLETUNDO: "kapletundo", CHEMAGEL: "chemagel", KIPSONOI: "kipsonoi", "NDANAI/ABOSI": "ndanai-abosi", "RONGENA/MANARET": "rongena-manaret" };
const outer = (g) => (g.type === "Polygon" ? [g.coordinates[0]] : g.coordinates.map((p) => p[0]));

const sotikWards = wardsGeo.features.filter((f) => f.properties.constituency_name === "SOTIK");
const sotik = constGeo.features.find((f) => f.properties.constituency_name === "SOTIK");
if (sotikWards.length !== 5 || !sotik) throw new Error("Sotik wards/constituency not found");

// Projection: local equirectangular, metres → SVG units.
const all = sotikWards.flatMap((f) => outer(f.geometry).flat());
const lons = all.map((p) => p[0]), lats = all.map((p) => p[1]);
const [minLon, maxLon, minLat, maxLat] = [Math.min(...lons), Math.max(...lons), Math.min(...lats), Math.max(...lats)];
const lat0 = (minLat + maxLat) / 2;
const KM_LAT = 110.574, KM_LON = 111.32 * Math.cos((lat0 * Math.PI) / 180);
const widthKm = (maxLon - minLon) * KM_LON, heightKm = (maxLat - minLat) * KM_LAT;
const W = 1000, PAD = 24, scale = (W - 2 * PAD) / widthKm, H = Math.round(heightKm * scale + 2 * PAD);
const proj = ([lon, lat]) => [PAD + (lon - minLon) * KM_LON * scale, PAD + (maxLat - lat) * KM_LAT * scale];

// Douglas–Peucker in projected units.
function simplify(pts, tol) {
  if (pts.length < 4) return pts;
  const d2 = (p, a, b) => { const [x, y] = p, [x1, y1] = a, [x2, y2] = b; const dx = x2 - x1, dy = y2 - y1; const l = dx * dx + dy * dy; let t = l ? ((x - x1) * dx + (y - y1) * dy) / l : 0; t = Math.max(0, Math.min(1, t)); const px = x1 + t * dx - x, py = y1 + t * dy - y; return px * px + py * py; };
  const keep = new Uint8Array(pts.length); keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) { const [s, e] = stack.pop(); let md = 0, mi = -1; for (let i = s + 1; i < e; i++) { const d = d2(pts[i], pts[s], pts[e]); if (d > md) { md = d; mi = i; } } if (md > tol * tol) { keep[mi] = 1; stack.push([s, mi], [mi, e]); } }
  return pts.filter((_, i) => keep[i]);
}
const toPath = (rings) => rings.map((r) => "M" + simplify(r.map(proj), 0.9).map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join("L") + "Z").join("");

const areaKm2 = (ring) => { let a = 0; for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) { const [x1, y1] = [ring[j][0] * KM_LON, ring[j][1] * KM_LAT], [x2, y2] = [ring[i][0] * KM_LON, ring[i][1] * KM_LAT]; a += x1 * y2 - x2 * y1; } return Math.abs(a / 2); };

// Label point: interior point farthest from the edges (coarse grid search).
function labelPoint(ringsXY) {
  const inside = (x, y) => { let c = false; for (const r of ringsXY) for (let i = 0, j = r.length - 1; i < r.length; j = i++) { const [xi, yi] = r[i], [xj, yj] = r[j]; if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c; } return c; };
  const segD = (x, y) => { let m = Infinity; for (const r of ringsXY) for (let i = 0, j = r.length - 1; i < r.length; j = i++) { const [x1, y1] = r[j], [x2, y2] = r[i]; const dx = x2 - x1, dy = y2 - y1, l = dx * dx + dy * dy; let t = l ? ((x - x1) * dx + (y - y1) * dy) / l : 0; t = Math.max(0, Math.min(1, t)); m = Math.min(m, Math.hypot(x1 + t * dx - x, y1 + t * dy - y)); } return m; };
  const xs = ringsXY.flat().map((p) => p[0]), ys = ringsXY.flat().map((p) => p[1]);
  let best = [0, 0], bd = -1;
  for (let x = Math.min(...xs); x <= Math.max(...xs); x += 4) for (let y = Math.min(...ys); y <= Math.max(...ys); y += 4) if (inside(x, y)) { const d = segD(x, y); if (d > bd) { bd = d; best = [x, y]; } }
  return { x: Math.round(best[0]), y: Math.round(best[1]), r: Math.round(bd) };
}

// Neighbouring constituencies outside Sotik: any whose boundary lies within ~150 m of the ward edge.
const others = constGeo.features.filter((f) => f.properties.constituency_name !== "SOTIK");
const near = (p, rings, km) => rings.some((r) => r.some((q) => Math.hypot((p[0] - q[0]) * KM_LON, (p[1] - q[1]) * KM_LAT) < km));
const titleCase = (s) => s.toLowerCase().replace(/(^|[\s/-])\w/g, (m) => m.toUpperCase());

const wards = sotikWards.map((f) => {
  const rings = outer(f.geometry);
  const slug = SLUG[f.properties.ward_name];
  const sample = rings.flat().filter((_, i) => i % 3 === 0);
  const neighbours = others
    .filter((o) => { const or = outer(o.geometry); const xs = or.flat(); const bbox = [Math.min(...xs.map((p) => p[0])), Math.max(...xs.map((p) => p[0])), Math.min(...xs.map((p) => p[1])), Math.max(...xs.map((p) => p[1]))]; if (bbox[1] < minLon - 0.05 || bbox[0] > maxLon + 0.05 || bbox[3] < minLat - 0.05 || bbox[2] > maxLat + 0.05) return false; return sample.some((p) => near(p, or, 0.15)); })
    .map((o) => ({ constituency: titleCase(o.properties.constituency_name), county: titleCase(o.properties.county_name) }));
  return {
    slug,
    iebcWardCode: f.properties.ward_code,
    path: toPath(rings),
    areaKm2: Math.round(rings.reduce((n, r) => n + areaKm2(r), 0) * 10) / 10,
    label: labelPoint(rings.map((r) => r.map(proj))),
    neighbours,
  };
});

const out = {
  source: "IEBC ward and constituency boundaries (HDX 'Kenya Elections'), via github.com/tigawanna/kenya_wards_geojson_data (MIT). Simplified for display.",
  viewBox: `0 0 ${W} ${H}`,
  outline: toPath(outer(sotik.geometry)),
  bbox: { minLon, maxLon, minLat, maxLat },
  wards,
};
fs.writeFileSync(new URL("../data/sotik-map.generated.json", import.meta.url), JSON.stringify(out, null, 1) + "\n");
console.log(`viewBox ${out.viewBox}`);
for (const w of wards) console.log(`${w.slug.padEnd(16)} code ${w.iebcWardCode} area ${w.areaKm2} km² label ${w.label.x},${w.label.y} r${w.label.r} path ${w.path.length}ch | borders: ${w.neighbours.map((n) => `${n.constituency} (${n.county})`).join(", ") || "-"}`);
