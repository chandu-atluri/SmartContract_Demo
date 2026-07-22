"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { FlowStep } from "@/lib/types";

interface TimelineProps {
  steps: FlowStep[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

export function Timeline({ steps, currentIndex, onSelect }: TimelineProps) {
  return (
    <div className="w-full">
      <div className="relative flex items-start justify-between">
        <div className="absolute left-0 right-0 top-3 h-0.5 bg-slate-200" />
        <motion.div
          className="absolute left-0 top-3 h-0.5 bg-gradient-to-r from-blue-600 to-violet-600"
          initial={false}
          animate={{ width: `${(currentIndex / Math.max(steps.length - 1, 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        {steps.map((step, i) => {
          const done = i < currentIndex;
          const active = i === currentIndex;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onSelect(i)}
              className="relative z-10 flex w-full flex-col items-center gap-2 px-1 text-center"
            >
              <motion.span
                animate={{
                  backgroundColor: done || active ? "#2563eb" : "#ffffff",
                  borderColor: done || active ? "#2563eb" : "#cbd5e1",
                  scale: active ? 1.15 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="flex h-6 w-6 items-center justify-center rounded-full border-2"
              >
                {done ? (
                  <Check className="h-3 w-3 text-white" />
                ) : (
                  <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-white" : "bg-slate-300"}`} />
                )}
              </motion.span>
              <span
                className={`max-w-[112px] text-[11px] font-medium leading-tight ${
                  active ? "text-slate-900" : done ? "text-slate-500" : "text-slate-400"
                }`}
              >
                {step.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
