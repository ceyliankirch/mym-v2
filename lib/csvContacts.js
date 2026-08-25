// Parsing pur (aucun accès DB) — colonnes attendues : email,prenom,nom,tags
// (tags séparés par ";"). Une ligne d'en-tête contenant "email" est détectée
// et ignorée automatiquement. Utilisé côté client pour découper l'import en
// lots et afficher une progression.
export function parserContactsCSV(csvText) {
  if (!csvText || !csvText.trim()) return { error: "Fichier vide" };

  const lines = csvText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) return { error: "Fichier vide" };

  let startIndex = 0;
  if (lines[0].toLowerCase().includes("email")) {
    startIndex = 1;
  }

  let doublonsFichier = 0; // adresse déjà rencontrée plus haut dans ce même fichier
  let invalides = 0;

  // On dé-doublonne d'abord en mémoire (dernière occurrence gagne).
  const parsedByEmail = new Map();

  for (let i = startIndex; i < lines.length; i++) {
    const parts = lines[i].split(",").map((p) => p.trim());
    const email = (parts[0] || "").toLowerCase();

    if (!email || !email.includes("@")) {
      invalides++;
      continue;
    }

    if (parsedByEmail.has(email)) doublonsFichier++;

    parsedByEmail.set(email, {
      email,
      prenom: parts[1] || null,
      nom: parts[2] || null,
      tags: parts[3] ? parts[3].split(";").map((t) => t.trim()).filter(Boolean) : [],
    });
  }

  return {
    success: true,
    contacts: [...parsedByEmail.values()],
    doublonsFichier,
    invalides,
  };
}
