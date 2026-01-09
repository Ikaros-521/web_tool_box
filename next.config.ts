import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  ...(process.env.NODE_ENV === 'production' && {
    basePath: '/web_tool_box',
    assetPrefix: '/web_tool_box',
  }),
  // 确保静态资源正确导出
  trailingSlash: true,
};

export default nextConfig;
