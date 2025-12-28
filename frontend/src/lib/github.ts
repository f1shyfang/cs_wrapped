import { graphql } from "@octokit/graphql";
import {
  GitHubStats,
  ContributionsCollection,
  Repository,
  LanguageEdge,
  ContributionDay,
} from "@/types/github";

const GITHUB_STATS_QUERY = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      login
      name
      avatarUrl
      bio
      company
      location
      followers {
        totalCount
      }
      following {
        totalCount
      }
      createdAt
      contributionsCollection(from: $from, to: $to) {
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        totalRepositoryContributions
        restrictedContributionsCount
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              weekday
            }
          }
        }
      }
      repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: UPDATED_AT, direction: DESC}) {
        nodes {
          name
          description
          url
          stargazerCount
          forkCount
          primaryLanguage {
            name
            color
          }
          createdAt
          updatedAt
          isPrivate
          isFork
        }
      }
    }
  }
`;

const LANGUAGES_QUERY = `
  query($username: String!) {
    user(login: $username) {
      repositories(first: 100, ownerAffiliations: OWNER) {
        nodes {
          languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
            edges {
              size
              node {
                name
                color
              }
            }
          }
        }
      }
    }
  }
`;

export async function fetchGitHubStats(
  accessToken: string,
  username: string
): Promise<GitHubStats> {
  const graphqlWithAuth = graphql.defaults({
    headers: {
      authorization: `token ${accessToken}`,
    },
  });

  // Get the date range for the current year
  const now = new Date();
  const yearStart = new Date(now.getFullYear(), 0, 1);
  const from = yearStart.toISOString();
  const to = now.toISOString();

  // Fetch main stats
  const mainData: any = await graphqlWithAuth(GITHUB_STATS_QUERY, {
    username,
    from,
    to,
  });

  // Fetch languages separately
  const languagesData: any = await graphqlWithAuth(LANGUAGES_QUERY, {
    username,
  });

  const user = mainData.user;
  const repositories: Repository[] = user.repositories.nodes;

  // Aggregate languages across all repos
  const languageMap = new Map<
    string,
    { size: number; name: string; color: string }
  >();
  for (const repo of languagesData.user.repositories.nodes) {
    for (const edge of repo.languages.edges) {
      const existing = languageMap.get(edge.node.name);
      if (existing) {
        existing.size += edge.size;
      } else {
        languageMap.set(edge.node.name, {
          size: edge.size,
          name: edge.node.name,
          color: edge.node.color,
        });
      }
    }
  }

  const languages: LanguageEdge[] = Array.from(languageMap.values())
    .sort((a, b) => b.size - a.size)
    .slice(0, 10)
    .map((lang) => ({
      size: lang.size,
      node: { name: lang.name, color: lang.color },
    }));

  // Calculate totals
  const totalStars = repositories.reduce((sum, r) => sum + r.stargazerCount, 0);
  const totalForks = repositories.reduce((sum, r) => sum + r.forkCount, 0);

  // Get top repositories by stars
  const topRepositories = [...repositories]
    .filter((r) => !r.isFork)
    .sort((a, b) => b.stargazerCount - a.stargazerCount)
    .slice(0, 5);

  // Calculate most productive day
  const contributions: ContributionsCollection =
    user.contributionsCollection;
  const allDays: ContributionDay[] =
    contributions.contributionCalendar.weeks.flatMap(
      (w) => w.contributionDays
    );
  
  const dayTotals: Record<string, number> = {};
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  for (const day of allDays) {
    const dayName = dayNames[day.weekday];
    dayTotals[dayName] = (dayTotals[dayName] || 0) + day.contributionCount;
  }
  
  const mostProductiveDay = Object.entries(dayTotals).sort(
    (a, b) => b[1] - a[1]
  )[0]?.[0] || "Unknown";

  // Calculate streaks
  const { longestStreak, currentStreak } = calculateStreaks(allDays);

  return {
    user: {
      login: user.login,
      name: user.name,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
      company: user.company,
      location: user.location,
      followers: user.followers.totalCount,
      following: user.following.totalCount,
      createdAt: user.createdAt,
    },
    contributions,
    repositories,
    languages,
    totalStars,
    totalForks,
    topRepositories,
    mostProductiveDay,
    longestStreak,
    currentStreak,
  };
}

function calculateStreaks(days: ContributionDay[]): {
  longestStreak: number;
  currentStreak: number;
} {
  // Sort days by date
  const sortedDays = [...days].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let longestStreak = 0;
  let currentStreak = 0;
  let tempStreak = 0;

  for (let i = 0; i < sortedDays.length; i++) {
    if (sortedDays[i].contributionCount > 0) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  // Calculate current streak (from today backwards)
  for (let i = sortedDays.length - 1; i >= 0; i--) {
    if (sortedDays[i].contributionCount > 0) {
      currentStreak++;
    } else {
      break;
    }
  }

  return { longestStreak, currentStreak };
}

export function calculateLanguagePercentages(
  languages: LanguageEdge[]
): { name: string; color: string; percentage: number }[] {
  const total = languages.reduce((sum, l) => sum + l.size, 0);
  return languages.map((l) => ({
    name: l.node.name,
    color: l.node.color,
    percentage: Math.round((l.size / total) * 100),
  }));
}
