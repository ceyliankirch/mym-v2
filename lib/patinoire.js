// Règles partagées (client + serveur) de l'inscription à la soirée patinoire.
// La personne qui s'inscrit compte pour une place : elle peut venir seule ou avec jusqu'à 2 invités (3 personnes max).
export const MAX_INVITES = 2;
export const MAX_ACCOMPAGNANTS = 2;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Valide la liste des participants. Renvoie { error } ou { participants, invites }.
// Rôles : "invite" (chausse les patins) ou "accompagnant" (ne patine pas).
export function validerParticipants(brut) {
  if (!Array.isArray(brut)) return { error: "Liste de participants invalide." };
  if (brut.length > MAX_INVITES + MAX_ACCOMPAGNANTS) return { error: "Trop de participants pour une même inscription." };

  const participants = [];
  for (const p of brut) {
    const prenom = (p?.prenom ?? "").toString().trim().slice(0, 100);
    const nom = (p?.nom ?? "").toString().trim().slice(0, 100);
    const email = (p?.email ?? "").toString().trim().toLowerCase().slice(0, 200);
    const role = p?.role === "accompagnant" ? "accompagnant" : "invite";
    if (!prenom || !nom) return { error: "Merci d'indiquer le prénom et le nom de chaque participant." };
    if (email && !EMAIL_REGEX.test(email)) return { error: `Adresse email invalide pour ${prenom} ${nom}.` };
    participants.push({ prenom, nom, email, role });
  }

  const invites = participants.filter((p) => p.role === "invite").length;
  const accompagnants = participants.length - invites;
  if (invites > MAX_INVITES) return { error: `Vous pouvez inviter ${MAX_INVITES} personnes au maximum (3 personnes par inscription, vous compris).` };
  if (accompagnants > MAX_ACCOMPAGNANTS) return { error: `Vous pouvez ajouter ${MAX_ACCOMPAGNANTS} accompagnants au maximum.` };

  return { participants, invites };
}
