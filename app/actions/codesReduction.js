"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 🏷️ Codes donnant accès au tarif « Habitant du Val-de-Marne ».
// Le code historique VAL_DE_MARNE_94 (appliqué via le code postal) reste toujours valide.
const CODE_HISTORIQUE = "VAL_DE_MARNE_94";

export async function getCodesReduction() {
  try {
    return await prisma.codeReduction.findMany({ orderBy: { createdAt: "desc" } });
  } catch (error) {
    console.error("Erreur récupération codes :", error);
    return [];
  }
}

export async function genererCodeReduction(saisie) {
  // Le code est exactement ce que l'admin a saisi (seuls les espaces autour sont retirés)
  const code = (saisie || "").toString().trim();
  if (!code) return { error: "Entrez un code" };

  try {
    const existant = await prisma.codeReduction.findUnique({ where: { code } });
    if (existant) return { error: "Ce code existe déjà" };
    const cree = await prisma.codeReduction.create({ data: { motCle: code, code } });
    revalidatePath("/admin");
    return { success: true, code: cree };
  } catch (error) {
    console.error("Erreur création code :", error);
    return { error: "Erreur lors de la création" };
  }
}

export async function toggleCodeReduction(id) {
  try {
    const code = await prisma.codeReduction.findUnique({ where: { id } });
    if (!code) return { error: "Code introuvable" };
    await prisma.codeReduction.update({ where: { id }, data: { actif: !code.actif } });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Erreur lors de la mise à jour" };
  }
}

export async function supprimerCodeReduction(id) {
  try {
    await prisma.codeReduction.delete({ where: { id } });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Erreur lors de la suppression" };
  }
}

// Utilisé par le formulaire d'inscription (les codes actifs sont comparés côté serveur)
export async function verifierCodeReduction(code) {
  const saisi = (code || "").toString().trim();
  if (!saisi) return { valide: false };
  if (saisi.toUpperCase() === CODE_HISTORIQUE) return { valide: true };
  try {
    const trouve = await prisma.codeReduction.findUnique({ where: { code: saisi } });
    return { valide: !!trouve?.actif };
  } catch (error) {
    console.error("Erreur vérification code :", error);
    return { valide: false };
  }
}
