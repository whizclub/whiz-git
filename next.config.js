/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
    optimizePackageImports: ['lucide-react', 'framer-motion', '@tanstack/react-query'],
  },
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com', 'img.youtube.com', 'i.ytimg.com'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year cache
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  swcMinify: true,
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  // Optimize fonts
  optimizeFonts: true,
  // Enhanced headers for better caching and security
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.vercel.app; style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.vercel.app; img-src 'self' data: https: blob: vercel-storage.com; font-src 'self' data: https: https://fonts.gstatic.com https://r2cdn.perplexity.ai; connect-src 'self'; frame-ancestors 'self'; form-action 'self';"
          },
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow'
          }
        ],
      },
      {
        // Static assets caching
        source: '/:all*(svg|jpg|png|webp|avif|woff|woff2)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
