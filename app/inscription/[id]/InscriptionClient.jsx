// app/inscription/[id]/InscriptionClient.jsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { Lock, ArrowLeft, Send, AlertCircle } from "lucide-react";
import AuthModal from "@/components/AuthModal";
import { useSession } from "next-auth/react"; // ⚡ 1. On importe useSession

const C = {
  yellow:  "#FFC801",
  saffron: "#FF9932",
  teal:    "#114C5A",
  arctic:  "#F1F6F4",
  white:   "#ffffff",
  gray:    "#8aaa",
  lightGray: "#e2e8f0"
};

export default function InscriptionClient({ sejour }) {
  // ⚡ 2. On récupère la vraie session
  const { data: session, status } = useSession();
  const isLoggedIn = !!session; // true si connecté, false sinon

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  let formFields = [];
  try {
    formFields = sejour.formSchema ? JSON.parse(sejour.formSchema) : [];
  } catch (e) {
    console.error("Erreur de lecture du formulaire", e);
  }

  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    console.log("Données soumises :", formData);
    alert("Formulaire soumis avec succès (Simulation) !");
    
    setIsSubmitting(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: C.arctic, fontFamily: "'Montserrat', sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        
        <Link href={`/sejours-enfants-ados/${sejour.id}`} style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: C.teal, fontWeight: 700, fontSize: "14px", textDecoration: "none", marginBottom: "32px" }}>
          <ArrowLeft size={16} /> Retour au séjour
        </Link>

        <div style={{ background: C.white, borderRadius: "32px", padding: "40px", boxShadow: "0 10px 40px rgba(17,76,90,0.05)" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 900, color: C.teal, marginBottom: "8px", lineHeight: 1.2 }}>
            Inscription : {sejour.titre}
          </h1>
          <p style={{ color: C.gray, fontSize: "14px", fontWeight: 500, marginBottom: "32px" }}>
            Veuillez remplir les informations ci-dessous pour finaliser la demande d'inscription.
          </p>

          {/* ⚡ 3. GESTION DES 3 ÉTATS : Chargement, Déconnecté, Connecté */}
          {status === "loading" ? (
            <div style={{ padding: "40px", textAlign: "center" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: C.yellow, animation: "pulse 1.5s infinite", margin: "0 auto" }} />
              <p style={{ marginTop: "16px", color: C.teal, fontWeight: 600 }}>Vérification de votre compte...</p>
            </div>
          ) : !isLoggedIn ? (
            <div style={{ background: "#f8fafc", border: `1px solid ${C.lightGray}`, borderRadius: "24px", padding: "40px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: `${C.yellow}20`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                <Lock size={28} color={C.saffron} />
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: C.teal, marginBottom: "12px" }}>
                Connexion requise
              </h3>
              <p style={{ color: C.gray, fontSize: "14px", lineHeight: 1.6, maxWidth: "400px", marginBottom: "24px" }}>
                Pour des raisons de sécurité et pour le suivi du dossier de votre enfant, vous devez posséder un compte Parent pour accéder à ce formulaire.
              </p>
              
              <div style={{ display: "flex", gap: "12px" }}>
                <button 
                  onClick={() => setIsAuthModalOpen(true)} 
                  style={{ background: C.teal, color: C.yellow, padding: "12px 24px", borderRadius: "999px", fontSize: "14px", fontWeight: 800, border: "none", cursor: "pointer" }}
                >
                  Se connecter
                </button>
                <button 
                  onClick={() => setIsAuthModalOpen(true)} 
                  style={{ background: C.white, border: `2px solid ${C.teal}`, color: C.teal, padding: "10px 24px", borderRadius: "999px", fontSize: "14px", fontWeight: 800, cursor: "pointer" }}
                >
                  Créer un compte
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              
              {formFields.length === 0 ? (
                <div style={{ padding: "20px", background: "#fef2f2", color: "#ef4444", borderRadius: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <AlertCircle size={20} /> Aucun formulaire n'a été configuré pour ce séjour.
                </div>
              ) : (
                formFields.map((field) => {
                  
                  if (field.type === "section") {
                    return (
                      <h3 key={field.id} style={{ fontSize: "18px", fontWeight: 900, color: C.teal, borderBottom: `2px solid ${C.arctic}`, paddingBottom: "8px", marginTop: "16px" }}>
                        {field.label}
                      </h3>
                    );
                  }

                  return (
                    <div key={field.id} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <label style={{ fontSize: "13px", fontWeight: 700, color: C.teal }}>
                        {field.label} {field.required && <span style={{ color: "#ef4444" }}>*</span>}
                      </label>
                      
                      {field.type === "textarea" ? (
                        <textarea 
                          required={field.required}
                          onChange={(e) => handleChange(field.label, e.target.value)}
                          rows="4" 
                          style={{ padding: "14px", borderRadius: "12px", border: `1px solid ${C.lightGray}`, background: "#f8fafc", fontFamily: "inherit", resize: "vertical" }} 
                        />
                      ) : field.type === "select" ? (
                        <select 
                          required={field.required}
                          onChange={(e) => handleChange(field.label, e.target.value)}
                          style={{ padding: "14px", borderRadius: "12px", border: `1px solid ${C.lightGray}`, background: "#f8fafc", fontFamily: "inherit" }}
                        >
                          <option value="">Sélectionnez une option</option>
                          {field.options?.split(',').map((opt, i) => (
                            <option key={i} value={opt.trim()}>{opt.trim()}</option>
                          ))}
                        </select>
                      ) : (
                        <input 
                          type={field.type} 
                          required={field.required}
                          onChange={(e) => handleChange(field.label, e.target.value)}
                          style={{ padding: "14px", borderRadius: "12px", border: `1px solid ${C.lightGray}`, background: "#f8fafc", fontFamily: "inherit" }} 
                        />
                      )}
                    </div>
                  );
                })
              )}

              {formFields.length > 0 && (
                <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: `1px solid ${C.arctic}` }}>
                  <button type="submit" disabled={isSubmitting} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", width: "100%", background: C.yellow, color: C.teal, padding: "18px", borderRadius: "16px", border: "none", fontSize: "16px", fontWeight: 800, cursor: isSubmitting ? "not-allowed" : "pointer", transition: "all 0.2s", opacity: isSubmitting ? 0.7 : 1 }}>
                    {isSubmitting ? "Envoi en cours..." : "Valider l'inscription"} <Send size={18} />
                  </button>
                </div>
              )}
            </form>
          )}

        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
}