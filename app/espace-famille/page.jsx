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

  // Construire la liste des séjours à venir, avec pour chacun le nombre de
  // documents que la famille doit encore envoyer pour CET enfant précis
  // (jamais uploadé, ou rejeté par l'admin — statut "MANQUANT").
  const sejoursAVenir = enfants.flatMap((enfant) =>
    enfant.inscriptions.map((ins) => {
      const documentsRequis = ins.sejour.documentsRequis || [];
      const docsAEnvoyer = documentsRequis.filter((type) => {
        const doc = enfant.documents.find((d) => d.type === type);
        return !doc || doc.statut === "MANQUANT";
      }).length;

      return {
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
        documentsRequis,
        docsAEnvoyer,
        formSchema: ins.sejour.formSchema || null,
        reponsesFormulaire: ins.reponsesFormulaire || null,
      };
    })
  );

  const notifications = [];

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
      client={client}
      sejoursAVenir={sejoursAVenir}
      sejoursCatalogue={sejoursCatalogue}
      notifications={notifications}
      enfants={enfants}
    />
  );
}
