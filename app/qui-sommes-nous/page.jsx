// app/qui-sommes-nous/page.jsx
import { prisma } from "@/lib/prisma";
import QuiSommesNousClient from "./QuiSommesNousClient";

export const dynamic = "force-dynamic";
export const metadata = { title: "Qui sommes-nous" };

export default async function QuiSommesNousPage() {
  // On récupère tous les animateurs dans la base de données
  const animateurs = await prisma.animateur.findMany({
    orderBy: { createdAt: 'asc' }
  });

  return <QuiSommesNousClient equipe={animateurs} />;
}