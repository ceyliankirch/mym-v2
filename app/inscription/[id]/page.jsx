// app/inscription/[id]/page.jsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { getOrCreateClientForUser } from "@/app/actions/inscriptions";
import InscriptionClient from "./InscriptionClient";

export const dynamic = "force-dynamic";

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

  return <InscriptionClient sejour={sejour} enfants={enfants} />;
}