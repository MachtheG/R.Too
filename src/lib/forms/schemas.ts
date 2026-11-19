import { z } from "zod";
import { wards } from "@data/wards";

const wardSlugs = wards.map((w) => w.slug) as [string, ...string[]];
// Kenyan mobile: 07xx / 01xx or +254 7xx / 1xx
export const KE_PHONE = /^(?:\+254|0)[17]\d{8}$/;

const base = {
  name: z.string().trim().min(2, "name").max(80, "name"),
  phone: z.string().trim().transform((v) => v.replace(/[\s-]/g, "")).pipe(z.string().regex(KE_PHONE, "phone")),
  email: z.union([z.literal(""), z.string().trim().email("email").max(120)]).optional(),
  ward: z.enum(wardSlugs, { message: "ward" }),
  // DPA 2019 s.30: consent must be explicit; the box is never pre-ticked.
  consent: z.literal(true, { message: "consent" }),
  // Honeypot: real people leave it empty.
  website: z.string().max(0).optional(),
};

export const volunteerSchema = z.object({
  ...base,
  help: z.array(z.enum(["canvassing", "events", "agent", "social", "transport"])).min(1, "help"),
});

export const pledgeSchema = z.object(base);

export const contactSchema = z.object({
  ...base,
  ward: base.ward.optional().or(z.literal("")),
  message: z.string().trim().min(10, "message").max(2000, "message"),
});

export type FormKind = "volunteer" | "pledge" | "contact";
export const schemas = { volunteer: volunteerSchema, pledge: pledgeSchema, contact: contactSchema } as const;
export type FormValues<K extends FormKind> = z.input<(typeof schemas)[K]>;

/** The purpose recorded with each submission (DPA 2019: purpose limitation). */
export const purposes: Record<FormKind, string> = {
  volunteer: "Organise campaign volunteers in Sotik",
  pledge: "Record pledges of support for the campaign",
  contact: "Reply to the sender's message",
};
