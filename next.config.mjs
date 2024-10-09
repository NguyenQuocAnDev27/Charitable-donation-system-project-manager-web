/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
  basePath: "/project_manager",
  async redirects() {
    return [
      {
          source: '/',
          destination: '/project_manager',
          basePath: false,
          permanent: false
      },
    ]
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.justboil.me',
      },
    ],
  },
}

export default nextConfig