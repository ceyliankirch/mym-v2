"use server";

import { prisma } from "@/lib/prisma";
import { sendInscriptionReceivedEmail, sendInscriptionConfirmationEmail, sendInscriptionCancelledEmail, sendNewInscriptionNotificationEmail, sendNewInscriptionSubmittedEmail, sendPreInscriptionEmail, sendDemandeReinfoEmail } from "@/lib/email";
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

// ✏️ MODIFIER LES INFORMATIONS DU REPRÉSENTANT LÉGAL (espace famille)
export async function modifierClient(clientId, data) {
  if (!clientId) {
    return { error: "Données incomplètes" };
  }

  try {
    const client = await prisma.client.update({
      where: { id: clientId },
      data: {
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        telephone: data.telephone,
      },
    });

    revalidatePath("/espace-famille");
    revalidatePath("/admin");

    return { success: true, client };
  } catch (error) {
    console.error("Error updating client:", error);
    return { error: "Erreur lors de la mise à jour du représentant légal" };
  }
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
        sexe: enfantData.sexe || null,
        taille: enfantData.taille ? parseInt(enfantData.taille, 10) : null,
        poids: enfantData.poids ? parseInt(enfantData.poids, 10) : null,
        pointure: enfantData.pointure ? parseInt(enfantData.pointure, 10) : null,
        allergies: enfantData.allergies || null,
        informationsComplementaires: enfantData.informationsComplementaires || null,
      },
    });

    return { success: true, enfant };
  } catch (error) {
    console.error("Error creating enfant:", error);
    return { error: "Erreur lors de la création de l'enfant" };
  }
}

// ✏️ MODIFIER LES INFORMATIONS D'UN ENFANT (espace famille)
export async function modifierEnfant(enfantId, clientId, enfantData) {
  if (!enfantId || !clientId) {
    return { error: "Données incomplètes" };
  }

  try {
    const enfant = await prisma.enfant.findUnique({ where: { id: enfantId } });
    if (!enfant || enfant.clientId !== clientId) {
      return { error: "Enfant introuvable" };
    }

    const updated = await prisma.enfant.update({
      where: { id: enfantId },
      data: {
        prenom: enfantData.prenom,
        nom: enfantData.nom,
        dateNaissance: enfantData.dateNaissance
          ? new Date(enfantData.dateNaissance)
          : null,
        sexe: enfantData.sexe || null,
        taille: enfantData.taille ? parseInt(enfantData.taille, 10) : null,
        poids: enfantData.poids ? parseInt(enfantData.poids, 10) : null,
        pointure: enfantData.pointure ? parseInt(enfantData.pointure, 10) : null,
        allergies: enfantData.allergies || null,
        informationsComplementaires: enfantData.informationsComplementaires || null,
      },
    });

    revalidatePath("/espace-famille");
    revalidatePath("/admin");

    return { success: true, enfant: updated };
  } catch (error) {
    console.error("Error updating enfant:", error);
    return { error: "Erreur lors de la mise à jour de l'enfant" };
  }
}

// 🗑️ SUPPRIMER UN ENFANT (espace famille — vérifie que le client est bien propriétaire)
export async function supprimerEnfant(enfantId, clientId) {
  if (!enfantId || !clientId) {
    return { error: "Données incomplètes" };
  }

  try {
    const enfant = await prisma.enfant.findUnique({
      where: { id: enfantId },
      include: { _count: { select: { inscriptions: true } } },
    });

    if (!enfant || enfant.clientId !== clientId) {
      return { error: "Enfant introuvable" };
    }

    if (enfant._count.inscriptions > 0) {
      return { error: "Impossible de supprimer un enfant ayant des inscriptions. Annulez d'abord ses inscriptions." };
    }

    await prisma.enfant.delete({ where: { id: enfantId } });

    revalidatePath("/espace-famille");
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error("Error deleting enfant:", error);
    return { error: "Erreur lors de la suppression de l'enfant" };
  }
}

// 🗑️ SUPPRIMER UN ENFANT (admin — pas de vérification de propriétaire)
export async function supprimerEnfantAdmin(enfantId) {
  if (!enfantId) {
    return { error: "ID enfant manquant" };
  }

  try {
    const enfant = await prisma.enfant.findUnique({
      where: { id: enfantId },
      include: { _count: { select: { inscriptions: true } } },
    });

    if (!enfant) {
      return { error: "Enfant introuvable" };
    }

    if (enfant._count.inscriptions > 0) {
      return { error: "Impossible de supprimer un enfant ayant des inscriptions. Supprimez d'abord ses inscriptions." };
    }

    // Les documents liés sont supprimés en cascade (onDelete: Cascade dans le schéma)
    await prisma.enfant.delete({ where: { id: enfantId } });

    revalidatePath("/espace-famille");
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error("Error deleting enfant (admin):", error);
    return { error: "Erreur lors de la suppression de l'enfant" };
  }
}

export async function creerInscription(
  sejourId,
  enfantData,
  userId,
  paiementInfo = {},
  reponsesFormulaire = null
) {
  if (!sejourId || !enfantData || !userId) {
    return { error: "Données incomplètes" };
  }

  // On ne garde que les réponses non vides, dans un objet { libellé: valeur }
  let reponses = null;
  if (reponsesFormulaire && typeof reponsesFormulaire === "object") {
    const entries = Object.entries(reponsesFormulaire).filter(
      ([, v]) => v !== "" && v !== null && v !== undefined
    );
    if (entries.length) reponses = Object.fromEntries(entries);
  }

  const { moyenPaiement, lienPaiement, montantTotal } = paiementInfo;
  const paiementParCarte = moyenPaiement === "Carte bleue";

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
        ...(reponses ? { reponsesFormulaire: reponses } : {}),
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

    // 📧 Un email part toujours à la soumission, avec un récapitulatif PDF en pièce jointe :
    // - Carte bleue : email de "pré-inscription" avec bouton de paiement (bon lien selon le
    //   tarif choisi) ; l'email "Inscription validée" (avec la fiche sanitaire) part plus tard,
    //   quand l'admin constate le paiement reçu.
    // - Autre moyen de paiement : email "Inscription validée" envoyé directement, avec un
    //   rappel du montant à régler et la fiche sanitaire déjà jointe.
    // Une notification interne (avec le même PDF) part également à l'organisation.
    let pdfBuffer;
    try {
      pdfBuffer = await generateInscriptionPdf({ enfant, client, sejour, documentsRequis });
    } catch (e) {
      console.error("Erreur génération PDF inscription", e);
    }

    if (client.email) {
      if (paiementParCarte) {
        await sendPreInscriptionEmail({
          to: client.email,
          prenomEnfant: enfant.prenom,
          sejourTitre: sejour.titre,
          lienPaiement: lienPaiement || sejour.lienPaiementCIC,
          montantTotal,
          documentsManquants,
          pdfBuffer,
        });
      } else {
        await sendInscriptionConfirmationEmail({
          to: client.email,
          prenomEnfant: enfant.prenom,
          nomEnfant: enfant.nom,
          sejourTitre: sejour.titre,
          dateDebut: sejour.dateDebut,
          dateFin: sejour.dateFin,
          documentsRequis: documentsManquants,
          montantARegler: montantTotal,
        });
      }
    }

    await sendNewInscriptionSubmittedEmail({
      prenomEnfant: enfant.prenom,
      nomEnfant: enfant.nom,
      dateNaissanceEnfant: enfant.dateNaissance,
      sejourTitre: sejour.titre,
      clientNom: client.nom,
      clientPrenom: client.prenom,
      clientEmail: client.email,
      clientTelephone: client.telephone,
      pdfBuffer,
    });

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
        await sendInscriptionReceivedEmail({ to, prenomEnfant, sejourTitre, lienPaiementCIC: inscription.sejour?.lienPaiementCIC });
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

// 📧 RENVOYER l'email à la famille pour une inscription (admin).
// Utile quand l'envoi automatique a échoué (ex: fournisseur d'emails mal configuré).
// Renvoie l'email correspondant au statut actuel, sans rien modifier en base.
export async function renvoyerEmailInscription(id) {
  try {
    const inscription = await prisma.inscription.findUnique({
      where: { id },
      include: { client: true, enfant: true, sejour: true },
    });

    if (!inscription) return { error: "Inscription introuvable" };
    if (!inscription.client?.email) {
      return { error: "Cette famille n'a pas d'adresse email renseignée." };
    }

    const to = inscription.client.email;
    const prenomEnfant = inscription.enfant?.prenom;
    const sejourTitre = inscription.sejour?.titre;
    const lienPaiementCIC = inscription.sejour?.lienPaiementCIC;

    let result;
    if (inscription.statut === "Paiement validé") {
      result = await sendInscriptionConfirmationEmail({
        to,
        prenomEnfant,
        nomEnfant: inscription.enfant?.nom,
        sejourTitre,
        dateDebut: inscription.sejour?.dateDebut,
        dateFin: inscription.sejour?.dateFin,
        lienPaiementCIC,
        documentsRequis: inscription.sejour?.documentsRequis,
      });
    } else if (inscription.statut === "Annulée") {
      result = await sendInscriptionCancelledEmail({ to, prenomEnfant, sejourTitre });
    } else {
      result = await sendInscriptionReceivedEmail({ to, prenomEnfant, sejourTitre, lienPaiementCIC });
    }

    if (result && result.success === false) {
      return { error: result.error || "L'envoi de l'email a échoué." };
    }

    return { success: true, email: to };
  } catch (error) {
    console.error("Error resending inscription email:", error);
    return { error: "Erreur lors du renvoi de l'email" };
  }
}

// 🗑️ SUPPRIMER UNE INSCRIPTION (admin — pas de vérification de propriétaire)
export async function supprimerInscription(id) {
  try {
    const inscription = await prisma.inscription.findUnique({
      where: { id },
      include: { client: true, enfant: true, sejour: true },
    });

    await prisma.inscription.delete({ where: { id } });

    if (inscription?.client?.email) {
      try {
        await sendInscriptionCancelledEmail({
          to: inscription.client.email,
          prenomEnfant: inscription.enfant?.prenom,
          sejourTitre: inscription.sejour?.titre,
        });
      } catch (e) {
        console.error("Erreur envoi email annulation inscription", e);
      }
    }

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
    const inscription = await prisma.inscription.findUnique({
      where: { id },
      include: { client: true, enfant: true, sejour: true },
    });
    if (!inscription || inscription.clientId !== clientId) {
      return { error: "Inscription introuvable" };
    }

    await prisma.inscription.delete({ where: { id } });

    if (inscription.client?.email) {
      try {
        await sendInscriptionCancelledEmail({
          to: inscription.client.email,
          prenomEnfant: inscription.enfant?.prenom,
          sejourTitre: inscription.sejour?.titre,
        });
      } catch (e) {
        console.error("Erreur envoi email annulation inscription", e);
      }
    }

    revalidatePath("/espace-famille");
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error("Error deleting inscription (famille):", error);
    return { error: "Erreur lors de la suppression de l'inscription" };
  }
}

// ✏️ MODIFIER LES RÉPONSES AU FORMULAIRE D'UNE INSCRIPTION (espace famille)
export async function modifierReponsesInscription(inscriptionId, clientId, reponses) {
  if (!inscriptionId || !clientId) return { error: "Données incomplètes" };

  try {
    const inscription = await prisma.inscription.findUnique({ where: { id: inscriptionId } });
    if (!inscription || inscription.clientId !== clientId) {
      return { error: "Inscription introuvable" };
    }

    let clean = null;
    if (reponses && typeof reponses === "object") {
      const entries = Object.entries(reponses).filter(([, v]) => v !== "" && v !== null && v !== undefined);
      if (entries.length) clean = Object.fromEntries(entries);
    }

    await prisma.inscription.update({
      where: { id: inscriptionId },
      data: { reponsesFormulaire: clean },
    });

    revalidatePath("/espace-famille");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error updating inscription responses:", error);
    return { error: "Erreur lors de l'enregistrement" };
  }
}

// 📧 DEMANDER À LA FAMILLE DE RE-REMPLIR LE FORMULAIRE (admin) — prétexte : incident technique
export async function demanderReinfoInscription(id) {
  try {
    const inscription = await prisma.inscription.findUnique({
      where: { id },
      include: { client: true, enfant: true, sejour: true },
    });
    if (!inscription) return { error: "Inscription introuvable" };
    if (!inscription.client?.email) return { error: "Cette famille n'a pas d'adresse email renseignée." };

    const res = await sendDemandeReinfoEmail({
      to: inscription.client.email,
      prenomEnfant: inscription.enfant?.prenom,
      sejourTitre: inscription.sejour?.titre,
    });
    if (res && res.success === false) {
      return { error: res.error || "L'envoi de l'email a échoué." };
    }
    return { success: true, email: inscription.client.email };
  } catch (error) {
    console.error("Error requesting inscription re-info:", error);
    return { error: "Erreur lors de l'envoi de l'email" };
  }
}
