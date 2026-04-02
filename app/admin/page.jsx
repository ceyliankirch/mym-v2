// app/admin/page.jsx
import { prisma } from "@/lib/prisma";
import AdminDashboardClient from "./AdminDashboardClient";

// Force le rendu dynamique pour avoir les données fraîches de la DB
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  try {
    console.log("📡 Admin : Récupération des données depuis Neon...");

    // On récupère tout en une seule fois (parallèle) pour plus de rapidité
    const [sejours, inscriptions, clientsCount] = await Promise.all([
      prisma.sejour.findMany({ 
        orderBy: { createdAt: "desc" } 
      }),
      prisma.inscription.findMany({
        include: {
          client: true, // Récupère les infos du client lié
          sejour: true, // Récupère les infos du séjour lié
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.client.count(),
    ]);

    // Calcul des statistiques (KPIs)
    const stats = {
      inscriptionsTotal: inscriptions.length,
      ca: inscriptions.reduce((total, curr) => total + (curr.montantPaye || 0), 0),
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
  } catch (error) {
    console.error("❌ Erreur critique sur la page Admin :", error);
    return (
      <div className="p-20 text-center">
        <h1 className="text-2xl font-bold text-red-600">Erreur de connexion</h1>
        <p className="mt-4 text-gray-600">
          Impossible de charger les données. Vérifie la console de ton terminal.
        </p>
        <pre className="mt-4 p-4 bg-gray-100 rounded text-xs text-left overflow-auto">
          {error.message}
        </pre>
      </div>
    );
  }
}