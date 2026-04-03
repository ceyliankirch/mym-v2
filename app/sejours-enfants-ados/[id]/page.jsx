// app/sejours-enfants-ados/[id]/page.jsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import SejourDetailClient from "./SejourDetailClient";

export const dynamic = "force-dynamic";

export default async function SejourPage({ params }) {
  // ⚡ LA CORRECTION EST ICI : Il faut un 'await' devant params !
  const { id } = await params;

  // 1. Récupération du séjour cliqué
  const sejour = await prisma.sejour.findUnique({
    where: { id: id },
  });

  if (!sejour) {
    notFound();
  }

  // 2. Bonus: On cherche 3 autres séjours de la même saison pour la section "Séjours similaires"
  const autresSejours = await prisma.sejour.findMany({
    where: { 
      statut: "Publié",
      id: { not: id }, // On exclut le séjour actuel
      saison: sejour.saison // Même saison
    },
    take: 3
  });

  return <SejourDetailClient sejour={sejour} autresSejours={autresSejours} />;
}