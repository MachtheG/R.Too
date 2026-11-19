import { type FormKind, purposes, schemas } from "./schemas";
import type { FormAdapter } from "./adapters/types";

export type SubmitResult = { ok: true } | { ok: false; error: "invalid" | "server"; fields?: string[] };

/** Validates, strips the honeypot, records purpose + consent time, and saves. Pure: adapter injected. */
export async function handleSubmission(kind: FormKind, input: unknown, locale: string, adapter: FormAdapter, now = new Date()): Promise<SubmitResult> {
  const parsed = schemas[kind].safeParse(input);
  if (!parsed.success) {
    // A filled honeypot looks like success to bots but saves nothing.
    if (parsed.error.issues.some((i) => i.path[0] === "website")) return { ok: true };
    return { ok: false, error: "invalid", fields: [...new Set(parsed.error.issues.map((i) => String(i.path[0])))] };
  }
  // Drop the honeypot and the consent flag: consent is recorded as `consentAt` instead.
  const data = Object.fromEntries(Object.entries(parsed.data).filter(([k]) => k !== "website" && k !== "consent"));
  try {
    await adapter.save({ kind, purpose: purposes[kind], consentAt: now.toISOString(), locale, data });
    return { ok: true };
  } catch (e) {
    console.error(`[form:${kind}] save failed`, (e as Error).message);
    return { ok: false, error: "server" };
  }
}
