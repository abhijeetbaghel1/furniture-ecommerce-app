/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'localhost', 
      'via.placeholder.com',
      'images.unsplash.com',
      'images.pexels.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;