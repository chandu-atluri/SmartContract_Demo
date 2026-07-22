import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IntegrationChecklist } from "@/components/IntegrationChecklist";
import { IntegrationRoadmap } from "@/components/IntegrationRoadmap";

export const metadata = {
  title: "Getting Started | Enterprise Smart Contract Automation",
  description:
    "The path to integrating a smart contract with a real counterparty, and the concrete checklist of what you need, what they need, and what gets agreed jointly.",
};

export default function GettingStartedPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
            Getting started
          </span>
          <h1 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Where to start, and what you actually need
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-500">
            Reading about smart contracts is one thing. Standing one up with a real counterparty (call them
            Company A) is another. Here is the path, followed by the concrete list of who provides what.
          </p>
        </div>

        <div className="mt-12">
          <IntegrationRoadmap />
        </div>

        <div className="mt-8">
          <IntegrationChecklist />
        </div>

        <div className="mt-12 flex justify-end">
          <Link
            href="/inside-the-contract"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Next: What&apos;s inside a smart contract
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
