/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: '*.googleusercontent.com'
      },
      {
        hostname: 'taptrick.s3.eu-west-2.amazonaws.com',
      },
    ],
  }
}

module.exports = nextConfig
