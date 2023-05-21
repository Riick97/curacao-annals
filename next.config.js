/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    customKey: "my-value",
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    TESTING_ENV: process.env.TESTING_ENV,
    AKTE_URL: process.env.AKTE_URL,
    PERCEELKAART_URL: process.env.PERCEELKAART_URL,
    NEXT_JWT_SECRET: process.env.NEXT_JWT_SECRET,
  },
};

module.exports = nextConfig
