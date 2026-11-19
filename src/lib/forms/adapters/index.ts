import "server-only";
import { consoleAdapter } from "./console";
import { resendAdapter } from "./resend";
import { supabaseAdapter } from "./supabase";
import type { FormAdapter } from "./types";

/** FORM_ADAPTER = console | resend | supabase (default: console). */
export function getAdapter(env = process.env): FormAdapter {
  switch (env.FORM_ADAPTER) {
    case "resend":
      if (!env.RESEND_API_KEY || !env.FORM_TO_EMAIL || !env.FORM_FROM_EMAIL) throw new Error("Resend adapter needs RESEND_API_KEY, FORM_TO_EMAIL, FORM_FROM_EMAIL");
      return resendAdapter(env.RESEND_API_KEY, env.FORM_TO_EMAIL, env.FORM_FROM_EMAIL);
    case "supabase":
      if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) throw new Error("Supabase adapter needs SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY");
      return supabaseAdapter(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
    default:
      return consoleAdapter;
  }
}
