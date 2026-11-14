"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { sendPatinoireInscriptionEmail, sendPatinoireNotificationEmail } from "@/lib/email";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_PATINEURS = 20;

async function estAdmin() {
  const session = await auth();
  const role = session?.user?.role;
  return role === "ADMIN" || role === "ADMINISTRATEUR";
}

// ⛸️ Inscription publique à la soirée patinoire (page /patinoire).
// Renvoie { success } ou { error } — le formulaire est géré côté client.
export async function inscrirePatinoire({ nom, prenom, email, patineurs }) {
  const nomClean = (nom || "").toString().trim().slice(0, 100);
  const prenomClean = (prenom || "").toString().trim().slice(0, 100);
  const emailClean = (email || "").toString().trim().toLowerCase().slice(0, 200) || null;
  const nb = parseInt(patineurs, 10);

  if (!nomClean || !prenomClean) return { error: "Merci d'indiquer votre nom et votre prénom." };
  if (emailClean && !EMAIL_REGEX.test(emailClean)) return { error: "Merci de saisir une adresse email valide." };
  if (!Number.isInteger(nb) || nb < 1 || nb > MAX_PATINEURS) {
    return { error: `Le nombre de patineurs doit être compris entre 1 et ${MAX_PATINEURS}.` };
  }

  try {
    await prisma.patinoireInscription.create({
      data: { nom: nomClean, prenom: prenomClean, email: emailClean, patineurs: nb },
    });
  } catch (error) {
    console.error("Erreur inscription patinoire :", error);
    return { error: "Une erreur est survenue. Merci de réessayer dans un instant." };
  }

  // Les emails ne doivent jamais faire échouer l'inscription. Sur Vercel, on les attend
  // (une promesse non attendue peut être interrompue à la fin de la requête).
  try {
    const agregat = await prisma.patinoireInscription.aggregate({ _count: true, _sum: { patineurs: true } });
    await Promise.allSettled([
      emailClean
        ? sendPatinoireInscriptionEmail({ to: emailClean, prenom: prenomClean, patineurs: nb })
        : Promise.resolve(),
      sendPatinoireNotificationEmail({
        prenom: prenomClean,
        nom: nomClean,
        email: emailClean,
        patineurs: nb,
        totalInscriptions: agregat._count,
        totalPatineurs: agregat._sum.patineurs || 0,
      }),
    ]);
  } catch (e) {
    console.error("Erreur emails patinoire :", e);
  }

  revalidatePath("/admin");
  return { success: true };
}

// 📋 Liste des inscrits (admin)
export async function listerInscriptionsPatinoire() {
  if (!(await estAdmin())) return { error: "Accès refusé" };
  const inscriptions = await prisma.patinoireInscription.findMany({ orderBy: { createdAt: "desc" } });
  return { success: true, inscriptions: inscriptions.map((i) => ({ ...i, createdAt: i.createdAt.toISOString() })) };
}

// 🗑️ Suppression d'une inscription (admin)
export async function supprimerInscriptionPatinoire(id) {
  if (!(await estAdmin())) return { error: "Accès refusé" };
  try {
    await prisma.patinoireInscription.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    console.error("Erreur suppression inscription patinoire :", error);
    return { error: "Erreur lors de la suppression" };
  }
}
