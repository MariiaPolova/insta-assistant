/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        // port: '',
        // pathname: '/account123/**',
        // search: '',
      },
    ],
  },
};

export default nextConfig;
