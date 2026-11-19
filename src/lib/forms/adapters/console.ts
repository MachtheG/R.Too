import type { FormAdapter } from "./types";

/** Development default: logs a redacted summary. Never use in production. */
export const consoleAdapter: FormAdapter = {
  name: "console",
  async save(s) {
    const redacted = { ...s.data, phone: "•••", email: s.data.email ? "•••" : "" };
    console.info(`[form:${s.kind}]`, { purpose: s.purpose, consentAt: s.consentAt, locale: s.locale, data: redacted });
  },
};
