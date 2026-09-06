import { sabonnerNewsletterPublic, desabonnerNewsletterPublic } from "@/app/actions/newsletter";

export const metadata = { title: "Newsletter" };

const C = {
  teal: "#114C5A",
  yellow: "#FFC801",
  saffron: "#FF9932",
  arctic: "#F1F6F4",
  lightGray: "#e2e8f0",
  gray: "#8aaa",
};

const champ = {
  width: "100%",
  padding: "13px 14px",
  borderRadius: "12px",
  border: `1px solid ${C.lightGray}`,
  background: "#fff",
  fontSize: "14px",
  fontFamily: "inherit",
  boxSizing: "border-box",
};

const optionCard = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "12px 14px",
  borderRadius: "12px",
  border: `1px solid ${C.lightGray}`,
  background: "#fff",
  fontSize: "14px",
  fontWeight: 600,
  color: "#41545c",
  cursor: "pointer",
};

const bouton = {
  border: "none",
  borderRadius: "999px",
  background: C.yellow,
  color: C.teal,
  fontWeight: 800,
  fontSize: "14px",
  padding: "14px 28px",
  cursor: "pointer",
  width: "100%",
};

export default async function NewsletterPage({ searchParams }) {
  const sp = await searchParams;
  const done = (sp?.done || "").toString();
  const erreur = (sp?.erreur || "").toString();

  return (
    <div style={{ background: C.arctic, minHeight: "70vh", padding: "64px 16px", display: "flex", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: 24, padding: "40px 32px", maxWidth: 460, width: "100%" }}>
        <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: C.teal, textAlign: "center" }}>
          Make Your Moment
        </p>

        {done === "inscrit" ? (
          <>
            <h1 style={{ fontSize: 22, fontWeight: 900, color: C.teal, margin: "0 0 12px", textAlign: "center" }}>Inscription confirmée 🎉</h1>
            <p style={{ fontSize: 14, color: "#41545c", lineHeight: 1.7, textAlign: "center" }}>
              Vous êtes bien inscrit(e) à la newsletter de Make Your Moment. Vous pouvez fermer cette page.
            </p>
          </>
        ) : done === "desinscrit" ? (
          <>
            <h1 style={{ fontSize: 22, fontWeight: 900, color: C.teal, margin: "0 0 12px", textAlign: "center" }}>Désinscription confirmée</h1>
            <p style={{ fontSize: 14, color: "#41545c", lineHeight: 1.7, textAlign: "center" }}>
              Vous ne recevrez plus notre newsletter. Vous pouvez fermer cette page.
            </p>
          </>
        ) : (
          <>
            <h1 style={{ fontSize: 22, fontWeight: 900, color: C.teal, margin: "0 0 8px", textAlign: "center" }}>Newsletter</h1>
            <p style={{ fontSize: 14, color: "#41545c", lineHeight: 1.7, textAlign: "center", marginBottom: 24 }}>
              Recevez les actualités de l'association et les nouveaux séjours par email.
            </p>

            {erreur === "email" && (
              <div style={{ background: "#fef2f2", color: "#991b1b", padding: "10px 14px", borderRadius: 12, fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
                Merci de saisir une adresse email valide.
              </div>
            )}
            {erreur === "technique" && (
              <div style={{ background: "#fef2f2", color: "#991b1b", padding: "10px 14px", borderRadius: 12, fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
                Une erreur est survenue. Merci de réessayer dans un instant.
              </div>
            )}

            <form action={sabonnerNewsletterPublic} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", gap: 12 }}>
                <input type="text" name="prenom" placeholder="Prénom (facultatif)" style={champ} />
                <input type="text" name="nom" placeholder="Nom (facultatif)" style={champ} />
              </div>
              <input type="email" name="email" required placeholder="Adresse email" style={champ} />

              <fieldset style={{ border: "none", padding: 0, margin: "4px 0 0", display: "flex", flexDirection: "column", gap: 8 }}>
                <legend style={{ fontSize: 12, fontWeight: 700, color: C.teal, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4, padding: 0 }}>
                  Quelles actualités souhaitez-vous recevoir ?
                </legend>
                <label style={optionCard}>
                  <input type="checkbox" name="interets" value="Jeunes" defaultChecked style={{ width: 18, height: 18, accentColor: C.teal }} />
                  Séjours enfants &amp; ados
                </label>
                <label style={optionCard}>
                  <input type="checkbox" name="interets" value="Seniors" style={{ width: 18, height: 18, accentColor: C.teal }} />
                  Sorties seniors
                </label>
              </fieldset>

              <button type="submit" style={bouton}>S'inscrire à la newsletter</button>
            </form>

            <div style={{ borderTop: `1px solid ${C.arctic}`, margin: "28px 0 20px" }} />

            <p style={{ fontSize: 12, fontWeight: 700, color: C.gray, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>
              Se désabonner
            </p>
            <form action={desabonnerNewsletterPublic} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input type="email" name="email" required placeholder="Votre adresse email" style={champ} />
              <button type="submit" style={{ ...bouton, background: C.arctic }}>Me désabonner</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
