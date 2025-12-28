"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  percentage: number;
  color: string;
  label: string;
  delay?: number;
}

export default function ProgressBar({
  percentage,
  color,
  label,
  delay = 0,
}: ProgressBarProps) {
  return (
    <div className="w-full mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-white">{label}</span>
        <span className="text-sm font-medium text-white/70">{percentage}%</span>
      </div>
      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, delay, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}
