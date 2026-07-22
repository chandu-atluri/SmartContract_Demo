import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EcosystemOverview } from "@/components/EcosystemOverview";
import { ValidationDetails } from "@/components/ValidationDetails";

export const metadata = {
  title: "How Validation Works | Enterprise Smart Contract Automation",
  description:
    "The specific mechanics behind each smart contract stage, and where it fits in the broader system it depends on.",
};

export default function ValidationPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
            How validation works
          </span>
          <h1 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            What actually happens behind Created, Verified, Approved, and Executed
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-500">
            The demo shows four stages moving in sequence. This page explains the mechanism behind each one, and
            where the contract fits inside the larger system it depends on.
          </p>
        </div>

        <div className="mt-12">
          <ValidationDetails />
        </div>

        <div className="mt-8">
          <EcosystemOverview />
        </div>

        <div className="mt-12 flex justify-end">
          <Link
            href="/security-guides"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Next: Security guides
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
