/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
    ],
  },
  env: {
    API_URL: process.env.API_URL,
  },
  productionBrowserSourceMaps: true,
};

export default nextConfig;
