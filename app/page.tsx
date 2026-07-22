"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Blocks, ListChecks, Pause, Play, RotateCcw, ScrollText, ShieldCheck, Workflow } from "lucide-react";
import { DashboardMetrics } from "@/components/DashboardMetrics";
import { SmartContractCard } from "@/components/SmartContractCard";
import { Timeline } from "@/components/Timeline";
import { TransactionFlow } from "@/components/TransactionFlow";
import { useDemoPlayer } from "@/lib/useDemoPlayer";
import type { ProcessMode } from "@/lib/types";

const LEARN_MORE = [
  {
    href: "/for-executives",
    icon: ScrollText,
    title: "For executives",
    description: "A scorecard view of where risk actually moves, and what to ask before go-live.",
  },
  {
    href: "/getting-started",
    icon: ListChecks,
    title: "Getting started",
    description: "The path to integration, what you need internally, and what to hand your counterparty.",
  },
  {
    href: "/inside-the-contract",
    icon: Blocks,
    title: "Inside the contract",
    description: "What actually belongs in a smart contract, what it looks like in code, and how you get one built.",
  },
  {
    href: "/validation",
    icon: Workflow,
    title: "How validation works",
    description: "The specific mechanism behind Created, Verified, Approved, and Executed, and where it fits in the bigger picture.",
  },
  {
    href: "/security-guides",
    icon: ShieldCheck,
    title: "Security guides",
    description: "Step-by-step guides for each area, plus the frameworks and tools cyber professionals actually use.",
  },
];

const MODES: { key: ProcessMode; label: string }[] = [
  { key: "traditional", label: "Current process" },
  { key: "smart-contract", label: "Smart contract automation" },
];

export default function Home() {
  const { mode, switchMode, steps, step, stepIndex, isPlaying, isLastStep, play, pause, reset, goToStep } =
    useDemoPlayer();

  const log = steps.slice(0, stepIndex + 1).map((s) => s.logEntry);

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        {/* Hero */}
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
            Enterprise Smart Contract Automation
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Automating invoice settlement between supplier and buyer
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            See how an Ethereum-based smart contract replaces a 30-day manual approval cycle with instant,
            trusted settlement between two organizations.
          </p>
        </div>

        {/* Mode toggle */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1">
            {MODES.map((m) => (
              <button
                key={m.key}
                type="button"
                onClick={() => switchMode(m.key)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  mode === m.key ? "text-white" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {mode === m.key && (
                  <motion.span
                    layoutId="mode-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-violet-600"
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  />
                )}
                <span className="relative">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step header + controls */}
        <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="max-w-xl"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                Step {stepIndex + 1} of {steps.length}
              </p>
              <h2 className="mt-1 text-xl font-semibold text-slate-900">{step.title}</h2>
              <p className="mt-1.5 text-sm text-slate-500">{step.description}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={isPlaying ? pause : play}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isPlaying ? "Pause" : isLastStep ? "Replay" : "Play"}
            </button>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center rounded-full border border-slate-200 p-2.5 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700"
              aria-label="Reset"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Flow diagram */}
        <div className="mt-8">
          <TransactionFlow step={step} />
        </div>

        {/* Timeline */}
        <div className="mt-10">
          <Timeline steps={steps} currentIndex={stepIndex} onSelect={goToStep} />
        </div>

        {/* Contract / ledger panel */}
        <div className="mt-14">
          <SmartContractCard
            mode={mode}
            status={step.contractStatus}
            conditions={step.conditions}
            log={log}
            contractId={mode === "smart-contract" ? "Contract Ref · 0x8f3C…9A21" : "PO Ref · 2026-0417"}
          />
        </div>

        {/* Learn more */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LEARN_MORE.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col rounded-2xl border border-slate-200 p-6 transition-colors hover:border-blue-200 hover:bg-slate-50/60"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900">
                <item.icon className="h-5 w-5 text-white" strokeWidth={1.75} />
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-900">{item.title}</p>
              <p className="mt-1.5 flex-1 text-sm text-slate-500">{item.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600">
                Read more
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        {/* Executive dashboard */}
        <div className="mt-20">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-slate-900">Executive impact</h2>
            <p className="mt-2 text-slate-500">The measurable difference smart contract automation makes.</p>
          </div>
          <div className="mt-8">
            <DashboardMetrics mode={mode} />
          </div>
        </div>
      </div>
    </main>
  );
}
