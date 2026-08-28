/** @type {import('next').NextConfig} */
const config = {
  images: { formats: ["image/avif", "image/webp"] },
  experimental: { webpackBuildWorker: false },
};

export default config;
