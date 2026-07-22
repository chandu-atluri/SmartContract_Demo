"use client";

import { Building2, Factory, Landmark, Network as NetworkIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CompanyNode, type NodeAccent } from "./CompanyNode";
import { InvoiceCard } from "./InvoiceCard";
import type { Actor, FlowStep } from "@/lib/types";

const POSITIONS: Record<Actor, { x: number; y: number }> = {
  supplier: { x: 17, y: 55 },
  network: { x: 50, y: 24 },
  buyer: { x: 83, y: 55 },
  bank: { x: 50, y: 88 },
};

const ALL_EDGES: [Actor, Actor][] = [
  ["supplier", "network"],
  ["network", "buyer"],
  ["network", "bank"],
  ["bank", "supplier"],
  ["supplier", "buyer"],
  ["buyer", "bank"],
];

const NODES: { actor: Actor; label: string; sublabel: string; icon: LucideIcon; accent: NodeAccent }[] = [
  { actor: "supplier", label: "Supplier", sublabel: "Ships goods", icon: Factory, accent: "blue" },
  { actor: "network", label: "Ethereum Network", sublabel: "Smart contract", icon: NetworkIcon, accent: "purple" },
  { actor: "buyer", label: "Buyer", sublabel: "Receives goods", icon: Building2, accent: "blue" },
  { actor: "bank", label: "Bank", sublabel: "Settles funds", icon: Landmark, accent: "slate" },
];

function isEdgeActive(edge: [Actor, Actor], activeEdges: [Actor, Actor][]) {
  return activeEdges.some(([a, b]) => (a === edge[0] && b === edge[1]) || (a === edge[1] && b === edge[0]));
}

interface TransactionFlowProps {
  step: FlowStep;
}

export function TransactionFlow({ step }: TransactionFlowProps) {
  return (
    <div className="relative h-[380px] w-full rounded-2xl border border-slate-200 bg-[radial-gradient(circle_at_50%_0%,_#f8fafc_0%,_#ffffff_60%)]">
      <svg className="absolute inset-0 h-full w-full">
        {ALL_EDGES.map(([a, b]) => {
          const p1 = POSITIONS[a];
          const p2 = POSITIONS[b];
          const active = isEdgeActive([a, b], step.activeEdges);
          return (
            <line
              key={`${a}-${b}`}
              x1={`${p1.x}%`}
              y1={`${p1.y}%`}
              x2={`${p2.x}%`}
              y2={`${p2.y}%`}
              stroke={active ? "#7c3aed" : "#e2e8f0"}
              strokeWidth={active ? 2 : 1.5}
              strokeDasharray={active ? "0" : "4 4"}
              style={{ transition: "stroke 0.4s ease, stroke-width 0.4s ease" }}
            />
          );
        })}
      </svg>

      {NODES.map((n) => (
        <CompanyNode
          key={n.actor}
          label={n.label}
          sublabel={n.sublabel}
          icon={n.icon}
          x={POSITIONS[n.actor].x}
          y={POSITIONS[n.actor].y}
          active={step.activeActors.includes(n.actor)}
          accent={n.accent}
        />
      ))}

      <InvoiceCard
        x={step.invoiceActor ? POSITIONS[step.invoiceActor].x : POSITIONS.network.x}
        y={step.invoiceActor ? POSITIONS[step.invoiceActor].y : POSITIONS.network.y}
        amount="$128,500.00"
        invoiceNumber="INV-2026-0114"
        stageLabel={step.invoiceLabel}
        visible={step.invoiceActor !== null}
      />
    </div>
  );
}
