import type { FormAdapter } from "./types";

/**
 * Inserts into a Supabase table via PostgREST. Create the table first:
 *   create table submissions (id bigint generated always as identity primary key,
 *     kind text, purpose text, consent_at timestamptz, locale text, data jsonb,
 *     created_at timestamptz default now());
 *   alter table submissions enable row level security;  -- no public policies
 * Use the service-role key server-side only.
 */
export function supabaseAdapter(url: string, serviceKey: string, table = "submissions"): FormAdapter {
  return {
    name: "supabase",
    async save(s) {
      const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/${table}`, {
        method: "POST",
        headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, "Content-Type": "application/json", Prefer: "return=minimal" },
        body: JSON.stringify({ kind: s.kind, purpose: s.purpose, consent_at: s.consentAt, locale: s.locale, data: s.data }),
      });
      if (!res.ok) throw new Error(`supabase ${res.status}`);
    },
  };
}
