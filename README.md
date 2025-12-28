# CS Wrapped 🎉

**Your Year in Code, Beautifully Visualized**

A Spotify Wrapped-style web application that creates beautiful, animated visualizations of your coding year.

## Project Structure

```
cs_wrapped/
├── frontend/         # OAuth-based version (requires GitHub login)
│   └── ...           # Full access to private repos & contribution data
│
└── public-version/   # Public API version (no login required)
    └── ...           # Uses public GitHub data + manual input
```

## Versions

### 🔐 Frontend (OAuth Version)
Full-featured version that requires GitHub OAuth authentication.
- Access to private repository data
- Full contribution graph from GitHub API
- Accurate commit counts and streaks

**Setup:**
```bash
cd frontend
npm install
# Configure .env.local with GitHub OAuth credentials
npm run dev
```

### 🌐 Public Version (No Login Required)
Lightweight version that uses only public GitHub API.
- No authentication needed
- Enter any GitHub username
- Add custom stats manually (commits, LeetCode, hackathons, etc.)
- Data saved in browser localStorage

**Setup:**
```bash
cd public-version
npm install
npm run dev --port 3001
```

## Features

Both versions include:
- 📊 **Contribution Analytics** - Commits, PRs, repos
- 💻 **Language Breakdown** - Beautiful pie chart visualization
- 🏆 **Top Repositories** - Your most starred projects
- 🎨 **Stunning Animations** - Smooth Framer Motion transitions
- 📸 **Export & Share** - Download as PNG or share on social media

Public version also supports:
- 🧩 **LeetCode Stats** - Manual entry of problems solved
- 🏆 **Hackathon Stats** - Track attendance and wins
- 💬 **Lyra Conversations** - AI assistant usage
- 📚 **Courses & Certifications** - Learning achievements
- ☕ **Fun Stats** - Coffee cups, all-nighters

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Export**: html-to-image

## License

MIT License
