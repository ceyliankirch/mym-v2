"use client";
import { useState, useEffect, useRef } from "react";
import {
  Megaphone, Image as ImageIcon, Upload, Download, Trash2, Loader,
  Instagram, FileText, Calendar, Clock, MapPin, Users, Phone, Mail,
} from "lucide-react";
import {
  listerFichiersCommunication, enregistrerVisuelCommunication,
  importerFichierCommunication, supprimerFichierCommunication, renommerFichierCommunication,
} from "@/app/actions/communication";

const C = {
  yellow: "#FFC801",
  saffron: "#FF9932",
  teal: "#114C5A",
  green: "#059669",
  lilac: "#EFDEF9",
  arctic: "#F1F6F4",
  white: "#ffffff",
  gray: "#8aaa",
  lightGray: "#e2e8f0",
};

const btnPrimary = { background: C.yellow, color: C.teal, border: "none", padding: "10px 18px", borderRadius: "10px", fontWeight: 800, fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" };
const btnGhost = { background: C.arctic, color: C.teal, border: "none", padding: "10px 18px", borderRadius: "10px", fontWeight: 700, fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" };

const CONTACT_TEL = "+33 6 98 96 50 02";
const CONTACT_EMAIL = "mym.makeyourmoment@gmail.com";
const TAGLINE = "Encadré par des enseignants & des éducateurs diplômés";
const LOGO_SRC = "/logo-mym-couleur.png";
const FONT_STACK = "var(--font-montserrat), 'Segoe UI', system-ui, sans-serif";

const FORMATS = {
  flyer: { label: "Flyer", w: 1080, h: 1530, icon: FileText },
  instagram: { label: "Post Instagram", w: 1080, h: 1080, icon: Instagram },
};

const MOIS_LONG = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

function datesLongues(debut, fin) {
  if (!debut) return "À définir";
  const d = new Date(debut);
  if (Number.isNaN(d.getTime())) return "À définir";
  if (!fin) return `Le ${d.getDate()} ${MOIS_LONG[d.getMonth()]}`;
  const f = new Date(fin);
  if (d.getMonth() === f.getMonth() && d.getFullYear() === f.getFullYear())
    return `Du ${d.getDate()} au ${f.getDate()} ${MOIS_LONG[f.getMonth()]}`;
  return `Du ${d.getDate()} ${MOIS_LONG[d.getMonth()]} au ${f.getDate()} ${MOIS_LONG[f.getMonth()]}`;
}

function nbJours(debut, fin) {
  if (!debut || !fin) return null;
  const d = new Date(debut);
  const f = new Date(fin);
  if (Number.isNaN(d.getTime()) || Number.isNaN(f.getTime())) return null;
  return Math.max(1, Math.round((f - d) / 86400000) + 1);
}

function formatTaille(o) {
  if (!o) return "";
  if (o < 1024) return `${o} o`;
  if (o < 1024 * 1024) return `${Math.round(o / 1024)} Ko`;
  return `${(o / (1024 * 1024)).toFixed(1)} Mo`;
}

/* ─── ÉLÉMENTS DE GABARIT ────────────────────────────────────────────── */
function InfoItem({ icon: Icon, label, value }) {
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
      <div style={{ width: 58, height: 58, borderRadius: 16, background: "#FFF3D6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={25} color={C.teal} strokeWidth={2.4} />
      </div>
      <div style={{ paddingTop: 3, minWidth: 0 }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: C.gray, textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
        <div style={{ fontSize: 25, fontWeight: 800, color: C.teal, marginTop: 2, lineHeight: 1.15 }}>{value}</div>
      </div>
    </div>
  );
}

function PrixBloc({ sejour, compact }) {
  const estSenior = /senior|sénior/i.test(sejour.tranchesAge || "");
  const tarifsArr = (Array.isArray(sejour.tarifs) ? sejour.tarifs : []).filter((t) => t && t.montant != null && t.label);
  const principalLabel = sejour.prixLabel || tarifsArr.find((t) => Number(t.montant) === Number(sejour.prix))?.label || "";
  const autres = tarifsArr.filter((t) => Number(t.montant) !== Number(sejour.prix));
  const lignes = [{ montant: sejour.prix, label: principalLabel }, ...autres];
  const modeBoxes = lignes.length > 1 && lignes.some((l) => l.label);

  return (
    <div>
      <div style={{ fontSize: 19, fontWeight: 800, color: C.gray, textTransform: "uppercase", letterSpacing: 1 }}>Prix par personne</div>

      {modeBoxes ? (
        <div style={{ display: "flex", gap: 16, marginTop: 10, flexWrap: "wrap" }}>
          {lignes.map((l, i) => (
            <div key={i} style={{ background: "#F1F6F4", border: `2px solid ${C.teal}22`, borderRadius: 22, padding: compact ? "14px 22px" : "16px 28px", minWidth: 200 }}>
              <div style={{ fontSize: compact ? 50 : 58, fontWeight: 900, color: C.teal, lineHeight: 1 }}>{l.montant}€</div>
              <div style={{ fontSize: 19, fontWeight: 800, color: C.gray, marginTop: 4 }}>{l.label || "Tarif"}</div>
            </div>
          ))}
          {!estSenior && sejour.prix > 100 && (
            <div style={{ position: "relative", background: "#ECFDF3", border: "2px solid #A7F3D0", borderRadius: 22, padding: compact ? "14px 22px" : "16px 28px", minWidth: 200 }}>
              <div style={{ fontSize: compact ? 50 : 58, fontWeight: 900, color: C.green, lineHeight: 1 }}>{sejour.prix - 100}€</div>
              <div style={{ fontSize: 19, fontWeight: 800, color: C.green, marginTop: 4 }}>Habitant du Val-de-Marne</div>
            </div>
          )}
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 8, flexWrap: "wrap" }}>
          <div style={{ fontSize: compact ? 74 : 84, fontWeight: 900, color: C.teal, lineHeight: 1 }}>{sejour.prix || 0}€</div>
          {!estSenior && sejour.prix > 100 && (
            <div style={{ position: "relative", background: "#ECFDF3", border: "2px solid #A7F3D0", borderRadius: 22, padding: "12px 26px" }}>
              <div style={{ fontSize: compact ? 52 : 60, fontWeight: 900, color: C.green, lineHeight: 1 }}>{sejour.prix - 100}€</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: C.green, marginTop: 4 }}>Habitant du Val-de-Marne</div>
              <div style={{ position: "absolute", top: -16, right: -16, width: 38, height: 38, borderRadius: "50%", background: "#fff", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 21, fontWeight: 800, color: C.gray }}>?</div>
            </div>
          )}
        </div>
      )}

      <div style={{ fontSize: 19, color: C.gray, marginTop: 12 }}>Paiement jusqu'à 8× sans frais possible</div>
    </div>
  );
}

function Fond({ sejour, sansImage, w, h }) {
  if (sejour.imageUrl && !sansImage) {
    return <img src={sejour.imageUrl} crossOrigin="anonymous" alt="" style={{ position: "absolute", top: 0, left: 0, width: w, height: h, objectFit: "cover" }} />;
  }
  return <div style={{ position: "absolute", top: 0, left: 0, width: w, height: h, background: `linear-gradient(135deg, ${C.teal}, ${C.saffron})` }} />;
}

function FlyerTemplate({ sejour, qrDataUrl, sansImage, innerRef }) {
  const { w, h } = FORMATS.flyer;
  const duree = nbJours(sejour.dateDebut, sejour.dateFin);
  return (
    <div ref={innerRef} style={{ position: "relative", width: w, height: h, background: "#fff", overflow: "hidden", fontFamily: FONT_STACK }}>
      <Fond sejour={sejour} sansImage={sansImage} w={w} h={620} />

      <h1 style={{ position: "absolute", top: 400, left: 60, width: 820, margin: 0, color: "#fff", fontSize: 100, fontWeight: 800, lineHeight: 1.02, letterSpacing: -1, textShadow: "0 6px 30px rgba(0,0,0,0.4)" }}>
        {sejour.titre}
      </h1>

      <div style={{ position: "absolute", top: 600, left: 0, height: 92, width: "86%", background: C.yellow, borderTopRightRadius: 56, borderBottomRightRadius: 56, display: "flex", alignItems: "center", padding: "0 62px" }}>
        <span style={{ color: C.teal, fontWeight: 800, fontSize: 26, textTransform: "uppercase", letterSpacing: 1, lineHeight: 1.2 }}>{TAGLINE}</span>
      </div>

      <div style={{ position: "absolute", top: 664, left: 0, right: 0, bottom: 0, background: "#fff", borderTopLeftRadius: 52, borderTopRightRadius: 52, boxShadow: "0 -18px 40px rgba(17,76,90,0.07)" }} />

      <img src={LOGO_SRC} crossOrigin="anonymous" alt="" style={{ position: "absolute", top: 690, left: "50%", transform: "translateX(-50%)", width: 120, height: 120, objectFit: "contain" }} />

      <div style={{ position: "absolute", top: 850, left: 60, right: 60 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", rowGap: 26, columnGap: 18 }}>
          <InfoItem icon={Calendar} label="Dates" value={datesLongues(sejour.dateDebut, sejour.dateFin)} />
          <InfoItem icon={Clock} label="Durée" value={duree ? `${duree} jours` : "—"} />
          <InfoItem icon={MapPin} label="Lieu" value={sejour.lieu || "—"} />
          <InfoItem icon={Users} label="Âge" value={sejour.tranchesAge || "—"} />
          <InfoItem icon={Users} label="Places" value={`${sejour.places || 0} place(s) max.`} />
        </div>

        <div style={{ maxWidth: 600, marginTop: 46 }}>
          <PrixBloc sejour={sejour} />
          <div style={{ height: 1, background: "#e8edf0", margin: "32px 0" }} />
          <div style={{ fontSize: 19, fontWeight: 800, color: C.gray, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Une question ?</div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, fontWeight: 700, color: C.teal, marginBottom: 8 }}>
            <Phone size={21} color={C.saffron} strokeWidth={2.4} /> {CONTACT_TEL}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, fontWeight: 700, color: C.teal }}>
            <Mail size={21} color={C.saffron} strokeWidth={2.4} /> {CONTACT_EMAIL}
          </div>
        </div>
      </div>

      {qrDataUrl && <img src={qrDataUrl} alt="" style={{ position: "absolute", right: 56, bottom: 130, width: 290, height: 290 }} />}
    </div>
  );
}

function InstagramTemplate({ sejour, qrDataUrl, sansImage, innerRef }) {
  const { w, h } = FORMATS.instagram;
  const duree = nbJours(sejour.dateDebut, sejour.dateFin);
  return (
    <div ref={innerRef} style={{ position: "relative", width: w, height: h, background: "#fff", overflow: "hidden", fontFamily: FONT_STACK }}>
      <Fond sejour={sejour} sansImage={sansImage} w={w} h={430} />

      <h1 style={{ position: "absolute", top: 250, left: 56, width: 760, margin: 0, color: "#fff", fontSize: 88, fontWeight: 800, lineHeight: 1.02, letterSpacing: -1, textShadow: "0 6px 30px rgba(0,0,0,0.4)" }}>
        {sejour.titre}
      </h1>

      <div style={{ position: "absolute", top: 410, left: 0, height: 82, width: "86%", background: C.yellow, borderTopRightRadius: 48, borderBottomRightRadius: 48, display: "flex", alignItems: "center", padding: "0 56px" }}>
        <span style={{ color: C.teal, fontWeight: 800, fontSize: 23, textTransform: "uppercase", letterSpacing: 1, lineHeight: 1.2 }}>{TAGLINE}</span>
      </div>

      <div style={{ position: "absolute", top: 470, left: 0, right: 0, bottom: 0, background: "#fff", borderTopLeftRadius: 48, borderTopRightRadius: 48 }} />

      <img src={LOGO_SRC} crossOrigin="anonymous" alt="" style={{ position: "absolute", top: 492, left: "50%", transform: "translateX(-50%)", width: 96, height: 96, objectFit: "contain" }} />

      <div style={{ position: "absolute", top: 620, left: 56, right: 56 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", rowGap: 22, columnGap: 16 }}>
          <InfoItem icon={Calendar} label="Dates" value={datesLongues(sejour.dateDebut, sejour.dateFin)} />
          <InfoItem icon={Clock} label="Durée" value={duree ? `${duree} jours` : "—"} />
          <InfoItem icon={MapPin} label="Lieu" value={sejour.lieu || "—"} />
          <InfoItem icon={Users} label="Âge" value={sejour.tranchesAge || "—"} />
          <InfoItem icon={Users} label="Places" value={`${sejour.places || 0} pl. max.`} />
        </div>
        <div style={{ maxWidth: 620, marginTop: 34 }}>
          <PrixBloc sejour={sejour} compact />
        </div>
      </div>

      {qrDataUrl && <img src={qrDataUrl} alt="" style={{ position: "absolute", right: 48, bottom: 48, width: 220, height: 220 }} />}
    </div>
  );
}

/* ─── GÉNÉRATEUR ─────────────────────────────────────────────────────── */
function Generateur({ sejours, onSaved }) {
  const captureRef = useRef(null);
  const [sejourId, setSejourId] = useState(sejours?.[0]?.id || "");
  const [format, setFormat] = useState("flyer");
  const [sansImage, setSansImage] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const sejour = (sejours || []).find((s) => s.id === sejourId);
  const { w, h } = FORMATS[format];

  // QR code (points ronds, coins orange) régénéré à chaque changement de séjour
  useEffect(() => {
    let annule = false;
    (async () => {
      if (!sejourId || typeof window === "undefined") return;
      try {
        const mod = await import("qr-code-styling");
        const QRCodeStyling = mod.default;
        const qr = new QRCodeStyling({
          width: 600, height: 600, type: "canvas",
          data: `${window.location.origin}/sejours-enfants-ados/${sejourId}`,
          margin: 0,
          qrOptions: { errorCorrectionLevel: "Q" },
          dotsOptions: { type: "dots", color: C.teal },
          backgroundOptions: { color: "#ffffff" },
          cornersSquareOptions: { type: "dot", color: C.teal },
          cornersDotOptions: { type: "dot", color: C.saffron },
        });
        const blob = await qr.getRawData("png");
        if (annule || !blob) return;
        const url = await new Promise((res) => {
          const r = new FileReader();
          r.onload = () => res(r.result);
          r.readAsDataURL(blob);
        });
        if (!annule) setQrDataUrl(url);
      } catch (e) {
        console.error("Erreur QR", e);
      }
    })();
    return () => { annule = true; };
  }, [sejourId]);

  const handleSave = async () => {
    if (!captureRef.current || !sejour) return;
    setSaving(true);
    setMsg("");
    try {
      const mod = await import("html-to-image");
      // laisse le temps aux images (fond, logo, QR) de se charger
      await new Promise((r) => setTimeout(r, 250));
      const dataUrl = await mod.toPng(captureRef.current, {
        pixelRatio: 1.5,
        cacheBust: true,
        backgroundColor: "#ffffff",
        width: w,
        height: h,
      });
      const res = await enregistrerVisuelCommunication({
        dataUrl,
        type: format,
        nom: `${FORMATS[format].label} — ${sejour.titre}`,
        sejourId: sejour.id,
        sejourTitre: sejour.titre,
        largeur: Math.round(w * 1.5),
        hauteur: Math.round(h * 1.5),
      });
      setSaving(false);
      if (res.error) setMsg(`Erreur : ${res.error}`);
      else { setMsg("Visuel enregistré dans la bibliothèque ✅"); onSaved(); }
    } catch (e) {
      console.error(e);
      setSaving(false);
      setMsg("Erreur lors de la génération de l'image.");
    }
  };

  if (!sejours || sejours.length === 0) {
    return (
      <div style={{ background: C.white, borderRadius: "20px", padding: "32px", color: C.gray, fontSize: "13px" }}>
        Créez d'abord un séjour pour générer des visuels.
      </div>
    );
  }

  const previewW = format === "instagram" ? 340 : 300;
  const scale = previewW / w;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "flex-start" }}>
      <div style={{ flex: "1 1 320px", background: C.white, borderRadius: "20px", padding: "24px", boxShadow: "0 4px 16px rgba(17,76,90,0.04)" }}>
        <h3 style={{ fontSize: "15px", fontWeight: 900, color: C.teal, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
          <Megaphone size={16} /> Générer un visuel
        </h3>

        <label style={{ fontSize: "11px", fontWeight: 700, color: C.gray, textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Séjour</label>
        <select
          value={sejourId}
          onChange={(e) => { setSejourId(e.target.value); setSansImage(false); setMsg(""); }}
          style={{ width: "100%", padding: "12px", borderRadius: "12px", border: `1px solid ${C.lightGray}`, fontSize: "13px", marginBottom: "16px", background: C.white, color: C.teal, fontWeight: 600 }}
        >
          {sejours.map((s) => <option key={s.id} value={s.id}>{s.titre}</option>)}
        </select>

        <label style={{ fontSize: "11px", fontWeight: 700, color: C.gray, textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Format</label>
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          {Object.entries(FORMATS).map(([key, f]) => (
            <button
              key={key}
              onClick={() => setFormat(key)}
              style={{
                flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                padding: "12px", borderRadius: "12px", cursor: "pointer", fontSize: "13px", fontWeight: 700,
                border: `2px solid ${format === key ? C.teal : C.lightGray}`,
                background: format === key ? C.lilac : C.white, color: C.teal,
              }}
            >
              <f.icon size={15} /> {f.label}
            </button>
          ))}
        </div>

        <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 700, color: C.teal, cursor: "pointer", marginBottom: "16px" }}>
          <input type="checkbox" checked={sansImage} onChange={(e) => setSansImage(e.target.checked)} />
          Sans photo de couverture (fond dégradé)
        </label>

        <button onClick={handleSave} disabled={saving} style={{ ...btnPrimary, width: "100%", justifyContent: "center", opacity: saving ? 0.6 : 1 }}>
          {saving ? <Loader size={15} className="animate-spin" /> : <Download size={15} />}
          Enregistrer dans la bibliothèque
        </button>

        {msg && <p style={{ fontSize: "12px", fontWeight: 700, color: msg.startsWith("Erreur") ? "#991b1b" : C.teal, marginTop: "12px" }}>{msg}</p>}

        <p style={{ fontSize: "11px", color: C.gray, marginTop: "16px", lineHeight: 1.5 }}>
          Version 1 du gabarit. Si la photo de couverture n'apparaît pas à l'enregistrement, cochez « sans photo » ou réessayez.
        </p>
      </div>

      <div style={{ flex: "0 0 auto", background: C.arctic, borderRadius: "20px", padding: "16px" }}>
        <div style={{ width: previewW, height: h * scale, overflow: "hidden", borderRadius: "12px", boxShadow: "0 8px 24px rgba(17,76,90,0.15)" }}>
          <div style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: w }}>
            {format === "flyer"
              ? <FlyerTemplate sejour={sejour} qrDataUrl={qrDataUrl} sansImage={sansImage} innerRef={captureRef} />
              : <InstagramTemplate sejour={sejour} qrDataUrl={qrDataUrl} sansImage={sansImage} innerRef={captureRef} />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── BIBLIOTHÈQUE ───────────────────────────────────────────────────── */
function Bibliotheque({ fichiers, onRefresh }) {
  const [isImporting, setIsImporting] = useState(false);
  const [importMsg, setImportMsg] = useState("");
  const fileRef = useRef(null);

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsImporting(true);
    setImportMsg("");
    const fd = new FormData();
    fd.append("fichier", file);
    const res = await importerFichierCommunication(fd);
    setIsImporting(false);
    if (fileRef.current) fileRef.current.value = "";
    if (res.error) setImportMsg(`Erreur : ${res.error}`);
    else { setImportMsg("Fichier importé."); onRefresh(); }
  };

  const handleDelete = async (f) => {
    if (!window.confirm(`Supprimer définitivement « ${f.nom} » ?`)) return;
    await supprimerFichierCommunication(f.id);
    onRefresh();
  };

  const handleRename = async (f) => {
    const nom = window.prompt("Nouveau nom :", f.nom);
    if (!nom || nom === f.nom) return;
    await renommerFichierCommunication(f.id, nom);
    onRefresh();
  };

  const badge = (type) => {
    const map = {
      flyer: { bg: "#e0f2fe", fg: "#075985", label: "Flyer" },
      instagram: { bg: "#fce7f3", fg: "#be185d", label: "Instagram" },
      import: { bg: C.arctic, fg: C.gray, label: "Import" },
    };
    const b = map[type] || map.import;
    return <span style={{ background: b.bg, color: b.fg, padding: "3px 8px", borderRadius: "6px", fontSize: "10px", fontWeight: 800 }}>{b.label}</span>;
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 700, color: C.gray }}>{fichiers.length} fichier{fichiers.length !== 1 ? "s" : ""}</div>
        <label style={{ ...btnGhost, cursor: isImporting ? "not-allowed" : "pointer", opacity: isImporting ? 0.6 : 1 }}>
          {isImporting ? <Loader size={15} className="animate-spin" /> : <Upload size={15} />} Importer un fichier
          <input ref={fileRef} type="file" accept="image/*,application/pdf" onChange={handleImport} disabled={isImporting} style={{ display: "none" }} />
        </label>
      </div>

      {importMsg && <div style={{ background: C.arctic, color: C.teal, padding: "10px 14px", borderRadius: "10px", fontSize: "12px", fontWeight: 700, marginBottom: "16px" }}>{importMsg}</div>}

      {fichiers.length === 0 ? (
        <div style={{ background: C.white, borderRadius: "20px", padding: "48px", textAlign: "center", color: C.gray }}>
          <ImageIcon size={36} style={{ opacity: 0.2, marginBottom: "12px" }} />
          <p>Aucun fichier de communication pour le moment.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
          {fichiers.map((f) => {
            const estImage = (f.mimeType || "").startsWith("image/");
            return (
              <div key={f.id} style={{ background: C.white, borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 12px rgba(17,76,90,0.04)", display: "flex", flexDirection: "column" }}>
                <div style={{ aspectRatio: "1 / 1", background: C.arctic, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  {estImage
                    ? <img src={f.url} alt={f.nom} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <FileText size={40} color={C.gray} />}
                </div>
                <div style={{ padding: "12px", flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                    {badge(f.type)}
                    <span style={{ fontSize: "10px", color: C.gray }}>{formatTaille(f.taille)}</span>
                  </div>
                  <button onClick={() => handleRename(f)} title="Renommer" style={{ background: "none", border: "none", padding: 0, textAlign: "left", fontSize: "12px", fontWeight: 800, color: C.teal, cursor: "pointer", lineHeight: 1.3 }}>
                    {f.nom}
                  </button>
                  {f.sejourTitre && <span style={{ fontSize: "11px", color: C.gray }}>{f.sejourTitre}</span>}
                  <span style={{ fontSize: "10px", color: C.gray }}>{new Date(f.createdAt).toLocaleDateString("fr-FR")}</span>
                  <div style={{ display: "flex", gap: "6px", marginTop: "auto", paddingTop: "6px" }}>
                    <a href={f.url} target="_blank" rel="noreferrer" style={{ ...btnGhost, flex: 1, justifyContent: "center", padding: "8px", textDecoration: "none", fontSize: "12px" }}>
                      <Download size={13} /> Ouvrir
                    </a>
                    <button onClick={() => handleDelete(f)} style={{ background: "#fee2e2", border: "none", width: "34px", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#991b1b" }}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── SECTION ────────────────────────────────────────────────────────── */
export default function CommunicationSection({ sejours }) {
  const [fichiers, setFichiers] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    const f = await listerFichiersCommunication();
    setFichiers(f);
    setLoading(false);
  };

  useEffect(() => { refresh(); }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <Generateur sejours={sejours} onSaved={refresh} />
      <div>
        <h3 style={{ fontSize: "16px", fontWeight: 900, color: C.teal, marginBottom: "16px" }}>Bibliothèque</h3>
        {loading ? (
          <div style={{ padding: "40px", textAlign: "center", color: C.gray }}>Chargement...</div>
        ) : (
          <Bibliotheque fichiers={fichiers} onRefresh={refresh} />
        )}
      </div>
    </div>
  );
}
