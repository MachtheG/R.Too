import { Fragment } from "react";
import { useTranslations } from "next-intl";
import { ToConfirm } from "./ToConfirm";

const MARKER = /\[\[TO CONFIRM(?:: ([^\]]+))?\]\]/g;

/** True when copy still contains a `[[TO CONFIRM: …]]` marker (used by tests and the release check). */
export const hasPending = (text: string) => new RegExp(MARKER.source).test(text);

/**
 * Renders copy that may contain `[[TO CONFIRM: what is missing]]` markers.
 * Each marker becomes the styled "To confirm" chip followed by the note in italics,
 * so missing content is obvious to a reviewer but never shows raw brackets.
 */
export function Pending({ text }: { text: string }) {
  const t = useTranslations("common");
  const parts = text.split(MARKER); // [plain, note, plain, note, …]
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 0 ? (
          <Fragment key={i}>{part}</Fragment>
        ) : (
          <span key={i} data-pending="" className="text-muted-foreground">
            <ToConfirm label={t("toConfirm")} className="mr-1.5 ml-0 text-pine opacity-100" />
            {part && <em>{part}</em>}
          </span>
        ),
      )}
    </>
  );
}
