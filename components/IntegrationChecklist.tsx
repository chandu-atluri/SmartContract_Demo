"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Check, ChevronDown, Handshake, Link2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ChecklistItem {
  title: string;
  detail: string;
}

interface ChecklistSection {
  icon: LucideIcon;
  title: string;
  summary: string;
  items: ChecklistItem[];
}

const SECTIONS: ChecklistSection[] = [
  {
    icon: Building2,
    title: "What you need internally",
    summary: "Before your team can deploy anything, these have to already be in place.",
    items: [
      {
        title: "An executive sponsor and budget",
        detail:
          "Someone senior enough to unblock legal, security, and finance at the same time. This touches all three, not just IT.",
      },
      {
        title: "Legal sign-off on the contract as authority",
        detail:
          "Updated language in the master supply agreement stating that the smart contract's on-chain state is the authoritative record of delivery and payment.",
      },
      {
        title: "A funded settlement wallet",
        detail:
          "Treasury needs a process to hold and release the invoice value: ETH or, increasingly, a stablecoin (a token pegged 1:1 to a currency like the US dollar, e.g. USDC), plus a policy for how much can sit in escrow at any time.",
      },
      {
        title: "Key custody already solved",
        detail: "A multi-sig (multi-signature) wallet or hardware-backed signer set up before the first dollar moves, not after.",
      },
      {
        title: "A vetted, audited contract",
        detail: "Either a reusable template your security team has already reviewed, or budget and timeline for a first audit.",
      },
      {
        title: "ERP/finance integration",
        detail:
          "A way for a purchase order in your existing system (SAP, Oracle, NetSuite, or similar) to generate matching on-chain terms, and for a completed on-chain transaction to reconcile back automatically.",
      },
      {
        title: "A named internal owner for monitoring",
        detail: "Someone actually watching the contract once it's live, not just during launch week.",
      },
      {
        title: "A decision on network",
        detail: "Ethereum mainnet, a Layer 2 (a lower-cost network that settles back to Ethereum, e.g. Arbitrum or Base), or a permissioned enterprise chain. Each option carries different cost, performance, and counterparty implications.",
      },
    ],
  },
  {
    icon: Handshake,
    title: "What your counterparty needs to provide",
    summary: "You can hand this list directly to Company A. None of it is optional.",
    items: [
      {
        title: "A wallet address",
        detail: "The account that will receive payment, or, on the supplier side, submit delivery confirmation.",
      },
      {
        title: "Their own key custody answer",
        detail: "You can't outsource their side of this. Ask how they hold their signing keys before you rely on their confirmation.",
      },
      {
        title: "Agreement on the encoded terms",
        detail:
          "Invoice amount, currency, delivery window, quality thresholds, purchase-order reference. All of it gets hard-coded, so ambiguity has to be resolved before deployment, not during a dispute.",
      },
      {
        title: "A delivery-confirmation method",
        detail:
          "Direct integration if they can sign transactions themselves, or a trusted third-party feed (carrier API, logistics platform, IoT sensor) if they can't.",
      },
      {
        title: "A named security contact",
        detail: "Who you call if their side of the integration looks compromised.",
      },
      {
        title: "Sign-off on the same legal language",
        detail: "Both sides need to agree the contract is authoritative, not just your side.",
      },
    ],
  },
  {
    icon: Link2,
    title: "What you agree on together",
    summary: "Decided jointly, before go-live, not defaulted to whichever side set up the contract.",
    items: [
      {
        title: "The data source for delivery confirmation",
        detail: "A mutually trusted feed, agreed in advance, not chosen unilaterally by one side.",
      },
      {
        title: "The dispute process",
        detail:
          "What happens if delivery is partial, contested, or the data feed fails. Smart contracts are bad at judgment calls, so this needs a human fallback path both sides accept.",
      },
      {
        title: "The audit",
        detail: "Ideally a shared or mutually reviewed audit, so trust in the code isn't one-sided.",
      },
      {
        title: "The upgrade and change process",
        detail: "What happens if terms need to change mid-relationship, and who has to approve it.",
      },
      {
        title: "The testnet-to-mainnet cutover plan",
        detail: "Test the full flow together on a testnet (a practice version of the network where nothing of real value moves) before cutting over to mainnet. Not separately, and not for the first time in a live transaction.",
      },
      {
        title: "Shared visibility into the audit trail",
        detail: "Both sides should be able to independently verify contract state, not rely on the other party's word.",
      },
    ],
  },
];

export function IntegrationChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-3">
      {SECTIONS.map((section, si) => {
        const doneCount = section.items.filter((item) => checked[`${si}-${item.title}`]).length;
        return (
          <div key={section.title}>
            {si > 0 && (
              <div className="flex justify-center py-1">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-300">
                  <ChevronDown className="h-4 w-4" />
                </span>
              </div>
            )}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600">
                  <section.icon className="h-5 w-5 text-white" strokeWidth={1.75} />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
                  <p className="text-sm text-slate-500">{section.summary}</p>
                </div>
                <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
                  {doneCount}/{section.items.length}
                </span>
              </div>

              <ul className="mt-6 space-y-3">
                {section.items.map((item) => {
                  const key = `${si}-${item.title}`;
                  const isChecked = !!checked[key];
                  return (
                    <li key={item.title}>
                      <button
                        type="button"
                        onClick={() => toggle(key)}
                        className={`flex w-full items-start gap-3 rounded-xl p-4 text-left transition-colors ${
                          isChecked ? "bg-blue-50" : "bg-slate-50 hover:bg-slate-100"
                        }`}
                      >
                        <motion.span
                          animate={{
                            backgroundColor: isChecked ? "#2563eb" : "#ffffff",
                            borderColor: isChecked ? "#2563eb" : "#cbd5e1",
                          }}
                          transition={{ duration: 0.2 }}
                          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2"
                        >
                          {isChecked && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
                        </motion.span>
                        <div>
                          <p
                            className={`text-sm font-semibold ${
                              isChecked ? "text-slate-400 line-through decoration-slate-300" : "text-slate-800"
                            }`}
                          >
                            {item.title}
                          </p>
                          <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.section>
          </div>
        );
      })}

      <div className="mt-3 rounded-2xl border border-dashed border-slate-200 p-5">
        <p className="text-sm text-slate-500">
          <span className="font-semibold text-slate-700">None of this is unique to blockchain.</span> It&apos;s the
          same rigor you&apos;d apply to any new payment rail or system integration with a counterparty. The
          difference is that once deployed, the contract enforces itself exactly as written, so getting this list
          right before go-live matters more than it would with a system you can still patch after the fact.
        </p>
      </div>
    </div>
  );
}
