import { GitHubUser, Repository, PublicGitHubStats } from "@/types/stats";

const GITHUB_API = "https://api.github.com";

interface GitHubEvent {
  type: string;
  created_at: string;
  payload: {
    commits?: Array<{ sha: string }>;
    action?: string;
  };
}

export async function fetchPublicGitHubStats(
  username: string
): Promise<PublicGitHubStats> {
  // Fetch user profile
  const userResponse = await fetch(`${GITHUB_API}/users/${username}`);
  if (!userResponse.ok) {
    throw new Error(
      userResponse.status === 404
        ? "User not found"
        : "Failed to fetch user data"
    );
  }
  const user: GitHubUser = await userResponse.json();

  // Fetch repositories (public only)
  const reposResponse = await fetch(
    `${GITHUB_API}/users/${username}/repos?per_page=100&sort=updated`
  );
  if (!reposResponse.ok) {
    throw new Error("Failed to fetch repositories");
  }
  const repositories: Repository[] = await reposResponse.json();

  // Fetch events to count push events and PRs (last 90 days max from API)
  // Note: GitHub Events API doesn't include commit counts, so we count push events
  let totalPushEvents = 0;
  let totalPRs = 0;
  
  try {
    // GitHub Events API returns up to 10 pages of 30 events each (300 events max)
    // Fetch multiple pages to get more data
    const currentYear = new Date().getFullYear();
    
    for (let page = 1; page <= 3; page++) {
      const eventsResponse = await fetch(
        `${GITHUB_API}/users/${username}/events?per_page=100&page=${page}`
      );
      if (!eventsResponse.ok) break;
      
      const events: GitHubEvent[] = await eventsResponse.json();
      if (events.length === 0) break;
      
      for (const event of events) {
        const eventYear = new Date(event.created_at).getFullYear();
        if (eventYear === currentYear) {
          if (event.type === "PushEvent") {
            // Each push event typically represents one or more commits
            totalPushEvents += 1;
          } else if (event.type === "PullRequestEvent" && event.payload.action === "opened") {
            totalPRs += 1;
          }
        }
      }
    }
  } catch {
    // Events API failed, continue without commit data
    console.warn("Failed to fetch events data");
  }

  // Filter out forks and calculate stats
  const ownRepos = repositories.filter((repo) => !repo.fork);

  // Calculate language breakdown
  const languageCounts: Record<string, number> = {};
  for (const repo of ownRepos) {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
    }
  }

  const totalWithLanguage = Object.values(languageCounts).reduce(
    (a, b) => a + b,
    0
  );
  const languages = Object.entries(languageCounts)
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / totalWithLanguage) * 100),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Calculate totals
  const totalStars = ownRepos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );
  const totalForks = ownRepos.reduce((sum, repo) => sum + repo.forks_count, 0);

  // Get top repositories by stars
  const topRepositories = [...ownRepos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5);

  return {
    user,
    repositories: ownRepos,
    languages,
    totalStars,
    totalForks,
    topRepositories,
    totalCommits: totalPushEvents, // Note: This is push events, not individual commits
    totalPRs,
  };
}

// Language colors (common ones)
export const languageColors: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Vue: "#41b883",
  Shell: "#89e051",
  Lua: "#000080",
  R: "#198CE7",
  Scala: "#c22d40",
  Haskell: "#5e5086",
  Elixir: "#6e4a7e",
  Clojure: "#db5855",
  Julia: "#a270ba",
};

export function getLanguageColor(language: string): string {
  return languageColors[language] || "#6366f1";
}
