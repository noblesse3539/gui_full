/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "tailwindui.com"],
  },
  env: {
    REACT_APP_SERVER_HOST: process.env.REACT_APP_SERVER_HOST,
  },
  experimental: {
    externalDir: true,
  },
};

module.exports = nextConfig;
