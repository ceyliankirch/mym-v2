import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "12mb", // visuels générés (dataURL base64) + imports Communication
    },
  },
};

export default nextConfig;