import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SecurityGuides } from "@/components/SecurityGuides";

export const metadata = {
  title: "Security Guides | Enterprise Smart Contract Automation",
  description:
    "Step-by-step guides covering the security work cyber professionals do before and after an enterprise smart contract goes live.",
};

export default function SecurityGuidesPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
            Security guides
          </span>
          <h1 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            The step-by-step work behind each area
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-500">
            Automating settlement removes manual approval risk, but it introduces new places where security work is
            essential. This is what cyber professionals actually do in each area: the sequence they&apos;d follow, not
            just the topic list. Jump to any section below.
          </p>
        </div>

        <div className="mt-12">
          <SecurityGuides />
        </div>

        <div className="mt-12 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to the demo
          </Link>
          <Link
            href="/for-executives"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Read the executive scorecard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
