/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/chat',
            destination: 'https://80.225.193.58:8000/api/chat',
          },
        ];
      },
};

export default nextConfig;
