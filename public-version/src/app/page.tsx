"use client";

import { useState, useEffect } from "react";
import UsernameInput from "@/components/UsernameInput";
import CustomStatsForm from "@/components/CustomStatsForm";
import WrappedViewer from "@/components/WrappedViewer";
import { fetchPublicGitHubStats } from "@/lib/github-public";
import {
  saveWrappedData,
  loadWrappedData,
  saveCustomStats,
  loadCustomStats,
} from "@/lib/storage";
import {
  WrappedData,
  PublicGitHubStats,
  CustomStats,
  LeetCodeStats,
} from "@/types/stats";

type AppState = "input" | "customize" | "view";

export default function Home() {
  const [state, setState] = useState<AppState>("input");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [githubStats, setGithubStats] = useState<PublicGitHubStats | null>(null);
  const [wrappedData, setWrappedData] = useState<WrappedData | null>(null);

  useEffect(() => {
    const saved = loadWrappedData();
    if (saved) {
      setWrappedData(saved);
      setGithubStats(saved.github);
    }
  }, []);

  const handleUsernameSubmit = async (username: string) => {
    setLoading(true);
    setError(null);

    try {
      const stats = await fetchPublicGitHubStats(username);
      setGithubStats(stats);
      setState("customize");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch GitHub data"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCustomStatsSave = (
    custom: CustomStats,
    leetcode: LeetCodeStats | null
  ) => {
    const data: WrappedData = {
      github: githubStats,
      leetcode,
      custom,
      year: new Date().getFullYear(),
    };

    setWrappedData(data);
    saveWrappedData(data);
    saveCustomStats(custom);
    setState("view");
  };

  const handleSkipCustomization = () => {
    const data: WrappedData = {
      github: githubStats,
      leetcode: null,
      custom: loadCustomStats(),
      year: new Date().getFullYear(),
    };

    setWrappedData(data);
    saveWrappedData(data);
    setState("view");
  };

  const handleReset = () => {
    setState("input");
    setGithubStats(null);
    setWrappedData(null);
    setError(null);
  };

  if (state === "view" && wrappedData) {
    return <WrappedViewer data={wrappedData} onReset={handleReset} />;
  }

  if (state === "customize") {
    return (
      <CustomStatsForm
        initialStats={loadCustomStats()}
        initialLeetCode={wrappedData?.leetcode || null}
        onSave={handleCustomStatsSave}
        onSkip={handleSkipCustomization}
      />
    );
  }

  return (
    <UsernameInput
      onSubmit={handleUsernameSubmit}
      loading={loading}
      error={error}
    />
  );
}
