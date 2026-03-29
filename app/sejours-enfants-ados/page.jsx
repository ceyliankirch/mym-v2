"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin, Calendar, Users, Clock, Search, X, SunMedium,
  Snowflake, Flower2, Waves, Globe, Landmark, Mountain, Anchor, ChevronRight, ArrowRight
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

/* ─── MOCK DATA (remplacer par fetch Supabase) ─────────────────────────────── */
export const SEJOURS = [
  {
    id: "ski-chatel-enfants",
    slug: "ski-chatel-enfants",
    titre: "Séjour au Ski",
    lieu: "Châtel",
    region: "Alpes",
    ageLabel: "6 – 12 ans",
    ages: ["enfants"],
    prix: 890,
    dateLabel: "28 Fév – 6 Mars 2026",
    dateDebut: "2026-02-28",
    dateFin: "2026-03-06",
    duree: "7 jours",
    periode: "hiver",
    categorie: "enfants",
    places: 20,
    placesRestantes: 5,
    img: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80",
    banniere: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1600&q=80",
    Icon: Snowflake,
    shortDescription: "Une semaine inoubliable sur les pistes enneigées de Châtel avec des cours de ski encadrés par des professionnels diplômés.",
    programme: `
      <p><strong>Du 28 février au 6 mars 2026</strong>, venez découvrir les splendides pistes de Châtel avec nos animateurs diplômés.</p>
      <br/>
      <p><u><strong>Au programme :</strong></u></p>
      <br/>
      <p>🎿 Cours de ski du niveau débutant à confirmé avec des moniteurs ESF</p>
      <p>⛷️ Découverte du domaine skiable des Portes du Soleil</p>
      <p>🏔️ Activités après-ski : luge, patinoire, soirées jeux</p>
      <p>🍲 Pension complète dans un chalet confortable</p>
    `,
    infosPratiques: `
      <p>- Départ en car depuis Paris le samedi matin (point de rendez-vous communiqué à l'inscription)</p>
      <p>- Location de matériel de ski incluse</p>
      <p>- Assurance annulation et rapatriement incluse</p>
      <p>- Encadrement : 1 animateur pour 8 enfants</p>
    `,
    cadreDeVie: `
      <p>Hébergement en <strong>chalet tout confort</strong> au cœur de la station. Chambres de 4 à 6 personnes, salle de bains partagée, grande salle commune et coin repas.</p>
    `,
    formLink: "https://www.make-your-moment.com/inscription-ski-petits-1",
    galerie: [
      "https://images.unsplash.com/photo-1610397648930-477b8c7f0943?w=800&q=80",
      "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    ],
  },
  {
    id: "ski-chatel-ados",
    slug: "ski-chatel-ados",
    titre: "Séjour au Ski",
    lieu: "Châtel",
    region: "Alpes",
    ageLabel: "13 – 17 ans",
    ages: ["ados"],
    prix: 915,
    dateLabel: "28 Fév – 6 Mars 2026",
    dateDebut: "2026-02-28",
    dateFin: "2026-03-06",
    duree: "7 jours",
    periode: "hiver",
    categorie: "ados",
    places: 18,
    placesRestantes: 3,
    img: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=800&q=80",
    banniere: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=1600&q=80",
    Icon: Mountain,
    shortDescription: "Ski, liberté et bonne humeur pour les 13-17 ans sur les Portes du Soleil. Un séjour sports & découverte.",
    programme: `
      <p><strong>Du 28 février au 6 mars 2026</strong>, séjour ski spécial ados sur l'un des plus grands domaines skiables d'Europe.</p>
      <br/>
      <p>🎿 Perfectionnement ski freeride et piste noire</p>
      <p>🏂 Snowpark accessible</p>
      <p>🎮 Soirées thématiques et tournois sportifs</p>
      <p>🍕 Repas en collectivité avec participation à la préparation</p>
    `,
    infosPratiques: `
      <p>- Départ en car depuis Paris</p>
      <p>- Location de matériel incluse</p>
      <p>- Assurance multi-risques incluse</p>
      <p>- Encadrement par enseignants diplômés BAFA</p>
    `,
    cadreDeVie: `
      <p>Chalet indépendant dédié au groupe ados avec <strong>accès autonomie</strong> encadré, espaces détente et salle de jeux.</p>
    `,
    formLink: "https://www.make-your-moment.com/inscription-ski-grands-1",
    galerie: [
      "https://images.unsplash.com/photo-1610397648930-477b8c7f0943?w=800&q=80",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80",
    ],
  },
  {
    id: "ete-landes-enfants",
    slug: "ete-landes-enfants",
    titre: "Été dans les Landes",
    lieu: "Vieux-Boucau-les-Bains",
    region: "Landes",
    ageLabel: "6 – 11 ans",
    ages: ["enfants"],
    prix: 885,
    dateLabel: "12 – 19 Juil 2026",
    dateDebut: "2026-07-12",
    dateFin: "2026-07-19",
    duree: "8 jours",
    periode: "ete",
    categorie: "enfants",
    places: 24,
    placesRestantes: 12,
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    banniere: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80",
    Icon: Waves,
    shortDescription: "Plage, surf et aventure dans les Landes. 8 jours de pur bonheur au bord de l'Atlantique pour les 6-11 ans.",
    programme: `
      <p>Une semaine en bord d'océan avec activités nautiques et sportives encadrées.</p>
      <br/>
      <p>🏄 Initiation au surf avec école agréée</p>
      <p>🏖️ Jeux de plage, châteaux de sable, olympiades</p>
      <p>🚴 Balades à vélo dans la forêt landaise</p>
      <p>🎨 Ateliers créatifs et soirées à thème</p>
    `,
    infosPratiques: `
      <p>- Départ en car depuis Paris (Porte de Clichy)</p>
      <p>- Hébergement en centre de vacances homologué</p>
      <p>- Activités nautiques encadrées par des MNS</p>
    `,
    cadreDeVie: `
      <p>Centre de vacances <strong>en bord de lac</strong>, à 5 min à pied de la plage. Dortoirs de 6 à 8 enfants, sanitaires rénovés, grande salle d'animation.</p>
    `,
    formLink: "https://www.make-your-moment.com/inscription-ete-petits",
    galerie: [
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    ],
  },
  {
    id: "ete-landes-ados",
    slug: "ete-landes-ados",
    titre: "Été dans les Landes",
    lieu: "Vieux-Boucau-les-Bains",
    region: "Landes",
    ageLabel: "13 – 17 ans",
    ages: ["ados"],
    prix: 1395,
    dateLabel: "5 – 18 Juil 2026",
    dateDebut: "2026-07-05",
    dateFin: "2026-07-18",
    duree: "14 jours",
    periode: "ete",
    categorie: "ados",
    places: 20,
    placesRestantes: 8,
    img: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80",
    banniere: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1600&q=80",
    Icon: SunMedium,
    shortDescription: "14 jours de liberté surveillée pour les ados : surf, voile, canyoning et vie en collectivité dans les Landes.",
    programme: `
      <p>Deux semaines d'aventures en autonomie progressive pour les 13-17 ans.</p>
      <br/>
      <p>🏄 Surf perfectionnement (niveaux intermédiaire et avancé)</p>
      <p>⛵ Initiation voile sur le lac</p>
      <p>🧗 Accrobranche et VTT en forêt</p>
      <p>🏕️ Nuit bivouac encadrée</p>
      <p>👨‍🍳 Atelier cuisine et vie collective</p>
    `,
    infosPratiques: `
      <p>- Départ et retour en car depuis Paris</p>
      <p>- Toutes activités incluses</p>
      <p>- Encadrement 24h/24 par des animateurs diplômés</p>
    `,
    cadreDeVie: `
      <p>Villa partagée avec <strong>piscine</strong>, à proximité de l'océan. Organisation semi-autonome : les jeunes participent à la gestion du quotidien.</p>
    `,
    formLink: "https://www.make-your-moment.com/inscription-ete-grands",
    galerie: [],
  },
  {
    id: "senegal-ados",
    slug: "senegal-ados",
    titre: "Voyage au Sénégal",
    lieu: "Sénégal",
    region: "Afrique de l'Ouest",
    ageLabel: "12 – 17 ans",
    ages: ["ados"],
    prix: 2510,
    dateLabel: "16 – 29 Juil 2026",
    dateDebut: "2026-07-16",
    dateFin: "2026-07-29",
    duree: "14 jours",
    periode: "ete",
    categorie: "ados",
    places: 22,
    placesRestantes: 2,
    img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
    banniere: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1600&q=80",
    Icon: Globe,
    featured: true,
    shortDescription: "14 jours d'immersion culturelle au Sénégal : Dakar, Gorée, désert de Lompoul, rencontres locales et surf.",
    programme: `
      <p><strong>Du 16 au 29 juillet 2026</strong>, l'association Make Your Moment propose à 22 adolescents âgés de 13 à 17 ans de vivre une aventure inoubliable au cœur du Sénégal.</p>
      <br/>
      <p><u><strong>Au programme :</strong></u></p>
      <br/>
      <p>✨ Des découvertes incontournables : visites de Dakar, de l'île de Gorée, balade dans la Mangrove en pirogue, visite de la réserve de Bandia.</p>
      <p>✨ Des moments d'immersion : rencontres authentiques dans les villages, partage de la vie locale et découverte des traditions sénégalaises.</p>
      <p>✨ Des activités sportives : surf, quad, multisports, ateliers de musique et de danse, promenade à dos de dromadaire.</p>
      <p>✨ Une aventure unique dans le désert de Lompoul : deux nuits magiques sous les étoiles.</p>
      <p>✨ La vie en collectivité : participation à la préparation des repas et à la vie quotidienne.</p>
    `,
    infosPratiques: `
      <p>- Départ en avion depuis Paris avec Air France, vol direct pour Dakar.</p>
      <p>- Sur place, déplacements en transports privés réservés au groupe.</p>
      <p>- Le séjour est encadré par 3 animateurs expérimentés, tous enseignants ou éducateurs diplômés.</p>
    `,
    cadreDeVie: `
      <p>Séjour à <strong>La Somone</strong>, dans une grande maison située en bord de mer, à proximité de la lagune. Plus de 7 chambres, plusieurs salles de bain, <strong>piscine</strong>, espace détente et grande <strong>terrasse vue mer</strong>.</p>
    `,
    formLink: "https://www.make-your-moment.com/inscription-senegal",
    galerie: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
    ],
  },
  {
    id: "allemagne-ados",
    slug: "allemagne-ados",
    titre: "Séjour en Allemagne",
    lieu: "Allemagne",
    region: "Europe",
    ageLabel: "12 – 17 ans",
    ages: ["ados"],
    prix: 585,
    dateLabel: "28 Avr – 1er Mai 2026",
    dateDebut: "2026-04-28",
    dateFin: "2026-05-01",
    duree: "4 jours",
    periode: "printemps",
    categorie: "ados",
    places: 16,
    placesRestantes: 9,
    img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80",
    banniere: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1600&q=80",
    Icon: Landmark,
    shortDescription: "Court séjour découverte en Allemagne : culture, histoire et échanges interculturels pour les jeunes.",
    programme: `
      <p>Un week-end prolongé pour découvrir l'Allemagne autrement.</p>
      <br/>
      <p>🏰 Visites culturelles et historiques</p>
      <p>🎡 Sorties marché et découverte gastronomique</p>
      <p>🗣️ Échanges avec des jeunes allemands</p>
    `,
    infosPratiques: `
      <p>- Départ en car depuis Paris</p>
      <p>- Hébergement en auberge de jeunesse</p>
      <p>- Repas du soir et petits-déjeuners inclus</p>
    `,
    cadreDeVie: "Auberge de jeunesse moderne en centre-ville.",
    formLink: "https://www.make-your-moment.com/inscription-allemagne-jeunes",
    galerie: [],
  },
  {
    id: "meaux-seniors",
    slug: "meaux-seniors",
    titre: "Visite de Meaux",
    lieu: "Meaux, France",
    region: "Île-de-France",
    ageLabel: "Séniors",
    ages: ["seniors"],
    prix: 125,
    dateLabel: "Sam. 4 Avril 2026",
    dateDebut: "2026-04-04",
    dateFin: "2026-04-04",
    duree: "1 jour",
    periode: "printemps",
    categorie: "seniors",
    places: 30,
    placesRestantes: 18,
    img: "https://images.unsplash.com/photo-1549989476-69a92fa57c36?w=800&q=80",
    banniere: "https://images.unsplash.com/photo-1549989476-69a92fa57c36?w=1600&q=80",
    Icon: Flower2,
    shortDescription: "Journée conviviale à Meaux : visite de la cité épiscopale, musée de la Brie et dégustation locale.",
    programme: `
      <p>Une belle journée de découverte et de convivialité dans la cité de Bossuet.</p>
      <br/>
      <p>🏛️ Visite guidée de la cité épiscopale et ses jardins</p>
      <p>🎭 Musée de la Grande Guerre (facultatif)</p>
      <p>🧀 Dégustation de brie de Meaux AOP</p>
      <p>🍽️ Déjeuner au restaurant local inclus</p>
    `,
    infosPratiques: `
      <p>- Départ en car depuis Sucy-en-Brie à 8h30</p>
      <p>- Retour prévu vers 18h00</p>
      <p>- Déjeuner au restaurant inclus</p>
      <p>- Accompagnement par 2 animateurs</p>
    `,
    cadreDeVie: "Sortie à la journée. Aucun hébergement nécessaire.",
    formLink: "https://www.make-your-moment.com/sortie-senior-meaux",
    galerie: [],
  },
  {
    id: "deauville-seniors",
    slug: "deauville-seniors",
    titre: "Journée à la mer",
    lieu: "Deauville",
    region: "Normandie",
    ageLabel: "Séniors",
    ages: ["seniors"],
    prix: 50,
    dateLabel: "Dim. 23 Août 2026",
    dateDebut: "2026-08-23",
    dateFin: "2026-08-23",
    duree: "1 jour",
    periode: "ete",
    categorie: "seniors",
    places: 40,
    placesRestantes: 22,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    banniere: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=80",
    Icon: Anchor,
    shortDescription: "Une journée iodée à Deauville : les planches, la plage et les boutiques de la perle de la Côte Fleurie.",
    programme: `
      <p>Profitez d'une belle journée estivale au bord de la mer.</p>
      <br/>
      <p>🌊 Promenade sur les Planches de Deauville</p>
      <p>🏖️ Temps libre sur la plage</p>
      <p>🛍️ Visite du marché et des boutiques</p>
      <p>🍦 Déjeuner libre (restaurants proposés)</p>
    `,
    infosPratiques: `
      <p>- Départ en car depuis Sucy-en-Brie à 7h30</p>
      <p>- Retour prévu vers 20h00</p>
      <p>- Déjeuner libre (non inclus)</p>
    `,
    cadreDeVie: "Sortie à la journée. Aucun hébergement nécessaire.",
    formLink: "https://www.make-your-moment.com/sortie-jornee-a-la-mer",
    galerie: [],
  },
];

/* ─── CONSTANTS ─────────────────────────────────────────────────────────────── */
const CATS    = [{id:"tous",label:"Tous"},{id:"enfants",label:"Enfants"},{id:"ados",label:"Ados"},{id:"seniors",label:"Séniors"}];
const PERIODES= [{id:"tous",label:"Toutes saisons"},{id:"hiver",label:"Hiver"},{id:"printemps",label:"Printemps"},{id:"ete",label:"Été"}];
const NAV     = ["Accueil","Séjours","Qui sommes-nous","Séniors","Contact","FAQ"];

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
  const urgent = s.placesRestantes <= 3;
  return (
    <Link href={`/sejours/${s.slug}`} style={{textDecoration:"none"}}
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
            <span style={{fontSize:"10px",fontWeight:700,color:"white"}}>⚡ {s.placesRestantes} places restantes</span>
          </div>
        )}
        <div style={{position:"relative",height:"200px",overflow:"hidden"}}>
          <img src={s.img} alt={s.titre} style={{width:"100%",height:"100%",objectFit:"cover",transform:hovered?"scale(1.05)":"scale(1)",transition:"transform .5s ease"}}/>
          <div style={{position:"absolute",top:"12px",left:urgent?"auto":"12px",right:urgent?"auto":"auto",background:"rgba(255,255,255,0.93)",backdropFilter:"blur(6px)",borderRadius:"999px",padding:"4px 10px",display:"flex",alignItems:"center",gap:"5px",...(urgent?{display:"none"}:{})}}>
            <Calendar size={10} style={{color:C.teal}}/>
            <span style={{fontSize:"10px",fontWeight:700,color:C.teal}}>{s.dateLabel}</span>
          </div>
          {!urgent&&(
            <div style={{position:"absolute",top:"12px",left:"12px",background:"rgba(255,255,255,0.93)",backdropFilter:"blur(6px)",borderRadius:"999px",padding:"4px 10px",display:"flex",alignItems:"center",gap:"5px"}}>
              <Calendar size={10} style={{color:C.teal}}/>
              <span style={{fontSize:"10px",fontWeight:700,color:C.teal}}>{s.dateLabel}</span>
            </div>
          )}
          <div style={{position:"absolute",bottom:"12px",right:"12px",background:C.yellow,borderRadius:"999px",padding:"3px 10px",display:"flex",alignItems:"center",gap:"4px"}}>
            <Clock size={9} style={{color:C.teal}}/>
            <span style={{fontSize:"10px",fontWeight:700,color:C.teal}}>{s.duree}</span>
          </div>
        </div>

        <div style={{padding:"18px 20px 20px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:"8px",marginBottom:"4px"}}>
            <h3 style={{fontSize:"13px",fontWeight:800,color:C.teal,lineHeight:1.3,margin:0}}>{s.titre}</h3>
            <span style={{fontSize:"15px",fontWeight:900,color:C.saffron,whiteSpace:"nowrap"}}>{s.prix}€</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"5px",marginBottom:"3px"}}>
            <MapPin size={11} style={{color:C.saffron,flexShrink:0}}/>
            <span style={{fontSize:"11px",fontWeight:600,color:C.saffron}}>{s.lieu}</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"5px",marginBottom:"14px"}}>
            <Users size={11} style={{color:"#ccc",flexShrink:0}}/>
            <span style={{fontSize:"11px",color:"#aaa",fontWeight:500}}>{s.ageLabel}</span>
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

/* ─── PAGE SEJOURS ───────────────────────────────────────────────────────────── */
export default function SejoursPage() {
  const [cat, setCat]         = useState("tous");
  const [periode, setPeriode] = useState("tous");
  const [search, setSearch]   = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>40);
    window.addEventListener("scroll",fn);
    return()=>window.removeEventListener("scroll",fn);
  },[]);

  const filtered = SEJOURS.filter(s=>{
    const matchCat     = cat==="tous"||s.categorie===cat;
    const matchPeriode = periode==="tous"||s.periode===periode;
    const matchSearch  = !search||
      s.titre.toLowerCase().includes(search.toLowerCase())||
      s.lieu.toLowerCase().includes(search.toLowerCase());
    return matchCat&&matchPeriode&&matchSearch;
  });

  return (
    <div style={{fontFamily:"'Montserrat',sans-serif",background:C.arctic,color:C.teal,overflowX:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');
        *{font-family:'Montserrat',sans-serif;box-sizing:border-box;margin:0;padding:0;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        input::placeholder{color:#aab;}
        input:focus{outline:none;}
        a{color:inherit;}
      `}</style>

      {/* ── HERO PAGE ──────────────────────────────────────────────────────── */}
      <section style={{background:C.teal,padding:"64px 32px 80px",position:"relative",overflow:"hidden"}}>
        {/* Blobs décoratifs */}
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
              Des aventures inoubliables pour enfants, ados et séniors — encadrées par des enseignants diplômés.
            </p>
          </div>

          {/* Search bar */}
          <div style={{maxWidth:"560px",margin:"0 auto",background:"rgba(255,255,255,0.1)",backdropFilter:"blur(8px)",borderRadius:"16px",padding:"8px 16px",display:"flex",alignItems:"center",gap:"12px",border:"1px solid rgba(255,255,255,0.15)"}}>
            <Search size={16} style={{color:"rgba(255,255,255,0.5)",flexShrink:0}}/>
            <input
              value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Rechercher un séjour, une destination…"
              style={{flex:1,background:"transparent",border:"none",color:"white",fontSize:"13px",fontWeight:500,fontFamily:"Montserrat,sans-serif"}}
            />
            {search&&(
              <button onClick={()=>setSearch("")} style={{background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,0.5)"}}>
                <X size={14}/>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────────────────── */}
      <section style={{background:C.white,padding:"24px 32px",borderBottom:`1px solid ${C.arctic}`}}>
        <div style={{maxWidth:"1320px",margin:"0 auto",display:"flex",gap:"32px",flexWrap:"wrap",justifyContent:"center"}}>
          {[
            {n:`${SEJOURS.length}`,label:"séjours disponibles"},
            {n:"4",label:"saisons"},
            {n:"3",label:"catégories d'âge"},
            {n:"500+",label:"familles satisfaites"},
          ].map(({n,label},i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:"10px"}}>
              <span style={{fontSize:"20px",fontWeight:900,color:C.yellow}}>{n}</span>
              <span style={{fontSize:"12px",color:"#8aa",fontWeight:600}}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATALOGUE ──────────────────────────────────────────────────────── */}
      <section style={{padding:"48px 32px 96px"}}>
        <div style={{maxWidth:"1320px",margin:"0 auto"}}>

          {/* Filtres */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"32px",flexWrap:"wrap",gap:"16px"}}>
            <p style={{fontSize:"13px",color:"#8aa",fontWeight:600}}>
              <span style={{color:C.teal,fontWeight:800}}>{filtered.length}</span> séjour{filtered.length>1?"s":""} trouvé{filtered.length>1?"s":""}
            </p>

            <div style={{display:"flex",alignItems:"center",gap:"6px",background:C.white,borderRadius:"16px",padding:"6px",boxShadow:"0 2px 12px rgba(17,76,90,0.07)",flexWrap:"wrap"}}>
              {CATS.map(c=>(
                <button key={c.id} onClick={()=>setCat(c.id)} style={{fontSize:"11px",fontWeight:700,borderRadius:"10px",padding:"7px 14px",border:"none",cursor:"pointer",transition:"all .2s",background:cat===c.id?C.yellow:"transparent",color:C.teal,fontFamily:"Montserrat,sans-serif"}}>
                  {c.label}
                </button>
              ))}
              <div style={{width:"1px",height:"20px",background:"#eee",margin:"0 4px"}}/>
              {PERIODES.map(p=>(
                <button key={p.id} onClick={()=>setPeriode(p.id)} style={{fontSize:"11px",fontWeight:700,borderRadius:"10px",padding:"7px 14px",border:"none",cursor:"pointer",transition:"all .2s",background:periode===p.id?C.teal:"transparent",color:periode===p.id?"white":C.teal,fontFamily:"Montserrat,sans-serif"}}>
                  {p.label}
                </button>
              ))}
              {(cat!=="tous"||periode!=="tous"||search)&&(
                <button onClick={()=>{setCat("tous");setPeriode("tous");setSearch("");}} style={{display:"flex",alignItems:"center",gap:"4px",fontSize:"11px",fontWeight:700,color:C.saffron,background:"none",border:"none",cursor:"pointer",marginLeft:"4px",fontFamily:"Montserrat,sans-serif"}}>
                  <X size={11}/> Reset
                </button>
              )}
            </div>
          </div>

          {/* Grille */}
          {filtered.length>0?(
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"18px"}}>
              {filtered.map((s,i)=><SejourCard key={s.id} s={s} idx={i}/>)}
            </div>
          ):(
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"80px 0",color:"#ccc"}}>
              <Globe size={40} strokeWidth={1} style={{marginBottom:"12px"}}/>
              <p style={{fontSize:"14px",fontWeight:600,color:"#8aaa"}}>Aucun séjour ne correspond à votre recherche.</p>
              <button onClick={()=>{setCat("tous");setPeriode("tous");setSearch("");}} style={{marginTop:"16px",background:C.yellow,color:C.teal,border:"none",borderRadius:"999px",padding:"10px 24px",fontSize:"12px",fontWeight:700,cursor:"pointer",fontFamily:"Montserrat,sans-serif"}}>
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
              <a href="tel:+33698965002" style={{display:"flex",alignItems:"center",gap:"8px",background:C.yellow,color:C.teal,fontSize:"12px",fontWeight:800,borderRadius:"999px",padding:"14px 28px",textDecoration:"none"}}>
                📞 Nous appeler
              </a>
              <a href="mailto:mym.makeyourmoment@gmail.com" style={{display:"flex",alignItems:"center",gap:"8px",background:"transparent",color:C.white,fontSize:"12px",fontWeight:700,borderRadius:"999px",padding:"14px 28px",textDecoration:"none",border:"2px solid rgba(255,255,255,0.25)"}}>
                ✉️ Nous écrire
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
