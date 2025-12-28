"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CustomStats, LeetCodeStats, defaultCustomStats } from "@/types/stats";
import { Plus, X, Save, Sparkles } from "lucide-react";

interface CustomStatsFormProps {
  initialStats?: CustomStats;
  initialLeetCode?: LeetCodeStats | null;
  onSave: (custom: CustomStats, leetcode: LeetCodeStats | null) => void;
  onSkip: () => void;
}

export default function CustomStatsForm({
  initialStats,
  initialLeetCode,
  onSave,
  onSkip,
}: CustomStatsFormProps) {
  const [stats, setStats] = useState<CustomStats>(
    initialStats || defaultCustomStats
  );
  const [leetcode, setLeetcode] = useState<LeetCodeStats | null>(
    initialLeetCode || null
  );
  const [showLeetCode, setShowLeetCode] = useState(!!initialLeetCode);
  const [newCert, setNewCert] = useState("");

  const addCertification = () => {
    if (newCert.trim()) {
      setStats((prev) => ({
        ...prev,
        certificationsEarned: [...prev.certificationsEarned, newCert.trim()],
      }));
      setNewCert("");
    }
  };

  const removeCertification = (index: number) => {
    setStats((prev) => ({
      ...prev,
      certificationsEarned: prev.certificationsEarned.filter(
        (_, i) => i !== index
      ),
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Add Your Stats
            </h1>
          </div>
          <p className="text-white/60 mb-8">
            Personalize your CS Wrapped with additional achievements (all optional!)
          </p>

          <div className="space-y-6">
            {/* GitHub Stats (manual entry for private data) */}
            <div className="bg-white/5 rounded-2xl p-4">
              <h3 className="text-lg font-semibold text-white mb-4">
                📊 GitHub Stats (Private repos not included in public API)
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">
                    Total Commits (2024)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={stats.totalCommits || ""}
                    onChange={(e) =>
                      setStats((prev) => ({
                        ...prev,
                        totalCommits: parseInt(e.target.value) || 0,
                      }))
                    }
                    placeholder="e.g., 847"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">
                    Pull Requests
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={stats.totalPRs || ""}
                    onChange={(e) =>
                      setStats((prev) => ({
                        ...prev,
                        totalPRs: parseInt(e.target.value) || 0,
                      }))
                    }
                    placeholder="e.g., 52"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">
                    🔥 Longest Streak (days)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={stats.longestStreak || ""}
                    onChange={(e) =>
                      setStats((prev) => ({
                        ...prev,
                        longestStreak: parseInt(e.target.value) || 0,
                      }))
                    }
                    placeholder="e.g., 30"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">
                    ⭐ Favorite Project
                  </label>
                  <input
                    type="text"
                    value={stats.favoriteProject || ""}
                    onChange={(e) =>
                      setStats((prev) => ({
                        ...prev,
                        favoriteProject: e.target.value,
                      }))
                    }
                    placeholder="e.g., my-awesome-app"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* LeetCode Stats */}
            <div className="bg-white/5 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  🧩 LeetCode Stats
                </h3>
                <button
                  onClick={() => setShowLeetCode(!showLeetCode)}
                  className="text-sm text-purple-300 hover:text-purple-200"
                >
                  {showLeetCode ? "Hide" : "Add LeetCode"}
                </button>
              </div>
              {showLeetCode && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-white/70 text-sm mb-2">
                      Total Solved
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={leetcode?.totalSolved || ""}
                      onChange={(e) =>
                        setLeetcode((prev) => ({
                          username: prev?.username || "",
                          totalSolved: parseInt(e.target.value) || 0,
                          easySolved: prev?.easySolved || 0,
                          mediumSolved: prev?.mediumSolved || 0,
                          hardSolved: prev?.hardSolved || 0,
                        }))
                      }
                      placeholder="150"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-green-400 text-sm mb-2">
                      Easy
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={leetcode?.easySolved || ""}
                      onChange={(e) =>
                        setLeetcode((prev) => ({
                          username: prev?.username || "",
                          totalSolved: prev?.totalSolved || 0,
                          easySolved: parseInt(e.target.value) || 0,
                          mediumSolved: prev?.mediumSolved || 0,
                          hardSolved: prev?.hardSolved || 0,
                        }))
                      }
                      placeholder="80"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-yellow-400 text-sm mb-2">
                      Medium
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={leetcode?.mediumSolved || ""}
                      onChange={(e) =>
                        setLeetcode((prev) => ({
                          username: prev?.username || "",
                          totalSolved: prev?.totalSolved || 0,
                          easySolved: prev?.easySolved || 0,
                          mediumSolved: parseInt(e.target.value) || 0,
                          hardSolved: prev?.hardSolved || 0,
                        }))
                      }
                      placeholder="50"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                  <div>
                    <label className="block text-red-400 text-sm mb-2">
                      Hard
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={leetcode?.hardSolved || ""}
                      onChange={(e) =>
                        setLeetcode((prev) => ({
                          username: prev?.username || "",
                          totalSolved: prev?.totalSolved || 0,
                          easySolved: prev?.easySolved || 0,
                          mediumSolved: prev?.mediumSolved || 0,
                          hardSolved: parseInt(e.target.value) || 0,
                        }))
                      }
                      placeholder="20"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Hackathons */}
            <div className="bg-white/5 rounded-2xl p-4">
              <h3 className="text-lg font-semibold text-white mb-4">
                🏆 Hackathons & Events
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">
                    Hackathons Attended
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={stats.hackathonsAttended || ""}
                    onChange={(e) =>
                      setStats((prev) => ({
                        ...prev,
                        hackathonsAttended: parseInt(e.target.value) || 0,
                      }))
                    }
                    placeholder="5"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">
                    Wins / Prizes 🥇
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={stats.hackathonWins || ""}
                    onChange={(e) =>
                      setStats((prev) => ({
                        ...prev,
                        hackathonWins: parseInt(e.target.value) || 0,
                      }))
                    }
                    placeholder="2"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* AI & Learning */}
            <div className="bg-white/5 rounded-2xl p-4">
              <h3 className="text-lg font-semibold text-white mb-4">
                🤖 AI & Learning
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">
                    💬 Lyra Conversations
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={stats.lyraConversations || ""}
                    onChange={(e) =>
                      setStats((prev) => ({
                        ...prev,
                        lyraConversations: parseInt(e.target.value) || 0,
                      }))
                    }
                    placeholder="100"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">
                    📚 Courses Completed
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={stats.coursesCompleted || ""}
                    onChange={(e) =>
                      setStats((prev) => ({
                        ...prev,
                        coursesCompleted: parseInt(e.target.value) || 0,
                      }))
                    }
                    placeholder="8"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white/5 rounded-2xl p-4">
              <h3 className="text-lg font-semibold text-white mb-4">
                🎓 Certifications
              </h3>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newCert}
                  onChange={(e) => setNewCert(e.target.value)}
                  placeholder="e.g., AWS Solutions Architect"
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  onKeyDown={(e) => e.key === "Enter" && addCertification()}
                />
                <button
                  onClick={addCertification}
                  className="bg-purple-500 text-white px-4 rounded-xl hover:bg-purple-600 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {stats.certificationsEarned.map((cert, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 bg-purple-500/30 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {cert}
                    <button
                      onClick={() => removeCertification(index)}
                      className="hover:text-red-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Fun Stats */}
            <div className="bg-white/5 rounded-2xl p-4">
              <h3 className="text-lg font-semibold text-white mb-4">
                ☕ Fun Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">
                    Coffee Cups Consumed
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={stats.coffeeCups || ""}
                    onChange={(e) =>
                      setStats((prev) => ({
                        ...prev,
                        coffeeCups: parseInt(e.target.value) || 0,
                      }))
                    }
                    placeholder="365"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">
                    🌙 All-Nighters Pulled
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={stats.allNighters || ""}
                    onChange={(e) =>
                      setStats((prev) => ({
                        ...prev,
                        allNighters: parseInt(e.target.value) || 0,
                      }))
                    }
                    placeholder="12"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={onSkip}
                className="flex-1 py-4 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                Skip for now
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSave(stats, showLeetCode ? leetcode : null)}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                <Save className="w-5 h-5" />
                Generate Wrapped
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
