import { describe, expect, it } from "vitest";
import { totalWardVoters, wards } from "../data/wards";
import { stats, VOTERS_2022, HOME_FOOTNOTES, homeFootnote } from "../data/stats";
import { pledges } from "../data/plan";
import { sources } from "../data/sources";

const ids = new Set(sources.map((s) => s.id));

describe("data integrity", () => {
  it("ward voters sum to the verified IEBC 2022 constituency total", () => {
    expect(totalWardVoters).toBe(VOTERS_2022);
    expect(wards).toHaveLength(5);
  });
  it("every stat cites a known source", () => {
    for (const s of stats) expect(ids.has(s.sourceId)).toBe(true);
  });
  it("a stat is only 'verified' if its source is a verified primary document", () => {
    for (const s of stats) {
      const src = sources.find((x) => x.id === s.sourceId);
      if (s.verified) expect(src?.primary && src.verified).toBe(true);
    }
  });
  it("every home-page footnote is a known source, and every stat has a footnote number", () => {
    for (const id of HOME_FOOTNOTES) expect(ids.has(id)).toBe(true);
    for (const s of stats) expect(homeFootnote(s.sourceId)).toBeGreaterThan(0);
  });
  it("growth 2017 to 2022 is 18%", () => {
    expect(stats.find((s) => s.key === "growth")?.value).toBe(18);
  });
  it("every pledge is a draft and cites known evidence", () => {
    for (const p of pledges) {
      expect(p.draft).toBe(true);
      for (const id of p.evidenceSourceIds) expect(ids.has(id)).toBe(true);
    }
  });
});
