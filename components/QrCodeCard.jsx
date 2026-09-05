"use client";
import { useRef, useEffect, useState } from "react";

const C = {
  teal: "#114C5A",
  saffron: "#FF9932",
  yellow: "#FFC801",
  arctic: "#F1F6F4",
  white: "#ffffff",
  gray: "#8aaa",
  lightGray: "#e2e8f0",
};

// Carte "générateur de QR code" réutilisable (même style pointillés teal + orange que les
// QR codes par séjour). `path` est ajouté à l'origine du site (ex : "/newsletter").
export default function QrCodeCard({ titre, description, path = "", fileName = "qr-code" }) {
  const containerRef = useRef(null);
  const qrRef = useRef(null);
  const [pret, setPret] = useState(false);

  const url = typeof window !== "undefined" ? `${window.location.origin}${path}` : "";

  useEffect(() => {
    let annule = false;
    (async () => {
      try {
        const mod = await import("qr-code-styling");
        if (annule) return;
        const QRCodeStyling = mod.default;
        const qr = new QRCodeStyling({
          width: 180,
          height: 180,
          type: "svg",
          data: url,
          margin: 6,
          qrOptions: { errorCorrectionLevel: "Q" },
          dotsOptions: { type: "dots", color: C.teal },
          backgroundOptions: { color: "#ffffff" },
          cornersSquareOptions: { type: "dot", color: C.teal },
          cornersDotOptions: { type: "dot", color: C.saffron },
        });
        qrRef.current = qr;
        const node = containerRef.current;
        if (node) {
          while (node.firstChild) node.removeChild(node.firstChild);
          qr.append(node);
          setPret(true);
        }
      } catch (e) {
        console.error("Erreur génération QR code", e);
      }
    })();
    return () => {
      annule = true;
      const node = containerRef.current;
      if (node) {
        while (node.firstChild) node.removeChild(node.firstChild);
      }
    };
  }, [url]);

  const telecharger = (extension) => {
    qrRef.current?.download({ name: fileName, extension });
  };

  return (
    <div style={{ background: C.white, borderRadius: "24px", padding: "28px", boxShadow: "0 4px 16px rgba(17,76,90,0.04)", marginBottom: "32px", display: "flex", gap: "28px", flexWrap: "wrap", alignItems: "center" }}>
      <div style={{ position: "relative", width: "180px", height: "180px", flexShrink: 0 }}>
        {!pret && (
          <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: C.gray }}>
            Génération...
          </span>
        )}
        {/* Conteneur piloté par qr-code-styling : React ne doit jamais y rendre d'enfants */}
        <div ref={containerRef} style={{ width: "180px", height: "180px" }} />
      </div>
      <div style={{ flex: 1, minWidth: "220px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 900, color: C.teal, marginBottom: "6px" }}>{titre}</h2>
        {description && (
          <p style={{ color: C.gray, fontSize: "14px", marginBottom: "6px", lineHeight: 1.6 }}>{description}</p>
        )}
        <p style={{ fontSize: "11px", color: C.gray, wordBreak: "break-all", marginBottom: "16px" }}>{url}</p>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => telecharger("png")} disabled={!pret} style={{ background: C.yellow, color: C.teal, border: "none", padding: "12px 20px", borderRadius: "12px", fontWeight: 800, fontSize: "13px", cursor: pret ? "pointer" : "not-allowed", opacity: pret ? 1 : 0.5 }}>
            Télécharger PNG
          </button>
          <button onClick={() => telecharger("svg")} disabled={!pret} style={{ background: C.arctic, color: C.teal, border: "none", padding: "12px 20px", borderRadius: "12px", fontWeight: 800, fontSize: "13px", cursor: pret ? "pointer" : "not-allowed", opacity: pret ? 1 : 0.5 }}>
            SVG
          </button>
        </div>
      </div>
    </div>
  );
}
