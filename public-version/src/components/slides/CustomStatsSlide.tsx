"use client";

import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "../animations/StaggerAnimations";
import CounterAnimation from "../animations/CounterAnimation";
import { CustomStats } from "@/types/stats";

interface CustomStatsSlideProps {
  stats: CustomStats;
}

export default function CustomStatsSlide({ stats }: CustomStatsSlideProps) {
  const hasHackathons = stats.hackathonsAttended > 0 || stats.hackathonWins > 0;
  const hasLearning = stats.coursesCompleted > 0 || stats.certificationsEarned.length > 0;
  const hasAI = stats.lyraConversations > 0;
  const hasFun = stats.coffeeCups > 0 || stats.allNighters > 0;

  if (!hasHackathons && !hasLearning && !hasAI && !hasFun) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cyan-900 via-teal-900 to-green-900 p-8">
      <StaggerContainer>
        <StaggerItem>
          <motion.div
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-8xl mb-4"
          >
            ✨
          </motion.div>
        </StaggerItem>

        <StaggerItem className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Beyond the Code
          </h2>
          <p className="text-white/60 mt-2">Your other achievements this year</p>
        </StaggerItem>

        <StaggerItem>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl">
            {hasHackathons && (
              <>
                {stats.hackathonsAttended > 0 && (
                  <AchievementCard
                    emoji="🏆"
                    value={stats.hackathonsAttended}
                    label="Hackathons"
                    delay={0.2}
                  />
                )}
                {stats.hackathonWins > 0 && (
                  <AchievementCard
                    emoji="🥇"
                    value={stats.hackathonWins}
                    label="Wins/Prizes"
                    delay={0.3}
                  />
                )}
              </>
            )}

            {hasAI && (
              <AchievementCard
                emoji="💬"
                value={stats.lyraConversations}
                label="Lyra Chats"
                delay={0.4}
              />
            )}

            {hasLearning && (
              <>
                {stats.coursesCompleted > 0 && (
                  <AchievementCard
                    emoji="📚"
                    value={stats.coursesCompleted}
                    label="Courses"
                    delay={0.5}
                  />
                )}
                {stats.certificationsEarned.length > 0 && (
                  <AchievementCard
                    emoji="🎓"
                    value={stats.certificationsEarned.length}
                    label="Certifications"
                    delay={0.6}
                  />
                )}
              </>
            )}

            {hasFun && (
              <>
                {stats.coffeeCups > 0 && (
                  <AchievementCard
                    emoji="☕"
                    value={stats.coffeeCups}
                    label="Coffee Cups"
                    delay={0.7}
                  />
                )}
                {stats.allNighters > 0 && (
                  <AchievementCard
                    emoji="🌙"
                    value={stats.allNighters}
                    label="All-Nighters"
                    delay={0.8}
                  />
                )}
              </>
            )}
          </div>
        </StaggerItem>

        {stats.certificationsEarned.length > 0 && (
          <StaggerItem className="mt-8">
            <h3 className="text-lg text-white/70 mb-4 text-center">
              Certifications Earned
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {stats.certificationsEarned.map((cert, index) => (
                <motion.span
                  key={cert}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="bg-teal-500/30 text-white px-4 py-2 rounded-full text-sm"
                >
                  🎓 {cert}
                </motion.span>
              ))}
            </div>
          </StaggerItem>
        )}

        {stats.favoriteProject && (
          <StaggerItem className="mt-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
            >
              <p className="text-white/70 mb-2">Favorite Project</p>
              <p className="text-2xl font-bold text-white">
                ⭐ {stats.favoriteProject}
              </p>
            </motion.div>
          </StaggerItem>
        )}
      </StaggerContainer>
    </div>
  );
}

function AchievementCard({
  emoji,
  value,
  label,
  delay,
}: {
  emoji: string;
  value: number;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
    >
      <div className="text-3xl mb-2">{emoji}</div>
      <div className="text-2xl font-bold text-white">
        <CounterAnimation value={value} duration={1.5} />
      </div>
      <div className="text-sm text-white/60">{label}</div>
    </motion.div>
  );
}
