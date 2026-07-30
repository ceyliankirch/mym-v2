import Link from "next/link";

const C = {
  yellow: "#FFC801",
  saffron: "#FF9932",
  teal: "#114C5A",
  arctic: "#F1F6F4",
  white: "#ffffff",
};

export const metadata = { title: "Mentions légales · Make Your Moment" };

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: "32px" }}>
      <h2 style={{ fontSize: "16px", fontWeight: 800, color: C.teal, marginBottom: "10px" }}>{title}</h2>
      <div style={{ fontSize: "14px", color: "#4a6a74", lineHeight: 1.8 }}>{children}</div>
    </div>
  );
}

export default function MentionsLegalesPage() {
  return (
    <div style={{ fontFamily: "'Montserrat',sans-serif", background: C.arctic, color: C.teal, minHeight: "100vh" }}>
      <section style={{ padding: "80px 32px 48px", textAlign: "center" }}>
        <h1 style={{ fontWeight: 900, fontSize: "clamp(2rem, 4vw, 2.75rem)", letterSpacing: "-1px", marginBottom: "12px" }}>
          Mentions <span style={{ color: C.saffron }}>légales</span>
        </h1>
        <p style={{ fontSize: "14px", color: "#5a7a84" }}>
          <Link href="/" style={{ color: C.teal, textDecoration: "none", fontWeight: 600 }}>Accueil</Link> / Mentions légales
        </p>
      </section>

      <section style={{ padding: "0 32px 96px" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto", background: C.white, borderRadius: "24px", padding: "48px", boxShadow: "0 4px 16px rgba(17,76,90,0.06)" }}>

          <Section title="Éditeur du site">
            <p>
              Make Your Moment — Association loi 1901<br />
              16 avenue du Rond Point, 94370 Sucy-en-Brie, France<br />
              Email : mym.makeyourmoment@gmail.com<br />
              Téléphone : +33 6 98 96 50 02<br />
              Numéro SIRET : [à compléter]
            </p>
          </Section>

          <Section title="Directeur de publication">
            <p>Le représentant légal de l'association Make Your Moment.</p>
          </Section>

          <Section title="Hébergement">
            <p>
              Ce site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA — vercel.com
            </p>
          </Section>

          <Section title="Propriété intellectuelle">
            <p>
              L'ensemble des contenus présents sur ce site (textes, images, logo) est la propriété de Make Your Moment,
              sauf mention contraire, et ne peut être reproduit sans autorisation préalable.
            </p>
          </Section>

          <Section title="Contact">
            <p>Pour toute question relative à ce site, contactez-nous à mym.makeyourmoment@gmail.com.</p>
          </Section>

        </div>
      </section>
    </div>
  );
}
