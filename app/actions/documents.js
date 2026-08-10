"use server";

import { prisma } from "@/lib/prisma";
import { uploadPrivateDocument, deletePrivateAsset } from "@/lib/cloudinary";
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

    // 🔒 Documents sensibles (identité, santé) : upload en accès privé/signé, jamais public
    const ancienDoc = await prisma.document.findUnique({
      where: { enfantId_type: { enfantId, type: docType } },
    });
    if (ancienDoc?.url) {
      await deletePrivateAsset(ancienDoc.url, ancienDoc.resourceType || "raw");
    }

    const uploaded = await uploadPrivateDocument(file, `documents/${enfantId}`);

    const document = await prisma.document.upsert({
      where: { enfantId_type: { enfantId, type: docType } },
      update: { url: uploaded.url, resourceType: uploaded.resourceType, statut: "EN_COURS" },
      create: { enfantId, type: docType, url: uploaded.url, resourceType: uploaded.resourceType, statut: "EN_COURS" },
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
