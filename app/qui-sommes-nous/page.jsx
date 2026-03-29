"use client";
import { 
  Shield, Users, GraduationCap, Heart, CheckCircle2, 
  ArrowRight, Award, Target, MapPin 
} from "lucide-react";

export default function QuiSommesNous() {
  return (
    <div className="min-h-screen bg-[#F1F6F4] text-[#114C5A] font-sans overflow-x-hidden selection:bg-[#FFC801] selection:text-[#114C5A]">
      
      {/* ── HERO SECTION ──────────────────────────────────────────────────────── */}
      <section className="relative px-8 pt-24 pb-20 max-w-[1320px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        <div className="flex-1 w-full animate-[fadeUp_0.8s_ease_both]">
          <div className="inline-flex items-center gap-2 bg-[#EFDEF9] rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#FFC801] shrink-0" />
            <span className="text-xs font-bold text-[#114C5A] uppercase tracking-wider">Notre Histoire</span>
          </div>
          <h1 className="font-black leading-[1.1] tracking-tight mb-6 text-5xl lg:text-7xl text-[#114C5A]">
            Créateurs de <br />
            <span className="text-[#FFC801]">souvenirs</span> <br />
            depuis 2023.
          </h1>
          <p className="text-[#5a7a84] text-base lg:text-lg leading-relaxed mb-8 max-w-lg">
            Make Your Moment est une association loi 1901 basée à Sucy-en-Brie. Notre mission ? Créer des séjours enrichissants, sécurisés et mémorables pour les enfants, les adolescents et nos aînés.
          </p>
          <div className="flex flex-wrap gap-6 items-center">
            <div className="flex -space-x-3">
              <img className="w-12 h-12 rounded-full border-2 border-[#F1F6F4] object-cover" src="https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=100&q=80" alt="Team" />
              <img className="w-12 h-12 rounded-full border-2 border-[#F1F6F4] object-cover" src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80" alt="Team" />
              <img className="w-12 h-12 rounded-full border-2 border-[#F1F6F4] object-cover" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" alt="Team" />
              <div className="w-12 h-12 rounded-full border-2 border-[#F1F6F4] bg-[#FFC801] flex items-center justify-center text-[#114C5A] font-bold text-xs z-10">
                +20
              </div>
            </div>
            <p className="text-sm font-bold text-[#114C5A] leading-tight">
              Une équipe d'encadrants<br/><span className="text-[#8aaa] font-semibold">passionnés & diplômés</span>
            </p>
          </div>
        </div>

        <div className="flex-1 w-full relative h-[400px] lg:h-[600px] animate-[fadeUp_0.8s_ease_0.2s_both]">
          <div className="absolute top-0 right-0 w-[80%] h-[85%] rounded-[32px] overflow-hidden shadow-2xl shadow-[#114c5a20]">
            <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80" alt="Colonie de vacances" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-0 left-0 w-[55%] h-[45%] rounded-[24px] overflow-hidden border-8 border-[#F1F6F4] shadow-xl shadow-[#114c5a15]">
            <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80" alt="Activités enfants" className="w-full h-full object-cover" />
          </div>
          {/* Badge Agréé */}
          <div className="absolute bottom-1/4 -left-6 bg-[#114C5A] rounded-2xl p-4 shadow-xl z-10 flex flex-col gap-1">
             <div className="flex items-center gap-2">
                <Shield size={16} className="text-[#FFC801]" />
                <span className="text-[10px] font-bold text-[#FFC801] uppercase tracking-widest">Agréé</span>
             </div>
             <p className="text-xs font-bold text-white">Jeunesse & Sports</p>
          </div>
        </div>
      </section>

      {/* ── NOTRE APPROCHE ────────────────────────────────────────────────────── */}
      <section className="bg-white py-24 px-8">
        <div className="max-w-[1320px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-[#FF9932] uppercase tracking-widest mb-3">Nos valeurs</p>
            <h2 className="text-3xl lg:text-5xl font-black text-[#114C5A] tracking-tight">Ce qui nous rend uniques</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: GraduationCap,
                title: "Exigence Pédagogique",
                desc: "À un âge où les enfants débordent de curiosité, il est essentiel de nourrir leur appétence. Nos séjours sont pensés par des professionnels de l'éducation pour allier fun et apprentissage."
              },
              {
                icon: Shield,
                title: "Sécurité Absolue",
                desc: "Taux d'encadrement supérieur aux normes (1 pour 8). Tous nos animateurs et directeurs sont diplômés (BAFA, BAFD, Diplômes d'État, Enseignants)."
              },
              {
                icon: Heart,
                title: "Bienveillance & Inclusion",
                desc: "Nous créons un cadre où chaque enfant trouve sa place, prend confiance en lui et apprend le vivre-ensemble dans le respect de chacun."
              }
            ].map((item, i) => (
              <div key={i} className="bg-[#F1F6F4] rounded-[24px] p-8 transition-transform hover:-translate-y-2 duration-300">
                <div className="w-14 h-14 rounded-2xl bg-[#FFC801]/20 flex items-center justify-center mb-6">
                  <item.icon size={28} className="text-[#114C5A]" />
                </div>
                <h3 className="text-xl font-extrabold text-[#114C5A] mb-4">{item.title}</h3>
                <p className="text-[#5a7a84] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── L'ÉQUIPE / LES ENCADRANTS ─────────────────────────────────────────── */}
      <section className="py-24 px-8 bg-[#114C5A]">
        <div className="max-w-[1320px] mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <p className="text-xs font-bold text-[#FFC801] uppercase tracking-widest mb-4">L'Équipe de direction</p>
            <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tight mb-6">
              Des professionnels de l'éducation nationale.
            </h2>
            <p className="text-white/70 text-base leading-relaxed mb-8">
              Make Your Moment a été fondée par des enseignants passionnés. Nous connaissons les enfants, nous connaissons le terrain. Notre objectif est de transposer l'exigence de l'école dans un cadre de vacances, où l'épanouissement personnel est au centre de tout.
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
              <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=80" alt="Activité" className="w-full h-48 object-cover rounded-[24px]" />
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
              <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&q=80" alt="Sourire" className="w-full h-64 object-cover rounded-[24px]" />
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