import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/advanced-slider",
        destination: "/platform",
        permanent: true,
      },
      {
        source: "/advanced-slider/:path*",
        destination: "/platform/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
