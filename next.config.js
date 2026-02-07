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
  // Enable static exports for Netlify
  output: 'export',
  // Optional: Add basePath if your site is hosted in a subdirectory
  // basePath: '/your-base-path',
  // Optional: Add assetPrefix if your assets are hosted on a CDN
  // assetPrefix: 'https://your-cdn-url.com',
};

module.exports = nextConfig;