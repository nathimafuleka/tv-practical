/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // We'll handle TypeScript errors as warnings during development
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
  eslint: {
    // We'll handle ESLint errors as warnings during development
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://tv-practical-api.vercel.app/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
