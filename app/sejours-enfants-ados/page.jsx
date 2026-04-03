import { prisma } from "@/lib/prisma";
import SejoursClient from "./SejoursClient";

export const dynamic = "force-dynamic";

export default async function PageSejoursEnfantsAdos() {
  // On récupère les séjours depuis Neon
  const sejours = await prisma.sejour.findMany({
    orderBy: { dateDebut: 'asc' }
  });

  // On les passe au composant Client que tu viens de créer
  return <SejoursClient sejoursFromDb={sejours} />;
}