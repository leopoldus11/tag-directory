import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features for view transitions
  experimental: {
    viewTransition: true,
  },
  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  // Compression
  compress: true,
  // PoweredBy header removal for security
  poweredByHeader: false,
};

export default nextConfig;
