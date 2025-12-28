# CS Wrapped 🎉

**Your Year in Code, Beautifully Visualized**

A Spotify Wrapped-style web application that creates beautiful, animated visualizations of your coding year using GitHub data.

## Features

- 🔐 **GitHub OAuth Integration** - Securely connect your GitHub account
- 📊 **Contribution Analytics** - Total commits, PRs, issues, and streaks
- 💻 **Language Breakdown** - Beautiful pie chart of your most-used languages
- 🏆 **Top Repositories** - Highlight your best projects
- ⏰ **Productivity Insights** - Most productive day and month
- 🎨 **Stunning Animations** - Smooth Framer Motion transitions
- 📸 **Export & Share** - Download as PNG or share on social media

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Authentication**: NextAuth.js
- **GitHub API**: Octokit GraphQL
- **Export**: html-to-image

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- GitHub OAuth App credentials

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/cs_wrapped.git
cd cs_wrapped
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the details:
   - **Application name**: CS Wrapped
   - **Homepage URL**: http://localhost:3000
   - **Authorization callback URL**: http://localhost:3000/api/auth/callback/github
4. Save your Client ID and Client Secret

### 4. Configure environment variables

Copy the example env file and fill in your credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_here
```

Generate a random secret for `NEXTAUTH_SECRET`:

```bash
openssl rand -base64 32
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts  # NextAuth handler
│   │   └── stats/route.ts               # GitHub stats API
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── animations/
│   │   ├── ConfettiEffect.tsx
│   │   ├── ContributionGraph.tsx
│   │   ├── CounterAnimation.tsx
│   │   ├── LanguageChart.tsx
│   │   ├── ProgressBar.tsx
│   │   └── StatSlide.tsx
│   ├── slides/
│   │   ├── ContributionsSlide.tsx
│   │   ├── IntroSlide.tsx
│   │   ├── LanguagesSlide.tsx
│   │   ├── ProductivitySlide.tsx
│   │   ├── RepositoriesSlide.tsx
│   │   └── SummarySlide.tsx
│   ├── CustomStatsForm.tsx
│   ├── HomePage.tsx
│   ├── LoginButton.tsx
│   ├── Providers.tsx
│   └── WrappedViewer.tsx
├── lib/
│   ├── auth.ts                          # NextAuth configuration
│   └── github.ts                        # GitHub API functions
└── types/
    └── github.ts                        # TypeScript interfaces
```

## Customization

### Adding Custom Stats

You can extend the wrapped experience with custom stats like:
- LeetCode problems solved
- Hackathon attendance
- Certifications earned
- Conversations with AI assistants (Lyra!)

Edit `src/types/github.ts` to add new stat types, then create corresponding slide components.

### Adding New Slides

1. Create a new slide component in `src/components/slides/`
2. Add it to the `slides` array in `src/components/WrappedViewer.tsx`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add your environment variables
4. Update your GitHub OAuth App callback URL to your production domain

## License

MIT License
