"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toPng } from "html-to-image";
import { WrappedData } from "@/types/stats";
import IntroSlide from "./slides/IntroSlide";
import ContributionsSlide from "./slides/ContributionsSlide";
import LanguagesSlide from "./slides/LanguagesSlide";
import RepositoriesSlide from "./slides/RepositoriesSlide";
import LeetCodeSlide from "./slides/LeetCodeSlide";
import CodeforcesSlide from "./slides/CodeforcesSlide";
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
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollTime = useRef<number>(0);

  const { github, leetcode, codeforces, custom, year } = data;

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

  if (codeforces && codeforces.problemsSolved > 0) {
    slides.push({
      id: "codeforces",
      component: <CodeforcesSlide stats={codeforces} />,
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
          skipFonts: true, // Skip web fonts to avoid parsing errors
          backgroundColor: '#000000',
        });

        const link = document.createElement("a");
        link.download = `cs-wrapped-${year}.png`;
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error("Failed to export image:", error);
        alert("Failed to export image. Please try again.");
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

  // Handle scroll navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      
      // Debounce scroll events (minimum 800ms between slides)
      if (now - lastScrollTime.current < 800) {
        return;
      }

      // Clear any pending timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set a timeout to handle the scroll
      scrollTimeoutRef.current = setTimeout(() => {
        if (e.deltaY > 0) {
          // Scrolling down - next slide
          if (currentSlide < slides.length - 1) {
            setDirection("right");
            setCurrentSlide((prev) => prev + 1);
            lastScrollTime.current = Date.now();
          }
        } else if (e.deltaY < 0) {
          // Scrolling up - previous slide
          if (currentSlide > 0) {
            setDirection("left");
            setCurrentSlide((prev) => prev - 1);
            lastScrollTime.current = Date.now();
          }
        }
      }, 50);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [currentSlide, slides.length]);

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
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.stopPropagation();
          onReset();
        }}
        className="absolute top-6 left-6 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 transition-all z-10 shadow-lg"
      >
        <Home className="w-6 h-6 text-white" />
      </motion.button>

      {/* Navigation arrows */}
      {currentSlide > 0 && (
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 transition-all shadow-lg"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </motion.button>
      )}

      {currentSlide < slides.length - 1 && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 transition-all shadow-lg"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </motion.button>
      )}

      {/* Progress dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 bg-black/30 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
        {slides.map((slide, index) => (
          <motion.button
            key={slide.id}
            onClick={(e) => {
              e.stopPropagation();
              goToSlide(index);
            }}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white scale-150 shadow-lg shadow-white/50"
                : "bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Keyboard hint */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 right-6 text-white/40 text-sm bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10"
      >
        Scroll, press →, or tap to continue
      </motion.div>
    </div>
  );
}
