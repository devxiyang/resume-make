/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // 添加webpack配置
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // 解决react-pdf的canvas依赖问题
      canvas: false,
      encoding: false,
    };
    return config;
  }
};

module.exports = nextConfig; 