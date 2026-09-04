// app/actions/sejours.js
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { put, del } from "@vercel/blob";
import { generateTotemiaFormPdf } from "@/lib/totemiaFormPdf";

// ➕ CRÉER
export async function creerSejour(formData) {
  const titre = formData.get("titre");
  const lieu = formData.get("lieu");
  const saison = formData.get("saison");
  const statut = formData.get("statut");
  const dateDebut = formData.get("dateDebut");
  const dateFin = formData.get("dateFin");
  const places = parseInt(formData.get("places")) || 0;
  const tranchesAge = formData.get("tranchesAge");
  
  // ⚡ Nouveaux champs récupérés du formulaire
  const shortDescription = formData.get("shortDescription") || "";
  const programme = formData.get("programme") || "";
  const infosPratiques = formData.get("infosPratiques") || "";
  const adresseComplete = formData.get("adresseComplete") || "";
  const formSchema = formData.get("formSchema") || "";
  const lienPaiementCIC = formData.get("lienPaiementCIC") || "";
  const lienPaiementCICValDeMarne = formData.get("lienPaiementCICValDeMarne") || "";

  const prixPrincipal = parseFloat(formData.get("prix")) || 0;
  const prixLabel = (formData.get("prixLabel") || "").toString().trim() || null;
  const montantAssurance = formData.get("montantAssurance") != null && formData.get("montantAssurance") !== ""
    ? parseFloat(formData.get("montantAssurance"))
    : 30;
  const gestionChambres = formData.get("gestionChambres") === "on";

  // Tarifs supplémentaires (libellé + montant), injectés en JSON par le formulaire admin
  let tarifs = [];
  try {
    const brut = JSON.parse(formData.get("tarifsSupp") || "[]");
    tarifs = (Array.isArray(brut) ? brut : [])
      .map((t) => ({ label: String(t.label || "").trim(), montant: parseFloat(t.montant) }))
      .filter((t) => t.label && !Number.isNaN(t.montant));
  } catch (e) {
    console.error("Erreur parsing tarifs", e);
  }

  // Gestion de l'image de couverture
  const imageFile = formData.get("image");
  let imageUrl = null;

  if (imageFile && imageFile.size > 0) {
    const blob = await put(`sejours/${Date.now()}-${imageFile.name}`, imageFile, { access: 'public' });
    imageUrl = blob.url;
  }

  // ⚡ Gestion de la Galerie (Multiples images) — l'ordre vient de "galerieOrdre"
  const galerieFiles = formData.getAll("galerie");
  const galerieUrls = [];
  for (const file of galerieFiles) {
    if (file && file.size > 0) {
      const blob = await put(`sejours/galerie/${Date.now()}-${file.name}`, file, { access: 'public' });
      galerieUrls.push(blob.url);
    }
  }
  let galerieFinale = galerieUrls;
  try {
    const ordre = JSON.parse(formData.get("galerieOrdre") || "[]");
    if (Array.isArray(ordre) && ordre.length) {
      galerieFinale = ordre
        .map((x) => (typeof x === "string" && x.startsWith("__new__") ? galerieUrls[parseInt(x.slice(7), 10)] : x))
        .filter(Boolean);
    }
  } catch (e) {
    console.error("Erreur parsing galerieOrdre", e);
  }

  // ⚡ Gestion des documents requis
  let documentsRequis = [];
  try {
    const docsRequisStr = formData.get("documentsRequis");
    if (docsRequisStr) {
      documentsRequis = JSON.parse(docsRequisStr);
    }
  } catch (e) {
    console.error("Erreur parsing documentsRequis", e);
  }

  await prisma.sejour.create({
    data: {
      titre,
      lieu,
      saison,
      statut,
      dateDebut: dateDebut ? new Date(dateDebut) : null,
      dateFin: dateFin ? new Date(dateFin) : null,
      places,
      tranchesAge,
      prix: prixPrincipal,
      prixLabel,
      tarifs,
      montantAssurance: Number.isNaN(montantAssurance) ? 30 : montantAssurance,
      gestionChambres,
      imageUrl,
      // ⚡ Sauvegarde des nouveaux champs
      shortDescription,
      programme,
      infosPratiques,
      adresseComplete,
      formSchema,
      documentsRequis,
      galerie: galerieFinale,
      lienPaiementCIC,
      lienPaiementCICValDeMarne,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/sejours-enfants-ados");
}

// ✏️ MODIFIER
export async function modifierSejour(id, formData) {
  const sejourActuel = await prisma.sejour.findUnique({ where: { id } });
  
  const titre = formData.get("titre");
  const lieu = formData.get("lieu");
  const saison = formData.get("saison");
  const statut = formData.get("statut");
  const dateDebut = formData.get("dateDebut");
  const dateFin = formData.get("dateFin");
  const places = parseInt(formData.get("places")) || 0;
  const tranchesAge = formData.get("tranchesAge");
  
  // ⚡ Nouveaux champs récupérés du formulaire
  const shortDescription = formData.get("shortDescription") || "";
  const programme = formData.get("programme") || "";
  const infosPratiques = formData.get("infosPratiques") || "";
  const adresseComplete = formData.get("adresseComplete") || "";
  const formSchema = formData.get("formSchema") || "";
  const lienPaiementCIC = formData.get("lienPaiementCIC") || "";
  const lienPaiementCICValDeMarne = formData.get("lienPaiementCICValDeMarne") || "";

  const prixPrincipal = parseFloat(formData.get("prix")) || 0;
  const prixLabel = (formData.get("prixLabel") || "").toString().trim() || null;
  const montantAssurance = formData.get("montantAssurance") != null && formData.get("montantAssurance") !== ""
    ? parseFloat(formData.get("montantAssurance"))
    : 30;
  const gestionChambres = formData.get("gestionChambres") === "on";

  // Tarifs supplémentaires (libellé + montant), injectés en JSON par le formulaire admin
  let tarifs = [];
  try {
    const brut = JSON.parse(formData.get("tarifsSupp") || "[]");
    tarifs = (Array.isArray(brut) ? brut : [])
      .map((t) => ({ label: String(t.label || "").trim(), montant: parseFloat(t.montant) }))
      .filter((t) => t.label && !Number.isNaN(t.montant));
  } catch (e) {
    console.error("Erreur parsing tarifs", e);
  }

  // Gestion de l'image de couverture
  const imageFile = formData.get("image");
  let imageUrl = sejourActuel.imageUrl;

  if (imageFile && imageFile.size > 0) {
    if (sejourActuel.imageUrl) {
      try { await del(sejourActuel.imageUrl); } catch (e) { console.error("Erreur suppression ancien blob", e); }
    }
    const blob = await put(`sejours/${Date.now()}-${imageFile.name}`, imageFile, { access: 'public' });
    imageUrl = blob.url;
  }

  // ⚡ Gestion de la Galerie lors d'une modification — l'ordre (et les images
  // conservées / retirées) vient de "galerieOrdre".
  const galerieFiles = formData.getAll("galerie"); // Les NOUVELLES images uploadées

  const nouvellesUrls = [];
  for (const file of galerieFiles) {
    if (file && file.size > 0) {
      const blob = await put(`sejours/galerie/${Date.now()}-${file.name}`, file, { access: 'public' });
      nouvellesUrls.push(blob.url);
    }
  }

  let finalGalerie;
  try {
    const ordre = JSON.parse(formData.get("galerieOrdre") || "[]");
    finalGalerie = (Array.isArray(ordre) ? ordre : [])
      .map((x) => (typeof x === "string" && x.startsWith("__new__") ? nouvellesUrls[parseInt(x.slice(7), 10)] : x))
      .filter(Boolean);
  } catch (e) {
    console.error("Erreur parsing galerieOrdre", e);
    finalGalerie = [...(sejourActuel.galerie || []), ...nouvellesUrls];
  }

  // 🧹 Nettoyage Vercel : on supprime du blob store les images retirées de la galerie
  const removedUrls = (sejourActuel.galerie || []).filter((url) => !finalGalerie.includes(url));
  for (const url of removedUrls) {
     try { await del(url); } catch (e) { console.error("Erreur suppression image galerie", e); }
  }

  // ⚡ Gestion des documents requis
  let documentsRequis = sejourActuel.documentsRequis;
  try {
    const docsRequisStr = formData.get("documentsRequis");
    if (docsRequisStr) {
      documentsRequis = JSON.parse(docsRequisStr);
    }
  } catch (e) {
    console.error("Erreur parsing documentsRequis", e);
  }

  await prisma.sejour.update({
    where: { id },
    data: {
      titre,
      lieu,
      saison,
      statut,
      dateDebut: dateDebut ? new Date(dateDebut) : null,
      dateFin: dateFin ? new Date(dateFin) : null,
      places,
      tranchesAge,
      prix: prixPrincipal,
      prixLabel,
      tarifs,
      montantAssurance: Number.isNaN(montantAssurance) ? 30 : montantAssurance,
      gestionChambres,
      imageUrl,
      // ⚡ Sauvegarde des nouveaux champs
      shortDescription,
      programme,
      infosPratiques,
      adresseComplete,
      formSchema,
      documentsRequis,
      galerie: finalGalerie,
      lienPaiementCIC,
      lienPaiementCICValDeMarne,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/sejours-enfants-ados");
  revalidatePath(`/sejours-enfants-ados/${id}`);
}

// 🗑️ SUPPRIMER
export async function supprimerSejour(id) {
  const sejour = await prisma.sejour.findUnique({ where: { id } });

  // On nettoie l'image principale
  if (sejour?.imageUrl) {
    try { await del(sejour.imageUrl); } catch (e) { console.error("Erreur suppression blob", e); }
  }

  // ⚡ On nettoie aussi toutes les images de la galerie sur Vercel !
  if (sejour?.galerie && sejour.galerie.length > 0) {
    for (const url of sejour.galerie) {
      try { await del(url); } catch (e) { console.error("Erreur suppression image galerie", e); }
    }
  }

  await prisma.sejour.delete({
    where: { id },
  });
  
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/sejours-enfants-ados");
}

// 🔄 STATUT
export async function toggleStatut(id, nouveauStatut) {
  await prisma.sejour.update({
    where: { id },
    data: { statut: nouveauStatut },
  });
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/sejours-enfants-ados");
}

// ⭐ METTRE À L'AFFICHE
export async function toggleEnAvant(id, enAvant) {
  await prisma.sejour.update({
    where: { id },
    data: { enAvant: enAvant },
  });
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/sejours-enfants-ados");
}

// 📄 DUPLIQUER
export async function dupliquerSejour(id) {
  const source = await prisma.sejour.findUnique({ where: { id } });
  if (!source) return null;

  const copie = await prisma.sejour.create({
    data: {
      titre: `${source.titre} (copie)`,
      lieu: source.lieu,
      dateDebut: source.dateDebut,
      dateFin: source.dateFin,
      saison: source.saison,
      imageUrl: source.imageUrl,
      places: source.places,
      prix: source.prix,
      prixLabel: source.prixLabel,
      tarifs: source.tarifs ?? undefined,
      montantAssurance: source.montantAssurance ?? 30,
      gestionChambres: source.gestionChambres ?? false,
      statut: "Brouillon", // ⚡ Toujours en brouillon le temps de vérifier la copie
      enAvant: false,
      tranchesAge: source.tranchesAge,
      shortDescription: source.shortDescription,
      programme: source.programme,
      infosPratiques: source.infosPratiques,
      adresseComplete: source.adresseComplete,
      galerie: source.galerie,
      formSchema: source.formSchema,
      documentsRequis: source.documentsRequis,
      lienPaiementCIC: source.lienPaiementCIC,
      lienPaiementCICValDeMarne: source.lienPaiementCICValDeMarne,
    },
  });

  revalidatePath("/admin");
  return copie;
}

// 📄 Génère le formulaire d'inscription "Totemia" en PDF (à imprimer / remplir à la main).
// Renvoie le PDF encodé en base64 pour un téléchargement côté client.
export async function genererFormulaireTotemiaPdf(sejourId) {
  if (!sejourId) return { error: "Séjour introuvable" };

  try {
    const sejour = await prisma.sejour.findUnique({ where: { id: sejourId } });
    if (!sejour) return { error: "Séjour introuvable" };

    const buffer = await generateTotemiaFormPdf(sejour);
    const slug = (sejour.titre || "sejour")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "sejour";

    return { base64: buffer.toString("base64"), filename: `formulaire-totemia-${slug}.pdf` };
  } catch (error) {
    console.error("Error generating Totemia form PDF:", error);
    return { error: "Erreur lors de la génération du PDF" };
  }
}