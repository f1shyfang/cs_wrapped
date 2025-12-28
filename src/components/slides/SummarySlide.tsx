"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { StaggerContainer, StaggerItem } from "../animations/StatSlide";
import ConfettiEffect from "../animations/ConfettiEffect";
import { GitHubStats } from "@/types/github";
import { Download, Twitter, Linkedin } from "lucide-react";

interface SummarySlideProps {
  stats: GitHubStats;
  year: number;
  onExport: () => void;
}

export default function SummarySlide({ stats, year, onExport }: SummarySlideProps) {
  const topLanguage = stats.languages[0]?.node.name || "Code";

  const shareText = encodeURIComponent(
    `🎉 My ${year} CS Wrapped is here!\n\n` +
    `📊 ${stats.contributions.contributionCalendar.totalContributions} contributions\n` +
    `💻 Top language: ${topLanguage}\n` +
    `🔥 ${stats.longestStreak} day streak\n` +
    `⭐ ${stats.totalStars} stars earned\n\n` +
    `Check out your year in code! #CSWrapped #GitHub`
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 p-8 relative overflow-hidden">
      <ConfettiEffect trigger={true} />

      <StaggerContainer>
        <StaggerItem>
          <motion.div
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-8xl mb-4"
          >
            🎉
          </motion.div>
        </StaggerItem>

        <StaggerItem className="text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            That&apos;s a Wrap!
          </h1>
          <p className="text-xl text-white/70">
            Your {year} was amazing, {stats.user.name || stats.user.login}!
          </p>
        </StaggerItem>

        <StaggerItem className="mt-8">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20">
                <Image
                  src={stats.user.avatarUrl}
                  alt={stats.user.login}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {stats.user.name || stats.user.login}
                </h3>
                <p className="text-white/60">@{stats.user.login}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <SummaryStat
                emoji="📊"
                value={stats.contributions.contributionCalendar.totalContributions.toLocaleString()}
                label="Contributions"
              />
              <SummaryStat
                emoji="💻"
                value={topLanguage}
                label="Top Language"
              />
              <SummaryStat
                emoji="🔥"
                value={`${stats.longestStreak} days`}
                label="Longest Streak"
              />
              <SummaryStat
                emoji="⭐"
                value={stats.totalStars.toLocaleString()}
                label="Stars Earned"
              />
              <SummaryStat
                emoji="📁"
                value={stats.repositories.length.toLocaleString()}
                label="Repositories"
              />
              <SummaryStat
                emoji="🔀"
                value={stats.contributions.totalPullRequestContributions.toLocaleString()}
                label="Pull Requests"
              />
            </div>
          </div>
        </StaggerItem>

        <StaggerItem className="mt-8 flex flex-wrap gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onExport}
            className="flex items-center gap-2 bg-white text-purple-900 font-bold px-6 py-3 rounded-full hover:bg-white/90 transition-colors"
          >
            <Download className="w-5 h-5" />
            Download Image
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={`https://twitter.com/intent/tweet?text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-blue-500 text-white font-bold px-6 py-3 rounded-full hover:bg-blue-600 transition-colors"
          >
            <Twitter className="w-5 h-5" />
            Share on X
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              "https://cswrapped.dev"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-blue-700 text-white font-bold px-6 py-3 rounded-full hover:bg-blue-800 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
            Share on LinkedIn
          </motion.a>
        </StaggerItem>
      </StaggerContainer>
    </div>
  );
}

function SummaryStat({
  emoji,
  value,
  label,
}: {
  emoji: string;
  value: string;
  label: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="text-center p-3 bg-white/5 rounded-xl"
    >
      <div className="text-2xl mb-1">{emoji}</div>
      <div className="text-lg font-bold text-white">{value}</div>
      <div className="text-xs text-white/60">{label}</div>
    </motion.div>
  );
}
