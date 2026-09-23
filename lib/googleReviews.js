// lib/googleReviews.js
// ⚡ Récupère la note + les avis Google via l'API Places (Place Details), qui
// ne nécessite qu'une clé API (pas la demande d'accès restreinte de l'API
// Google Business Profile). Variables d'env requises :
//   - GOOGLE_PLACES_API_KEY : clé API avec "Places API" activée
//   - GOOGLE_PLACE_ID       : Place ID de l'établissement (format ChIJ...)
// Sans ces variables, renvoie null (le site retombe sur les avis statiques).

const FIELDS = "rating,user_ratings_total,reviews";

export async function getGoogleReviews() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return null;

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=${FIELDS}&language=fr&key=${apiKey}`;
    // Mis en cache 24h : la note/les avis Google ne changent pas assez vite
    // pour justifier un appel à chaque visite (et l'API est facturée à l'appel).
    const res = await fetch(url, { next: { revalidate: 86400 } });
    const data = await res.json();

    if (data.status !== "OK" || !data.result) {
      console.error("Google Places API:", data.status, data.error_message || "");
      return null;
    }

    const { rating, user_ratings_total, reviews } = data.result;
    return {
      rating: rating ?? null,
      totalReviews: user_ratings_total ?? null,
      reviews: (reviews || [])
        .slice(0, 6)
        .map((r) => ({
          nom: r.author_name,
          photo: r.profile_photo_url,
          date: r.relative_time_description,
          note: r.rating,
          texte: r.text,
        })),
    };
  } catch (e) {
    console.error("Erreur Google Places API", e);
    return null;
  }
}
