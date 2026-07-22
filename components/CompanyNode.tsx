"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export type NodeAccent = "blue" | "purple" | "slate";

interface CompanyNodeProps {
  label: string;
  sublabel?: string;
  icon: LucideIcon;
  x: number;
  y: number;
  active?: boolean;
  accent?: NodeAccent;
}

const ACCENT_STYLES: Record<NodeAccent, { bg: string; icon: string; glow: string; ring: string }> = {
  blue: {
    bg: "bg-blue-50",
    icon: "text-blue-600",
    glow: "0 0 0 8px rgba(37, 99, 235, 0.10)",
    ring: "ring-blue-500/40",
  },
  purple: {
    bg: "bg-violet-50",
    icon: "text-violet-600",
    glow: "0 0 0 8px rgba(124, 58, 237, 0.12)",
    ring: "ring-violet-500/40",
  },
  slate: {
    bg: "bg-slate-100",
    icon: "text-slate-500",
    glow: "0 0 0 8px rgba(100, 116, 139, 0.10)",
    ring: "ring-slate-400/40",
  },
};

export function CompanyNode({
  label,
  sublabel,
  icon: Icon,
  x,
  y,
  active = false,
  accent = "blue",
}: CompanyNodeProps) {
  const styles = ACCENT_STYLES[accent];

  return (
    <div
      className="absolute flex w-28 flex-col items-center gap-2"
      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
    >
      <motion.div
        animate={{
          boxShadow: active ? styles.glow : "0 0 0 0 rgba(0,0,0,0)",
          scale: active ? 1.08 : 1,
        }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={`flex h-16 w-16 items-center justify-center rounded-2xl border bg-white ring-1 ${
          active ? `border-transparent ${styles.ring} ${styles.bg}` : "border-slate-200 ring-transparent"
        }`}
      >
        <Icon className={`h-6 w-6 ${active ? styles.icon : "text-slate-400"}`} strokeWidth={1.75} />
      </motion.div>
      <div className="text-center">
        <p className={`text-sm font-semibold leading-tight ${active ? "text-slate-900" : "text-slate-500"}`}>
          {label}
        </p>
        {sublabel && <p className="text-xs leading-tight text-slate-400">{sublabel}</p>}
      </div>
    </div>
  );
}
