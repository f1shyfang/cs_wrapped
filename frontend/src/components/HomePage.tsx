"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LoginButton from "@/components/LoginButton";
import WrappedViewer from "@/components/WrappedViewer";
import { GitHubStats } from "@/types/github";
import { Loader2, Sparkles, Code, GitBranch, Star, Trophy } from "lucide-react";

export default function Home() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.accessToken) {
      fetchStats();
    }
  }, [session]);

  async function fetchStats() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/stats");
      if (!response.ok) {
        throw new Error("Failed to fetch stats");
      }
      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError("Failed to load your GitHub stats. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Show wrapped viewer when stats are loaded
  if (stats) {
    return <WrappedViewer stats={stats} />;
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Loader2 className="w-16 h-16 text-white animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Analyzing your year in code...
          </h2>
          <p className="text-white/60">
            Fetching your GitHub contributions, repositories, and more
          </p>
        </motion.div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-900 via-pink-900 to-purple-900 p-8">
        <div className="text-center">
          <div className="text-6xl mb-6">😕</div>
          <h2 className="text-2xl font-bold text-white mb-4">{error}</h2>
          <button
            onClick={fetchStats}
            className="bg-white text-purple-900 font-bold px-6 py-3 rounded-full hover:bg-white/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Landing page
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900 flex flex-col">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl"
        >
          {/* Animated logo */}
          <motion.div
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="text-6xl md:text-8xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-[length:200%_auto] bg-clip-text text-transparent mb-4"
          >
            CS Wrapped
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-black text-white mb-6"
          >
            {new Date().getFullYear()}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-white/70 mb-8 max-w-xl mx-auto"
          >
            Discover your year in code. See your GitHub contributions, top
            languages, and coding highlights beautifully visualized.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            <LoginButton />
          </motion.div>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl"
        >
          <FeatureCard
            icon={<Code className="w-8 h-8" />}
            title="Languages"
            description="See your top programming languages"
          />
          <FeatureCard
            icon={<GitBranch className="w-8 h-8" />}
            title="Contributions"
            description="Track your commits and PRs"
          />
          <FeatureCard
            icon={<Star className="w-8 h-8" />}
            title="Repositories"
            description="View your most starred projects"
          />
          <FeatureCard
            icon={<Trophy className="w-8 h-8" />}
            title="Achievements"
            description="Celebrate your coding streaks"
          />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-white/40 text-sm">
        <p>
          Made with 💜 •{" "}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/60 transition-colors"
          >
            View on GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10"
    >
      <div className="text-purple-400 mb-3 flex justify-center">{icon}</div>
      <h3 className="text-white font-semibold mb-1">{title}</h3>
      <p className="text-white/50 text-sm">{description}</p>
    </motion.div>
  );
}
