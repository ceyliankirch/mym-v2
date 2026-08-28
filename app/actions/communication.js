"use server";

import { prisma } from "@/lib/prisma";
import { put, del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

const slugify = (s) =>
  (s || "fichier")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "fichier";

export async function listerFichiersCommunication() {
  return prisma.fichierCommunication.findMany({ orderBy: { createdAt: "desc" } });
}

// 💾 Enregistre un visuel généré côté client (canvas -> dataURL PNG)
export async function enregistrerVisuelCommunication({ dataUrl, type, nom, sejourId, sejourTitre, largeur, hauteur }) {
  if (!dataUrl || !dataUrl.startsWith("data:image/")) {
    return { error: "Image invalide" };
  }

  try {
    const [meta, base64] = dataUrl.split(",");
    const mimeType = meta.match(/data:(.*?);base64/)?.[1] || "image/png";
    const ext = mimeType.split("/")[1] || "png";
    const buffer = Buffer.from(base64, "base64");

    const nomFinal = nom?.trim() || `${type}-${slugify(sejourTitre)}`;
    const blob = await put(
      `communication/${Date.now()}-${slugify(nomFinal)}.${ext}`,
      buffer,
      { access: "public", contentType: mimeType }
    );

    const fichier = await prisma.fichierCommunication.create({
      data: {
        nom: nomFinal,
        type: type || "flyer",
        url: blob.url,
        mimeType,
        taille: buffer.length,
        largeur: largeur || null,
        hauteur: hauteur || null,
        sejourId: sejourId || null,
        sejourTitre: sejourTitre || null,
      },
    });

    revalidatePath("/admin");
    return { success: true, fichier };
  } catch (error) {
    console.error("Error saving communication visual:", error);
    return { error: "Erreur lors de l'enregistrement du visuel" };
  }
}

// 📥 Import d'un fichier existant (image, PDF...) depuis le poste
export async function importerFichierCommunication(formData) {
  const file = formData.get("fichier");
  if (!file || typeof file === "string" || file.size === 0) {
    return { error: "Aucun fichier" };
  }

  try {
    const blob = await put(
      `communication/imports/${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, ""))}${file.name.match(/\.[^.]+$/)?.[0] || ""}`,
      file,
      { access: "public", contentType: file.type || undefined }
    );

    const fichier = await prisma.fichierCommunication.create({
      data: {
        nom: file.name,
        type: "import",
        url: blob.url,
        mimeType: file.type || null,
        taille: file.size,
      },
    });

    revalidatePath("/admin");
    return { success: true, fichier };
  } catch (error) {
    console.error("Error importing communication file:", error);
    return { error: "Erreur lors de l'import du fichier" };
  }
}

export async function renommerFichierCommunication(id, nom) {
  if (!id || !nom?.trim()) return { error: "Nom requis" };
  try {
    const fichier = await prisma.fichierCommunication.update({
      where: { id },
      data: { nom: nom.trim() },
    });
    revalidatePath("/admin");
    return { success: true, fichier };
  } catch (error) {
    console.error("Error renaming communication file:", error);
    return { error: "Erreur lors du renommage" };
  }
}

export async function supprimerFichierCommunication(id) {
  try {
    const fichier = await prisma.fichierCommunication.findUnique({ where: { id } });
    if (fichier?.url) {
      try { await del(fichier.url); } catch (e) { console.error("Erreur suppression blob communication", e); }
    }
    await prisma.fichierCommunication.delete({ where: { id } });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error deleting communication file:", error);
    return { error: "Erreur lors de la suppression" };
  }
}
