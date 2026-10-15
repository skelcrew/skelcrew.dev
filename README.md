# skelcrew.dev

The website for [Skelcrew](https://skelcrew.dev). Next.js static export, Tailwind CSS, Bun.

```sh
bun install
bun run dev          # http://localhost:3000
bun run check        # lint, typecheck, build to out/
bun run screenshot   # desktop and mobile screenshots of the build
```

Pushes to `main` deploy to GitHub Pages through `.github/workflows/deploy.yml`.
Working on the site with an agent? See [AGENTS.md](AGENTS.md).
