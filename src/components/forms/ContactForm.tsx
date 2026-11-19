"use client";
import { ConsentField } from "./ConsentField";
import { FormFooter } from "./FormFooter";
import { Honeypot } from "./Honeypot";
import { PersonFields } from "./PersonFields";
import { describedBy, Field } from "./Field";
import { inputCls } from "./fieldStyles";
import { useCampaignForm } from "./useCampaignForm";

export function ContactForm() {
  const { form, status, err, onSubmit, t } = useCampaignForm("contact", { name: "", phone: "", email: "", ward: "", message: "", consent: false, website: "" });
  return (
    <form noValidate onSubmit={onSubmit} className="relative flex flex-col gap-5">
      <PersonFields kind="contact" form={form} err={err} wardOptional />
      <Field id="contact-message" label={t("message")} error={err("message")}>
        <textarea id="contact-message" rows={5} className={`${inputCls} py-2`} {...form.register("message")} aria-invalid={Boolean(err("message"))} aria-describedby={describedBy("contact-message", false, Boolean(err("message")))} />
      </Field>
      <ConsentField kind="contact" reg={form.register("consent")} error={err("consent")} />
      <Honeypot reg={form.register("website")} label={t("honeypot")} />
      <FormFooter kind="contact" status={status} hasErrors={Object.keys(form.formState.errors).length > 0} />
    </form>
  );
}
