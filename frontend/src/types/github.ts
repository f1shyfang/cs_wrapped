export interface GitHubUser {
  login: string;
  name: string;
  avatarUrl: string;
  bio: string;
  company: string;
  location: string;
  followers: number;
  following: number;
  createdAt: string;
}

export interface ContributionDay {
  date: string;
  contributionCount: number;
  weekday: number;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionsCollection {
  totalCommitContributions: number;
  totalPullRequestContributions: number;
  totalIssueContributions: number;
  totalRepositoryContributions: number;
  restrictedContributionsCount: number;
  contributionCalendar: {
    totalContributions: number;
    weeks: ContributionWeek[];
  };
}

export interface Repository {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  createdAt: string;
  updatedAt: string;
  isPrivate: boolean;
  isFork: boolean;
}

export interface LanguageEdge {
  size: number;
  node: {
    name: string;
    color: string;
  };
}

export interface GitHubStats {
  user: GitHubUser;
  contributions: ContributionsCollection;
  repositories: Repository[];
  languages: LanguageEdge[];
  totalStars: number;
  totalForks: number;
  topRepositories: Repository[];
  mostProductiveDay: string;
  longestStreak: number;
  currentStreak: number;
}

export interface WrappedStats {
  github: GitHubStats;
  leetcode?: LeetCodeStats;
  wakatime?: WakaTimeStats;
  custom?: CustomStats;
}

export interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
}

export interface WakaTimeStats {
  totalSeconds: number;
  dailyAverage: number;
  languages: { name: string; percent: number; totalSeconds: number }[];
  editors: { name: string; percent: number }[];
  projects: { name: string; totalSeconds: number }[];
  bestDay: { date: string; totalSeconds: number };
}

export interface CustomStats {
  hackathonsAttended?: number;
  hackathonWins?: number;
  certificationsEarned?: string[];
  coursesCompleted?: number;
  lyraConversations?: number;
  coffeeCups?: number;
  allNighters?: number;
}
