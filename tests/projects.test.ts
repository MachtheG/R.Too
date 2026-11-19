import { describe, expect, it } from "vitest";
import type { Project } from "@data/projects";
import { countBySector, filterProjects, fundsByYear, parseFilters, toQuery } from "@/lib/projects";

// Test fixtures only: not real projects and never rendered on the site.
const mk = (o: Partial<Project>): Project => ({
  slug: "x", name: { en: "x", sw: "x" }, summary: { en: "", sw: "" }, sector: "education",
  ward: "chemagel", year: 2024, status: "complete", role: "led", sourceIds: ["s"], ...o,
});
const list = [
  mk({ slug: "a", sector: "water", ward: "kipsonoi", year: 2023, amount: { kes: 100, kind: "approved" } }),
  mk({ slug: "b", sector: "water", ward: "all", year: 2024, amount: { kes: 50, kind: "spent" } }),
  mk({ slug: "c", sector: "health", year: 2024, amount: { kes: 30, kind: "approved" } }),
];
const wards = ["kipsonoi", "chemagel"];

describe("project filters", () => {
  it("parses valid params and drops junk", () => {
    expect(parseFilters({ sector: "water", ward: "kipsonoi", year: "2023" }, wards)).toEqual({ sector: "water", ward: "kipsonoi", year: 2023 });
    expect(parseFilters({ sector: "nope", ward: "evil", year: "abc" }, wards)).toEqual({ sector: undefined, ward: undefined, year: undefined });
  });
  it("filters; constituency-wide projects appear in every ward", () => {
    expect(filterProjects(list, { ward: "kipsonoi" }).map((p) => p.slug)).toEqual(["a", "b"]);
    expect(filterProjects(list, { sector: "water", year: 2024 }).map((p) => p.slug)).toEqual(["b"]);
  });
  it("round-trips to a query string", () => {
    expect(toQuery({ sector: "water", year: 2024 })).toBe("?sector=water&year=2024");
    expect(toQuery({})).toBe("");
  });
  it("aggregates by sector and keeps approved separate from spent", () => {
    expect(countBySector(list)[0]).toEqual({ sector: "water", count: 2 });
    expect(fundsByYear(list)).toEqual([
      { year: 2023, approved: 100, spent: 0 },
      { year: 2024, approved: 30, spent: 50 },
    ]);
  });
});
