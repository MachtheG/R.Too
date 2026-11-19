import { describe, expect, it, vi } from "vitest";
import { handleSubmission } from "@/lib/forms/submit";
import type { FormAdapter, Submission } from "@/lib/forms/adapters/types";

const valid = { name: "Jane Chebet", phone: "0712 345 678", email: "", ward: "chemagel", consent: true, help: ["events"] };
const spy = () => { const saved: Submission[] = []; const a: FormAdapter = { name: "t", save: vi.fn(async (s) => { saved.push(s); }) }; return { a, saved }; };

describe("form submission", () => {
  it("saves a valid volunteer with purpose and consent time, without the consent flag", async () => {
    const { a, saved } = spy();
    const r = await handleSubmission("volunteer", valid, "en", a, new Date("2026-11-19T10:00:00Z"));
    expect(r).toEqual({ ok: true });
    expect(saved[0].purpose).toMatch(/volunteers/);
    expect(saved[0].consentAt).toBe("2026-11-19T10:00:00.000Z");
    expect(saved[0].data.phone).toBe("0712345678");
    expect("consent" in saved[0].data).toBe(false);
  });
  it("rejects without explicit consent", async () => {
    const { a } = spy();
    const r = await handleSubmission("volunteer", { ...valid, consent: false }, "en", a);
    expect(r).toMatchObject({ ok: false, fields: ["consent"] });
    expect(a.save).not.toHaveBeenCalled();
  });
  it("rejects a non-Kenyan phone and an unknown ward", async () => {
    const { a } = spy();
    const r = await handleSubmission("pledge", { ...valid, phone: "12345", ward: "nairobi" }, "en", a);
    expect(r).toMatchObject({ ok: false });
    if (!r.ok) expect(r.fields).toEqual(expect.arrayContaining(["phone", "ward"]));
  });
  it("silently drops honeypot submissions", async () => {
    const { a } = spy();
    expect(await handleSubmission("pledge", { ...valid, website: "spam.example" }, "en", a)).toEqual({ ok: true });
    expect(a.save).not.toHaveBeenCalled();
  });
  it("reports adapter failure as a server error", async () => {
    const a: FormAdapter = { name: "x", save: async () => { throw new Error("down"); } };
    expect(await handleSubmission("pledge", valid, "en", a)).toEqual({ ok: false, error: "server" });
  });
  it("contact requires a message", async () => {
    const { a } = spy();
    const r = await handleSubmission("contact", { ...valid, message: "hi" }, "en", a);
    expect(r).toMatchObject({ ok: false, fields: ["message"] });
  });
});
