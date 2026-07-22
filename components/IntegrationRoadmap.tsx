"use client";

import { motion } from "framer-motion";
import { BookOpen, Gauge, ScanSearch, ShieldCheck, Target, TrendingUp, Users2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Phase {
  icon: LucideIcon;
  title: string;
  detail: string;
}

const PHASES: Phase[] = [
  {
    icon: BookOpen,
    title: "Educate and align",
    detail:
      "Get executive sponsors, legal, and security aligned on why this makes sense and what a pilot needs to prove. Agree on what success looks like before picking a partner. See the executive scorecard for the trade-off you're actually signing up for.",
  },
  {
    icon: Target,
    title: "Choose a narrow pilot",
    detail:
      "Pick one counterparty relationship, one recurring and predictable transaction type (not your highest-value or most complex deal), and one clear metric to prove out, like days-to-settlement.",
  },
  {
    icon: Users2,
    title: "Assemble named owners",
    detail:
      "Every workstream needs a named person, not a committee: security for the audit and access control, legal for contract language, finance for funding and custody, and engineering for the integration itself.",
  },
  {
    icon: ScanSearch,
    title: "Put the fundamentals in place",
    detail:
      "Wallet and custody, legal sign-off, and an ERP integration plan need to exist before any code touches real value. The full checklist is below.",
  },
  {
    icon: ShieldCheck,
    title: "Build, audit, and test together",
    detail:
      "Deploy a vetted contract, get it audited, and test the full flow with your counterparty on a testnet (a practice network that behaves like the real one but moves no real value) before either side commits funds.",
  },
  {
    icon: Gauge,
    title: "Run a bounded pilot",
    detail:
      "Cap how much value can move through the contract while confidence builds, and monitor it closely. A pilot that runs clean for a defined period is the evidence that justifies expanding it.",
  },
  {
    icon: TrendingUp,
    title: "Expand deliberately",
    detail:
      "Raise the value cap and add counterparties in stages, not all at once. Each stage should earn the next based on what the monitoring actually showed, not a calendar date.",
  },
];

export function IntegrationRoadmap() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Where do I start?</p>
      <h2 className="mt-1.5 text-xl font-semibold text-slate-900">The path from &ldquo;let&apos;s explore this&rdquo; to live</h2>
      <p className="mt-2 max-w-2xl text-sm text-slate-500">
        Seven phases, in order. Skipping ahead is how these programs stall or overreach.
      </p>

      <div className="relative mt-8 pl-2">
        <div className="absolute left-[27px] top-2 bottom-2 w-px bg-slate-200" />
        <motion.div
          className="absolute left-[27px] top-2 w-px origin-top bg-gradient-to-b from-blue-600 to-violet-600"
          style={{ bottom: "0.5rem" }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        />

        <div className="space-y-8">
          {PHASES.map((phase, i) => (
            <motion.div
              key={phase.title}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="relative flex gap-5"
            >
              <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
                <phase.icon className="h-6 w-6 text-blue-600" strokeWidth={1.75} />
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[10px] font-semibold text-white">
                  {i + 1}
                </span>
              </div>
              <div className="pt-1">
                <p className="text-sm font-semibold text-slate-900">{phase.title}</p>
                <p className="mt-1 text-sm text-slate-500">{phase.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
