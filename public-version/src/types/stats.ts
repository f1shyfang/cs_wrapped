export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
}

export interface Repository {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  created_at: string;
  updated_at: string;
  fork: boolean;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface PublicGitHubStats {
  user: GitHubUser;
  repositories: Repository[];
  languages: { name: string; count: number; percentage: number }[];
  totalStars: number;
  totalForks: number;
  topRepositories: Repository[];
}

export interface LeetCodeStats {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
}

export interface CustomStats {
  hackathonsAttended: number;
  hackathonWins: number;
  certificationsEarned: string[];
  coursesCompleted: number;
  lyraConversations: number;
  coffeeCups: number;
  allNighters: number;
  totalCommits: number;
  totalPRs: number;
  longestStreak: number;
  favoriteProject: string;
}

export interface WrappedData {
  github: PublicGitHubStats | null;
  leetcode: LeetCodeStats | null;
  custom: CustomStats;
  year: number;
}

export const defaultCustomStats: CustomStats = {
  hackathonsAttended: 0,
  hackathonWins: 0,
  certificationsEarned: [],
  coursesCompleted: 0,
  lyraConversations: 0,
  coffeeCups: 0,
  allNighters: 0,
  totalCommits: 0,
  totalPRs: 0,
  longestStreak: 0,
  favoriteProject: "",
};
