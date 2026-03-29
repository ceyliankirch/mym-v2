"use client";
import { useState, useEffect } from "react";
import { 
  HelpCircle, ChevronDown, CreditCard, ShieldCheck, 
  FileWarning, HeartPulse, MousePointerClick, AlertCircle,
  MessageCircle, ArrowRight
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

/* ─── DONNÉES DE LA FAQ (Issues de make-your-moment.com/blank-11) ────────── */
const FAQS = [
  {
    id: 1,
    question: "Comment réserver un séjour avec Make Your Moment ?",
    reponse: "Pour réserver, rendez-vous sur le site et choisissez votre séjour dans nos rubriques. Cliquez ensuite sur « S'inscrire ici » pour accéder au formulaire de pré-inscription. Une fois rempli, vous recevrez les documents nécessaires. Attention : l'inscription définitive n'est validée qu'à réception du règlement (les places étant limitées).",
    Icon: MousePointerClick
  },
  {
    id: 2,
    question: "Quelles sont les modalités et moyens de paiement ?",
    reponse: "L'inscription est validée à réception de la totalité du montant du séjour. Nous acceptons : les chèques bancaires (à l'ordre de Make Your Moment), les virements bancaires, les espèces, et les chèques ANCV. Nous proposons également un paiement échelonné jusqu'à 8× sans frais.",
    Icon: CreditCard
  },
  {
    id: 3,
    question: "Quelles sont les assurances incluses avec le séjour ?",
    reponse: "L'association Make Your Moment est couverte par la MAIF (n°4530967B). Nous sommes assurés en responsabilité civile professionnelle et pour les dommages (hors dégradations volontaires). Nous assurons également chaque enfant en matière de responsabilité civile lors de la survenance d'un événement de caractère accidentel.",
    Icon: ShieldCheck
  },
  {
    id: 4,
    question: "Quelles sont les conditions d'annulation ?",
    reponse: "Si MYM annule le séjour (ex: manque de participants), vous êtes intégralement remboursé. Si la famille annule, un pourcentage est retenu selon la date d'annulation (réception du courrier en AR). Vous pouvez souscrire à l'assurance annulation MAIF uniquement lors de l'inscription. À noter : tout séjour écourté pendant les vacances ne donne droit à aucun remboursement.",
    Icon: AlertCircle
  },
  {
    id: 5,
    question: "Comment sont gérés les frais médicaux pendant le séjour ?",
    reponse: "Pour garantir une prise en charge immédiate, les frais médicaux et pharmaceutiques nécessaires pendant le séjour sont systématiquement avancés par Make Your Moment. Le remboursement complet sera ensuite demandé aux familles au retour de l'enfant.",
    Icon: HeartPulse
  },
  {
    id: 6,
    question: "Que se passe-t-il en cas de problème de comportement ?",
    reponse: "Si un enfant a un comportement déviant compromettant le bon déroulement du séjour (non-respect des lois, violence, vol, etc.), MYM se réserve le droit de le renvoyer immédiatement. Les frais de retour de l'enfant (et de son accompagnateur) seront entièrement à la charge de la famille. Aucun remboursement du séjour ne pourra être réclamé.",
    Icon: FileWarning
  }
];

/* ─── MINI-COMPOSANTS ────────────────────────────────────────────────────── */
function AccordionItem({ f, isOpen, onClick }) {
  const { Icon: Ic } = f;
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      style={{
        background: C.white,
        borderRadius: "20px",
        marginBottom: "16px",
        overflow: "hidden",
        boxShadow: hovered || isOpen ? "0 12px 32px rgba(17,76,90,0.08)" : "0 4px 12px rgba(17,76,90,0.03)",
        transition: "all .3s ease",
        border: `2px solid ${isOpen ? C.yellow : "transparent"}`
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button 
        onClick={onClick}
        style={{
          width: "100%", textAlign: "left", padding: "24px 32px", background: "transparent",
          border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ 
            width: "48px", height: "48px", borderRadius: "14px", flexShrink: 0,
            background: isOpen ? C.yellow : C.arctic, 
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all .3s ease"
          }}>
            <Ic size={20} style={{ color: C.teal }} />
          </div>
          <h3 style={{ fontSize: "16px", fontWeight: 800, color: C.teal, lineHeight: 1.4 }}>
            {f.question}
          </h3>
        </div>
        <div style={{ 
          transform: isOpen ? "rotate(180deg)" : "rotate(0)", 
          transition: "transform .3s ease",
          color: isOpen ? C.saffron : "#8aaa",
          flexShrink: 0
        }}>
          <ChevronDown size={20} />
        </div>
      </button>

      <div style={{ 
        maxHeight: isOpen ? "500px" : "0", 
        opacity: isOpen ? 1 : 0,
        overflow: "hidden", 
        transition: "all .4s cubic-bezier(0.4, 0, 0.2, 1)",
        padding: isOpen ? "0 32px 32px 100px" : "0 32px 0 100px"
      }}>
        <p style={{ fontSize: "14px", color: "#5a7a84", lineHeight: 1.8 }}>
          {f.reponse}
        </p>
      </div>
    </div>
  );
}

/* ─── PAGE FAQ ───────────────────────────────────────────────────────────── */
export default function FAQ() {
  const [visible, setVisible] = useState(false);
  const [openId, setOpenId] = useState(1); // Ouvre la 1ère question par défaut

  useEffect(() => {
    setTimeout(() => setVisible(true), 80);
  }, []);

  return (
    <div style={{ fontFamily: "'Montserrat',sans-serif", background: C.arctic, color: C.teal, overflowX: "hidden", minHeight: "100vh" }}>
      
      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 32px 48px", textAlign: "center" }}>
        <div style={{
          maxWidth: "800px", margin: "0 auto",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all .8s ease"
        }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: C.lilac, borderRadius: "999px", padding: "8px 16px", marginBottom: "24px" }}>
            <HelpCircle size={14} style={{ color: C.teal, fill: C.teal }} />
            <span style={{ fontSize: "11px", fontWeight: 800, color: C.teal, textTransform: "uppercase", letterSpacing: "1px" }}>Foire aux questions</span>
          </div>
          <h1 style={{ fontWeight: 900, fontSize: "clamp(2.5rem, 4vw, 3.5rem)", color: C.teal, lineHeight: 1.1, letterSpacing: "-1px", marginBottom: "20px" }}>
            Vous avez des questions ?<br/>
            <span style={{ color: C.saffron }}>Nous avons les réponses.</span>
          </h1>
          <p style={{ fontSize: "16px", color: "#5a7a84", lineHeight: 1.8, margin: "0 auto", maxWidth: "600px" }}>
            Retrouvez ici toutes les informations essentielles concernant les réservations, le paiement, les assurances et le déroulement de nos séjours.
          </p>
        </div>
      </section>

      {/* ── CONTENU FAQ (ACCORDÉONS) ───────────────────────────────────────── */}
      <section style={{ padding: "0 32px 64px" }}>
        <div style={{ 
          maxWidth: "900px", margin: "0 auto",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all .8s ease .2s"
        }}>
          {FAQS.map((f) => (
            <AccordionItem 
              key={f.id} 
              f={f} 
              isOpen={openId === f.id} 
              onClick={() => setOpenId(openId === f.id ? null : f.id)} 
            />
          ))}
        </div>
      </section>

      {/* ── CALL TO ACTION (Si la réponse n'y est pas) ───────────────────── */}
      <section style={{ padding: "32px 32px 96px" }}>
        <div style={{ 
          maxWidth: "900px", margin: "0 auto", background: C.teal, borderRadius: "32px", padding: "48px", 
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "32px",
          boxShadow: "0 24px 64px rgba(17,76,90,0.15)"
        }}>
          <div>
            <h3 style={{ fontSize: "24px", fontWeight: 900, color: C.white, marginBottom: "12px", letterSpacing: "-0.5px" }}>
              Une question spécifique ?
            </h3>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, maxWidth: "400px" }}>
              Si vous ne trouvez pas la réponse à votre question dans notre FAQ, notre équipe est à votre disposition pour vous éclairer.
            </p>
          </div>
          <a href="/contact" style={{ textDecoration: "none" }}>
            <button style={{
              background: C.yellow, color: C.teal, fontSize: "13px", fontWeight: 800, borderRadius: "999px", padding: "16px 32px", 
              border: "none", cursor: "pointer", transition: "all .2s", display: "flex", alignItems: "center", gap: "10px",
              boxShadow: "0 8px 24px rgba(255,200,1,0.3)"
            }}
            onMouseEnter={e => e.currentTarget.style.background = C.saffron}
            onMouseLeave={e => e.currentTarget.style.background = C.yellow}
            >
              <MessageCircle size={16} /> Nous contacter <ArrowRight size={14} />
            </button>
          </a>
        </div>
      </section>

    </div>
  );
}