import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "export",
  images: {
    domains: ["opengraph.githubassets.com"],
    unoptimized: true,
  },
  basePath: "",
  assetPrefix: "",
};

export default withNextIntl(nextConfig);
