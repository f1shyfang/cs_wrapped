"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Search, Loader2, AlertCircle } from "lucide-react";

interface UsernameInputProps {
  onSubmit: (username: string) => void;
  loading: boolean;
  error: string | null;
}

export default function UsernameInput({
  onSubmit,
  loading,
  error,
}: UsernameInputProps) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-lg w-full relative z-10"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="text-6xl md:text-8xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-[length:200%_auto] bg-clip-text text-transparent mb-4 drop-shadow-2xl"
          >
            CS Wrapped
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-lg"
        >
          {new Date().getFullYear()}
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white/70 mb-12 text-lg"
        >
          Enter your GitHub username to see your year in code
        </motion.p>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="relative">
            <Github className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-white/50" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="octocat"
              disabled={loading}
              className="w-full bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl pl-16 pr-6 py-5 text-white text-lg placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400/50 focus:bg-white/15 disabled:opacity-50 transition-all shadow-xl"
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="flex items-center gap-3 text-red-300 bg-red-500/20 backdrop-blur-sm border border-red-400/30 px-5 py-4 rounded-xl shadow-lg"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: loading ? 1 : 1.05, y: loading ? 0 : -2 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
            type="submit"
            disabled={loading || !username.trim()}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-white to-purple-50 text-purple-900 font-bold text-lg px-8 py-5 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Fetching your stats...
              </>
            ) : (
              <>
                <Search className="w-6 h-6" />
                Generate My Wrapped
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white/40 text-sm mt-8"
        >
          No login required • Uses public GitHub data only
        </motion.p>
      </motion.div>
    </div>
  );
}
