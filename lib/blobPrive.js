// Store Blob privé dédié aux documents sensibles (identité, santé).
// Token distinct de BLOB_READ_WRITE_TOKEN, qui reste celui du store public (galerie, séjours…).
export const PRIVATE_BLOB_TOKEN = process.env.PRIVATE_BLOB_READ_WRITE_TOKEN;
