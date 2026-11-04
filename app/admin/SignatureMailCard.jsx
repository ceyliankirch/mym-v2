"use client";
import { useState, useRef } from "react";
import { Phone, Mail, Globe, MapPin, Download, Copy, Loader } from "lucide-react";
import { enregistrerVisuelCommunication } from "@/app/actions/communication";

const C = {
  yellow: "#FFC801",
  saffron: "#FF9932",
  teal: "#114C5A",
  pink: "#B91C5C",
  arctic: "#F1F6F4",
  white: "#ffffff",
  gray: "#8aaa",
  lightGray: "#e2e8f0",
};

const LOGO_SRC = "/logo-mym-couleur.png";
const SIG_W = 640;
const FONT_STACK = "var(--font-montserrat), 'Segoe UI', system-ui, sans-serif";

function Ligne({ icon: Icon, children }) {
  if (!children) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 7 }}>
      <div style={{ width: 22, height: 22, borderRadius: "50%", background: C.teal, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={12} color="#fff" strokeWidth={2.6} />
      </div>
      <span style={{ fontSize: 14, fontWeight: 600, color: C.teal, lineHeight: 1.2 }}>{children}</span>
    </div>
  );
}

function Signature({ f, innerRef }) {
  const nomComplet = `${f.prenom} ${f.nom}`.trim();
  return (
    <div ref={innerRef} style={{ width: SIG_W, background: "#fff", fontFamily: FONT_STACK, boxSizing: "border-box" }}>
      {/* bandeau aux couleurs du logo */}
      <div style={{ display: "flex", height: 6 }}>
        <div style={{ flex: 1, background: C.pink }} />
        <div style={{ flex: 1, background: C.saffron }} />
        <div style={{ flex: 1, background: C.yellow }} />
        <div style={{ flex: 1, background: C.teal }} />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 22, padding: "20px 24px 18px" }}>
        <img src={LOGO_SRC} alt="" crossOrigin="anonymous" style={{ width: 150, height: 150, objectFit: "contain", flexShrink: 0 }} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 26, fontWeight: 900, color: C.teal, lineHeight: 1.05, letterSpacing: -0.3 }}>
            {nomComplet || "Prénom Nom"}
          </div>
          <div style={{ display: "inline-block", marginTop: 8, background: C.yellow, color: C.teal, fontSize: 13, fontWeight: 900, textTransform: "uppercase", letterSpacing: 0.8, padding: "5px 14px", borderRadius: 999 }}>
            Make Your Moment
          </div>
          {f.fonction && (
            <div style={{ marginTop: 7, color: C.teal, fontSize: 13, fontWeight: 700 }}>{f.fonction}</div>
          )}

          <div style={{ marginTop: 10 }}>
            <Ligne icon={Phone}>{f.telephone}</Ligne>
            <Ligne icon={Mail}>{f.email}</Ligne>
            <Ligne icon={Globe}>{f.site}</Ligne>
            <Ligne icon={MapPin}>{f.adresse}</Ligne>
          </div>
        </div>
      </div>

      <div style={{ padding: "0 24px 8px", textAlign: "center", color: "#64748b", fontSize: 12, fontWeight: 600 }}>
        Colonies de vacances, séjours &amp; sorties
      </div>
      <div style={{ background: `linear-gradient(90deg, ${C.yellow}, ${C.saffron})`, color: C.teal, padding: "10px 24px", fontSize: 12, fontWeight: 800, textAlign: "center", letterSpacing: 0.3 }}>
        Encadrement de qualité par des enseignants et éducateurs diplômés
      </div>
    </div>
  );
}

/* Carte "Signature mail" (onglet Paramètres) : saisie nom / prénom / coordonnées,
   aperçu en direct et export PNG à coller dans les réglages de signature de la messagerie. */
export default function SignatureMailCard({ parametres }) {
  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    fonction: "",
    telephone: parametres?.telephoneContact || "+33 6 98 96 50 02",
    email: parametres?.emailContact || "mym.makeyourmoment@gmail.com",
    site: "www.make-your-moment.com",
    adresse: [parametres?.adresseRue || "16 avenue du Rond Point", parametres?.adresseVille || "Sucy-en-Brie"].join(" - "),
  });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const sigRef = useRef(null);

  const maj = (champ, valeur) => setForm((f) => ({ ...f, [champ]: valeur }));

  const generer = async () => {
    const mod = await import("html-to-image");
    await new Promise((r) => setTimeout(r, 150)); // laisse le logo se charger
    return mod.toPng(sigRef.current, { pixelRatio: 3, cacheBust: true, backgroundColor: "#ffffff" });
  };

  // Enregistre la signature générée dans la bibliothèque de communication (échec non bloquant)
  const archiver = async (dataUrl) => {
    try {
      const nomComplet = `${form.prenom} ${form.nom}`.trim() || "Sans nom";
      const res = await enregistrerVisuelCommunication({
        dataUrl,
        type: "signature",
        nom: `Signature — ${nomComplet}`,
        largeur: SIG_W * 3,
        hauteur: sigRef.current?.offsetHeight ? sigRef.current.offsetHeight * 3 : null,
      });
      return !res?.error;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const nomFichier = () => {
    const base = `signature-${form.prenom}-${form.nom}`.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return `${base || "signature-mym"}.png`;
  };

  const telecharger = async () => {
    setBusy(true);
    setMsg("");
    try {
      const dataUrl = await generer();
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = nomFichier();
      a.click();
      const ok = await archiver(dataUrl);
      setMsg(ok ? "Signature téléchargée et enregistrée dans Communication → Bibliothèque ✅" : "Signature téléchargée (enregistrement dans la bibliothèque impossible)");
    } catch (e) {
      console.error(e);
      setMsg("Erreur lors de la génération de l'image.");
    } finally {
      setBusy(false);
    }
  };

  const copier = async () => {
    setBusy(true);
    setMsg("");
    try {
      const dataUrl = await generer();
      const blob = await (await fetch(dataUrl)).blob();
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      const ok = await archiver(dataUrl);
      setMsg(ok ? "Image copiée (et enregistrée dans la bibliothèque) : collez-la avec Cmd/Ctrl+V ✅" : "Image copiée : collez-la avec Cmd/Ctrl+V ✅");
    } catch (e) {
      console.error(e);
      setMsg("Copie impossible sur ce navigateur : utilisez le téléchargement.");
    } finally {
      setBusy(false);
    }
  };

  const champStyle = { width: "100%", padding: "12px 14px", borderRadius: "10px", border: `1px solid ${C.lightGray}`, fontSize: "14px", outline: "none", boxSizing: "border-box" };
  const labelStyle = { display: "block", fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px", color: C.gray, marginBottom: "6px" };
  const btnPrimary = { background: C.yellow, color: C.teal, border: "none", padding: "12px 20px", borderRadius: "12px", fontWeight: 800, fontSize: "13px", cursor: busy ? "wait" : "pointer", display: "flex", alignItems: "center", gap: "8px", opacity: busy ? 0.6 : 1 };
  const btnGhost = { ...btnPrimary, background: C.arctic };

  const champs = [
    ["prenom", "Prénom", "Marie"],
    ["nom", "Nom", "Dupont"],
    ["fonction", "Fonction (optionnel)", "Directrice de séjour"],
    ["telephone", "Téléphone", "+33 6 98 96 50 02"],
    ["email", "Email", "prenom@make-your-moment.com"],
    ["site", "Site web", "www.make-your-moment.com"],
    ["adresse", "Adresse", "16 avenue du Rond Point - Sucy-en-Brie"],
  ];

  return (
    <div style={{ background: C.white, borderRadius: "24px", padding: "28px", boxShadow: "0 4px 16px rgba(17,76,90,0.04)", marginBottom: "32px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: 900, color: C.teal, marginBottom: "6px" }}>✉️ Signature mail</h2>
      <p style={{ color: C.gray, fontSize: "14px", marginBottom: "20px", maxWidth: "680px", lineHeight: 1.6 }}>
        Renseignez le nom et les coordonnées, puis téléchargez la signature en PNG pour l&apos;ajouter à votre messagerie (Gmail : Paramètres → Signature → insérer une image).
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "28px", alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 300px", maxWidth: 420, display: "grid", gap: "14px" }}>
          {champs.map(([cle, label, placeholder]) => (
            <div key={cle}>
              <label style={labelStyle}>{label}</label>
              <input style={champStyle} value={form[cle]} onChange={(e) => maj(cle, e.target.value)} placeholder={placeholder} />
            </div>
          ))}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "4px" }}>
            <button type="button" onClick={telecharger} disabled={busy} style={btnPrimary}>
              {busy ? <Loader size={15} className="animate-spin" /> : <Download size={15} />} Télécharger en PNG
            </button>
            <button type="button" onClick={copier} disabled={busy} style={btnGhost}>
              <Copy size={15} /> Copier l&apos;image
            </button>
          </div>
          {msg && <p style={{ fontSize: "12px", fontWeight: 700, color: msg.startsWith("Erreur") || msg.startsWith("Copie impossible") ? "#991b1b" : C.teal, margin: 0 }}>{msg}</p>}
        </div>

        <div style={{ flex: "1 1 auto", background: C.arctic, borderRadius: "20px", padding: "20px", overflowX: "auto", maxWidth: "100%" }}>
          <div style={{ width: SIG_W, boxShadow: "0 8px 24px rgba(17,76,90,0.12)", borderRadius: 4 }}>
            <Signature f={form} innerRef={sigRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
