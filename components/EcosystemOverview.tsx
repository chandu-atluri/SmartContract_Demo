"use client";

import { Building2, FileCode2, Landmark, RadioTower, ShieldCheck, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Layer {
  icon: LucideIcon;
  title: string;
  description: string;
  highlighted?: boolean;
}

const LAYERS: Layer[] = [
  {
    icon: Building2,
    title: "Business systems",
    description: "Supplier and buyer ERP, procurement, and finance platforms: where the process starts and ends.",
  },
  {
    icon: Workflow,
    title: "Integration layer",
    description:
      "APIs and middleware that translate purchase orders, invoices, and delivery notes into a format the contract can act on.",
  },
  {
    icon: FileCode2,
    title: "Smart contract layer",
    description: "The automated rules engine walked through above: Created, Verified, Approved, Executed.",
    highlighted: true,
  },
  {
    icon: RadioTower,
    title: "Oracle / data layer",
    description: "Real-world signals (delivery scans, IoT sensors, carrier tracking APIs) that feed the contract.",
  },
  {
    icon: Landmark,
    title: "Settlement layer",
    description: "The banking rails or on-chain transfer that actually moves funds once the contract executes.",
  },
];

export function EcosystemOverview() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">The bigger picture</p>
      <h2 className="mt-1.5 text-2xl font-semibold text-slate-900">Smart contracts are one layer, not the system</h2>
      <p className="mt-2 max-w-2xl text-slate-500">
        Everything demoed above lives in a single layer of a larger stack. Automating settlement means all of these
        layers have to work together.
      </p>

      <div className="mt-8 space-y-3">
        {LAYERS.map((layer) => (
          <div
            key={layer.title}
            className={`flex items-center gap-4 rounded-xl border p-4 transition-colors ${
              layer.highlighted
                ? "border-blue-200 bg-gradient-to-r from-blue-50 to-violet-50"
                : "border-slate-200 bg-slate-50/60"
            }`}
          >
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                layer.highlighted ? "bg-gradient-to-br from-blue-600 to-violet-600" : "bg-white"
              }`}
            >
              <layer.icon className={`h-5 w-5 ${layer.highlighted ? "text-white" : "text-slate-400"}`} strokeWidth={1.75} />
            </div>
            <div>
              <p className={`text-sm font-semibold ${layer.highlighted ? "text-slate-900" : "text-slate-700"}`}>
                {layer.title}
              </p>
              <p className="text-sm text-slate-500">{layer.description}</p>
            </div>
          </div>
        ))}

        <div className="flex items-center gap-4 rounded-xl border border-dashed border-slate-300 p-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white">
            <ShieldCheck className="h-5 w-5 text-slate-500" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700">Security &amp; compliance</p>
            <p className="text-sm text-slate-500">
              Not a layer of its own. It runs underneath and across every layer above, from the ERP integration to
              the settlement rail. Covered in detail next.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
