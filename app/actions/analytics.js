"use server";

import { prisma } from "@/lib/prisma";

// 📊 Enregistre une vue de page (appelé côté client à chaque changement de route).
// Best-effort : une erreur ici ne doit jamais casser la navigation de l'utilisateur.
export async function enregistrerVue(path, sejourId) {
  try {
    if (!path) return { success: false };
    await prisma.pageView.create({
      data: { path, sejourId: sejourId || null },
    });
    return { success: true };
  } catch (error) {
    console.error("Error recording page view:", error);
    return { success: false };
  }
}

// 📈 Pages les plus consultées sur une période (par défaut : 30 derniers jours)
export async function statsPagesVues(depuisJours = 30) {
  const depuis = new Date(Date.now() - depuisJours * 24 * 60 * 60 * 1000);

  const [total, parPage] = await Promise.all([
    prisma.pageView.count({ where: { createdAt: { gte: depuis } } }),
    prisma.pageView.groupBy({
      by: ["path"],
      where: { createdAt: { gte: depuis } },
      _count: { path: true },
      orderBy: { _count: { path: "desc" } },
      take: 15,
    }),
  ]);

  return {
    total,
    parPage: parPage.map((p) => ({ path: p.path, vues: p._count.path })),
  };
}

// 🏕️ Séjours les plus consultés sur une période
export async function statsSejoursVus(depuisJours = 30) {
  const depuis = new Date(Date.now() - depuisJours * 24 * 60 * 60 * 1000);

  const groupes = await prisma.pageView.groupBy({
    by: ["sejourId"],
    where: { createdAt: { gte: depuis }, sejourId: { not: null } },
    _count: { sejourId: true },
    orderBy: { _count: { sejourId: "desc" } },
    take: 15,
  });

  if (groupes.length === 0) return [];

  const sejours = await prisma.sejour.findMany({
    where: { id: { in: groupes.map((g) => g.sejourId) } },
    select: { id: true, titre: true },
  });
  const titreParId = Object.fromEntries(sejours.map((s) => [s.id, s.titre]));

  return groupes.map((g) => ({
    sejourId: g.sejourId,
    titre: titreParId[g.sejourId] || "Séjour supprimé",
    vues: g._count.sejourId,
  }));
}

// 🎯 Statistiques de l'association : participants, inscriptions, réinscriptions
export async function statsAssociation() {
  const [sejours, inscriptions] = await Promise.all([
    prisma.sejour.findMany({
      select: { id: true, titre: true, places: true, prix: true, dateDebut: true, statut: true },
    }),
    prisma.inscription.findMany({
      select: {
        id: true,
        statut: true,
        clientId: true,
        enfantId: true,
        sejourId: true,
        createdAt: true,
      },
    }),
  ]);

  // Participants confirmés (paiement validé) par séjour
  const parSejour = sejours.map((s) => {
    const insSejour = inscriptions.filter((i) => i.sejourId === s.id);
    const confirmes = insSejour.filter((i) => i.statut === "Paiement validé").length;
    const enAttente = insSejour.filter((i) => i.statut === "Inscription envoyée").length;
    const annulees = insSejour.filter((i) => i.statut === "Annulée").length;
    return {
      id: s.id,
      titre: s.titre,
      places: s.places || 0,
      prix: s.prix || 0,
      confirmes,
      enAttente,
      annulees,
      total: insSejour.length,
      tauxRemplissage: s.places > 0 ? Math.round((confirmes / s.places) * 100) : 0,
      revenu: confirmes * (s.prix || 0),
    };
  }).sort((a, b) => b.total - a.total);

  // Réinscriptions : enfants ayant plus d'une inscription (toutes séjours confondus)
  const inscriptionsParEnfant = {};
  for (const ins of inscriptions) {
    inscriptionsParEnfant[ins.enfantId] = (inscriptionsParEnfant[ins.enfantId] || 0) + 1;
  }
  const enfantsReinscrits = Object.values(inscriptionsParEnfant).filter((n) => n > 1).length;
  const enfantsUniques = Object.keys(inscriptionsParEnfant).length;

  // Familles distinctes
  const famillesUniques = new Set(inscriptions.map((i) => i.clientId)).size;

  const totalConfirmees = inscriptions.filter((i) => i.statut === "Paiement validé").length;
  const totalEnAttente = inscriptions.filter((i) => i.statut === "Inscription envoyée").length;
  const totalAnnulees = inscriptions.filter((i) => i.statut === "Annulée").length;
  const tauxConversion = inscriptions.length > 0
    ? Math.round((totalConfirmees / inscriptions.length) * 100)
    : 0;

  const revenuTotal = parSejour.reduce((sum, s) => sum + s.revenu, 0);

  // Évolution mensuelle des inscriptions (12 derniers mois)
  const parMois = {};
  const maintenant = new Date();
  for (let i = 11; i >= 0; i--) {
    const d = new Date(maintenant.getFullYear(), maintenant.getMonth() - i, 1);
    const cle = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    parMois[cle] = { mois: d.toLocaleDateString("fr-FR", { month: "short", year: "2-digit" }), count: 0 };
  }
  for (const ins of inscriptions) {
    const d = new Date(ins.createdAt);
    const cle = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    if (parMois[cle]) parMois[cle].count++;
  }

  return {
    totalInscriptions: inscriptions.length,
    totalConfirmees,
    totalEnAttente,
    totalAnnulees,
    tauxConversion,
    famillesUniques,
    enfantsUniques,
    enfantsReinscrits,
    tauxReinscription: enfantsUniques > 0 ? Math.round((enfantsReinscrits / enfantsUniques) * 100) : 0,
    revenuTotal,
    parSejour,
    evolutionMensuelle: Object.values(parMois),
  };
}
