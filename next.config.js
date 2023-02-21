/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  
  experimental: {
    scrollRestoration: true,
  },
  ignoreDuringBuilds: true
}

module.exports = nextConfig
