import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb", // On autorise jusqu'à 5 Mo
    },
  },
};

export default nextConfig;