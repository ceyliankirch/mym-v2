import Link from "next/link";

const C = {
  yellow: "#FFC801",
  saffron: "#FF9932",
  teal: "#114C5A",
  arctic: "#F1F6F4",
  white: "#ffffff",
};

export const metadata = { title: "Confidentialité · Make Your Moment" };

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: "32px" }}>
      <h2 style={{ fontSize: "16px", fontWeight: 800, color: C.teal, marginBottom: "10px" }}>{title}</h2>
      <div style={{ fontSize: "14px", color: "#4a6a74", lineHeight: 1.8 }}>{children}</div>
    </div>
  );
}

export default function ConfidentialitePage() {
  return (
    <div style={{ fontFamily: "'Montserrat',sans-serif", background: C.arctic, color: C.teal, minHeight: "100vh" }}>
      <section style={{ padding: "80px 32px 48px", textAlign: "center" }}>
        <h1 style={{ fontWeight: 900, fontSize: "clamp(2rem, 4vw, 2.75rem)", letterSpacing: "-1px", marginBottom: "12px" }}>
          Politique de <span style={{ color: C.saffron }}>confidentialité</span>
        </h1>
        <p style={{ fontSize: "14px", color: "#5a7a84" }}>
          <Link href="/" style={{ color: C.teal, textDecoration: "none", fontWeight: 600 }}>Accueil</Link> / Confidentialité
        </p>
      </section>

      <section style={{ padding: "0 32px 96px" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto", background: C.white, borderRadius: "24px", padding: "48px", boxShadow: "0 4px 16px rgba(17,76,90,0.06)" }}>

          <Section title="1. Données collectées">
            <p>
              Dans le cadre des inscriptions aux séjours et de la gestion de l'espace famille, nous collectons des
              données concernant les représentants légaux (nom, email, téléphone) et les enfants inscrits (nom,
              date de naissance, informations médicales le cas échéant, documents justificatifs).
            </p>
          </Section>

          <Section title="2. Finalité du traitement">
            <p>
              Ces données sont utilisées exclusivement pour la gestion des inscriptions, le suivi des séjours et la
              communication avec les familles. Elles ne sont ni vendues, ni cédées à des tiers à des fins commerciales.
            </p>
          </Section>

          <Section title="3. Conservation">
            <p>
              Les données sont conservées pendant la durée nécessaire à la gestion de l'inscription et aux obligations
              légales de l'association, puis supprimées ou archivées de manière sécurisée.
            </p>
          </Section>

          <Section title="4. Droits des personnes">
            <p>
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos
              données. Pour exercer ces droits, contactez-nous à mym.makeyourmoment@gmail.com.
            </p>
          </Section>

          <Section title="5. Sécurité">
            <p>
              Les données sont stockées sur des infrastructures sécurisées (base de données hébergée, stockage de
              documents chiffré) et l'accès y est restreint aux personnes habilitées de l'association.
            </p>
          </Section>

        </div>
      </section>
    </div>
  );
}
