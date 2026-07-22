"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, FileCode2, ShieldCheck } from "lucide-react";
import type { ConditionState, ContractStatus, ProcessMode } from "@/lib/types";

interface SmartContractCardProps {
  mode: ProcessMode;
  status: ContractStatus | null;
  conditions: ConditionState[];
  log: string[];
  contractId: string;
}

const STAGES: { key: ContractStatus; label: string }[] = [
  { key: "created", label: "Created" },
  { key: "verified", label: "Verified" },
  { key: "approved", label: "Approved" },
  { key: "executed", label: "Executed" },
];

export function SmartContractCard({ mode, status, conditions, log, contractId }: SmartContractCardProps) {
  const isAutomated = mode === "smart-contract";
  const activeIndex = status ? STAGES.findIndex((s) => s.key === status) : -1;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${
              isAutomated ? "bg-gradient-to-br from-blue-600 to-violet-600" : "bg-slate-100"
            }`}
          >
            <FileCode2 className={`h-5 w-5 ${isAutomated ? "text-white" : "text-slate-400"}`} strokeWidth={2} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {isAutomated ? "Smart Contract" : "Manual Settlement Record"}
            </p>
            <p className="font-mono text-[11px] text-slate-400">{contractId}</p>
          </div>
        </div>
        {isAutomated && (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-medium text-blue-700">
            <ShieldCheck className="h-3 w-3" /> Verified network
          </span>
        )}
      </div>

      {/* Stage stepper */}
      <div className="mt-6">
        <div className="flex items-center">
          {STAGES.map((stage, i) => {
            const reached = isAutomated && activeIndex >= i;
            const lineFilled = isAutomated && activeIndex > i;
            return (
              <div key={stage.key} className="flex flex-1 items-center last:flex-none">
                <motion.div
                  animate={{
                    backgroundColor: reached ? "#2563eb" : "#f1f5f9",
                    borderColor: reached ? "#2563eb" : "#e2e8f0",
                  }}
                  transition={{ duration: 0.35 }}
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border"
                >
                  {reached ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                  )}
                </motion.div>
                {i < STAGES.length - 1 && (
                  <div className="mx-1 h-px flex-1 overflow-hidden bg-slate-200">
                    <motion.div
                      className="h-px bg-blue-600"
                      initial={false}
                      animate={{ width: lineFilled ? "100%" : "0%" }}
                      transition={{ duration: 0.45, ease: "easeInOut" }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-2 flex justify-between">
          {STAGES.map((stage, i) => (
            <span
              key={stage.key}
              className={`text-[11px] font-medium ${
                isAutomated && activeIndex >= i ? "text-slate-800" : "text-slate-400"
              }`}
            >
              {stage.label}
            </span>
          ))}
        </div>
      </div>

      {/* Conditions checklist */}
      <div className="mt-6 space-y-2.5 border-t border-slate-100 pt-5">
        {conditions.map((c) => (
          <div key={c.label} className="flex items-center gap-2.5 text-sm">
            {c.met ? (
              <CheckCircle2 className={`h-4 w-4 shrink-0 ${isAutomated ? "text-blue-600" : "text-slate-400"}`} />
            ) : isAutomated ? (
              <Circle className="h-4 w-4 shrink-0 text-slate-300" />
            ) : (
              <Clock className="h-4 w-4 shrink-0 text-amber-500" />
            )}
            <span className={c.met ? "text-slate-700" : "text-slate-400"}>{c.label}</span>
          </div>
        ))}
      </div>

      {/* Audit / activity log */}
      <div className="mt-6 border-t border-slate-100 pt-5">
        <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          {isAutomated ? "Audit trail" : "Activity log"}
        </p>
        <div className="space-y-1.5">
          <AnimatePresence initial={false}>
            {log.map((entry) => (
              <motion.p
                key={entry}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="font-mono text-[11px] text-slate-500"
              >
                {entry}
              </motion.p>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
