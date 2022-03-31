/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['unsplash.it', 'avatars.githubusercontent.com'],
  },
  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL || 'localhost:3000',
  },
};

module.exports = nextConfig;
