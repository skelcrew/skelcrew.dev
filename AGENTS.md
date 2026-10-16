# skelcrew.dev

The marketing site for Skelcrew. Next.js (App Router) with static export, Tailwind CSS v4,
TypeScript, Bun. The build is plain HTML in `out/`, hosted on Vercel. Every pull request gets
a Vercel preview link; check your change there too.

## Commands

- `bun run dev`: local dev server.
- `bun run check`: lint (Biome), typecheck and build. Must pass before every commit.
- `bun run screenshot [path...]`: screenshots of the built site at desktop and mobile width,
  in `screenshots/`. Run `bun run build` first. First time: `bunx playwright install chromium-headless-shell`.
- `bun run fix`: format and apply safe lint fixes.

## Rules

- Look at your change. After any visual change, build, run `bun run screenshot`, and read the
  slices (`home-desktop-1.png`, `home-mobile-1.png`, ...), not just the full-page image.
  The script fails on console errors and on pages that scroll sideways.
- Static export only. No server code, no API routes, no `next/image` optimisation, nothing that
  needs a Node server at runtime. Pages are server components; add `"use client"` only to
  components that need state or effects (today: `demo.tsx`, `signup.tsx`).
- Style with Tailwind classes, in the component. Use the tokens in `app/globals.css`
  (`bg-bg`, `bg-panel`, `text-fg`, `text-fg-2`, `text-muted`, `text-faint`, `border-line`,
  `text-accent`, ...) rather than raw colours. The site is dark only.
- Reuse the blocks in `components/ui.tsx` (`Container`, `Section`, `Label`, `H2`, `Figure`,
  `buttonStyles`) before writing new ones.
- Terminal snippets use `TermText` with `{tone:text}` markup, for example `{ok:✓ passing}`.
  Never write `[name:value]` anywhere in source: Tailwind reads it as an arbitrary CSS
  property, and a value containing `/*` silently breaks the whole stylesheet.
- Links, the email address and the signup endpoint live in `lib/site.ts`. GitHub links are
  hidden while `site.repoPublic` is false.
- Copy: short, plain sentences. No hype words. Don't claim anything about the product that
  isn't true yet; label illustrative output as illustrative.
- Keep `public/llms.txt` in step with the page when the product facts change.
