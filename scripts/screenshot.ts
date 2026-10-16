// Screenshots of the built site, so you (or an agent) can see a change before shipping it.
//
//   bun run build && bun run screenshot            # every page, desktop and mobile
//   bun run screenshot /thanks/                    # one page
//
// Writes a full-page PNG per page and viewport to screenshots/, plus the same page cut into
// screen-height slices (name-1.png, name-2.png, ...), which stay readable when a tall page
// would be scaled down. Fails if a page logs errors or scrolls sideways.
// First run: `bunx playwright install chromium-headless-shell`.

import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";

const pages = process.argv.slice(2).length ? process.argv.slice(2) : ["/", "/thanks/"];
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

if (!existsSync("out/index.html")) {
  console.error("No build in out/. Run `bun run build` first.");
  process.exit(1);
}

const server = Bun.serve({
  port: 0,
  async fetch(req) {
    let path = join("out", decodeURIComponent(new URL(req.url).pathname));
    if (path.endsWith("/")) path += "index.html";
    const file = Bun.file(path);
    return (await file.exists()) ? new Response(file) : new Response("Not found", { status: 404 });
  },
});

mkdirSync("screenshots", { recursive: true });
// These flags keep Chromium working in containers and sandboxes with a small /dev/shm.
const browser = await chromium.launch({ args: ["--disable-dev-shm-usage", "--disable-gpu"] });
const problems: string[] = [];

for (const vp of viewports) {
  const context = await browser.newContext({ viewport: vp, reducedMotion: "reduce" });
  for (const path of pages) {
    const page = await context.newPage();
    page.on("pageerror", (e) => problems.push(`${vp.name} ${path}: ${e.message}`));
    page.on("console", (m) => {
      if (m.type() === "error") problems.push(`${vp.name} ${path}: ${m.text()}`);
    });
    await page.goto(new URL(path, server.url).href, { waitUntil: "networkidle" });

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    if (overflow > 0) problems.push(`${vp.name} ${path}: scrolls sideways by ${overflow}px`);

    const slug = path.replace(/\//g, "-").replace(/^-|-$/g, "") || "home";
    const file = `screenshots/${slug}-${vp.name}.png`;
    await page.screenshot({ path: file, fullPage: true });
    console.log(file);

    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0, n = 1; y < height; y += vp.height, n++) {
      const clip = { x: 0, y, width: vp.width, height: Math.min(vp.height, height - y) };
      await page.screenshot({ path: file.replace(".png", `-${n}.png`), fullPage: true, clip });
    }
    await page.close();
  }
  await context.close();
}

await browser.close();
server.stop();

if (problems.length) {
  console.error(`\n${problems.join("\n")}`);
  process.exit(1);
}
