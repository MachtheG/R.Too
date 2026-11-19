import type { FormAdapter } from "./types";

/** Emails each submission to the campaign inbox via the Resend HTTP API. */
export function resendAdapter(apiKey: string, to: string, from: string): FormAdapter {
  return {
    name: "resend",
    async save(s) {
      const lines = Object.entries(s.data).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : String(v ?? "")}`);
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to,
          subject: `[${s.kind}] new submission`,
          text: [`Purpose: ${s.purpose}`, `Consent given: ${s.consentAt}`, `Language: ${s.locale}`, "", ...lines].join("\n"),
        }),
      });
      if (!res.ok) throw new Error(`resend ${res.status}`);
    },
  };
}
