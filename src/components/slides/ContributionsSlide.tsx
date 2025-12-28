"use client";

import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "../animations/StatSlide";
import CounterAnimation from "../animations/CounterAnimation";
import { ContributionsCollection } from "@/types/github";

interface ContributionsSlideProps {
  contributions: ContributionsCollection;
  longestStreak: number;
  currentStreak: number;
}

export default function ContributionsSlide({
  contributions,
  longestStreak,
  currentStreak,
}: ContributionsSlideProps) {
  const total = contributions.contributionCalendar.totalContributions;
  
  // Fun comparisons
  const getFunComparison = (count: number) => {
    if (count > 1000) return "That's more commits than coffee breaks! ☕";
    if (count > 500) return "You've been on fire this year! 🔥";
    if (count > 200) return "Consistency is your superpower! 💪";
    return "Every contribution counts! 🌟";
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

        <StaggerItem className="text-center">
          <h2 className="text-2xl text-white/70 mb-2">You made</h2>
          <div className="text-6xl md:text-8xl font-black text-white">
            <CounterAnimation value={total} duration={2.5} />
          </div>
          <p className="text-2xl text-white/70 mt-2">contributions this year</p>
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

        <StaggerItem className="mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatBox
              icon="🔄"
              value={contributions.totalCommitContributions}
              label="Commits"
              delay={0.2}
            />
            <StatBox
              icon="🔀"
              value={contributions.totalPullRequestContributions}
              label="Pull Requests"
              delay={0.4}
            />
            <StatBox
              icon="🐛"
              value={contributions.totalIssueContributions}
              label="Issues"
              delay={0.6}
            />
            <StatBox
              icon="📁"
              value={contributions.totalRepositoryContributions}
              label="New Repos"
              delay={0.8}
            />
          </div>
        </StaggerItem>

        <StaggerItem className="mt-12">
          <div className="flex gap-8">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="text-4xl font-bold text-orange-400"
              >
                🔥 <CounterAnimation value={longestStreak} duration={1.5} />
              </motion.div>
              <p className="text-white/60 mt-1">Longest Streak</p>
            </div>
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
                className="text-4xl font-bold text-yellow-400"
              >
                ⚡ <CounterAnimation value={currentStreak} duration={1.5} />
              </motion.div>
              <p className="text-white/60 mt-1">Current Streak</p>
            </div>
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
