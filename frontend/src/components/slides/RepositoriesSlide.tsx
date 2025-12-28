"use client";

import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "../animations/StatSlide";
import CounterAnimation from "../animations/CounterAnimation";
import { Repository } from "@/types/github";
import { Star, GitFork, ExternalLink } from "lucide-react";

interface RepositoriesSlideProps {
  repositories: Repository[];
  totalStars: number;
  totalForks: number;
  totalRepos: number;
}

export default function RepositoriesSlide({
  repositories,
  totalStars,
  totalForks,
  totalRepos,
}: RepositoriesSlideProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 p-8">
      <StaggerContainer>
        <StaggerItem>
          <motion.div
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-8xl mb-4"
          >
            🏆
          </motion.div>
        </StaggerItem>

        <StaggerItem className="text-center">
          <h2 className="text-2xl text-white/70 mb-2">You worked on</h2>
          <div className="text-6xl md:text-8xl font-black text-white">
            <CounterAnimation value={totalRepos} duration={2} />
          </div>
          <p className="text-2xl text-white/70 mt-2">repositories</p>
        </StaggerItem>

        <StaggerItem className="mt-8">
          <div className="flex gap-8 justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="flex items-center gap-2 text-yellow-400"
            >
              <Star className="w-8 h-8 fill-current" />
              <span className="text-3xl font-bold">
                <CounterAnimation value={totalStars} duration={1.5} />
              </span>
              <span className="text-white/60">stars earned</span>
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
              className="flex items-center gap-2 text-cyan-400"
            >
              <GitFork className="w-8 h-8" />
              <span className="text-3xl font-bold">
                <CounterAnimation value={totalForks} duration={1.5} />
              </span>
              <span className="text-white/60">forks</span>
            </motion.div>
          </div>
        </StaggerItem>

        <StaggerItem className="mt-12 w-full max-w-2xl">
          <h3 className="text-xl text-white/70 mb-6 text-center">
            Top Repositories
          </h3>
          <div className="space-y-4">
            {repositories.slice(0, 5).map((repo, index) => (
              <motion.a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + index * 0.15 }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-white/40">
                    #{index + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-white">
                        {repo.name}
                      </span>
                      {repo.primaryLanguage && (
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: repo.primaryLanguage.color,
                          }}
                        />
                      )}
                    </div>
                    <p className="text-sm text-white/60 line-clamp-1">
                      {repo.description || "No description"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{repo.stargazerCount}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white/80 transition-colors" />
                </div>
              </motion.a>
            ))}
          </div>
        </StaggerItem>
      </StaggerContainer>
    </div>
  );
}
