import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'store.neilsonhayslibrary.org',
      },
    ],
    domains: [
      'images.unsplash.com',
      'assets.aceternity.com',
      'store.neilsonhayslibrary.org',
    ],
  },
}

export default nextConfig
