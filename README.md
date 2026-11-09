# RAKSHITHA — Digital Playground

Personal portfolio for **One Who Codes 2026 – A Portfolio Challenge**.
Built with React, TypeScript, Vite, Motion for React and Lucide icons. No other runtime dependencies.
Dark charcoal editorial design with a scroll-linked, multi-colour palette system (see **Colour system**).

> Curious mind. Creative builder. Always exploring.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
```

Requires Node 18+.

## Make it yours (5 minutes)

| What | Where |
| --- | --- |
| GitHub / LinkedIn / Instagram / LeetCode / email | `src/data/links.ts` — fill in `href`. Empty = tile shows "Link coming soon". |
| Project repo + live-demo links | `src/data/projects.ts` → `links: { github, demo }`. Nothing renders until a real URL is set. |
| Project feature status (DocuSense AI) | `src/data/projects.ts` → each capability `status`: `'planned'`, `'in-progress'` or `'implemented'`. |
| Exact tech stack per project | `technologies` array in `src/data/projects.ts`. |
| Site URL for social previews | Add `<meta property="og:url" content="https://your-site">` in `index.html` after deploying. |

**Honesty by design.** Every DocuSense AI capability is marked *Planned* by default. Flip a status only when
the feature genuinely works — the pipeline widget, case study and counters update automatically.

## What's inside

| Section | Highlights |
| --- | --- |
| Hero | Letter-by-letter animated name, CSS-3D gyroscope + glyph cube that tilts toward the pointer |
| About | Count-up CGPA, spec sheet |
| Toolkit | "Periodic table" of technologies grouped by area — no fake skill percentages |
| Projects | Tabbed showcase, one bespoke interaction per project, accessible case-study modal |
| Journey | Scroll-drawn timeline (no invented dates) |
| Exploring | Hover/keyboard-driven terminal panel |
| Contact | Placeholder-driven link tiles — no invented URLs |

### Project interactions
- **DocuSense AI** — step through the planned processing pipeline; each stage shows its honest status.
- **SeaSafe** — switch between Safety / Market / Community focus areas.
- **AEGIS AI** — hazard selector on a concept radar (clearly labelled illustrative).
- **B-Tree Index Optimization** — a *working* in-browser B-Tree: insert keys and watch nodes split.
  Labelled as an illustrative demo, not project benchmark data.

### Memorable details
- Custom cursor (desktop fine-pointer only): dot + trailing ring, context-aware, never blocks clicks, keeps the native cursor.
- Optional sound effects (Web Audio): **off by default**, visible toggle in the nav, audio context only created after opt-in.
- Easter egg: type the Konami code (↑ ↑ ↓ ↓ ← → ← → B A) or tap the hero orb five times.
- Scroll progress bar, animated nav underline, scroll-triggered reveals, drifting ambient background.

## Colour system

One charcoal base, six section moods, one continuous experience.

| Section | Palette |
| --- | --- |
| Hero | burgundy, crimson, rose pink |
| About | rose pink, soft blush |
| Skills | lavender, purple |
| Projects | ocean blue, cyan |
| Journey | warm orange, coral |
| Exploring | coral rose → orchid (a bridge so Journey flows into Contact) |
| Contact | magenta, pink |

**How it works**
- `src/theme/palettes.ts` defines four roles per section (`a` primary, `b` secondary, `c` soft tint, `deep` ambient shade). Edit hex values here to retune the whole site.
- `src/hooks/useScrollTheme.ts` watches scroll position and cross-fades between neighbouring palettes around each section boundary, writing `--accent`, `--accent-2`, `--accent-3`, `--accent-deep` on `<html>`.
- Blending happens in **OKLCH** (`src/theme/oklch.ts`), so transitions stay rich (e.g. blue → violet → pink → orange) instead of passing through grey. All roles follow the same hue direction so pale tints never detour through an unrelated colour.
- Components only use those variables (headings, buttons, borders, gradients, cursor, 3D orb, scroll progress, ambient lighting, interactive widgets). Within a section, project and skill cards keep a small static family of tones so siblings stay distinguishable.
- The easter egg now flips the whole palette's hue (a "reversed world") — press the code again to switch back.
- Every palette is checked with axe-core for WCAG AA contrast.

## Accessibility & performance
- Semantic landmarks, single `h1`, logical heading hierarchy, skip link, visible focus rings.
- Tabs follow the WAI-ARIA pattern (roving tabindex, arrow/Home/End keys). Case study uses native `<dialog>` (focus trap + Esc).
- `prefers-reduced-motion` respected in CSS *and* Motion (`MotionConfig reducedMotion="user"`); cursor disabled.
- Automated axe-core scan (WCAG 2 A/AA + best practices): **0 violations** on desktop and mobile viewports.
- Animations use transform/opacity only; React, Motion are split into long-cached chunks; no images to optimise
  (visuals are CSS/SVG). Production JS ≈ 105 kB gzipped total.
- Fonts: Space Grotesk, Inter, DM Mono via Google Fonts with `display=swap` and system fallbacks.

## Project structure
```
src/
  theme/             palettes.ts (colour story), oklch.ts (blending maths)
  components/        Navbar, Hero, Orb, About, Skills, Projects, Journey, Explorations, Contact, Footer,
                     CustomCursor, ScrollProgress, Background, SecretMessage, Reveal, SectionHead
    project/         DocuPipeline, SeaPillars, HazardRadar, BTreeLab, CaseStudy, ProjectStage, StatusChip
  data/              projects.ts, skills.ts, links.ts, explorations.ts
  hooks/             useActiveSection, useKonami, useMediaQuery, useScrollTheme
  lib/               btree.ts (pure B-Tree logic), sound.tsx (opt-in Web Audio)
  styles/            global.css, animations.css
public/              favicon.svg, og-image.png, robots.txt
```

## Deploy to Vercel
1. Push the repo to GitHub.
2. Import it at vercel.com → framework **Vite** is auto-detected (`vercel.json` included).
3. Build command `npm run build`, output directory `dist`.

## License
Personal portfolio — all content © Rakshitha.
