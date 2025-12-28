# CS Wrapped - Public Version 🌐

**Your Year in Code, No Login Required!**

This is the public-only version of CS Wrapped that uses the public GitHub API and allows manual entry of custom stats.

## Features

- ✨ **No Authentication Required** - Just enter any GitHub username
- 📊 **Public GitHub Stats** - Repos, stars, forks, languages
- 🧩 **LeetCode Integration** - Automatically fetch your LeetCode stats
- 🏆 **Codeforces Integration** - Automatically fetch your Codeforces rating & stats
- ✏️ **Manual Input** - Add commits, streaks, hackathons, and more
- 💾 **Local Storage** - Your data is saved in your browser
- 🎨 **Beautiful Animations** - Framer Motion transitions
- 📸 **Export & Share** - Download PNG or share on social media

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

1. **Enter your GitHub username** - We fetch your public repos and profile
2. **Add competitive programming profiles** (optional) - LeetCode and Codeforces
3. **Add custom stats** (optional) - Commits, hackathons, certifications, etc.
4. **View your Wrapped** - Animated slides showing your year in code
5. **Share it!** - Download as image or share on social media

## Supported Platforms

| Platform | Integration | Data Retrieved |
|----------|-------------|----------------|
| **GitHub** | Public API | Public repos, stars, forks, languages |
| **LeetCode** | GraphQL API | Problems solved (Easy/Medium/Hard), ranking, reputation |
| **Codeforces** | Public API | Rating, rank, contests, problems solved |
| Manual Input | Custom form | Commits, PRs, hackathons, certifications, and more |

## License

MIT License
