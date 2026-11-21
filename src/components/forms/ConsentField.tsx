"use client";
import type { UseFormRegisterReturn } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { FormKind } from "@/lib/forms/schemas";
import { errorCls } from "./fieldStyles";

/** DPA 2019 consent: unticked by default, purpose stated, link to the privacy notice. */
export function ConsentField({ kind, reg, error }: { kind: FormKind; reg: UseFormRegisterReturn; error?: string }) {
  const t = useTranslations("forms");
  const id = `${kind}-consent`;
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-start gap-1">
        {/* 44px hit area around a 20px box */}
        <label htmlFor={id} className="-m-3 flex size-11 shrink-0 cursor-pointer items-center justify-center">
          <input id={id} type="checkbox" {...reg} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className="size-5 accent-tea" />
        </label>
        <label htmlFor={id} className="text-sm leading-relaxed">
          {t("consent", { purpose: t(`purpose.${kind}`) })}{" "}
          <Link href="/privacy" className="underline underline-offset-4">{t("privacyLink")}</Link>
        </label>
      </div>
      {error && <span id={`${id}-error`} role="alert" className={errorCls}>{error}</span>}
    </div>
  );
}
