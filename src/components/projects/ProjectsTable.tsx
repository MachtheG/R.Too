"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Project } from "@data/projects";
import { numberLocale, pick } from "@/lib/i18n-helpers";

type Props = { projects: Project[]; wards: { slug: string; name: string }[]; locale: string };

export function ProjectsTable({ projects, wards, locale }: Props) {
  const t = useTranslations("projects");
  const fmt = new Intl.NumberFormat(numberLocale(locale));
  const wardName = (slug: string) => (slug === "all" ? t("detail.allWards") : (wards.find((w) => w.slug === slug)?.name ?? slug));

  return (
    <div className="overflow-x-auto border border-rule">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead className="bg-primary text-left text-paper">
          <tr>
            {(["name", "sector", "ward", "year", "role", "amount", "status"] as const).map((c) => (
              <th key={c} scope="col" className="p-3 font-semibold">{t(`col.${c}`)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.slug} className="border-t border-rule">
              <td className="p-3"><Link href={`/projects/${p.slug}`} className="font-semibold underline-offset-4 hover:underline">{pick(p.name, locale)}</Link></td>
              <td className="p-3">{t(`sector.${p.sector}`)}</td>
              <td className="p-3">{wardName(p.ward)}</td>
              <td className="p-3 tabular-nums">{p.year}</td>
              <td className="p-3">{t(`role.${p.role}`)}</td>
              <td className="p-3 tabular-nums">{p.amount ? `KSh ${fmt.format(p.amount.kes)} (${t(`amountKind.${p.amount.kind}`)})` : "—"}</td>
              <td className="p-3">{t(`status.${p.status}`)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
