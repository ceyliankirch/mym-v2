// app/inscription/[id]/page.jsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import InscriptionClient from "./InscriptionClient";

export const dynamic = "force-dynamic";

export default async function InscriptionPage({ params }) {
  // ⚡ LA MAGIE EST LÀ : on rajoute 'await' devant params !
  const { id } = await params;

  // On va chercher le séjour et son fameux formSchema dans la BDD
  const sejour = await prisma.sejour.findUnique({
    where: { id },
  });

  if (!sejour) {
    notFound(); // Redirige vers une 404 propre si le séjour n'existe pas
  }

  return <InscriptionClient sejour={sejour} />;
}