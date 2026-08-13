import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getOrCreateClientForUser } from "@/app/actions/inscriptions";
import EspaceFamilleClient from "./EspaceFamilleClient";

export const metadata = { title: "Espace Famille" };

export default async function EspaceFamillePage() {
  const session = await auth();
  if (!session) redirect("/");

  const userName = session.user.prenom || session.user.name || "Parent";

  const client = await getOrCreateClientForUser(session.user.id);
  if (!client) {
    return <EspaceFamilleClient userName={userName} />;
  }

  const enfants = await prisma.enfant.findMany({
    where: { clientId: client.id },
    include: {
      documents: true,
      inscriptions: {
        include: { sejour: true },
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Construire la liste des séjours à venir
  const sejoursAVenir = enfants.flatMap((enfant) =>
    enfant.inscriptions.map((ins) => ({
      id: ins.id,
      sejourId: ins.sejour.id,
      titre: ins.sejour.titre,
      enfant: enfant.prenom,
      enfantId: enfant.id,
      clientId: client.id,
      dates: ins.sejour.dateDebut && ins.sejour.dateFin
        ? `${new Date(ins.sejour.dateDebut).toLocaleDateString("fr-FR")} - ${new Date(ins.sejour.dateFin).toLocaleDateString("fr-FR")}`
        : "Voir détails du séjour",
      statut: ins.statut,
      isValide: ins.statut === "Paiement validé",
      documentsRequis: ins.sejour.documentsRequis || [],
    }))
  );

  // Aplatir et formater les documents (uniquement ceux encore requis par une
  // inscription active — sinon les documents d'une inscription annulée/supprimée
  // restent en base et déclenchent de fausses alertes)
  const documents = enfants.flatMap((enfant) => {
    const typesRequisActuels = new Set(
      enfant.inscriptions.flatMap((ins) => ins.sejour.documentsRequis || [])
    );

    return enfant.documents
      .filter((doc) => typesRequisActuels.has(doc.type))
      .map((doc) => {
      let etatVisuel = "warning";
      if (doc.statut === "VALIDE") etatVisuel = "success";
      if (doc.statut === "MANQUANT") etatVisuel = "error";

      const inscriptionsEnfant = enfant.inscriptions
        .map((ins) => ins.sejour.titre)
        .join(", ");

      return {
        id: doc.id,
        nom: doc.type,
        concerne: `${enfant.prenom} ${enfant.nom}${inscriptionsEnfant ? ` (${inscriptionsEnfant})` : ""}`,
        statut: doc.statut,
        etat: etatVisuel,
      };
    });
  });

  const docsManquants = documents.filter((d) => d.etat === "error");
  const notifications = [];

  if (docsManquants.length > 0) {
    notifications.push({
      id: "doc-alerte",
      type: "urgence",
      message: `Il manque ${docsManquants.length} document(s) obligatoire(s) pour finaliser vos dossiers.`,
    });
  }

  // Séjours du catalogue à découvrir (publiés, à venir, non déjà inscrits)
  const idsSejoursInscrits = new Set(sejoursAVenir.map((s) => s.sejourId).filter(Boolean));
  const sejoursCatalogueBruts = await prisma.sejour.findMany({
    where: {
      statut: "Publié",
      OR: [{ dateDebut: { gte: new Date() } }, { dateDebut: null }],
    },
    orderBy: { dateDebut: "asc" },
    take: 6,
  });

  const sejoursCatalogue = sejoursCatalogueBruts
    .filter((s) => !idsSejoursInscrits.has(s.id))
    .slice(0, 3)
    .map((s) => ({
      id: s.id,
      titre: s.titre,
      lieu: s.lieu,
      imageUrl: s.imageUrl,
      tranchesAge: s.tranchesAge,
      dates: s.dateDebut && s.dateFin
        ? `${new Date(s.dateDebut).toLocaleDateString("fr-FR")} - ${new Date(s.dateFin).toLocaleDateString("fr-FR")}`
        : null,
    }));

  return (
    <EspaceFamilleClient
      userName={userName}
      clientId={client.id}
      sejoursAVenir={sejoursAVenir}
      sejoursCatalogue={sejoursCatalogue}
      documents={documents}
      notifications={notifications}
      enfants={enfants}
    />
  );
}
