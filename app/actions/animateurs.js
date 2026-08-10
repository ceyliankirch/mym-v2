// app/actions/animateurs.js
"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadPublicImage, deletePublicAsset } from "@/lib/cloudinary";

export async function creerAnimateur(formData) {
  const nom = formData.get("nom");
  const role = formData.get("role");
  const bio = formData.get("bio");
  const imageFile = formData.get("image");

  let imageUrl = null;
  if (imageFile && imageFile.size > 0) {
    const uploaded = await uploadPublicImage(imageFile, "equipe");
    imageUrl = uploaded.url;
  }

  await prisma.animateur.create({
    data: { nom, role, bio, imageUrl }
  });
  revalidatePath("/admin");
  revalidatePath("/qui-sommes-nous");
}

export async function modifierAnimateur(id, formData) {
  const nom = formData.get("nom");
  const role = formData.get("role");
  const bio = formData.get("bio");
  const imageFile = formData.get("image");

  const data = { nom, role, bio };

  if (imageFile && imageFile.size > 0) {
    const animateurActuel = await prisma.animateur.findUnique({ where: { id } });
    if (animateurActuel?.imageUrl) {
      await deletePublicAsset(animateurActuel.imageUrl);
    }
    const uploaded = await uploadPublicImage(imageFile, "equipe");
    data.imageUrl = uploaded.url;
  }

  await prisma.animateur.update({ where: { id }, data });
  revalidatePath("/admin");
  revalidatePath("/qui-sommes-nous");
}

export async function supprimerAnimateur(id) {
  const animateur = await prisma.animateur.findUnique({ where: { id } });
  if (animateur?.imageUrl) {
    await deletePublicAsset(animateur.imageUrl);
  }
  await prisma.animateur.delete({ where: { id } });
  revalidatePath("/admin");
  revalidatePath("/qui-sommes-nous");
}