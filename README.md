# skelcrew.dev

The website for [Skelcrew](https://skelcrew.dev). Next.js static export, Tailwind CSS, Bun.

```sh
bun install
bun run dev          # http://localhost:3000
bun run check        # lint, typecheck, build to out/
bun run screenshot   # desktop and mobile screenshots of the build
```

Hosted on Vercel: pushes to `main` go live on skelcrew.dev, and every pull request gets a
preview link. GitHub Actions runs `bun run check` on each push and pull request.
Working on the site with an agent? See [AGENTS.md](AGENTS.md).
