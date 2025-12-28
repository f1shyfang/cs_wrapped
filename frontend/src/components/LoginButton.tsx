"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Github, LogOut, Loader2 } from "lucide-react";

export default function LoginButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <button
        disabled
        className="flex items-center gap-2 bg-white/10 text-white/50 px-6 py-3 rounded-full"
      >
        <Loader2 className="w-5 h-5 animate-spin" />
        Loading...
      </button>
    );
  }

  if (session) {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => signOut()}
        className="flex items-center gap-2 bg-red-500/20 text-red-300 px-6 py-3 rounded-full hover:bg-red-500/30 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        Sign Out
      </motion.button>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => signIn("github")}
      className="flex items-center gap-2 bg-white text-black font-bold px-8 py-4 rounded-full hover:bg-white/90 transition-colors text-lg"
    >
      <Github className="w-6 h-6" />
      Sign in with GitHub
    </motion.button>
  );
}
