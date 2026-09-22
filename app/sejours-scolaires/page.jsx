import SejoursScolairesClient from "./SejoursScolairesClient";
import { getParametres } from "@/app/actions/parametres";
import { getCoordonnees } from "@/lib/coordonnees";

export const metadata = { title: "Séjours scolaires" };

export default async function Page() {
  const coordonnees = getCoordonnees(await getParametres());
  return <SejoursScolairesClient coordonnees={coordonnees} />;
}
