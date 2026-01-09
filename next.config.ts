import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // 解决GitHub Pages路径问题 - 只在生产环境应用assetPrefix
  ...(process.env.NODE_ENV === 'production' && {
    assetPrefix: '/web_tool_box',
  }),
  // 确保静态资源正确导出
  trailingSlash: true,
};

export default nextConfig;
