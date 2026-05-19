import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/platform-assets/:path*",
        destination: "/advanced-slider/:path*",
      },
    ];
  },
  async redirects() {
    return [
      // Page route only — do not redirect /advanced-slider/* assets (public/advanced-slider).
      {
        source: "/advanced-slider",
        destination: "/platform",
        permanent: true,
      },
    ];
  },
  images: {
    qualities: [100, 75],
  },
};

export default nextConfig;
