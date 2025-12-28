"use client";

import { motion } from "framer-motion";
import { ContributionDay } from "@/types/github";

interface ContributionGraphProps {
  weeks: { contributionDays: ContributionDay[] }[];
}

export default function ContributionGraph({ weeks }: ContributionGraphProps) {
  const getColor = (count: number) => {
    if (count === 0) return "bg-white/10";
    if (count < 5) return "bg-green-900";
    if (count < 10) return "bg-green-700";
    if (count < 15) return "bg-green-500";
    return "bg-green-400";
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-[3px]">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[3px]">
            {week.contributionDays.map((day, dayIndex) => (
              <motion.div
                key={day.date}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: weekIndex * 0.02 + dayIndex * 0.01,
                  duration: 0.3,
                }}
                className={`w-3 h-3 rounded-sm ${getColor(day.contributionCount)}`}
                title={`${day.date}: ${day.contributionCount} contributions`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
