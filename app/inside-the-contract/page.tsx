import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContractAnatomy } from "@/components/ContractAnatomy";

export const metadata = {
  title: "Inside a Smart Contract | Enterprise Smart Contract Automation",
  description:
    "What actually belongs in a smart contract, what it looks like in code, and the real paths to getting one built.",
};

export default function InsideTheContractPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
            Inside a smart contract
          </span>
          <h1 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            What actually belongs in one, and how you get one
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-500">
            The checklist tells you what you need. This is what the thing itself actually looks like: the key
            elements, in plain language and in the real code behind this demo.
          </p>
        </div>

        <div className="mt-12">
          <ContractAnatomy />
        </div>

        <div className="mt-12 flex justify-end">
          <Link
            href="/validation"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Next: How validation works
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
