import type { FlowStep } from "./types";

const CONDITION_LABELS = [
  "Goods delivered",
  "Invoice matches purchase order",
  "Approval conditions satisfied",
  "Funds settled",
] as const;

function conditions(flags: [boolean, boolean, boolean, boolean]) {
  return CONDITION_LABELS.map((label, i) => ({ label, met: flags[i] }));
}

export const TRADITIONAL_STEPS: FlowStep[] = [
  {
    id: "ship",
    title: "Supplier ships goods",
    description:
      "Goods leave the warehouse, but delivery confirmation isn't linked to any downstream system.",
    activeActors: ["supplier", "buyer"],
    activeEdges: [["supplier", "buyer"]],
    invoiceActor: "supplier",
    invoiceLabel: "Shipped",
    contractStatus: null,
    conditions: conditions([true, false, false, false]),
    logEntry: "Day 0: Goods shipped from supplier warehouse",
    durationMs: 2600,
  },
  {
    id: "invoice-sent",
    title: "Buyer receives invoice",
    description:
      "A paper or PDF invoice arrives separately and enters a manual accounts-payable queue.",
    activeActors: ["supplier", "buyer"],
    activeEdges: [["supplier", "buyer"]],
    invoiceActor: "buyer",
    invoiceLabel: "Invoice sent",
    contractStatus: null,
    conditions: conditions([true, false, false, false]),
    logEntry: "Day 2: Invoice submitted to accounts payable",
    durationMs: 2600,
  },
  {
    id: "approvals",
    title: "Multiple approvals required",
    description:
      "The invoice is routed through procurement, finance, and management, roughly 12 sign-offs in total.",
    activeActors: ["buyer"],
    activeEdges: [],
    invoiceActor: "buyer",
    invoiceLabel: "In approval",
    contractStatus: null,
    conditions: conditions([true, false, false, false]),
    logEntry: "Day 9: Routed through 12 manual approval steps",
    durationMs: 3000,
  },
  {
    id: "payment-delay",
    title: "Payment is delayed",
    description:
      "Funds aren't released until every approval clears, stretching settlement to roughly 30 days.",
    activeActors: ["buyer", "bank"],
    activeEdges: [["buyer", "bank"]],
    invoiceActor: "bank",
    invoiceLabel: "Payment pending",
    contractStatus: null,
    conditions: conditions([true, false, true, false]),
    logEntry: "Day 28: Payment batch released to bank",
    durationMs: 3000,
  },
  {
    id: "reconciliation",
    title: "Manual reconciliation",
    description:
      "Both companies manually cross-check invoice, purchase order, and payment records after the fact.",
    activeActors: ["bank", "supplier", "buyer"],
    activeEdges: [["bank", "supplier"]],
    invoiceActor: "supplier",
    invoiceLabel: "Reconciled",
    contractStatus: null,
    conditions: conditions([true, true, true, true]),
    logEntry: "Day 30: Records reconciled manually across systems",
    durationMs: 2600,
  },
];

export const SMART_CONTRACT_STEPS: FlowStep[] = [
  {
    id: "connect",
    title: "Supplier and buyer connect",
    description:
      "Both organizations link to one shared smart contract that encodes the agreed terms in advance.",
    activeActors: ["supplier", "buyer", "network"],
    activeEdges: [
      ["supplier", "network"],
      ["network", "buyer"],
    ],
    invoiceActor: null,
    invoiceLabel: "Linked",
    contractStatus: null,
    conditions: conditions([false, false, false, false]),
    logEntry: "00:00: Contract linked by supplier and buyer",
    durationMs: 2200,
  },
  {
    id: "delivery-confirmed",
    title: "Delivery confirmation triggers the contract",
    description:
      "Proof of delivery is submitted once and recorded automatically, with no separate invoice process needed.",
    activeActors: ["supplier", "network"],
    activeEdges: [["supplier", "network"]],
    invoiceActor: "network",
    invoiceLabel: "Created",
    contractStatus: "created",
    conditions: conditions([true, false, false, false]),
    logEntry: "00:02: Delivery confirmation recorded on-chain",
    durationMs: 2200,
  },
  {
    id: "validate",
    title: "Smart contract validates conditions",
    description:
      "The contract checks delivery, quality, and purchase-order terms against the agreed rules instantly.",
    activeActors: ["network"],
    activeEdges: [],
    invoiceActor: "network",
    invoiceLabel: "Verified",
    contractStatus: "verified",
    conditions: conditions([true, true, false, false]),
    logEntry: "00:04: Contract terms verified automatically",
    durationMs: 2400,
  },
  {
    id: "approve",
    title: "Conditions satisfied, approved automatically",
    description:
      "No manual sign-off queue. The contract itself authorizes settlement the moment terms are met.",
    activeActors: ["network", "buyer"],
    activeEdges: [["network", "buyer"]],
    invoiceActor: "network",
    invoiceLabel: "Approved",
    contractStatus: "approved",
    conditions: conditions([true, true, true, false]),
    logEntry: "00:05: Conditions satisfied, settlement approved",
    durationMs: 2200,
  },
  {
    id: "execute",
    title: "Payment released automatically",
    description:
      "Funds move from buyer to supplier the instant conditions are verified, with no waiting on approval cycles.",
    activeActors: ["network", "bank", "supplier"],
    activeEdges: [
      ["network", "bank"],
      ["bank", "supplier"],
    ],
    invoiceActor: "bank",
    invoiceLabel: "Executed",
    contractStatus: "executed",
    conditions: conditions([true, true, true, true]),
    logEntry: "00:06: Payment executed and settled",
    durationMs: 2600,
  },
  {
    id: "audit",
    title: "Both parties see a trusted audit trail",
    description:
      "Every step is time-stamped and instantly visible to both organizations, with nothing left to reconcile.",
    activeActors: ["supplier", "buyer", "network"],
    activeEdges: [
      ["supplier", "network"],
      ["network", "buyer"],
    ],
    invoiceActor: "supplier",
    invoiceLabel: "Settled",
    contractStatus: "executed",
    conditions: conditions([true, true, true, true]),
    logEntry: "00:07: Audit trail synced for both parties",
    durationMs: 2600,
  },
];
