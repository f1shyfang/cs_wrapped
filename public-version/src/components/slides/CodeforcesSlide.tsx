"use client";

import { motion } from "framer-motion";
import { Trophy, TrendingUp, Award, Flame } from "lucide-react";
import CounterAnimation from "../animations/CounterAnimation";
import { CodeforcesStats } from "@/types/stats";

interface CodeforcesSlideProps {
  stats: CodeforcesStats;
}

const getRankColor = (rank: string): string => {
  const rankLower = rank.toLowerCase();
  if (rankLower.includes("legendary grandmaster")) return "#FF0000";
  if (rankLower.includes("international grandmaster")) return "#FF0000";
  if (rankLower.includes("grandmaster")) return "#FF0000";
  if (rankLower.includes("international master")) return "#FF8C00";
  if (rankLower.includes("master")) return "#FF8C00";
  if (rankLower.includes("candidate master")) return "#AA00AA";
  if (rankLower.includes("expert")) return "#0000FF";
  if (rankLower.includes("specialist")) return "#03A89E";
  if (rankLower.includes("pupil")) return "#008000";
  return "#808080"; // newbie
};

export default function CodeforcesSlide({ stats }: CodeforcesSlideProps) {
  const rankColor = getRankColor(stats.rank || "newbie");

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 via-background to-neon-blue/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Floating trophies */}
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
            delay: i * 0.3,
          }}
        >
          <Trophy className="h-5 w-5 text-neon-cyan/30" />
        </motion.div>
      ))}

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 text-lg uppercase tracking-widest text-muted-foreground"
      >
        Codeforces ranking
      </motion.p>

      {/* Rank badge */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
        className="relative z-10 my-6"
      >
        <div
          className="rounded-2xl px-8 py-4 border-2"
          style={{
            backgroundColor: `${rankColor}20`,
            borderColor: rankColor,
          }}
        >
          <motion.p
            className="text-3xl md:text-4xl font-black uppercase tracking-wider"
            style={{ color: rankColor }}
            animate={{ textShadow: [`0 0 10px ${rankColor}40`, `0 0 20px ${rankColor}60`, `0 0 10px ${rankColor}40`] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {stats.rank || "Unrated"}
          </motion.p>
        </div>
      </motion.div>

      {/* Rating */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring" }}
        className="relative z-10 text-center"
      >
        <motion.div
          className="flex items-center justify-center gap-3"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <TrendingUp className="h-10 w-10 text-neon-cyan" />
          <span className="text-6xl md:text-8xl font-black gradient-text-cyan-blue">
            <CounterAnimation value={stats.rating} duration={2} />
          </span>
        </motion.div>
        <span className="text-lg text-muted-foreground">current rating</span>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="relative z-10 mt-8 flex gap-6"
      >
        <div className="text-center px-6 py-4 rounded-xl bg-foreground/5 border border-foreground/10">
          <motion.div
            className="flex items-center justify-center gap-2 mb-1"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Award className="h-5 w-5 text-neon-yellow" />
            <span className="text-2xl font-bold text-neon-yellow">
              <CounterAnimation value={stats.maxRating} duration={2} />
            </span>
          </motion.div>
          <span className="text-xs text-muted-foreground">peak rating</span>
        </div>

        <div className="text-center px-6 py-4 rounded-xl bg-foreground/5 border border-foreground/10">
          <motion.div
            className="flex items-center justify-center gap-2 mb-1"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <Flame className="h-5 w-5 text-neon-orange" />
            <span className="text-2xl font-bold text-neon-orange">
              <CounterAnimation value={stats.contribution} duration={2} />
            </span>
          </motion.div>
          <span className="text-xs text-muted-foreground">contribution</span>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="relative z-10 mt-8 text-center text-muted-foreground"
      >
        {stats.rating >= 2400
          ? "Grandmaster! You're elite! 🏆"
          : stats.rating >= 1900
          ? "Candidate Master! Almost there! 💪"
          : stats.rating >= 1600
          ? "Expert level! Keep grinding! 🔥"
          : stats.rating >= 1400
          ? "Specialist! Growing strong! 📈"
          : "Keep solving and climbing! 🚀"}
      </motion.p>
    </div>
  );
}
