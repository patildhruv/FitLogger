# PappaFit Logger

A fitness habit tracker PWA for daily activity logging, built with React 18 + Vite.

## Tech Stack
- **React 18** + **Vite 5** (JSX, no TypeScript)
- **canvas-confetti** for celebration animations
- **html2canvas** for shareable screenshot cards
- **vite-plugin-pwa** for offline support + installability
- All inline styles with CSS custom properties for dark mode
- localStorage for all data persistence

## Project Structure
```
src/
  main.jsx                    # Entry point, wraps App in ActivitiesProvider
  App.jsx                     # Main shell: splash, header, tabs, stats row
  data/
    activities.js             # DEFAULT_ACTIVITIES array (5 built-in)
  hooks/
    useActivities.jsx         # React Context for dynamic activities (add/remove/reset)
    useLogs.js                # Activity logs CRUD + localStorage persistence
    useTimer.js               # Timer with pause/resume, persists across refresh
    useInstallPrompt.js       # PWA install prompt (Android) / instructions (iOS)
  components/
    TabBar.jsx                # 3 tabs: Today, Monthly, History
    Timer.jsx                 # Active timer display with pause/resume/stop/cancel
    ActivityButtons.jsx       # Grid of activity buttons to start timer
    ManualLogger.jsx          # +/- minute input mode with presets (15/30/45/60)
    TodayLog.jsx              # Today's activities, editable note, share button, edit/delete
    WeeklyBarChart.jsx        # Scrollable 30-day bar chart (SVG)
    ActivityDonut.jsx         # Monthly activity distribution donut (SVG)
    Calendar.jsx              # Monthly calendar grid with day selection
    DayCell.jsx               # Individual calendar day cell
    Summary.jsx               # Monthly progress bars per activity
    MonthlyView.jsx           # Monthly tab: nav + calendar + donut + summary + share
    History.jsx               # Reverse-chronological day list with share per day
    ShareableCard.jsx         # Theme-adaptive daily shareable card (forwardRef)
    ShareableMonthCard.jsx    # Theme-adaptive monthly shareable card (forwardRef)
    Settings.jsx              # Export/import/install/manage activities/clear data
    ActivityManager.jsx       # Add/remove/reset custom activities
  utils/
    shareCard.js              # captureAndShare() — html2canvas + Web Share API
    cardTheme.js              # Theme resolver for shareable cards (light/dark)
```

## Key Architecture Decisions
- **Activities are dynamic** via React Context (`ActivitiesProvider`). All 12+ components use `useActivities()` hook instead of static import.
- **Timer persists in localStorage** with `startedAt` timestamp. Elapsed = `Date.now() - startedAt - totalPausedMs`. Survives refresh/close.
- **Two input modes**: Timer mode (start/pause/stop) and Manual mode (+/- minutes with presets). Toggle in header, preference saved in localStorage.
- **Shareable cards** use `html2canvas` to capture an off-screen div as PNG, then `navigator.share()` with file. Cards detect system theme via `matchMedia` (not CSS vars, because html2canvas can't resolve them).
- **Dark mode** auto-adapts via `prefers-color-scheme` media query with CSS custom properties in `index.html`.

## Data Shape (localStorage)
```js
// "pappa-fit-logs"
{ "2026-03-31": { walking: 25, pranayam: 15, yoga: 40, note: "Great day" }, ... }

// "pappa-fit-active-timer"
{ activity: "walking", startedAt: 1711872000000, pausedAt: null, totalPausedMs: 0 }

// "pappa-fit-activities"
[{ key: "walking", label: "Walking", emoji: "🚶", color: "#2D9CDB" }, ...]

// "pappa-fit-input-mode"
"timer" | "manual"
```

## Features
- Timer with pause/resume (persists across refresh)
- Manual +/- minute logger with presets
- Editable day notes
- Edit/delete logged activities (tap chip in TodayLog)
- Scrollable 30-day bar chart
- Monthly calendar with day detail
- Activity donut chart + summary progress bars
- Month navigation (browse past months)
- Shareable daily + monthly summary cards (theme-adaptive)
- Per-day share in History
- Streak counter with animated flame 🔥
- Confetti on session complete
- PWA: installable, offline support
- Export/import data as JSON (v2 format includes activities)
- Clear all data with backup option
- Custom activities (add/remove/reset)
- Dark mode (auto system theme)
- Animations throughout (fadeInUp, popIn, breathe, growWidth, etc.)
- Splash screen (tap to dismiss)

## Git
- Branch: `claude/fitness-habit-tracker-Ol89r` and `main` (kept in sync)
- Deployed via GitHub Pages + GitHub Actions
- Live at: https://patildhruv.github.io/PappaFitLogger/

## Build & Dev
```bash
npm install
npm run dev      # localhost:5173
npm run build    # dist/
npm run preview  # preview production build
```
