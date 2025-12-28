"use client";

import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

interface Language {
  name: string;
  count: number;
  percentage: number;
}

interface LanguagesSlideProps {
  languages: Language[];
}

const languageColors: Record<string, { bg: string; text: string }> = {
  TypeScript: { bg: "gradient-bg-blue-cyan", text: "text-neon-blue" },
  JavaScript: { bg: "gradient-bg-orange-yellow", text: "text-neon-yellow" },
  Python: { bg: "gradient-bg-blue-cyan", text: "text-neon-cyan" },
  Rust: { bg: "gradient-bg-pink-orange", text: "text-neon-orange" },
  Go: { bg: "gradient-bg-blue-cyan", text: "text-neon-cyan" },
  Java: { bg: "gradient-bg-pink-orange", text: "text-neon-orange" },
  "C++": { bg: "gradient-bg-purple-pink", text: "text-neon-pink" },
  C: { bg: "gradient-bg-purple-blue", text: "text-neon-purple" },
  Ruby: { bg: "gradient-bg-pink-orange", text: "text-neon-pink" },
  PHP: { bg: "gradient-bg-purple-pink", text: "text-neon-purple" },
  Swift: { bg: "gradient-bg-pink-orange", text: "text-neon-orange" },
  Kotlin: { bg: "gradient-bg-purple-pink", text: "text-neon-purple" },
  default: { bg: "gradient-bg-purple-pink", text: "text-neon-purple" },
};

export default function LanguagesSlide({ languages }: LanguagesSlideProps) {
  const topLanguage = languages[0];
  const otherLanguages = languages.slice(1, 5);

  const colors = languageColors[topLanguage?.name] || languageColors.default;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 via-background to-neon-purple/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Floating code icons */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${10 + i * 20}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        >
          <Code2 className="h-5 w-5 text-neon-blue/30" />
        </motion.div>
      ))}

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 text-lg uppercase tracking-widest text-muted-foreground"
      >
        Your top language
      </motion.p>

      {/* Main language */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
        className="relative z-10 my-8 flex flex-col items-center"
      >
        <motion.span
          className={`text-5xl md:text-7xl font-black ${colors.text}`}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {topLanguage?.name || "Unknown"}
        </motion.span>
        <span className="text-xl text-muted-foreground mt-4">
          {topLanguage?.percentage.toFixed(0)}% of your code
        </span>
      </motion.div>

      {/* Language bar visualization */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="relative z-10 w-full max-w-md h-4 rounded-full overflow-hidden flex"
      >
        {languages.slice(0, 5).map((lang, i) => {
          const langColors = languageColors[lang.name] || languageColors.default;
          return (
            <motion.div
              key={lang.name}
              className={langColors.bg}
              initial={{ width: 0 }}
              animate={{ width: `${lang.percentage}%` }}
              transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
            />
          );
        })}
      </motion.div>

      {/* Other languages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="relative z-10 mt-10 flex flex-wrap justify-center gap-3"
      >
        {otherLanguages.map((lang, i) => {
          const langColors = languageColors[lang.name] || languageColors.default;
          return (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 + i * 0.1 }}
              className={`px-4 py-2 rounded-full bg-foreground/10 border border-foreground/20`}
            >
              <span className={`font-semibold ${langColors.text}`}>{lang.name}</span>
              <span className="text-muted-foreground ml-2">{lang.percentage.toFixed(0)}%</span>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="relative z-10 mt-10 text-center text-muted-foreground"
      >
        {topLanguage?.name === "TypeScript"
          ? "Type safety enthusiast! 💙"
          : topLanguage?.name === "Python"
          ? "Pythonista vibes! 🐍"
          : topLanguage?.name === "Rust"
          ? "Memory safety first! 🦀"
          : "Polyglot developer! 🌍"}
      </motion.p>
    </div>
  );
}
