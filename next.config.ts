import type { NextConfig } from "next";

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: false,
  // experimental: {
  //   serverActions: {
  //     bodySizeLimit: "100mb",
  //   },
  // },
  env: {
    API_URL: process.env.API_URL,
    ORIGIN: process.env.ORIGIN,
  },

  /* config options here */
  async rewrites() {
    return [
      {
        source: "/o/:path*",
        destination: `${process.env.API_URL}/o/:path*`,
      },
      {
        source: "/p/:path*",
        destination: `${process.env.API_URL}/:path*`,
      },
    ];
    
  },
};

export default withNextIntl(nextConfig);
