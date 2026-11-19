import type { Project, Sector } from "@data/projects";
import { sectors } from "@data/projects";

export type Filters = { sector?: Sector; ward?: string; year?: number };

type Params = Record<string, string | string[] | undefined> | URLSearchParams;
const get = (p: Params, k: string) => {
  const v = p instanceof URLSearchParams ? p.get(k) : p[k];
  return Array.isArray(v) ? v[0] : (v ?? undefined);
};

/** Parse ?sector=&ward=&year= into validated filters; unknown values are dropped. */
export function parseFilters(p: Params, wardSlugs: string[]): Filters {
  const sector = get(p, "sector");
  const ward = get(p, "ward");
  const year = Number(get(p, "year"));
  return {
    sector: sectors.includes(sector as Sector) ? (sector as Sector) : undefined,
    ward: ward && wardSlugs.includes(ward) ? ward : undefined,
    year: Number.isInteger(year) && year > 1990 && year < 2100 ? year : undefined,
  };
}

export function filterProjects(list: Project[], f: Filters): Project[] {
  return list.filter(
    (p) =>
      (!f.sector || p.sector === f.sector) &&
      (!f.ward || p.ward === f.ward || p.ward === "all") &&
      (!f.year || p.year === f.year),
  );
}

export function toQuery(f: Filters): string {
  const q = new URLSearchParams();
  if (f.sector) q.set("sector", f.sector);
  if (f.ward) q.set("ward", f.ward);
  if (f.year) q.set("year", String(f.year));
  const s = q.toString();
  return s ? `?${s}` : "";
}

export function countBySector(list: Project[]): { sector: Sector; count: number }[] {
  const m = new Map<Sector, number>();
  for (const p of list) m.set(p.sector, (m.get(p.sector) ?? 0) + 1);
  return [...m].map(([sector, count]) => ({ sector, count })).sort((a, b) => b.count - a.count);
}

/** Sums amounts per year, kept separate by kind: approved allocations are not spending. */
export function fundsByYear(list: Project[]): { year: number; approved: number; spent: number }[] {
  const m = new Map<number, { approved: number; spent: number }>();
  for (const p of list) {
    if (!p.amount) continue;
    const row = m.get(p.year) ?? { approved: 0, spent: 0 };
    row[p.amount.kind] += p.amount.kes;
    m.set(p.year, row);
  }
  return [...m].map(([year, v]) => ({ year, ...v })).sort((a, b) => a.year - b.year);
}

export const yearsOf = (list: Project[]) => [...new Set(list.map((p) => p.year))].sort((a, b) => b - a);
