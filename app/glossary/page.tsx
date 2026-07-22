import { GlossaryTerms } from "@/components/GlossaryTerms";

export const metadata = {
  title: "Glossary | Enterprise Smart Contract Automation",
  description: "Plain-English definitions for the blockchain terms used throughout this site.",
};

export default function GlossaryPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
            Glossary
          </span>
          <h1 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            The terms used across this site, in plain English
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-500">
            Every blockchain-specific term used elsewhere on this site gets a one-line, plain-English definition
            here. A reference, not required reading.
          </p>
        </div>

        <div className="mt-12">
          <GlossaryTerms />
        </div>
      </div>
    </main>
  );
}
