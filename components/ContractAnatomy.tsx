"use client";

import { motion } from "framer-motion";
import {
  BookMarked,
  Building2,
  Database,
  FileSignature,
  Lock,
  Megaphone,
  PenLine,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ShapePart {
  icon: LucideIcon;
  title: string;
  description: string;
}

const SHAPE: ShapePart[] = [
  {
    icon: Database,
    title: "Facts it remembers",
    description: "Who's involved, how much money, and what stage things are at right now.",
  },
  {
    icon: Zap,
    title: "Actions it allows",
    description: "The specific things that can happen: confirm delivery, verify, approve, pay.",
  },
  {
    icon: Lock,
    title: "Rules that gate each action",
    description: "Who's allowed to do what, and in what order. This is the access control.",
  },
  {
    icon: Megaphone,
    title: "Announcements it makes",
    description: "A permanent, timestamped record of everything that happened: the audit trail.",
  },
];

interface CodeBlock {
  icon: LucideIcon;
  label: string;
  code: string;
  explanation: string;
}

const BLOCKS: CodeBlock[] = [
  {
    icon: FileSignature,
    label: "License & version",
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;`,
    explanation:
      "Which version of the Solidity language the code follows, and confirmation it's open-source (MIT license). Think of it like specifying which version of a template a document was built with.",
  },
  {
    icon: Database,
    label: "State variables: the facts it remembers",
    code: `address public immutable buyer;
address public immutable supplier;
uint256 public immutable amount;
Status public status;
bool public deliveryConfirmed;
bool public qualityApproved;`,
    explanation:
      "The facts the contract remembers permanently: who the buyer and supplier are, how much money is involved, and what stage things are at. Once written, nobody can quietly edit these.",
  },
  {
    icon: Megaphone,
    label: "Events: the announcements it makes",
    code: `event DeliveryConfirmed(uint256 timestamp);
event ConditionsVerified(uint256 timestamp);
event SettlementApproved(uint256 timestamp);
event PaymentExecuted(address to, uint256 amount, uint256 timestamp);`,
    explanation:
      "Every time something happens, the contract announces it. This is exactly what generates the instant audit trail both parties see, with no separate reconciliation needed afterward.",
  },
  {
    icon: Lock,
    label: "Modifiers: the guard rails",
    code: `modifier onlySupplier() {
    require(msg.sender == supplier, "not the supplier");
    _;
}
modifier atStatus(Status expected) {
    require(status == expected, "wrong stage");
    _;
}`,
    explanation:
      "Reusable rules checked before an action is allowed to run: “only the supplier can call this” or “this can only happen at this stage.” This is what access control actually looks like in code.",
  },
  {
    icon: PenLine,
    label: "Constructor: the one-time setup",
    code: `constructor(address _supplier, string memory _invoiceReference) payable {
    buyer = msg.sender;
    supplier = _supplier;
    amount = msg.value;
    status = Status.Created;
}`,
    explanation:
      "Runs exactly once, when the contract is created: filling in the two parties' names, the amount, and the starting stage. After this, it never runs again.",
  },
  {
    icon: Zap,
    label: "Functions: the actions",
    code: `function confirmDelivery() external onlySupplier atStatus(Status.Created) {
    deliveryConfirmed = true;
    emit DeliveryConfirmed(block.timestamp);
}

function executePayment() external atStatus(Status.Approved) {
    status = Status.Executed;
    supplier.call{value: amount}("");
    emit PaymentExecuted(supplier, amount, block.timestamp);
}`,
    explanation:
      "The same four actions from the walkthrough: confirm delivery, verify, approve, execute payment. Each one is gated by the modifiers above, and each one ends by announcing the event that updates the audit trail.",
  },
];

interface SourcePath {
  icon: LucideIcon;
  title: string;
  description: string;
}

const SOURCE_PATHS: SourcePath[] = [
  {
    icon: PenLine,
    title: "Write custom code",
    description:
      "A developer, yours or a vendor's, writes it from scratch in Solidity. Full control over the business logic, but it carries the most security review burden, since nothing has been tested by anyone else first.",
  },
  {
    icon: BookMarked,
    title: "Start from an audited template",
    description:
      "Most enterprise patterns, like escrow, multi-signature approval, or token payments, have well-tested, publicly audited starting points (OpenZeppelin is the most common) that get customized rather than written from a blank file. Faster, and generally safer, than starting from zero.",
  },
  {
    icon: Building2,
    title: "Use an enterprise platform",
    description:
      "Some vendors, like trade finance networks or supply-chain platforms, provide pre-built, configurable contract templates as part of a broader product. You configure business terms through a form rather than touching code directly. Fastest to deploy, but still worth vetting the vendor's own audit history.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function ContractAnatomy() {
  return (
    <div className="space-y-8">
      {/* The shape */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-slate-900">The four-part shape of any smart contract</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          Before the code, the mental model. Every contract in this demo, and most enterprise ones, breaks down
          into these four parts.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {SHAPE.map((part, i) => (
            <motion.div
              key={part.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="rounded-xl border border-slate-200 p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600">
                <part.icon className="h-5 w-5 text-white" strokeWidth={1.75} />
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-900">{part.title}</p>
              <p className="mt-1 text-sm text-slate-500">{part.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Annotated code */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeUp}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-slate-900">What that looks like in code</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          You don&apos;t need to read code to use this system, but &ldquo;the code&rdquo; shouldn&apos;t be a black
          box either. This is the actual contract behind the demo on this site, in Solidity, the programming
          language most Ethereum contracts are written in, simplified slightly for readability.
        </p>

        <div className="mt-6 space-y-6">
          {BLOCKS.map((block, i) => (
            <motion.div
              key={block.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                  {i + 1}
                </span>
                <block.icon className="h-4 w-4 text-blue-600" strokeWidth={1.75} />
                <p className="text-sm font-semibold text-slate-900">{block.label}</p>
              </div>

              <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-4 text-[13px] leading-relaxed text-slate-100">
                <code className="font-mono">{block.code}</code>
              </pre>

              <p className="mt-3 rounded-xl bg-blue-50/60 p-4 text-sm text-slate-700">{block.explanation}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* How you get one */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold text-slate-900">How do you actually get one?</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">Three real paths, in order of how much you build versus buy.</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {SOURCE_PATHS.map((path, i) => (
            <motion.div
              key={path.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="rounded-xl border border-slate-200 p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900">
                <path.icon className="h-5 w-5 text-white" strokeWidth={1.75} />
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-900">{path.title}</p>
              <p className="mt-1.5 text-sm text-slate-500">{path.description}</p>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          For something like the invoice contract in this demo, most enterprises start from an audited escrow
          template and add the delivery-confirmation logic on top, then get that customization audited before it
          goes anywhere near real funds. See the security guides for what that audit actually checks.
        </p>
      </motion.section>
    </div>
  );
}
