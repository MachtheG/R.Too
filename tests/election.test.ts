import { describe, expect, it } from "vitest";
import { daysUntilElection, ELECTION_ISO } from "@/lib/election";

describe("daysUntilElection", () => {
  it("targets 10 August 2027", () => {
    expect(ELECTION_ISO.startsWith("2027-08-10")).toBe(true);
  });
  it("counts 264 days from 19 Nov 2026 (Nairobi)", () => {
    expect(daysUntilElection(new Date("2026-11-19T09:00:00+03:00"))).toBe(264);
  });
  it("counts Nairobi days, not UTC days, just after midnight EAT", () => {
    expect(daysUntilElection(new Date("2027-08-09T00:30:00+03:00"))).toBe(1);
  });
  it("is 0 on election day and never negative after", () => {
    expect(daysUntilElection(new Date("2027-08-10T12:00:00+03:00"))).toBe(0);
    expect(daysUntilElection(new Date("2027-09-01T12:00:00+03:00"))).toBe(0);
  });
});
