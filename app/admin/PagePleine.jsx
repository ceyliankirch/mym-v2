"use client";
import { useEffect } from "react";
import { ArrowLeft, X } from "lucide-react";

const C = { teal: "#114C5A", arctic: "#F1F6F4", white: "#ffffff", lightGray: "#e2e8f0" };

// Page entière de l'admin (remplace les anciennes modales) : barre "Retour" + contenu centré.
// Les pages peuvent s'empiler (ex. fiche participant → changer de séjour) via z.
export default function PagePleine({ onClose, z = 9999, variant = "page", children }) {
  // Variante "drawer" : panneau latéral à droite (aperçu rapide d'une fiche), Échap pour fermer.
  useEffect(() => {
    if (variant !== "drawer") return;
    const onKey = (e) => { if (e.key === "Escape") onClose?.(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [variant, onClose]);

  if (variant === "drawer") {
    return (
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: z, background: "rgba(17,76,90,0.35)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", display: "flex", justifyContent: "flex-end", fontFamily: "var(--font-montserrat), sans-serif" }}>
        <style>{`@keyframes drawerIn { from { transform: translateX(40px); opacity: 0; } to { transform: none; opacity: 1; } }`}</style>
        <div onClick={(e) => e.stopPropagation()} style={{ width: "min(760px, 100%)", height: "100%", background: C.white, overflowY: "auto", boxShadow: "-24px 0 60px rgba(17,76,90,0.18)", animation: "drawerIn 0.25s ease", position: "relative" }}>
          <div style={{ position: "sticky", top: 0, zIndex: 2, display: "flex", justifyContent: "flex-end", padding: "14px 16px 0", background: "linear-gradient(#fff 70%, rgba(255,255,255,0))" }}>
            <button type="button" onClick={onClose} title="Fermer (Échap)" style={{ background: C.arctic, border: "none", width: "36px", height: "36px", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: C.teal }}>
              <X size={18} />
            </button>
          </div>
          <div style={{ padding: "0 28px 100px", marginTop: "-8px" }}>{children}</div>
        </div>
      </div>
    );
  }

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
