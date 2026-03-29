"use client";
import { useState, useEffect } from "react";
import { 
  ArrowRight, MapPin, Calendar, Users, Star, 
  Heart, Shield, Coffee, Map, Clock, Phone, ChevronRight 
} from "lucide-react";

/* ─── PALETTE ────────────────────────────────────────────────────────────── */
const C = {
  yellow:  "#FFC801",
  saffron: "#FF9932",
  teal:    "#114C5A",
  tealMid: "#1A6B7C",
  lilac:   "#EFDEF9",
  arctic:  "#F1F6F4",
  white:   "#ffffff",
};

/* ─── DONNÉES ────────────────────────────────────────────────────────────── */
const SORTIES = [
  { id: 1, titre: "Visite historique de Meaux", lieu: "Meaux, France", prix: 125, dateLabel: "Sam. 4 Avril 2026", duree: "1 jour", img: "https://images.unsplash.com/photo-1549989476-69a92fa57c36?w=800&q=80", tags: ["Culture", "Déjeuner inclus"] },
  { id: 2, titre: "Journée grand air à la mer", lieu: "Deauville, Normandie", prix: 95, dateLabel: "Dim. 23 Août 2026", duree: "1 jour", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", tags: ["Détente", "Transport PMR"] },
  { id: 3, titre: "Déjeuner-Croisière sur la Seine", lieu: "Paris", prix: 140, dateLabel: "Jeu. 15 Octobre 2026", duree: "1/2 journée", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80", tags: ["Gastronomie", "Convivialité"] },
];

const AVANTAGES = [
  { Icon: Coffee, title: "Rythme adapté", desc: "Des journées pensées pour le confort, sans précipitation, avec des pauses régulières et des temps de repos." },
  { Icon: Shield, title: "Accompagnement", desc: "Une équipe bienveillante, formée aux premiers secours, présente du départ jusqu'au retour à domicile." },
  { Icon: Map, title: "Tout compris", desc: "Transport depuis Sucy-en-Brie, visites guidées, repas au restaurant... Vous ne vous occupez de rien !" },
];

const AVIS = [
  { initiale: "M", nom: "M. et Mme Dubois", date: "Septembre 2025", note: 5, texte: "Une organisation sans faille. L'équipe est aux petits soins et le rythme de la journée à Deauville était parfait pour nous." },
  { initiale: "J", nom: "Jacqueline L.", date: "Avril 2025", note: 5, texte: "Ces sorties me permettent de retrouver le sourire, de voir du pays et de rencontrer d'autres personnes de la région en toute sécurité." },
];

/* ─── MINI-COMPOSANTS ────────────────────────────────────────────────────── */
function Btn({ children, outline }) {
  const [h, setH] = useState(false);
  if (outline) {
    return (
      <button onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{
          display: "flex", alignItems: "center", gap: "8px", background: h ? C.yellow + "15" : "transparent",
          color: C.teal, fontSize: "13px", fontWeight: 700, borderRadius: "999px", padding: "14px 28px",
          border: `2px solid ${C.teal}`, cursor: "pointer", transition: "all .2s"
        }}>
        {children}
      </button>
    );
  }
  return (
    <button onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: "flex", alignItems: "center", gap: "8px", background: h ? C.saffron : C.yellow,
        color: C.teal, fontSize: "13px", fontWeight: 800, borderRadius: "999px", padding: "14px 28px",
        border: "none", cursor: "pointer", boxShadow: "0 6px 20px rgba(255,200,1,0.35)", transition: "all .2s"
      }}>
      {children}
    </button>
  );
}

function SortieCard({ s }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: C.white, borderRadius: "24px", overflow: "hidden", cursor: "pointer",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 56px rgba(17,76,90,0.12)" : "0 4px 16px rgba(17,76,90,0.06)",
        transition: "all .3s ease"
      }}>
      {/* Image */}
      <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
        <img src={s.img} alt={s.titre} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hovered ? "scale(1.05)" : "scale(1)", transition: "transform .5s ease" }} />
        <div style={{ position: "absolute", top: "12px", left: "12px", background: "rgba(255,255,255,0.95)", backdropFilter: "blur(4px)", borderRadius: "999px", padding: "6px 12px", display: "flex", alignItems: "center", gap: "6px" }}>
          <Calendar size={12} style={{ color: C.teal }} />
          <span style={{ fontSize: "11px", fontWeight: 800, color: C.teal }}>{s.dateLabel}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "24px" }}>
        <div style={{ display: "flex", gap: "6px", marginBottom: "12px", flexWrap: "wrap" }}>
          {s.tags.map((t, i) => (
            <span key={i} style={{ fontSize: "10px", fontWeight: 700, color: C.saffron, background: C.saffron + "15", padding: "4px 10px", borderRadius: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>
              {t}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "8px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 900, color: C.teal, lineHeight: 1.2 }}>{s.titre}</h3>
          <span style={{ fontSize: "20px", fontWeight: 900, color: C.teal, whiteSpace: "nowrap" }}>{s.prix}€</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "20px" }}>
          <MapPin size={13} style={{ color: C.saffron, flexShrink: 0 }} />
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#8aaa" }}>{s.lieu}</span>
          <span style={{ color: "#ccc", margin: "0 4px" }}>•</span>
          <Clock size={13} style={{ color: C.saffron, flexShrink: 0 }} />
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#8aaa" }}>{s.duree}</span>
        </div>
        
        <button style={{
          width: "100%", background: hovered ? C.yellow : C.arctic, color: C.teal,
          fontSize: "12px", fontWeight: 800, borderRadius: "12px", padding: "12px", border: "none",
          cursor: "pointer", transition: "all .2s", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"
        }}>
          Découvrir le programme <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────────────────── */
export default function Seniors() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 80);
  }, []);

  return (
    <div style={{ fontFamily: "'Montserrat',sans-serif", background: C.arctic, color: C.teal, overflowX: "hidden" }}>
      
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section style={{ padding: "64px 32px", background: C.white, borderRadius: "0 0 40px 40px", position: "relative" }}>
        <div style={{
          maxWidth: "1320px", margin: "0 auto", display: "flex", alignItems: "center", gap: "64px", flexWrap: "wrap",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all .8s ease"
        }}>
          {/* Texte */}
          <div style={{ flex: "1 1 500px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: C.lilac, borderRadius: "999px", padding: "8px 16px", marginBottom: "24px" }}>
              <Heart size={14} style={{ color: C.teal, fill: C.teal }} />
              <span style={{ fontSize: "11px", fontWeight: 800, color: C.teal, textTransform: "uppercase", letterSpacing: "1px" }}>Programme adapté</span>
            </div>
            <h1 style={{ fontWeight: 900, fontSize: "clamp(2.4rem, 4vw, 4rem)", color: C.teal, lineHeight: 1.1, letterSpacing: "-1px", marginBottom: "24px" }}>
              Des sorties pensées <br/><span style={{ color: C.saffron }}>pour vous.</span>
            </h1>
            <p style={{ fontSize: "16px", color: "#5a7a84", lineHeight: 1.8, marginBottom: "40px", maxWidth: "480px" }}>
              Make Your Moment organise des journées de découverte et de convivialité spécialement adaptées pour nos aînés. Rompez l'isolement et partagez des moments uniques en toute sécurité.
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Btn>Voir les prochaines sorties</Btn>
            </div>
          </div>
          
          {/* Image */}
          <div style={{ flex: "1 1 400px", position: "relative", height: "480px" }}>
            <div style={{ position: "absolute", top: "20px", right: "20px", width: "90%", height: "90%", borderRadius: "32px", overflow: "hidden", boxShadow: "0 24px 64px rgba(17,76,90,0.15)" }}>
              <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80" alt="Seniors heureux" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            {/* Décoration jaune */}
            <div style={{ position: "absolute", bottom: "10%", left: "0", width: "120px", height: "120px", borderRadius: "50%", border: `16px solid ${C.arctic}`, background: C.yellow, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Users size={32} style={{ color: C.teal }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── POURQUOI PARTIR AVEC NOUS ? ───────────────────────────────────── */}
      <section style={{ padding: "96px 32px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <h2 style={{ fontWeight: 900, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: C.teal, letterSpacing: "-1px" }}>Votre tranquillité, notre priorité</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
            {AVANTAGES.map(({ Icon: Ic, title, desc }, i) => (
              <div key={i} style={{ background: C.white, padding: "40px 32px", borderRadius: "24px", boxShadow: "0 4px 24px rgba(17,76,90,0.04)" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: C.yellow + "20", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
                  <Ic size={24} style={{ color: C.teal }} />
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 800, color: C.teal, marginBottom: "12px" }}>{title}</h3>
                <p style={{ fontSize: "14px", color: "#5a7a84", lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAMME DES SORTIES ─────────────────────────────────────────── */}
      <section style={{ padding: "0 32px 96px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px", flexWrap: "wrap", gap: "20px" }}>
            <div>
              <p style={{ fontSize: "11px", fontWeight: 800, color: C.saffron, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "10px" }}>Agenda 2026</p>
              <h2 style={{ fontWeight: 900, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: C.teal, letterSpacing: "-1px" }}>Nos prochaines sorties</h2>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            {SORTIES.map((s) => (
              <SortieCard key={s.id} s={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TÉMOIGNAGES & BANNIÈRE INFO ───────────────────────────────────── */}
      <section style={{ padding: "0 32px 96px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", display: "flex", gap: "40px", flexWrap: "wrap" }}>
          
          {/* Avis */}
          <div style={{ flex: "1 1 500px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: 900, color: C.teal, marginBottom: "10px" }}>Ils ont partagé l'expérience</h3>
            {AVIS.map((a, i) => (
              <div key={i} style={{ background: C.white, padding: "24px", borderRadius: "20px", boxShadow: "0 4px 16px rgba(17,76,90,0.04)" }}>
                <div style={{ display: "flex", gap: "2px", marginBottom: "12px" }}>
                  {[...Array(5)].map((_, j) => <Star key={j} size={13} style={{ fill: j < a.note ? C.yellow : "#eee", color: j < a.note ? C.yellow : "#eee" }} />)}
                </div>
                <p style={{ fontSize: "14px", color: "#5a7a84", lineHeight: 1.6, marginBottom: "16px", fontStyle: "italic" }}>"{a.texte}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: C.teal, color: C.yellow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 900 }}>
                    {a.initiale}
                  </div>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 800, color: C.teal }}>{a.nom}</p>
                    <p style={{ fontSize: "11px", color: "#8aaa" }}>{a.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Inscription */}
          <div style={{ flex: "1 1 400px", background: C.teal, borderRadius: "24px", padding: "48px 40px", color: C.white, display: "flex", flexDirection: "column", justifyContent: "center", boxShadow: "0 24px 64px rgba(17,76,90,0.15)" }}>
            <h3 style={{ fontSize: "28px", fontWeight: 900, marginBottom: "16px", lineHeight: 1.2 }}>Une question ?<br/>Besoin de la brochure ?</h3>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: "32px" }}>
              Notre équipe associative est à votre disposition par téléphone pour répondre à toutes vos interrogations ou prendre une inscription.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", background: "rgba(255,255,255,0.1)", padding: "16px 24px", borderRadius: "16px", marginBottom: "24px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: C.yellow, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Phone size={20} style={{ color: C.teal }} />
              </div>
              <div>
                <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "rgba(255,255,255,0.6)" }}>Appelez-nous</p>
                <p style={{ fontSize: "20px", fontWeight: 900, color: C.yellow }}>+33 6 98 96 50 02</p>
              </div>
            </div>
            <button style={{ background: C.white, color: C.teal, border: "none", padding: "16px", borderRadius: "999px", fontSize: "13px", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              Nous écrire un message <ChevronRight size={16} />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}