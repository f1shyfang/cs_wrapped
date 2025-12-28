"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap, Coffee, Moon, Rocket, PartyPopper, MessageSquare, Heart } from "lucide-react";
import CounterAnimation from "../animations/CounterAnimation";
import { CustomStats } from "@/types/stats";

interface CustomStatsSlideProps {
  stats: CustomStats;
}

export default function CustomStatsSlide({ stats }: CustomStatsSlideProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-neon-yellow/10 via-background to-neon-orange/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Floating party icons */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${5 + i * 12}%`,
            top: `${10 + (i % 4) * 22}%`,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 20, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2.5 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        >
          {i % 3 === 0 ? (
            <PartyPopper className="h-5 w-5 text-neon-yellow/30" />
          ) : i % 3 === 1 ? (
            <Rocket className="h-5 w-5 text-neon-orange/30" />
          ) : (
            <Coffee className="h-5 w-5 text-neon-pink/30" />
          )}
        </motion.div>
      ))}

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 text-lg uppercase tracking-widest text-muted-foreground"
      >
        Your achievements
      </motion.p>

      {/* Hackathons */}
      {stats.hackathonsAttended > 0 && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="relative z-10 my-6 text-center"
        >
          <motion.div
            className="flex items-center justify-center gap-3"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Rocket className="h-10 w-10 text-neon-orange" />
            <span className="text-6xl md:text-8xl font-black gradient-text-orange-yellow">
              <CounterAnimation value={stats.hackathonsAttended} duration={2} />
            </span>
          </motion.div>
          <span className="text-lg text-muted-foreground">
            hackathons attended 
            {stats.hackathonWins > 0 && ` (${stats.hackathonWins} wins! 🏆)`}
          </span>
        </motion.div>
      )}

      {/* Stats grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="relative z-10 flex flex-wrap justify-center gap-4 mt-4 max-w-md"
      >
        {stats.certificationsEarned.length > 0 && (
          <div className="text-center px-5 py-3 rounded-xl bg-foreground/5 border border-foreground/10">
            <motion.div
              className="flex items-center justify-center gap-2 mb-1"
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Award className="h-5 w-5 text-neon-yellow" />
              <span className="text-2xl font-bold text-neon-yellow">
                <CounterAnimation value={stats.certificationsEarned.length} duration={2} />
              </span>
            </motion.div>
            <span className="text-xs text-muted-foreground">certifications</span>
          </div>
        )}

        {stats.coursesCompleted > 0 && (
          <div className="text-center px-5 py-3 rounded-xl bg-foreground/5 border border-foreground/10">
            <motion.div
              className="flex items-center justify-center gap-2 mb-1"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <GraduationCap className="h-5 w-5 text-neon-green" />
              <span className="text-2xl font-bold text-neon-green">
                <CounterAnimation value={stats.coursesCompleted} duration={2} />
              </span>
            </motion.div>
            <span className="text-xs text-muted-foreground">courses</span>
          </div>
        )}

        {stats.lyraConversations > 0 && (
          <div className="text-center px-5 py-3 rounded-xl bg-foreground/5 border border-foreground/10">
            <motion.div
              className="flex items-center justify-center gap-2 mb-1"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MessageSquare className="h-5 w-5 text-neon-purple" />
              <span className="text-2xl font-bold text-neon-purple">
                <CounterAnimation value={stats.lyraConversations} duration={2} />
              </span>
            </motion.div>
            <span className="text-xs text-muted-foreground">coffee chats</span>
          </div>
        )}
      </motion.div>

      {/* Fun stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="relative z-10 mt-6 flex flex-wrap justify-center gap-4"
      >
        {stats.coffeeCups > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-full gradient-bg-orange-yellow">
            <Coffee className="h-4 w-4" />
            <span className="font-semibold">{stats.coffeeCups} coffees ☕</span>
          </div>
        )}

        {stats.allNighters > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-full gradient-bg-purple-pink">
            <Moon className="h-4 w-4" />
            <span className="font-semibold">{stats.allNighters} all-nighters 🌙</span>
          </div>
        )}
      </motion.div>

      {/* Favorite project */}
      {stats.favoriteProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="relative z-10 mt-6 flex items-center gap-2 text-muted-foreground"
        >
          <Heart className="h-4 w-4 text-neon-pink" />
          <span>Favorite project: <span className="text-neon-pink font-semibold">{stats.favoriteProject}</span></span>
        </motion.div>
      )}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="relative z-10 mt-6 text-center text-muted-foreground"
      >
        {stats.hackathonsAttended >= 5
          ? "Hackathon veteran! 🏆"
          : stats.certificationsEarned.length >= 5
          ? "Certified professional! 📜"
          : stats.allNighters >= 10
          ? "Night owl coder! 🦉"
          : "Building your achievements! 🌟"}
      </motion.p>
    </div>
  );
}
