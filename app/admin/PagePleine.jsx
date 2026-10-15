"use client";
import { ArrowLeft } from "lucide-react";

const C = { teal: "#114C5A", arctic: "#F1F6F4", white: "#ffffff", lightGray: "#e2e8f0" };

// Page entière de l'admin (remplace les anciennes modales) : barre "Retour" + contenu centré.
// Les pages peuvent s'empiler (ex. fiche participant → changer de séjour) via z.
export default function PagePleine({ onClose, z = 9999, children }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: z, background: C.arctic, overflowY: "auto", fontFamily: "var(--font-montserrat), sans-serif" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 1, background: C.white, borderBottom: `1px solid ${C.lightGray}`, padding: "12px 24px" }}>
        <button
          type="button"
          onClick={onClose}
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: C.arctic, border: "none", borderRadius: "10px", padding: "10px 16px", fontSize: "13px", fontWeight: 800, color: C.teal, cursor: "pointer" }}
        >
          <ArrowLeft size={16} /> Retour
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 20px 120px" }}>
        {children}
      </div>
    </div>
  );
}
