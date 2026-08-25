import crypto from "crypto";

// Jeton de désabonnement dérivé de l'email (HMAC), sans colonne DB dédiée :
// permet de vérifier qu'un lien "se désabonner" n'a pas été forgé, sans
// exposer d'identifiant interne ni nécessiter de compte utilisateur.
function secret() {
  return process.env.AUTH_SECRET || "dev-secret-desabonnement";
}

export function genererTokenDesabonnement(email) {
  return crypto
    .createHmac("sha256", secret())
    .update((email || "").toLowerCase().trim())
    .digest("hex");
}

export function verifierTokenDesabonnement(email, token) {
  if (!email || !token) return false;
  const attendu = genererTokenDesabonnement(email);
  const a = Buffer.from(attendu);
  const b = Buffer.from(String(token));
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
