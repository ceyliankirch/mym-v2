"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Megaphone, Image as ImageIcon, Upload, Download, Trash2, Loader,
  Instagram, FileText, X,
} from "lucide-react";
import {
  listerFichiersCommunication, enregistrerVisuelCommunication,
  importerFichierCommunication, supprimerFichierCommunication, renommerFichierCommunication,
} from "@/app/actions/communication";

const C = {
  yellow: "#FFC801",
  saffron: "#FF9932",
  teal: "#114C5A",
  lilac: "#EFDEF9",
  arctic: "#F1F6F4",
  white: "#ffffff",
  gray: "#8aaa",
  lightGray: "#e2e8f0",
};

const btnPrimary = { background: C.yellow, color: C.teal, border: "none", padding: "10px 18px", borderRadius: "10px", fontWeight: 800, fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" };
const btnGhost = { background: C.arctic, color: C.teal, border: "none", padding: "10px 18px", borderRadius: "10px", fontWeight: 700, fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" };

const FORMATS = {
  flyer: { label: "Flyer", w: 1080, h: 1350, icon: FileText },
  instagram: { label: "Post Instagram", w: 1080, h: 1080, icon: Instagram },
};

const MOIS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
function fmtDates(debut, fin) {
  if (!debut) return "Dates à venir";
  const d = new Date(debut);
  if (Number.isNaN(d.getTime())) return "Dates à venir";
  if (!fin) return `${d.getDate()} ${MOIS[d.getMonth()]} ${d.getFullYear()}`;
  const f = new Date(fin);
  if (d.getMonth() === f.getMonth() && d.getFullYear() === f.getFullYear())
    return `${d.getDate()} – ${f.getDate()} ${MOIS[f.getMonth()]} ${f.getFullYear()}`;
  return `${d.getDate()} ${MOIS[d.getMonth()]} – ${f.getDate()} ${MOIS[f.getMonth()]} ${f.getFullYear()}`;
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 99) {
  const words = (text || "").trim().split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  const shown = lines.slice(0, maxLines);
  if (lines.length > maxLines && shown.length) shown[shown.length - 1] += "…";
  shown.forEach((l, i) => ctx.fillText(l, x, y + i * lineHeight));
  return y + shown.length * lineHeight;
}

function drawCover(ctx, img, w, h) {
  const r = Math.max(w / img.width, h / img.height);
  const nw = img.width * r;
  const nh = img.height * r;
  ctx.drawImage(img, (w - nw) / 2, (h - nh) / 2, nw, nh);
}

function formatTaille(o) {
  if (!o) return "";
  if (o < 1024) return `${o} o`;
  if (o < 1024 * 1024) return `${Math.round(o / 1024)} Ko`;
  return `${(o / (1024 * 1024)).toFixed(1)} Mo`;
}

/* ─── GÉNÉRATEUR ─────────────────────────────────────────────────────── */
function Generateur({ sejours, onSaved }) {
  const canvasRef = useRef(null);
  const [sejourId, setSejourId] = useState(sejours?.[0]?.id || "");
  const [format, setFormat] = useState("flyer");
  const [sansImage, setSansImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const sejour = (sejours || []).find((s) => s.id === sejourId);

  const dessiner = useCallback(() => {
    const canvas = canvasRef.current;
    const sejour = (sejours || []).find((s) => s.id === sejourId);
    if (!canvas || !sejour) return;
    const { w, h } = FORMATS[format];
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");

    const render = (img) => {
      // Fond
      if (img) {
        drawCover(ctx, img, w, h);
      } else {
        const g = ctx.createLinearGradient(0, 0, w, h);
        g.addColorStop(0, C.teal);
        g.addColorStop(1, C.saffron);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      // Voile dégradé pour la lisibilité
      const veil = ctx.createLinearGradient(0, 0, 0, h);
      veil.addColorStop(0, "rgba(17,76,90,0.25)");
      veil.addColorStop(0.45, "rgba(17,76,90,0.15)");
      veil.addColorStop(1, "rgba(17,76,90,0.92)");
      ctx.fillStyle = veil;
      ctx.fillRect(0, 0, w, h);

      const pad = 72;
      ctx.textBaseline = "alphabetic";

      // Kicker
      ctx.fillStyle = C.yellow;
      ctx.font = "800 30px system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
      ctx.fillText("MAKE YOUR MOMENT", pad, pad + 24);

      // Bandeau du bas
      const bandH = 150;
      ctx.fillStyle = C.yellow;
      ctx.fillRect(0, h - bandH, w, bandH);
      ctx.fillStyle = C.teal;
      ctx.font = "900 34px system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
      ctx.fillText("INSCRIPTIONS OUVERTES", pad, h - bandH + 62);
      ctx.font = "700 26px system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
      const prixTxt = sejour.prix > 0 ? `À partir de ${sejour.prix} €` : "Nous contacter";
      ctx.fillText(`${prixTxt}  ·  make-your-moment.com`, pad, h - bandH + 104);

      // Bloc texte (au-dessus du bandeau)
      let y = h - bandH - 60;

      const infos = [fmtDates(sejour.dateDebut, sejour.dateFin), sejour.lieu, sejour.tranchesAge ? `${sejour.tranchesAge}` : null]
        .filter(Boolean)
        .join("   •   ");
      ctx.fillStyle = "rgba(255,255,255,0.92)";
      ctx.font = "700 28px system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
      ctx.fillText(infos, pad, y);
      y -= 24;

      // Description courte (remontée)
      const desc = (sejour.shortDescription || "").replace(/<[^>]+>/g, " ").trim();
      if (desc) {
        ctx.font = "500 30px system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        // on mesure la hauteur puis on dessine
        const lignesDesc = Math.min(2, Math.ceil(ctx.measureText(desc).width / (w - pad * 2)) || 1);
        y -= lignesDesc * 40 + 18;
        wrapText(ctx, desc, pad, y, w - pad * 2, 40, 2);
        y -= 24;
      }

      // Titre
      ctx.fillStyle = C.white;
      const titleSize = format === "instagram" ? 66 : 76;
      ctx.font = `900 ${titleSize}px system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`;
      const titleLines = Math.min(3, Math.ceil(ctx.measureText(sejour.titre || "").width / (w - pad * 2)) || 1);
      y -= titleLines * (titleSize + 8);
      wrapText(ctx, sejour.titre || "Séjour", pad, y, w - pad * 2, titleSize + 8, 3);
    };

    if (sejour.imageUrl && !sansImage) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => render(img);
      img.onerror = () => render(null);
      img.src = sejour.imageUrl;
    } else {
      render(null);
    }
  }, [sejours, sejourId, format, sansImage]);

  useEffect(() => {
    dessiner();
  }, [dessiner]);

  const handleSave = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !sejour) return;
    setSaving(true);
    setMsg("");
    let dataUrl;
    try {
      dataUrl = canvas.toDataURL("image/png");
    } catch (e) {
      setSaving(false);
      if (!sansImage) {
        setSansImage(true);
        setMsg("La photo de couverture bloque l'export (CORS). Version sans photo générée — cliquez à nouveau pour enregistrer.");
      } else {
        setMsg("Impossible d'exporter l'image.");
      }
      return;
    }

    const { w, h } = FORMATS[format];
    const res = await enregistrerVisuelCommunication({
      dataUrl,
      type: format,
      nom: `${FORMATS[format].label} — ${sejour.titre}`,
      sejourId: sejour.id,
      sejourTitre: sejour.titre,
      largeur: w,
      hauteur: h,
    });
    setSaving(false);
    if (res.error) {
      setMsg(`Erreur : ${res.error}`);
    } else {
      setMsg("Visuel enregistré dans la bibliothèque ✅");
      onSaved();
    }
  };

  if (!sejours || sejours.length === 0) {
    return (
      <div style={{ background: C.white, borderRadius: "20px", padding: "32px", color: C.gray, fontSize: "13px" }}>
        Créez d'abord un séjour pour générer des visuels.
      </div>
    );
  }

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

        {sansImage && (
          <p style={{ fontSize: "12px", color: C.saffron, fontWeight: 700, marginBottom: "12px" }}>
            Version sans photo de fond (fond dégradé).
          </p>
        )}

        <button onClick={handleSave} disabled={saving} style={{ ...btnPrimary, width: "100%", justifyContent: "center", opacity: saving ? 0.6 : 1 }}>
          {saving ? <Loader size={15} className="animate-spin" /> : <Download size={15} />}
          Enregistrer dans la bibliothèque
        </button>

        {msg && <p style={{ fontSize: "12px", fontWeight: 700, color: msg.startsWith("Erreur") ? "#991b1b" : C.teal, marginTop: "12px" }}>{msg}</p>}

        <p style={{ fontSize: "11px", color: C.gray, marginTop: "16px", lineHeight: 1.5 }}>
          Version 1 : gabarit unique à partir du titre, des dates, du lieu, des âges, du prix et de la photo de couverture. Les gabarits seront enrichis ensuite.
        </p>
      </div>

      <div style={{ flex: "0 1 340px", background: C.arctic, borderRadius: "20px", padding: "16px", display: "flex", justifyContent: "center" }}>
        <canvas
          ref={canvasRef}
          style={{ width: "100%", maxWidth: format === "instagram" ? "320px" : "300px", height: "auto", borderRadius: "12px", boxShadow: "0 8px 24px rgba(17,76,90,0.15)", display: "block" }}
        />
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
