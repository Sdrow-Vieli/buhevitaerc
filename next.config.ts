import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dawn-unit-97b0.sdrowvieli1.workers.dev",
      },
      {
        protocol: "https",
        hostname: "lindocode.com",
      },
    ],
  },
};

export default nextConfig;
