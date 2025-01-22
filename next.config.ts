import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/assets/:path*',
        destination: 'https://7gbkcuhyatc9nweq.public.blob.vercel-storage.com/:path*'
      }
    ]
  }
};

export default nextConfig;
