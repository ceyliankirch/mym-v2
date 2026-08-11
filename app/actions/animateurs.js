// app/actions/animateurs.js
"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { put, del } from "@vercel/blob";

export async function creerAnimateur(formData) {
  const nom = formData.get("nom");
  const role = formData.get("role");
  const bio = formData.get("bio");
  const imageFile = formData.get("image");

  let imageUrl = null;
  if (imageFile && imageFile.size > 0) {
    const blob = await put(`equipe/${Date.now()}-${imageFile.name}`, imageFile, { access: 'public' });
    imageUrl = blob.url;
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
      try { await del(animateurActuel.imageUrl); } catch (e) { console.error("Erreur suppression ancien blob", e); }
    }
    const blob = await put(`equipe/${Date.now()}-${imageFile.name}`, imageFile, { access: 'public' });
    data.imageUrl = blob.url;
  }

  await prisma.animateur.update({ where: { id }, data });
  revalidatePath("/admin");
  revalidatePath("/qui-sommes-nous");
}

export async function supprimerAnimateur(id) {
  const animateur = await prisma.animateur.findUnique({ where: { id } });
  if (animateur?.imageUrl) {
    try { await del(animateur.imageUrl); } catch (e) { console.error("Erreur suppression blob", e); }
  }
  await prisma.animateur.delete({ where: { id } });
  revalidatePath("/admin");
  revalidatePath("/qui-sommes-nous");
}
