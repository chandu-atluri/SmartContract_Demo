export type Actor = "supplier" | "buyer" | "bank" | "network";

export type ProcessMode = "traditional" | "smart-contract";

export type ContractStatus = "created" | "verified" | "approved" | "executed";

export interface ConditionState {
  label: string;
  met: boolean;
}

export interface FlowStep {
  id: string;
  title: string;
  description: string;
  /** Nodes that should appear highlighted/active during this step. */
  activeActors: Actor[];
  /** Edges (node pairs) that should appear highlighted during this step. */
  activeEdges: [Actor, Actor][];
  /** Which node the invoice card is currently anchored to, or null to hide it. */
  invoiceActor: Actor | null;
  /** Short badge label shown on the invoice card for this step. */
  invoiceLabel: string;
  /** Smart-contract stepper stage. Null when not applicable (traditional flow). */
  contractStatus: ContractStatus | null;
  /** Conditions checklist shown in the contract/ledger panel. */
  conditions: ConditionState[];
  /** Single audit/activity log line contributed by this step. */
  logEntry: string;
  /** Autoplay dwell time for this step, in milliseconds. */
  durationMs: number;
}
