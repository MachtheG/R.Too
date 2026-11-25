import { siteUrl } from "@/lib/site";

export function WhatsAppShare({ text, label, path = "" }: { text: string; label: string; path?: string }) {
  const href = `https://wa.me/?text=${encodeURIComponent(`${text} ${siteUrl}${path}`)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-secondary self-start"
    >
      {label}
    </a>
  );
}
