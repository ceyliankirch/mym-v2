"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin, Calendar, Users, Clock, Shield, CreditCard, Award,
  ChevronRight, ArrowRight, ArrowLeft, CheckCircle2,
  Phone, Mail, Heart, Share2, ChevronLeft
} from "lucide-react";
import { SEJOURS } from "../page"; // ← importe les données depuis /sejours/page.jsx

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
            <Link key={i} href={i===1?"/sejours":i===0?"/":"#"} style={{fontSize:"11px",fontWeight:i===1?800:700,padding:"8px 16px",borderRadius:"999px",textDecoration:"none",background:i===1?C.yellow:"transparent",color:C.teal,transition:"all .2s"}}>
              {l}
            </Link>
          ))}
        </nav>

        <Link href="/contact" style={{display:"flex",alignItems:"center",gap:"8px",background:C.teal,color:C.yellow,fontSize:"11px",fontWeight:700,borderRadius:"999px",padding:"10px 22px",textDecoration:"none"}}>
          Réserver <ArrowRight size={13}/>
        </Link>
      </div>
    </header>
  );
}

/* ─── GALERIE ────────────────────────────────────────────────────────────────── */
function Galerie({ images }) {
  const [active, setActive] = useState(0);
  if (!images?.length) return null;
  return (
    <div style={{marginTop:"48px"}}>
      <p style={{fontSize:"11px",fontWeight:700,color:C.saffron,textTransform:"uppercase",letterSpacing:"2px",marginBottom:"16px"}}>Photos du séjour</p>
      <div style={{borderRadius:"20px",overflow:"hidden",height:"360px",marginBottom:"12px",position:"relative"}}>
        <img src={images[active]} alt="galerie" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
        {images.length>1&&(
          <>
            <button onClick={()=>setActive(p=>(p-1+images.length)%images.length)} style={{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",background:"rgba(255,255,255,0.9)",border:"none",borderRadius:"50%",width:"36px",height:"36px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
              <ChevronLeft size={16} style={{color:C.teal}}/>
            </button>
            <button onClick={()=>setActive(p=>(p+1)%images.length)} style={{position:"absolute",right:"12px",top:"50%",transform:"translateY(-50%)",background:"rgba(255,255,255,0.9)",border:"none",borderRadius:"50%",width:"36px",height:"36px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
              <ChevronRight size={16} style={{color:C.teal}}/>
            </button>
          </>
        )}
      </div>
      {images.length>1&&(
        <div style={{display:"flex",gap:"8px",overflowX:"auto"}}>
          {images.map((img,i)=>(
            <div key={i} onClick={()=>setActive(i)} style={{borderRadius:"10px",overflow:"hidden",height:"64px",width:"96px",flexShrink:0,cursor:"pointer",border:active===i?`3px solid ${C.yellow}`:"3px solid transparent",transition:"border .2s"}}>
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
  const urgent = sejour.placesRestantes <= 3;

  return (
    <div style={{position:"sticky",top:"90px",background:C.white,borderRadius:"24px",padding:"28px",boxShadow:"0 8px 40px rgba(17,76,90,0.12)"}}>
      {/* Prix */}
      <div style={{marginBottom:"20px",paddingBottom:"20px",borderBottom:`1px solid ${C.arctic}`}}>
        <p style={{fontSize:"11px",color:"#8aa",fontWeight:600,marginBottom:"4px",textTransform:"uppercase",letterSpacing:"1px"}}>Prix par personne</p>
        <div style={{display:"flex",alignItems:"baseline",gap:"8px"}}>
          <span style={{fontSize:"2.4rem",fontWeight:900,color:C.teal,lineHeight:1}}>{sejour.prix}€</span>
        </div>
        <p style={{fontSize:"11px",color:"#8aa",marginTop:"4px"}}>Paiement jusqu'à 8× sans frais</p>
      </div>

      {/* Infos clés */}
      <div style={{display:"flex",flexDirection:"column",gap:"12px",marginBottom:"20px"}}>
        {[
          {Icon:Calendar, label:"Dates", val:sejour.dateLabel},
          {Icon:Clock,    label:"Durée", val:sejour.duree},
          {Icon:MapPin,   label:"Lieu",  val:sejour.lieu},
          {Icon:Users,    label:"Âge",   val:sejour.ageLabel},
          {Icon:Users,    label:"Places",val:`${sejour.placesRestantes} restantes / ${sejour.places}`},
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

      {/* Urgence */}
      {urgent&&(
        <div style={{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:"12px",padding:"10px 14px",marginBottom:"16px",display:"flex",alignItems:"center",gap:"8px"}}>
          <span style={{fontSize:"16px"}}>⚡</span>
          <p style={{fontSize:"12px",fontWeight:700,color:"#dc2626"}}>Plus que {sejour.placesRestantes} places disponibles !</p>
        </div>
      )}

      {/* CTA inscription */}
      <a href={sejour.formLink} target="_blank" rel="noopener noreferrer"
        style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",background:C.yellow,color:C.teal,fontSize:"13px",fontWeight:800,borderRadius:"999px",padding:"16px",textDecoration:"none",marginBottom:"12px",boxShadow:"0 6px 20px rgba(255,200,1,0.35)",width:"100%"}}>
        S'inscrire maintenant <ArrowRight size={14}/>
      </a>

      {/* Actions secondaires */}
      <div style={{display:"flex",gap:"8px"}}>
        <button onClick={()=>setLiked(!liked)} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",background:C.arctic,border:"none",borderRadius:"999px",padding:"10px",cursor:"pointer",fontSize:"11px",fontWeight:700,color:liked?"#ef4444":C.teal,fontFamily:"Montserrat,sans-serif"}}>
          <Heart size={13} style={{fill:liked?"#ef4444":"none",color:liked?"#ef4444":C.teal}}/> Favoris
        </button>
        <button onClick={()=>navigator?.share?.({title:sejour.titre,url:window.location.href})} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",background:C.arctic,border:"none",borderRadius:"999px",padding:"10px",cursor:"pointer",fontSize:"11px",fontWeight:700,color:C.teal,fontFamily:"Montserrat,sans-serif"}}>
          <Share2 size={13}/> Partager
        </button>
      </div>

      {/* Contact */}
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

/* ─── PAGE DETAIL ────────────────────────────────────────────────────────────── */
export default function SejourDetailPage({ params }) {
  const { slug } = params;
  const sejour = SEJOURS.find(s=>s.slug===slug);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("programme");

  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>40);
    window.addEventListener("scroll",fn);
    return()=>window.removeEventListener("scroll",fn);
  },[]);

  if (!sejour) return (
    <div style={{fontFamily:"Montserrat,sans-serif",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"60vh",padding:"40px"}}>
      <h1 style={{color:C.teal,fontSize:"2rem",fontWeight:900}}>Séjour introuvable</h1>
      <Link href="/sejours" style={{marginTop:"20px",background:C.yellow,color:C.teal,borderRadius:"999px",padding:"12px 28px",textDecoration:"none",fontWeight:700}}>
        Voir tous les séjours
      </Link>
    </div>
  );

  const TABS = [
    {id:"programme",  label:"Programme"},
    {id:"pratique",   label:"Infos pratiques"},
    {id:"cadre",      label:"Cadre de vie"},
  ];

  const autres = SEJOURS.filter(s=>s.id!==sejour.id&&s.categorie===sejour.categorie).slice(0,3);

  return (
    <div style={{fontFamily:"'Montserrat',sans-serif",background:C.arctic,color:C.teal,overflowX:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');
        *{font-family:'Montserrat',sans-serif;box-sizing:border-box;margin:0;padding:0;}
        a{color:inherit;}
        .rich-text p{margin-bottom:10px;font-size:14px;line-height:1.85;color:#5a7a84;}
        .rich-text strong{font-weight:700;color:#114C5A;}
        .rich-text u{text-decoration:underline;}
        .rich-text br{display:block;margin:4px 0;}
      `}</style>

      <Header scrolled={scrolled}/>

      {/* ── BANNIERE ──────────────────────────────────────────────────────── */}
      <section style={{position:"relative",height:"460px",overflow:"hidden"}}>
        <img src={sejour.banniere||sejour.img} alt={sejour.titre} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(17,76,90,0.85) 0%,rgba(17,76,90,0.15) 50%,transparent 100%)"}}/>

        {/* Breadcrumb flottant */}
        <div style={{position:"absolute",top:"24px",left:"32px",display:"flex",alignItems:"center",gap:"8px"}}>
          <Link href="/sejours" style={{display:"flex",alignItems:"center",gap:"6px",background:"rgba(255,255,255,0.15)",backdropFilter:"blur(6px)",borderRadius:"999px",padding:"6px 14px",textDecoration:"none",color:"white",fontSize:"12px",fontWeight:600}}>
            <ArrowLeft size={12}/> Tous les séjours
          </Link>
        </div>

        {/* Info bas de bannière */}
        <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"28px 32px"}}>
          <div style={{maxWidth:"1320px",margin:"0 auto"}}>
            <div style={{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"}}>
              <div style={{background:"rgba(255,255,255,0.15)",backdropFilter:"blur(6px)",borderRadius:"999px",padding:"5px 14px"}}>
                <span style={{fontSize:"11px",fontWeight:700,color:"white"}}>{sejour.ageLabel}</span>
              </div>
              <div style={{background:C.yellow,borderRadius:"999px",padding:"5px 14px"}}>
                <span style={{fontSize:"11px",fontWeight:700,color:C.teal}}>{sejour.duree}</span>
              </div>
              <div style={{background:"rgba(255,255,255,0.15)",backdropFilter:"blur(6px)",borderRadius:"999px",padding:"5px 14px",display:"flex",alignItems:"center",gap:"5px"}}>
                <Calendar size={10} style={{color:"white"}}/>
                <span style={{fontSize:"11px",fontWeight:700,color:"white"}}>{sejour.dateLabel}</span>
              </div>
              {sejour.placesRestantes<=3&&(
                <div style={{background:"#ef4444",borderRadius:"999px",padding:"5px 14px"}}>
                  <span style={{fontSize:"11px",fontWeight:700,color:"white"}}>⚡ {sejour.placesRestantes} places restantes</span>
                </div>
              )}
            </div>

            <h1 style={{fontWeight:900,color:C.white,fontSize:"clamp(1.8rem,4vw,3rem)",letterSpacing:"-1px",marginBottom:"8px"}}>
              {sejour.titre}
            </h1>
            <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
              <MapPin size={14} style={{color:C.yellow}}/>
              <span style={{color:"rgba(255,255,255,0.8)",fontSize:"14px",fontWeight:600}}>{sejour.lieu} — {sejour.region}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTENT ───────────────────────────────────────────────────────── */}
      <div style={{maxWidth:"1320px",margin:"0 auto",padding:"48px 32px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 380px",gap:"48px",alignItems:"start"}}>

          {/* ── COL GAUCHE ─────────────────────────────────────────────────── */}
          <div>
            {/* Résumé */}
            <div style={{background:C.white,borderRadius:"20px",padding:"28px",marginBottom:"24px",boxShadow:"0 2px 16px rgba(17,76,90,0.06)"}}>
              <p style={{fontSize:"11px",fontWeight:700,color:C.saffron,textTransform:"uppercase",letterSpacing:"2px",marginBottom:"10px"}}>En bref</p>
              <p style={{fontSize:"15px",color:"#5a7a84",lineHeight:1.8,fontWeight:500}}>{sejour.shortDescription}</p>

              {/* Badges garanties */}
              <div style={{display:"flex",flexWrap:"wrap",gap:"10px",marginTop:"20px",paddingTop:"20px",borderTop:`1px solid ${C.arctic}`}}>
                {[
                  {Icon:Shield,     text:"Assurance incluse"},
                  {Icon:CreditCard, text:"Paiement 8× sans frais"},
                  {Icon:Award,      text:"Encadrants diplômés"},
                  {Icon:CheckCircle2,text:"Places limitées"},
                ].map(({Icon,text},i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:"6px",background:C.arctic,borderRadius:"999px",padding:"6px 12px"}}>
                    <Icon size={12} style={{color:C.teal}}/>
                    <span style={{fontSize:"11px",fontWeight:700,color:C.teal}}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div style={{background:C.white,borderRadius:"20px",overflow:"hidden",boxShadow:"0 2px 16px rgba(17,76,90,0.06)"}}>
              {/* Tab nav */}
              <div style={{display:"flex",borderBottom:`1px solid ${C.arctic}`}}>
                {TABS.map(t=>(
                  <button key={t.id} onClick={()=>setActiveTab(t.id)} style={{
                    flex:1,padding:"16px",fontSize:"12px",fontWeight:700,border:"none",cursor:"pointer",
                    background:"transparent",fontFamily:"Montserrat,sans-serif",transition:"all .2s",
                    color:activeTab===t.id?C.teal:"#8aa",
                    borderBottom:activeTab===t.id?`3px solid ${C.yellow}`:"3px solid transparent",
                  }}>
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div style={{padding:"28px"}}>
                {activeTab==="programme"&&(
                  <div className="rich-text" dangerouslySetInnerHTML={{__html:sejour.programme}}/>
                )}
                {activeTab==="pratique"&&(
                  <div className="rich-text" dangerouslySetInnerHTML={{__html:sejour.infosPratiques}}/>
                )}
                {activeTab==="cadre"&&(
                  typeof sejour.cadreDeVie==="string"&&sejour.cadreDeVie.startsWith("<")
                    ? <div className="rich-text" dangerouslySetInnerHTML={{__html:sejour.cadreDeVie}}/>
                    : <p style={{fontSize:"14px",color:"#5a7a84",lineHeight:1.85}}>{sejour.cadreDeVie}</p>
                )}
              </div>
            </div>

            {/* Galerie */}
            {sejour.galerie?.length>0&&(
              <div style={{background:C.white,borderRadius:"20px",padding:"28px",marginTop:"24px",boxShadow:"0 2px 16px rgba(17,76,90,0.06)"}}>
                <Galerie images={sejour.galerie}/>
              </div>
            )}

            {/* CTA mobile (visible sur petits écrans) */}
            <div style={{marginTop:"32px",display:"none"}} className="mobile-cta">
              <a href={sejour.formLink} target="_blank" rel="noopener noreferrer"
                style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",background:C.yellow,color:C.teal,fontSize:"14px",fontWeight:800,borderRadius:"999px",padding:"18px",textDecoration:"none",boxShadow:"0 6px 20px rgba(255,200,1,0.35)"}}>
                S'inscrire — {sejour.prix}€ <ArrowRight size={14}/>
              </a>
            </div>
          </div>

          {/* ── COL DROITE — SIDEBAR ────────────────────────────────────────── */}
          <StickySidebar sejour={sejour}/>
        </div>

        {/* ── AUTRES SÉJOURS SIMILAIRES ──────────────────────────────────── */}
        {autres.length>0&&(
          <section style={{marginTop:"80px"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"28px"}}>
              <div>
                <p style={{fontSize:"11px",fontWeight:700,color:C.saffron,textTransform:"uppercase",letterSpacing:"2px",marginBottom:"6px"}}>À découvrir aussi</p>
                <h2 style={{fontWeight:900,color:C.teal,fontSize:"1.6rem",letterSpacing:"-0.5px"}}>Séjours similaires</h2>
              </div>
              <Link href="/sejours" style={{display:"flex",alignItems:"center",gap:"6px",fontSize:"12px",fontWeight:700,color:C.teal,textDecoration:"none",background:C.white,padding:"10px 20px",borderRadius:"999px",boxShadow:"0 2px 12px rgba(17,76,90,0.07)"}}>
                Voir tout <ArrowRight size={13}/>
              </Link>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"18px"}}>
              {autres.map((s,i)=>(
                <Link key={s.id} href={`/sejours/${s.slug}`} style={{textDecoration:"none"}}>
                  <div style={{background:C.white,borderRadius:"20px",overflow:"hidden",boxShadow:"0 2px 16px rgba(17,76,90,0.07)",transition:"all .3s"}}
                    onMouseEnter={e=>e.currentTarget.style.transform="translateY(-4px)"}
                    onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
                    <div style={{height:"160px",overflow:"hidden"}}>
                      <img src={s.img} alt={s.titre} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                    </div>
                    <div style={{padding:"16px"}}>
                      <h4 style={{fontSize:"13px",fontWeight:800,color:C.teal,marginBottom:"4px"}}>{s.titre}</h4>
                      <p style={{fontSize:"11px",color:C.saffron,fontWeight:600,marginBottom:"8px"}}>{s.lieu} · {s.duree}</p>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <span style={{fontSize:"14px",fontWeight:900,color:C.teal}}>{s.prix}€</span>
                        <span style={{fontSize:"10px",fontWeight:600,color:"#8aa"}}>{s.ageLabel}</span>
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
