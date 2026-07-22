"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Overview" },
  { href: "/for-executives", label: "For executives" },
  { href: "/getting-started", label: "Getting started" },
  { href: "/inside-the-contract", label: "Inside the contract" },
  { href: "/validation", label: "How validation works" },
  { href: "/security-guides", label: "Security guides" },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3.5">
        <Link href="/" className="text-sm font-semibold text-slate-900">
          Enterprise Smart Contract Automation
        </Link>
        <nav className="flex items-center gap-1">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  active ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
