"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, ChevronRight, ChevronLeft, MapPin, Calendar, Users, Star,
  Award, CreditCard, Shield, Mountain, Waves, Globe, Landmark,
  Phone, Mail, Instagram, Facebook, Menu, X, Search,
  GraduationCap, SunMedium, Snowflake, Flower2, Anchor, Heart, ChevronDown,
  CheckCircle2, Clock, Leaf, Map, Grid
} from "lucide-react";

/* ─── PALETTE DE COULEURS ────────────────────────────────────────── */
const C = {
  yellow:  "#FFC801",
  saffron: "#FF9932",
  teal:    "#0d323c",
  tealMid: "#1A6B7C",
  red:     "#9c0039",
  lilac:   "#EFDEF9",
  arctic:  "#F1F6F4",
  white:   "#ffffff",
  lightGray: "#e2e8f0"
};

/* ─── DONNÉES STATIQUES (AVIS) ───────────────────────────────────── */
const AVIS = [
  { initiale:"B", nom:"B. Leriche",    date:"Juillet 2024",  note:4, texte:"Première colonie pour notre grand de 7 ans — une équipe très professionnelle avant, pendant et après." },
  { initiale:"L", nom:"L. Dupas",      date:"Février 2024",  note:5, texte:"Déjà la 3e expérience avec Make Your Moment. Notre fils s'y plaît et les moniteurs sont vraiment au top." },
  { initiale:"L", nom:"L. Tressard",   date:"Juillet 2023",  note:5, texte:"Ma fille est rentrée ravie, pleine de souvenirs. Une quantité d'activités énorme — de vrais réveils tôt !" },
  { initiale:"C", nom:"C. Baschmidt",  date:"Février 2024",  note:5, texte:"Merci pour ces belles vacances et le compte rendu quotidien très apprécié par toutes les familles." },
];

/* ─── DICTIONNAIRE DES COORDONNÉES POUR LA CARTE ─────────────────── */
const FRANCE_COORDS = {
  "strasbourg": { top: "35%", left: "88%" },
  "vincennes": { top: "31%", left: "54%" },
  "meaux": { top: "30%", left: "58%" },
  "chapelle": { top: "52%", left: "82%" }, 
  "elancourt": { top: "32%", left: "51%" },
  "deauville": { top: "25%", left: "42%" },
  "vieux-boucau": { top: "78%", left: "28%" },
  "default": { top: "50%", left: "50%" }
};

function getCoordinates(ville) {
  if (!ville) return FRANCE_COORDS.default;
  const normalized = ville.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  const foundKey = Object.keys(FRANCE_COORDS).find(k => normalized.includes(k));
  return foundKey ? FRANCE_COORDS[foundKey] : FRANCE_COORDS.default;
}

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

const matchCategory = (s, cat) => {
  if (cat === "tous") return true;
  const ageStr = (s.tranchesAge || "").toLowerCase();
  if (cat === "seniors" && (ageStr.includes("senior") || ageStr.includes("sénior"))) return true;
  if (cat === "ados" && (ageStr.includes("13") || ageStr.includes("14") || ageStr.includes("15") || ageStr.includes("16") || ageStr.includes("17") || ageStr.includes("ado"))) return true;
  if (cat === "enfants" && (ageStr.includes("6") || ageStr.includes("7") || ageStr.includes("8") || ageStr.includes("9") || ageStr.includes("10") || ageStr.includes("11") || ageStr.includes("12") || ageStr.includes("enfant"))) return true;
  return false;
};

/* ─── COMPOSANTS BOUTONS ─────────────────────────────────────────── */
function Btn({ children, large, onClick, href }) {
  const [h, setH] = useState(false);
  const style = { 
    display: "flex", alignItems: "center", gap: "8px", background: h ? C.saffron : C.yellow, color: C.teal, 
    fontSize: large ? "13px" : "11px", fontWeight: 800, borderRadius: "999px", padding: large ? "14px 28px" : "10px 22px", 
    border: "none", cursor: "pointer", boxShadow: "0 6px 20px rgba(255,200,1,0.35)", transition: "all .2s", textDecoration: "none"
  };

  if (href) return <Link href={href} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={style}>{children}</Link>;
  return <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={style}>{children}</button>;
}

function BtnOutline({ children, large, light, href }) {
  const [h, setH] = useState(false);
  const style = { 
    display: "flex", alignItems: "center", gap: "8px", 
    background: h ? (light ? "rgba(255,255,255,0.15)" : C.yellow + "18") : "transparent", 
    color: light ? C.white : C.teal, fontSize: large ? "13px" : "11px", fontWeight: 700, borderRadius: "999px", 
    padding: large ? "14px 28px" : "10px 22px", border: `1.5px solid ${light ? "rgba(255,255,255,0.3)" : C.teal}`, 
    cursor: "pointer", transition: "all .2s", 
    backdropFilter: light ? "blur(12px)" : "none", // Effet verre dépoli
    textDecoration: "none"
  };

  if (href) return <Link href={href} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={style}>{children}</Link>;
  return <button onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={style}>{children}</button>;
}

/* ─── COMPOSANT : CARTE DE SÉJOUR (CATALOGUE) ────────────────────── */
function SejourCard({ s, idx }) {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { icon: Icon, color: sColor } = getSeasonConfig(s.saison);

  return (
    <Link href={`/sejours-enfants-ados/${s.id}`} style={{ textDecoration: "none", display: "block", height: "100%" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      <div style={{
          background: C.white, borderRadius: "24px", cursor: "pointer",
          boxShadow: hovered ? "0 20px 56px rgba(17,76,90,0.14)" : "0 2px 16px rgba(17,76,90,0.07)", 
          transition: "all .3s ease",
          animation: `fadeUp .5s ease both`, animationDelay: `${(idx || 0) * 0.05}s`,
          display: "flex", flexDirection: "column", height: "100%",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          filter: s.isPast ? "grayscale(100%)" : "none",
          opacity: s.isPast ? 0.75 : 1,
          isolation: "isolate", // Coupe propre des coins (Correction Safari/Chrome)
          clipPath: "inset(0 round 24px)",
        }}
      >
        <div style={{ position: "relative", height: "180px", overflow: "hidden", borderRadius: "24px 24px 0 0" }}>
          <img src={s.imageUrl || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"} 
               alt={s.titre} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hovered ? "scale(1.05)" : "scale(1)", transition: "transform .5s ease" }} />
          
          <div style={{ position: "absolute", top: "12px", left: "12px", background: "rgba(255,255,255,0.9)", backdropFilter: "blur(4px)", borderRadius: "999px", padding: "4px 10px", display: "flex", alignItems: "center", gap: "5px" }}>
            {s.isPast ? (
              <span style={{ fontSize: "10px", fontWeight: 800, color: "#666", textTransform: "uppercase" }}>Terminé</span>
            ) : (
              <>
                <Icon size={12} style={{ color: sColor }} />
                <span style={{ fontSize: "10px", fontWeight: 800, color: C.teal, textTransform: "uppercase" }}>{s.saison}</span>
              </>
            )}
          </div>

          <button onClick={e => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }}
            style={{ position: "absolute", top: "12px", right: "12px", width: "32px", height: "32px", background: "white", borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Heart size={14} style={{ fill: liked ? C.saffron : "none", color: liked ? C.saffron : "#ccc" }} />
          </button>
        </div>

        <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", background: C.white }}>
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
          <div style={{ width: "100%", background: hovered ? C.yellow : C.arctic, color: C.teal, fontSize: "11px", fontWeight: 800, textTransform: "uppercase", borderRadius: "999px", padding: "10px", textAlign: "center", transition: "all 0.2s" }}>
            Voir le séjour
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

/* ─── COMPOSANT POPUP CARTE (Défilement Horizontal & Dégradé) ──────────── */
function MapPopup({ group }) {
  const scrollRef = useRef(null);
  const isMulti = group.stays.length > 1;

  const scrollL = (e) => {
    e.preventDefault(); e.stopPropagation();
    scrollRef.current?.scrollBy({ left: -292, behavior: 'smooth' });
  };
  const scrollR = (e) => {
    e.preventDefault(); e.stopPropagation();
    scrollRef.current?.scrollBy({ left: 292, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      style={{
        width: isMulti ? "100%" : "280px",
        maxWidth: "600px",
        pointerEvents: "auto",
        position: "relative"
      }}
    >
      {isMulti && (
        <>
          <button onClick={scrollL} style={{ position: "absolute", left: "12px", top: "45%", transform: "translateY(-50%)", zIndex: 10, width: "40px", height: "40px", borderRadius: "50%", background: C.white, border: `1px solid ${C.lightGray}`, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <ChevronLeft size={20} color={C.teal} />
          </button>
          <button onClick={scrollR} style={{ position: "absolute", right: "12px", top: "45%", transform: "translateY(-50%)", zIndex: 10, width: "40px", height: "40px", borderRadius: "50%", background: C.white, border: `1px solid ${C.lightGray}`, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <ChevronRight size={20} color={C.teal} />
          </button>
        </>
      )}

      {/* ⚡ Dégradé fondu sur les côtés pour indiquer qu'on peut scroller */}
      <div style={{ 
        WebkitMaskImage: isMulti ? "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)" : "none",
        maskImage: isMulti ? "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)" : "none",
      }}>
        <div
          ref={scrollRef}
          className="hide-scroll"
          style={{
            display: "flex",
            gap: "16px",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
            padding: isMulti ? "0 70px" : "0", 
            paddingBottom: "24px", // Espace pour l'ombre de la carte
            justifyContent: isMulti ? "flex-start" : "center"
          }}
        >
          {group.stays.map((s, i) => (
            <div key={s.id} style={{ width: "280px", flexShrink: 0, scrollSnapAlign: "center" }}>
              <SejourCard s={s} idx={i} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── VUE CARTE (MAP) INTERACTIVE ────────────────────────────────────────── */
function AllSejoursMap({ sejours }) {
  const [activeKey, setActiveKey] = useState(null);
  const timeoutRef = useRef(null);

  // Groupement des séjours par lieu géographique
  const grouped = {};
  sejours.forEach(s => {
    const villeCourte = s.lieu ? s.lieu.split(',')[0].trim() : "France";
    const coords = getCoordinates(villeCourte);
    const key = `${coords.top}-${coords.left}`;
    
    if (!grouped[key]) grouped[key] = { coords, stays: [], isPast: true };
    grouped[key].stays.push(s);
    if (!s.isPast) grouped[key].isPast = false; // S'il y a un séjour à venir, le pin est allumé
  });

  const handleMouseEnter = (key) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveKey(key);
  };

  const handleMouseLeave = () => {
    // ⚡ Timeout crucial : Laisse le temps à la souris d'atteindre le popup
    timeoutRef.current = setTimeout(() => {
      setActiveKey(null);
    }, 300);
  };

  const activeGroup = activeKey ? grouped[activeKey] : null;

  return (
    <div style={{ position: "relative", width: "100%", height: "600px", borderRadius: "32px", border: `1px solid ${C.lightGray}`, background: "#f8fafc", margin: "0 auto", overflow: "hidden" }}>
      
      {/* Couche de la carte de France */}
      <div style={{ position: "absolute", inset: 0 }}>
        <div style={{ position: "relative", width: "100%", maxWidth: "600px", height: "100%", margin: "0 auto" }}>
          <img src="/france.svg" alt="Carte" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.08, objectFit: "contain", pointerEvents: "none" }} />
          
          {/* Rendu des Pins (Points sur la carte) */}
          {Object.entries(grouped).map(([key, group]) => {
            const isActive = activeKey === key;

            return (
              <div key={key} 
                   onMouseEnter={() => handleMouseEnter(key)}
                   onMouseLeave={handleMouseLeave}
                   style={{ position: "absolute", top: group.coords.top, left: group.coords.left, zIndex: isActive ? 100 : 10 }}>
                <div style={{ 
                  transform: "translate(-50%, -50%)", width: "18px", height: "18px", borderRadius: "50%", 
                  background: group.isPast ? "#ccc" : C.yellow, border: `3px solid ${C.white}`, 
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)", cursor: "pointer", transition: "transform 0.2s",
                  ...(isActive && { transform: "translate(-50%, -50%) scale(1.5)" })
                }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* ⚡ WIDGET CENTRAL EN BAS : Affichage du ou des séjours du lieu sélectionné */}
      <div
        onMouseEnter={() => activeKey && handleMouseEnter(activeKey)} // Maintient ouvert si on survole le popup
        onMouseLeave={handleMouseLeave}
        style={{ position: "absolute", bottom: "16px", left: 0, width: "100%", display: "flex", justifyContent: "center", zIndex: 200, pointerEvents: "none" }}
      >
        <AnimatePresence>
          {activeGroup && <MapPopup group={activeGroup} />}
        </AnimatePresence>
      </div>

    </div>
  );
}

/* ─── PAGE PRINCIPALE ────────────────────────────────────────────── */
export default function HomeClient({ sejoursFromDb }) {
  const [cat, setCat] = useState("tous");
  const [visible, setVisible] = useState(false);
  
  const [showUpcomingOnly, setShowUpcomingOnly] = useState(true);
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    setVisible(true);
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const processedSejours = (sejoursFromDb || [])
    .filter(s => s.statut === "Publié")
    .map(s => {
      const dateStart = new Date(s.dateDebut);
      return { ...s, isPast: dateStart < today, parsedDate: dateStart };
    });

  processedSejours.sort((a, b) => {
    if (a.isPast && !b.isPast) return 1; 
    if (!a.isPast && b.isPast) return -1;
    if (!a.isPast && !b.isPast) return a.parsedDate - b.parsedDate; 
    return b.parsedDate - a.parsedDate; 
  });

  const featuredSejours = processedSejours.filter(s => s.enAvant).slice(0, 2);

  const sejoursToDisplay = processedSejours.filter(s => {
    const passCategory = matchCategory(s, cat);
    const passTime = showUpcomingOnly ? !s.isPast : true;
    return passCategory && passTime;
  });

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", background: C.arctic, color: C.teal, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .hero-bg {
          background-image: linear-gradient(rgba(17, 76, 90, 0.65), rgba(17, 76, 90, 0.4)), url('/mym-hero-cover.webp');
          background-size: cover;
          background-position: center;
        }
        .hero-in { opacity:0; transform:translateY(20px); transition:opacity .8s ease,transform .8s ease; }
        .hero-in.show { opacity:1; transform:translateY(0); }
        
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ── HERO SECTION ────────────────────────────────────────────────── */}
      <section className="hero-bg" style={{ position: "relative", minHeight: "85vh", display: "flex", alignItems: "center", padding: "0 32px" }}>
        <div className={`hero-in ${visible ? "show" : ""}`} style={{ maxWidth: "1320px", margin: "0 auto", width: "100%", display: "flex", alignItems: "center", gap: "64px", paddingBottom: "100px", paddingTop: "80px" }}>
          
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
              {/* ⚡ Liens exacts ajoutés avec le flou d'arrière-plan sur "Qui sommes-nous" */}
              <Btn large href="/sejours-enfants-ados">Explorer les séjours <ArrowRight size={14} /></Btn>
              <BtnOutline large light href="/qui-sommes-nous">Qui sommes-nous <ChevronRight size={14} /></BtnOutline>
            </div>
          </div>

          <div style={{ flex: 1, display: "flex", position: "relative", minHeight: "440px", maxWidth: "520px", marginLeft: "auto" }} className="hidden lg:block">
             {featuredSejours[0] && (
               <div style={{ position: "absolute", top: "10px", left: "60px", width: "280px", zIndex: 1, transform: "rotate(-4deg)", transition: "all 0.3s" }}
                    onMouseEnter={e => e.currentTarget.style.zIndex = 10}
                    onMouseLeave={e => e.currentTarget.style.zIndex = 1}>
                  <div style={{ position: "absolute", top: "-12px", left: "-12px", background: C.yellow, borderRadius: "999px", padding: "6px 14px", fontSize: "11px", fontWeight: 900, color: C.teal, zIndex: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                    À LA UNE 🌟
                  </div>
                  <SejourCard s={featuredSejours[0]} idx={0} />
               </div>
             )}

             {featuredSejours[1] && (
               <div style={{ position: "absolute", bottom: "10px", right: "0", width: "280px", zIndex: 2, transform: "rotate(3deg)", transition: "all 0.3s" }}
                    onMouseEnter={e => e.currentTarget.style.zIndex = 10}
                    onMouseLeave={e => e.currentTarget.style.zIndex = 2}>
                  <SejourCard s={featuredSejours[1]} idx={1} />
               </div>
             )}
          </div>
        </div>

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
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "24px" }}>
            <div>
              <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 900, letterSpacing: "-1px" }}>Découvrez nos séjours</h2>
              <p style={{ color: "#8aaa", fontWeight: 600, marginTop: "8px", fontSize: "14px" }}>{sejoursToDisplay.length} résultat(s) trouvé(s).</p>
            </div>
            
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", background: "white", padding: "4px", borderRadius: "100px", boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}>
                <button onClick={() => setShowUpcomingOnly(true)} style={{ padding: "8px 16px", borderRadius: "100px", border: "none", fontSize: "13px", fontWeight: 700, cursor: "pointer", background: showUpcomingOnly ? C.yellow : "transparent", color: C.teal, transition: "all .2s" }}>À venir</button>
                <button onClick={() => setShowUpcomingOnly(false)} style={{ padding: "8px 16px", borderRadius: "100px", border: "none", fontSize: "13px", fontWeight: 700, cursor: "pointer", background: !showUpcomingOnly ? C.yellow : "transparent", color: C.teal, transition: "all .2s" }}>Tous</button>
              </div>

              <div style={{ display: "flex", background: "white", padding: "4px", borderRadius: "100px", boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}>
                <button onClick={() => setViewMode("grid")} style={{ padding: "8px 16px", borderRadius: "100px", border: "none", fontSize: "13px", fontWeight: 700, cursor: "pointer", background: viewMode === "grid" ? C.teal : "transparent", color: viewMode === "grid" ? "white" : C.teal, transition: "all .2s", display: "flex", alignItems: "center", gap: "6px" }}><Grid size={14}/> Grille</button>
                <button onClick={() => setViewMode("map")} style={{ padding: "8px 16px", borderRadius: "100px", border: "none", fontSize: "13px", fontWeight: 700, cursor: "pointer", background: viewMode === "map" ? C.teal : "transparent", color: viewMode === "map" ? "white" : C.teal, transition: "all .2s", display: "flex", alignItems: "center", gap: "6px" }}><Map size={14}/> Carte</button>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "8px", marginBottom: "40px", overflowX: "auto", paddingBottom: "10px" }}>
            {[ { id: "tous", label: "Tous" }, { id: "enfants", label: "Enfants" }, { id: "ados", label: "Ados" }, { id: "seniors", label: "Séniors" } ].map(tab => (
              <button key={tab.id} onClick={() => setCat(tab.id)} style={{
                padding: "8px 18px", borderRadius: "100px", border: `1.5px solid ${cat === tab.id ? C.teal : "#ddd"}`, fontSize: "13px", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap",
                background: cat === tab.id ? C.teal : "white", color: cat === tab.id ? "white" : C.teal, transition: "all .2s"
              }}>
                {tab.label}
              </button>
            ))}
          </div>

          {sejoursToDisplay.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "80px 0", color: "#ccc" }}>
              <Globe size={40} strokeWidth={1.5} style={{ marginBottom: "16px" }} />
              <p style={{ fontSize: "15px", fontWeight: 600, color: "#8aaa" }}>Aucun séjour pour cette sélection pour le moment.</p>
            </div>
          ) : viewMode === "grid" ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
              {sejoursToDisplay.map((s, i) => <SejourCard key={s.id} s={s} idx={i} />)}
            </div>
          ) : (
            <AllSejoursMap sejours={sejoursToDisplay} />
          )}

        </div>
      </section>

      {/* ── Qui sommes-nous ─────────────────────────────────────────────────── */}
      <section style={{ padding: "96px 32px", background: C.white }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", display: "flex", alignItems: "center", gap: "80px", flexWrap: "wrap" }}>
          <div style={{ flexShrink: 0, width: "46%", position: "relative", height: "480px", minWidth: "280px" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "68%", height: "71%", borderRadius: "24px", overflow: "hidden", boxShadow: "0 20px 56px rgba(17,76,90,0.14)" }}>
              <img src="/team-01.webp" alt="équipe" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ position: "absolute", bottom: 0, right: 0, width: "57%", height: "55%", borderRadius: "24px", overflow: "hidden", boxShadow: "0 16px 48px rgba(17,76,90,0.10)", border: `4px solid ${C.white}` }}>
              <img src="/team-02.webp" alt="activité" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>

          <div style={{ flex: 1, minWidth: "280px" }}>
            <p style={{ fontSize: "11px", fontWeight: 800, color: C.saffron, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "14px" }}>Notre association</p>
            <h2 style={{ fontWeight: 900, letterSpacing: "-1px", lineHeight: 1.15, marginBottom: "20px", fontSize: "clamp(1.8rem,3vw,2.4rem)", color: C.red }}>
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
            {/* ⚡ Lien rajouté ici aussi pour la cohérence */}
            <Btn large href="/qui-sommes-nous">En savoir + <ArrowRight size={14} /></Btn>
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
    </div>
  );
}