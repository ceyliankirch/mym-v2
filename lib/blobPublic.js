// Store Blob public (galerie, séjours, équipe, communications) — distinct du store privé
// des documents sensibles. Un token explicite est requis car BLOB_STORE_ID (variable
// d'environnement globale du projet) pointe désormais vers le store privé, et le SDK
// Vercel Blob l'utiliserait par défaut sinon (via l'authentification OIDC automatique).
export const BLOB_PUBLIC = { token: process.env.BLOB_READ_WRITE_TOKEN };
