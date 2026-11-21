"use client";
import { useTranslations } from "next-intl";
import type { FormKind } from "@/lib/forms/schemas";

type Props = { kind: FormKind; status: "idle" | "sending" | "success" | "error"; hasErrors: boolean };

export function FormFooter({ kind, status, hasErrors }: Props) {
  const t = useTranslations("forms");
  return (
    <div className="flex flex-col gap-3">
      <button type="submit" disabled={status === "sending"} className="inline-flex min-h-12 items-center justify-center self-start bg-uda px-6 font-semibold text-ink hover:bg-ink hover:text-white disabled:opacity-60">
        {status === "sending" ? t("sending") : t(`submit.${kind}`)}
      </button>
      <div aria-live="polite" className="text-sm">
        {status === "success" && <p className="bg-leaf/15 px-3 py-2 font-semibold">{t(`success.${kind}`)}</p>}
        {status === "error" && <p role="alert" className="bg-destructive/10 px-3 py-2">{t("errors.server")}</p>}
        {hasErrors && status !== "error" && <p className="text-destructive dark:text-[#ffb4ab]">{t("errors.summary")}</p>}
      </div>
    </div>
  );
}
