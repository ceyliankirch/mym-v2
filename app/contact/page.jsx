import ContactClient from "./ContactClient";
import { getParametres } from "@/app/actions/parametres";
import { getCoordonnees } from "@/lib/coordonnees";

export const metadata = { title: "Contact" };

export default async function Page() {
  const coordonnees = getCoordonnees(await getParametres());
  return <ContactClient coordonnees={coordonnees} />;
}
