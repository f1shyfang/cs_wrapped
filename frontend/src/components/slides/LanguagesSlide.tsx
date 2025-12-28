"use client";

import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "../animations/StatSlide";
import LanguageChart from "../animations/LanguageChart";
import ProgressBar from "../animations/ProgressBar";

interface LanguagesSlideProps {
  languages: { name: string; color: string; percentage: number }[];
}

export default function LanguagesSlide({ languages }: LanguagesSlideProps) {
  const topLanguage = languages[0];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-8">
      <StaggerContainer>
        <StaggerItem>
          <motion.div
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-8xl mb-4"
          >
            💻
          </motion.div>
        </StaggerItem>

        <StaggerItem className="text-center">
          <h2 className="text-2xl text-white/70 mb-4">Your top language was</h2>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="flex items-center justify-center gap-4"
          >
            <div
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: topLanguage?.color || "#6366f1" }}
            />
            <span className="text-5xl md:text-7xl font-black text-white">
              {topLanguage?.name || "Unknown"}
            </span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xl text-white/60 mt-4"
          >
            {topLanguage?.percentage}% of your code
          </motion.p>
        </StaggerItem>

        <StaggerItem className="mt-12 w-full max-w-md">
          <h3 className="text-xl text-white/70 mb-6 text-center">
            Language breakdown
          </h3>
          <LanguageChart languages={languages} />
        </StaggerItem>

        <StaggerItem className="mt-8 w-full max-w-md">
          {languages.slice(0, 5).map((lang, index) => (
            <ProgressBar
              key={lang.name}
              label={lang.name}
              percentage={lang.percentage}
              color={lang.color || "#6366f1"}
              delay={0.2 + index * 0.1}
            />
          ))}
        </StaggerItem>
      </StaggerContainer>
    </div>
  );
}
