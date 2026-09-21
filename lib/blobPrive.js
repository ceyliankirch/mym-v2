// Store Blob privé dédié aux documents sensibles (identité, santé).
// Authentification OIDC de Vercel + BLOB_STORE_ID ; BLOB_READ_WRITE_TOKEN reste celui du store public (galerie, séjours…).
export const BLOB_PRIVE = { storeId: process.env.BLOB_STORE_ID };
