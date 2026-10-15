import type { NextConfig } from "next";

// Static export: the site is plain HTML in out/. Vercel serves it, but any static host would do.
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default config;
