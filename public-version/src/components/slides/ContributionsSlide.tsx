"use client";

import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "../animations/StaggerAnimations";
import CounterAnimation from "../animations/CounterAnimation";
import { CustomStats } from "@/types/stats";

interface ContributionsSlideProps {
  stats: CustomStats;
  totalRepos: number;
}

export default function ContributionsSlide({
  stats,
  totalRepos,
}: ContributionsSlideProps) {
  const total = stats.totalCommits || 0;

  const getFunComparison = (count: number) => {
    if (count > 1000) return "That's more commits than coffee breaks! ☕";
    if (count > 500) return "You've been on fire this year! 🔥";
    if (count > 200) return "Consistency is your superpower! 💪";
    if (count > 0) return "Every contribution counts! 🌟";
    return "Ready to start your journey! 🚀";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 p-8">
      <StaggerContainer>
        <StaggerItem>
          <motion.div
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-8xl mb-4"
          >
            📊
          </motion.div>
        </StaggerItem>

        {total > 0 ? (
          <>
            <StaggerItem className="text-center">
              <h2 className="text-2xl text-white/70 mb-2">You made</h2>
              <div className="text-6xl md:text-8xl font-black text-white">
                <CounterAnimation value={total} duration={2.5} />
              </div>
              <p className="text-2xl text-white/70 mt-2">commits this year</p>
            </StaggerItem>

            <StaggerItem className="mt-8">
              <motion.p
                className="text-xl text-emerald-300 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                {getFunComparison(total)}
              </motion.p>
            </StaggerItem>
          </>
        ) : (
          <StaggerItem className="text-center">
            <h2 className="text-2xl text-white/70 mb-4">Your Public Repos</h2>
            <div className="text-6xl md:text-8xl font-black text-white">
              <CounterAnimation value={totalRepos} duration={2} />
            </div>
            <p className="text-xl text-white/70 mt-2">repositories created</p>
          </StaggerItem>
        )}

        <StaggerItem className="mt-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {stats.totalPRs > 0 && (
              <StatBox
                icon="🔀"
                value={stats.totalPRs}
                label="Pull Requests"
                delay={0.2}
              />
            )}
            {stats.longestStreak > 0 && (
              <StatBox
                icon="🔥"
                value={stats.longestStreak}
                label="Day Streak"
                delay={0.4}
              />
            )}
            <StatBox
              icon="📁"
              value={totalRepos}
              label="Public Repos"
              delay={0.6}
            />
          </div>
        </StaggerItem>
      </StaggerContainer>
    </div>
  );
}

function StatBox({
  icon,
  value,
  label,
  delay,
}: {
  icon: string;
  value: number;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
    >
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-2xl font-bold text-white">
        <CounterAnimation value={value} duration={1.5} />
      </div>
      <div className="text-sm text-white/60">{label}</div>
    </motion.div>
  );
}
