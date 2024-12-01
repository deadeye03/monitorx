/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: "lh3.googleusercontent.com",
          },
        ],
      },
      typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      },
      experimental: {
        serverActions: {
          allowedOrigins: ['localhost:3000', 'your-production-domain.com'],
        },
      },
};

module.exports = nextConfig;
