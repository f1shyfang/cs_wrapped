"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

interface ConfettiEffectProps {
  trigger: boolean;
}

export default function ConfettiEffect({ trigger }: ConfettiEffectProps) {
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (trigger && !hasTriggered.current) {
      hasTriggered.current = true;

      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ["#a855f7", "#6366f1", "#ec4899", "#14b8a6", "#f59e0b"],
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ["#a855f7", "#6366f1", "#ec4899", "#14b8a6", "#f59e0b"],
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [trigger]);

  return null;
}

export function FireworksEffect({ trigger }: ConfettiEffectProps) {
  useEffect(() => {
    if (trigger) {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const x = Math.random();
        const y = Math.random() * 0.5;

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { x, y },
          colors: ["#ff0", "#ff6", "#fa0", "#f60", "#f00"],
        });
      }, 400);

      return () => clearInterval(interval);
    }
  }, [trigger]);

  return null;
}
