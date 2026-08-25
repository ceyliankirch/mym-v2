"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { sendNewsletterTest, sendNewsletterBatch } from "@/lib/postmark";

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

// 📥 Import CSV — colonnes attendues : email,prenom,nom,tags (tags séparés par ";")
// Une ligne d'en-tête contenant "email" est détectée et ignorée automatiquement.
export async function importerContactsCSV(csvText) {
  if (!csvText || !csvText.trim()) {
    return { error: "Fichier vide" };
  }

  const lines = csvText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) {
    return { error: "Fichier vide" };
  }

  let startIndex = 0;
  if (lines[0].toLowerCase().includes("email")) {
    startIndex = 1;
  }

  let doublonsFichier = 0; // adresse déjà rencontrée plus haut dans ce même fichier
  let invalides = 0;

  // On dé-doublonne d'abord en mémoire (dernière occurrence gagne) pour n'avoir
  // qu'une seule opération DB par email, au lieu de 2 requêtes séquentielles/ligne.
  const parsedByEmail = new Map();

  for (let i = startIndex; i < lines.length; i++) {
    const parts = lines[i].split(",").map((p) => p.trim());
    const email = (parts[0] || "").toLowerCase();

    if (!email || !email.includes("@")) {
      invalides++;
      continue;
    }

    if (parsedByEmail.has(email)) doublonsFichier++;

    parsedByEmail.set(email, {
      prenom: parts[1] || null,
      nom: parts[2] || null,
      tags: parts[3] ? parts[3].split(";").map((t) => t.trim()).filter(Boolean) : [],
    });
  }

  const emails = [...parsedByEmail.keys()];
  const existants = await prisma.newsletterContact.findMany({
    where: { email: { in: emails } },
    select: { email: true },
  });
  const emailsExistants = new Set(existants.map((c) => c.email));

  let nouveaux = 0;
  let misAJour = 0;

  // Upserts en lots pour rester rapide sans saturer la connexion DB.
  const TAILLE_LOT = 20;
  for (let i = 0; i < emails.length; i += TAILLE_LOT) {
    const lot = emails.slice(i, i + TAILLE_LOT);
    await Promise.all(
      lot.map(async (email) => {
        const { prenom, nom, tags } = parsedByEmail.get(email);
        try {
          await prisma.newsletterContact.upsert({
            where: { email },
            update: {
              ...(prenom ? { prenom } : {}),
              ...(nom ? { nom } : {}),
              ...(tags.length ? { tags } : {}),
            },
            create: { email, prenom, nom, tags, abonne: true, source: "import" },
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

  revalidatePath("/admin");
  return {
    success: true,
    nouveaux,
    misAJour,
    doublonsFichier,
    invalides,
    // Conservés pour compatibilité avec un éventuel appelant existant
    imported: nouveaux + misAJour,
    skipped: invalides,
  };
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
