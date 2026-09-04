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

  try {
    await prisma.parametres.upsert({
      where: { id: "main" },
      update: { ibanAsso, bicAsso, titulaireIban },
      create: { id: "main", ibanAsso, bicAsso, titulaireIban },
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Erreur enregistrement paramètres :", error);
    return { error: "Erreur lors de l'enregistrement" };
  }
}
