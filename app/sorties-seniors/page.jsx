import { prisma } from "@/lib/prisma";
import SeniorsClient from "./SeniorsClient";
import { getParametres } from "@/app/actions/parametres";
import { getCoordonnees } from "@/lib/coordonnees";

// ⚡ Indispensable pour voir les nouvelles sorties instantanément
export const dynamic = "force-dynamic";
export const metadata = { title: "Sorties Séniors" };

export default async function PageSortiesSeniors() {
  const sejours = await prisma.sejour.findMany({
    orderBy: { dateDebut: 'asc' }
  });
  const coordonnees = getCoordonnees(await getParametres());

  return <SeniorsClient sejoursFromDb={sejours} coordonnees={coordonnees} />;
}
