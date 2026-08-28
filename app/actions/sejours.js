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

  const prixArray = formData.getAll("prix").map(p => parseFloat(p)).filter(p => !isNaN(p));
  const prixPrincipal = prixArray[0] || 0;

  // Gestion de l'image de couverture
  const imageFile = formData.get("image");
  let imageUrl = null;

  if (imageFile && imageFile.size > 0) {
    const blob = await put(`sejours/${Date.now()}-${imageFile.name}`, imageFile, { access: 'public' });
    imageUrl = blob.url;
  }

  // ⚡ Gestion de la Galerie (Multiples images)
  const galerieFiles = formData.getAll("galerie");
  const galerieUrls = [];
  for (const file of galerieFiles) {
    if (file && file.size > 0) {
      const blob = await put(`sejours/galerie/${Date.now()}-${file.name}`, file, { access: 'public' });
      galerieUrls.push(blob.url);
    }
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
      imageUrl,
      // ⚡ Sauvegarde des nouveaux champs
      shortDescription,
      programme,
      infosPratiques,
      adresseComplete,
      formSchema,
      documentsRequis,
      galerie: galerieUrls,
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

  const prixArray = formData.getAll("prix").map(p => parseFloat(p)).filter(p => !isNaN(p));
  const prixPrincipal = prixArray[0] || 0;

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

  // ⚡ Gestion de la Galerie lors d'une modification
  const galerieFiles = formData.getAll("galerie"); // Les NOUVELLES images uploadées
  const anciennesUrls = formData.getAll("anciennesGalerie"); // Les anciennes images CONSERVÉES

  // 🧹 Nettoyage Vercel : On supprime les images que l'utilisateur a retirées de la galerie
  const removedUrls = (sejourActuel.galerie || []).filter(url => !anciennesUrls.includes(url));
  for (const url of removedUrls) {
     try { await del(url); } catch (e) { console.error("Erreur suppression image galerie", e); }
  }

  // Upload des nouvelles images
  const nouvellesUrls = [];
  for (const file of galerieFiles) {
    if (file && file.size > 0) {
      const blob = await put(`sejours/galerie/${Date.now()}-${file.name}`, file, { access: 'public' });
      nouvellesUrls.push(blob.url);
    }
  }

  // On fusionne les anciennes qu'on a gardées + les nouvelles
  const finalGalerie = [...anciennesUrls, ...nouvellesUrls];

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