import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dawn-unit-97b0.sdrowvieli1.workers.dev",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/projects/:path*",
        destination: "https://projects-mu-six.vercel.app/:path*",
      },
    ];
  },
};

export default nextConfig;
