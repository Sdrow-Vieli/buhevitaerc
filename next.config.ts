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
  async rewrites() {
    return [
      {
        source: "/lazyappz/:path*",
        destination: "https://lazyappz.vercel.app/:path*",
      },
      {
        source: "/projects/:path*",
        destination: "https://projects.vercel.app/:path*",
      },
      {
        source: "/portfolio/:path*",
        destination: "https://portfolio.vercel.app/:path*",
      },
      {
        source: "/sdrowvieli/:path*",
        destination: "https://sdrowvieli.vercel.app/:path*",
      },
      {
        source: "/ecocollect/:path*",
        destination: "https://ecocollect.vercel.app/:path*",
      },
      {
        source: "/lazyreader/:path*",
        destination: "https://lazyreader.vercel.app/:path*",
      },
    ];
  },
};

export default nextConfig;
