// app/page.jsx
import { prisma } from "@/lib/prisma";
import HomeClient from "./HomeClient"; // 👈 Modifie le chemin si tu as mis HomeClient dans un dossier /components

// ⚡ NE METS PAS "use client" ICI ! C'est un Server Component.
export default async function Page() {
  // 1. On va chercher tous les séjours dans Neon
  const sejours = await prisma.sejour.findMany({
    orderBy: {
      createdAt: 'desc' // Optionnel: trie du plus récent au plus ancien
    }
  });

  // 2. On va chercher les photos "à l'affiche" pour la section Galerie
  const galleryPhotos = await prisma.photo.findMany({
    where: { enAvant: true },
    include: { album: true },
    orderBy: { createdAt: 'desc' },
    take: 6,
  });

  // 3. On passe les données au composant client qui gère l'affichage
  return <HomeClient sejoursFromDb={sejours} galleryPhotos={galleryPhotos} />;
}