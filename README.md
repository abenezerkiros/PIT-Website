# chauffeur-app

A Next.js 14 (App Router) + TypeScript + Tailwind CSS scaffold, generated from a Figma hero-section design.

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Notes / TODOs

- **Images expire**: `src/components/HeroSection.tsx` currently points at Figma-hosted asset URLs, which expire ~7 days after export. Download the hero photo and arrow icon, put them in `/public`, and swap the `heroImage` / `arrowDownIcon` constants to local paths (e.g. `/hero.jpg`).
- **Heading font**: the design uses a font called "Neutral Face" for headings, which isn't a standard web font. `tailwind.config.ts` has a `font-heading` slot wired up but unset — add the font via `next/font/local` (if you have the font file) or swap in a close Google Font, then set `--font-heading` in `layout.tsx` the same way `--font-body` (Manrope) is set.
- This scaffold only includes the hero section from the Figma file — bring in more sections/components as you pull more nodes.
