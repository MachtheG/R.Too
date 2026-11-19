"use server";
import { getAdapter } from "./adapters";
import type { FormKind } from "./schemas";
import { handleSubmission, type SubmitResult } from "./submit";

export async function submitForm(kind: FormKind, input: unknown, locale: string): Promise<SubmitResult> {
  if (!["volunteer", "pledge", "contact"].includes(kind)) return { ok: false, error: "invalid" };
  return handleSubmission(kind, input, locale === "sw" ? "sw" : "en", getAdapter());
}
