"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { sendPatinoireInscriptionEmail } from "@/lib/email";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_PATINEURS = 20;

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

  // L'email de confirmation ne doit jamais faire échouer l'inscription.
  if (emailClean) {
    sendPatinoireInscriptionEmail({ to: emailClean, prenom: prenomClean, patineurs: nb }).catch((e) =>
      console.error("Erreur email patinoire :", e)
    );
  }

  revalidatePath("/admin/patinoire");
  return { success: true };
}
