import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ficheSanitaireAttachment } from "@/lib/email";

export const dynamic = "force-dynamic";

// Fiche sanitaire de liaison du séjour (année du séjour pré-remplie) : réservée aux administrateurs.
export async function GET(_request, { params }) {
  const { id } = await params;
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return new Response("Non autorisé", { status: 401 });

  const sejour = await prisma.sejour.findUnique({ where: { id }, select: { dateDebut: true } });
  if (!sejour) return new Response("Introuvable", { status: 404 });

  const [attachment] = await ficheSanitaireAttachment(sejour.dateDebut);
  if (!attachment) return new Response("Fiche indisponible", { status: 500 });

  return new Response(Buffer.from(attachment.content, "base64"), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${attachment.name}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
