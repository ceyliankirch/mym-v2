import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { del } from "@vercel/blob";

export const dynamic = "force-dynamic";

// 🧹 Supprime les documents des enfants dont tous les séjours sont passés
// (aucune inscription à venir) — exécuté quotidiennement par Vercel Cron.
export async function GET(request) {
  const authHeader = request.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const now = new Date();

  const enfants = await prisma.enfant.findMany({
    include: {
      documents: true,
      inscriptions: { include: { sejour: true } },
    },
  });

  const enfantsSansSejourAVenir = enfants.filter((enfant) => {
    const aUnSejourAVenir = enfant.inscriptions.some(
      (ins) => !ins.sejour.dateFin || new Date(ins.sejour.dateFin) >= now
    );
    return !aUnSejourAVenir && enfant.documents.length > 0;
  });

  let documentsSupprimes = 0;

  for (const enfant of enfantsSansSejourAVenir) {
    for (const doc of enfant.documents) {
      if (doc.url) {
        try {
          await del(doc.url);
        } catch (e) {
          console.error(`Erreur suppression blob pour document ${doc.id}`, e);
        }
      }
    }
    await prisma.document.deleteMany({ where: { enfantId: enfant.id } });
    documentsSupprimes += enfant.documents.length;
  }

  return NextResponse.json({
    success: true,
    enfantsTraites: enfantsSansSejourAVenir.length,
    documentsSupprimes,
  });
}
