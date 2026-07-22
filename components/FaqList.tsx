"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Is this the same as Bitcoin or crypto trading?",
    answer:
      "No. This isn't about speculation, investing, or trading a cryptocurrency for profit. It uses the same underlying network as a settlement rail, the way a company might use SWIFT or ACH, not as an investment.",
  },
  {
    question: "Does our balance sheet need to hold cryptocurrency?",
    answer:
      "Not necessarily. Increasingly, enterprises settle in a stablecoin, a token pegged to a currency like the US dollar, specifically to avoid price volatility. Treasury teams can also fund a contract and convert immediately after.",
  },
  {
    question: "What if the value of what we're holding changes while funds are in escrow?",
    answer:
      "That's a real consideration for anything held in ETH itself, which is exactly why stablecoins are common for this use case. Confirm with treasury which asset the contract is actually denominated in before go-live.",
  },
  {
    question: "Is this legal? Is it regulated?",
    answer:
      "Using a blockchain for settlement doesn't exempt anyone from existing law. Contracts, payment obligations, and data-privacy rules still apply. Legal sign-off, covered in Getting Started, is what confirms this for your specific relationship and jurisdiction.",
  },
  {
    question: "What if there's a mistake? Can it be undone?",
    answer:
      "Not automatically. Once a transaction is confirmed, it's final. That finality is exactly why the audit and testing steps in Security Guides happen before real value moves, not after.",
  },
  {
    question: "What happens if Ethereum itself goes down?",
    answer:
      "Ethereum has run continuously since 2015; it has never suffered a network-wide outage where the chain itself stopped. In practice, the more common failure point is the applications and infrastructure a business builds on top of it, which is why infrastructure hardening is covered separately in Security Guides.",
  },
  {
    question: "Isn't this bad for the environment?",
    answer:
      "Ethereum moved to a far less energy-intensive way of confirming transactions in 2022, a change usually called the switch to proof of stake. It no longer relies on the energy-heavy mining process associated with Bitcoin.",
  },
  {
    question: "What does this actually cost?",
    answer:
      "Three things, generally: a network processing fee (gas) that ranges from a fraction of a cent on a Layer 2 to several dollars on the main network during busy periods, a one-time audit cost, and any platform or development cost. All three are typically far smaller than the labor cost of routing 12 manual approvals for every invoice.",
  },
  {
    question: "Do we need our own blockchain, or can we use the public one?",
    answer:
      "Most of this demo assumes the public Ethereum network. The network decision covered in Getting Started is where you'd weigh whether a permissioned or private option makes more sense instead.",
  },
  {
    question: "What happens if our counterparty doesn't want to do this?",
    answer:
      "Nothing forces adoption. This only works when both sides agree to it, which is why Getting Started treats it as a joint decision, not something rolled out unilaterally.",
  },
];

export function FaqList() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {FAQS.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.question} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left"
            >
              <span className="text-sm font-semibold text-slate-900">{item.question}</span>
              <motion.span
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0 text-slate-400"
              >
                <ChevronDown className="h-4 w-4" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-sm text-slate-600">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
