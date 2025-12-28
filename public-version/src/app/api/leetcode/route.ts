import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        profile {
          ranking
          reputation
        }
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch LeetCode stats" },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data.data?.matchedUser) {
      return NextResponse.json(
        { error: "LeetCode user not found" },
        { status: 404 }
      );
    }

    const user = data.data.matchedUser;
    const submissions = user.submitStats.acSubmissionNum;

    const allCount =
      submissions.find((s: any) => s.difficulty === "All")?.count || 0;
    const easyCount =
      submissions.find((s: any) => s.difficulty === "Easy")?.count || 0;
    const mediumCount =
      submissions.find((s: any) => s.difficulty === "Medium")?.count || 0;
    const hardCount =
      submissions.find((s: any) => s.difficulty === "Hard")?.count || 0;

    return NextResponse.json({
      username: user.username,
      totalSolved: allCount,
      easySolved: easyCount,
      mediumSolved: mediumCount,
      hardSolved: hardCount,
      ranking: user.profile?.ranking || 0,
      reputation: user.profile?.reputation || 0,
    });
  } catch (error) {
    console.error("LeetCode API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch LeetCode stats" },
      { status: 500 }
    );
  }
}
