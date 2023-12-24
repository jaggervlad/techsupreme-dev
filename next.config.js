/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: ['cdn.shopify.com'],
  },
};

module.exports = nextConfig;
