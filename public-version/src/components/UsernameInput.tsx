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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900 flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-lg w-full"
      >
        {/* Logo */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="text-5xl md:text-7xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-[length:200%_auto] bg-clip-text text-transparent mb-2"
        >
          CS Wrapped
        </motion.div>
        <div className="text-3xl md:text-5xl font-black text-white mb-4">
          {new Date().getFullYear()}
        </div>
        <p className="text-white/60 mb-8">
          Enter your GitHub username to see your year in code
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white/40" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your GitHub username"
              disabled={loading}
              className="w-full bg-white/10 border border-white/20 rounded-2xl pl-14 pr-4 py-4 text-white text-lg placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50"
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-red-400 bg-red-500/20 px-4 py-3 rounded-xl"
            >
              <AlertCircle className="w-5 h-5" />
              {error}
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            type="submit"
            disabled={loading || !username.trim()}
            className="w-full flex items-center justify-center gap-3 bg-white text-purple-900 font-bold text-lg px-8 py-4 rounded-2xl hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
        </form>

        {/* Info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white/40 text-sm mt-8"
        >
          ✨ No login required • Uses public GitHub data only
        </motion.p>
      </motion.div>
    </div>
  );
}
