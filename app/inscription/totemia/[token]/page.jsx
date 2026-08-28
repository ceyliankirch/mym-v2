// app/inscription/totemia/[token]/page.jsx
// Version "Totemia" du formulaire d'inscription : mêmes champs que le formulaire
// standard, mais sans les sections Assurance, Paiement et Tarif.
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { getOrCreateClientForUser } from "@/app/actions/inscriptions";
import InscriptionClient from "../../[id]/InscriptionClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { token } = await params;
  const sejour = await prisma.sejour.findUnique({
    where: { totemiaToken: token },
    select: { titre: true },
  });
  return { title: sejour ? `Inscription Totemia - ${sejour.titre}` : "Inscription" };
}

export default async function InscriptionTotemiaPage({ params }) {
  const { token } = await params;

  const sejour = await prisma.sejour.findUnique({
    where: { totemiaToken: token },
  });

  if (!sejour) {
    notFound();
  }

  const session = await auth();
  let enfants = [];
  if (session?.user?.id) {
    const client = await getOrCreateClientForUser(session.user.id);
    if (client) {
      enfants = await prisma.enfant.findMany({
        where: { clientId: client.id },
        orderBy: { createdAt: "desc" },
      });
    }
  }

  return <InscriptionClient sejour={sejour} enfants={enfants} variant="totemia" />;
}
