// Règles partagées (client + serveur) de l'inscription à la soirée patinoire.
export const DATE_SOIREE = "2026-12-11";
export const MAX_PATINEURS = 3;
export const MAX_ACCOMPAGNANTS = 2;

const FORMAT_DATE = /^\d{4}-\d{2}-\d{2}$/;

// Âge (en années entières) à la date de la soirée. Renvoie null si la date est invalide ou postérieure à la soirée.
export function ageALaSoiree(naissance) {
  if (typeof naissance !== "string" || !FORMAT_DATE.test(naissance)) return null;
  const [y, m, d] = naissance.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== m - 1 || dt.getUTCDate() !== d) return null;
  const [ey, em, ed] = DATE_SOIREE.split("-").map(Number);
  if (y > ey || (y === ey && (m > em || (m === em && d > ed)))) return null;
  let age = ey - y;
  if (em < m || (em === m && ed < d)) age -= 1;
  return age >= 0 && age <= 120 ? age : null;
}

// Valide la liste des participants. Renvoie { error } ou { participants, patineurs }.
export function validerParticipants(brut) {
  if (!Array.isArray(brut) || brut.length === 0) return { error: "Merci d'ajouter au moins un participant." };
  if (brut.length > MAX_PATINEURS + MAX_ACCOMPAGNANTS) return { error: "Trop de participants pour une même inscription." };

  const participants = [];
  for (const p of brut) {
    const prenom = (p?.prenom ?? "").toString().trim().slice(0, 100);
    const nom = (p?.nom ?? "").toString().trim().slice(0, 100);
    const naissance = (p?.naissance ?? "").toString().trim();
    const role = p?.role === "accompagnant" ? "accompagnant" : "patineur";
    if (!prenom || !nom) return { error: "Merci d'indiquer le prénom et le nom de chaque participant." };
    const age = ageALaSoiree(naissance);
    if (age === null) return { error: `Date de naissance invalide pour ${prenom} ${nom}.` };
    if (role === "accompagnant" && age < 18) return { error: `${prenom} ${nom} est mineur(e) : seul un adulte peut être accompagnant.` };
    participants.push({ prenom, nom, naissance, role, responsable: age >= 18 && p?.responsable === true });
  }

  const patineurs = participants.filter((p) => p.role === "patineur").length;
  const accompagnants = participants.length - patineurs;
  if (patineurs < 1) return { error: "Au moins une personne doit chausser les patins." };
  if (patineurs > MAX_PATINEURS) return { error: `Le nombre de patineurs doit être compris entre 1 et ${MAX_PATINEURS}.` };
  if (accompagnants > MAX_ACCOMPAGNANTS) return { error: `Vous pouvez ajouter ${MAX_ACCOMPAGNANTS} accompagnants non patineurs au maximum.` };

  const adultes = participants.filter((p) => ageALaSoiree(p.naissance) >= 18);
  const aMineur = participants.some((p) => ageALaSoiree(p.naissance) < 18);
  // Un seul adulte parmi les participants : il est d'office le responsable des mineurs.
  if (aMineur && adultes.length === 1) adultes[0].responsable = true;
  if (aMineur && !participants.some((p) => p.responsable)) {
    return { error: "Les mineurs doivent être accompagnés : indiquez un adulte responsable parmi les participants." };
  }

  return { participants, patineurs };
}
