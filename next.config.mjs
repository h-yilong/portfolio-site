/** @type {import('next').NextConfig} */

import nextBundleAnalyzer from "@next/bundle-analyzer";
import createMDX from "@next/mdx";

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  // Optimize bundle splitting
  experimental: {
    optimizePackageImports: ["@react-three/fiber", "@react-three/drei", "@react-spring/web", "three", "maath"],
  },

  // Webpack configuration for better code splitting
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Split vendor chunks more granularly
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          // Three.js ecosystem
          three: {
            test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
            name: "three",
            priority: 30,
            chunks: "all",
          },
          // React Spring
          reactSpring: {
            test: /[\\/]node_modules[\\/]@react-spring[\\/]/,
            name: "react-spring",
            priority: 25,
            chunks: "all",
          },
          // Physics and 3D utilities
          physics: {
            test: /[\\/]node_modules[\\/](@react-three\/rapier|maath)[\\/]/,
            name: "physics",
            priority: 20,
            chunks: "all",
          },
          // UI libraries
          ui: {
            test: /[\\/]node_modules[\\/](@radix-ui|lucide-react)[\\/]/,
            name: "ui",
            priority: 15,
            chunks: "all",
          },
          // Default vendor
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            priority: 10,
            chunks: "all",
          },
        },
      };
    }
    return config;
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  extension: /\.(md|mdx)$/,
});

export default withBundleAnalyzer(withMDX(nextConfig));
