"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";

type Props = { items: { href: string; label: string }[]; menuLabel: string; closeLabel: string };

export function MobileMenu({ items, menuLabel, closeLabel }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? closeLabel : menuLabel}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-11 items-center justify-center rounded-md bg-primary text-paper"
      >
        {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
      </button>
      {open && (
        <nav id="mobile-nav" aria-label={menuLabel} className="absolute inset-x-0 top-full border-b border-rule bg-background">
          <ul className="flex flex-col px-4 py-2">
            {items.map((i) => (
              <li key={i.href} className="border-t border-rule first:border-t-0">
                <Link href={i.href} onClick={() => setOpen(false)} className="block py-3 font-display text-xl text-ink dark:text-paper">
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
