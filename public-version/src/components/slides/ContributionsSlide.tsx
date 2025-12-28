"use client";

import { motion } from "framer-motion";
import { GitCommit, GitPullRequest, Flame, FolderGit2 } from "lucide-react";
import CounterAnimation from "../animations/CounterAnimation";
import { CustomStats } from "@/types/stats";

interface ContributionsSlideProps {
  stats: CustomStats;
  totalRepos: number;
}

export default function ContributionsSlide({ stats, totalRepos }: ContributionsSlideProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-neon-green/20 via-background to-neon-cyan/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Floating git icons */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${10 + i * 15}%`,
            top: `${15 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 3 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        >
          <GitCommit className="h-5 w-5 text-neon-green/30" />
        </motion.div>
      ))}

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 text-lg uppercase tracking-widest text-muted-foreground"
      >
        Your coding activity
      </motion.p>

      {/* Main commits stat */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
        className="relative z-10 my-8 text-center"
      >
        <motion.div
          className="flex items-center justify-center gap-3"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <GitCommit className="h-12 w-12 text-neon-green" />
          <span className="text-7xl md:text-9xl font-black gradient-text-green-cyan">
            <CounterAnimation value={stats.totalCommits} duration={2} />
          </span>
        </motion.div>
        <span className="text-xl text-muted-foreground">commits this year</span>
      </motion.div>

      {/* Stats grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="relative z-10 flex flex-wrap justify-center gap-4 max-w-lg"
      >
        {stats.totalPRs > 0 && (
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-foreground/5 border border-foreground/10">
            <GitPullRequest className="h-5 w-5 text-neon-purple" />
            <div>
              <span className="text-xl font-bold text-neon-purple">
                <CounterAnimation value={stats.totalPRs} duration={2} />
              </span>
              <span className="text-sm text-muted-foreground ml-2">PRs</span>
            </div>
          </div>
        )}

        {stats.longestStreak > 0 && (
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-foreground/5 border border-foreground/10">
            <Flame className="h-5 w-5 text-neon-orange" />
            <div>
              <span className="text-xl font-bold text-neon-orange">
                <CounterAnimation value={stats.longestStreak} duration={2} />
              </span>
              <span className="text-sm text-muted-foreground ml-2">day streak</span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-foreground/5 border border-foreground/10">
          <FolderGit2 className="h-5 w-5 text-neon-blue" />
          <div>
            <span className="text-xl font-bold text-neon-blue">
              <CounterAnimation value={totalRepos} duration={2} />
            </span>
            <span className="text-sm text-muted-foreground ml-2">repos</span>
          </div>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative z-10 mt-8 text-center text-muted-foreground"
      >
        {stats.totalCommits >= 1000
          ? "You're a commit machine! 🔥"
          : stats.totalCommits >= 500
          ? "Impressive dedication! 💪"
          : stats.totalCommits >= 100
          ? "Building momentum! 🚀"
          : "Every commit counts! ✨"}
      </motion.p>
    </div>
  );
}
