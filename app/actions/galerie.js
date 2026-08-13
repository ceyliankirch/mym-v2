// app/actions/galerie.js
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { put, del } from "@vercel/blob";

// ➕ CRÉER UN ALBUM (avec photos initiales)
export async function creerAlbum(formData) {
  const titre = formData.get("titre");
  const sejourId = formData.get("sejourId") || null;

  const photoFiles = formData.getAll("photos");
  const photoUrls = [];
  for (const file of photoFiles) {
    if (file && file.size > 0) {
      const blob = await put(`galerie/${Date.now()}-${file.name}`, file, { access: "public" });
      photoUrls.push(blob.url);
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
  revalidatePath("/");
}

// ✏️ MODIFIER UN ALBUM (titre, séjour lié, ajout de nouvelles photos)
export async function modifierAlbum(id, formData) {
  const titre = formData.get("titre");
  const sejourId = formData.get("sejourId") || null;

  const photoFiles = formData.getAll("photos");
  const photoUrls = [];
  for (const file of photoFiles) {
    if (file && file.size > 0) {
      const blob = await put(`galerie/${Date.now()}-${file.name}`, file, { access: "public" });
      photoUrls.push(blob.url);
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
  revalidatePath("/");
}

// 🗑️ SUPPRIMER UN ALBUM (et toutes ses photos)
export async function supprimerAlbum(id) {
  const album = await prisma.album.findUnique({ where: { id }, include: { photos: true } });

  for (const photo of album?.photos || []) {
    try { await del(photo.url); } catch (e) { console.error("Erreur suppression photo", e); }
  }

  await prisma.album.delete({ where: { id } });

  revalidatePath("/admin");
  revalidatePath("/galerie");
  revalidatePath("/");
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

  try { await del(photo.url); } catch (e) { console.error("Erreur suppression photo", e); }

  await prisma.photo.delete({ where: { id } });

  revalidatePath("/admin");
  revalidatePath("/galerie");
  revalidatePath("/");
}
