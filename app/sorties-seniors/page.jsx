import { prisma } from "@/lib/prisma";
import SeniorsClient from "./SeniorsClient";

// ⚡ Indispensable pour voir les nouvelles sorties instantanément
export const dynamic = "force-dynamic"; 

export default async function PageSortiesSeniors() {
  const sejours = await prisma.sejour.findMany({
    orderBy: { dateDebut: 'asc' }
  });

  return <SeniorsClient sejoursFromDb={sejours} />;
}