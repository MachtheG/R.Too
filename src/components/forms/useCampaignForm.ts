"use client";
import { useState } from "react";
import { useForm, type FieldValues, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { submitForm } from "@/lib/forms/actions";
import { type FormKind, schemas } from "@/lib/forms/schemas";

type Status = "idle" | "sending" | "success" | "error";

export function useCampaignForm(kind: FormKind, defaults: FieldValues) {
  const t = useTranslations("forms");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  // Zod is the source of truth for types and validation; RHF holds the raw input.
  const resolver = zodResolver(schemas[kind] as Parameters<typeof zodResolver>[0]) as unknown as Resolver<FieldValues>;
  const form = useForm<FieldValues>({ resolver, defaultValues: defaults, mode: "onTouched" });

  const err = (name: string) => {
    const e = (form.formState.errors as Record<string, { message?: string }>)[name];
    return e ? t(`errors.${e.message && ["name", "phone", "email", "ward", "consent", "help", "message"].includes(e.message) ? e.message : name}`) : undefined;
  };

  const onSubmit = form.handleSubmit(async (values) => {
    setStatus("sending");
    const res = await submitForm(kind, values, locale);
    if (res.ok) { setStatus("success"); form.reset(); }
    else setStatus("error");
  });

  return { form, status, err, onSubmit, t };
}
