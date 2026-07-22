"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";

interface InvoiceCardProps {
  x: number;
  y: number;
  amount: string;
  invoiceNumber: string;
  stageLabel: string;
  visible: boolean;
}

export function InvoiceCard({ x, y, amount, invoiceNumber, stageLabel, visible }: InvoiceCardProps) {
  return (
    // Position (left/top/opacity) and the constant centering offset live on this
    // outer element. Scale lives on the inner element. Framer Motion fully owns
    // `transform` on any node where it animates a transform value like `scale`,
    // so mixing a static translate() with an animated scale on the same node
    // would silently drop the static offset.
    <motion.div
      className="absolute z-20 w-36"
      style={{ transform: "translate(-50%, -168%)" }}
      initial={false}
      animate={{
        left: `${x}%`,
        top: `${y}%`,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 110, damping: 20 }}
    >
      <motion.div
        initial={false}
        animate={{ scale: visible ? 1 : 0.9 }}
        transition={{ duration: 0.25 }}
        className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg shadow-slate-900/[0.07]"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600">
            <FileText className="h-4 w-4 text-white" strokeWidth={2} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-slate-800">{invoiceNumber}</p>
            <p className="text-[11px] text-slate-400">{amount}</p>
          </div>
        </div>
        <div className="mt-2 rounded-md bg-slate-50 px-2 py-1 text-center text-[10px] font-medium uppercase tracking-wide text-slate-500">
          {stageLabel}
        </div>
      </motion.div>
    </motion.div>
  );
}
