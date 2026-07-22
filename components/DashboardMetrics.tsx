"use client";

import { Clock, FileSearch, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ProcessMode } from "@/lib/types";

interface MetricRow {
  icon: LucideIcon;
  label: string;
  before: string;
  after: string;
}

const METRICS: MetricRow[] = [
  { icon: Clock, label: "Settlement time", before: "30 days", after: "Seconds" },
  { icon: Users, label: "Manual approvals", before: "12", after: "Automated" },
  { icon: FileSearch, label: "Reconciliation effort", before: "High", after: "Instant audit trail" },
];

interface DashboardMetricsProps {
  mode: ProcessMode;
}

export function DashboardMetrics({ mode }: DashboardMetricsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div
        className={`rounded-2xl border p-6 transition-colors duration-300 ${
          mode === "traditional" ? "border-slate-300 bg-slate-50" : "border-slate-200 bg-white"
        }`}
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Current process</p>
        <ul className="mt-5 space-y-4">
          {METRICS.map((m) => (
            <li key={m.label} className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                <m.icon className="h-4 w-4 text-slate-500" />
              </span>
              <span className="flex-1 text-sm text-slate-600">{m.label}</span>
              <span className="text-sm font-semibold text-slate-800">{m.before}</span>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`rounded-2xl border p-6 transition-colors duration-300 ${
          mode === "smart-contract"
            ? "border-blue-200 bg-gradient-to-br from-blue-50 to-violet-50"
            : "border-slate-200 bg-white"
        }`}
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Smart contract automation</p>
        <ul className="mt-5 space-y-4">
          {METRICS.map((m) => (
            <li key={m.label} className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600">
                <m.icon className="h-4 w-4 text-white" />
              </span>
              <span className="flex-1 text-sm text-slate-600">{m.label}</span>
              <span className="text-sm font-semibold text-blue-700">{m.after}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
