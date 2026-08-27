// app/admin/page.jsx
import { prisma } from "@/lib/prisma";
import AdminDashboardClient from "./AdminDashboardClient";

// Force le rendu dynamique pour avoir les données fraîches de la DB
export const dynamic = "force-dynamic";
export const metadata = { title: "Admin" };

export default async function AdminPage() {
  try {
    console.log("📡 Admin : Récupération des données depuis Neon...");

    // On récupère tout en une seule fois (parallèle) pour plus de rapidité
    const [sejours, inscriptions, clients, animateurs, albums, documentsManquants, enfants] = await Promise.all([
      prisma.sejour.findMany({
        include: {
          _count: { select: { inscriptions: true } },
        },
        orderBy: { createdAt: "desc" }
      }),
      prisma.inscription.findMany({
        include: {
          client: true,
          enfant: { include: { documents: true } },
          sejour: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      // ⚡ Liste des familles (avant : jamais récupérée, l'onglet "Clients" était toujours vide)
      prisma.client.findMany({
        include: {
          enfants: true,
          _count: { select: { inscriptions: true } },
        },
        orderBy: { createdAt: "desc" },
      }),
      // ⚡ NOUVEAU : Récupération de l'équipe
      prisma.animateur.findMany({
        orderBy: { createdAt: "asc" }
      }),
      // ⚡ NOUVEAU : Récupération des albums photos
      prisma.album.findMany({
        include: { photos: true, sejour: true },
        orderBy: { createdAt: "desc" },
      }),
      prisma.document.count({ where: { statut: "MANQUANT" } }),
      // ⚡ NOUVEAU : Fiche complète de chaque enfant (infos + documents + inscriptions + parent)
      prisma.enfant.findMany({
        include: {
          client: true,
          documents: { orderBy: { type: "asc" } },
          inscriptions: { include: { sejour: true }, orderBy: { createdAt: "desc" } },
        },
        orderBy: [{ nom: "asc" }, { prenom: "asc" }],
      }),
    ]);

    // Calcul des statistiques (KPIs)
    // ⚡ Le CA se base sur le prix du séjour des inscriptions dont le paiement est validé
    // (montantPaye n'est jamais renseigné nulle part dans l'app, donc toujours à 0)
    const ca = inscriptions
      .filter((ins) => ins.statut === "Paiement validé")
      .reduce((total, ins) => total + (ins.sejour?.prix || 0), 0);

    const today = new Date();
    const prochainsDeparts = sejours
      .filter((s) => s.statut === "Publié" && s.dateDebut && new Date(s.dateDebut) >= today)
      .sort((a, b) => new Date(a.dateDebut) - new Date(b.dateDebut))
      .slice(0, 5);

    const stats = {
      inscriptionsTotal: inscriptions.length,
      ca,
      sejoursActifs: sejours.filter((s) => s.statut === "Publié").length,
      familles: clients.length,
      documentsManquants,
    };

    return (
      <AdminDashboardClient
        stats={stats}
        sejours={sejours}
        inscriptions={inscriptions}
        clients={clients} // ⚡ NOUVEAU : On passe les familles au client
        enfants={enfants} // ⚡ NOUVEAU : On passe les fiches enfants complètes
        animateurs={animateurs} // ⚡ NOUVEAU : On passe les animateurs au client
        albums={albums} // ⚡ NOUVEAU : On passe les albums photos au client
        prochainsDeparts={prochainsDeparts}
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