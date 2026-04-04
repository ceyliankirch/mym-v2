// app/sejours-enfants-ados/[id]/SejourDetailClient.jsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin, Calendar, Users, Clock, Shield, CreditCard, Award,
  ChevronRight, ArrowRight, ArrowLeft, CheckCircle2,
  Phone, Mail, Heart, Share2, ChevronLeft
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
  gray:    "#8aaa",
  lightGray: "#e2e8f0"
};

/* ─── UTILS ──────────────────────────────────────────────────────────────── */
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

const getDuree = (startStr, endStr) => {
  if (!startStr || !endStr) return "À définir";
  const diffDays = Math.ceil(Math.abs(new Date(endStr) - new Date(startStr)) / (1000 * 60 * 60 * 24)) + 1;
  return diffDays === 1 ? "1 jour" : `${diffDays} jours`;
};

/* ─── NAV ───────────────────────────────────────────────────────────────────── */
const NAV = ["Accueil","Séjours","Qui sommes-nous","Séniors","Contact","FAQ"];

function Header({ scrolled }) {
  return (
    <header style={{
      position:"sticky",top:0,zIndex:100,
      background: scrolled?"rgba(241,246,244,.97)":"white",
      boxShadow:"0 2px 24px rgba(17,76,90,0.08)",
      transition:"all .3s",
    }}>
      <div style={{maxWidth:"1320px",margin:"0 auto",padding:"12px 32px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"24px"}}>
        <Link href="/" style={{display:"flex",alignItems:"center",gap:"10px",textDecoration:"none",flexShrink:0}}>
          <div style={{width:"40px",height:"40px",borderRadius:"14px",background:C.yellow,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{color:C.teal,fontWeight:900,fontSize:"1.1rem"}}>M</span>
          </div>
          <div>
            <div style={{fontSize:"10px",fontWeight:800,letterSpacing:"2px",textTransform:"uppercase",color:C.teal,lineHeight:1.2}}>Make Your</div>
            <div style={{fontSize:"10px",fontWeight:800,letterSpacing:"2px",textTransform:"uppercase",color:C.saffron,lineHeight:1.2}}>Moment</div>
          </div>
        </Link>

        <nav style={{display:"flex",alignItems:"center",gap:"2px",background:C.white,borderRadius:"999px",padding:"6px",boxShadow:"0 2px 12px rgba(17,76,90,0.08)"}} className="hidden lg:flex">
          {NAV.map((l,i)=>(
            <Link key={i} href={i===1?"/sejours-enfants-ados":i===0?"/":"#"} style={{fontSize:"11px",fontWeight:i===1?800:700,padding:"8px 16px",borderRadius:"999px",textDecoration:"none",background:i===1?C.yellow:"transparent",color:C.teal,transition:"all .2s"}}>
              {l}
            </Link>
          ))}
        </nav>

        <Link href="/contact" style={{display:"flex",alignItems:"center",gap:"8px",background:C.teal,color:C.yellow,fontSize:"11px",fontWeight:700,borderRadius:"999px",padding:"10px 22px",textDecoration:"none"}}>
          Nous écrire <ArrowRight size={13}/>
        </Link>
      </div>
    </header>
  );
}

/* ─── DICTIONNAIRE DES COORDONNÉES (POURCENTAGES SUR LE SVG) ─── */
// Rappel : Tu peux ajouter d'autres villes ici au fur et à mesure !
const FRANCE_COORDS = {
  "strasbourg": { top: "35%", left: "85%" },
  "paris": { top: "30%", left: "53%" },
  "lyon": { top: "58%", left: "70%" },
  "marseille": { top: "82%", left: "74%" },
  "bordeaux": { top: "68%", left: "35%" },
  "toulouse": { top: "82%", left: "48%" },
  "lille": { top: "15%", left: "62%" },
  "nantes": { top: "50%", left: "30%" },
  "rennes": { top: "42%", left: "28%" },
  "montpellier": { top: "82%", left: "64%" },
  "nice": { top: "80%", left: "85%" },
  "biarritz": { top: "80%", left: "28%" },
  "vieux-boucau": { top: "78%", left: "28%" },
  "default": { top: "50%", left: "50%" } // Centre exact si ville inconnue
};

// Fonction pour trouver les coordonnées d'une ville (ignore les accents et majuscules)
function getCoordinates(ville) {
  if (!ville) return FRANCE_COORDS.default;
  const normalized = ville.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  const foundKey = Object.keys(FRANCE_COORDS).find(k => normalized.includes(k));
  return foundKey ? FRANCE_COORDS[foundKey] : FRANCE_COORDS.default;
}



/* ─── COMPOSANT : CARTE FRANCE PIN ────────────────────────────────────────── */
function FranceMapPin({ imageUrl, lieu }) {
  const villeCourte = lieu ? lieu.split(',')[0].trim() : "France";
  
  // On récupère les coordonnées X/Y (top/left) dynamiquement
  const coords = getCoordinates(villeCourte);

  return (
    <div style={{ position: "relative", width: "100%", height: "480px", background: "#f8fafc", borderRadius: "32px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "32px", border: `1px solid ${C.lightGray}` }}>
      
      {/* Container carré pour que les pourcentages s'alignent parfaitement avec le SVG */}
      <div style={{ position: "relative", width: "100%", maxWidth: "480px", height: "100%" }}>
        
        {/* SVG DE LA FRANCE EN FOND */}
        <img 
          src="/france.svg" 
          alt="Carte de la France" 
          style={{ 
            position: "absolute", 
            top: 0, left: 0, width: "100%", height: "100%", 
            opacity: 0.08, // Opacité très subtile
            objectFit: "contain",
            pointerEvents: "none"
          }} 
        />
        
        {/* LE GROUPE DU PIN (Positionné dynamiquement avec 'top' et 'left') */}
        <div style={{ 
          position: "absolute", 
          top: coords.top, 
          left: coords.left, 
          transform: "translate(-50%, -50%)", // Centre parfaitement le pin sur le point
          zIndex: 10 
        }}>
          
          {/* ⚡ ANIMATIONS RADIO (Ondes derrière le Pin) */}
          {/* Onde 1 */}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100px", height: "100px", borderRadius: "50%", background: `${C.yellow}12`, border: `1px solid ${C.yellow}25`, animation: "pulse-soft 3s infinite", pointerEvents: "none" }} />
          {/* Onde 2 */}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "160px", height: "160px", borderRadius: "50%", border: `1px solid ${C.yellow}15`, animation: "pulse-soft 3s infinite 1.5s", pointerEvents: "none" }} />

          {/* ⚡ LE PIN MINIATURE (Réduit à 50px, sans texte) */}
          <div style={{ 
            width: "50px", 
            height: "50px", 
            borderRadius: "50%", 
            border: `3px solid ${C.white}`, // Bordure affinée
            boxShadow: "0 6px 16px rgba(17,76,90,0.12)", // Ombre adoucie
            overflow: "hidden", 
            background: C.arctic, 
            position: "relative", 
            zIndex: 5 
          }}>
            <img src={imageUrl || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Point d'intérêt" />
          </div>

        </div>
      </div>

      {/* Overlay Texte en haut à gauche */}
      <div style={{ position: "absolute", top: "32px", left: "32px", pointerEvents: "none" }}>
        <p style={{ fontSize: "11px", fontWeight: 800, color: C.saffron, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "6px" }}>Localisation</p>
        <h3 style={{ fontSize: "24px", fontWeight: 900, color: C.teal }}>Au cœur du séjour</h3>
      </div>
    </div>
  );
}

/* ─── GALERIE DYNAMIQUE (NON-ROGNÉE) ────────────────────────────────────────── */
function Galerie({ images }) {
  const [active, setActive] = useState(0);
  if (!images || images.length === 0) return null;
  return (
    <div style={{background:C.white, borderRadius:"20px", padding:"28px", boxShadow:"0 2px 16px rgba(17,76,90,0.06)", marginBottom: "24px"}}>
      <h3 style={{fontSize:"18px",fontWeight:900,color:C.teal,marginBottom:"20px"}}>Galerie Photos</h3>
      
      {/* Image principale au ratio original */}
      <div style={{borderRadius:"16px",overflow:"hidden",height:"400px",marginBottom:"16px",position:"relative", background: C.arctic}}>
        <img src={images[active]} alt="galerie" style={{width:"100%",height:"100%",objectFit:"contain"}}/>
        {images.length > 1 && (
          <>
            <button onClick={()=>setActive(p=>(p-1+images.length)%images.length)} style={{position:"absolute",left:"16px",top:"50%",transform:"translateY(-50%)",background:"rgba(255,255,255,0.9)",border:"none",borderRadius:"50%",width:"40px",height:"40px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",boxShadow:"0 4px 12px rgba(0,0,0,0.1)"}}>
              <ChevronLeft size={20} style={{color:C.teal}}/>
            </button>
            <button onClick={()=>setActive(p=>(p+1)%images.length)} style={{position:"absolute",right:"16px",top:"50%",transform:"translateY(-50%)",background:"rgba(255,255,255,0.9)",border:"none",borderRadius:"50%",width:"40px",height:"40px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",boxShadow:"0 4px 12px rgba(0,0,0,0.1)"}}>
              <ChevronRight size={20} style={{color:C.teal}}/>
            </button>
          </>
        )}
      </div>

      {/* Miniatures */}
      {images.length > 1 && (
        <div style={{display:"flex",gap:"12px",overflowX:"auto",paddingBottom:"8px"}}>
          {images.map((img,i)=>(
            <div key={i} onClick={()=>setActive(i)} style={{borderRadius:"12px",overflow:"hidden",height:"72px",width:"108px",flexShrink:0,cursor:"pointer",border:active===i?`3px solid ${C.yellow}`:"3px solid transparent",transition:"border .2s", background: C.arctic}}>
              <img src={img} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── STICKY CTA SIDEBAR ────────────────────────────────────────────────────── */
function StickySidebar({ sejour }) {
  const [liked, setLiked] = useState(false);
  const placesTotales = sejour.places || 0;
  // Calcul temporaire (à remplacer plus tard par les vraies inscriptions DB)
  const placesRestantes = placesTotales; 
  const urgent = placesRestantes <= 3 && placesRestantes > 0;

  return (
    <div style={{position:"sticky",top:"90px",background:C.white,borderRadius:"24px",padding:"28px",boxShadow:"0 8px 40px rgba(17,76,90,0.12)"}}>
      <div style={{marginBottom:"20px",paddingBottom:"20px",borderBottom:`1px solid ${C.arctic}`}}>
        <p style={{fontSize:"11px",color:"#8aa",fontWeight:600,marginBottom:"4px",textTransform:"uppercase",letterSpacing:"1px"}}>Prix par personne</p>
        <div style={{display:"flex",alignItems:"baseline",gap:"8px"}}>
          <span style={{fontSize:"2.4rem",fontWeight:900,color:C.teal,lineHeight:1}}>{sejour.prix || 0}€</span>
        </div>
        <p style={{fontSize:"11px",color:"#8aa",marginTop:"4px"}}>Paiement jusqu'à 8× sans frais possible</p>
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:"12px",marginBottom:"20px"}}>
        {[
          {Icon:Calendar, label:"Dates", val:formatSejourDates(sejour.dateDebut, sejour.dateFin)},
          {Icon:Clock,    label:"Durée", val:getDuree(sejour.dateDebut, sejour.dateFin)},
          {Icon:MapPin,   label:"Lieu",  val:sejour.lieu || "À définir"},
          {Icon:Users,    label:"Âge",   val:formatAge(sejour.tranchesAge)},
          {Icon:Users,    label:"Places",val:`${placesRestantes} place(s) max.`},
        ].map(({Icon,label,val},i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:"10px"}}>
            <div style={{width:"32px",height:"32px",borderRadius:"10px",background:`${C.yellow}22`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <Icon size={14} style={{color:C.teal}}/>
            </div>
            <div>
              <p style={{fontSize:"10px",color:"#8aa",fontWeight:600,textTransform:"uppercase",letterSpacing:"1px"}}>{label}</p>
              <p style={{fontSize:"12px",fontWeight:700,color:C.teal}}>{val}</p>
            </div>
          </div>
        ))}
      </div>

      {urgent&&(
        <div style={{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:"12px",padding:"10px 14px",marginBottom:"16px",display:"flex",alignItems:"center",gap:"8px"}}>
          <span style={{fontSize:"16px"}}>⚡</span>
          <p style={{fontSize:"12px",fontWeight:700,color:"#dc2626"}}>Plus que {placesRestantes} places disponibles !</p>
        </div>
      )}

      <Link href={`/inscription/${sejour.id}`}
        style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",background:C.yellow,color:C.teal,fontSize:"14px",fontWeight:800,borderRadius:"999px",padding:"16px",textDecoration:"none",marginBottom:"8px",boxShadow:"0 6px 20px rgba(255,200,1,0.35)",width:"100%", transition:"all 0.2s"}}
        onMouseEnter={e => e.currentTarget.style.background = C.saffron} onMouseLeave={e => e.currentTarget.style.background = C.yellow}>
        S'inscrire à ce séjour <ArrowRight size={16}/>
      </Link>
      <p style={{fontSize:"10px", color:"#8aaa", textAlign:"center", marginBottom:"16px", fontWeight:600}}>
        🔒 Création de compte requise pour s'inscrire
      </p>

      <div style={{display:"flex",gap:"8px"}}>
        <button onClick={()=>setLiked(!liked)} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",background:C.arctic,border:"none",borderRadius:"999px",padding:"10px",cursor:"pointer",fontSize:"11px",fontWeight:700,color:liked?"#ef4444":C.teal,fontFamily:"Montserrat,sans-serif"}}>
          <Heart size={13} style={{fill:liked?"#ef4444":"none",color:liked?"#ef4444":C.teal}}/> Favoris
        </button>
        <button onClick={()=>navigator?.share?.({title:sejour.titre,url:window.location.href})} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",background:C.arctic,border:"none",borderRadius:"999px",padding:"10px",cursor:"pointer",fontSize:"11px",fontWeight:700,color:C.teal,fontFamily:"Montserrat,sans-serif"}}>
          <Share2 size={13}/> Partager
        </button>
      </div>

      <div style={{marginTop:"20px",paddingTop:"20px",borderTop:`1px solid ${C.arctic}`}}>
        <p style={{fontSize:"11px",color:"#8aa",fontWeight:600,marginBottom:"10px",textTransform:"uppercase",letterSpacing:"1px"}}>Une question ?</p>
        <a href="tel:+33698965002" style={{display:"flex",alignItems:"center",gap:"8px",textDecoration:"none",marginBottom:"6px"}}>
          <Phone size={12} style={{color:C.teal}}/><span style={{fontSize:"12px",fontWeight:600,color:C.teal}}>+33 6 98 96 50 02</span>
        </a>
        <a href="mailto:mym.makeyourmoment@gmail.com" style={{display:"flex",alignItems:"center",gap:"8px",textDecoration:"none"}}>
          <Mail size={12} style={{color:C.teal}}/><span style={{fontSize:"12px",fontWeight:600,color:C.teal}}>mym.makeyourmoment@gmail.com</span>
        </a>
      </div>
    </div>
  );
}

/* ─── PAGE DETAIL PRINCIPALE ─────────────────────────────────────────────────── */
export default function SejourDetailClient({ sejour, autresSejours }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("programme");

  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>40);
    window.addEventListener("scroll",fn);
    return()=>window.removeEventListener("scroll",fn);
  },[]);

  const TABS = [
    {id:"programme",  label:"Programme du séjour"},
    {id:"pratique",   label:"Infos pratiques"},
    {id:"cadre",      label:"Le lieu & Cadre de vie"},
  ];

  if (!sejour) return null;

  return (
    <div style={{fontFamily:"'Montserrat',sans-serif",background:C.arctic,color:C.teal,overflowX:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');
        *{font-family:'Montserrat',sans-serif;box-sizing:border-box;}
        a{color:inherit;}
        .rich-text p{margin-bottom:10px;font-size:14px;line-height:1.85;color:#5a7a84;font-weight:500;}
        .rich-text strong{font-weight:800;color:#114C5A;}
        .rich-text u{text-decoration:underline;}
        .rich-text br{display:block;margin:4px 0;}
      `}</style>

      <Header scrolled={scrolled}/>

      {/* ── BANNIERE ──────────────────────────────────────────────────────── */}
      <section style={{position:"relative",height:"460px",overflow:"hidden"}}>
        <img src={sejour.imageUrl || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600"} alt={sejour.titre} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(17,76,90,0.85) 0%,rgba(17,76,90,0.15) 50%,transparent 100%)"}}/>

        <div style={{position:"absolute",top:"24px",left:"32px",display:"flex",alignItems:"center",gap:"8px"}}>
          <Link href="/sejours-enfants-ados" style={{display:"flex",alignItems:"center",gap:"6px",background:"rgba(255,255,255,0.15)",backdropFilter:"blur(6px)",borderRadius:"999px",padding:"6px 14px",textDecoration:"none",color:"white",fontSize:"12px",fontWeight:600}}>
            <ArrowLeft size={12}/> Tous les séjours
          </Link>
        </div>

        <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"28px 32px"}}>
          <div style={{maxWidth:"1320px",margin:"0 auto"}}>
            <div style={{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"}}>
              <div style={{background:"rgba(255,255,255,0.15)",backdropFilter:"blur(6px)",borderRadius:"999px",padding:"5px 14px"}}>
                <span style={{fontSize:"11px",fontWeight:800,color:"white"}}>{formatAge(sejour.tranchesAge)}</span>
              </div>
              <div style={{background:C.yellow,borderRadius:"999px",padding:"5px 14px"}}>
                <span style={{fontSize:"11px",fontWeight:800,color:C.teal}}>{getDuree(sejour.dateDebut, sejour.dateFin)}</span>
              </div>
              <div style={{background:"rgba(255,255,255,0.15)",backdropFilter:"blur(6px)",borderRadius:"999px",padding:"5px 14px",display:"flex",alignItems:"center",gap:"5px"}}>
                <Calendar size={10} style={{color:"white"}}/>
                <span style={{fontSize:"11px",fontWeight:800,color:"white"}}>{sejour.saison || "Saison à définir"}</span>
              </div>
            </div>

            <h1 style={{fontWeight:900,color:C.white,fontSize:"clamp(1.8rem,4vw,3rem)",letterSpacing:"-1px",marginBottom:"8px"}}>
              {sejour.titre}
            </h1>
            <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
              <MapPin size={14} style={{color:C.yellow}}/>
              <span style={{color:"rgba(255,255,255,0.8)",fontSize:"14px",fontWeight:600}}>{sejour.lieu || "Lieu à définir"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTENT ───────────────────────────────────────────────────────── */}
      <div style={{maxWidth:"1320px",margin:"0 auto",padding:"48px 32px", paddingBottom: "100px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 380px",gap:"48px",alignItems:"start"}}>

          {/* ── COL GAUCHE ─────────────────────────────────────────────────── */}
          <div>
            {/* Résumé */}
            <div style={{background:C.white,borderRadius:"20px",padding:"28px",marginBottom:"24px",boxShadow:"0 2px 16px rgba(17,76,90,0.06)"}}>
              <p style={{fontSize:"11px",fontWeight:800,color:C.saffron,textTransform:"uppercase",letterSpacing:"2px",marginBottom:"10px"}}>En bref</p>
              
              <p style={{fontSize:"15px",color:"#5a7a84",lineHeight:1.8,fontWeight:600}}>
                 {sejour.shortDescription || `Ce séjour ${sejour.saison?.toLowerCase() || "exceptionnel"} organisé par Make Your Moment emmènera les jeunes à ${sejour.lieu || "une superbe destination"} pour ${getDuree(sejour.dateDebut, sejour.dateFin)} d'activités inoubliables.`}
              </p>

              <div style={{display:"flex",flexWrap:"wrap",gap:"10px",marginTop:"24px",paddingTop:"24px",borderTop:`1px solid ${C.arctic}`}}>
                {[
                  {Icon:Shield,     text:"Déclaration DDCS"},
                  {Icon:CreditCard, text:"Paiement 8× sans frais"},
                  {Icon:Award,      text:"Encadrants diplômés"},
                  {Icon:CheckCircle2,text:"Places limitées"},
                ].map(({Icon,text},i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:"6px",background:C.arctic,borderRadius:"999px",padding:"8px 14px"}}>
                    <Icon size={14} style={{color:C.teal}}/>
                    <span style={{fontSize:"11px",fontWeight:800,color:C.teal}}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div style={{background:C.white,borderRadius:"20px",overflow:"hidden",boxShadow:"0 2px 16px rgba(17,76,90,0.06)", marginBottom: "24px"}}>
              <div style={{display:"flex",borderBottom:`1px solid ${C.arctic}`, overflowX: "auto"}}>
                {TABS.map(t=>(
                  <button key={t.id} onClick={()=>setActiveTab(t.id)} style={{
                    flex:1,padding:"16px",fontSize:"13px",fontWeight:800,border:"none",cursor:"pointer",
                    background:"transparent",fontFamily:"Montserrat,sans-serif",transition:"all .2s",
                    color:activeTab===t.id?C.teal:"#8aa",
                    borderBottom:activeTab===t.id?`3px solid ${C.yellow}`:"3px solid transparent",
                    whiteSpace: "nowrap"
                  }}>
                    {t.label}
                  </button>
                ))}
              </div>

              <div style={{padding:"32px"}}>
                {activeTab==="programme"&&(
                  <div className="rich-text" dangerouslySetInnerHTML={{ __html: sejour.programme || "<p>Le programme de ce séjour sera très prochainement disponible.</p>" }} />
                )}
                {activeTab==="pratique"&&(
                  <div className="rich-text" dangerouslySetInnerHTML={{ __html: sejour.infosPratiques || "<p>Les informations pratiques vous seront communiquées ultérieurement.</p>" }} />
                )}
                {activeTab==="cadre"&&(
                  <div className="rich-text" dangerouslySetInnerHTML={{ __html: sejour.cadreDeVie || "<p>Les détails sur l'hébergement et le cadre de vie seront bientôt disponibles.</p>" }} />
                )}
              </div>
            </div>

            {/* ⚡ CARTE FRANCE AVEC PIN IMAGE (CORRIGÉE) */}
            <FranceMapPin imageUrl={sejour.imageUrl} lieu={sejour.lieu} />

            {/* ⚡ GALERIE PHOTOS (Non Rognée) */}
            <Galerie images={sejour.galerie} />

            {/* CTA mobile */}
            <div style={{marginTop:"32px",display:"none", flexDirection:"column", gap:"8px"}} className="mobile-cta">
              <Link href={`/inscription/${sejour.id}`}
                style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",background:C.yellow,color:C.teal,fontSize:"14px",fontWeight:800,borderRadius:"999px",padding:"18px",textDecoration:"none",boxShadow:"0 6px 20px rgba(255,200,1,0.35)"}}>
                S'inscrire — {sejour.prix || 0}€ <ArrowRight size={14}/>
              </Link>
              <p style={{fontSize:"11px", color:"#8aaa", textAlign:"center", fontWeight:600}}>
                🔒 Création de compte requise
              </p>
            </div>
          </div>

          {/* ── COL DROITE — SIDEBAR ────────────────────────────────────────── */}
          <div className="hidden md:block">
             <StickySidebar sejour={sejour}/>
          </div>
        </div>

        {/* ── AUTRES SÉJOURS SIMILAIRES ──────────────────────────────────── */}
        {autresSejours && autresSejours.length > 0 && (
          <section style={{marginTop:"100px"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"32px"}}>
              <div>
                <p style={{fontSize:"11px",fontWeight:800,color:C.saffron,textTransform:"uppercase",letterSpacing:"2px",marginBottom:"6px"}}>À découvrir aussi</p>
                <h2 style={{fontWeight:900,color:C.teal,fontSize:"1.8rem",letterSpacing:"-0.5px"}}>Séjours similaires</h2>
              </div>
              <Link href="/sejours-enfants-ados" style={{display:"flex",alignItems:"center",gap:"6px",fontSize:"13px",fontWeight:800,color:C.teal,textDecoration:"none",background:C.white,padding:"12px 24px",borderRadius:"999px",boxShadow:"0 2px 12px rgba(17,76,90,0.07)"}}>
                Voir tout <ArrowRight size={14}/>
              </Link>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",gap:"24px"}}>
              {autresSejours.map((s)=>(
                <Link key={s.id} href={`/sejours-enfants-ados/${s.id}`} style={{textDecoration:"none"}}>
                  <div style={{background:C.white,borderRadius:"20px",overflow:"hidden",boxShadow:"0 2px 16px rgba(17,76,90,0.07)",transition:"all .3s"}}
                    onMouseEnter={e=>e.currentTarget.style.transform="translateY(-6px)"}
                    onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
                    <div style={{height:"160px",overflow:"hidden"}}>
                      <img src={s.imageUrl || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"} alt={s.titre} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                    </div>
                    <div style={{padding:"20px"}}>
                      <h4 style={{fontSize:"15px",fontWeight:800,color:C.teal,marginBottom:"6px"}}>{s.titre}</h4>
                      <p style={{fontSize:"12px",color:C.saffron,fontWeight:700,marginBottom:"12px"}}>{s.lieu || "Lieu à définir"} · {getDuree(s.dateDebut, s.dateFin)}</p>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <span style={{fontSize:"16px",fontWeight:900,color:C.teal}}>{s.prix || 0}€</span>
                        <span style={{fontSize:"11px",fontWeight:700,color:"#8aa"}}>{formatAge(s.tranchesAge)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}