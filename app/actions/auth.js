// app/actions/auth.js
"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(formData) {
  const prenom = formData.get("prenom");
  const nom = formData.get("nom");
  const telephone = formData.get("telephone");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password || !prenom || !nom) {
    return { error: "Tous les champs obligatoires doivent être remplis." };
  }

  try {
    // 1. Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return { error: "Cet email est déjà utilisé par un autre compte." };
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

    return { success: true };
  } catch (error) {
    console.error("Erreur d'inscription:", error);
    return { error: "Une erreur s'est produite lors de la création du compte." };
  }
}