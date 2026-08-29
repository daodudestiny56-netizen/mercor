import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ESLint is run separately in CI — skip during Vercel build to avoid false failures
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Type checking is done via tsc --noEmit separately; skip Vercel's additional check
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
