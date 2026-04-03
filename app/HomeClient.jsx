"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ArrowRight, ArrowUpRight, ChevronRight, MapPin, Calendar, Users, Star,
  Award, CreditCard, Shield, Mountain, Waves, Globe, Landmark,
  Phone, Mail, Instagram, Facebook, Menu, X, Search,
  GraduationCap, SunMedium, Snowflake, Flower2, Anchor, Heart, ChevronDown,
  CheckCircle2, Clock, Leaf
} from "lucide-react";

/* ─── PALETTE DE COULEURS ────────────────────────────────────────── */
const C = {
  yellow:  "#FFC801",
  saffron: "#FF9932",
  teal:    "#114C5A",
  tealMid: "#1A6B7C",
  lilac:   "#EFDEF9",
  arctic:  "#F1F6F4",
  white:   "#ffffff",
};

/* ─── DONNÉES STATIQUES (AVIS) ───────────────────────────────────── */
const AVIS = [
  { initiale:"B", nom:"B. Leriche",    date:"Juillet 2024",  note:4, texte:"Première colonie pour notre grand de 7 ans — une équipe très professionnelle avant, pendant et après." },
  { initiale:"L", nom:"L. Dupas",      date:"Février 2024",  note:5, texte:"Déjà la 3e expérience avec Make Your Moment. Notre fils s'y plaît et les moniteurs sont vraiment au top." },
  { initiale:"L", nom:"L. Tressard",   date:"Juillet 2023",  note:5, texte:"Ma fille est rentrée ravie, pleine de souvenirs. Une quantité d'activités énorme — de vrais réveils tôt !" },
  { initiale:"C", nom:"C. Baschmidt",  date:"Février 2024",  note:5, texte:"Merci pour ces belles vacances et le compte rendu quotidien très apprécié par toutes les familles." },
];

/* ─── UTILS ──────────────────────────────────────────────────────── */
const getSeasonConfig = (saison) => {
  switch (saison?.toLowerCase()) {
    case 'automne':   return { icon: Leaf, color: C.saffron };
    case 'hiver':     return { icon: Snowflake, color: "#7dd3fc" };
    case 'printemps': return { icon: Flower2, color: "#10b981" };
    case 'été':       return { icon: SunMedium, color: C.yellow };
    default:          return { icon: Globe, color: C.teal };
  }
};

const formatAge = (age) => {
  if (!age) return "Tous âges";
  const str = age.toLowerCase();
  if (str.includes("ans") || str.includes("sénior") || str.includes("senior")) return age;
  return `${age} ans`;
};

const formatSejourDates = (startStr, endStr) => {
  if (!startStr) return "Dates à définir";
  const start = new Date(startStr);
  if (!endStr) return start.toLocaleDateString("fr-FR");
  
  const end = new Date(endStr);
  if (start.getTime() === end.getTime()) return start.toLocaleDateString("fr-FR");

  const mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  const startDay = start.getDate(), startMonth = mois[start.getMonth()], startYear = start.getFullYear();
  const endDay = end.getDate(), endMonth = mois[end.getMonth()], endYear = end.getFullYear();

  if (startYear !== endYear) return `Du ${startDay} ${startMonth} ${startYear} au ${endDay} ${endMonth} ${endYear}`;
  if (startMonth !== endMonth) return `Du ${startDay} ${startMonth} au ${endDay} ${endMonth}`;
  return `Du ${startDay} au ${endDay} ${startMonth}`;
};

// Fonction de filtrage simple pour faire correspondre les onglets
const matchCategory = (s, cat) => {
  if (cat === "tous") return true;
  const ageStr = (s.tranchesAge || "").toLowerCase();
  if (cat === "seniors" && (ageStr.includes("senior") || ageStr.includes("sénior"))) return true;
  if (cat === "ados" && (ageStr.includes("13") || ageStr.includes("14") || ageStr.includes("15") || ageStr.includes("16") || ageStr.includes("17") || ageStr.includes("ado"))) return true;
  if (cat === "enfants" && (ageStr.includes("6") || ageStr.includes("7") || ageStr.includes("8") || ageStr.includes("9") || ageStr.includes("10") || ageStr.includes("11") || ageStr.includes("12") || ageStr.includes("enfant"))) return true;
  return false;
};

/* ─── COMPOSANTS BOUTONS ─────────────────────────────────────────── */
function Btn({ children, large, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: "flex", alignItems: "center", gap: "8px", background: h ? C.saffron : C.yellow, color: C.teal, fontSize: large ? "13px" : "11px", fontWeight: 800, borderRadius: "999px", padding: large ? "14px 28px" : "10px 22px", border: "none", cursor: "pointer", boxShadow: "0 6px 20px rgba(255,200,1,0.35)", transition: "all .2s" }}>
      {children}
    </button>
  );
}

function BtnOutline({ children, large, light }) {
  const [h, setH] = useState(false);
  return (
    <button onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: "flex", alignItems: "center", gap: "8px", background: h ? (light ? "rgba(255,255,255,0.1)" : C.yellow + "18") : "transparent", color: light ? C.white : C.teal, fontSize: large ? "13px" : "11px", fontWeight: 700, borderRadius: "999px", padding: large ? "14px 28px" : "10px 22px", border: `1.5px solid ${light ? "rgba(255,255,255,0.3)" : C.teal}`, cursor: "pointer", transition: "all .2s" }}>
      {children}
    </button>
  );
}

/* ─── COMPOSANTS CARTES ──────────────────────────────────────────── */
/* ─── COMPOSANT : CARTE DE SÉJOUR (CATALOGUE) ────────────────────── */
function SejourCard({ s, idx }) {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { icon: Icon, color: sColor } = getSeasonConfig(s.saison);

  return (
    // ⚡ C'est ce Link qui fait toute la magie !
    <Link href={`/sejours-enfants-ados/${s.id}`} style={{ textDecoration: "none" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      <div style={{
          background: C.white, borderRadius: "24px", overflow: "hidden", cursor: "pointer",
          boxShadow: hovered ? "0 20px 56px rgba(17,76,90,0.14)" : "0 2px 16px rgba(17,76,90,0.07)", 
          transition: "all .3s ease",
          animation: `fadeUp .5s ease both`, animationDelay: `${idx * 0.05}s`,
          display: "flex", flexDirection: "column",
          transform: hovered ? "translateY(-6px)" : "translateY(0)"
        }}
      >
        <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
          <img src={s.imageUrl || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"} 
               alt={s.titre} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hovered ? "scale(1.05)" : "scale(1)", transition: "transform .5s ease" }} />
          <div style={{ position: "absolute", top: "12px", left: "12px", background: "rgba(255,255,255,0.9)", backdropFilter: "blur(4px)", borderRadius: "999px", padding: "4px 10px", display: "flex", alignItems: "center", gap: "5px" }}>
            <Icon size={12} style={{ color: sColor }} />
            <span style={{ fontSize: "10px", fontWeight: 800, color: C.teal, textTransform: "uppercase" }}>{s.saison}</span>
          </div>
          {/* ⚡ preventDefault empêche d'ouvrir la page quand on clique juste sur le coeur */}
          <button onClick={e => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }}
            style={{ position: "absolute", top: "12px", right: "12px", width: "32px", height: "32px", background: "white", borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Heart size={14} style={{ fill: liked ? C.saffron : "none", color: liked ? C.saffron : "#ccc" }} />
          </button>
        </div>

        <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", marginBottom: "8px" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 800, color: C.teal, lineHeight: 1.3 }}>{s.titre}</h3>
            <span style={{ fontSize: "16px", fontWeight: 900, color: C.saffron }}>{s.prix}€</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
            <MapPin size={12} style={{ color: "#aaa" }} />
            <span style={{ fontSize: "12px", color: "#888", fontWeight: 500 }}>{s.lieu || "Lieu à définir"}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "16px", color: C.teal, fontWeight: 700, fontSize: "11px", flex: 1 }}>
            <Users size={12} /> {formatAge(s.tranchesAge)}
          </div>
          {/* Remplacé le <button> par une <div> pour éviter les bugs HTML (pas de bouton dans un lien) */}
          <div style={{ width: "100%", background: hovered ? C.yellow : C.arctic, color: C.teal, fontSize: "11px", fontWeight: 800, textTransform: "uppercase", borderRadius: "999px", padding: "10px", textAlign: "center", transition: "all 0.2s" }}>
            Voir le séjour
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── COMPOSANT : CARTE "A L'AFFICHE" (HERO) ────────────────────── */
function FeaturedHeroCard({ s, idx }) {
  const { icon: Icon } = getSeasonConfig(s.saison);
  const [hovered, setHovered] = useState(false);

  return (
    // ⚡ On ajoute le Link ici aussi !
    <Link href={`/sejours-enfants-ados/${s.id}`} style={{ textDecoration: "none" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{
        position: "relative", width: "100%", height: "220px", borderRadius: "24px", overflow: "hidden",
        boxShadow: "0 12px 32px rgba(0,0,0,0.2)", cursor: "pointer", transition: "transform .3s",
        transform: hovered ? "scale(1.02) translateX(10px)" : "scale(1) translateX(0)"
      }}>
        <img src={s.imageUrl} alt={s.titre} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(17,76,90,0.9) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", top: "12px", left: "12px", background: C.yellow, borderRadius: "999px", padding: "4px 12px", fontSize: "10px", fontWeight: 800, color: C.teal }}>
          À LA UNE
        </div>
        <div style={{ position: "absolute", bottom: "16px", left: "16px", right: "16px" }}>
          <h4 style={{ color: "white", fontWeight: 900, fontSize: "1.1rem", marginBottom: "4px" }}>{s.titre}</h4>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.7)", fontSize: "11px" }}>
              <Icon size={12} /> {s.saison}
            </div>
            <span style={{ color: C.yellow, fontWeight: 900 }}>{s.prix}€</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ReviewCard({ a, i }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: C.arctic, borderRadius: "20px", padding: "24px", transition: "all .3s", transform: h ? "translateY(-4px)" : "none", boxShadow: h ? "0 12px 36px rgba(17,76,90,0.1)" : "none" }}>
      <div style={{ display: "flex", gap: "2px", marginBottom: "14px" }}>
        {[...Array(5)].map((_, j) => <Star key={j} size={12} style={{ fill: j < a.note ? C.yellow : "#e5e7eb", color: j < a.note ? C.yellow : "#e5e7eb" }} />)}
      </div>
      <p style={{ fontSize: "13px", color: "#5a7a84", lineHeight: 1.7, marginBottom: "20px", fontWeight: 500 }}>"{a.texte}"</p>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: i % 2 === 0 ? C.teal : C.yellow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 900, color: i % 2 === 0 ? C.yellow : C.teal, flexShrink: 0 }}>
          {a.initiale}
        </div>
        <div>
          <p style={{ fontSize: "13px", fontWeight: 800, color: C.teal }}>{a.nom}</p>
          <p style={{ fontSize: "11px", color: "#8aaa", fontWeight: 600 }}>{a.date}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── PAGE PRINCIPALE ────────────────────────────────────────────── */
export default function HomeClient({ sejoursFromDb }) {
  const [cat, setCat] = useState("tous");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  // Filtrage des données de la BDD
  const allSejours = sejoursFromDb?.filter(s => s.statut === "Publié") || [];
  const featuredSejours = allSejours.filter(s => s.enAvant).slice(0, 2);

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", background: C.arctic, color: C.teal, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .hero-bg {
          background-image: linear-gradient(rgba(17, 76, 90, 0.65), rgba(17, 76, 90, 0.4)), url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80');
          background-size: cover;
          background-position: center;
        }
        .hero-in { opacity:0; transform:translateY(20px); transition:opacity .8s ease,transform .8s ease; }
        .hero-in.show { opacity:1; transform:translateY(0); }
      `}</style>

      {/* ── HERO SECTION ────────────────────────────────────────────────── */}
      <section className="hero-bg" style={{ position: "relative", minHeight: "85vh", display: "flex", alignItems: "center", padding: "0 32px" }}>
        <div className={`hero-in ${visible ? "show" : ""}`} style={{ maxWidth: "1320px", margin: "0 auto", width: "100%", display: "flex", alignItems: "center", gap: "64px", paddingBottom: "100px", paddingTop: "80px" }}>
          
          {/* TEXTE HERO */}
          <div style={{ flex: 1, maxWidth: "600px", color: "white" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", borderRadius: "999px", padding: "8px 16px", marginBottom: "28px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: C.yellow }} />
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1px" }}>ASSOCIATION MAKE YOUR MOMENT</span>
            </div>
            <h1 style={{ fontWeight: 900, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-1px", lineHeight: 1.1, marginBottom: "24px" }}>
              Créez des souvenirs <br />
              <span style={{ color: C.yellow }}>extraordinaires.</span>
            </h1>
            <p style={{ fontSize: "1.1rem", lineHeight: 1.6, opacity: 0.9, marginBottom: "40px", maxWidth: "500px", fontWeight: 500 }}>
              Des colonies de vacances, séjours scolaires et sorties séniors encadrés par des passionnés, pour une aventure humaine inoubliable.
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Btn large>Explorer les séjours <ArrowRight size={14} /></Btn>
              <BtnOutline large light>Qui sommes-nous <ChevronRight size={14} /></BtnOutline>
            </div>
          </div>

          {/* SÉJOURS A L'AFFICHE (DROITE) */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "24px", maxWidth: "450px" }} className="hidden lg:flex">
             {featuredSejours.map(s => <FeaturedHeroCard key={s.id} s={s} />)}
          </div>
        </div>

        {/* ── BARRE DE FILTRE PILLULE (A CHEVAL) ─────────────────────────── */}
        <div style={{ position: "absolute", bottom: "0", left: "50%", transform: "translate(-50%, 50%)", width: "calc(100% - 64px)", maxWidth: "1000px", zIndex: 10 }}>
          <div style={{ background: C.white, borderRadius: "100px", padding: "12px 12px 12px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 20px 50px rgba(17,76,90,0.15)", border: "1px solid rgba(0,0,0,0.05)", flexWrap: "wrap", gap: "16px" }}>
            <div style={{ display: "flex", gap: "40px", flex: 1, flexWrap: "wrap" }}>
              <div style={{ cursor: "pointer" }}>
                <p style={{ fontSize: "10px", fontWeight: 800, color: "#8aaa", textTransform: "uppercase", marginBottom: "4px" }}>Destination</p>
                <p style={{ fontSize: "14px", fontWeight: 700, color: C.teal, display: "flex", alignItems: "center", gap: "6px" }}>Toutes les destinations <ChevronDown size={14} color="#ccc"/></p>
              </div>
              <div style={{ width: "1px", height: "30px", background: "#eee" }} className="hidden sm:block" />
              <div style={{ cursor: "pointer" }}>
                <p style={{ fontSize: "10px", fontWeight: 800, color: "#8aaa", textTransform: "uppercase", marginBottom: "4px" }}>Âge</p>
                <p style={{ fontSize: "14px", fontWeight: 700, color: C.teal, display: "flex", alignItems: "center", gap: "6px" }}>Tous les âges <ChevronDown size={14} color="#ccc"/></p>
              </div>
              <div style={{ width: "1px", height: "30px", background: "#eee" }} className="hidden sm:block" />
              <div style={{ cursor: "pointer" }}>
                <p style={{ fontSize: "10px", fontWeight: 800, color: "#8aaa", textTransform: "uppercase", marginBottom: "4px" }}>Saison</p>
                <p style={{ fontSize: "14px", fontWeight: 700, color: C.teal, display: "flex", alignItems: "center", gap: "6px" }}>Toute l'année <ChevronDown size={14} color="#ccc"/></p>
              </div>
            </div>
            <button style={{ width: "60px", height: "60px", borderRadius: "50%", background: C.teal, color: "white", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform .2s", boxShadow: "0 8px 24px rgba(17,76,90,0.3)" }} 
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
              <Search size={22} />
            </button>
          </div>
        </div>
      </section>

      {/* ── SECTION CATALOGUE ────────────────────────────────────────────── */}
      <section style={{ padding: "140px 32px 100px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px", flexWrap: "wrap", gap: "24px" }}>
            <div>
              <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 900, letterSpacing: "-1px" }}>Découvrez nos séjours</h2>
              <p style={{ color: "#8aaa", fontWeight: 600, marginTop: "8px", fontSize: "14px" }}>Plus de {allSejours.length} destinations vous attendent.</p>
            </div>
            <div style={{ display: "flex", gap: "8px", background: "white", padding: "6px", borderRadius: "100px", boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}>
              {[
                { id: "tous", label: "Tous" },
                { id: "enfants", label: "Enfants" },
                { id: "ados", label: "Ados" },
                { id: "seniors", label: "Séniors" }
              ].map(tab => (
                <button key={tab.id} onClick={() => setCat(tab.id)} style={{
                  padding: "10px 20px", borderRadius: "100px", border: "none", fontSize: "13px", fontWeight: 700, cursor: "pointer",
                  background: cat === tab.id ? C.teal : "transparent", color: cat === tab.id ? "white" : C.teal, transition: "all .3s"
                }}>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
            {allSejours
              .filter(s => matchCategory(s, cat))
              .map((s, i) => <SejourCard key={s.id} s={s} idx={i} />
            )}
          </div>

          {allSejours.filter(s => matchCategory(s, cat)).length === 0 && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "80px 0", color: "#ccc" }}>
              <Globe size={40} strokeWidth={1.5} style={{ marginBottom: "16px" }} />
              <p style={{ fontSize: "15px", fontWeight: 600, color: "#8aaa" }}>Aucun séjour pour cette catégorie pour le moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Qui sommes-nous ─────────────────────────────────────────────────── */}
      <section style={{ padding: "96px 32px", background: C.white }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", display: "flex", alignItems: "center", gap: "80px", flexWrap: "wrap" }}>
          <div style={{ flexShrink: 0, width: "46%", position: "relative", height: "480px", minWidth: "280px" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "68%", height: "71%", borderRadius: "24px", overflow: "hidden", boxShadow: "0 20px 56px rgba(17,76,90,0.14)" }}>
              <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&q=80" alt="équipe" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ position: "absolute", bottom: 0, right: 0, width: "57%", height: "55%", borderRadius: "24px", overflow: "hidden", boxShadow: "0 16px 48px rgba(17,76,90,0.10)", border: `4px solid ${C.white}` }}>
              <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=700&q=80" alt="activité" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ position: "absolute", bottom: "32%", left: "58%", background: C.yellow, borderRadius: "18px", padding: "16px 20px", boxShadow: "0 12px 36px rgba(255,200,1,0.4)", zIndex: 10 }}>
              <p style={{ color: C.teal, fontWeight: 900, fontSize: "1.6rem", lineHeight: 1 }}>500+</p>
              <p style={{ color: C.teal, fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px", marginTop: "3px", opacity: 0.8 }}>Familles</p>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: "280px" }}>
            <p style={{ fontSize: "11px", fontWeight: 800, color: C.saffron, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "14px" }}>Notre association</p>
            <h2 style={{ fontWeight: 900, letterSpacing: "-1px", lineHeight: 1.15, marginBottom: "20px", fontSize: "clamp(1.8rem,3vw,2.4rem)", color: C.teal }}>
              Qui sommes-nous ?
            </h2>
            <p style={{ fontSize: "14px", color: "#5a7a84", lineHeight: 1.9, marginBottom: "12px", fontWeight: 500 }}>
              L'idée principale de l'association est de créer des séjours en lien avec les aspirations du public. À un âge où les enfants débordent de curiosité, il est essentiel de nourrir leur appétence.
            </p>
            <p style={{ fontSize: "14px", color: "#8aaa", lineHeight: 1.9, marginBottom: "32px", fontWeight: 500 }}>
              Nous proposons aussi des sorties pour nos aînés, en veillant à leur confort, leur sécurité et leur plaisir dans une ambiance bienveillante.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "40px" }}>
              {[
                { Icon: GraduationCap, title: "Encadrants diplômés", desc: "Enseignants et éducateurs certifiés BAFA, BAFD." },
                { Icon: Shield, title: "Association agréée", desc: "Agrément Jeunesse & Sports, sécurité maximale." },
                { Icon: CreditCard, title: "Paiement 8× sans frais", desc: "Échelonnez le règlement de votre séjour." },
              ].map(({ Icon: Ic, title, desc }, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "16px", background: C.arctic, borderRadius: "16px", padding: "16px" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: C.yellow + "28", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Ic size={18} style={{ color: C.teal }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "14px", fontWeight: 800, color: C.teal, marginBottom: "4px" }}>{title}</p>
                    <p style={{ fontSize: "12px", color: "#8aa", lineHeight: 1.6, fontWeight: 500 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Btn large>En savoir + <ArrowRight size={14} /></Btn>
          </div>
        </div>
      </section>

      {/* ── Comment ça marche ───────────────────────────────────────────────── */}
      <section style={{ padding: "100px 32px", background: C.arctic }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <p style={{ fontSize: "11px", fontWeight: 800, color: C.saffron, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "10px" }}>Simple &amp; rapide</p>
            <h2 style={{ fontWeight: 900, letterSpacing: "-1px", color: C.teal, fontSize: "clamp(2rem,3vw,2.5rem)" }}>Comment ça marche ?</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {[
              { Icon: Globe, num: "01", title: "Choisissez votre séjour", desc: "Parcourez notre catalogue filtrable par âge, saison et destination.", hl: false },
              { Icon: Calendar, num: "02", title: "Inscrivez-vous en ligne", desc: "Remplissez le dossier sécurisé. Paiement en 8× sans frais garanti.", hl: true },
              { Icon: Award, num: "03", title: "Vivez l'aventure", desc: "Votre enfant part avec des pros. Suivi quotidien pour les parents.", hl: false },
            ].map(({ Icon: Ic, num, title, desc, hl }, i) => (
              <div key={i} style={{ borderRadius: "24px", padding: "40px 32px", background: hl ? C.yellow : C.white, boxShadow: hl ? "0 20px 56px rgba(255,200,1,0.3)" : "0 4px 20px rgba(17,76,90,0.06)", position: "relative", overflow: "hidden" }}>
                <div style={{ fontSize: "4rem", fontWeight: 900, lineHeight: 1, color: hl ? "rgba(17,76,90,0.08)" : C.arctic, position: "absolute", top: "24px", right: "24px" }}>{num}</div>
                <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: hl ? "rgba(17,76,90,0.1)" : C.yellow + "28", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px", position: "relative" }}>
                  <Ic size={24} style={{ color: C.teal }} />
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "12px", color: C.teal, position: "relative" }}>{title}</h3>
                <p style={{ fontSize: "14px", lineHeight: 1.7, fontWeight: 500, color: hl ? "rgba(17,76,90,0.7)" : "#8aa", position: "relative" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Avis ────────────────────────────────────────────────────────────── */}
      <section style={{ padding: "100px 32px", background: C.white }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "48px", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <p style={{ fontSize: "11px", fontWeight: 800, color: C.saffron, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "10px" }}>Témoignages</p>
              <h2 style={{ fontWeight: 900, letterSpacing: "-1px", color: C.teal, fontSize: "clamp(2rem,3vw,2.5rem)" }}>Ils nous font confiance</h2>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", background: C.yellow + "22", borderRadius: "100px", padding: "12px 24px" }}>
              <div style={{ display: "flex", gap: "2px" }}>{[...Array(5)].map((_, i) => <Star key={i} size={16} fill={C.yellow} color={C.yellow} />)}</div>
              <span style={{ fontSize: "16px", fontWeight: 900, color: C.teal }}>4.8</span>
              <span style={{ fontSize: "13px", color: "#8aaa", fontWeight: 600 }}>/ 5 · 200+ avis</span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
            {AVIS.map((a, i) => <ReviewCard key={i} a={a} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────────────────────────── */}
      <section style={{ padding: "40px 32px 100px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div style={{ background: C.teal, borderRadius: "32px", padding: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "40px", flexWrap: "wrap", boxShadow: "0 24px 80px rgba(17,76,90,0.25)" }}>
            <div>
              <h2 style={{ fontWeight: 900, color: C.white, letterSpacing: "-1px", lineHeight: 1.2, marginBottom: "20px", fontSize: "clamp(2rem,3vw,2.5rem)" }}>
                Prêt à vivre l'aventure ?
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
                {[
                  { Icon: CreditCard, text: "Paiement 8× sans frais" },
                  { Icon: Shield, text: "Places limitées" },
                  { Icon: Award, text: "100% en ligne" },
                ].map(({ Icon: Ic, text }, i) => (
                  <span key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>
                    <Ic size={16} style={{ color: C.yellow }} />{text}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", flexShrink: 0 }}>
              <button style={{ display: "flex", alignItems: "center", gap: "8px", background: C.yellow, color: C.teal, fontSize: "14px", fontWeight: 800, borderRadius: "999px", padding: "18px 36px", border: "none", cursor: "pointer", boxShadow: "0 8px 24px rgba(255,200,1,0.4)", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = C.saffron; e.currentTarget.style.color = C.white; }}
                onMouseLeave={e => { e.currentTarget.style.background = C.yellow; e.currentTarget.style.color = C.teal; }}>
                Voir les séjours <ArrowRight size={16} />
              </button>
              <button style={{ display: "flex", alignItems: "center", gap: "8px", background: "transparent", color: C.white, fontSize: "14px", fontWeight: 700, borderRadius: "999px", padding: "18px 36px", border: "2px solid rgba(255,255,255,0.25)", cursor: "pointer", transition: "all .2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                Nous contacter <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}