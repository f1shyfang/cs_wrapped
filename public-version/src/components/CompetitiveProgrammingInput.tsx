"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Trophy, Loader2, AlertCircle, ArrowRight, SkipForward } from "lucide-react";
import { fetchLeetCodeStats, fetchCodeforcesStats } from "@/lib/competitive-apis";
import { LeetCodeStats, CodeforcesStats } from "@/types/stats";

interface CompetitiveProgrammingInputProps {
  onComplete: (leetcode: LeetCodeStats | null, codeforces: CodeforcesStats | null) => void;
  onSkip: () => void;
}

export default function CompetitiveProgrammingInput({
  onComplete,
  onSkip,
}: CompetitiveProgrammingInputProps) {
  const [leetcodeUsername, setLeetcodeUsername] = useState("");
  const [codeforcesHandle, setCodeforcesHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let leetcodeData: LeetCodeStats | null = null;
      let codeforcesData: CodeforcesStats | null = null;

      // Fetch LeetCode data if username provided
      if (leetcodeUsername.trim()) {
        try {
          const data = await fetchLeetCodeStats(leetcodeUsername.trim());
          leetcodeData = {
            username: data.username,
            totalSolved: data.totalSolved,
            easySolved: data.easySolved,
            mediumSolved: data.mediumSolved,
            hardSolved: data.hardSolved,
            ranking: data.ranking,
            reputation: data.reputation,
          };
        } catch (err) {
          console.error("LeetCode fetch error:", err);
          setError(`LeetCode: ${err instanceof Error ? err.message : "User not found"}`);
        }
      }

      // Fetch Codeforces data if handle provided
      if (codeforcesHandle.trim()) {
        try {
          codeforcesData = await fetchCodeforcesStats(codeforcesHandle.trim());
        } catch (err) {
          console.error("Codeforces fetch error:", err);
          const errorMsg = `Codeforces: ${err instanceof Error ? err.message : "User not found"}`;
          setError(error ? `${error} | ${errorMsg}` : errorMsg);
        }
      }

      // If at least one platform succeeded or user didn't enter anything, proceed
      if (leetcodeData || codeforcesData || (!leetcodeUsername.trim() && !codeforcesHandle.trim())) {
        onComplete(leetcodeData, codeforcesData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl w-full relative z-10"
      >
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <div className="p-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white">
            Competitive Programming
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white/70 mb-10 text-lg"
        >
          Add your LeetCode and Codeforces profiles (optional) 🏆
        </motion.p>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* LeetCode Input */}
          <div className="bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Code2 className="w-6 h-6 text-orange-400" />
              <h3 className="text-xl font-bold text-white">LeetCode</h3>
            </div>
            <div className="relative">
              <input
                type="text"
                value={leetcodeUsername}
                onChange={(e) => setLeetcodeUsername(e.target.value)}
                placeholder="LeetCode username"
                disabled={loading}
                className="w-full bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl px-5 py-4 text-white text-lg placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400/50 focus:bg-white/15 disabled:opacity-50 transition-all"
              />
            </div>
          </div>

          {/* Codeforces Input */}
          <div className="bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-bold text-white">Codeforces</h3>
            </div>
            <div className="relative">
              <input
                type="text"
                value={codeforcesHandle}
                onChange={(e) => setCodeforcesHandle(e.target.value)}
                placeholder="Codeforces handle"
                disabled={loading}
                className="w-full bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl px-5 py-4 text-white text-lg placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400/50 focus:bg-white/15 disabled:opacity-50 transition-all"
              />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="flex items-center gap-3 text-yellow-300 bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30 px-5 py-4 rounded-xl shadow-lg"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}

          {/* Buttons */}
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={onSkip}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-3 bg-white/10 backdrop-blur-xl border-2 border-white/20 text-white font-bold text-lg px-8 py-5 rounded-2xl hover:bg-white/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SkipForward className="w-6 h-6" />
              Skip
            </motion.button>

            <motion.button
              whileHover={{ scale: loading ? 1 : 1.05, y: loading ? 0 : -2 }}
              whileTap={{ scale: loading ? 1 : 0.95 }}
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-white to-purple-50 text-purple-900 font-bold text-lg px-8 py-5 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Fetching stats...
                </>
              ) : (
                <>
                  <ArrowRight className="w-6 h-6" />
                  Continue
                </>
              )}
            </motion.button>
          </div>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white/40 text-sm mt-8"
        >
          ✨ Leave blank to skip • Public data only
        </motion.p>
      </motion.div>
    </div>
  );
}
