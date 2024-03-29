/** @type {import('next').NextConfig} */
const nextConfig = {
  
  webpack: (config) => {
    config.resolve.fallback = { fs: false, os: false, path: false };
    return config;
  },
}

module.exports = nextConfig
