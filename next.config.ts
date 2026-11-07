import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve static mockups in public/mockups/<name>/index.html at /mockups/<name>
  async rewrites() {
    return [
      { source: "/mockups/:name", destination: "/mockups/:name/index.html" },
    ];
  },
};

export default nextConfig;
