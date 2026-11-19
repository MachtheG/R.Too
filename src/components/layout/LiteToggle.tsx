"use client";
import { useTranslations } from "next-intl";
import { setLiteMode, useLiteMode } from "@/components/shared/useLiteMode";

export function LiteToggle() {
  const t = useTranslations("common.lite");
  const lite = useLiteMode();
  return (
    <button type="button" aria-pressed={lite} onClick={() => setLiteMode(!lite)} className="min-h-11 text-left text-sm underline underline-offset-4 hover:text-mist">
      {lite ? t("on") : t("off")}
    </button>
  );
}
