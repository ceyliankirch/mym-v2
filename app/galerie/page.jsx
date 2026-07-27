"use client";
import { useState, useEffect } from "react";
import { Camera, ChevronRight } from "lucide-react";
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

/* ─── DONNÉES MOCK ───────────────────────────────────────────────────────── */
const IMAGES = [
  { id: 1, src: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=800", alt: "Enfants souriants en colonie", cat: "Colonies" },
  { id: 2, src: "https://images.unsplash.com/photo-1527617899952-53c4b4a0c137?w=800", alt: "Groupe d'adolescents en randonnée", cat: "Colonies" },
  { id: 3, src: "https://images.unsplash.com/photo-1549989476-69a92fa57c36?w=800", alt: "Seniors visitant un monument", cat: "Seniors" },
  { id: 4, src: "https://images.unsplash.com/photo-1503919545821-a0a3a8826604?w=800", alt: "Activité manuelle pour enfants", cat: "Colonies" },
  { id: 5, src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800", alt: "Paysage de montagne pendant un séjour", cat: "Paysages" },
  { id: 6, src: "https://images.unsplash.com/photo-1593233393895-353456895c92?w=800", alt: "Seniors déjeunant au restaurant", cat: "Seniors" },
  { id: 7, src: "https://images.unsplash.com/photo-1470246973918-29a93221c452?w=800", alt: "Feu de camp en soirée", cat: "Colonies" },
  { id: 8, src: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800", alt: "Vue sur la mer depuis une falaise", cat: "Paysages" },
  { id: 9, src: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800", alt: "Groupe d'enfants jouant au ballon", cat: "Colonies" },
  { id: 10, src: "https://images.unsplash.com/photo-1615992119412-5b63788a4848?w=800", alt: "Visite culturelle pour seniors", cat: "Seniors" },
  { id: 11, src: "https://images.unsplash.com/photo-1570483311220-1b5aec334a69?w=800", alt: "Adolescents faisant du kayak", cat: "Colonies" },
  { id: 12, src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800", alt: "Forêt dense et ensoleillée", cat: "Paysages" },
];

const CATEGORIES = ["Toutes", "Colonies", "Seniors", "Paysages"];

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
export default function GaleriePage() {
  const [visible, setVisible] = useState(false);
  const [activeCat, setActiveCat] = useState("Toutes");

  useEffect(() => {
    setTimeout(() => setVisible(true), 80);
  }, []);

  const filteredImages = activeCat === "Toutes" 
    ? IMAGES 
    : IMAGES.filter(img => img.cat === activeCat);

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
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
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
        </div>
      </section>
    </div>
  );
}
