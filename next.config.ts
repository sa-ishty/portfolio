import type { NextConfig } from "next";

// Set PAGES_BASE_PATH (e.g. "/portfolio") when the site is served from a
// subfolder, as on GitHub Pages. Leave it unset on Vercel or Cloudflare.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
