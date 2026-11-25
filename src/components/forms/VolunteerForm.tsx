"use client";
import { ConsentField } from "./ConsentField";
import { FormFooter } from "./FormFooter";
import { Honeypot } from "./Honeypot";
import { PersonFields } from "./PersonFields";
import { useCampaignForm } from "./useCampaignForm";
import { errorCls } from "./fieldStyles";

const helpOptions = ["canvassing", "events", "agent", "social", "transport"] as const;

export function VolunteerForm() {
  const { form, status, err, onSubmit, t } = useCampaignForm("volunteer", { name: "", phone: "", email: "", ward: "", consent: false, help: [], website: "" });
  return (
    <form noValidate onSubmit={onSubmit} className="relative flex flex-col gap-5">
      <PersonFields kind="volunteer" form={form} err={err} />
      <fieldset className="flex flex-col gap-2" aria-describedby={err("help") ? "volunteer-help-error" : undefined}>
        <legend className="mb-1 text-sm font-semibold">{t("help")}</legend>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {helpOptions.map((o) => (
            <label key={o} className="flex min-h-11 items-center gap-2 text-sm">
              <input type="checkbox" value={o} className="size-5 accent-primary" {...form.register("help")} />
              {t(`helpOptions.${o}`)}
            </label>
          ))}
        </div>
        {err("help") && <span id="volunteer-help-error" role="alert" className={errorCls}>{err("help")}</span>}
      </fieldset>
      <ConsentField kind="volunteer" reg={form.register("consent")} error={err("consent")} />
      <Honeypot reg={form.register("website")} label={t("honeypot")} />
      <FormFooter kind="volunteer" status={status} hasErrors={Object.keys(form.formState.errors).length > 0} />
    </form>
  );
}
