"use server";

import { randomInt } from "crypto";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 🏷️ Codes donnant accès au tarif « Habitant du Val-de-Marne ».
// Le code historique VAL_DE_MARNE_94 (appliqué via le code postal) reste toujours valide.
const CODE_HISTORIQUE = "VAL_DE_MARNE_94";
const SYMBOLES = "!@#$%&*+?";
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";

const tirer = (chars, n) => Array.from({ length: n }, () => chars[randomInt(chars.length)]).join("");

// Mot-clé → base sans accents ni espaces (ex: "Mairie de Sucy" → "MAIRIEDESUCY"), 12 car. max
const baseDepuisMotCle = (motCle) =>
  motCle.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 12);

export async function getCodesReduction() {
  try {
    return await prisma.codeReduction.findMany({ orderBy: { createdAt: "desc" } });
  } catch (error) {
    console.error("Erreur récupération codes :", error);
    return [];
  }
}

export async function genererCodeReduction(motCle) {
  const mot = (motCle || "").toString().trim();
  if (!mot) return { error: "Entrez un mot-clé" };
  const base = baseDepuisMotCle(mot);
  if (!base) return { error: "Le mot-clé doit contenir des lettres ou des chiffres" };

  try {
    for (let i = 0; i < 5; i++) {
      const code = `${base}${tirer(SYMBOLES, 1)}${tirer(ALPHABET, 3)}${tirer("23456789", 2)}${tirer(SYMBOLES, 1)}`;
      const existant = await prisma.codeReduction.findUnique({ where: { code } });
      if (existant) continue;
      const cree = await prisma.codeReduction.create({ data: { motCle: mot, code } });
      revalidatePath("/admin");
      return { success: true, code: cree };
    }
    return { error: "Impossible de générer un code unique, réessayez" };
  } catch (error) {
    console.error("Erreur génération code :", error);
    return { error: "Erreur lors de la génération" };
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
