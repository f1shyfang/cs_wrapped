"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { StaggerContainer, StaggerItem } from "../animations/StaggerAnimations";
import CounterAnimation from "../animations/CounterAnimation";
import { GitHubUser } from "@/types/stats";

interface IntroSlideProps {
  user: GitHubUser;
  year: number;
}

export default function IntroSlide({ user, year }: IntroSlideProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900 p-8">
      <StaggerContainer>
        <StaggerItem className="mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative"
          >
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
              <Image
                src={user.avatar_url}
                alt={user.name || user.login}
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full"
            >
              ✓ Active
            </motion.div>
          </motion.div>
        </StaggerItem>

        <StaggerItem className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
            {user.name || user.login}
          </h1>
          <p className="text-white/60 text-lg">@{user.login}</p>
        </StaggerItem>

        <StaggerItem className="mt-8 text-center">
          <motion.div
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="text-5xl md:text-7xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-[length:200%_auto] bg-clip-text text-transparent"
          >
            CS Wrapped
          </motion.div>
          <div className="text-6xl md:text-8xl font-black text-white mt-2">
            <CounterAnimation value={year} duration={1} />
          </div>
        </StaggerItem>

        <StaggerItem className="mt-8">
          <motion.p
            className="text-white/70 text-lg text-center max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            Let&apos;s see what you&apos;ve accomplished this year...
          </motion.p>
        </StaggerItem>
      </StaggerContainer>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white/50 text-center"
        >
          <p className="text-sm mb-2">Tap to continue</p>
          <svg
            className="w-6 h-6 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
