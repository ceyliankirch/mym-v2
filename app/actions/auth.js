// app/actions/auth.js
"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendWelcomeEmail, sendPasswordResetEmail } from "@/lib/email";

export async function registerUser(formData) {
  const prenom = formData.get("prenom");
  const nom = formData.get("nom");
  const telephone = (formData.get("telephone") || "").toString().trim() || null;
  const email = (formData.get("email") || "").toString().trim() || null;
  const password = formData.get("password");

  // ☎️ Email OU téléphone (au moins l'un des deux), pour les personnes qui n'ont pas d'adresse mail.
  if (!password || !prenom || !nom || (!email && !telephone)) {
    return { error: "Merci de renseigner votre email ou votre numéro de téléphone." };
  }

  try {
    // 1. Vérifier qu'il n'existe pas déjà un compte avec cet email ou ce téléphone
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          ...(email ? [{ email }] : []),
          ...(telephone ? [{ telephone }] : []),
        ],
      },
    });

    if (existingUser) {
      return { error: email && existingUser.email === email
        ? "Cet email est déjà utilisé par un autre compte."
        : "Ce numéro de téléphone est déjà utilisé par un autre compte." };
    }

    // 2. Crypter le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Créer l'utilisateur dans la base Neon
    await prisma.user.create({
      data: {
        prenom,
        nom,
        telephone,
        email,
        password: hashedPassword,
        role: "PARENT", // Par défaut, c'est un client
      }
    });

    // 4. Email de bienvenue — seulement si un email a été renseigné. Pour une inscription
    // par numéro de téléphone, on ne renvoie aucun message de confirmation (pas d'envoi de SMS).
    if (email) {
      try {
        await sendWelcomeEmail({ to: email, prenom });
      } catch (e) {
        console.error("Erreur envoi email de bienvenue", e);
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Erreur d'inscription:", error);
    return { error: "Une erreur s'est produite lors de la création du compte." };
  }
}

// 🔑 DEMANDER LA RÉINITIALISATION DU MOT DE PASSE
export async function demanderReinitialisationMotDePasse(email) {
  if (!email) {
    return { error: "Adresse email requise" };
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    // ⚠️ On ne révèle jamais si l'email existe ou non (sécurité) — succès dans tous les cas
    if (!user) {
      return { success: true };
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1h

    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken, resetTokenExpiry },
    });

    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || "https://mym-v2.vercel.app"}/reinitialiser-mot-de-passe?token=${resetToken}`;

    await sendPasswordResetEmail({ to: user.email, prenom: user.prenom, resetLink });

    return { success: true };
  } catch (error) {
    console.error("Erreur demande réinitialisation mot de passe:", error);
    return { error: "Une erreur s'est produite. Veuillez réessayer." };
  }
}

// 🔑 RÉINITIALISER LE MOT DE PASSE (avec le token reçu par email)
export async function reinitialiserMotDePasse(token, nouveauMotDePasse) {
  if (!token || !nouveauMotDePasse) {
    return { error: "Données incomplètes" };
  }
  if (nouveauMotDePasse.length < 6) {
    return { error: "Le mot de passe doit contenir au moins 6 caractères" };
  }

  try {
    const user = await prisma.user.findUnique({ where: { resetToken: token } });

    if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      return { error: "Ce lien de réinitialisation est invalide ou a expiré." };
    }

    const hashedPassword = await bcrypt.hash(nouveauMotDePasse, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Erreur réinitialisation mot de passe:", error);
    return { error: "Une erreur s'est produite. Veuillez réessayer." };
  }
}