import { siteUrl } from "@/lib/site";

export function WhatsAppShare({ text, label, path = "" }: { text: string; label: string; path?: string }) {
  const href = `https://wa.me/?text=${encodeURIComponent(`${text} ${siteUrl}${path}`)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-12 items-center justify-center self-start border border-mist px-5 font-semibold hover:bg-mist hover:text-tea"
    >
      {label}
    </a>
  );
}
