import Link from "next/link";

const C = {
  yellow: "#FFC801",
  saffron: "#FF9932",
  teal: "#114C5A",
  arctic: "#F1F6F4",
  white: "#ffffff",
};

export const metadata = { title: "CGV · Make Your Moment" };

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: "32px" }}>
      <h2 style={{ fontSize: "16px", fontWeight: 800, color: C.teal, marginBottom: "10px" }}>{title}</h2>
      <div style={{ fontSize: "14px", color: "#4a6a74", lineHeight: 1.8 }}>{children}</div>
    </div>
  );
}

export default function CgvPage() {
  return (
    <div style={{ fontFamily: "'Montserrat',sans-serif", background: C.arctic, color: C.teal, minHeight: "100vh" }}>
      <section style={{ padding: "80px 32px 48px", textAlign: "center" }}>
        <h1 style={{ fontWeight: 900, fontSize: "clamp(2rem, 4vw, 2.75rem)", letterSpacing: "-1px", marginBottom: "12px" }}>
          Conditions générales <span style={{ color: C.saffron }}>de vente</span>
        </h1>
        <p style={{ fontSize: "14px", color: "#5a7a84" }}>
          <Link href="/" style={{ color: C.teal, textDecoration: "none", fontWeight: 600 }}>Accueil</Link> / CGV
        </p>
      </section>

      <section style={{ padding: "0 32px 96px" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto", background: C.white, borderRadius: "24px", padding: "48px", boxShadow: "0 4px 16px rgba(17,76,90,0.06)" }}>

          <Section title="1. Objet">
            <p>
              Les présentes conditions générales de vente régissent les inscriptions aux séjours et sorties proposés par
              l'association Make Your Moment (colonies, séjours ados, sorties séniors) via ce site.
            </p>
          </Section>

          <Section title="2. Inscription">
            <p>
              Toute inscription à un séjour s'effectue via le formulaire dédié sur la fiche du séjour concerné et n'est
              validée qu'après réception du dossier complet (documents requis) et du règlement.
            </p>
          </Section>

          <Section title="3. Tarifs et paiement">
            <p>
              Les tarifs indiqués sur chaque fiche séjour s'entendent en euros, toutes charges comprises pour la
              prestation décrite. Les modalités et échéances de paiement sont précisées lors de l'inscription.
            </p>
          </Section>

          <Section title="4. Annulation">
            <p>
              Les conditions d'annulation et de remboursement propres à chaque séjour sont communiquées lors de
              l'inscription et peuvent varier selon la date d'annulation par rapport à la date de départ.
            </p>
          </Section>

          <Section title="5. Documents requis">
            <p>
              Certains documents (autorisation parentale, fiche sanitaire, etc.) peuvent être exigés pour finaliser
              une inscription. La liste précise est indiquée sur la fiche du séjour et dans l'espace famille.
            </p>
          </Section>

          <Section title="6. Contact">
            <p>Pour toute question relative à une inscription, contactez-nous à mym.makeyourmoment@gmail.com.</p>
          </Section>

        </div>
      </section>
    </div>
  );
}
