// Election day: Tuesday 10 August 2027 (IEBC gazette notice, 14 Sep 2026).
// Source ids: iebc-election-notice-2027, standard-election-date.
export const ELECTION_ISO = "2027-08-10T06:00:00+03:00"; // polls open 06:00 EAT
export const ELECTION_SOURCE_IDS = ["iebc-election-notice-2027", "standard-election-date"];

const DAY_MS = 86_400_000;

/** Whole days remaining until election day, counted in Nairobi time. Never negative. */
export function daysUntilElection(now: Date, electionIso: string = ELECTION_ISO): number {
  const toNairobiDay = (d: Date) => Math.floor((d.getTime() + 3 * 3_600_000) / DAY_MS);
  const diff = toNairobiDay(new Date(electionIso)) - toNairobiDay(now);
  return Math.max(0, diff);
}
