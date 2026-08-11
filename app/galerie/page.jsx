// app/galerie/page.jsx
import { prisma } from "@/lib/prisma";
import GalerieClient from "./GalerieClient";

export const dynamic = "force-dynamic";
export const metadata = { title: "Galerie" };

export default async function GaleriePage({ searchParams }) {
  const albums = await prisma.album.findMany({
    include: { photos: { orderBy: { createdAt: "desc" } } },
    orderBy: { createdAt: "desc" },
  });

  const images = albums.flatMap((album) =>
    album.photos.map((photo) => ({
      id: photo.id,
      src: photo.url,
      alt: album.titre,
      cat: album.titre,
    }))
  );

  const categories = ["Toutes", ...new Set(albums.map((a) => a.titre))];

  const params = await searchParams;
  const requestedAlbum = params?.album;
  const initialCategory = requestedAlbum && categories.includes(requestedAlbum) ? requestedAlbum : "Toutes";

  return <GalerieClient images={images} categories={categories} initialCategory={initialCategory} />;
}
