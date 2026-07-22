import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ExecutiveScorecard } from "@/components/ExecutiveScorecard";

export const metadata = {
  title: "For Executives | Enterprise Smart Contract Automation",
  description:
    "A scorecard view of where risk actually moves when settlement is automated with smart contracts, and what to ask before go-live.",
};

export default function ForExecutivesPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
            For executives
          </span>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Smart contracts don&apos;t remove risk. They relocate it.
          </h1>
          <p className="mt-4 text-lg text-slate-500">
            A scorecard view of what actually changes when an enterprise automates settlement with a smart
            contract, plus the handful of questions worth asking before it goes live.
          </p>
        </div>

        <div className="mt-12">
          <ExecutiveScorecard />
        </div>

        <div className="mt-12 flex justify-end">
          <Link
            href="/getting-started"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            See where to start
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
