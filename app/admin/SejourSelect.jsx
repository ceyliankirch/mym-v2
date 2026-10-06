"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

const C = { yellow: "#FFC801", teal: "#114C5A", arctic: "#F1F6F4", white: "#ffffff", gray: "#8aaa", lightGray: "#e2e8f0" };

const MOIS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];

// Dates courtes avec l'année : "12 → 19 juil. 2026" (utile pour distinguer des séjours homonymes).
export function datesCourtes(debut, fin) {
  if (!debut) return "Dates à définir";
  const d = new Date(debut);
  const f = fin ? new Date(fin) : null;
  const fmt = (x) => `${x.getDate()} ${MOIS[x.getMonth()]} ${x.getFullYear()}`;
  if (!f || f.getTime() === d.getTime()) return fmt(d);
  if (d.getFullYear() === f.getFullYear() && d.getMonth() === f.getMonth()) return `${d.getDate()} → ${fmt(f)}`;
  if (d.getFullYear() === f.getFullYear()) return `${d.getDate()} ${MOIS[d.getMonth()]} → ${fmt(f)}`;
  return `${fmt(d)} → ${fmt(f)}`;
}

function sousTitre(s) {
  return [datesCourtes(s.dateDebut, s.dateFin), s.tranchesAge].filter(Boolean).join(" · ");
}

// Liste déroulante de séjours : titre + dates + tranche d'âge (impossible avec un <select> natif).
export default function SejourSelect({ sejours = [], value, onChange, placeholder = "-- Sélectionner --", emptyLabel, required, name, style }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const selected = sejours.find((s) => s.id === value);
  const choisir = (id) => { onChange(id); setOpen(false); };

  const ligne = (active, children, onClick, key) => (
    <div
      key={key}
      onClick={onClick}
      style={{ padding: "10px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", background: active ? C.arctic : C.white, borderBottom: `1px solid ${C.arctic}` }}
      onMouseEnter={(e) => { e.currentTarget.style.background = C.arctic; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = active ? C.arctic : C.white; }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
      {active && <Check size={14} color={C.teal} />}
    </div>
  );

  return (
    <div ref={ref} style={{ position: "relative", width: "100%" }}>
      {name && <input type="hidden" name={name} value={value || ""} />}
      {/* champ invisible pour conserver la validation "required" du formulaire */}
      {required && <input tabIndex={-1} required value={value || ""} onChange={() => {}} style={{ position: "absolute", opacity: 0, height: 1, width: 1, bottom: 0, left: "50%", pointerEvents: "none" }} />}
      <div
        onClick={() => setOpen(!open)}
        style={{ padding: "10px 12px", borderRadius: "10px", border: `1px solid ${open ? C.yellow : C.lightGray}`, background: C.white, fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", boxSizing: "border-box", ...style }}
      >
        {selected ? (
          <div style={{ minWidth: 0 }}>
            <div style={{ color: C.teal, fontWeight: 700 }}>{selected.titre}</div>
            <div style={{ color: C.gray, fontSize: "11px", marginTop: "2px" }}>{sousTitre(selected)}</div>
          </div>
        ) : (
          <span style={{ color: C.gray }}>{placeholder}</span>
        )}
        <ChevronDown size={14} color={C.teal} style={{ flexShrink: 0, transform: open ? "rotate(180deg)" : "none" }} />
      </div>
      {open && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, marginTop: "6px", background: C.white, borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.15)", zIndex: 50, overflowY: "auto", maxHeight: "280px", border: `1px solid ${C.lightGray}` }}>
          {emptyLabel && ligne(!value, <span style={{ color: C.gray, fontSize: "13px", fontWeight: 600 }}>{emptyLabel}</span>, () => choisir(""), "__none")}
          {sejours.map((s) =>
            ligne(
              s.id === value,
              <>
                <div style={{ color: C.teal, fontWeight: 700, fontSize: "13px" }}>{s.titre}</div>
                <div style={{ color: C.gray, fontSize: "11px", marginTop: "2px" }}>{sousTitre(s)}</div>
              </>,
              () => choisir(s.id),
              s.id
            )
          )}
          {sejours.length === 0 && <div style={{ padding: "12px 14px", fontSize: "12px", color: C.gray }}>Aucun séjour</div>}
        </div>
      )}
    </div>
  );
}
