// lib/googleReviews.js
// ⚡ Récupère la note + les avis Google via l'API "Places API (New)", qui
// ne nécessite qu'une clé API (pas la demande d'accès restreinte de l'API
// Google Business Profile). Variables d'env requises :
//   - GOOGLE_PLACES_API_KEY : clé API avec "Places API (New)" activée
//   - GOOGLE_PLACE_ID       : Place ID de l'établissement (format ChIJ...)
// Sans ces variables, renvoie null (le site retombe sur les avis statiques).

const FIELD_MASK = "rating,userRatingCount,reviews";

export async function getGoogleReviews() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return null;

  try {
    const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=fr`;
    // Mis en cache 24h : la note/les avis Google ne changent pas assez vite
    // pour justifier un appel à chaque visite (et l'API est facturée à l'appel).
    const res = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": FIELD_MASK,
      },
      next: { revalidate: 86400 },
    });
    const data = await res.json();

    if (!res.ok || data.error) {
      console.error("Google Places API:", data.error?.message || res.status);
      return null;
    }

    return {
      rating: data.rating ?? null,
      totalReviews: data.userRatingCount ?? null,
      reviews: (data.reviews || [])
        .slice(0, 6)
        .map((r) => ({
          nom: r.authorAttribution?.displayName || "Utilisateur Google",
          photo: r.authorAttribution?.photoUri,
          date: r.relativePublishTimeDescription,
          note: r.rating,
          texte: r.text?.text || r.originalText?.text || "",
        })),
    };
  } catch (e) {
    console.error("Erreur Google Places API", e);
    return null;
  }
}
