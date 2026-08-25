"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sendNewsletterTest, sendNewsletterBatch } from "@/lib/postmark";
import { verifierTokenDesabonnement } from "@/lib/unsubscribeToken";

/* ═══════════════════ CONTACTS ═══════════════════ */

export async function listerContacts() {
  return prisma.newsletterContact.findMany({ orderBy: { createdAt: "desc" } });
}

export async function creerContact(data) {
  if (!data?.email) {
    return { error: "L'adresse email est requise" };
  }

  try {
    const contact = await prisma.newsletterContact.create({
      data: {
        email: data.email.trim().toLowerCase(),
        prenom: data.prenom || null,
        nom: data.nom || null,
        tags: (data.tags || []).filter(Boolean),
        abonne: true,
        source: "manuel",
      },
    });

    revalidatePath("/admin");
    return { success: true, contact };
  } catch (error) {
    if (error.code === "P2002") {
      return { error: "Cette adresse email est déjà dans la liste." };
    }
    console.error("Error creating newsletter contact:", error);
    return { error: "Erreur lors de la création du contact" };
  }
}

export async function modifierContact(id, data) {
  if (!id) return { error: "ID manquant" };

  try {
    const contact = await prisma.newsletterContact.update({
      where: { id },
      data: {
        prenom: data.prenom || null,
        nom: data.nom || null,
        tags: (data.tags || []).filter(Boolean),
        abonne: data.abonne,
      },
    });

    revalidatePath("/admin");
    return { success: true, contact };
  } catch (error) {
    console.error("Error updating newsletter contact:", error);
    return { error: "Erreur lors de la mise à jour du contact" };
  }
}

export async function supprimerContact(id) {
  try {
    await prisma.newsletterContact.delete({ where: { id } });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error deleting newsletter contact:", error);
    return { error: "Erreur lors de la suppression du contact" };
  }
}

export async function supprimerContacts(ids) {
  if (!ids || ids.length === 0) return { error: "Aucun contact sélectionné" };
  try {
    const { count } = await prisma.newsletterContact.deleteMany({ where: { id: { in: ids } } });
    revalidatePath("/admin");
    return { success: true, count };
  } catch (error) {
    console.error("Error bulk deleting newsletter contacts:", error);
    return { error: "Erreur lors de la suppression des contacts" };
  }
}

// 🏷️ Ajoute une liste (tag) à plusieurs contacts en une fois. Un contact peut
// appartenir à plusieurs listes ; celles déjà présentes ne sont pas dupliquées.
export async function assignerListeContacts(contactIds, liste) {
  const listeClean = (liste || "").trim();
  if (!listeClean) return { error: "Nom de liste requis" };
  if (!contactIds || contactIds.length === 0) return { error: "Aucun contact sélectionné" };

  const contacts = await prisma.newsletterContact.findMany({
    where: { id: { in: contactIds } },
    select: { id: true, tags: true },
  });

  const TAILLE_LOT = 20;
  for (let i = 0; i < contacts.length; i += TAILLE_LOT) {
    const lot = contacts.slice(i, i + TAILLE_LOT);
    await Promise.all(
      lot.map((c) => {
        if ((c.tags || []).includes(listeClean)) return null;
        return prisma.newsletterContact.update({
          where: { id: c.id },
          data: { tags: [...(c.tags || []), listeClean] },
        });
      })
    );
  }

  revalidatePath("/admin");
  return { success: true, count: contacts.length };
}

// 📥 Import d'un lot de contacts déjà parsés côté client (voir lib/csvContacts.js) —
// appelé plusieurs fois de suite pour afficher une progression sur les gros fichiers.
export async function importerLotContacts(lot) {
  if (!lot || lot.length === 0) return { success: true, nouveaux: 0, misAJour: 0, invalides: 0 };

  const emails = lot.map((c) => c.email);
  const existants = await prisma.newsletterContact.findMany({
    where: { email: { in: emails } },
    select: { email: true },
  });
  const emailsExistants = new Set(existants.map((c) => c.email));

  let nouveaux = 0;
  let misAJour = 0;
  let invalides = 0;

  const TAILLE_LOT = 20;
  for (let i = 0; i < lot.length; i += TAILLE_LOT) {
    const sousLot = lot.slice(i, i + TAILLE_LOT);
    await Promise.all(
      sousLot.map(async ({ email, prenom, nom, tags }) => {
        try {
          await prisma.newsletterContact.upsert({
            where: { email },
            update: {
              ...(prenom ? { prenom } : {}),
              ...(nom ? { nom } : {}),
              ...(tags?.length ? { tags } : {}),
            },
            create: { email, prenom, nom, tags: tags || [], abonne: true, source: "import" },
          });
          if (emailsExistants.has(email)) misAJour++;
          else nouveaux++;
        } catch (e) {
          console.error("Erreur import contact", email, e);
          invalides++;
        }
      })
    );
  }

  return { success: true, nouveaux, misAJour, invalides };
}

// 🚫 Désabonnement en un clic depuis le lien envoyé dans les campagnes
export async function desabonnerContact(formData) {
  const email = (formData.get("email") || "").toString().toLowerCase().trim();
  const token = (formData.get("token") || "").toString();

  if (email && verifierTokenDesabonnement(email, token)) {
    await prisma.newsletterContact.updateMany({ where: { email }, data: { abonne: false } });
    revalidatePath("/admin");
  }

  redirect("/desabonnement?done=1");
}

// 📤 Export CSV — filtré par tag si fourni
export async function exporterContactsCSV(tagFiltre) {
  const where = tagFiltre ? { tags: { has: tagFiltre } } : {};
  const contacts = await prisma.newsletterContact.findMany({ where, orderBy: { email: "asc" } });

  const header = "email,prenom,nom,tags,abonne\n";
  const rows = contacts
    .map((c) => `${c.email},${c.prenom || ""},${c.nom || ""},${(c.tags || []).join(";")},${c.abonne ? "oui" : "non"}`)
    .join("\n");

  return { success: true, csv: header + rows };
}

/* ═══════════════════ CAMPAGNES ═══════════════════ */

export async function listerCampagnes() {
  return prisma.newsletterCampagne.findMany({ orderBy: { createdAt: "desc" } });
}

export async function creerCampagne(data) {
  try {
    const campagne = await prisma.newsletterCampagne.create({
      data: {
        sujet: data.sujet || "Sans titre",
        htmlContent: data.htmlContent || "",
        tagsCiblage: (data.tagsCiblage || []).filter(Boolean),
      },
    });

    revalidatePath("/admin");
    return { success: true, campagne };
  } catch (error) {
    console.error("Error creating campaign:", error);
    return { error: "Erreur lors de la création de la campagne" };
  }
}

export async function modifierCampagne(id, data) {
  try {
    const campagneActuelle = await prisma.newsletterCampagne.findUnique({ where: { id } });
    if (!campagneActuelle) return { error: "Campagne introuvable" };
    if (campagneActuelle.statut === "Envoyée") {
      return { error: "Cette campagne a déjà été envoyée, elle ne peut plus être modifiée." };
    }

    const campagne = await prisma.newsletterCampagne.update({
      where: { id },
      data: {
        sujet: data.sujet,
        htmlContent: data.htmlContent,
        tagsCiblage: (data.tagsCiblage || []).filter(Boolean),
      },
    });

    revalidatePath("/admin");
    return { success: true, campagne };
  } catch (error) {
    console.error("Error updating campaign:", error);
    return { error: "Erreur lors de la mise à jour de la campagne" };
  }
}

export async function supprimerCampagne(id) {
  try {
    await prisma.newsletterCampagne.delete({ where: { id } });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error deleting campaign:", error);
    return { error: "Erreur lors de la suppression de la campagne" };
  }
}

// 🧪 Envoi d'un email de test (n'affecte pas le statut de la campagne)
export async function envoyerTestCampagne(campagneId, emailTest) {
  if (!emailTest) return { error: "Adresse email de test requise" };

  try {
    const campagne = await prisma.newsletterCampagne.findUnique({ where: { id: campagneId } });
    if (!campagne) return { error: "Campagne introuvable" };

    const result = await sendNewsletterTest({
      to: emailTest,
      sujet: `[TEST] ${campagne.sujet}`,
      htmlContent: campagne.htmlContent,
    });

    if (!result.success) {
      return { error: result.error || "Erreur lors de l'envoi du test" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error sending test campaign:", error);
    return { error: "Erreur lors de l'envoi du test" };
  }
}

// 🚀 Envoi de la campagne à tous les contacts ciblés (irréversible : marque la campagne comme envoyée)
export async function envoyerCampagne(campagneId) {
  try {
    const campagne = await prisma.newsletterCampagne.findUnique({ where: { id: campagneId } });
    if (!campagne) return { error: "Campagne introuvable" };
    if (campagne.statut === "Envoyée") {
      return { error: "Cette campagne a déjà été envoyée." };
    }

    const where = {
      abonne: true,
      ...(campagne.tagsCiblage?.length ? { tags: { hasSome: campagne.tagsCiblage } } : {}),
    };
    const contacts = await prisma.newsletterContact.findMany({ where });

    if (contacts.length === 0) {
      return { error: "Aucun destinataire abonné ne correspond à ce ciblage." };
    }

    const result = await sendNewsletterBatch({
      recipients: contacts.map((c) => c.email),
      sujet: campagne.sujet,
      htmlContent: campagne.htmlContent,
    });

    if (!result.success) {
      return { error: result.error || "Erreur lors de l'envoi de la campagne" };
    }

    await prisma.newsletterCampagne.update({
      where: { id: campagneId },
      data: { statut: "Envoyée", envoyeeLe: new Date(), destinatairesCount: contacts.length },
    });

    revalidatePath("/admin");
    return { success: true, destinatairesCount: contacts.length };
  } catch (error) {
    console.error("Error sending campaign:", error);
    return { error: "Erreur lors de l'envoi de la campagne" };
  }
}
