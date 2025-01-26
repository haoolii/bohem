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
        source: "/v/:path*",
        destination:
          "https://7gbkcuhyatc9nweq.public.blob.vercel-storage.com/:path*",
      },
      {
        source: "/o/:path*",
        destination: `${process.env.API_URL}/o/:path*`,
      },
      {
        source: "/p/:path*",
        destination: `${process.env.API_URL}/:path*`,
      },
    ];
    // http://172.234.94.232/api/v2/asset/upload
  },
};

export default withNextIntl(nextConfig);
