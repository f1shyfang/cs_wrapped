"use client";

import { motion } from "framer-motion";
import { Code2, Trophy, Zap, Brain, Target } from "lucide-react";
import CounterAnimation from "../animations/CounterAnimation";
import { LeetCodeStats } from "@/types/stats";

interface LeetCodeSlideProps {
  stats: LeetCodeStats;
}

export default function LeetCodeSlide({ stats }: LeetCodeSlideProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-neon-orange/20 via-background to-neon-yellow/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Floating code icons */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${5 + i * 12}%`,
            top: `${10 + (i % 4) * 22}%`,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 2.5 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        >
          {i % 2 === 0 ? (
            <Code2 className="h-5 w-5 text-neon-orange/30" />
          ) : (
            <Brain className="h-5 w-5 text-neon-yellow/30" />
          )}
        </motion.div>
      ))}

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 text-lg uppercase tracking-widest text-muted-foreground"
      >
        LeetCode mastery
      </motion.p>

      {/* Main stat */}
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
          <Trophy className="h-12 w-12 text-neon-orange" />
          <span className="text-7xl md:text-9xl font-black gradient-text-orange-yellow">
            <CounterAnimation value={stats.totalSolved} duration={2} />
          </span>
        </motion.div>
        <span className="text-xl text-muted-foreground">problems solved</span>
      </motion.div>

      {/* Difficulty breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="relative z-10 flex gap-4"
      >
        <div className="text-center px-5 py-3 rounded-xl bg-foreground/5 border border-foreground/10">
          <motion.div
            className="flex items-center justify-center gap-1"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap className="h-4 w-4 text-neon-green" />
            <span className="text-2xl font-bold text-neon-green">
              <CounterAnimation value={stats.easySolved} duration={2} />
            </span>
          </motion.div>
          <span className="text-xs text-muted-foreground">Easy</span>
        </div>

        <div className="text-center px-5 py-3 rounded-xl bg-foreground/5 border border-foreground/10">
          <motion.div
            className="flex items-center justify-center gap-1"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          >
            <Target className="h-4 w-4 text-neon-yellow" />
            <span className="text-2xl font-bold text-neon-yellow">
              <CounterAnimation value={stats.mediumSolved} duration={2} />
            </span>
          </motion.div>
          <span className="text-xs text-muted-foreground">Medium</span>
        </div>

        <div className="text-center px-5 py-3 rounded-xl bg-foreground/5 border border-foreground/10">
          <motion.div
            className="flex items-center justify-center gap-1"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          >
            <Brain className="h-4 w-4 text-neon-pink" />
            <span className="text-2xl font-bold text-neon-pink">
              <CounterAnimation value={stats.hardSolved} duration={2} />
            </span>
          </motion.div>
          <span className="text-xs text-muted-foreground">Hard</span>
        </div>
      </motion.div>

      {/* Ranking */}
      {stats.ranking && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="relative z-10 mt-8 rounded-2xl gradient-bg-orange-yellow p-4 px-8"
        >
          <p className="text-lg font-bold text-foreground">
            🏆 Ranked #{stats.ranking.toLocaleString()}
          </p>
        </motion.div>
      )}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="relative z-10 mt-6 text-center text-muted-foreground"
      >
        {stats.totalSolved >= 500
          ? "Algorithm wizard! 🧙‍♂️"
          : stats.totalSolved >= 200
          ? "Problem-solving pro! ��"
          : stats.totalSolved >= 50
          ? "Building that DSA muscle! 🏋️"
          : "Every problem counts! 🌟"}
      </motion.p>
    </div>
  );
}
