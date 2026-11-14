"use client";
import { useState, useEffect, useMemo } from "react";
import { Search, Trash2, Download, Loader, Snowflake, Users, ExternalLink } from "lucide-react";
import { listerInscriptionsPatinoire, supprimerInscriptionPatinoire } from "@/app/actions/patinoire";

const C = {
  yellow: "#FFC801",
  teal: "#114C5A",
  arctic: "#F1F6F4",
  white: "#ffffff",
  gray: "#8aaa",
  lightGray: "#e2e8f0",
};

const th = { textAlign: "left", padding: "12px 16px", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: C.gray, fontWeight: 700 };
const td = { padding: "12px 16px", fontSize: 14, borderTop: `1px solid ${C.arctic}`, color: C.teal };
const btnGhost = { background: C.arctic, color: C.teal, border: "none", padding: "10px 18px", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, textDecoration: "none" };

const formatDate = (iso) => new Date(iso).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" });

export default function PatinoireSection() {
  const [inscriptions, setInscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState("");
  const [recherche, setRecherche] = useState("");

  useEffect(() => {
    let annule = false;
    listerInscriptionsPatinoire().then((res) => {
      if (annule) return;
      if (res?.success) setInscriptions(res.inscriptions);
      else setErreur(res?.error || "Impossible de charger les inscriptions.");
      setLoading(false);
    });
    return () => { annule = true; };
  }, []);

  const totalPatineurs = useMemo(() => inscriptions.reduce((n, i) => n + i.patineurs, 0), [inscriptions]);

  const filtrees = useMemo(() => {
    const q = recherche.trim().toLowerCase();
    if (!q) return inscriptions;
    return inscriptions.filter((i) => `${i.prenom} ${i.nom} ${i.email || ""}`.toLowerCase().includes(q));
  }, [inscriptions, recherche]);

  const supprimer = async (i) => {
    if (!window.confirm(`Supprimer l'inscription de ${i.prenom} ${i.nom} ?`)) return;
    const res = await supprimerInscriptionPatinoire(i.id);
    if (res?.success) setInscriptions((liste) => liste.filter((x) => x.id !== i.id));
    else window.alert(res?.error || "Erreur lors de la suppression");
  };

  const exporterCSV = () => {
    const echap = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const lignes = [["Nom", "Prénom", "Email", "Patineurs", "Inscrit le"].map(echap).join(";")];
    inscriptions.forEach((i) => lignes.push([i.nom, i.prenom, i.email, i.patineurs, formatDate(i.createdAt)].map(echap).join(";")));
    const blob = new Blob(["﻿" + lignes.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "inscrits-soiree-patinoire.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24, marginBottom: 24 }}>
        {[
          { label: "Patineurs au total", valeur: totalPatineurs, Icon: Snowflake },
          { label: "Inscriptions", valeur: inscriptions.length, Icon: Users },
        ].map(({ label, valeur, Icon }) => (
          <div key={label} style={{ background: C.white, borderRadius: 24, padding: "24px 28px", display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: C.yellow + "30", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon size={24} style={{ color: C.teal }} />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 30, fontWeight: 900, color: C.teal, lineHeight: 1 }}>{valeur}</p>
              <p style={{ margin: "4px 0 0", fontSize: 12, fontWeight: 700, color: C.gray }}>{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 16 }}>
        <div style={{ position: "relative", flex: "1 1 260px", maxWidth: 380 }}>
          <Search size={16} color={C.gray} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
          <input
            type="search" value={recherche} onChange={(e) => setRecherche(e.target.value)} placeholder="Rechercher un inscrit…"
            style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px 10px 40px", borderRadius: 999, border: `1px solid ${C.lightGray}`, background: C.white, fontSize: 13, color: C.teal, outline: "none", fontFamily: "inherit" }}
          />
        </div>
        <div style={{ display: "flex", gap: 12, marginLeft: "auto" }}>
          <a href="/patinoire" target="_blank" rel="noreferrer" style={btnGhost}><ExternalLink size={15} />Voir la page</a>
          <button onClick={exporterCSV} disabled={inscriptions.length === 0} style={{ ...btnGhost, opacity: inscriptions.length === 0 ? 0.5 : 1 }}>
            <Download size={15} />Exporter en CSV
          </button>
        </div>
      </div>

      {erreur && <div style={{ background: "#fef2f2", color: "#991b1b", padding: "12px 16px", borderRadius: 12, fontSize: 13, fontWeight: 600, marginBottom: 16 }}>{erreur}</div>}

      <div style={{ background: C.white, borderRadius: 24, overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
          <thead>
            <tr><th style={th}>Nom</th><th style={th}>Prénom</th><th style={th}>Email</th><th style={th}>Patineurs</th><th style={th}>Inscrit le</th><th style={th} /></tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={6} style={{ ...td, textAlign: "center", color: C.gray }}><Loader size={16} style={{ verticalAlign: "middle" }} /> Chargement…</td></tr>
            )}
            {!loading && filtrees.length === 0 && (
              <tr><td colSpan={6} style={{ ...td, textAlign: "center", color: C.gray }}>{inscriptions.length === 0 ? "Aucune inscription pour le moment." : "Aucun résultat."}</td></tr>
            )}
            {filtrees.map((i) => (
              <tr key={i.id}>
                <td style={{ ...td, fontWeight: 800 }}>{i.nom}</td>
                <td style={td}>{i.prenom}</td>
                <td style={td}>{i.email || "—"}</td>
                <td style={{ ...td, fontWeight: 800 }}>{i.patineurs}</td>
                <td style={td}>{formatDate(i.createdAt)}</td>
                <td style={{ ...td, textAlign: "right" }}>
                  <button onClick={() => supprimer(i)} aria-label={`Supprimer ${i.prenom} ${i.nom}`} title="Supprimer"
                    style={{ background: "transparent", border: "none", cursor: "pointer", color: "#ef4444", padding: 6 }}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
