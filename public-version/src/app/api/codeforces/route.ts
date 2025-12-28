import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const handle = searchParams.get("handle");

  if (!handle) {
    return NextResponse.json(
      { error: "Handle is required" },
      { status: 400 }
    );
  }

  try {
    // Fetch user info
    const userResponse = await fetch(
      `https://codeforces.com/api/user.info?handles=${handle}`
    );

    if (!userResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch Codeforces user info" },
        { status: userResponse.status }
      );
    }

    const userData = await userResponse.json();

    if (userData.status !== "OK" || !userData.result?.[0]) {
      return NextResponse.json(
        { error: "Codeforces user not found" },
        { status: 404 }
      );
    }

    const user = userData.result[0];

    // Fetch user submissions to count problems solved
    let problemsSolved = 0;
    let contestsParticipated = 0;

    try {
      const submissionsResponse = await fetch(
        `https://codeforces.com/api/user.status?handle=${handle}&from=1&count=10000`
      );

      if (submissionsResponse.ok) {
        const submissionsData = await submissionsResponse.json();
        if (submissionsData.status === "OK") {
          const solvedProblems = new Set<string>();
          const contests = new Set<number>();

          submissionsData.result.forEach((submission: any) => {
            if (submission.verdict === "OK") {
              const problemId = `${submission.problem.contestId}-${submission.problem.index}`;
              solvedProblems.add(problemId);
            }
            if (
              submission.author.participantType === "CONTESTANT" &&
              submission.problem.contestId
            ) {
              contests.add(submission.problem.contestId);
            }
          });

          problemsSolved = solvedProblems.size;
          contestsParticipated = contests.size;
        }
      }
    } catch (err) {
      console.error("Error fetching submissions:", err);
      // Continue with basic user data
    }

    return NextResponse.json({
      username: user.handle,
      handle: user.handle,
      rating: user.rating || 0,
      maxRating: user.maxRating || 0,
      rank: user.rank || "unrated",
      maxRank: user.maxRank || "unrated",
      contribution: user.contribution || 0,
      contestsParticipated,
      problemsSolved,
    });
  } catch (error) {
    console.error("Codeforces API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Codeforces stats" },
      { status: 500 }
    );
  }
}
