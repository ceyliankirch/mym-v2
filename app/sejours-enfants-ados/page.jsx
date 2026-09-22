import { prisma } from "@/lib/prisma";
import SejoursClient from "./SejoursClient";
import { getParametres } from "@/app/actions/parametres";
import { getCoordonnees } from "@/lib/coordonnees";

export const dynamic = "force-dynamic";
export const metadata = { title: "Nos séjours" };

export default async function PageSejoursEnfantsAdos() {
  // On récupère les séjours depuis Neon
  const sejours = await prisma.sejour.findMany({
    orderBy: { dateDebut: 'asc' }
  });
  const coordonnees = getCoordonnees(await getParametres());

  // On les passe au composant Client que tu viens de créer
  return <SejoursClient sejoursFromDb={sejours} coordonnees={coordonnees} />;
}
