import type { ReactNode } from "react";
import { errorCls, labelCls } from "./fieldStyles";

type Props = { id: string; label: string; hint?: string; error?: string; children: ReactNode };

/** Label + control + hint + error, wired with aria-describedby by id convention. */
export function Field({ id, label, hint, error, children }: Props) {
  return (
    <div className={labelCls}>
      <label htmlFor={id}>{label}</label>
      {hint && <span id={`${id}-hint`} className="text-xs font-normal text-muted-foreground">{hint}</span>}
      {children}
      {error && <span id={`${id}-error`} role="alert" className={errorCls}>{error}</span>}
    </div>
  );
}

export const describedBy = (id: string, hint?: boolean, error?: boolean) =>
  [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
