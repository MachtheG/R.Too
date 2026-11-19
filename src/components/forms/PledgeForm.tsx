"use client";
import { ConsentField } from "./ConsentField";
import { FormFooter } from "./FormFooter";
import { Honeypot } from "./Honeypot";
import { PersonFields } from "./PersonFields";
import { useCampaignForm } from "./useCampaignForm";

export function PledgeForm() {
  const { form, status, err, onSubmit, t } = useCampaignForm("pledge", { name: "", phone: "", email: "", ward: "", consent: false, website: "" });
  return (
    <form noValidate onSubmit={onSubmit} className="relative flex flex-col gap-5">
      <PersonFields kind="pledge" form={form} err={err} />
      <ConsentField kind="pledge" reg={form.register("consent")} error={err("consent")} />
      <Honeypot reg={form.register("website")} label={t("honeypot")} />
      <FormFooter kind="pledge" status={status} hasErrors={Object.keys(form.formState.errors).length > 0} />
    </form>
  );
}
