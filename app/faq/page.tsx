import { FaqList } from "@/components/FaqList";

export const metadata = {
  title: "FAQ | Enterprise Smart Contract Automation",
  description: "Direct answers to the objections executives actually raise about using a smart contract for settlement.",
};

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
            FAQ
          </span>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            The questions people actually ask
          </h1>
          <p className="mt-4 text-lg text-slate-500">
            Direct answers to the objections and doubts that come up before anyone commits to this.
          </p>
        </div>

        <div className="mt-12">
          <FaqList />
        </div>
      </div>
    </main>
  );
}
