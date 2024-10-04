/** @type {import('next').NextConfig} */

import nextBundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  typescript: {
    ignoreBuildErrors: false, // ! WARN: Dangerous
  },
};

export default withBundleAnalyzer(nextConfig);
