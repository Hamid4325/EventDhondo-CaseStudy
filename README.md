# EventDhondo — Case Study

A single-page product design case study for **EventDhondo**, a campus event app, built with
Next.js (App Router, static export), Tailwind CSS v4 and Framer Motion.

The site walks through the problem, the solution, two role-based product tours (student and
organizer), the impact, and how the three sides of the marketplace fit together.

## Highlights

- **Device frames that scroll like real phones.** Screens taller than the frame window are
  revealed progressively as you scroll, using a scroll-linked `MotionValue` rather than a
  timeline, so the motion is reversible and never desyncs from the scroll position.
- **Hydration-safe scroll effects.** The windowed frames are client-only (the server emits the
  static layout), gated by `useSyncExternalStore` so there is no server/client markup mismatch,
  and reduced-motion users get the plain static frame instead.
- **Sticky crossfading product tour.** Six screens per role live in a sticky column; the text
  column scrolls and each screen is anchored to the exact scroll position where it becomes
  active, so every screenshot is shown from its first pixel and held once complete.
- **Scroll-linked ecosystem diagram.** Three orbiting relationship arcs with arrowheads drawn
  on `markerMid` vertices, sized so they stay clear of the node discs at every breakpoint.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, `output: "export"`) |
| UI | React 19, Tailwind CSS v4 |
| Animation | Framer Motion (scroll-linked `MotionValue`s) |
| Language | TypeScript |
| Hosted on | Netlify (static output in `out/`) |

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build, statically exported to `out/` |
| `npm run start` | Serves the production build |
| `npm run lint` | ESLint |
| `npm run screens:check` | Verifies every screen referenced in the data has an image in `public/screens/` |
| `npm run images:optimize` | Converts any PNG in `public/` to WebP and deletes the PNG |

### Images

Screenshots and the logo ship as WebP, not PNG — that is the difference between
3.29 MB and 0.70 MB of media. To add or replace a screen, drop a **PNG** into
`public/screens/` and run:

```bash
npm run images:optimize
```

It caps screens at 672px wide (2.75× the 244px desktop frame, 3.0× the 224px
mobile card, so nothing is ever upscaled) at quality 85, shrinks the logo to
160px losslessly, and deletes the PNG sources. The originals stay in git history.
Do not commit new PNGs to `public/` — the optimizer owns that directory.

## Deploying to Netlify

The build is a static export, so Netlify only needs a build command and a publish directory —
both are declared in [`netlify.toml`](./netlify.toml):

- **Build command:** `npm run build`
- **Publish directory:** `out`
- **Node version:** 22 (pinned in `netlify.toml`; Next.js requires >= 20.9)

To deploy:

1. Push this repository to GitHub.
2. In Netlify, choose **Add new site → Import an existing project** and select the repository.
   Netlify reads `netlify.toml` and fills the build settings in automatically.
3. Click **Deploy site**. The first build takes a couple of minutes; every later deploy is
   incremental.
4. To rebuild after the first deploy, use **Site configuration → Build & deploy → Clear cache
   and deploy site** (only needed if you change dependencies).

The `Navbar` CTA ("View Full Case Study") is intentionally a placeholder (`href="#"`); point it
at your hosted case study document when you have one.

## Author

**Muhammad Hamid Abad** — [LinkedIn](https://www.linkedin.com/in/hamid-abad) ·
[Portfolio](https://hamidabad.netlify.app) · [GitHub](https://github.com/Hamid4325/)
