/**
 * Fetch public data from competitive programming platforms
 */

export interface LeetCodePublicStats {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  reputation: number;
}

export interface CodeforcesStats {
  username: string;
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  contribution: number;
  contestsParticipated: number;
  problemsSolved: number;
}

/**
 * Fetch LeetCode stats via our API route (avoids CORS issues)
 */
export async function fetchLeetCodeStats(
  username: string
): Promise<LeetCodePublicStats> {
  const response = await fetch(`/api/leetcode?username=${encodeURIComponent(username)}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch LeetCode stats");
  }

  return response.json();
}

/**
 * Fetch Codeforces stats via our API route (avoids CORS issues)
 */
export async function fetchCodeforcesStats(
  handle: string
): Promise<CodeforcesStats> {
  const response = await fetch(`/api/codeforces?handle=${encodeURIComponent(handle)}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch Codeforces stats");
  }

  return response.json();
}
