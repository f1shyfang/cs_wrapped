"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface StatSlideProps {
  children: ReactNode;
  isActive: boolean;
  direction?: "left" | "right";
  gradient?: string;
}

const slideVariants = {
  enter: (direction: "left" | "right") => ({
    x: direction === "right" ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: "left" | "right") => ({
    zIndex: 0,
    x: direction === "left" ? 1000 : -1000,
    opacity: 0,
  }),
};

export default function StatSlide({
  children,
  isActive,
  direction = "right",
  gradient = "from-purple-900 via-violet-900 to-indigo-900",
}: StatSlideProps) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      {isActive && (
        <motion.div
          key="slide"
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className={`absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-br ${gradient}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Staggered container for child animations
export function StaggerContainer({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
      className="flex flex-col items-center"
    >
      {children}
    </motion.div>
  );
}

// Individual stagger item
export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
