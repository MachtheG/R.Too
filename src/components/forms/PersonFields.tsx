"use client";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { useTranslations } from "next-intl";
import { wards } from "@data/wards";
import { describedBy, Field } from "./Field";
import { inputCls } from "./fieldStyles";

type Props = { kind: string; form: UseFormReturn<FieldValues>; err: (n: string) => string | undefined; wardOptional?: boolean };

/** Name, phone, optional email and ward: the minimum the campaign needs (data minimisation). */
export function PersonFields({ kind, form, err, wardOptional = false }: Props) {
  const t = useTranslations("forms");
  const id = (n: string) => `${kind}-${n}`;
  const r = (n: string) => form.register(n);
  return (
    <>
      <Field id={id("name")} label={t("name")} error={err("name")}>
        <input id={id("name")} autoComplete="name" className={inputCls} {...r("name")} aria-invalid={Boolean(err("name"))} aria-describedby={describedBy(id("name"), false, Boolean(err("name")))} />
      </Field>
      <Field id={id("phone")} label={t("phone")} hint={t("phoneHint")} error={err("phone")}>
        <input id={id("phone")} type="tel" inputMode="tel" autoComplete="tel" className={inputCls} {...r("phone")} aria-invalid={Boolean(err("phone"))} aria-describedby={describedBy(id("phone"), true, Boolean(err("phone")))} />
      </Field>
      <Field id={id("email")} label={t("email")} error={err("email")}>
        <input id={id("email")} type="email" autoComplete="email" className={inputCls} {...r("email")} aria-invalid={Boolean(err("email"))} aria-describedby={describedBy(id("email"), false, Boolean(err("email")))} />
      </Field>
      <Field id={id("ward")} label={t("ward")} error={err("ward")}>
        <select id={id("ward")} className={inputCls} {...r("ward")} aria-invalid={Boolean(err("ward"))} aria-describedby={describedBy(id("ward"), false, Boolean(err("ward")))} required={!wardOptional}>
          <option value="">{t("chooseWard")}</option>
          {wards.map((w) => <option key={w.slug} value={w.slug}>{w.name}</option>)}
        </select>
      </Field>
    </>
  );
}
