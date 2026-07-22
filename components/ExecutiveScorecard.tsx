"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Fingerprint, FileCode2, HelpCircle, Radar, ScrollText } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Level = "Low" | "Medium" | "High" | "Very high";

const LEVEL_WIDTH: Record<Level, number> = {
  Low: 22,
  Medium: 48,
  High: 72,
  "Very high": 96,
};

interface RiskShiftRow {
  metric: string;
  traditional: Level;
  smartContract: Level;
}

const RISK_SHIFT: RiskShiftRow[] = [
  { metric: "Settlement speed", traditional: "Low", smartContract: "Very high" },
  { metric: "Process consistency", traditional: "Medium", smartContract: "Very high" },
  { metric: "Audit trail completeness", traditional: "Low", smartContract: "Very high" },
  { metric: "Human review checkpoints", traditional: "Very high", smartContract: "Low" },
];

interface RiskArea {
  icon: LucideIcon;
  title: string;
  owner: string;
  description: string;
}

const RISK_AREAS: RiskArea[] = [
  {
    icon: FileCode2,
    title: "The contract code",
    owner: "Security & engineering",
    description: "The logic deciding Created, Verified, Approved, Executed. Get it wrong and it's wrong every time, at machine speed.",
  },
  {
    icon: Fingerprint,
    title: "Who can act on it",
    owner: "Security & IT",
    description: "The keys and permissions controlling the contract. A stolen key is worth exactly what the contract can move.",
  },
  {
    icon: Radar,
    title: "The data it trusts",
    owner: "Engineering & security",
    description: "Delivery confirmations, sensor feeds, price data. A contract executing on false data is doing exactly what it was told.",
  },
  {
    icon: ScrollText,
    title: "What happens after go-live",
    owner: "Security operations",
    description: "Monitoring, incident response, and the audit trail a board or regulator will eventually ask for.",
  },
];

const QUESTIONS = [
  "Who audited this, and have you seen the findings, not just the summary slide?",
  "If a signing key is compromised tonight, what's the actual exposure, and how fast can the organization react?",
  "What happens if the data feeding this contract is wrong? Who notices, and how long does that take?",
  "Is anything sitting on a public ledger that shouldn't be, like commercial terms or personal data?",
  "Who is actually authorized to pause this contract, and has that ever been tested, or is it still theoretical?",
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function ExecutiveScorecard() {
  return (
    <div className="space-y-8">
      {/* Why this matters */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-slate-900">Why this matters now</h2>
        <p className="mt-3 text-slate-600">
          Enterprises are moving real settlement (invoices, trade finance, supply chain payments) onto smart
          contracts because it collapses a 30-day, 12-approval process into something that finishes in seconds and
          can&apos;t be argued with after the fact. That&apos;s a genuine operational win, and a genuine shift in
          where risk lives. The scorecard below is the shift, in one view.
        </p>
      </motion.section>

      {/* Risk shift scorecard */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-slate-900">The risk shift, scored</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          Not &ldquo;more risk.&rdquo; Different risk. Relative levels, not measured percentages.
        </p>

        <div className="mt-6 space-y-5">
          <div className="flex gap-6 pb-2 pl-0 text-xs font-semibold uppercase tracking-wide text-slate-400 sm:pl-40">
            <span className="ml-auto sm:ml-0 sm:w-[calc(50%-5rem)]">Current process</span>
            <span className="sm:w-[calc(50%-5rem)]">Smart contract</span>
          </div>
          {RISK_SHIFT.map((row) => (
            <div key={row.metric} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <p className="text-sm font-medium text-slate-700 sm:w-36 sm:shrink-0">{row.metric}</p>
              <div className="flex flex-1 flex-col gap-1.5 sm:flex-row sm:gap-3">
                <div className="flex items-center gap-2 sm:w-1/2">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      className="h-full rounded-full bg-slate-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${LEVEL_WIDTH[row.traditional]}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </div>
                  <span className="w-16 shrink-0 text-xs text-slate-500">{row.traditional}</span>
                </div>
                <div className="flex items-center gap-2 sm:w-1/2">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-violet-600"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${LEVEL_WIDTH[row.smartContract]}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    />
                  </div>
                  <span className="w-16 shrink-0 text-xs font-medium text-blue-700">{row.smartContract}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          Fewer human review checkpoints isn&apos;t automatically safer. It just moves scrutiny earlier, to before
          go-live, instead of spreading it through the process. That trade is the one worth naming out loud.
        </p>
      </motion.section>

      {/* Four risk areas */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-slate-900">Where the risk concentrates</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          Four areas, and they don&apos;t get equal attention by default.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {RISK_AREAS.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="rounded-xl border border-slate-200 p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600">
                <area.icon className="h-5 w-5 text-white" strokeWidth={1.75} />
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-900">{area.title}</p>
              <p className="mt-1 text-sm text-slate-500">{area.description}</p>
              <span className="mt-3 inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                Primary owner: {area.owner}
              </span>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-sm text-slate-500">
          Each area has a detailed, step-by-step breakdown for the people doing the work. See the{" "}
          <Link href="/security-guides" className="font-medium text-blue-600 hover:text-blue-700">
            security guides
          </Link>{" "}
          and{" "}
          <Link href="/validation" className="font-medium text-blue-600 hover:text-blue-700">
            how validation works
          </Link>
          .
        </p>
      </motion.section>

      {/* Questions */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-violet-50 p-6 sm:p-8"
      >
        <div className="flex items-center gap-2.5">
          <HelpCircle className="h-5 w-5 text-blue-600" strokeWidth={1.75} />
          <h2 className="text-xl font-semibold text-slate-900">Questions worth asking before go-live</h2>
        </div>
        <ul className="mt-5 space-y-3">
          {QUESTIONS.map((q, i) => (
            <motion.li
              key={q}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="flex gap-3 text-slate-700"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-blue-700 shadow-sm">
                {i + 1}
              </span>
              <span className="text-sm">{q}</span>
            </motion.li>
          ))}
        </ul>
      </motion.section>

      {/* Where to start */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-slate-900">Where to start</h2>
        <p className="mt-3 text-slate-600">
          None of this needs to be solved at once. Trying to is usually how these programs stall. Start with the
          code and the keys before scaling real value through the contract; monitoring and compliance maturity
          build alongside adoption.
        </p>
        <p className="mt-3 text-slate-600">
          For the actual path (the phases to work through and what you need at each one), see{" "}
          <Link href="/getting-started" className="font-medium text-blue-600 hover:text-blue-700">
            getting started
          </Link>
          .
        </p>
      </motion.section>

      {/* Closing */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-slate-200 bg-slate-900 p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-white">The short version</h2>
        <p className="mt-3 text-slate-300">
          Smart contracts don&apos;t remove the need for security judgment. They relocate it. It moves from
          someone clicking &ldquo;approve&rdquo; on an invoice to someone deciding, in advance, whether the code was
          verified, who holds the keys, and whether anyone&apos;s watching before it goes live. That decision is
          still yours to own.
        </p>
      </motion.section>
    </div>
  );
}
