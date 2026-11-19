import { existsSync } from "node:fs";
import { namespaces } from "../src/i18n/namespaces";
import { locales } from "../src/i18n/routing";
import { flatKeys, read } from "./lib";

const errors: string[] = [];
for (const ns of namespaces) {
  const keysBy = new Map<string, Set<string>>();
  for (const l of locales) {
    const p = `messages/${l}/${ns}.json`;
    if (!existsSync(p)) { errors.push(`missing file ${p}`); continue; }
    const keys = flatKeys(JSON.parse(read(p)));
    keysBy.set(l, new Set(keys));
    for (const k of keys) {
      const val = k.split(".").reduce<unknown>((o, part) => (o as Record<string, unknown>)[part], JSON.parse(read(p)));
      if (typeof val === "string" && !val.trim()) errors.push(`${p}: empty value at ${k}`);
    }
  }
  const [base, ...rest] = locales;
  for (const l of rest) {
    const a = keysBy.get(base), b = keysBy.get(l);
    if (!a || !b) continue;
    for (const k of a) if (!b.has(k)) errors.push(`${l}/${ns}.json missing ${k}`);
    for (const k of b) if (!a.has(k)) errors.push(`${l}/${ns}.json has extra ${k}`);
  }
}
if (errors.length) { console.error(errors.map((e) => `✗ ${e}`).join("\n")); process.exit(1); }
console.log(`✓ translation check passed (${namespaces.length} namespaces × ${locales.length} locales)`);
