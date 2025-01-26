import type { NextConfig } from "next";

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
  env: {
    API_URL: process.env.API_URL,
    ORIGIN: process.env.ORIGIN,
  },
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/assets/:path*",
        destination:
          "https://7gbkcuhyatc9nweq.public.blob.vercel-storage.com/:path*",
      },
      {
        source: "/o/:path*",
        destination: "http://localhost:1234/o/:path*",
      },
    ];
  },
};

export default withNextIntl(nextConfig);
