"use client";

import { motion } from "framer-motion";
import { Star, GitFork, FolderGit2 } from "lucide-react";
import CounterAnimation from "../animations/CounterAnimation";
import { Repository } from "@/types/stats";

interface RepositoriesSlideProps {
  repositories: Repository[];
  totalStars: number;
  totalForks: number;
  totalRepos: number;
}

export default function RepositoriesSlide({
  repositories,
  totalStars,
  totalForks,
  totalRepos,
}: RepositoriesSlideProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 via-background to-neon-blue/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Floating stars */}
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
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        >
          <Star className="h-4 w-4 text-neon-yellow/30" />
        </motion.div>
      ))}

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 text-lg uppercase tracking-widest text-muted-foreground"
      >
        Your repositories
      </motion.p>

      {/* Main stats */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
        className="relative z-10 my-8 flex items-center gap-8"
      >
        <div className="text-center">
          <motion.div
            className="flex items-center justify-center gap-2"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Star className="h-8 w-8 text-neon-yellow" />
            <span className="text-5xl md:text-7xl font-black text-neon-yellow">
              <CounterAnimation value={totalStars} duration={2} />
            </span>
          </motion.div>
          <span className="text-sm text-muted-foreground mt-2 block">stars earned</span>
        </div>

        <div className="text-center">
          <motion.div
            className="flex items-center justify-center gap-2"
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <GitFork className="h-8 w-8 text-neon-cyan" />
            <span className="text-5xl md:text-7xl font-black text-neon-cyan">
              <CounterAnimation value={totalForks} duration={2} />
            </span>
          </motion.div>
          <span className="text-sm text-muted-foreground mt-2 block">forks</span>
        </div>
      </motion.div>

      {/* Top repos */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 w-full max-w-md space-y-3 mt-6"
      >
        {repositories.slice(0, 3).map((repo, i) => (
          <motion.div
            key={repo.name}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + i * 0.15 }}
            className="flex items-center justify-between bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <FolderGit2 className="h-5 w-5 text-neon-purple" />
              <span className="font-semibold text-foreground truncate max-w-[180px]">
                {repo.name}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-neon-yellow text-sm">
                <Star className="h-4 w-4" />
                {repo.stargazers_count}
              </span>
              <span className="flex items-center gap-1 text-neon-cyan text-sm">
                <GitFork className="h-4 w-4" />
                {repo.forks_count}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Total repos badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="relative z-10 mt-8 rounded-2xl gradient-bg-purple-blue p-4 px-8"
      >
        <p className="text-lg font-bold text-foreground flex items-center gap-2">
          <FolderGit2 className="h-5 w-5" />
          {totalRepos} repositories
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="relative z-10 mt-6 text-center text-muted-foreground"
      >
        {totalStars >= 100
          ? "You're a GitHub star! ⭐"
          : totalStars >= 20
          ? "Building open source presence! 🚀"
          : "Every star counts! 💫"}
      </motion.p>
    </div>
  );
}
