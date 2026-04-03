"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin, Calendar, Users, Clock, Search, X, SunMedium,
  Snowflake, Flower2, Waves, Globe, Landmark, Mountain, Anchor, ChevronRight, ArrowRight, Leaf, Heart
} from "lucide-react";

/* ─── PALETTE ─────────────────────────────────────────────────────────────── */
const C = {
  yellow:  "#FFC801",
  saffron: "#FF9932",
  teal:    "#114C5A",
  tealMid: "#1A6B7C",
  lilac:   "#EFDEF9",
  arctic:  "#F1F6F4",
  white:   "#ffffff",
};

/* ─── UTILS ─────────────────────────────────────────────────────────────── */
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

// Calcul automatique de la durée en jours
const getDuree = (startStr, endStr) => {
  if (!startStr || !endStr) return "À définir";
  const start = new Date(startStr);
  const end = new Date(endStr);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 pour inclure le premier jour
  return diffDays === 1 ? "1 jour" : `${diffDays} jours`;
};

const matchCategory = (s, cat) => {
  if (cat === "tous") return true;
  const ageStr = (s.tranchesAge || "").toLowerCase();
  if (cat === "seniors" && (ageStr.includes("senior") || ageStr.includes("sénior"))) return true;
  if (cat === "ados" && (ageStr.includes("13") || ageStr.includes("14") || ageStr.includes("15") || ageStr.includes("16") || ageStr.includes("17") || ageStr.includes("ado"))) return true;
  if (cat === "enfants" && (ageStr.includes("6") || ageStr.includes("7") || ageStr.includes("8") || ageStr.includes("9") || ageStr.includes("10") || ageStr.includes("11") || ageStr.includes("12") || ageStr.includes("enfant"))) return true;
  return false;
};

/* ─── CONSTANTS ─────────────────────────────────────────────────────────────── */
const CATS     = [{id:"tous",label:"Tous"},{id:"enfants",label:"Enfants"},{id:"ados",label:"Ados"},{id:"seniors",label:"Séniors"}];
const PERIODES = [{id:"tous",label:"Toutes saisons"},{id:"automne",label:"Automne"},{id:"hiver",label:"Hiver"},{id:"printemps",label:"Printemps"},{id:"été",label:"Été"}];

/* ─── BREADCRUMB ─────────────────────────────────────────────────────────────── */
function Breadcrumb({ items }) {
  return (
    <div style={{maxWidth:"1320px",margin:"0 auto",padding:"16px 32px",display:"flex",alignItems:"center",gap:"8px"}}>
      {items.map((item,i)=>(
        <span key={i} style={{display:"flex",alignItems:"center",gap:"8px"}}>
          {i>0&&<ChevronRight size={12} style={{color:"#aaa"}}/>}
          {item.href
            ? <Link href={item.href} style={{fontSize:"12px",color:C.tealMid,textDecoration:"none",fontWeight:600}}>{item.label}</Link>
            : <span style={{fontSize:"12px",color:"#888",fontWeight:500}}>{item.label}</span>
          }
        </span>
      ))}
    </div>
  );
}

/* ─── SEJOUR CARD ────────────────────────────────────────────────────────────── */
function SejourCard({ s, idx }) {
  const [hovered, setHovered] = useState(false);
  const [liked, setLiked] = useState(false);
  const { icon: Icon, color: sColor } = getSeasonConfig(s.saison);
  
  // Calcul places restantes si l'info count est dispo (optionnel, selon ton backend)
  const nbInscrits = s._count?.inscriptions || s.inscriptions?.length || 0;
  const placesRestantes = s.places > 0 ? s.places - nbInscrits : null;
  const urgent = placesRestantes !== null && placesRestantes <= 3 && placesRestantes > 0;

  return (
    <Link href={`/sejours/${s.id}`} style={{textDecoration:"none"}}
      onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
      <div style={{
        background:C.white, borderRadius:"24px", overflow:"hidden", cursor:"pointer",
        transform: hovered?"translateY(-6px)":"translateY(0)",
        boxShadow: hovered?"0 20px 56px rgba(17,76,90,0.14)":"0 2px 16px rgba(17,76,90,0.07)",
        transition:"all .3s ease",
        animation:`fadeUp .5s ease both`, animationDelay:`${idx*0.07}s`,
        position:"relative",
      }}>
        {urgent&&(
          <div style={{position:"absolute",top:"12px",left:"12px",zIndex:5,background:"#ef4444",borderRadius:"999px",padding:"3px 10px"}}>
            <span style={{fontSize:"10px",fontWeight:700,color:"white"}}>⚡ {placesRestantes} places restantes</span>
          </div>
        )}
        <div style={{position:"relative",height:"200px",overflow:"hidden"}}>
          <img src={s.imageUrl || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"} alt={s.titre} style={{width:"100%",height:"100%",objectFit:"cover",transform:hovered?"scale(1.05)":"scale(1)",transition:"transform .5s ease"}}/>
          
          <div style={{position:"absolute",top:"12px",left:urgent?"auto":"12px",right:urgent?"12px":"auto",background:"rgba(255,255,255,0.93)",backdropFilter:"blur(6px)",borderRadius:"999px",padding:"4px 10px",display:"flex",alignItems:"center",gap:"5px",...(urgent?{display:"none"}:{})}}>
            <Icon size={10} style={{color:sColor}}/>
            <span style={{fontSize:"10px",fontWeight:800,color:C.teal,textTransform:"uppercase"}}>{s.saison || "Saison"}</span>
          </div>

          <button onClick={e => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }} style={{ position: "absolute", top: "12px", right: "12px", width: "32px", height: "32px", background: "white", borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>
            <Heart size={14} style={{ fill: liked ? C.saffron : "none", color: liked ? C.saffron : "#ccc" }} />
          </button>

          <div style={{position:"absolute",bottom:"12px",right:"12px",background:C.yellow,borderRadius:"999px",padding:"3px 10px",display:"flex",alignItems:"center",gap:"4px"}}>
            <Clock size={9} style={{color:C.teal}}/>
            <span style={{fontSize:"10px",fontWeight:700,color:C.teal}}>{getDuree(s.dateDebut, s.dateFin)}</span>
          </div>
        </div>

        <div style={{padding:"18px 20px 20px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:"8px",marginBottom:"4px"}}>
            <h3 style={{fontSize:"14px",fontWeight:800,color:C.teal,lineHeight:1.3,margin:0}}>{s.titre}</h3>
            <span style={{fontSize:"15px",fontWeight:900,color:C.saffron,whiteSpace:"nowrap"}}>{s.prix || "0"}€</span>
          </div>
          
          <div style={{display:"flex", flexDirection:"column", gap:"6px", marginTop:"12px", marginBottom:"16px"}}>
             <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
               <Calendar size={12} style={{color:C.saffron,flexShrink:0}}/>
               <span style={{fontSize:"11px",color:"#8aa",fontWeight:600}}>{formatSejourDates(s.dateDebut, s.dateFin)}</span>
             </div>
             <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
               <MapPin size={12} style={{color:"#10b981",flexShrink:0}}/>
               <span style={{fontSize:"11px",fontWeight:600,color:"#8aa"}}>{s.lieu || "Lieu à définir"}</span>
             </div>
             <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
               <Users size={12} style={{color:C.teal,flexShrink:0}}/>
               <span style={{fontSize:"11px",color:"#8aa",fontWeight:600}}>{formatAge(s.tranchesAge)}</span>
             </div>
          </div>
          
          <div style={{
            width:"100%",background:hovered?C.yellow:C.teal,color:hovered?C.teal:C.white,
            fontSize:"11px",fontWeight:800,letterSpacing:".8px",textTransform:"uppercase",
            borderRadius:"999px",padding:"10px",border:"none",cursor:"pointer",
            display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",
            transition:"all .2s",
          }}>
            Voir le séjour <ArrowRight size={11}/>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── PAGE SEJOURS CLIENT ─────────────────────────────────────────────────────── */
export default function SejoursClient({ sejoursFromDb }) {
  const [cat, setCat]         = useState("tous");
  const [periode, setPeriode] = useState("tous");
  const [search, setSearch]   = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>40);
    window.addEventListener("scroll",fn);
    return()=>window.removeEventListener("scroll",fn);
  },[]);

  // 1. Ne garder que les séjours publiés
  const allSejours = sejoursFromDb?.filter(s => s.statut === "Publié") || [];

  // 2. Appliquer les filtres
  const filtered = allSejours.filter(s => {
    const matchCat     = matchCategory(s, cat);
    const matchPeriode = periode === "tous" || s.saison?.toLowerCase() === periode;
    const matchSearch  = !search ||
      s.titre.toLowerCase().includes(search.toLowerCase()) ||
      (s.lieu && s.lieu.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchPeriode && matchSearch;
  });

  return (
    <div style={{fontFamily:"'Montserrat',sans-serif",background:C.arctic,color:C.teal,overflowX:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');
        *{font-family:'Montserrat',sans-serif;box-sizing:border-box;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        input::placeholder{color:rgba(255,255,255,0.5);}
        input:focus{outline:none;}
      `}</style>

      {/* ── HERO PAGE ──────────────────────────────────────────────────────── */}
      <section style={{background:C.teal,padding:"64px 32px 80px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"-60px",right:"-60px",width:"300px",height:"300px",borderRadius:"50%",background:"rgba(255,200,1,0.08)"}}/>
        <div style={{position:"absolute",bottom:"-40px",left:"10%",width:"200px",height:"200px",borderRadius:"50%",background:"rgba(255,200,1,0.05)"}}/>

        <div style={{maxWidth:"1320px",margin:"0 auto",position:"relative",zIndex:1}}>
          <Breadcrumb items={[{label:"Accueil",href:"/"},{label:"Tous les séjours"}]}/>

          <div style={{textAlign:"center",marginBottom:"40px"}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:"8px",background:"rgba(255,200,1,0.15)",borderRadius:"999px",padding:"8px 16px",marginBottom:"20px"}}>
              <span style={{width:"8px",height:"8px",borderRadius:"50%",background:C.yellow,flexShrink:0}}/>
              <span style={{fontSize:"11px",fontWeight:700,color:C.yellow,letterSpacing:"1px",textTransform:"uppercase"}}>Saison 2026</span>
            </div>
            <h1 style={{fontWeight:900,color:C.white,letterSpacing:"-2px",lineHeight:1.06,marginBottom:"16px",fontSize:"clamp(2.2rem,4vw,3.2rem)"}}>
              Tous nos <span style={{color:C.yellow}}>séjours</span>
            </h1>
            <p style={{fontSize:"15px",color:"rgba(255,255,255,0.65)",maxWidth:"520px",margin:"0 auto",lineHeight:1.8}}>
              Des aventures inoubliables pour enfants, ados et séniors — encadrées par des passionnés.
            </p>
          </div>

          {/* Search bar */}
          <div style={{maxWidth:"560px",margin:"0 auto",background:"rgba(255,255,255,0.1)",backdropFilter:"blur(8px)",borderRadius:"16px",padding:"10px 16px",display:"flex",alignItems:"center",gap:"12px",border:"1px solid rgba(255,255,255,0.15)", boxShadow:"0 8px 32px rgba(0,0,0,0.1)"}}>
            <Search size={18} style={{color:"rgba(255,255,255,0.5)",flexShrink:0}}/>
            <input
              value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Rechercher un séjour, une destination…"
              style={{flex:1,background:"transparent",border:"none",color:"white",fontSize:"14px",fontWeight:500}}
            />
            {search&&(
              <button onClick={()=>setSearch("")} style={{background:"rgba(255,255,255,0.2)",border:"none",cursor:"pointer",color:"white", borderRadius:"50%", width:"24px", height:"24px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <X size={14}/>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────────────────── */}
      <section style={{background:C.white,padding:"24px 32px",borderBottom:`1px solid ${C.arctic}`}}>
        <div style={{maxWidth:"1320px",margin:"0 auto",display:"flex",gap:"40px",flexWrap:"wrap",justifyContent:"center"}}>
          {[
            {n:`${allSejours.length}`,label:"séjours disponibles"},
            {n:"4",label:"saisons"},
            {n:"3",label:"catégories d'âge"},
            {n:"500+",label:"familles satisfaites"},
          ].map(({n,label},i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:"10px"}}>
              <span style={{fontSize:"22px",fontWeight:900,color:C.yellow}}>{n}</span>
              <span style={{fontSize:"13px",color:"#8aa",fontWeight:600}}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATALOGUE ──────────────────────────────────────────────────────── */}
      <section style={{padding:"48px 32px 96px"}}>
        <div style={{maxWidth:"1320px",margin:"0 auto"}}>

          {/* Filtres */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"32px",flexWrap:"wrap",gap:"16px"}}>
            <p style={{fontSize:"14px",color:"#8aa",fontWeight:600}}>
              <span style={{color:C.teal,fontWeight:900, fontSize:"16px"}}>{filtered.length}</span> séjour{filtered.length>1?"s":""} trouvé{filtered.length>1?"s":""}
            </p>

            <div style={{display:"flex",alignItems:"center",gap:"6px",background:C.white,borderRadius:"16px",padding:"8px",boxShadow:"0 4px 16px rgba(17,76,90,0.05)",flexWrap:"wrap"}}>
              {CATS.map(c=>(
                <button key={c.id} onClick={()=>setCat(c.id)} style={{fontSize:"12px",fontWeight:700,borderRadius:"12px",padding:"8px 16px",border:"none",cursor:"pointer",transition:"all .2s",background:cat===c.id?C.yellow:"transparent",color:C.teal}}>
                  {c.label}
                </button>
              ))}
              <div style={{width:"1px",height:"24px",background:"#eee",margin:"0 8px"}}/>
              {PERIODES.map(p=>(
                <button key={p.id} onClick={()=>setPeriode(p.id)} style={{fontSize:"12px",fontWeight:700,borderRadius:"12px",padding:"8px 16px",border:"none",cursor:"pointer",transition:"all .2s",background:periode===p.id?C.teal:"transparent",color:periode===p.id?"white":C.teal}}>
                  {p.label}
                </button>
              ))}
              {(cat!=="tous"||periode!=="tous"||search!=="")&&(
                <button onClick={()=>{setCat("tous");setPeriode("tous");setSearch("");}} style={{display:"flex",alignItems:"center",gap:"4px",fontSize:"11px",fontWeight:800,color:C.saffron,background:"none",border:"none",cursor:"pointer",marginLeft:"8px"}}>
                  <X size={14}/> Reset
                </button>
              )}
            </div>
          </div>

          {/* Grille */}
          {filtered.length>0?(
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"24px"}}>
              {filtered.map((s,i)=><SejourCard key={s.id} s={s} idx={i}/>)}
            </div>
          ):(
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"100px 0",color:"#ccc"}}>
              <Globe size={48} strokeWidth={1.5} style={{marginBottom:"16px"}}/>
              <p style={{fontSize:"15px",fontWeight:600,color:"#8aaa"}}>Aucun séjour ne correspond à votre recherche.</p>
              <button onClick={()=>{setCat("tous");setPeriode("tous");setSearch("");}} style={{marginTop:"20px",background:C.yellow,color:C.teal,border:"none",borderRadius:"999px",padding:"12px 28px",fontSize:"13px",fontWeight:800,cursor:"pointer", boxShadow:"0 8px 24px rgba(255,200,1,0.3)"}}>
                Voir tous les séjours
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA CONTACT ──────────────────────────────────────────────────────── */}
      <section style={{padding:"0 32px 80px"}}>
        <div style={{maxWidth:"1320px",margin:"0 auto"}}>
          <div style={{background:C.teal,borderRadius:"28px",padding:"48px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"32px",flexWrap:"wrap",boxShadow:"0 24px 80px rgba(17,76,90,0.2)"}}>
            <div>
              <h3 style={{fontWeight:900,color:C.white,fontSize:"1.6rem",letterSpacing:"-0.5px",marginBottom:"8px"}}>Besoin d'un conseil ?</h3>
              <p style={{fontSize:"13px",color:"rgba(255,255,255,0.6)"}}>Notre équipe répond à toutes vos questions par téléphone ou email.</p>
            </div>
            <div style={{display:"flex",gap:"12px",flexShrink:0}}>
              <a href="tel:+33698965002" style={{display:"flex",alignItems:"center",gap:"8px",background:C.yellow,color:C.teal,fontSize:"13px",fontWeight:800,borderRadius:"999px",padding:"14px 28px",textDecoration:"none", transition:"all .2s"}} onMouseEnter={e=>e.currentTarget.style.background=C.saffron} onMouseLeave={e=>e.currentTarget.style.background=C.yellow}>
                📞 Nous appeler
              </a>
              <a href="mailto:mym.makeyourmoment@gmail.com" style={{display:"flex",alignItems:"center",gap:"8px",background:"transparent",color:C.white,fontSize:"13px",fontWeight:700,borderRadius:"999px",padding:"14px 28px",textDecoration:"none",border:"2px solid rgba(255,255,255,0.25)", transition:"all .2s"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.1)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                ✉️ Nous écrire
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ background: C.teal, padding: "40px 32px", color: "white", textAlign: "center" }}>
        <p style={{ fontWeight: 800, fontSize: "1rem", marginBottom: "8px" }}>Make Your Moment</p>
        <p style={{ opacity: 0.5, fontSize: "12px" }}>© 2026 Association Make Your Moment. Tous droits réservés.</p>
      </footer>
    </div>
  );
}