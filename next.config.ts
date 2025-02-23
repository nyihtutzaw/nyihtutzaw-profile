import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn-images-1.medium.com', 'miro.medium.com','medium.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
