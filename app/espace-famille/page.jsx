import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import EspaceFamilleClient from "./EspaceFamilleClient";

export default async function EspaceFamillePage() {
  // 1. Vérification de la session
  const session = await auth();
  if (!session) redirect("/");

  const userName = session.user.prenom || session.user.name || "Parent";

  // 2. Requête Prisma : On récupère toutes les inscriptions du parent, 
  // avec les séjours et les documents associés.
  const inscriptions = await prisma.inscription.findMany({
    where: { userId: session.user.id },
    include: {
      sejour: true,
      documents: true,
    },
    orderBy: { createdAt: "desc" },
  });

  // --- 3. TRANSFORMATION DES DONNÉES POUR L'INTERFACE ---

  // FIDÉLITÉ : On compte le nombre d'inscriptions totales
  const sejoursEffectues = inscriptions.length;
  const fidelite = {
    sejoursEffectues: sejoursEffectues,
    objectif: 5,
    recompense: "Bon de réduction de -5% sur le prochain séjour",
  };

  // SÉJOURS : On formate les données de la DB pour l'affichage
  const sejoursAVenir = inscriptions.map((ins) => ({
    id: ins.id,
    titre: ins.sejour.titre,
    enfant: "Votre enfant", // Remplace par le champ réel si tu as le nom de l'enfant dans l'inscription
    dates: "Voir détails du séjour", // Remplace par ins.sejour.dates si ça existe
    statut: ins.statut, // ex: "CONFIRME" ou "EN_ATTENTE"
    isValide: ins.statut === "CONFIRME", 
  }));

  // DOCUMENTS : On regroupe tous les documents de toutes les inscriptions
  const documents = inscriptions.flatMap((ins) =>
    ins.documents.map((doc) => {
      // Déduction de la couleur (état visuel) selon le statut en DB
      let etatVisuel = "warning";
      if (doc.statut === "VALIDE") etatVisuel = "success";
      if (doc.statut === "MANQUANT") etatVisuel = "error";

      return {
        id: doc.id,
        nom: doc.nom,
        concerne: ins.sejour.titre,
        statut: doc.statut, // Valeur brute de la DB (ex: "MANQUANT")
        etat: etatVisuel,
      };
    })
  );

  // NOTIFICATIONS : Calculées dynamiquement si des documents manquent
  const docsManquants = documents.filter((d) => d.etat === "error");
  const notifications = [];
  
  if (docsManquants.length > 0) {
    notifications.push({
      id: "doc-alerte",
      type: "urgence",
      message: `Il manque ${docsManquants.length} document(s) obligatoire(s) pour finaliser vos dossiers.`,
    });
  }

  // 4. On envoie tout au composant Client
  return (
    <EspaceFamilleClient 
      userName={userName}
      fidelite={fidelite}
      sejoursAVenir={sejoursAVenir}
      documents={documents}
      notifications={notifications}
    />
  );
}