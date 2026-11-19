import type { UseFormRegisterReturn } from "react-hook-form";

/** Hidden from people and assistive tech; bots tend to fill it. */
export function Honeypot({ reg, label }: { reg: UseFormRegisterReturn; label: string }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>{label}<input type="text" tabIndex={-1} autoComplete="off" {...reg} /></label>
    </div>
  );
}
