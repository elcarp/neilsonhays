import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'neilsonhayslibrary.org',
      },
    ],
    domains: [
      'images.unsplash.com',
      'assets.aceternity.com',
      'neilsonhayslibrary.org',
    ],
  },
}

export default nextConfig
