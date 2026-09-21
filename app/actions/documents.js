"use server";

import { prisma } from "@/lib/prisma";
import { put, del } from "@vercel/blob";
import { PRIVATE_BLOB_TOKEN } from "@/lib/blobPrive";
import { revalidatePath } from "next/cache";
import { sendDocumentValidatedEmail, sendDocumentRejectedEmail } from "@/lib/email";

// `fichier` : soit un File (petits fichiers, envoyé via le serveur), soit l'URL d'un blob déjà uploadé directement.
export async function uploaderDocument(enfantId, docType, fichier) {
  if (!enfantId || !docType || !fichier) {
    return { error: "Données incomplètes" };
  }

  const estUrl = typeof fichier === "string";

  // 🔒 L'URL doit pointer vers notre stockage Blob, dans le dossier de cet enfant
  if (estUrl) try {
    const u = new URL(fichier);
    if (
      u.protocol !== "https:" ||
      !u.hostname.endsWith(".blob.vercel-storage.com") ||
      !decodeURIComponent(u.pathname).startsWith(`/documents/${enfantId}/`)
    ) {
      return { error: "URL de document invalide" };
    }
  } catch {
    return { error: "URL de document invalide" };
  }

  try {
    const enfant = await prisma.enfant.findUnique({
      where: { id: enfantId },
    });

    if (!enfant) {
      return { error: "Enfant introuvable" };
    }

    // 🔒 Documents sensibles (identité, santé) : upload en accès privé, jamais public
    const ancienDoc = await prisma.document.findUnique({
      where: { enfantId_type: { enfantId, type: docType } },
    });
    if (ancienDoc?.url) {
      try { await del(ancienDoc.url, { token: PRIVATE_BLOB_TOKEN }); } catch (e) { console.error("Erreur suppression ancien document", e); }
    }

    const blob = estUrl
      ? { url: fichier }
      : await put(
          `documents/${enfantId}/${docType}-${Date.now()}-${fichier.name}`,
          fichier,
          { access: "private", token: PRIVATE_BLOB_TOKEN }
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
      include: { enfant: { include: { client: true } } },
    });

    if (document.enfant?.client?.email) {
      try {
        await sendDocumentValidatedEmail({
          to: document.enfant.client.email,
          prenomEnfant: document.enfant.prenom,
          docType: document.type,
        });
      } catch (e) {
        console.error("Erreur envoi email validation document", e);
      }
    }

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
      include: { enfant: { include: { client: true } } },
    });

    if (document.enfant?.client?.email) {
      try {
        await sendDocumentRejectedEmail({
          to: document.enfant.client.email,
          prenomEnfant: document.enfant.prenom,
          docType: document.type,
        });
      } catch (e) {
        console.error("Erreur envoi email rejet document", e);
      }
    }

    revalidatePath("/espace-famille");
    revalidatePath("/admin");

    return { success: true, document };
  } catch (error) {
    console.error("Error rejecting document:", error);
    return { error: "Erreur lors du rejet du document" };
  }
}
