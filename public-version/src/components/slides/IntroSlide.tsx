"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Code2 } from "lucide-react";
import { GitHubUser } from "@/types/stats";

interface IntroSlideProps {
  user: GitHubUser;
  year: number;
}

export default function IntroSlide({ user, year }: IntroSlideProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 via-background to-neon-pink/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Floating sparkles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${10 + i * 12}%`,
            top: `${10 + (i % 4) * 20}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        >
          <Sparkles className="h-4 w-4 text-neon-pink/40" />
        </motion.div>
      ))}

      {/* Avatar */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className="relative z-10 mb-6"
      >
        <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-neon-purple/50 glow-purple">
          <Image
            src={user.avatar_url}
            alt={user.name || user.login}
            width={112}
            height={112}
            className="object-cover"
          />
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
          className="absolute -bottom-2 -right-2 gradient-bg-pink-orange text-background text-xs font-bold px-3 py-1 rounded-full"
        >
          ✓ Active
        </motion.div>
      </motion.div>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 text-3xl md:text-5xl font-black text-foreground text-center"
      >
        {user.name || user.login}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 text-muted-foreground text-lg mt-2"
      >
        @{user.login}
      </motion.p>

      {/* Year badge */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7, type: "spring" }}
        className="relative z-10 mt-10"
      >
        <div className="flex items-center gap-3">
          <Code2 className="h-8 w-8 text-neon-purple" />
          <span className="text-6xl md:text-8xl font-black gradient-text-purple-pink">
            {year}
          </span>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="relative z-10 mt-6 text-lg uppercase tracking-widest text-muted-foreground"
      >
        Your year in code
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="relative z-10 mt-12 text-muted-foreground/50 text-sm flex items-center gap-2"
      >
        <span>Tap to continue</span>
        <motion.span
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          →
        </motion.span>
      </motion.div>
    </div>
  );
}
