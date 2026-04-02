"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { put, del } from "@vercel/blob"; // 📸 Importation de l'outil de stockage Vercel

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
  
  // On récupère tous les prix saisis (formData.getAll récupère la liste des inputs avec le même name)
  const prixArray = formData.getAll("prix").map(p => parseFloat(p)).filter(p => !isNaN(p));
  const prixPrincipal = prixArray[0] || 0; // On stocke le premier prix comme prix de référence

  // Gestion de l'image avec Vercel Blob
  const imageFile = formData.get("image");
  let imageUrl = null;

  if (imageFile && imageFile.size > 0) {
    // On envoie l'image sur les serveurs de Vercel
    const blob = await put(`sejours/${Date.now()}-${imageFile.name}`, imageFile, {
      access: 'public',
    });
    imageUrl = blob.url;
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
    },
  });

  revalidatePath("/admin");
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
  
  const prixArray = formData.getAll("prix").map(p => parseFloat(p)).filter(p => !isNaN(p));
  const prixPrincipal = prixArray[0] || 0;

  // Gestion de l'image
  const imageFile = formData.get("image");
  let imageUrl = sejourActuel.imageUrl; // Par défaut on garde l'ancienne

  // Si une nouvelle image est sélectionnée
  if (imageFile && imageFile.size > 0) {
    // 1. On supprime l'ancienne image sur Vercel Blob pour ne pas encombrer le stockage
    if (sejourActuel.imageUrl) {
      try { await del(sejourActuel.imageUrl); } catch (e) { console.error("Erreur suppression ancien blob", e); }
    }
    // 2. On upload la nouvelle
    const blob = await put(`sejours/${Date.now()}-${imageFile.name}`, imageFile, {
      access: 'public',
    });
    imageUrl = blob.url;
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
    },
  });

  revalidatePath("/admin");
}

// 🗑️ SUPPRIMER
export async function supprimerSejour(id) {
  // On récupère le séjour pour avoir l'URL de l'image
  const sejour = await prisma.sejour.findUnique({ where: { id } });

  // On nettoie l'image sur Vercel Blob avant de supprimer le record en base
  if (sejour?.imageUrl) {
    try { await del(sejour.imageUrl); } catch (e) { console.error("Erreur suppression blob", e); }
  }

  await prisma.sejour.delete({
    where: { id },
  });
  
  revalidatePath("/admin");
}

export async function toggleStatut(id, nouveauStatut) {
  await prisma.sejour.update({
    where: { id },
    data: { statut: nouveauStatut },
  });
  revalidatePath("/admin");
}

// ⭐ METTRE À L'AFFICHE (Oui / Non)
export async function toggleEnAvant(id, enAvant) {
  await prisma.sejour.update({
    where: { id },
    data: { enAvant: enAvant },
  });
  revalidatePath("/admin");
}