"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CustomStats } from "@/types/github";
import { Save, Plus, X } from "lucide-react";

interface CustomStatsFormProps {
  onSave: (stats: CustomStats) => void;
  initialStats?: CustomStats;
}

export default function CustomStatsForm({
  onSave,
  initialStats,
}: CustomStatsFormProps) {
  const [stats, setStats] = useState<CustomStats>(
    initialStats || {
      hackathonsAttended: 0,
      hackathonWins: 0,
      certificationsEarned: [],
      coursesCompleted: 0,
      lyraConversations: 0,
      coffeeCups: 0,
      allNighters: 0,
    }
  );

  const [newCert, setNewCert] = useState("");

  const addCertification = () => {
    if (newCert.trim()) {
      setStats((prev) => ({
        ...prev,
        certificationsEarned: [...(prev.certificationsEarned || []), newCert.trim()],
      }));
      setNewCert("");
    }
  };

  const removeCertification = (index: number) => {
    setStats((prev) => ({
      ...prev,
      certificationsEarned: prev.certificationsEarned?.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900 p-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            Add Your Custom Stats
          </h1>
          <p className="text-white/60 mb-8">
            Personalize your CS Wrapped with additional achievements
          </p>

          <div className="space-y-6">
            {/* Hackathons */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">
                  Hackathons Attended
                </label>
                <input
                  type="number"
                  min="0"
                  value={stats.hackathonsAttended || 0}
                  onChange={(e) =>
                    setStats((prev) => ({
                      ...prev,
                      hackathonsAttended: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">
                  Hackathon Wins 🏆
                </label>
                <input
                  type="number"
                  min="0"
                  value={stats.hackathonWins || 0}
                  onChange={(e) =>
                    setStats((prev) => ({
                      ...prev,
                      hackathonWins: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Lyra Conversations */}
            <div>
              <label className="block text-white/70 text-sm mb-2">
                💬 Conversations with Lyra
              </label>
              <input
                type="number"
                min="0"
                value={stats.lyraConversations || 0}
                onChange={(e) =>
                  setStats((prev) => ({
                    ...prev,
                    lyraConversations: parseInt(e.target.value) || 0,
                  }))
                }
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Courses Completed */}
            <div>
              <label className="block text-white/70 text-sm mb-2">
                📚 Courses/Tutorials Completed
              </label>
              <input
                type="number"
                min="0"
                value={stats.coursesCompleted || 0}
                onChange={(e) =>
                  setStats((prev) => ({
                    ...prev,
                    coursesCompleted: parseInt(e.target.value) || 0,
                  }))
                }
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Certifications */}
            <div>
              <label className="block text-white/70 text-sm mb-2">
                🎓 Certifications Earned
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newCert}
                  onChange={(e) => setNewCert(e.target.value)}
                  placeholder="e.g., AWS Solutions Architect"
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                {stats.certificationsEarned?.map((cert, index) => (
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">
                  ☕ Coffee Cups Consumed
                </label>
                <input
                  type="number"
                  min="0"
                  value={stats.coffeeCups || 0}
                  onChange={(e) =>
                    setStats((prev) => ({
                      ...prev,
                      coffeeCups: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">
                  🌙 All-Nighters Pulled
                </label>
                <input
                  type="number"
                  min="0"
                  value={stats.allNighters || 0}
                  onChange={(e) =>
                    setStats((prev) => ({
                      ...prev,
                      allNighters: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Save Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSave(stats)}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              <Save className="w-5 h-5" />
              Save & Generate Wrapped
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
