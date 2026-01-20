import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  /** @type {import('next').NextConfig} */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/:path*',
      },
    ];
  },
};

module.exports = nextConfig;

export default nextConfig;
