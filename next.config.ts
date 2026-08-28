import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pdfkit charge ses fichiers de données (.afm) et fontkit à l'exécution :
  // il ne doit pas être bundlé par Turbopack, sinon la génération de PDF échoue.
  serverExternalPackages: ["pdfkit", "fontkit"],
  experimental: {
    serverActions: {
      bodySizeLimit: "12mb", // visuels générés (dataURL base64) + imports Communication
    },
  },
};

export default nextConfig;