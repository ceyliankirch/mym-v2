"use server";

import { prisma } from "@/lib/prisma";
import { sendInscriptionReceivedEmail, sendDocumentsRequestEmail, sendInscriptionConfirmationEmail, sendInscriptionCancelledEmail, sendNewInscriptionNotificationEmail } from "@/lib/postmark";
import { generateInscriptionPdf } from "@/lib/inscriptionPdf";
import { CATALOGUE_DOCUMENTS } from "@/lib/documents";
import { revalidatePath } from "next/cache";
import { STATUTS_INSCRIPTION } from "@/lib/inscriptions";

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
        statut: "Inscription envoyée",
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

    // 📧 Un email part toujours à la soumission : la demande de documents s'il en manque,
    // sinon un simple accusé de réception. Les deux ont en pièce jointe un récapitulatif PDF.
    if (client.email) {
      let pdfBuffer;
      try {
        pdfBuffer = await generateInscriptionPdf({ enfant, client, sejour, documentsRequis });
      } catch (e) {
        console.error("Erreur génération PDF inscription", e);
      }

      if (documentsManquants.length > 0) {
        await sendDocumentsRequestEmail({
          to: client.email,
          prenomEnfant: enfant.prenom,
          sejourTitre: sejour.titre,
          documentsManquants,
          pdfBuffer,
        });
      } else {
        await sendInscriptionReceivedEmail({
          to: client.email,
          prenomEnfant: enfant.prenom,
          sejourTitre: sejour.titre,
          pdfBuffer,
        });
      }
    }

    revalidatePath("/espace-famille");
    revalidatePath("/admin");

    return { success: true, inscription };
  } catch (error) {
    console.error("Error creating inscription:", error);
    return { error: "Erreur lors de la création de l'inscription" };
  }
}

// 🔄 CHANGER L'ÉTAT D'UNE INSCRIPTION (admin)
export async function changerStatutInscription(id, statut) {
  if (!STATUTS_INSCRIPTION.includes(statut)) {
    return { error: "Statut invalide" };
  }

  try {
    const inscriptionActuelle = await prisma.inscription.findUnique({
      where: { id },
    });

    const inscription = await prisma.inscription.update({
      where: { id },
      data: { statut },
      include: { client: true, enfant: true, sejour: true },
    });

    // 📧 On envoie un email à la famille à chaque BASCULEMENT réel vers un nouveau statut
    const aChangeDeStatut = inscriptionActuelle?.statut !== statut;
    if (aChangeDeStatut && inscription.client?.email) {
      const { email: to } = inscription.client;
      const prenomEnfant = inscription.enfant?.prenom;
      const sejourTitre = inscription.sejour?.titre;

      if (statut === "Inscription envoyée") {
        await sendInscriptionReceivedEmail({ to, prenomEnfant, sejourTitre });
      } else if (statut === "Paiement validé") {
        await sendInscriptionConfirmationEmail({
          to,
          prenomEnfant,
          nomEnfant: inscription.enfant?.nom,
          sejourTitre,
          dateDebut: inscription.sejour?.dateDebut,
          dateFin: inscription.sejour?.dateFin,
          lienPaiementCIC: inscription.sejour?.lienPaiementCIC,
          documentsRequis: inscription.sejour?.documentsRequis,
        });
        await sendNewInscriptionNotificationEmail({
          prenomEnfant,
          nomEnfant: inscription.enfant?.nom,
          sejourTitre,
          clientNom: inscription.client?.nom,
          clientPrenom: inscription.client?.prenom,
          clientEmail: inscription.client?.email,
          clientTelephone: inscription.client?.telephone,
        });
      } else if (statut === "Annulée") {
        await sendInscriptionCancelledEmail({ to, prenomEnfant, sejourTitre });
      }
    }

    revalidatePath("/espace-famille");
    revalidatePath("/admin");

    return { success: true, inscription };
  } catch (error) {
    console.error("Error updating inscription status:", error);
    return { error: "Erreur lors de la mise à jour du statut" };
  }
}

// 🗑️ SUPPRIMER UNE INSCRIPTION (admin — pas de vérification de propriétaire)
export async function supprimerInscription(id) {
  try {
    await prisma.inscription.delete({ where: { id } });

    revalidatePath("/espace-famille");
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error("Error deleting inscription:", error);
    return { error: "Erreur lors de la suppression de l'inscription" };
  }
}

// 🗑️ SUPPRIMER SA PROPRE INSCRIPTION (espace famille — vérifie que le client est bien propriétaire)
export async function supprimerInscriptionFamille(id, clientId) {
  if (!id || !clientId) {
    return { error: "Données incomplètes" };
  }

  try {
    const inscription = await prisma.inscription.findUnique({ where: { id } });
    if (!inscription || inscription.clientId !== clientId) {
      return { error: "Inscription introuvable" };
    }

    await prisma.inscription.delete({ where: { id } });

    revalidatePath("/espace-famille");
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error("Error deleting inscription (famille):", error);
    return { error: "Erreur lors de la suppression de l'inscription" };
  }
}
