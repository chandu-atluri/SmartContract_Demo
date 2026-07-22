import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-400">
          © 2026 Chandu Atluri. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <Link href="/glossary" className="text-xs font-medium text-slate-500 hover:text-slate-900">
            Glossary
          </Link>
          <Link href="/faq" className="text-xs font-medium text-slate-500 hover:text-slate-900">
            FAQ
          </Link>
        </div>
      </div>
    </footer>
  );
}
