"use client";
import { useState, useEffect } from "react";
import { 
  ArrowRight, BookOpen, ShieldCheck, Bus, 
  CheckCircle2, FileText, Mountain, Waves, Landmark,
  ChevronRight, Users
} from "lucide-react";

/* ─── PALETTE ────────────────────────────────────────────────────────────── */
const C = {
  yellow:  "#FFC801",
  saffron: "#FF9932",
  teal:    "#114C5A",
  lilac:   "#EFDEF9",
  arctic:  "#F1F6F4",
  white:   "#ffffff",
};

/* ─── DONNÉES ────────────────────────────────────────────────────────────── */
const THEMATIQUES = [
  { id: 1, titre: "Classes de Neige", desc: "Découverte du milieu montagnard, apprentissage du ski et sensibilisation à l'environnement.", lieu: "Châtel, Alpes", img: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80", Icon: Mountain },
  { id: 2, titre: "Classes Découverte & Nature", desc: "Étude des écosystèmes, activités nautiques et vie en collectivité en bord d'océan.", lieu: "Landes, Littoral", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", Icon: Waves },
  { id: 3, titre: "Voyages Culturels & Histoire", desc: "Plongée au cœur de l'histoire européenne, visites de musées et lieux de mémoire.", lieu: "France & Europe", img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80", Icon: Landmark },
];

const ARGUMENTS = [
  { Icon: BookOpen, title: "Projet Pédagogique", desc: "Fondée par des enseignants, notre association vous aide à monter un projet en totale adéquation avec les programmes scolaires." },
  { Icon: Bus, title: "Organisation Clé en Main", desc: "Transport, hébergement, repas, plannings d'activités... Nous gérons toute la logistique pour que vous restiez concentré sur vos élèves." },
  { Icon: ShieldCheck, title: "Sécurité & Agréments", desc: "Centres agréés par l'Éducation Nationale et Jeunesse & Sports. Encadrement renforcé et prestataires rigoureusement sélectionnés." },
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

function ThemeCard({ t }) {
  const { Icon: Ic } = t;
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: C.white, borderRadius: "24px", overflow: "hidden",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 56px rgba(17,76,90,0.12)" : "0 4px 16px rgba(17,76,90,0.06)",
        transition: "all .3s ease"
      }}>
      <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
        <img src={t.img} alt={t.titre} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hovered ? "scale(1.05)" : "scale(1)", transition: "transform .5s ease" }} />
        <div style={{ position: "absolute", top: "16px", left: "16px", width: "40px", height: "40px", background: C.white, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <Ic size={20} style={{ color: C.teal }} />
        </div>
      </div>
      <div style={{ padding: "24px" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, color: C.saffron, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>{t.lieu}</p>
        <h3 style={{ fontSize: "18px", fontWeight: 900, color: C.teal, lineHeight: 1.2, marginBottom: "12px" }}>{t.titre}</h3>
        <p style={{ fontSize: "13px", color: "#5a7a84", lineHeight: 1.6 }}>{t.desc}</p>
      </div>
    </div>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────────────────── */
export default function Scolaires() {
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
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: C.yellow, flexShrink: 0 }} />
              <span style={{ fontSize: "11px", fontWeight: 800, color: C.teal, textTransform: "uppercase", letterSpacing: "1px" }}>Pour les écoles et collèges</span>
            </div>
            <h1 style={{ fontWeight: 900, fontSize: "clamp(2.4rem, 4vw, 4.2rem)", color: C.teal, lineHeight: 1.1, letterSpacing: "-1px", marginBottom: "24px" }}>
              Apprendre autrement, <br/><span style={{ color: C.yellow }}>grandir ensemble.</span>
            </h1>
            <p style={{ fontSize: "16px", color: "#5a7a84", lineHeight: 1.8, marginBottom: "40px", maxWidth: "500px" }}>
              Parce que nous sommes nous-mêmes enseignants, nous connaissons vos enjeux. Make Your Moment vous accompagne dans la création de classes de découvertes et séjours scolaires 100% sur mesure.
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Btn>Demander un devis <ArrowRight size={14} /></Btn>
              <Btn outline>Découvrir nos thématiques</Btn>
            </div>
          </div>
          
          {/* Image */}
          <div style={{ flex: "1 1 400px", position: "relative", height: "500px" }}>
            <div style={{ position: "absolute", top: "0", right: "0", width: "85%", height: "80%", borderRadius: "32px", overflow: "hidden", boxShadow: "0 24px 64px rgba(17,76,90,0.15)", zIndex: 1 }}>
              <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80" alt="Enfants en classe verte" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ position: "absolute", bottom: "0", left: "0", width: "55%", height: "50%", borderRadius: "24px", overflow: "hidden", border: `6px solid ${C.white}`, boxShadow: "0 12px 32px rgba(17,76,90,0.1)", zIndex: 2 }}>
              <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80" alt="Enfants activités" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            {/* Badge Agréé EN */}
            <div style={{ position: "absolute", top: "40px", left: "-20px", background: C.teal, borderRadius: "16px", padding: "16px", boxShadow: "0 12px 32px rgba(17,76,90,0.25)", zIndex: 3, display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "36px", height: "36px", background: C.yellow, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <BookOpen size={18} style={{ color: C.teal }} />
              </div>
              <div>
                <p style={{ fontSize: "10px", fontWeight: 800, color: C.yellow, textTransform: "uppercase", letterSpacing: "1px" }}>Conforme aux</p>
                <p style={{ fontSize: "12px", fontWeight: 800, color: C.white }}>Programmes de l'E.N.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NOTRE VALEUR AJOUTÉE ──────────────────────────────────────────── */}
      <section style={{ padding: "96px 32px", background: C.arctic }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <p style={{ fontSize: "11px", fontWeight: 800, color: C.saffron, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "12px" }}>Notre expertise</p>
            <h2 style={{ fontWeight: 900, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: C.teal, letterSpacing: "-1px" }}>Conçu par des pros de l'éducation</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            {ARGUMENTS.map(({ Icon: Ic, title, desc }, i) => (
              <div key={i} style={{ background: C.white, padding: "40px 32px", borderRadius: "24px", boxShadow: "0 4px 16px rgba(17,76,90,0.03)" }}>
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

      {/* ── THÉMATIQUES ───────────────────────────────────────────────────── */}
      <section style={{ padding: "96px 32px", background: C.white }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "48px", flexWrap: "wrap", gap: "20px" }}>
            <div>
              <p style={{ fontSize: "11px", fontWeight: 800, color: C.saffron, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "10px" }}>Inspirations</p>
              <h2 style={{ fontWeight: 900, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: C.teal, letterSpacing: "-1px" }}>Des séjours qui marquent</h2>
            </div>
            <p style={{ fontSize: "14px", color: "#8aaa", maxWidth: "400px", lineHeight: 1.6 }}>
              Voici quelques exemples de thématiques plébiscitées. Chaque séjour est modulable selon votre projet de classe.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            {THEMATIQUES.map((t) => (
              <ThemeCard key={t.id} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE (PROCESS) ───────────────────────────────────── */}
      <section style={{ padding: "96px 32px", background: C.teal, color: C.white }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <h2 style={{ fontWeight: 900, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", letterSpacing: "-1px" }}>Montez votre projet en 3 étapes</h2>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "40px", position: "relative" }}>
            {[
              { num: "01", title: "Cahier des charges", desc: "Contactez-nous avec vos envies, votre budget, le nombre d'élèves et vos objectifs pédagogiques." },
              { num: "02", title: "Proposition & Devis", desc: "Nous vous concevons un programme sur mesure et vous fournissons tous les documents pour votre dossier DSDEN." },
              { num: "03", title: "Le Grand Départ", desc: "Détendez-vous, tout est prêt. Nous assurons le suivi logistique avant, pendant et après le séjour." },
            ].map((step, i) => (
              <div key={i} style={{ position: "relative" }}>
                <div style={{ fontSize: "64px", fontWeight: 900, color: "rgba(255,255,255,0.05)", lineHeight: 1, position: "absolute", top: "-20px", left: "-10px", zIndex: 0 }}>
                  {step.num}
                </div>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: C.yellow, marginBottom: "20px" }} />
                  <h3 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "12px" }}>{step.title}</h3>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA DEVIS ─────────────────────────────────────────────────────── */}
      <section style={{ padding: "96px 32px", background: C.arctic }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", background: C.white, borderRadius: "32px", padding: "64px 40px", textAlign: "center", boxShadow: "0 24px 64px rgba(17,76,90,0.08)" }}>
          <div style={{ width: "64px", height: "64px", background: C.lilac, borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <FileText size={28} style={{ color: C.teal }} />
          </div>
          <h2 style={{ fontWeight: 900, fontSize: "clamp(1.8rem, 3vw, 2.2rem)", color: C.teal, letterSpacing: "-1px", marginBottom: "16px" }}>
            Prêt à faire voyager votre classe ?
          </h2>
          <p style={{ fontSize: "15px", color: "#5a7a84", lineHeight: 1.7, marginBottom: "32px", maxWidth: "500px", margin: "0 auto 32px" }}>
            Remplissez notre formulaire de contact rapide pour recevoir une première estimation gratuite et sans engagement.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <button style={{ background: C.yellow, color: C.teal, border: "none", padding: "16px 32px", borderRadius: "999px", fontSize: "13px", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 8px 24px rgba(255,200,1,0.35)", transition: "all .2s" }}>
              Demander un devis gratuit <ArrowRight size={16} />
            </button>
            <button style={{ background: "transparent", color: C.teal, border: `2px solid ${C.teal}`, padding: "14px 32px", borderRadius: "999px", fontSize: "13px", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", transition: "all .2s" }}>
              Nous appeler
            </button>
          </div>
          <p style={{ fontSize: "11px", color: "#8aaa", marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
            <CheckCircle2 size={12} style={{ color: C.saffron }} />
            Réponse garantie sous 48h
          </p>
        </div>
      </section>

    </div>
  );
}