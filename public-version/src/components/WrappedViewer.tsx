"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toPng } from "html-to-image";
import { WrappedData } from "@/types/stats";
import IntroSlide from "./slides/IntroSlide";
import ContributionsSlide from "./slides/ContributionsSlide";
import LanguagesSlide from "./slides/LanguagesSlide";
import RepositoriesSlide from "./slides/RepositoriesSlide";
import LeetCodeSlide from "./slides/LeetCodeSlide";
import CustomStatsSlide from "./slides/CustomStatsSlide";
import SummarySlide from "./slides/SummarySlide";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";

interface WrappedViewerProps {
  data: WrappedData;
  onReset: () => void;
}

export default function WrappedViewer({ data, onReset }: WrappedViewerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const exportRef = useRef<HTMLDivElement>(null);

  const { github, leetcode, custom, year } = data;

  // Build slides array dynamically based on available data
  const slides: { id: string; component: React.ReactNode }[] = [];

  if (github) {
    slides.push({
      id: "intro",
      component: <IntroSlide user={github.user} year={year} />,
    });
  }

  slides.push({
    id: "contributions",
    component: (
      <ContributionsSlide
        stats={custom}
        totalRepos={github?.repositories.length || 0}
      />
    ),
  });

  if (github && github.languages.length > 0) {
    slides.push({
      id: "languages",
      component: <LanguagesSlide languages={github.languages} />,
    });
  }

  if (github) {
    slides.push({
      id: "repositories",
      component: (
        <RepositoriesSlide
          repositories={github.topRepositories}
          totalStars={github.totalStars}
          totalForks={github.totalForks}
          totalRepos={github.repositories.length}
        />
      ),
    });
  }

  if (leetcode && leetcode.totalSolved > 0) {
    slides.push({
      id: "leetcode",
      component: <LeetCodeSlide stats={leetcode} />,
    });
  }

  // Only show custom stats slide if there's data
  const hasCustomData =
    custom.hackathonsAttended > 0 ||
    custom.hackathonWins > 0 ||
    custom.lyraConversations > 0 ||
    custom.coursesCompleted > 0 ||
    custom.certificationsEarned.length > 0 ||
    custom.coffeeCups > 0 ||
    custom.allNighters > 0;

  if (hasCustomData) {
    slides.push({
      id: "custom",
      component: <CustomStatsSlide stats={custom} />,
    });
  }

  slides.push({
    id: "summary",
    component: <SummarySlide data={data} onExport={handleExport} />,
  });

  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < slides.length) {
        setDirection(index > currentSlide ? "right" : "left");
        setCurrentSlide(index);
      }
    },
    [currentSlide, slides.length]
  );

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setDirection("right");
      setCurrentSlide((prev) => prev + 1);
    }
  }, [currentSlide, slides.length]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection("left");
      setCurrentSlide((prev) => prev - 1);
    }
  }, [currentSlide]);

  async function handleExport() {
    if (exportRef.current) {
      try {
        const dataUrl = await toPng(exportRef.current, {
          quality: 1,
          pixelRatio: 2,
        });

        const link = document.createElement("a");
        link.download = `cs-wrapped-${year}.png`;
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error("Failed to export image:", error);
      }
    }
  }

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "Escape") {
        onReset();
      }
    },
    [nextSlide, prevSlide, onReset]
  );

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-black"
      onClick={nextSlide}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Slide container */}
      <div ref={exportRef} className="w-full h-full">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            initial={{ opacity: 0, x: direction === "right" ? 300 : -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === "right" ? -300 : 300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full h-full"
          >
            {slides[currentSlide].component}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Home button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onReset();
        }}
        className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
      >
        <Home className="w-6 h-6 text-white" />
      </button>

      {/* Navigation arrows */}
      {currentSlide > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>
      )}

      {currentSlide < slides.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      )}

      {/* Progress dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={(e) => {
              e.stopPropagation();
              goToSlide(index);
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Keyboard hint */}
      <div className="absolute bottom-4 right-4 text-white/30 text-sm">
        Press → or tap to continue
      </div>
    </div>
  );
}
