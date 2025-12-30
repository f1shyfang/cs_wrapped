"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Download,
  GitCommit,
  Code2,
  Trophy,
  Star,
  Rocket,
} from "lucide-react";
import { WrappedData } from "@/types/stats";

interface SummarySlideProps {
  data: WrappedData;
  onExport: () => void;
}

export default function SummarySlide({
  data,
  onExport,
}: SummarySlideProps) {
  const { github, leetcode, codeforces, custom, year } = data;

  // Generate a fun developer title
  const getTitle = () => {
    if (custom.totalCommits >= 2000) return "🔥 Code Machine";
    if (custom.totalCommits >= 1000) return "💪 Commit Champion";
    if (custom.totalCommits >= 500) return "⚡ Rising Star";
    if (leetcode && leetcode.totalSolved >= 500) return "🧠 Algorithm Master";
    if (codeforces && codeforces.rating >= 1900) return "🏆 Competitive Legend";
    return "✨ Growing Developer";
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-neon-pink/20 via-neon-purple/10 to-neon-cyan/20"
        animate={{
          background: [
            "linear-gradient(135deg, rgba(255,45,85,0.2) 0%, rgba(175,82,222,0.1) 50%, rgba(50,173,230,0.2) 100%)",
            "linear-gradient(135deg, rgba(175,82,222,0.2) 0%, rgba(50,173,230,0.1) 50%, rgba(255,45,85,0.2) 100%)",
            "linear-gradient(135deg, rgba(50,173,230,0.2) 0%, rgba(255,45,85,0.1) 50%, rgba(175,82,222,0.2) 100%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Floating celebration icons */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${5 + (i % 6) * 15}%`,
            top: `${10 + Math.floor(i / 6) * 40}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 15, -15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + i * 0.2,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        >
          {i % 4 === 0 ? (
            <Sparkles className="h-5 w-5 text-neon-yellow/40" />
          ) : i % 4 === 1 ? (
            <Star className="h-5 w-5 text-neon-pink/40" />
          ) : i % 4 === 2 ? (
            <Rocket className="h-5 w-5 text-neon-cyan/40" />
          ) : (
            <Trophy className="h-5 w-5 text-neon-orange/40" />
          )}
        </motion.div>
      ))}

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 text-lg uppercase tracking-widest text-muted-foreground"
      >
        Your {year} Wrapped
      </motion.p>

      {/* Title */}
      <motion.h1
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
        className="relative z-10 my-6 text-4xl md:text-6xl font-black text-center gradient-text-pink-purple"
      >
        {getTitle()}
      </motion.h1>

      {/* Stats summary */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="relative z-10 grid grid-cols-2 gap-4 max-w-md w-full"
      >
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-foreground/5 border border-foreground/10">
          <GitCommit className="h-5 w-5 text-neon-green" />
          <div>
            <p className="text-xl font-bold text-neon-green">{custom.totalCommits.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">commits</p>
          </div>
        </div>

        {github && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-foreground/5 border border-foreground/10">
            <Code2 className="h-5 w-5 text-neon-blue" />
            <div>
              <p className="text-xl font-bold text-neon-blue">{github.languages.length}</p>
              <p className="text-xs text-muted-foreground">languages</p>
            </div>
          </div>
        )}

        {leetcode && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-foreground/5 border border-foreground/10">
            <Trophy className="h-5 w-5 text-neon-orange" />
            <div>
              <p className="text-xl font-bold text-neon-orange">{leetcode.totalSolved}</p>
              <p className="text-xs text-muted-foreground">LeetCode</p>
            </div>
          </div>
        )}

        {codeforces && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-foreground/5 border border-foreground/10">
            <Star className="h-5 w-5 text-neon-cyan" />
            <div>
              <p className="text-xl font-bold text-neon-cyan">{codeforces.rating}</p>
              <p className="text-xs text-muted-foreground">CF Rating</p>
            </div>
          </div>
        )}

        {custom.hackathonsAttended > 0 && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-foreground/5 border border-foreground/10 col-span-2">
            <Rocket className="h-5 w-5 text-neon-yellow" />
            <div>
              <p className="text-xl font-bold text-neon-yellow">{custom.hackathonsAttended}</p>
              <p className="text-xs text-muted-foreground">hackathons</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="relative z-10 mt-8 flex gap-4"
      >
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onExport();
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground/10 border border-foreground/20 font-semibold hover:bg-foreground/20 transition-colors"
        >
          <Download className="h-5 w-5" />
          Export
        </motion.button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="relative z-10 mt-8 text-center text-muted-foreground text-sm"
      >
        Keep coding and see you in {year + 1}! 🚀
      </motion.p>
    </div>
  );
}
