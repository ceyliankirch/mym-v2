// app/actions/galerie.js
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadPublicImage, deletePublicAsset } from "@/lib/cloudinary";

// ➕ CRÉER UN ALBUM (avec photos initiales)
export async function creerAlbum(formData) {
  const titre = formData.get("titre");
  const sejourId = formData.get("sejourId") || null;

  const photoFiles = formData.getAll("photos");
  const photoUrls = [];
  for (const file of photoFiles) {
    if (file && file.size > 0) {
      const uploaded = await uploadPublicImage(file, "galerie");
      photoUrls.push(uploaded.url);
    }
  }

  await prisma.album.create({
    data: {
      titre,
      sejourId: sejourId || null,
      photos: { create: photoUrls.map((url) => ({ url })) },
    },
  });

  revalidatePath("/admin");
  revalidatePath("/galerie");
}

// ✏️ MODIFIER UN ALBUM (titre, séjour lié, ajout de nouvelles photos)
export async function modifierAlbum(id, formData) {
  const titre = formData.get("titre");
  const sejourId = formData.get("sejourId") || null;

  const photoFiles = formData.getAll("photos");
  const photoUrls = [];
  for (const file of photoFiles) {
    if (file && file.size > 0) {
      const uploaded = await uploadPublicImage(file, "galerie");
      photoUrls.push(uploaded.url);
    }
  }

  await prisma.album.update({
    where: { id },
    data: {
      titre,
      sejourId: sejourId || null,
      photos: { create: photoUrls.map((url) => ({ url })) },
    },
  });

  revalidatePath("/admin");
  revalidatePath("/galerie");
}

// 🗑️ SUPPRIMER UN ALBUM (et toutes ses photos)
export async function supprimerAlbum(id) {
  const album = await prisma.album.findUnique({ where: { id }, include: { photos: true } });

  for (const photo of album?.photos || []) {
    await deletePublicAsset(photo.url);
  }

  await prisma.album.delete({ where: { id } });

  revalidatePath("/admin");
  revalidatePath("/galerie");
}

// ⭐ METTRE/RETIRER UNE PHOTO À L'AFFICHE (page d'accueil)
export async function togglePhotoEnAvant(id, enAvant) {
  await prisma.photo.update({
    where: { id },
    data: { enAvant },
  });
  revalidatePath("/admin");
  revalidatePath("/galerie");
  revalidatePath("/");
}

// 🗑️ SUPPRIMER UNE PHOTO
export async function supprimerPhoto(id) {
  const photo = await prisma.photo.findUnique({ where: { id } });
  if (!photo) return;

  await deletePublicAsset(photo.url);

  await prisma.photo.delete({ where: { id } });

  revalidatePath("/admin");
  revalidatePath("/galerie");
}
