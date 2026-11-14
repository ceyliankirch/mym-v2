// app/qui-sommes-nous/QuiSommesNousClient.jsx
"use client";
import { useState } from "react";
import {
  Users, CheckCircle2,
  ArrowRight, Award, Target, MapPin, ChevronLeft, ChevronRight
} from "lucide-react";

const ANIMATEURS_PAR_PAGE = 12;

// Pastilles de l'équipe : fond pastel + couleur (vive) des étiquettes de prénom, attribuées à tour de rôle
const COULEURS_EQUIPE = [
  { fond: "#FFE08A", etiquette: "#FFC801", texte: "#114C5A" },
  { fond: "#FFB8CE", etiquette: "#FF3D7F", texte: "#ffffff" },
  { fond: "#A8E6CB", etiquette: "#12C57F", texte: "#04342C" },
  { fond: "#B9C7FF", etiquette: "#2F5BFF", texte: "#ffffff" },
  { fond: "#FFC9A3", etiquette: "#FF7A2F", texte: "#ffffff" },
  { fond: "#DDBFF2", etiquette: "#B75CE0", texte: "#ffffff" },
];

export default function QuiSommesNousClient({ equipe }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil((equipe?.length || 0) / ANIMATEURS_PAR_PAGE));
  const equipePage = (equipe || []).slice((page - 1) * ANIMATEURS_PAR_PAGE, page * ANIMATEURS_PAR_PAGE);

  const goToPage = (p) => {
    setPage(Math.min(Math.max(1, p), totalPages));
  };

  return (
    <div className="min-h-screen bg-[#F1F6F4] text-[#114C5A] font-sans overflow-x-hidden selection:bg-[#FFC801] selection:text-[#114C5A]">

      {/* ── HERO SECTION ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#F1F6F4]">
        {/* Décors : gribouillis et étoile */}
        <svg aria-hidden viewBox="0 0 300 400" className="hidden md:block absolute right-0 top-0 h-[75%] opacity-90" fill="none" stroke="#FFB8CE" strokeWidth="24" strokeLinecap="round">
          <path d="M260 10 C 150 40, 300 120, 190 170 S 120 290, 230 380" />
        </svg>
        <svg aria-hidden viewBox="0 0 40 40" className="absolute left-[48%] top-[46%] w-14 hidden lg:block" fill="#C6F000">
          <path d="M20 0l4 14 14-4-10 10 10 10-14-4-4 14-4-14-14 4 10-10L2 10l14 4z" />
        </svg>

        <div className="relative max-w-[1320px] mx-auto px-8 pt-14 lg:pt-16 lg:h-[440px]">
          <div className="animate-[fadeUp_0.8s_ease_both] max-w-[720px]">
            <p className="text-sm lg:text-base font-bold text-[#114C5A] mb-4">
              Des enseignants et des éducateurs diplômés, passionnés par les vacances des enfants
            </p>
            <h1 className="font-black leading-[0.95] tracking-tight text-[clamp(2.4rem,4.6vw,4.6rem)]">
              <span className="block text-[#114C5A] whitespace-nowrap">Qui sommes-</span>
              <span className="block text-[#C6F000]">nous ?</span>
            </h1>
            <p className="mt-6 text-[#41545c] max-w-md leading-relaxed">
              Une équipe soudée, des séjours pensés pour que chaque enfant vive de vrais moments.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="/sejours-enfants-ados" className="bg-[#C6F000] text-[#114C5A] font-extrabold text-sm px-7 py-3 rounded-full hover:-translate-y-0.5 transition-transform">Nos séjours</a>
              <a href="#equipe" className="bg-[#FFC801] text-[#114C5A] font-extrabold text-sm px-7 py-3 rounded-full hover:-translate-y-0.5 transition-transform">Rencontrer l&apos;équipe</a>
            </div>
          </div>

          {/* L'équipe détourée, sur le côté */}
          <img
            src="/QSN/QSN-equipe-detoure.webp"
            alt="L'équipe Make Your Moment, bonnets jaune fluo"
            className="relative lg:absolute lg:right-0 lg:bottom-0 lg:h-full lg:w-auto lg:max-w-[64%] lg:object-contain lg:object-right-bottom w-full max-w-full mt-8 lg:mt-0 mx-auto animate-[fadeUp_0.8s_ease_0.2s_both] z-10"
          />
        </div>
      </section>

      {/* ── À PROPOS DE NOUS (contenu repris de l'ancien site) ──────────────── */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-[900px] mx-auto text-center">
          <p className="text-xs font-bold text-[#FF9932] uppercase tracking-widest mb-3">À propos de nous</p>
          <h2 className="text-3xl lg:text-4xl font-black text-[#114C5A] tracking-tight mb-8">Notre histoire</h2>
          <div className="space-y-5 text-[#5a7a84] text-base leading-relaxed text-left">
            <p>
              L'association Make Your Moment a été créée par des parents : une enseignante, professeure d'EPS et un éducateur sportif, responsable d'une école multisports.
            </p>
            <p>
              Nous souhaitions par-dessus tout, proposer un encadrement de qualité aux parents et à leurs enfants.
            </p>
            <p>
              Make Your Moment développe et organise des séjours de vacances et des sorties destinés aux enfants, aux adolescents mais également aux séniors, avec pour objectif de proposer des activités qui font sens pour être acteur de son expérience !
            </p>
            <p>
              Durant nos séjours et nos sorties, nous concevons des programmes adaptés aux envies réelles de nos participants : découverte, immersion, créativité, sport, nature, culture… Dans le respect de l'environnement, en privilégiant des pratiques responsables et durables. Nos séjours mêlent liberté, autonomie, exploration et développement personnel.
            </p>
          </div>
        </div>
      </section>

      {/* ── NOTRE CONCEPT (contenu repris de l'ancien site) ──────────────────── */}
      <section className="bg-[#114C5A] py-20 px-8">
        <div className="max-w-[900px] mx-auto text-center">
          <p className="text-xs font-bold text-[#FFC801] uppercase tracking-widest mb-3">Notre concept</p>
          <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-8">
            Make Your Moment souhaite rassurer les parents avec un encadrement de qualité !
          </h2>
          <div className="space-y-5 text-white/75 text-base leading-relaxed text-left">
            <p>
              Il est malheureusement devenu trop fréquent d'entendre des parents dire qu'ils n'enverront jamais leur enfant en colonie de vacances par manque de confiance en l'encadrement.
            </p>
            <p>
              Vous faites peut-être partie des personnes qui pensent ainsi ! Sachez que nous aussi, on pouvait le penser. C'est pourquoi, l'association Make Your Moment s'est créée !
            </p>
            <p className="font-black text-white text-lg">
              Make Your Moment met l'accent sur l'<span className="text-[#FFC801]">ENCADREMENT</span> !
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION : L'ÉQUIPE (DATA DEPUIS NEON) ────────────────── */}
      <section id="equipe" className="relative overflow-hidden bg-[#F1F6F4] py-24 px-8 scroll-mt-24">
        {/* Points décoratifs */}
        <span aria-hidden className="hidden md:block absolute top-24 left-[6%] w-6 h-6 rounded-full bg-[#FFB3D1]" />
        <span aria-hidden className="hidden md:block absolute top-[38%] right-[4%] w-7 h-7 rounded-full bg-[#d9dee2]" />
        <span aria-hidden className="hidden md:block absolute top-[55%] left-[3%] w-5 h-5 rounded-full bg-[#d9dee2]" />
        <span aria-hidden className="hidden md:block absolute bottom-32 right-[10%] w-6 h-6 rounded-full bg-[#7fdcc0]" />
        <span aria-hidden className="hidden md:block absolute bottom-16 left-[12%] w-7 h-7 rounded-full bg-[#d9dee2]" />
        <div className="relative max-w-[1320px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-[#FFC801] uppercase tracking-widest mb-3">Rencontrez-nous</p>
            <h2 className="text-3xl lg:text-5xl font-black text-[#114C5A] tracking-tight">Tous enseignants & des éducateurs diplômés</h2>
            <p className="text-[#5a7a84] mt-6 max-w-2xl mx-auto">
              Tous nos séjours de vacances sont encadrés exclusivement par des enseignants de l'Éducation nationale et des éducateurs diplômés. Pour rassurer pleinement les familles : l'encadrement est au cœur de notre engagement !
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-14 pb-8">
            {equipe && equipe.length > 0 ? (
              equipePage.map((anim, i) => (
                <div key={anim.id} className="group flex flex-col items-center text-center lg:[&:nth-child(even)]:translate-y-10">
                  <div className="relative">
                    {/* Pastille de couleur : la photo détourée (PNG/WebP transparent) s'y pose */}
                    <div
                      className="w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52 rounded-full overflow-hidden relative transition-transform duration-300 group-hover:scale-105"
                      style={{ background: COULEURS_EQUIPE[i % COULEURS_EQUIPE.length].fond }}
                    >
                      {anim.imageUrl ? (
                        <img src={anim.imageUrl} alt={anim.nom} className="absolute inset-0 w-full h-full object-contain object-bottom" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Users size={40} className="text-white/70" />
                        </div>
                      )}
                    </div>
                    {/* Étiquette du prénom */}
                    <span
                      className={`absolute top-1 ${i % 2 === 0 ? "-left-3 sm:-left-5" : "-right-3 sm:-right-5"} font-black text-sm sm:text-base px-4 py-1.5 rounded-2xl shadow-sm whitespace-nowrap -rotate-3`}
                      style={{ background: COULEURS_EQUIPE[(i + 3) % COULEURS_EQUIPE.length].etiquette, color: COULEURS_EQUIPE[(i + 3) % COULEURS_EQUIPE.length].texte }}
                    >
                      {anim.nom}
                    </span>
                  </div>
                  <p className="mt-5 text-[10px] font-bold text-[#FF9932] uppercase tracking-widest">{anim.role}</p>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Users size={48} className="mx-auto text-[#8aaa] opacity-20 mb-4" />
                <p className="text-[#8aaa] font-medium">L'équipe est en cours de constitution pour la saison 2026...</p>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-14">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-[#114C5A]/15 text-[#114C5A] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-colors"
                aria-label="Page précédente"
              >
                <ChevronLeft size={18} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    p === page ? "bg-[#FFC801] text-[#114C5A]" : "text-[#114C5A] hover:bg-white"
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-[#114C5A]/15 text-[#114C5A] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-colors"
                aria-label="Page suivante"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── L'ÉQUIPE DE DIRECTION ─────────────────────────────────────────── */}
      <section className="py-24 px-8 bg-[#114C5A]">
        <div className="max-w-[1320px] mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <p className="text-xs font-bold text-[#FFC801] uppercase tracking-widest mb-4">L'Équipe de direction</p>
            <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tight mb-6">
              Savoir à qui l'on confie nos enfants ne doit pas être une option !
            </h2>
            <p className="text-white/70 text-base leading-relaxed mb-8">
              Make Your Moment vous garantit professionnalisme, sécurité et bienveillance. Notre mission : offrir des vacances qui marquent, qui élèvent, qui ouvrent des horizons et surtout qui donnent aux familles une confiance absolue ! Fort de notre réseau, nous connaissons personnellement tous nos animateurs et nos directeurs, et les parents aussi pourront faire leur connaissance lors de nos réunions d'information qui précèdent nos séjours de vacances.
            </p>
            
            <ul className="space-y-4 mb-10">
              {[
                "Directeurs BAFD et Enseignants certifiés",
                "Équipe d'animation titulaire du BAFA",
                "Assistants sanitaires sur chaque séjour",
                "Partenaires locaux triés sur le volet"
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <CheckCircle2 size={20} className="text-[#FFC801] shrink-0" />
                  <span className="text-sm font-semibold text-white">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 w-full grid grid-cols-2 gap-4">
            <div className="space-y-4 mt-8">
              <img src="QSN/QSN-04.webp" alt="Activité" className="w-full h-48 object-cover rounded-[24px]" />
              <div className="bg-[#FFC801] p-6 rounded-[24px] text-[#114C5A]">
                <Award size={32} className="mb-4 opacity-80" />
                <p className="text-3xl font-black leading-none mb-2">100%</p>
                <p className="text-xs font-bold uppercase tracking-wide opacity-80">Encadrants qualifiés</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-[#EFDEF9] p-6 rounded-[24px] text-[#114C5A]">
                <Target size={32} className="mb-4 opacity-80" />
                <p className="text-3xl font-black leading-none mb-2">500+</p>
                <p className="text-xs font-bold uppercase tracking-wide opacity-80">Enfants partis</p>
              </div>
              <img src="QSN/QSN-05.webp" alt="Sourire" className="w-full h-64 object-cover rounded-[24px]" />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA CONTACT ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-8 bg-[#F1F6F4]">
        <div className="max-w-[800px] mx-auto text-center bg-white p-12 lg:p-16 rounded-[40px] shadow-2xl shadow-[#114c5a08]">
          <div className="w-20 h-20 bg-[#FFC801]/20 rounded-[24px] flex items-center justify-center mx-auto mb-8">
            <MapPin size={32} className="text-[#114C5A]" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-[#114C5A] tracking-tight mb-4">
            Une question ? Envie d'en savoir plus ?
          </h2>
          <p className="text-[#5a7a84] text-sm lg:text-base leading-relaxed mb-10 max-w-lg mx-auto">
            Notre équipe associative est à votre disposition pour répondre à toutes vos interrogations sur nos séjours et nos modalités de paiement (8x sans frais).
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#FFC801] hover:bg-[#FF9932] text-[#114C5A] hover:text-white text-sm font-extrabold py-4 px-8 rounded-full transition-all duration-300 shadow-lg shadow-[#FFC801]/40">
              Nous contacter <ArrowRight size={16} />
            </button>
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent text-[#114C5A] hover:bg-[#F1F6F4] border-2 border-[#114C5A] text-sm font-bold py-4 px-8 rounded-full transition-all duration-300">
              Voir la FAQ
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}