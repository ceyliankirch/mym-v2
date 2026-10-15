import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pdfkit charge ses fichiers de données (.afm) et fontkit à l'exécution :
  // il ne doit pas être bundlé par Turbopack, sinon la génération de PDF échoue.
  serverExternalPackages: ["pdfkit", "fontkit"],
  // La fiche sanitaire (public/) est lue par fs à l'envoi de l'email : on l'embarque dans les fonctions.
  outputFileTracingIncludes: {
    "/**": ["./public/fiche-sanitaire-de-liaison.pdf"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "12mb", // visuels générés (dataURL base64) + imports Communication
    },
  },
};

export default nextConfig;