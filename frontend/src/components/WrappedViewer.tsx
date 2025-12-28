"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toPng } from "html-to-image";
import { GitHubStats } from "@/types/github";
import { calculateLanguagePercentages } from "@/lib/github";
import IntroSlide from "./slides/IntroSlide";
import ContributionsSlide from "./slides/ContributionsSlide";
import LanguagesSlide from "./slides/LanguagesSlide";
import RepositoriesSlide from "./slides/RepositoriesSlide";
import ProductivitySlide from "./slides/ProductivitySlide";
import SummarySlide from "./slides/SummarySlide";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface WrappedViewerProps {
  stats: GitHubStats;
}

export default function WrappedViewer({ stats }: WrappedViewerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const exportRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollTime = useRef<number>(0);

  const year = new Date().getFullYear();
  const languages = calculateLanguagePercentages(stats.languages);

  const slides = [
    {
      id: "intro",
      component: <IntroSlide user={stats.user} year={year} />,
    },
    {
      id: "contributions",
      component: (
        <ContributionsSlide
          contributions={stats.contributions}
          longestStreak={stats.longestStreak}
          currentStreak={stats.currentStreak}
        />
      ),
    },
    {
      id: "languages",
      component: <LanguagesSlide languages={languages} />,
    },
    {
      id: "repositories",
      component: (
        <RepositoriesSlide
          repositories={stats.topRepositories}
          totalStars={stats.totalStars}
          totalForks={stats.totalForks}
          totalRepos={stats.repositories.length}
        />
      ),
    },
    {
      id: "productivity",
      component: (
        <ProductivitySlide
          mostProductiveDay={stats.mostProductiveDay}
          contributions={stats.contributions}
        />
      ),
    },
    {
      id: "summary",
      component: (
        <SummarySlide
          stats={stats}
          year={year}
          onExport={handleExport}
        />
      ),
    },
  ];

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

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    },
    [nextSlide, prevSlide]
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
        Scroll, press →, or tap to continue
      </div>
    </div>
  );
}
