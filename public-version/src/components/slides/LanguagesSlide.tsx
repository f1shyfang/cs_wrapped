"use client";

import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "../animations/StaggerAnimations";
import LanguageChart from "../animations/LanguageChart";
import ProgressBar from "../animations/ProgressBar";
import { getLanguageColor } from "@/lib/github-public";

interface LanguagesSlideProps {
  languages: { name: string; count: number; percentage: number }[];
}

export default function LanguagesSlide({ languages }: LanguagesSlideProps) {
  const topLanguage = languages[0];

  const languagesWithColors = languages.map((lang) => ({
    ...lang,
    color: getLanguageColor(lang.name),
  }));

  if (!topLanguage) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-8">
        <StaggerContainer>
          <StaggerItem>
            <div className="text-8xl mb-4">💻</div>
          </StaggerItem>
          <StaggerItem className="text-center">
            <h2 className="text-2xl text-white/70">No language data available</h2>
            <p className="text-white/50 mt-2">Add some code to your repos!</p>
          </StaggerItem>
        </StaggerContainer>
      </div>
    );
  }

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
              style={{ backgroundColor: getLanguageColor(topLanguage.name) }}
            />
            <span className="text-5xl md:text-7xl font-black text-white">
              {topLanguage.name}
            </span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xl text-white/60 mt-4"
          >
            {topLanguage.percentage}% of your repos
          </motion.p>
        </StaggerItem>

        <StaggerItem className="mt-12 w-full max-w-md">
          <h3 className="text-xl text-white/70 mb-6 text-center">
            Language breakdown
          </h3>
          <LanguageChart languages={languagesWithColors} />
        </StaggerItem>

        <StaggerItem className="mt-8 w-full max-w-md">
          {languagesWithColors.slice(0, 5).map((lang, index) => (
            <ProgressBar
              key={lang.name}
              label={lang.name}
              percentage={lang.percentage}
              color={lang.color}
              delay={0.2 + index * 0.1}
            />
          ))}
        </StaggerItem>
      </StaggerContainer>
    </div>
  );
}
