"use server";

import { prisma } from "@/lib/prisma";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export async function uploaderDocument(enfantId, docType, file) {
  if (!enfantId || !docType || !file) {
    return { error: "Données incomplètes" };
  }

  try {
    const enfant = await prisma.enfant.findUnique({
      where: { id: enfantId },
    });

    if (!enfant) {
      return { error: "Enfant introuvable" };
    }

    const blob = await put(
      `documents/${enfantId}/${docType}-${Date.now()}-${file.name}`,
      file,
      { access: "public" }
    );

    const document = await prisma.document.upsert({
      where: { enfantId_type: { enfantId, type: docType } },
      update: { url: blob.url, statut: "EN_COURS" },
      create: { enfantId, type: docType, url: blob.url, statut: "EN_COURS" },
    });

    revalidatePath("/espace-famille");
    revalidatePath("/admin");

    return { success: true, document };
  } catch (error) {
    console.error("Error uploading document:", error);
    return { error: "Erreur lors de l'upload du document" };
  }
}

export async function validerDocument(documentId) {
  if (!documentId) {
    return { error: "ID document manquant" };
  }

  try {
    const document = await prisma.document.update({
      where: { id: documentId },
      data: { statut: "VALIDE" },
    });

    revalidatePath("/espace-famille");
    revalidatePath("/admin");

    return { success: true, document };
  } catch (error) {
    console.error("Error validating document:", error);
    return { error: "Erreur lors de la validation du document" };
  }
}

export async function rejeterDocument(documentId) {
  if (!documentId) {
    return { error: "ID document manquant" };
  }

  try {
    const document = await prisma.document.update({
      where: { id: documentId },
      data: { statut: "MANQUANT" },
    });

    revalidatePath("/espace-famille");
    revalidatePath("/admin");

    return { success: true, document };
  } catch (error) {
    console.error("Error rejecting document:", error);
    return { error: "Erreur lors du rejet du document" };
  }
}
