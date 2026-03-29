"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function creerSejour(formData) {
  try {
    const titre = formData.get("titre");
    const lieu = formData.get("lieu");
    const dateDebut = new Date(formData.get("dateDebut"));
    const dateFin = new Date(formData.get("dateFin"));
    const prix = parseFloat(formData.get("prix"));
    const places = parseInt(formData.get("places"), 10);
    const statut = formData.get("statut");
    
    // Les nouveaux champs
    const trancheAge = formData.get("trancheAge");
    const saison = formData.get("saison");
    const imageFile = formData.get("image"); // C'est le fichier physique

    // TODO: Plus tard, on enverra 'imageFile' vers UploadThing ou AWS S3.
    // Pour l'instant, on simule une URL.
    const imageUrl = imageFile && imageFile.name ? `/uploads/${imageFile.name}` : null;

    await prisma.sejour.create({
      data: {
        titre, lieu, dateDebut, dateFin, prix, places, statut,
        trancheAge, saison, imageUrl
      }
    });

    revalidatePath("/admin"); 
    return { success: true };
  } catch (error) {
    console.error("Erreur :", error);
    return { success: false, error: "Impossible de créer le séjour" };
  }
}