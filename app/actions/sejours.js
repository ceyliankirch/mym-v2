// app/actions/sejours.js
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadPublicImage, deletePublicAsset } from "@/lib/cloudinary";

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

  const prixArray = formData.getAll("prix").map(p => parseFloat(p)).filter(p => !isNaN(p));
  const prixPrincipal = prixArray[0] || 0;

  // Gestion de l'image de couverture
  const imageFile = formData.get("image");
  let imageUrl = null;

  if (imageFile && imageFile.size > 0) {
    const uploaded = await uploadPublicImage(imageFile, "sejours");
    imageUrl = uploaded.url;
  }

  // ⚡ Gestion de la Galerie (Multiples images)
  const galerieFiles = formData.getAll("galerie");
  const galerieUrls = [];
  for (const file of galerieFiles) {
    if (file && file.size > 0) {
      const uploaded = await uploadPublicImage(file, "sejours/galerie");
      galerieUrls.push(uploaded.url);
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
    },
  });

  revalidatePath("/admin");
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

  const prixArray = formData.getAll("prix").map(p => parseFloat(p)).filter(p => !isNaN(p));
  const prixPrincipal = prixArray[0] || 0;

  // Gestion de l'image de couverture
  const imageFile = formData.get("image");
  let imageUrl = sejourActuel.imageUrl;

  if (imageFile && imageFile.size > 0) {
    if (sejourActuel.imageUrl) {
      await deletePublicAsset(sejourActuel.imageUrl);
    }
    const uploaded = await uploadPublicImage(imageFile, "sejours");
    imageUrl = uploaded.url;
  }

  // ⚡ Gestion de la Galerie lors d'une modification
  const galerieFiles = formData.getAll("galerie"); // Les NOUVELLES images uploadées
  const anciennesUrls = formData.getAll("anciennesGalerie"); // Les anciennes images CONSERVÉES

  // 🧹 Nettoyage Cloudinary : On supprime les images que l'utilisateur a retirées de la galerie
  const removedUrls = (sejourActuel.galerie || []).filter(url => !anciennesUrls.includes(url));
  for (const url of removedUrls) {
     await deletePublicAsset(url);
  }

  // Upload des nouvelles images
  const nouvellesUrls = [];
  for (const file of galerieFiles) {
    if (file && file.size > 0) {
      const uploaded = await uploadPublicImage(file, "sejours/galerie");
      nouvellesUrls.push(uploaded.url);
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
    },
  });

  revalidatePath("/admin");
  revalidatePath("/sejours-enfants-ados");
  revalidatePath(`/sejours-enfants-ados/${id}`);
}

// 🗑️ SUPPRIMER
export async function supprimerSejour(id) {
  const sejour = await prisma.sejour.findUnique({ where: { id } });

  // On nettoie l'image principale
  if (sejour?.imageUrl) {
    await deletePublicAsset(sejour.imageUrl);
  }

  // ⚡ On nettoie aussi toutes les images de la galerie sur Cloudinary !
  if (sejour?.galerie && sejour.galerie.length > 0) {
    for (const url of sejour.galerie) {
      await deletePublicAsset(url);
    }
  }

  await prisma.sejour.delete({
    where: { id },
  });
  
  revalidatePath("/admin");
  revalidatePath("/sejours-enfants-ados");
}

// 🔄 STATUT
export async function toggleStatut(id, nouveauStatut) {
  await prisma.sejour.update({
    where: { id },
    data: { statut: nouveauStatut },
  });
  revalidatePath("/admin");
  revalidatePath("/sejours-enfants-ados");
}

// ⭐ METTRE À L'AFFICHE
export async function toggleEnAvant(id, enAvant) {
  await prisma.sejour.update({
    where: { id },
    data: { enAvant: enAvant },
  });
  revalidatePath("/admin");
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
    },
  });

  revalidatePath("/admin");
  return copie;
}