"use client";

import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "../animations/StaggerAnimations";
import CounterAnimation from "../animations/CounterAnimation";
import { LeetCodeStats } from "@/types/stats";

interface LeetCodeSlideProps {
  stats: LeetCodeStats;
}

export default function LeetCodeSlide({ stats }: LeetCodeSlideProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-900 via-orange-900 to-yellow-900 p-8">
      <StaggerContainer>
        <StaggerItem>
          <motion.div
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-8xl mb-4"
          >
            🧩
          </motion.div>
        </StaggerItem>

        <StaggerItem className="text-center">
          <h2 className="text-2xl text-white/70 mb-2">You solved</h2>
          <div className="text-6xl md:text-8xl font-black text-white">
            <CounterAnimation value={stats.totalSolved} duration={2} />
          </div>
          <p className="text-2xl text-white/70 mt-2">LeetCode problems</p>
        </StaggerItem>

        <StaggerItem className="mt-8">
          <motion.p
            className="text-xl text-amber-300 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            {stats.totalSolved >= 100
              ? "You're a problem-solving machine! 🤖"
              : stats.totalSolved >= 50
              ? "Great progress! Keep grinding! 💪"
              : "Every problem solved is a step forward! 🚀"}
          </motion.p>
        </StaggerItem>

        <StaggerItem className="mt-12">
          <div className="grid grid-cols-3 gap-6">
            <DifficultyCard
              difficulty="Easy"
              count={stats.easySolved}
              color="bg-green-500"
              delay={0.2}
            />
            <DifficultyCard
              difficulty="Medium"
              count={stats.mediumSolved}
              color="bg-yellow-500"
              delay={0.4}
            />
            <DifficultyCard
              difficulty="Hard"
              count={stats.hardSolved}
              color="bg-red-500"
              delay={0.6}
            />
          </div>
        </StaggerItem>

        <StaggerItem className="mt-8">
          <div className="flex gap-2">
            {/* Visual difficulty bar */}
            {stats.easySolved > 0 && (
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${(stats.easySolved / stats.totalSolved) * 200}px`,
                }}
                transition={{ delay: 1, duration: 1 }}
                className="h-4 bg-green-500 rounded-l-full"
              />
            )}
            {stats.mediumSolved > 0 && (
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${(stats.mediumSolved / stats.totalSolved) * 200}px`,
                }}
                transition={{ delay: 1.2, duration: 1 }}
                className="h-4 bg-yellow-500"
              />
            )}
            {stats.hardSolved > 0 && (
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${(stats.hardSolved / stats.totalSolved) * 200}px`,
                }}
                transition={{ delay: 1.4, duration: 1 }}
                className="h-4 bg-red-500 rounded-r-full"
              />
            )}
          </div>
        </StaggerItem>
      </StaggerContainer>
    </div>
  );
}

function DifficultyCard({
  difficulty,
  count,
  color,
  delay,
}: {
  difficulty: string;
  count: number;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
    >
      <div className={`w-4 h-4 ${color} rounded-full mx-auto mb-2`} />
      <div className="text-3xl font-bold text-white">
        <CounterAnimation value={count} duration={1.5} />
      </div>
      <div className="text-sm text-white/60">{difficulty}</div>
    </motion.div>
  );
}
