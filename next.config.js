/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  middleware: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false }
    config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
    })
    return config;
}
}

module.exports = nextConfig
