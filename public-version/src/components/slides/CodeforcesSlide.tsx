"use client";

import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "../animations/StaggerAnimations";
import CounterAnimation from "../animations/CounterAnimation";
import { CodeforcesStats } from "@/types/stats";
import { Trophy, TrendingUp, Award, Code2 } from "lucide-react";

interface CodeforcesSlideProps {
  stats: CodeforcesStats;
}

// Rank colors based on Codeforces rating system
const getRankColor = (rank: string): string => {
  const lowerRank = rank.toLowerCase();
  if (lowerRank.includes("legend") || lowerRank.includes("grandmaster")) return "from-red-500 to-orange-500";
  if (lowerRank.includes("master")) return "from-orange-400 to-yellow-400";
  if (lowerRank.includes("candidate")) return "from-purple-400 to-pink-400";
  if (lowerRank.includes("expert")) return "from-blue-400 to-cyan-400";
  if (lowerRank.includes("specialist")) return "from-cyan-400 to-teal-400";
  if (lowerRank.includes("pupil")) return "from-green-400 to-emerald-400";
  return "from-gray-400 to-gray-500";
};

export default function CodeforcesSlide({ stats }: CodeforcesSlideProps) {
  const rankGradient = getRankColor(stats.rank);
  const maxRankGradient = getRankColor(stats.maxRank);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-8">
      <StaggerContainer>
        {/* Icon */}
        <StaggerItem className="mb-8">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            className="inline-block p-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl shadow-2xl"
          >
            <Trophy className="w-16 h-16 text-white" />
          </motion.div>
        </StaggerItem>

        {/* Title */}
        <StaggerItem>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 text-center">
            Codeforces
          </h1>
        </StaggerItem>

        <StaggerItem>
          <p className="text-white/70 text-xl mb-12 text-center">
            Competitive Programming Journey
          </p>
        </StaggerItem>

        {/* Stats Grid */}
        <StaggerItem className="w-full max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Current Rating */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-6 h-6 text-blue-400" />
                <h3 className="text-white/70 text-lg">Current Rating</h3>
              </div>
              <div className={`text-5xl font-black bg-gradient-to-r ${rankGradient} bg-clip-text text-transparent`}>
                <CounterAnimation value={stats.rating} duration={1.5} />
              </div>
              <p className={`mt-2 text-lg font-semibold bg-gradient-to-r ${rankGradient} bg-clip-text text-transparent capitalize`}>
                {stats.rank}
              </p>
            </motion.div>

            {/* Max Rating */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center gap-3 mb-3">
                <Award className="w-6 h-6 text-orange-400" />
                <h3 className="text-white/70 text-lg">Peak Rating</h3>
              </div>
              <div className={`text-5xl font-black bg-gradient-to-r ${maxRankGradient} bg-clip-text text-transparent`}>
                <CounterAnimation value={stats.maxRating} duration={1.5} />
              </div>
              <p className={`mt-2 text-lg font-semibold bg-gradient-to-r ${maxRankGradient} bg-clip-text text-transparent capitalize`}>
                {stats.maxRank}
              </p>
            </motion.div>

            {/* Problems Solved */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center gap-3 mb-3">
                <Code2 className="w-6 h-6 text-green-400" />
                <h3 className="text-white/70 text-lg">Problems Solved</h3>
              </div>
              <div className="text-5xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                <CounterAnimation value={stats.problemsSolved} duration={2} />
              </div>
            </motion.div>

            {/* Contests */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center gap-3 mb-3">
                <Trophy className="w-6 h-6 text-purple-400" />
                <h3 className="text-white/70 text-lg">Contests</h3>
              </div>
              <div className="text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                <CounterAnimation value={stats.contestsParticipated} duration={1.5} />
              </div>
            </motion.div>
          </div>
        </StaggerItem>

        {/* Handle */}
        <StaggerItem>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center bg-white/5 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/10"
          >
            <p className="text-white/60 text-sm mb-1">Handle</p>
            <p className="text-white text-2xl font-bold">@{stats.handle}</p>
          </motion.div>
        </StaggerItem>
      </StaggerContainer>
    </div>
  );
}
