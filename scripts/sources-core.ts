import type { Source } from "../data/sources";

export function validateSources(sources: Source[]): string[] {
  const errors: string[] = [];
  const seen = new Set<string>();
  for (const s of sources) {
    if (seen.has(s.id)) errors.push(`duplicate source id: ${s.id}`);
    seen.add(s.id);
    for (const f of ["title", "publisher", "date", "url"] as const) {
      if (!s[f]?.trim()) errors.push(`${s.id}: missing ${f}`);
    }
    if (s.url && !/^https:\/\//.test(s.url)) errors.push(`${s.id}: url must be https`);
  }
  return errors;
}

/** Finds source ids referenced in code: `sourceId: "x"`, `sourceIds: ["x"]`, `*_SOURCE_IDS = ["x"]`. */
export function findReferencedIds(code: string): string[] {
  const ids: string[] = [];
  for (const m of code.matchAll(/source(?:Id|_ID)\s*[:=]\s*["']([a-z0-9-]+)["']/gi)) ids.push(m[1]);
  for (const m of code.matchAll(/source(?:Ids|_IDS|SourceIds)\s*[:=]\s*\[([^\]]*)\]/gi)) {
    for (const q of m[1].matchAll(/["']([a-z0-9-]+)["']/g)) ids.push(q[1]);
  }
  return ids;
}
