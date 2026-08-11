"use client";
import { useState, useEffect } from "react";
import { Camera, ChevronRight, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

/* ─── PALETTE ────────────────────────────────────────────────────────────── */
const C = {
  yellow:  "#FFC801",
  saffron: "#FF9932",
  teal:    "#114C5A",
  lilac:   "#EFDEF9",
  arctic:  "#F1F6F4",
  white:   "#ffffff",
};

/* ─── MINI-COMPOSANTS ────────────────────────────────────────────────────── */
function Breadcrumb({ items }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:"8px", marginBottom: "32px"}}>
      {items.map((item,i)=>(
        <span key={i} style={{display:"flex",alignItems:"center",gap:"8px"}}>
          {i>0&&<ChevronRight size={12} style={{color:"#aaa"}}/>}
          {item.href
            ? <Link href={item.href} style={{fontSize:"12px",color:C.teal,textDecoration:"none",fontWeight:600}}>{item.label}</Link>
            : <span style={{fontSize:"12px",color:"#888",fontWeight:500}}>{item.label}</span>
          }
        </span>
      ))}
    </div>
  );
}

function ImageCard({ image, idx }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        borderRadius: "24px", overflow: "hidden", cursor: "pointer",
        boxShadow: "0 4px 16px rgba(17,76,90,0.06)",
        animation: `fadeUp .5s ease both`, animationDelay: `${idx * 0.05}s`,
        position: 'relative',
        aspectRatio: '1 / 1'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={image.src}
        alt={image.alt}
        style={{
          width: "100%", height: "100%", objectFit: "cover",
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transition: "transform .4s ease"
        }}
      />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
        padding: '40px 20px 20px',
      }}>
        <p style={{color: 'white', fontSize: '13px', fontWeight: 600, textShadow: '0 1px 3px rgba(0,0,0,0.5)'}}>{image.alt}</p>
      </div>
    </div>
  );
}

/* ─── PAGE GALERIE ───────────────────────────────────────────────────────── */
export default function GalerieClient({ images, categories, initialCategory = "Toutes" }) {
  const [visible, setVisible] = useState(false);
  const [activeCat, setActiveCat] = useState(initialCategory);

  useEffect(() => {
    setTimeout(() => setVisible(true), 80);
  }, []);

  const filteredImages = activeCat === "Toutes"
    ? images
    : images.filter(img => img.cat === activeCat);

  return (
    <div style={{ fontFamily: "'Montserrat',sans-serif", background: C.arctic, color: C.teal, overflowX: "hidden", minHeight: "100vh" }}>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 32px 48px", textAlign: "center" }}>
        <div style={{
          maxWidth: "800px", margin: "0 auto",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all .8s ease"
        }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: C.lilac, borderRadius: "999px", padding: "8px 16px", marginBottom: "24px" }}>
            <Camera size={14} style={{ color: C.teal }} />
            <span style={{ fontSize: "11px", fontWeight: 800, color: C.teal, textTransform: "uppercase", letterSpacing: "1px" }}>Galerie Photos</span>
          </div>
          <h1 style={{ fontWeight: 900, fontSize: "clamp(2.5rem, 4vw, 3.5rem)", color: C.teal, lineHeight: 1.1, letterSpacing: "-1px", marginBottom: "20px" }}>
            Nos plus beaux <span style={{ color: C.saffron }}>souvenirs</span>.
          </h1>
          <p style={{ fontSize: "16px", color: "#5a7a84", lineHeight: 1.8, margin: "0 auto", maxWidth: "600px" }}>
            Plongez dans l'ambiance de nos séjours à travers les photos de nos dernières aventures.
          </p>
        </div>
      </section>

      {/* ── CONTENU GALERIE ────────────────────────────────────────────────── */}
      <section style={{ padding: "0 32px 96px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          {images.length === 0 ? (
            <div style={{ background: C.white, borderRadius: "24px", padding: "80px 32px", textAlign: "center", color: "#5a7a84" }}>
              <ImageIcon size={40} style={{ opacity: 0.2, marginBottom: "16px", margin: "0 auto" }} />
              <p>Aucune photo pour le moment.</p>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCat(cat)}
                    style={{
                      padding: "10px 24px", borderRadius: "999px", border: "none", cursor: "pointer",
                      background: activeCat === cat ? C.yellow : C.white,
                      color: C.teal,
                      fontSize: "13px", fontWeight: 700,
                      transition: "all .2s ease",
                      boxShadow: "0 4px 12px rgba(17,76,90,0.05)"
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
                {filteredImages.map((img, i) => (
                  <ImageCard key={img.id} image={img} idx={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
