import { desabonnerContact } from "@/app/actions/newsletter";
import { verifierTokenDesabonnement } from "@/lib/unsubscribeToken";

export const metadata = { title: "Désabonnement newsletter" };

const C = {
  teal: "#114C5A",
  yellow: "#FFC801",
  arctic: "#F1F6F4",
};

export default async function DesabonnementPage({ searchParams }) {
  const sp = await searchParams;
  const done = sp?.done === "1";
  const email = (sp?.email || "").toString();
  const token = (sp?.token || "").toString();
  const lienValide = !done && email && verifierTokenDesabonnement(email, token);

  return (
    <div style={{ background: C.arctic, minHeight: "60vh", padding: "64px 16px", display: "flex", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: 24, padding: "40px 32px", maxWidth: 440, width: "100%", textAlign: "center" }}>
        <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: C.teal }}>
          Make Your Moment
        </p>

        {done ? (
          <>
            <h1 style={{ fontSize: 20, fontWeight: 900, color: C.teal, margin: "0 0 12px" }}>Vous êtes désabonné(e)</h1>
            <p style={{ fontSize: 14, color: "#41545c", lineHeight: 1.7 }}>
              Vous ne recevrez plus nos emails de newsletter. Vous pouvez fermer cette page.
            </p>
          </>
        ) : lienValide ? (
          <>
            <h1 style={{ fontSize: 20, fontWeight: 900, color: C.teal, margin: "0 0 12px" }}>Se désabonner ?</h1>
            <p style={{ fontSize: 14, color: "#41545c", lineHeight: 1.7, marginBottom: 24 }}>
              Confirmez que vous souhaitez ne plus recevoir la newsletter Make Your Moment à l'adresse <strong>{email}</strong>.
            </p>
            <form action={desabonnerContact}>
              <input type="hidden" name="email" value={email} />
              <input type="hidden" name="token" value={token} />
              <button
                type="submit"
                style={{
                  border: "none",
                  borderRadius: 999,
                  background: C.yellow,
                  color: C.teal,
                  fontWeight: 800,
                  fontSize: 14,
                  padding: "14px 28px",
                  cursor: "pointer",
                }}
              >
                Confirmer mon désabonnement
              </button>
            </form>
          </>
        ) : (
          <>
            <h1 style={{ fontSize: 20, fontWeight: 900, color: C.teal, margin: "0 0 12px" }}>Lien invalide</h1>
            <p style={{ fontSize: 14, color: "#41545c", lineHeight: 1.7 }}>
              Ce lien de désabonnement n'est pas valide. Contactez-nous si vous souhaitez ne plus recevoir nos emails.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
