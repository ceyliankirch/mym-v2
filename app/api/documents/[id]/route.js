import { get } from "@vercel/blob";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { BLOB_PRIVE } from "@/lib/blobPrive";

export const dynamic = "force-dynamic";

// Sert un document privé : uniquement au parent propriétaire ou à un administrateur.
export async function GET(_request, { params }) {
  const { id } = await params;
  const session = await auth();
  if (!session) return new Response("Non autorisé", { status: 401 });

  const document = await prisma.document.findUnique({
    where: { id },
    include: { enfant: { include: { client: true } } },
  });
  if (!document?.url) return new Response("Introuvable", { status: 404 });

  const estAdmin = session.user.role === "ADMIN";
  const estProprietaire = document.enfant?.client?.userId === session.user.id;
  if (!estAdmin && !estProprietaire) return new Response("Interdit", { status: 403 });

  const result = await get(document.url, { access: "private", ...BLOB_PRIVE });
  if (!result || result.statusCode !== 200) return new Response("Introuvable", { status: 404 });

  return new Response(result.stream, {
    headers: {
      "Content-Type": result.blob.contentType,
      "Content-Disposition": "inline",
      "Cache-Control": "private, no-store",
    },
  });
}
