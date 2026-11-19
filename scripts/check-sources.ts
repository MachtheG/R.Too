import { sources } from "../data/sources";
import { findReferencedIds, validateSources } from "./sources-core";
import { read, walk } from "./lib";

const errors = validateSources(sources);
const known = new Set(sources.map((s) => s.id));
const files = [...walk("src", [".ts", ".tsx"]), ...walk("data", [".ts"])];
let refs = 0;
let toConfirm = 0;

for (const f of files) {
  const code = read(f);
  for (const id of findReferencedIds(code)) {
    refs++;
    if (!known.has(id)) errors.push(`${f}: unknown source id "${id}"`);
  }
}
for (const f of walk("messages", [".json"])) toConfirm += (read(f).match(/\[\[TO CONFIRM/g) ?? []).length;

console.log(`sources: ${sources.length} · references checked: ${refs} · [[TO CONFIRM]] in messages: ${toConfirm}`);
if (errors.length) {
  console.error(errors.map((e) => `✗ ${e}`).join("\n"));
  process.exit(1);
}
console.log("✓ source check passed");
