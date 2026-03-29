// app/admin/page.jsx
import { prisma } from "@/lib/prisma";
import AdminDashboardClient from "./AdminDashboardClient";

// Force Next.js à rafraîchir la page à chaque visite (pas de cache obsolète)
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // 1. On récupère les séjours
  const sejours = await prisma.sejour.findMany({
    orderBy: { createdAt: "desc" },
  });

  // 2. On récupère les inscriptions en incluant les données liées (Client et Séjour)
  const inscriptions = await prisma.inscription.findMany({
    include: {
      client: true, // Magique : Prisma va chercher le nom/prénom du client
      sejour: true, // Et le titre du séjour associé
    },
    orderBy: { createdAt: "desc" },
  });

  // 3. On compte le nombre de clients totaux
  const clientsCount = await prisma.client.count();

  // 4. On calcule le Chiffre d'Affaires total
  const caTotal = inscriptions.reduce((total, curr) => total + curr.montantPaye, 0);

  // 5. On prépare les statistiques pour nos cartes (KPIs)
  const stats = {
    inscriptionsTotal: inscriptions.length,
    ca: caTotal,
    sejoursActifs: sejours.length,
    familles: clientsCount,
  };

  return (
    <AdminDashboardClient 
      stats={stats} 
      sejours={sejours} 
      inscriptions={inscriptions} 
    />
  );
}