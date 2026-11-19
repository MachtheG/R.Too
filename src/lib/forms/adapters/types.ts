import type { FormKind } from "../schemas";

export type Submission = {
  kind: FormKind;
  purpose: string;
  consentAt: string; // ISO time consent was given
  locale: string;
  data: Record<string, unknown>;
};

export interface FormAdapter {
  name: string;
  save(s: Submission): Promise<void>;
}
