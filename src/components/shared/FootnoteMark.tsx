import { Link } from "@/i18n/navigation";

/** Superscript source marker linking to the entry on /sources. */
export function FootnoteMark({ n, sourceId, label }: { n: number; sourceId: string; label: string }) {
  return (
    <sup className="ml-1 align-super font-mono text-[11px]">
      <Link href={`/sources#${sourceId}`} aria-label={`${label} ${n}`} className="text-current underline-offset-2 hover:underline">
        {n}
      </Link>
    </sup>
  );
}
