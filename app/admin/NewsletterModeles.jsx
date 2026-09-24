"use client";
import { useState } from "react";
import { Copy, Download, Check, Mail, Eye } from "lucide-react";
import { MODELES_NEWSLETTER } from "@/lib/newsletterTemplates";

const C = {
  yellow: "#FFC801",
  teal: "#114C5A",
  arctic: "#F1F6F4",
  white: "#ffffff",
  gray: "#6b7c83",
  lightGray: "#e2e8f0",
};

const btnPrimary = { background: C.yellow, color: C.teal, border: "none", padding: "10px 18px", borderRadius: "10px", fontWeight: 800, fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" };
const btnGhost = { background: C.arctic, color: C.teal, border: "none", padding: "10px 18px", borderRadius: "10px", fontWeight: 700, fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" };

/* 📰 Modèles de newsletter HTML : aperçu, copie dans le presse-papiers (à coller dans Brevo)
   et téléchargement du fichier .html. */
export default function NewsletterModeles() {
  const [selectedId, setSelectedId] = useState(MODELES_NEWSLETTER[0]?.id);
  const [copie, setCopie] = useState(false);
  const modele = MODELES_NEWSLETTER.find((m) => m.id === selectedId);

  if (!modele) return <p style={{ color: C.gray }}>Aucun modèle enregistré.</p>;

  const copier = async () => {
    try {
      await navigator.clipboard.writeText(modele.html);
      setCopie(true);
      setTimeout(() => setCopie(false), 2000);
    } catch (e) {
      alert("Impossible de copier automatiquement : utilisez le téléchargement.");
    }
  };

  // 👁️ Ouvre le modèle dans un nouvel onglet, rendu comme dans une boîte mail
  const visualiser = () => {
    const blob = new Blob([modele.html], { type: "text/html;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank", "noopener");
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  };

  const telecharger = () => {
    const blob = new Blob([modele.html], { type: "text/html;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-${modele.id}.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <p style={{ margin: "0 0 24px", fontSize: "14px", color: C.gray, lineHeight: 1.6, maxWidth: "720px" }}>
        Modèles HTML prêts à l'emploi pour vos campagnes. Copiez le code puis collez-le dans Brevo (Campagnes → Email → éditeur HTML). Le lien de désabonnement utilise la variable Brevo <code>{"{{ unsubscribe }}"}</code>.
      </p>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "24px" }}>
        {MODELES_NEWSLETTER.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelectedId(m.id)}
            style={{ ...(m.id === selectedId ? btnPrimary : btnGhost) }}
          >
            <Mail size={14} /> {m.titre}
          </button>
        ))}
      </div>

      <div style={{ background: C.white, borderRadius: "20px", padding: "24px", border: `1px solid ${C.lightGray}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", flexWrap: "wrap", marginBottom: "20px" }}>
          <div style={{ maxWidth: "560px" }}>
            <h2 style={{ margin: "0 0 6px", fontSize: "18px", fontWeight: 800, color: C.teal }}>{modele.titre}</h2>
            <p style={{ margin: 0, fontSize: "13px", color: C.gray, lineHeight: 1.6 }}>{modele.description}</p>
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button onClick={visualiser} style={btnPrimary}>
              <Eye size={14} /> Visualiser
            </button>
            <button onClick={copier} style={btnGhost}>
              {copie ? <><Check size={14} /> Copié !</> : <><Copy size={14} /> Copier le code</>}
            </button>
            <button onClick={telecharger} style={btnGhost}>
              <Download size={14} /> Télécharger
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
