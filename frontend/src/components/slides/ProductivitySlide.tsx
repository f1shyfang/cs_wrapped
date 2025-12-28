"use client";

import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "../animations/StatSlide";

interface ProductivitySlideProps {
  mostProductiveDay: string;
  contributions: {
    contributionCalendar: {
      weeks: {
        contributionDays: { date: string; contributionCount: number; weekday: number }[];
      }[];
    };
  };
}

export default function ProductivitySlide({
  mostProductiveDay,
  contributions,
}: ProductivitySlideProps) {
  // Calculate hourly productivity (simulated based on contribution patterns)
  const allDays = contributions.contributionCalendar.weeks.flatMap(
    (w) => w.contributionDays
  );

  // Find the most productive month
  const monthlyContributions: Record<string, number> = {};
  allDays.forEach((day) => {
    const month = new Date(day.date).toLocaleString("default", { month: "long" });
    monthlyContributions[month] = (monthlyContributions[month] || 0) + day.contributionCount;
  });

  const sortedMonths = Object.entries(monthlyContributions)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const topMonth = sortedMonths[0];

  // Fun facts based on the day
  const dayMessages: Record<string, string> = {
    Monday: "Starting the week strong! 💪",
    Tuesday: "Tuesday motivation is real! 🚀",
    Wednesday: "Hump day hero! 🐪",
    Thursday: "Almost Friday, still coding! 👨‍💻",
    Friday: "TGIF coder! Still shipping features! 🎉",
    Saturday: "Weekend warrior! No rest for the passionate! ⚔️",
    Sunday: "Sunday funday with code! 🌟",
  };

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
            ⏰
          </motion.div>
        </StaggerItem>

        <StaggerItem className="text-center">
          <h2 className="text-2xl text-white/70 mb-4">Your most productive day was</h2>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="text-5xl md:text-7xl font-black text-white"
          >
            {mostProductiveDay}
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xl text-teal-300 mt-4"
          >
            {dayMessages[mostProductiveDay] || "Keep coding! 🎯"}
          </motion.p>
        </StaggerItem>

        <StaggerItem className="mt-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-lg text-white/70 mb-4 text-center">
              Your hottest month 🔥
            </h3>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, type: "spring" }}
              className="text-center"
            >
              <span className="text-4xl font-bold text-white">
                {topMonth?.[0] || "N/A"}
              </span>
              <p className="text-white/60 mt-2">
                {topMonth?.[1] || 0} contributions
              </p>
            </motion.div>
          </div>
        </StaggerItem>

        <StaggerItem className="mt-8">
          <div className="flex gap-4">
            {sortedMonths.slice(1, 3).map((month, index) => (
              <motion.div
                key={month[0]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + index * 0.2 }}
                className="bg-white/5 rounded-xl p-4 text-center"
              >
                <div className="text-lg font-semibold text-white/80">
                  #{index + 2} {month[0]}
                </div>
                <div className="text-sm text-white/50">
                  {month[1]} contributions
                </div>
              </motion.div>
            ))}
          </div>
        </StaggerItem>

        <StaggerItem className="mt-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-center"
          >
            <p className="text-white/60 text-lg">
              Your peak coding hours are when inspiration strikes! ✨
            </p>
          </motion.div>
        </StaggerItem>
      </StaggerContainer>
    </div>
  );
}
