"use client";
import { useState, useEffect } from "react";
import {
  ArrowRight, ArrowUpRight, ChevronRight, MapPin, Calendar, Users, Star,
  Award, CreditCard, Shield, Mountain, Waves, Globe, Landmark,
  Phone, Mail, Instagram, Facebook, Menu, X, Search,
  GraduationCap, SunMedium, Snowflake, Flower2, Anchor, Heart,
  CheckCircle2, Clock
} from "lucide-react";

/* ─── PALETTE
   Yellow      : #FFC801  → couleur principale (CTAs, accents, logo)
   Saffron     : #FF9932  → jaune-orangé chaud (hover, prix)
   Teal deep   : #114C5A  → textes, fonds sombres
   Teal mid    : #1A6B7C  → hover teal
   Lilac       : #EFDEF9  → fonds doux, badges
   Arctic      : #F1F6F4  → fond global
   White       : #ffffff
────────────────────────────────────────────────── */
const C = {
  yellow:  "#FFC801",
  saffron: "#FF9932",
  teal:    "#114C5A",
  tealMid: "#1A6B7C",
  lilac:   "#EFDEF9",
  arctic:  "#F1F6F4",
  white:   "#ffffff",
};

const SEJOURS = [
  { id:1, titre:"Séjour au Ski",         lieu:"Châtel",               ageLabel:"6 – 12 ans",  prix:890,  dateLabel:"28 Fév – 6 Mars 2026", duree:"7 jours",  periode:"hiver",    categorie:"enfants", img:"https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80", Icon:Snowflake },
  { id:2, titre:"Séjour au Ski",         lieu:"Châtel",               ageLabel:"13 – 17 ans", prix:915,  dateLabel:"28 Fév – 6 Mars 2026", duree:"7 jours",  periode:"hiver",    categorie:"ados",    img:"https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=800&q=80", Icon:Mountain },
  { id:3, titre:"Été dans les Landes",   lieu:"Vieux-Boucau",         ageLabel:"6 – 11 ans",  prix:885,  dateLabel:"12 – 19 Juil 2026",    duree:"8 jours",  periode:"ete",      categorie:"enfants", img:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", Icon:Waves },
  { id:4, titre:"Été dans les Landes",   lieu:"Vieux-Boucau",         ageLabel:"13 – 17 ans", prix:1395, dateLabel:"5 – 18 Juil 2026",     duree:"14 jours", periode:"ete",      categorie:"ados",    img:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80", Icon:SunMedium },
  { id:5, titre:"Voyage au Sénégal",     lieu:"Sénégal",              ageLabel:"12 – 17 ans", prix:2510, dateLabel:"16 – 29 Juil 2026",    duree:"14 jours", periode:"ete",      categorie:"ados",    img:"https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80", Icon:Globe,    featured:true },
  { id:6, titre:"Séjour en Allemagne",   lieu:"Allemagne",            ageLabel:"12 – 17 ans", prix:585,  dateLabel:"28 Avr – 1er Mai 2026", duree:"4 jours",  periode:"printemps",categorie:"ados",    img:"https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80", Icon:Landmark },
  { id:7, titre:"Visite de Meaux",       lieu:"Meaux, France",        ageLabel:"Séniors",     prix:125,  dateLabel:"Sam. 4 Avril 2026",    duree:"1 jour",   periode:"printemps",categorie:"seniors", img:"https://images.unsplash.com/photo-1549989476-69a92fa57c36?w=800&q=80", Icon:Flower2 },
  { id:8, titre:"Journée à la mer",      lieu:"Deauville",            ageLabel:"Séniors",     prix:50,   dateLabel:"Dim. 23 Août 2026",    duree:"1 jour",   periode:"ete",      categorie:"seniors", img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", Icon:Anchor },
];

const AVIS = [
  { initiale:"B", nom:"B. Leriche",    date:"Juillet 2024",  note:4, texte:"Première colonie pour notre grand de 7 ans — une équipe très professionnelle avant, pendant et après." },
  { initiale:"L", nom:"L. Dupas",      date:"Février 2024",  note:5, texte:"Déjà la 3e expérience avec Make Your Moment. Notre fils s'y plaît et les moniteurs sont vraiment au top." },
  { initiale:"L", nom:"L. Tressard",   date:"Juillet 2023",  note:5, texte:"Ma fille est rentrée ravie, pleine de souvenirs. Une quantité d'activités énorme — de vrais réveils tôt !" },
  { initiale:"C", nom:"C. Baschmidt",  date:"Février 2024",  note:5, texte:"Merci pour ces belles vacances et le compte rendu quotidien très apprécié par toutes les familles." },
];

const CATS    = [{id:"tous",label:"Tous"},{id:"enfants",label:"Enfants"},{id:"ados",label:"Ados"},{id:"seniors",label:"Séniors"}];
const PERIODES= [{id:"tous",label:"Toutes"},{id:"hiver",label:"Hiver"},{id:"printemps",label:"Printemps"},{id:"ete",label:"Été"}];
const NAV     = ["Accueil","Séjours","Qui sommes-nous","Séniors","Contact","FAQ"];

/* ─── STARS ─────────────────────────────────────────────────────────────────── */
const Stars = ({ n }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_,i) => (
      <Star key={i} size={12} style={{ fill: i < n ? C.yellow : "#e5e7eb", color: i < n ? C.yellow : "#e5e7eb" }} />
    ))}
  </div>
);

/* ─── CARD ───────────────────────────────────────────────────────────────────── */
function SejourCard({ s, idx }) {
  const { Icon } = s;
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.white,
        borderRadius: "24px",
        overflow: "hidden",
        cursor: "pointer",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 20px 56px rgba(17,76,90,0.14)"
          : "0 2px 16px rgba(17,76,90,0.07)",
        transition: "all .3s ease",
        animation: `fadeUp .5s ease both`,
        animationDelay: `${idx * 0.07}s`,
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
        <img
          src={s.img} alt={s.titre}
          style={{ width: "100%", height: "100%", objectFit: "cover", transform: hovered ? "scale(1.05)" : "scale(1)", transition: "transform .5s ease" }}
        />
        {/* Date pill */}
        <div style={{ position: "absolute", top: "12px", left: "12px", background: "rgba(255,255,255,0.93)", backdropFilter: "blur(6px)", borderRadius: "999px", padding: "4px 10px", display: "flex", alignItems: "center", gap: "5px" }}>
          <Calendar size={10} style={{ color: C.teal }} />
          <span style={{ fontSize: "10px", fontWeight: 700, color: C.teal }}>{s.dateLabel}</span>
        </div>
        {/* Heart */}
        <button
          onClick={e => { e.stopPropagation(); setLiked(!liked); }}
          style={{ position: "absolute", top: "12px", right: "12px", width: "32px", height: "32px", background: "rgba(255,255,255,0.93)", borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Heart size={13} style={{ fill: liked ? C.saffron : "none", color: liked ? C.saffron : "#aaa" }} />
        </button>
        {/* Duration */}
        <div style={{ position: "absolute", bottom: "12px", right: "12px", background: C.yellow, borderRadius: "999px", padding: "3px 10px", display: "flex", alignItems: "center", gap: "4px" }}>
          <Clock size={9} style={{ color: C.teal }} />
          <span style={{ fontSize: "10px", fontWeight: 700, color: C.teal }}>{s.duree}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "18px 20px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px", marginBottom: "4px" }}>
          <h3 style={{ fontSize: "13px", fontWeight: 800, color: C.teal, lineHeight: 1.3 }}>{s.titre}</h3>
          <span style={{ fontSize: "15px", fontWeight: 900, color: C.saffron, whiteSpace: "nowrap" }}>{s.prix}€</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "3px" }}>
          <MapPin size={11} style={{ color: C.saffron, flexShrink: 0 }} />
          <span style={{ fontSize: "11px", fontWeight: 600, color: C.saffron }}>{s.lieu}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "14px" }}>
          <Users size={11} style={{ color: "#ccc", flexShrink: 0 }} />
          <span style={{ fontSize: "11px", color: "#aaa", fontWeight: 500 }}>{s.ageLabel}</span>
        </div>
        <button
          style={{
            width: "100%", background: hovered ? C.saffron : C.yellow,
            color: C.teal,
            fontSize: "11px", fontWeight: 800, letterSpacing: ".8px", textTransform: "uppercase",
            borderRadius: "999px", padding: "10px", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
            transition: "all .2s",
          }}
        >
          Voir le séjour <ArrowRight size={11} />
        </button>
      </div>
    </div>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────────────────────── */
export default function Home() {
  const [cat, setCat]           = useState("tous");
  const [periode, setPeriode]   = useState("tous");
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible]   = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 80);
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const filtered = SEJOURS.filter(s =>
    (cat === "tous" || s.categorie === cat) &&
    (periode === "tous" || s.periode === periode)
  );

  const S = { padding: "0 32px" };

  return (
    <div style={{ fontFamily: "'Montserrat',sans-serif", background: C.arctic, color: C.teal, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');
        * { font-family:'Montserrat',sans-serif; box-sizing:border-box; margin:0; padding:0; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .ticker { animation:ticker 28s linear infinite; }
        .hero-in { opacity:0; transform:translateY(20px); transition:opacity .8s ease,transform .8s ease; }
        .hero-in.show { opacity:1; transform:translateY(0); }
        input::placeholder { color: #8aaa; }
        input:focus { outline: none; }
      `}</style>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <div
          className={`hero-in ${visible ? "show" : ""}`}
          style={{ maxWidth: "1320px", margin: "0 auto", padding: "48px 32px 40px", display: "flex", alignItems: "center", gap: "48px", minHeight: "88vh" }}
        >
          {/* LEFT */}
          <div style={{ flex: 1, maxWidth: "520px" }}>
            {/* Badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: C.lilac, borderRadius: "999px", padding: "8px 16px", marginBottom: "28px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: C.yellow, flexShrink: 0 }} />
              <span style={{ fontSize: "11px", fontWeight: 700, color: C.teal }}>Association Make Your Moment · Sucy-en-Brie</span>
            </div>

            <h1 style={{ fontWeight: 900, lineHeight: 1.06, letterSpacing: "-2px", marginBottom: "20px", fontSize: "clamp(2.8rem,4.8vw,4.4rem)", color: C.teal }}>
              Des séjours<br />
              <span style={{ color: C.yellow }}>inoubliables</span><br />
              pour vos enfants.
            </h1>

            <p style={{ fontSize: "14px", color: "#5a7a84", lineHeight: 1.85, marginBottom: "32px", maxWidth: "420px" }}>
              Colonies, séjours scolaires et sorties séniors — encadrés par des enseignants diplômés, en France et à l'international.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "48px" }}>
              <Btn large>Découvrir les séjours <ArrowRight size={14} /></Btn>
              <BtnOutline large>Qui sommes-nous <ChevronRight size={14} /></BtnOutline>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {[
                { n: "500+", label: "Familles", Icon: Users },
                { n: "4.8★", label: "Google",   Icon: Star },
                { n: "8×",   label: "Sans frais",Icon: CreditCard },
              ].map(({ n, label, Icon: Ic }, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", background: C.white, borderRadius: "16px", padding: "10px 18px", boxShadow: "0 2px 12px rgba(17,76,90,0.07)" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: C.yellow + "22", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Ic size={14} style={{ color: C.teal }} />
                  </div>
                  <div>
                    <p style={{ fontSize: "15px", fontWeight: 900, color: C.teal, lineHeight: 1 }}>{n}</p>
                    <p style={{ fontSize: "10px", color: "#8aaa", fontWeight: 600, marginTop: "2px" }}>{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ flex: 1, position: "relative", height: "540px" }} className="hidden lg:block">
            {/* Main photo */}
            <div style={{ position: "absolute", top: 0, left: "4%", width: "66%", height: "73%", borderRadius: "24px", overflow: "hidden", boxShadow: "0 24px 64px rgba(17,76,90,0.18)" }}>
              <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80" alt="plage" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              {/* Info card overlay */}
              <div style={{ position: "absolute", bottom: "16px", left: "16px", right: "16px", background: "rgba(255,255,255,0.97)", borderRadius: "16px", padding: "14px 18px", boxShadow: "0 8px 24px rgba(17,76,90,0.12)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontSize: "10px", fontWeight: 700, color: C.saffron, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "2px" }}>Prochain séjour</p>
                    <p style={{ fontSize: "13px", fontWeight: 800, color: C.teal }}>Été dans les Landes</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "3px" }}>
                      <Calendar size={10} style={{ color: "#aaa" }} />
                      <span style={{ fontSize: "11px", color: "#888" }}>12 – 19 Juillet 2026</span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: "22px", fontWeight: 900, color: C.teal, lineHeight: 1 }}>885€</p>
                    <button style={{ marginTop: "6px", background: C.yellow, color: C.teal, borderRadius: "999px", padding: "5px 14px", fontSize: "10px", fontWeight: 700, border: "none", cursor: "pointer" }}>
                      Réserver
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary photo */}
            <div style={{ position: "absolute", bottom: 0, right: 0, width: "54%", height: "52%", borderRadius: "24px", overflow: "hidden", boxShadow: "0 16px 48px rgba(17,76,90,0.14)", border: `4px solid ${C.arctic}` }}>
              <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&q=80" alt="groupe" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>

            {/* Yellow circle accent */}
            <div style={{ position: "absolute", top: "44%", right: "43%", width: "58px", height: "58px", borderRadius: "50%", background: C.yellow, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(255,200,1,0.45)", zIndex: 10 }}>
              <ArrowUpRight size={22} style={{ color: C.teal }} />
            </div>

            {/* Teal badge */}
            <div style={{ position: "absolute", top: "16px", right: "16px", background: C.teal, borderRadius: "16px", padding: "12px 16px", boxShadow: "0 8px 24px rgba(17,76,90,0.28)", zIndex: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                <Shield size={11} style={{ color: C.yellow }} />
                <span style={{ fontSize: "9px", fontWeight: 700, color: C.yellow, textTransform: "uppercase", letterSpacing: "1.5px" }}>Agréé</span>
              </div>
              <p style={{ fontSize: "11px", fontWeight: 700, color: C.white }}>Jeunesse &amp; Sports</p>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 32px 64px" }}>
          <div style={{ background: C.white, borderRadius: "24px", padding: "10px", display: "flex", alignItems: "center", gap: "4px", flexWrap: "wrap", boxShadow: "0 8px 40px rgba(17,76,90,0.09)" }}>
            {[
              { Icon: MapPin,   label: "Destination", val: "France, Sénégal…" },
              { Icon: Calendar, label: "Période",      val: "Choisir les dates" },
              { Icon: Users,    label: "Âge",          val: "Enfants / Ados / Séniors" },
            ].map(({ Icon: Ic, label, val }, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: "160px", padding: "10px 16px", borderRadius: "16px", cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.background = C.arctic}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: C.yellow + "20", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Ic size={15} style={{ color: C.teal }} />
                </div>
                <div>
                  <p style={{ fontSize: "10px", fontWeight: 700, color: "#aab", textTransform: "uppercase", letterSpacing: "1px" }}>{label}</p>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: C.teal, marginTop: "2px" }}>{val}</p>
                </div>
              </div>
            ))}
            <button style={{ display: "flex", alignItems: "center", gap: "8px", background: C.yellow, color: C.teal, fontSize: "12px", fontWeight: 800, borderRadius: "16px", padding: "14px 24px", border: "none", cursor: "pointer", boxShadow: "0 6px 18px rgba(255,200,1,0.35)", transition: "background .2s", flexShrink: 0 }}
              onMouseEnter={e => e.currentTarget.style.background = C.saffron}
              onMouseLeave={e => e.currentTarget.style.background = C.yellow}>
              <Search size={15} /> Rechercher
            </button>
          </div>
        </div>
      </section>

      {/* ── Séjours phares ──────────────────────────────────────────────────── */}
      <section style={{ padding: "0 32px 80px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <SectionHeader title="Nos séjours phares 2026" sub="À la une" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {SEJOURS.filter(s => s.featured || s.id === 3).slice(0, 2).map(s => {
              const { Icon: Ic } = s;
              return (
                <FeaturedCard key={s.id} s={s} Ic={Ic} />
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Catalogue ───────────────────────────────────────────────────────── */}
      <section style={{ padding: "0 32px 96px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
            <h2 style={{ fontWeight: 900, letterSpacing: "-0.5px", fontSize: "clamp(1.5rem,2.5vw,2rem)", color: C.teal }}>
              Tous nos séjours
            </h2>
            {/* Filters */}
            <div style={{ display: "flex", alignItems: "center", gap: "4px", background: C.white, borderRadius: "16px", padding: "6px", boxShadow: "0 2px 12px rgba(17,76,90,0.07)", flexWrap: "wrap" }}>
              {CATS.map(c => (
                <FilterBtn key={c.id} active={cat === c.id} onClick={() => setCat(c.id)} yellow>
                  {c.label}
                </FilterBtn>
              ))}
              <div style={{ width: "1px", height: "20px", background: "#eee", margin: "0 4px" }} />
              {PERIODES.map(p => (
                <FilterBtn key={p.id} active={periode === p.id} onClick={() => setPeriode(p.id)}>
                  {p.label}
                </FilterBtn>
              ))}
              {(cat !== "tous" || periode !== "tous") && (
                <button onClick={() => { setCat("tous"); setPeriode("tous"); }}
                  style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", fontWeight: 700, color: C.saffron, background: "none", border: "none", cursor: "pointer", marginLeft: "4px" }}>
                  <X size={11} /> Reset
                </button>
              )}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "18px" }}>
            {filtered.map((s, i) => <SejourCard key={s.id} s={s} idx={i} />)}
          </div>

          {filtered.length === 0 && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "80px 0", color: "#ccc" }}>
              <Globe size={40} strokeWidth={1} style={{ marginBottom: "12px" }} />
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#8aaa" }}>Aucun séjour pour cette sélection.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Qui sommes-nous ─────────────────────────────────────────────────── */}
      <section style={{ padding: "96px 32px", background: C.white }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", display: "flex", alignItems: "center", gap: "80px", flexWrap: "wrap" }}>
          {/* Photos */}
          <div style={{ flexShrink: 0, width: "46%", position: "relative", height: "480px", minWidth: "280px" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "68%", height: "71%", borderRadius: "24px", overflow: "hidden", boxShadow: "0 20px 56px rgba(17,76,90,0.14)" }}>
              <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&q=80" alt="équipe" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ position: "absolute", bottom: 0, right: 0, width: "57%", height: "55%", borderRadius: "24px", overflow: "hidden", boxShadow: "0 16px 48px rgba(17,76,90,0.10)", border: `4px solid ${C.arctic}` }}>
              <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=700&q=80" alt="activité" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            {/* Stat card */}
            <div style={{ position: "absolute", bottom: "32%", left: "58%", background: C.yellow, borderRadius: "18px", padding: "16px 20px", boxShadow: "0 12px 36px rgba(255,200,1,0.4)", zIndex: 10 }}>
              <p style={{ color: C.teal, fontWeight: 900, fontSize: "1.6rem", lineHeight: 1 }}>500+</p>
              <p style={{ color: C.teal, fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", marginTop: "3px", opacity: 0.7 }}>Familles</p>
            </div>
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: "280px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, color: C.saffron, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "14px" }}>Notre association</p>
            <h2 style={{ fontWeight: 900, letterSpacing: "-1px", lineHeight: 1.15, marginBottom: "20px", fontSize: "clamp(1.8rem,3vw,2.4rem)", color: C.teal }}>
              Qui sommes-nous ?
            </h2>
            <p style={{ fontSize: "14px", color: "#5a7a84", lineHeight: 1.9, marginBottom: "12px" }}>
              L'idée principale de l'association est de créer des séjours en lien avec les aspirations du public. À un âge où les enfants débordent de curiosité, il est essentiel de nourrir leur appétence.
            </p>
            <p style={{ fontSize: "14px", color: "#8aaa", lineHeight: 1.9, marginBottom: "32px" }}>
              Nous proposons aussi des sorties pour nos aînés, en veillant à leur confort, leur sécurité et leur plaisir dans une ambiance bienveillante.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "36px" }}>
              {[
                { Icon: GraduationCap, title: "Encadrants diplômés",    desc: "Enseignants et éducateurs certifiés BAFA, BAFD et diplômes d'État." },
                { Icon: Shield,        title: "Association agréée",      desc: "Agrément Jeunesse & Sports, assurance et sécurité maximale." },
                { Icon: CreditCard,    title: "Paiement 8× sans frais",  desc: "Échelonnez le règlement de votre séjour sans surcoût." },
              ].map(({ Icon: Ic, title, desc }, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px", background: C.arctic, borderRadius: "16px", padding: "14px 16px" }}>
                  <div style={{ width: "38px", height: "38px", borderRadius: "12px", background: C.yellow + "28", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Ic size={16} style={{ color: C.teal }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "13px", fontWeight: 700, color: C.teal, marginBottom: "2px" }}>{title}</p>
                    <p style={{ fontSize: "12px", color: "#8aa", lineHeight: 1.6 }}>{desc}</p>
                  </div>
                  <CheckCircle2 size={16} style={{ color: C.yellow, flexShrink: 0, marginTop: "2px" }} />
                </div>
              ))}
            </div>
            <Btn>En savoir + <ArrowRight size={14} /></Btn>
          </div>
        </div>
      </section>

      {/* ── Comment ça marche ───────────────────────────────────────────────── */}
      <section style={{ padding: "96px 32px", background: C.arctic }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, color: C.saffron, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "10px" }}>Simple &amp; rapide</p>
            <h2 style={{ fontWeight: 900, letterSpacing: "-1px", color: C.teal, fontSize: "clamp(1.8rem,3vw,2.4rem)" }}>Comment ça marche ?</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "18px" }}>
            {[
              { Icon: Globe,    num: "01", title: "Choisissez votre séjour", desc: "Parcourez notre catalogue filtrable par âge, saison et destination.", hl: false },
              { Icon: Calendar, num: "02", title: "Inscrivez-vous en ligne",  desc: "Remplissez le dossier sécurisé. Paiement en 8× sans frais garanti.", hl: true },
              { Icon: Award,    num: "03", title: "Vivez l'aventure",         desc: "Votre enfant part avec des pros. Suivi quotidien pour les parents.", hl: false },
            ].map(({ Icon: Ic, num, title, desc, hl }, i) => (
              <div key={i} style={{
                borderRadius: "24px", padding: "36px 28px",
                background: hl ? C.yellow : C.white,
                boxShadow: hl ? "0 20px 56px rgba(255,200,1,0.3)" : "0 4px 20px rgba(17,76,90,0.06)",
              }}>
                <div style={{ fontSize: "3rem", fontWeight: 900, lineHeight: 1, marginBottom: "18px", color: hl ? "rgba(17,76,90,0.15)" : C.lilac }}>{num}</div>
                <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: hl ? "rgba(17,76,90,0.12)" : C.yellow + "28", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "18px" }}>
                  <Ic size={20} style={{ color: C.teal }} />
                </div>
                <h3 style={{ fontSize: "15px", fontWeight: 800, marginBottom: "8px", color: C.teal }}>{title}</h3>
                <p style={{ fontSize: "13px", lineHeight: 1.7, color: hl ? "rgba(17,76,90,0.6)" : "#8aa" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Avis ────────────────────────────────────────────────────────────── */}
      <section style={{ padding: "96px 32px", background: C.white }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <p style={{ fontSize: "11px", fontWeight: 700, color: C.saffron, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "10px" }}>Témoignages</p>
              <h2 style={{ fontWeight: 900, letterSpacing: "-1px", color: C.teal, fontSize: "clamp(1.8rem,3vw,2.4rem)" }}>Ils nous font confiance</h2>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", background: C.yellow + "22", borderRadius: "14px", padding: "10px 18px" }}>
              <div style={{ display: "flex" }}>{[...Array(5)].map((_, i) => <Star key={i} size={14} style={{ fill: C.yellow, color: C.yellow }} />)}</div>
              <span style={{ fontSize: "14px", fontWeight: 900, color: C.teal }}>4.8</span>
              <span style={{ fontSize: "12px", color: "#8aaa" }}>/ 5 · 200+ avis</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px" }}>
            {AVIS.map((a, i) => (
              <ReviewCard key={i} a={a} i={i} />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "36px" }}>
            <BtnOutline>Voir plus d'avis <ArrowRight size={13} /></BtnOutline>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────────────────────────── */}
      <section style={{ padding: "24px 32px 80px" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div style={{ background: C.teal, borderRadius: "28px", padding: "56px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "32px", flexWrap: "wrap", boxShadow: "0 24px 80px rgba(17,76,90,0.25)" }}>
            <div>
              <h2 style={{ fontWeight: 900, color: C.white, letterSpacing: "-1px", lineHeight: 1.2, marginBottom: "14px", fontSize: "clamp(1.6rem,3vw,2.2rem)" }}>
                Prêt à vivre l'aventure ?
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {[
                  { Icon: CreditCard, text: "Paiement 8× sans frais" },
                  { Icon: Shield,     text: "Places limitées" },
                  { Icon: Award,      text: "100% en ligne" },
                ].map(({ Icon: Ic, text }, i) => (
                  <span key={i} style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "13px", color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>
                    <Ic size={13} style={{ color: C.yellow }} />{text}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", flexShrink: 0 }}>
              <button style={{ display: "flex", alignItems: "center", gap: "8px", background: C.yellow, color: C.teal, fontSize: "13px", fontWeight: 800, borderRadius: "999px", padding: "16px 32px", border: "none", cursor: "pointer", boxShadow: "0 8px 24px rgba(255,200,1,0.4)", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = C.saffron; e.currentTarget.style.color = C.white; }}
                onMouseLeave={e => { e.currentTarget.style.background = C.yellow; e.currentTarget.style.color = C.teal; }}>
                Voir les séjours <ArrowRight size={14} />
              </button>
              <button style={{ display: "flex", alignItems: "center", gap: "8px", background: "transparent", color: C.white, fontSize: "13px", fontWeight: 700, borderRadius: "999px", padding: "16px 32px", border: "2px solid rgba(255,255,255,0.25)", cursor: "pointer", transition: "all .2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                Nous contacter <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>      
    </div>
  );
}

/* ─── SHARED COMPONENTS ─────────────────────────────────────────────────────── */
const C2 = { yellow:"#FFC801", saffron:"#FF9932", teal:"#114C5A", tealMid:"#1A6B7C", lilac:"#EFDEF9", arctic:"#F1F6F4", white:"#ffffff" };

function Btn({ children, large, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: "flex", alignItems: "center", gap: "8px",
        background: h ? C2.saffron : C2.yellow,
        color: C2.teal,
        fontSize: large ? "13px" : "11px",
        fontWeight: 800,
        borderRadius: "999px",
        padding: large ? "14px 28px" : "10px 22px",
        border: "none", cursor: "pointer",
        boxShadow: "0 6px 20px rgba(255,200,1,0.35)",
        transition: "all .2s",
        fontFamily: "Montserrat,sans-serif",
      }}>
      {children}
    </button>
  );
}

function BtnOutline({ children, large }) {
  const [h, setH] = useState(false);
  return (
    <button onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: "flex", alignItems: "center", gap: "8px",
        background: h ? C2.yellow + "18" : "transparent",
        color: C2.teal,
        fontSize: large ? "13px" : "11px", fontWeight: 700,
        borderRadius: "999px",
        padding: large ? "14px 28px" : "10px 22px",
        border: `1.5px solid ${C2.teal}`,
        cursor: "pointer", transition: "all .2s",
        fontFamily: "Montserrat,sans-serif",
      }}>
      {children}
    </button>
  );
}

function NavLink({ label, active }) {
  const [h, setH] = useState(false);
  const C3 = { yellow:"#FFC801", teal:"#114C5A", lilac:"#EFDEF9" };
  return (
    <a href="#"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        fontSize: "11px", fontWeight: 700, padding: "8px 16px",
        borderRadius: "999px", textDecoration: "none", transition: "all .2s",
        background: active ? C3.yellow : h ? C3.lilac : "transparent",
        color: C3.teal,
        fontWeight: active ? 800 : 700,
      }}>
      {label}
    </a>
  );
}

function FilterBtn({ children, active, onClick, yellow }) {
  const C3 = { yellow:"#FFC801", teal:"#114C5A" };
  return (
    <button onClick={onClick}
      style={{
        fontSize: "11px", fontWeight: 700, borderRadius: "10px",
        padding: "7px 14px", border: "none", cursor: "pointer", transition: "all .2s",
        background: active ? (yellow ? C3.yellow : C3.teal) : "transparent",
        color: active ? (yellow ? C3.teal : "#fff") : C3.teal,
        fontFamily: "Montserrat,sans-serif",
      }}>
      {children}
    </button>
  );
}

function SectionHeader({ title, sub }) {
  const C3 = { saffron:"#FF9932", teal:"#114C5A", white:"#fff" };
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "32px" }}>
      <div>
        <p style={{ fontSize: "11px", fontWeight: 700, color: C3.saffron, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "8px" }}>{sub}</p>
        <h2 style={{ fontWeight: 900, letterSpacing: "-1px", lineHeight: 1.2, fontSize: "clamp(1.8rem,3vw,2.5rem)", color: C3.teal }}>{title}</h2>
      </div>
      <a href="#" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 700, color: C3.teal, textDecoration: "none", background: C3.white, padding: "10px 20px", borderRadius: "999px", boxShadow: "0 2px 12px rgba(17,76,90,0.07)" }}>
        Voir tout <ArrowRight size={13} />
      </a>
    </div>
  );
}

function FeaturedCard({ s, Ic }) {
  const C3 = { yellow:"#FFC801", teal:"#114C5A", saffron:"#FF9932", white:"#fff" };
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ position: "relative", borderRadius: "24px", overflow: "hidden", cursor: "pointer", height: "420px", boxShadow: h ? "0 24px 64px rgba(17,76,90,0.22)" : "0 12px 40px rgba(17,76,90,0.14)", transition: "box-shadow .3s" }}>
      <img src={s.img} alt={s.titre} style={{ width: "100%", height: "100%", objectFit: "cover", transform: h ? "scale(1.04)" : "scale(1)", transition: "transform .7s ease" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(17,76,90,0.88) 0%, rgba(17,76,90,0.08) 55%, transparent 100%)" }} />
      {/* Top */}
      <div style={{ position: "absolute", top: "18px", left: "18px", display: "flex", gap: "8px" }}>
        <div style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(6px)", borderRadius: "999px", padding: "5px 12px", display: "flex", alignItems: "center", gap: "5px" }}>
          <Ic size={11} style={{ color: C3.white }} />
          <span style={{ fontSize: "10px", fontWeight: 700, color: C3.white }}>{s.ageLabel}</span>
        </div>
        <div style={{ background: C3.yellow, borderRadius: "999px", padding: "5px 12px" }}>
          <span style={{ fontSize: "10px", fontWeight: 700, color: C3.teal }}>{s.duree}</span>
        </div>
      </div>
      {/* Bottom */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "4px" }}>
          <MapPin size={11} style={{ color: C3.yellow }} />
          <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "11px", fontWeight: 600 }}>{s.lieu}</span>
        </div>
        <h3 style={{ color: C3.white, fontWeight: 900, fontSize: "1.5rem", letterSpacing: "-0.5px", marginBottom: "4px" }}>{s.titre}</h3>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "5px" }}>
          <Calendar size={10} />{s.dateLabel}
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "10px", fontWeight: 600 }}>À partir de</span>
            <p style={{ color: C3.yellow, fontWeight: 900, fontSize: "1.8rem", lineHeight: 1 }}>{s.prix}€</p>
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: "8px", background: h ? C3.yellow : C3.white, color: C3.teal, fontSize: "12px", fontWeight: 700, borderRadius: "999px", padding: "12px 24px", border: "none", cursor: "pointer", transition: "all .2s" }}>
            En savoir + <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ a, i }) {
  const C3 = { yellow:"#FFC801", teal:"#114C5A", arctic:"#F1F6F4" };
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: C3.arctic, borderRadius: "20px", padding: "22px", transition: "all .3s", transform: h ? "translateY(-4px)" : "none", boxShadow: h ? "0 12px 36px rgba(17,76,90,0.1)" : "none" }}>
      <div style={{ display: "flex", gap: "2px", marginBottom: "12px" }}>
        {[...Array(5)].map((_, j) => <Star key={j} size={11} style={{ fill: j < a.note ? C3.yellow : "#e5e7eb", color: j < a.note ? C3.yellow : "#e5e7eb" }} />)}
      </div>
      <p style={{ fontSize: "13px", color: "#5a7a84", lineHeight: 1.7, marginBottom: "18px" }}>{a.texte}</p>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ width: "38px", height: "38px", borderRadius: "12px", background: i % 2 === 0 ? C3.teal : C3.yellow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 900, color: i % 2 === 0 ? C3.yellow : C3.teal, flexShrink: 0 }}>
          {a.initiale}
        </div>
        <div>
          <p style={{ fontSize: "12px", fontWeight: 700, color: C3.teal }}>{a.nom}</p>
          <p style={{ fontSize: "10px", color: "#aaa" }}>{a.date}</p>
        </div>
      </div>
    </div>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h4 style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "18px" }}>{title}</h4>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "11px" }}>
        {links.map((l, i) => (
          <li key={i}>
            <a href="#" style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", textDecoration: "none", fontWeight: 500, transition: "color .2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#FFC801"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}>{l}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
