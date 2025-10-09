/** @type {import('next').NextConfig} */

import nextBundleAnalyzer from "@next/bundle-analyzer";
import createMDX from "@next/mdx";

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  // 生产环境构建优化
  productionBrowserSourceMaps: false, // 禁用生产环境 source maps 减小体积

  // 启用输出文件追踪，优化 Docker 部署
  output: "standalone", // 可选：适用于 Docker/容器化部署

  // 配置页面扩展名
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  // 图片优化配置
  images: {
    formats: ["image/avif", "image/webp"], // 使用现代图片格式
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 天缓存
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // 实验性功能
  experimental: {
    // 优化包导入 - 更全面的配置
    optimizePackageImports: [
      "@react-three/fiber",
      "@react-three/drei",
      "@react-three/postprocessing",
      "@react-three/rapier",
      "@react-spring/web",
      "@react-spring/three",
      "three",
      "three-stdlib",
      "maath",
      "lucide-react",
      "@radix-ui/react-label",
      "@radix-ui/react-slot",
    ],

    // 启用更激进的代码分割
    // optimizeCss: true, // 需要安装 critters 包

    // 启用 React 18+ 的新特性
    // serverActions: true, // 如果使用 Server Actions
  },

  // Headers 配置 - 安全和性能
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      {
        // 静态资源缓存策略
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // 3D 模型文件缓存
        source: "/assets/models/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Webpack 配置
  webpack: (config, { isServer, webpack }) => {
    // 处理 GLSL 着色器文件
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ["raw-loader", "glslify-loader"],
    });

    // 忽略不需要的文件
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
    );

    // 客户端代码分割优化
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          maxInitialRequests: 25, // 增加初始请求数限制
          minSize: 20000, // 最小 chunk 大小 20KB
          maxSize: 244000, // 最大 chunk 大小 244KB (避免过大的 chunk)
          cacheGroups: {
            // Framework 核心 (最高优先级)
            framework: {
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
              name: "framework",
              priority: 40,
              enforce: true,
              chunks: "all",
            },
            // Three.js 生态系统
            three: {
              test: /[\\/]node_modules[\\/](three|@react-three\/fiber|@react-three\/drei)[\\/]/,
              name: "three-core",
              priority: 35,
              chunks: "all",
              reuseExistingChunk: true,
            },
            // Three.js 扩展 (postprocessing, rapier 等)
            threeExtensions: {
              test: /[\\/]node_modules[\\/](@react-three\/postprocessing|@react-three\/rapier|three-stdlib)[\\/]/,
              name: "three-extensions",
              priority: 33,
              chunks: "all",
              reuseExistingChunk: true,
            },
            // React Spring
            reactSpring: {
              test: /[\\/]node_modules[\\/](@react-spring|@use-gesture)[\\/]/,
              name: "react-spring",
              priority: 30,
              chunks: "all",
              reuseExistingChunk: true,
            },
            // 数学和物理库
            math: {
              test: /[\\/]node_modules[\\/](maath|gl-matrix)[\\/]/,
              name: "math",
              priority: 28,
              chunks: "all",
              reuseExistingChunk: true,
            },
            // UI 组件库
            ui: {
              test: /[\\/]node_modules[\\/](@radix-ui|lucide-react|sonner)[\\/]/,
              name: "ui-components",
              priority: 25,
              chunks: "all",
              reuseExistingChunk: true,
            },
            // 表单处理
            forms: {
              test: /[\\/]node_modules[\\/](react-hook-form|@hookform|zod)[\\/]/,
              name: "forms",
              priority: 23,
              chunks: "all",
              reuseExistingChunk: true,
            },
            // 工具库
            utils: {
              test: /[\\/]node_modules[\\/](clsx|lodash|class-variance-authority|tailwind-merge)[\\/]/,
              name: "utils",
              priority: 20,
              chunks: "all",
              reuseExistingChunk: true,
            },
            // 数据库和 API
            dataLayer: {
              test: /[\\/]node_modules[\\/](@prisma)[\\/]/,
              name: "data-layer",
              priority: 18,
              chunks: "all",
              reuseExistingChunk: true,
            },
            // 通用 vendor
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              priority: 10,
              chunks: "all",
              reuseExistingChunk: true,
              minChunks: 2, // 至少被 2 个模块引用才分离
            },
            // 公共代码
            commons: {
              name: "commons",
              minChunks: 2,
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
        // 运行时代码分离
        runtimeChunk: {
          name: "runtime",
        },
        // 模块 ID 优化
        moduleIds: "deterministic",
        // Minimize 配置 (生产环境)
        minimize: true,
      };
    }

    // 服务端优化
    if (isServer) {
      // 外部化大型依赖，减少服务端包大小
      config.externals = [...(config.externals || [])];

      // 可以考虑外部化某些只在客户端使用的库
      // config.externals.push({
      //   'three': 'commonjs three',
      //   '@react-three/fiber': 'commonjs @react-three/fiber',
      // });
    }

    return config;
  },

  // 编译器选项
  compiler: {
    // 生产环境移除 console
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },

  // 重定向规则 (如果需要)
  // async redirects() {
  //   return [];
  // },

  // 重写规则 (如果需要)
  // async rewrites() {
  //   return [];
  // },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // 如果使用 GitHub Flavored Markdown
    // remarkPlugins: [remarkGfm],
  },
});

export default withBundleAnalyzer(withMDX(nextConfig));
