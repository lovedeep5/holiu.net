import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "holiu.net" },
      { protocol: "https", hostname: "holiu.net" },
      { protocol: "https", hostname: "dev.holiu.net" },
    ],
  },
};

export default withNextIntl(nextConfig);
