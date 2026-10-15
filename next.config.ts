import type { NextConfig } from "next";

// Static export: the site is plain HTML in out/, hosted on GitHub Pages.
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default config;
