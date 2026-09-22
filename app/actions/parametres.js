"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ⚙️ Réglages généraux de l'association (une seule ligne en base, id fixe "main")

export async function getParametres() {
  try {
    return await prisma.parametres.findUnique({ where: { id: "main" } });
  } catch (error) {
    console.error("Erreur récupération paramètres :", error);
    return null;
  }
}

export async function modifierParametres(formData) {
  const ibanAsso = (formData.get("ibanAsso") || "").toString().trim().toUpperCase().replace(/\s+/g, " ") || null;
  const bicAsso = (formData.get("bicAsso") || "").toString().trim().toUpperCase() || null;
  const titulaireIban = (formData.get("titulaireIban") || "").toString().trim() || null;
  const emailContact = (formData.get("emailContact") || "").toString().trim() || null;
  const telephoneContact = (formData.get("telephoneContact") || "").toString().trim() || null;
  const adresseRue = (formData.get("adresseRue") || "").toString().trim() || null;
  const adresseVille = (formData.get("adresseVille") || "").toString().trim() || null;

  const data = { ibanAsso, bicAsso, titulaireIban, emailContact, telephoneContact, adresseRue, adresseVille };

  try {
    await prisma.parametres.upsert({
      where: { id: "main" },
      update: data,
      create: { id: "main", ...data },
    });
    // ⚡ Les coordonnées sont affichées sur presque toutes les pages du site
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error("Erreur enregistrement paramètres :", error);
    return { error: "Erreur lors de l'enregistrement" };
  }
}
