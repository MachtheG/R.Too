import { describe, expect, it } from "vitest";
import { sources } from "../data/sources";
import { findReferencedIds, validateSources } from "../scripts/sources-core";

describe("sources", () => {
  it("are complete and unique", () => {
    expect(validateSources(sources)).toEqual([]);
  });
  it("flags a duplicate and a missing url", () => {
    const bad = [sources[0], { ...sources[0], url: "" }];
    expect(validateSources(bad).length).toBeGreaterThanOrEqual(2);
  });
  it("finds referenced ids in code", () => {
    const code = `const A_SOURCE_IDS = ["a-1", "b-2"]; x = { sourceId: "c-3" }`;
    expect(findReferencedIds(code).sort()).toEqual(["a-1", "b-2", "c-3"]);
  });
  it("the IEBC 2022 register is the verified primary source", () => {
    const s = sources.find((x) => x.id === "iebc-rov-2022");
    expect(s?.primary && s.verified).toBe(true);
  });
});
