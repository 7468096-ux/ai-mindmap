/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/ai-mindmap' : '',
  images: { unoptimized: true }
}

module.exports = nextConfig
