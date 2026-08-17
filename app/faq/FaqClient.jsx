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

/* ─── DONNÉES DE LA FAQ (reprises de make-your-moment.com/blank-11) ──────── */
const FAQS = [
  {
    id: 1,
    question: "Assurance de l'association Make Your Moment",
    reponse: "L'association est couverte par la MAIF sous le n°4530967B. Elle dispose d'une assurance responsabilité civile professionnelle couvrant les dommages (sauf dégradations volontaires), et assure chaque enfant en responsabilité civile pour les événements accidentels.",
    Icon: ShieldCheck
  },
  {
    id: 2,
    question: "Réservation d'un séjour avec Make Your Moment",
    reponse: "Accédez au site, sélectionnez votre séjour dans les rubriques appropriées, puis cliquez sur « S'inscrire ici ». Après remplissage du formulaire de pré-inscription, vous recevrez les documents d'inscription définitive. L'inscription se valide à réception du paiement. Le paiement peut se faire en trois fois par chèque.",
    Icon: MousePointerClick
  },
  {
    id: 3,
    question: "Modalités de paiement des séjours de vacances",
    reponse: "L'inscription se valide uniquement à réception du paiement intégral. Les moyens acceptés sont : chèques bancaires à l'ordre de l'association, virements bancaires, espèces et chèques ANCV.",
    Icon: CreditCard
  },
  {
    id: 4,
    question: "Conditions d'annulation d'un séjour",
    reponse: "L'association peut annuler si le nombre de participants est insuffisant (remboursement intégral). Pour les annulations par les participants, un pourcentage est conservé selon la date d'annulation, comme détaillé ci-dessous. Une assurance annulation MAIF est disponible à l'inscription. Aucun remboursement n'est accordé pour les séjours écourtés.",
    Icon: AlertCircle,
    tableData: {
      headers: ["Période d'annulation", "Pourcentage ou somme retenue"],
      rows: [
        ["+ 120 jours avant le départ", "100% du montant du séjour seront remboursés à la famille"],
        ["120 jours à 91 jours avant le départ", "50 euros seront retenus par Make Your Moment"],
        ["90 jours à 61 jours avant le départ", "25 % du montant du séjour seront retenus par Make Your Moment"],
        ["60 jours à 31 jours avant le départ", "50% du montant du séjour seront retenus par Make Your Moment"],
        ["30 jours à 15 jours avant le départ", "70% du montant du séjour seront retenus par Make Your Moment"],
        ["14 jours à 7 jours avant le départ", "85% du montant du séjour seront retenus par Make Your Moment"],
        ["à moins de 7 jours avant le départ", "95% du montant du séjour seront retenus par Make Your Moment"],
      ],
    },
  },
  {
    id: 5,
    question: "Renvoi d'un participant pendant un séjour",
    reponse: "En cas de comportement déviant compromettant le séjour, l'association peut renvoyer immédiatement le participant sans remboursement. Les frais de retour restent entièrement à la charge de la famille.",
    Icon: FileWarning
  },
  {
    id: 6,
    question: "Frais médicaux lors d'un séjour de vacances",
    reponse: "L'association avance les frais médicaux et pharmaceutiques nécessaires pendant le séjour, mais en demande le remboursement aux familles au retour de l'enfant.",
    Icon: HeartPulse
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
        maxHeight: isOpen ? (f.tableData ? "1000px" : "500px") : "0",
        opacity: isOpen ? 1 : 0,
        overflow: "hidden",
        transition: "all .4s cubic-bezier(0.4, 0, 0.2, 1)",
        padding: isOpen ? "0 32px 32px 100px" : "0 32px 0 100px"
      }}>
        <p style={{ fontSize: "14px", color: "#5a7a84", lineHeight: 1.8, marginBottom: f.tableData ? "20px" : 0 }}>
          {f.reponse}
        </p>

        {f.tableData && (
          <div style={{ overflowX: "auto", borderRadius: "12px", border: `1px solid ${C.arctic}` }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr>
                  {f.tableData.headers.map((h, i) => (
                    <th key={i} style={{ textAlign: "left", padding: "12px 16px", background: C.teal, color: C.white, fontWeight: 800, fontSize: "12px" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {f.tableData.rows.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? C.arctic : C.white }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: "12px 16px", color: C.teal, fontWeight: j === 0 ? 700 : 500, lineHeight: 1.5 }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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