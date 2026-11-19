import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { flatKeys } from "../scripts/lib";
import { namespaces } from "@/i18n/namespaces";

describe("messages", () => {
  for (const ns of namespaces) {
    it(`${ns}: en and sw have identical keys`, () => {
      const en = flatKeys(JSON.parse(readFileSync(`messages/en/${ns}.json`, "utf8"))).sort();
      const sw = flatKeys(JSON.parse(readFileSync(`messages/sw/${ns}.json`, "utf8"))).sort();
      expect(sw).toEqual(en);
    });
  }
});
