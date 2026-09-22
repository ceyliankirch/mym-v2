// app/inscription/[id]/page.jsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { getOrCreateClientForUser } from "@/app/actions/inscriptions";
import InscriptionClient from "./InscriptionClient";
import { getParametres } from "@/app/actions/parametres";
import { getCoordonnees } from "@/lib/coordonnees";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const sejour = await prisma.sejour.findUnique({ where: { id }, select: { titre: true } });
  return { title: sejour ? `Inscription - ${sejour.titre}` : "Inscription" };
}

export default async function InscriptionPage({ params }) {
  const { id } = await params;

  const sejour = await prisma.sejour.findUnique({
    where: { id },
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

  const parametres = await getParametres();
  const coordonnees = getCoordonnees(parametres);

  return <InscriptionClient sejour={sejour} enfants={enfants} coordonnees={coordonnees} parametres={parametres} />;
}