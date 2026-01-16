/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build as a standalone output so we can run the minimal server in a small runtime image
  output: 'standalone',

  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
