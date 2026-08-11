"use client";
import { useState, useEffect } from "react";
import { 
  Mail, Phone, MapPin, Send, Clock, 
  Facebook, Instagram, CheckCircle2, MessageSquare
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

/* ─── PAGE ───────────────────────────────────────────────────────────────── */
export default function Contact() {
  const [visible, setVisible] = useState(false);
  const [formStatus, setFormStatus] = useState("idle"); // idle, submitting, success

  useEffect(() => {
    setTimeout(() => setVisible(true), 80);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("submitting");
    // Simulation d'envoi
    setTimeout(() => {
      setFormStatus("success");
    }, 1500);
  };

  return (
    <div style={{ fontFamily: "'Montserrat',sans-serif", background: C.arctic, color: C.teal, overflowX: "hidden", minHeight: "100vh" }}>
      
      {/* ── HERO HEADER ────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 32px 40px", textAlign: "center", position: "relative" }}>
        <div style={{
          maxWidth: "800px", margin: "0 auto",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all .8s ease"
        }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: C.lilac, borderRadius: "999px", padding: "8px 16px", marginBottom: "24px" }}>
            <MessageSquare size={14} style={{ color: C.teal, fill: C.teal }} />
            <span style={{ fontSize: "11px", fontWeight: 800, color: C.teal, textTransform: "uppercase", letterSpacing: "1px" }}>Nous sommes à votre écoute</span>
          </div>
          <h1 style={{ fontWeight: 900, fontSize: "clamp(2.5rem, 4vw, 4rem)", color: C.teal, lineHeight: 1.1, letterSpacing: "-1px", marginBottom: "20px" }}>
            Contactez <span style={{ color: C.saffron }}>l'équipe.</span>
          </h1>
          <p style={{ fontSize: "16px", color: "#5a7a84", lineHeight: 1.8, margin: "0 auto" }}>
            Une question sur un séjour ? Un besoin particulier pour le paiement ? N'hésitez pas à nous envoyer un message ou à nous appeler directement.
          </p>
        </div>
      </section>

      {/* ── CONTENU PRINCIPAL (GRID) ───────────────────────────────────────── */}
      <section style={{ padding: "40px 32px 96px" }}>
        <div style={{ 
          maxWidth: "1320px", margin: "0 auto", display: "flex", gap: "48px", flexWrap: "wrap",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all .8s ease .2s"
        }}>
          
          {/* ── GAUCHE : INFOS DE CONTACT ── */}
          <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", gap: "24px" }}>
            
            {/* Carte Infos */}
            <div style={{ background: C.teal, color: C.white, borderRadius: "32px", padding: "40px", boxShadow: "0 24px 64px rgba(17,76,90,0.15)" }}>
              <h3 style={{ fontSize: "24px", fontWeight: 900, marginBottom: "32px", letterSpacing: "-0.5px" }}>Make Your Moment</h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "16px", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Phone size={20} style={{ color: C.yellow }} />
                  </div>
                  <div>
                    <p style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Téléphone</p>
                    <p style={{ fontSize: "16px", fontWeight: 800, color: C.white }}>+33 6 98 96 50 02</p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "16px", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Mail size={20} style={{ color: C.yellow }} />
                  </div>
                  <div>
                    <p style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Email</p>
                    <p style={{ fontSize: "14px", fontWeight: 800, color: C.white }}>mym.makeyourmoment@gmail.com</p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "16px", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <MapPin size={20} style={{ color: C.yellow }} />
                  </div>
                  <div>
                    <p style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Siège de l'association</p>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: C.white, lineHeight: 1.5 }}>16 av. du Rond Point<br/>94370 Sucy-en-Brie<br/>France</p>
                  </div>
                </div>
              </div>

              {/* Réseaux sociaux */}
              <div style={{ marginTop: "40px", paddingTop: "32px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>Suivez-nous</p>
                <div style={{ display: "flex", gap: "12px" }}>
                  {[Facebook, Instagram].map((Ic, i) => (
                    <a key={i} href="#" style={{ width: "44px", height: "44px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: C.white, transition: "all .2s", textDecoration: "none" }}
                      onMouseEnter={e => { e.currentTarget.style.background = C.yellow; e.currentTarget.style.color = C.teal; e.currentTarget.style.borderColor = C.yellow; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.white; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}>
                      <Ic size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Horaires */}
            <div style={{ background: C.white, borderRadius: "24px", padding: "24px 32px", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 4px 16px rgba(17,76,90,0.04)" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: C.yellow + "20", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Clock size={18} style={{ color: C.teal }} />
              </div>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 800, color: C.teal, marginBottom: "2px" }}>Horaires de permanence</p>
                <p style={{ fontSize: "12px", color: "#8aaa", fontWeight: 500 }}>Lundi au Vendredi : 9h00 - 18h00</p>
              </div>
            </div>

          </div>

          {/* ── DROITE : FORMULAIRE ── */}
          <div style={{ flex: "1 1 500px", background: C.white, borderRadius: "32px", padding: "48px", boxShadow: "0 24px 64px rgba(17,76,90,0.06)", position: "relative", overflow: "hidden" }}>
            
            {formStatus === "success" ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center", animation: "fadeUp .5s ease" }}>
                <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: C.yellow + "20", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
                  <CheckCircle2 size={40} style={{ color: C.yellow, fill: C.teal }} />
                </div>
                <h3 style={{ fontSize: "24px", fontWeight: 900, color: C.teal, marginBottom: "12px" }}>Message envoyé !</h3>
                <p style={{ fontSize: "15px", color: "#5a7a84", lineHeight: 1.6, marginBottom: "32px" }}>
                  Merci de nous avoir contactés. Notre équipe va prendre connaissance de votre message et vous répondra très rapidement.
                </p>
                <button onClick={() => setFormStatus("idle")} style={{ background: C.arctic, color: C.teal, border: "none", padding: "14px 28px", borderRadius: "999px", fontSize: "12px", fontWeight: 800, cursor: "pointer", transition: "all .2s" }}>
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <h3 style={{ fontSize: "24px", fontWeight: 900, color: C.teal, marginBottom: "8px", letterSpacing: "-0.5px" }}>Envoyez-nous un message</h3>
                <p style={{ fontSize: "13px", color: "#8aaa", marginBottom: "16px" }}>Remplissez le formulaire ci-dessous, nous vous répondrons sous 48h.</p>

                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                  <div style={{ flex: "1 1 200px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontSize: "11px", fontWeight: 700, color: C.teal, textTransform: "uppercase", letterSpacing: "1px" }}>Nom complet *</label>
                    <input required type="text" placeholder="Jean Dupont" 
                      style={{ width: "100%", background: C.arctic, border: "2px solid transparent", borderRadius: "14px", padding: "14px 16px", fontSize: "13px", color: C.teal, outline: "none", transition: "border .2s", fontFamily: "inherit" }} 
                      onFocus={e => e.target.style.borderColor = C.yellow} onBlur={e => e.target.style.borderColor = "transparent"}
                    />
                  </div>
                  <div style={{ flex: "1 1 200px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontSize: "11px", fontWeight: 700, color: C.teal, textTransform: "uppercase", letterSpacing: "1px" }}>Téléphone</label>
                    <input type="tel" placeholder="06 12 34 56 78" 
                      style={{ width: "100%", background: C.arctic, border: "2px solid transparent", borderRadius: "14px", padding: "14px 16px", fontSize: "13px", color: C.teal, outline: "none", transition: "border .2s", fontFamily: "inherit" }} 
                      onFocus={e => e.target.style.borderColor = C.yellow} onBlur={e => e.target.style.borderColor = "transparent"}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "11px", fontWeight: 700, color: C.teal, textTransform: "uppercase", letterSpacing: "1px" }}>Adresse Email *</label>
                  <input required type="email" placeholder="jean.dupont@email.com" 
                    style={{ width: "100%", background: C.arctic, border: "2px solid transparent", borderRadius: "14px", padding: "14px 16px", fontSize: "13px", color: C.teal, outline: "none", transition: "border .2s", fontFamily: "inherit" }} 
                    onFocus={e => e.target.style.borderColor = C.yellow} onBlur={e => e.target.style.borderColor = "transparent"}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "11px", fontWeight: 700, color: C.teal, textTransform: "uppercase", letterSpacing: "1px" }}>
                    Sujet *
                  </label>
                  
                  <select 
                    required 
                    /* ✅ On définit la valeur par défaut ici, sur le parent */
                    defaultValue="" 
                    style={{ 
                      width: "100%", 
                      background: C.arctic, 
                      border: "2px solid transparent", 
                      borderRadius: "14px", 
                      padding: "14px 16px", 
                      fontSize: "13px", 
                      color: C.teal, 
                      outline: "none", 
                      transition: "border .2s", 
                      fontFamily: "inherit", 
                      cursor: "pointer", 
                      appearance: "none" 
                    }} 
                    onFocus={e => e.target.style.borderColor = C.yellow} 
                    onBlur={e => e.target.style.borderColor = "transparent"}
                  >
                    {/* ✅ L'option par défaut n'a plus l'attribut 'selected' */}
                    <option value="" disabled>Sélectionnez un sujet...</option>
                    <option value="info">Informations sur un séjour</option>
                    <option value="paiement">Question sur le paiement (8x sans frais)</option>
                    <option value="scolaire">Projet de séjour scolaire</option>
                    <option value="autre">Autre demande</option>
                  </select>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "8px" }}>
                  <label style={{ fontSize: "11px", fontWeight: 700, color: C.teal, textTransform: "uppercase", letterSpacing: "1px" }}>Votre message *</label>
                  <textarea required placeholder="Comment pouvons-nous vous aider ?" rows="5"
                    style={{ width: "100%", background: C.arctic, border: "2px solid transparent", borderRadius: "14px", padding: "14px 16px", fontSize: "13px", color: C.teal, outline: "none", transition: "border .2s", fontFamily: "inherit", resize: "vertical" }} 
                    onFocus={e => e.target.style.borderColor = C.yellow} onBlur={e => e.target.style.borderColor = "transparent"}
                  ></textarea>
                </div>

                <button type="submit" disabled={formStatus === "submitting"}
                  style={{
                    width: "100%", background: formStatus === "submitting" ? "#ccc" : C.yellow, color: C.teal,
                    fontSize: "13px", fontWeight: 800, borderRadius: "14px", padding: "16px", border: "none",
                    cursor: formStatus === "submitting" ? "not-allowed" : "pointer", transition: "all .2s",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                    boxShadow: formStatus === "submitting" ? "none" : "0 8px 24px rgba(255,200,1,0.3)"
                  }}
                  onMouseEnter={e => { if(formStatus !== "submitting") e.currentTarget.style.background = C.saffron; }}
                  onMouseLeave={e => { if(formStatus !== "submitting") e.currentTarget.style.background = C.yellow; }}
                >
                  {formStatus === "submitting" ? "Envoi en cours..." : (
                    <>Envoyer le message <Send size={14} /></>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}