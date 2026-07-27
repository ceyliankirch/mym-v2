"use server";

import { prisma } from "@/lib/prisma";
import { sendDocumentsRequestEmail } from "@/lib/resend";
import { CATALOGUE_DOCUMENTS } from "@/lib/documents";
import { revalidatePath } from "next/cache";

export async function getOrCreateClientForUser(userId) {
  let client = await prisma.client.findUnique({
    where: { userId },
  });

  if (client) return client;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) return null;

  client = await prisma.client.upsert({
    where: { email: user.email || "" },
    update: { userId },
    create: {
      userId,
      nom: user.nom || "",
      prenom: user.prenom,
      email: user.email,
      telephone: user.telephone,
    },
  });

  return client;
}

export async function creerEnfant(clientId, enfantData) {
  if (!clientId || !enfantData?.prenom || !enfantData?.nom) {
    return { error: "Données incomplètes" };
  }

  try {
    const enfant = await prisma.enfant.create({
      data: {
        clientId,
        prenom: enfantData.prenom,
        nom: enfantData.nom,
        dateNaissance: enfantData.dateNaissance
          ? new Date(enfantData.dateNaissance)
          : null,
      },
    });

    return { success: true, enfant };
  } catch (error) {
    console.error("Error creating enfant:", error);
    return { error: "Erreur lors de la création de l'enfant" };
  }
}

export async function creerInscription(
  sejourId,
  enfantData,
  userId
) {
  if (!sejourId || !enfantData || !userId) {
    return { error: "Données incomplètes" };
  }

  try {
    const sejour = await prisma.sejour.findUnique({
      where: { id: sejourId },
    });

    if (!sejour) {
      return { error: "Séjour introuvable" };
    }

    const client = await getOrCreateClientForUser(userId);
    if (!client) {
      return { error: "Impossible de créer/retrouver le client" };
    }

    let enfant;
    if (enfantData.id) {
      enfant = await prisma.enfant.findUnique({
        where: { id: enfantData.id },
      });
    } else {
      const result = await creerEnfant(client.id, enfantData);
      if (result.error) return result;
      enfant = result.enfant;
    }

    const inscription = await prisma.inscription.create({
      data: {
        clientId: client.id,
        enfantId: enfant.id,
        sejourId,
        statut: "En attente",
      },
    });

    const documentsRequis = sejour.documentsRequis || [];
    const documentsManquants = [];

    for (const docType of documentsRequis) {
      const existing = await prisma.document.findUnique({
        where: { enfantId_type: { enfantId: enfant.id, type: docType } },
      });

      if (!existing || existing.statut === "MANQUANT") {
        if (!existing) {
          await prisma.document.create({
            data: {
              enfantId: enfant.id,
              type: docType,
              statut: "MANQUANT",
            },
          });
        }
        documentsManquants.push(docType);
      }
    }

    if (documentsManquants.length > 0 && client.email) {
      await sendDocumentsRequestEmail({
        to: client.email,
        prenomEnfant: enfant.prenom,
        sejourTitre: sejour.titre,
        documentsManquants,
      });
    }

    revalidatePath("/espace-famille");
    revalidatePath("/admin");

    return { success: true, inscription };
  } catch (error) {
    console.error("Error creating inscription:", error);
    return { error: "Erreur lors de la création de l'inscription" };
  }
}
