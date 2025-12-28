"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  currentSlide: number;
  totalSlides: number;
  onSlideClick?: (index: number) => void;
}

export default function ProgressBar({ currentSlide, totalSlides, onSlideClick }: ProgressBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex gap-1 p-4">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <div
          key={index}
          className="h-1 flex-1 rounded-full bg-foreground/20 overflow-hidden cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onSlideClick?.(index);
          }}
        >
          <motion.div
            className="h-full gradient-bg-pink-orange"
            initial={{ width: "0%" }}
            animate={{
              width: index < currentSlide ? "100%" : index === currentSlide ? "100%" : "0%",
            }}
            transition={{
              duration: index === currentSlide ? 5 : 0.3,
              ease: index === currentSlide ? "linear" : "easeOut",
            }}
          />
        </div>
      ))}
    </div>
  );
}
