/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['unsplash.it', 'avatars.githubusercontent.com'],
  },
  env: {
    BASE_URL: process.env.BASE_URL || 'localhost:3000',
    GITHUB_PERSONAL_ACCESS_TOKEN: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  },
};

module.exports = nextConfig;
