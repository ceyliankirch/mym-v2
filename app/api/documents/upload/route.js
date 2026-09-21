import { handleUpload } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { PRIVATE_BLOB_TOKEN } from "@/lib/blobPrive";

// Génère un token d'upload direct navigateur → Vercel Blob (contourne la limite de 4,5 Mo des fonctions).
export async function POST(request) {
  const body = await request.json();
  try {
    const json = await handleUpload({
      body,
      request,
      token: PRIVATE_BLOB_TOKEN,
      onBeforeGenerateToken: async () => {
        const session = await auth();
        if (!session) throw new Error("Non autorisé");
        return {
          allowedContentTypes: ["application/pdf", "image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"],
          maximumSizeInBytes: 25 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
    });
    return NextResponse.json(json);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
