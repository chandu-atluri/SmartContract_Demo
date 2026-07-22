"use client";

import { FileSignature, GitCompareArrows, ListChecks, Lock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ValidationStage {
  icon: LucideIcon;
  stage: string;
  trigger: string;
  mechanism: string;
  trust: string;
}

const STAGES: ValidationStage[] = [
  {
    icon: FileSignature,
    stage: "Created",
    trigger: "The supplier (or a connected logistics system) submits delivery confirmation on-chain.",
    mechanism:
      "That submission is cryptographically signed with the supplier's private key. The network checks the signature against the supplier's registered address before accepting the record, so no outside party can file a fake delivery event.",
    trust:
      "The record is timestamped and appended to the ledger. Once confirmed, it can't be edited or deleted, only added to.",
  },
  {
    icon: GitCompareArrows,
    stage: "Verified",
    trigger: "The contract compares the delivery record against the terms agreed when the contract was created.",
    mechanism:
      "This is deterministic rule evaluation: quantity, unit price, purchase-order number, delivery window, and quality thresholds are all checked in code. The same check runs independently on every validating node, and they must all agree on the result before \"Verified\" is accepted.",
    trust:
      "Because every node re-runs the identical check, no single party, including the buyer or the supplier, can quietly alter the outcome. A short-shipped quantity or a mismatched PO halts the contract instead of letting it proceed.",
  },
  {
    icon: ListChecks,
    stage: "Approved",
    trigger: "All verification conditions returned true.",
    mechanism:
      "Approval is a logic gate, not a person: if goods delivered AND invoice matches purchase order AND quality passed AND terms are within window, then approved. There's no inbox, no queue, and no one positioned to sit on it.",
    trust:
      "The approval rule itself was agreed and locked in by both parties before the contract went live, so neither side can change the rules mid-transaction to their advantage.",
  },
  {
    icon: Lock,
    stage: "Executed",
    trigger: "The approved state is reached.",
    mechanism:
      "Releasing payment and updating the status happen inside a single atomic transaction: both occur together, or neither does. There's no partial state where funds move but the record doesn't update, or the reverse.",
    trust:
      "The completed transaction, and every step that led to it, is permanently visible to both organizations: a tamper-evident audit trail instead of two internal systems reconciled after the fact.",
  },
];

export function ValidationDetails() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">How validation actually works</p>
      <h2 className="mt-1.5 text-2xl font-semibold text-slate-900">
        What &ldquo;Verified&rdquo; and &ldquo;Approved&rdquo; really check
      </h2>
      <p className="mt-2 max-w-2xl text-slate-500">
        Each stage below is a specific, checkable event, not a black box. Here is the mechanism behind each one.
      </p>

      <div className="mt-8 space-y-6">
        {STAGES.map((s, i) => (
          <div key={s.stage} className="flex gap-4 sm:gap-5">
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600">
                <s.icon className="h-5 w-5 text-white" strokeWidth={1.75} />
              </div>
              {i < STAGES.length - 1 && <div className="mt-2 w-px flex-1 bg-slate-200" />}
            </div>
            <div className={i < STAGES.length - 1 ? "pb-6" : ""}>
              <p className="text-base font-semibold text-slate-900">{s.stage}</p>
              <p className="mt-1 text-sm text-slate-500">{s.trigger}</p>
              <div className="mt-3 rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Mechanism</p>
                <p className="mt-1 text-sm text-slate-700">{s.mechanism}</p>
              </div>
              <div className="mt-3 rounded-xl bg-blue-50/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Why it can be trusted</p>
                <p className="mt-1 text-sm text-slate-700">{s.trust}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 rounded-xl border border-dashed border-slate-200 p-4">
        <p className="text-sm text-slate-500">
          <span className="font-semibold text-slate-700">One distinction worth keeping straight: </span>
          the contract&apos;s own logic (Verified, Approved) runs entirely on-chain and is deterministic. The event that
          starts the process, delivery confirmation, comes from the real world, which means it depends on an
          oracle or trusted data feed. That handoff is exactly where the security section below applies.
        </p>
      </div>
    </div>
  );
}
