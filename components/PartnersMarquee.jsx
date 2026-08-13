"use client";
import { usePathname } from "next/navigation";

/* ─── BANDEAU PARTENAIRES (défilement infini, juste au-dessus du footer) ───
   Les logos sont lus automatiquement depuis public/partenaires/ côté serveur
   (voir app/layout.jsx) : il suffit d'y déposer des fichiers pour les voir
   apparaître ici, sans toucher au code. */
// Logos à afficher plus grands (identifiés par un mot-clé dans leur nom de fichier)
const GRANDS_LOGOS = ["republique", "atout"];

function isGrandLogo(filename) {
  const normalized = filename.toLowerCase();
  return GRANDS_LOGOS.some((mot) => normalized.includes(mot));
}

export default function PartnersMarquee({ logos = [] }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  if (!logos || logos.length === 0) return null;

  return (
    <div style={{ background: "#F1F6F4", padding: "32px 0", overflow: "hidden" }}>
      <p style={{
        textAlign: "center",
        fontSize: "16px",
        fontWeight: 800,
        textTransform: "uppercase",
        color: "#8aaa",
        margin: "0 0 36px",
      }}>
        Nos partenaires
      </p>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes partners-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .partners-track { animation: partners-marquee 24s linear infinite; display: flex; align-items: center; width: max-content; }
        .partners-track:hover { animation-play-state: paused; }
      `}} />

      <div style={{ display: "flex", width: "100%" }}>
        <div className="partners-track">
          {[...logos, ...logos].map((logo, i) => {
            const grand = isGrandLogo(logo);
            return (
              <div
                key={i}
                style={{
                  flexShrink: 0,
                  padding: "0 40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "80px",
                }}
              >
                <img
                  src={`/partenaires/${logo}`}
                  alt="Logo partenaire"
                  style={{
                    width: grand ? "200px" : "140px",
                    height: grand ? "80px" : "56px",
                    objectFit: "contain",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
