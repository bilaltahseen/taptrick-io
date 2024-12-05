/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    // Only apply this in the server environment
    if (isServer) {
      config.module.rules.push({
        test: /\.hbs$/,
        loader: "handlebars-loader",
        options: {
          // Optional options if needed
        },
      });
    }
    return config;
  },
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
