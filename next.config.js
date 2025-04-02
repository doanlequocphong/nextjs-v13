/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PORT: process.env.NEXT_PORT || 3000,  // Cổng sẽ được lấy từ biến môi trường hoặc mặc định là 3000
  },
}

module.exports = nextConfig
