import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getOrCreateClientForUser } from "@/app/actions/inscriptions";
import EspaceFamilleClient from "./EspaceFamilleClient";

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

  // Compter les séjours effectués
  const sejoursEffectues = enfants.reduce(
    (acc, enfant) => acc + enfant.inscriptions.length,
    0
  );
  const fidelite = {
    sejoursEffectues,
    objectif: 5,
    recompense: "Bon de réduction de -5% sur le prochain séjour",
  };

  // Construire la liste des séjours à venir
  const sejoursAVenir = enfants.flatMap((enfant) =>
    enfant.inscriptions.map((ins) => ({
      id: ins.id,
      titre: ins.sejour.titre,
      enfant: enfant.prenom,
      dates: ins.sejour.dateDebut && ins.sejour.dateFin
        ? `${new Date(ins.sejour.dateDebut).toLocaleDateString("fr-FR")} - ${new Date(ins.sejour.dateFin).toLocaleDateString("fr-FR")}`
        : "Voir détails du séjour",
      statut: ins.statut,
      isValide: ins.statut === "Confirmé",
    }))
  );

  // Aplatir et formater les documents
  const documents = enfants.flatMap((enfant) =>
    enfant.documents.map((doc) => {
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
    })
  );

  const docsManquants = documents.filter((d) => d.etat === "error");
  const notifications = [];

  if (docsManquants.length > 0) {
    notifications.push({
      id: "doc-alerte",
      type: "urgence",
      message: `Il manque ${docsManquants.length} document(s) obligatoire(s) pour finaliser vos dossiers.`,
    });
  }

  return (
    <EspaceFamilleClient
      userName={userName}
      fidelite={fidelite}
      sejoursAVenir={sejoursAVenir}
      documents={documents}
      notifications={notifications}
      enfants={enfants}
    />
  );
}
