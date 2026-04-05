// components/AuthModal.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Mail, Lock, User, Phone, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { signIn } from "next-auth/react"; // ⚡ La fonction magique pour se connecter
import { registerUser } from "@/app/actions/auth"; // ⚡ Notre fonction d'inscription

const C = {
  yellow:  "#FFC801",
  saffron: "#FF9932",
  teal:    "#114C5A",
  arctic:  "#F1F6F4",
  white:   "#ffffff",
  gray:    "#8aaa",
  lightGray: "#e2e8f0",
  red:     "#ef4444"
};

export default function AuthModal({ isOpen, onClose }) {
  const router = useRouter();
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null); // On réinitialise les erreurs

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    if (mode === "register") {
      // ─── LOGIQUE D'INSCRIPTION ───
      const res = await registerUser(formData);
      
      if (res.error) {
        setErrorMsg(res.error);
        setIsSubmitting(false);
        return;
      }

      // Si l'inscription réussit, on connecte directement l'utilisateur dans la foulée !
      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInRes?.error) {
        setErrorMsg("Compte créé, mais erreur de connexion automatique.");
      } else {
        router.refresh(); // On met à jour la page pour refléter la connexion
        onClose(); // On ferme la modale
      }

    } else {
      // ─── LOGIQUE DE CONNEXION ───
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false, // On ne veut pas changer de page, on gère ça ici
      });

      if (res?.error) {
        setErrorMsg("Email ou mot de passe incorrect.");
      } else {
        router.refresh(); // Mise à jour de la page
        onClose(); // Fermeture de la modale
      }
    }

    setIsSubmitting(false);
  };

  // Permet de changer d'onglet tout en vidant les erreurs
  const switchMode = (newMode) => {
    setMode(newMode);
    setErrorMsg(null);
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(17, 76, 90, 0.6)", backdropFilter: "blur(6px)", cursor: "pointer" }} />

      <div style={{ position: "relative", width: "100%", maxWidth: "580px", background: C.white, borderRadius: "32px", overflow: "hidden", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)", animation: "fadeUp 0.3s ease-out forwards" }}>
        
        <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`}</style>

        <button onClick={onClose} style={{ position: "absolute", top: "24px", right: "24px", width: "36px", height: "36px", background: C.arctic, border: "none", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.teal, zIndex: 10, transition: "background 0.2s" }} onMouseOver={e => e.currentTarget.style.background = C.lightGray} onMouseOut={e => e.currentTarget.style.background = C.arctic}>
          <X size={18} />
        </button>

        <div style={{ display: "flex", background: C.arctic, padding: "8px", margin: "24px 32px 0", borderRadius: "16px" }}>
          <button onClick={() => switchMode("login")} type="button" style={{ flex: 1, padding: "12px", borderRadius: "12px", border: "none", fontSize: "14px", fontWeight: 800, cursor: "pointer", transition: "all 0.2s", background: mode === "login" ? C.white : "transparent", color: mode === "login" ? C.teal : C.gray, boxShadow: mode === "login" ? "0 4px 12px rgba(0,0,0,0.05)" : "none" }}>
            Se connecter
          </button>
          <button onClick={() => switchMode("register")} type="button" style={{ flex: 1, padding: "12px", borderRadius: "12px", border: "none", fontSize: "14px", fontWeight: 800, cursor: "pointer", transition: "all 0.2s", background: mode === "register" ? C.white : "transparent", color: mode === "register" ? C.teal : C.gray, boxShadow: mode === "register" ? "0 4px 12px rgba(0,0,0,0.05)" : "none" }}>
            Créer un compte
          </button>
        </div>

        <div style={{ padding: "32px 40px" }}>
          
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <h2 style={{ fontSize: "28px", fontWeight: 900, color: C.teal, marginBottom: "8px" }}>
              {mode === "login" ? "Bon retour ! 👋" : "Bienvenue ! ✨"}
            </h2>
            <p style={{ fontSize: "14px", color: C.gray, fontWeight: 500, lineHeight: 1.5 }}>
              {mode === "login" 
                ? "Connectez-vous pour accéder au suivi des séjours et à vos inscriptions." 
                : "Créez votre compte Parent pour inscrire vos enfants à nos séjours."}
            </p>
          </div>

          {/* ⚡ AFFICHAGE DES ERREURS */}
          {errorMsg && (
            <div style={{ background: "#fef2f2", color: C.red, padding: "12px 16px", borderRadius: "12px", fontSize: "13px", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", border: `1px solid #fecaca` }}>
              <AlertCircle size={16} /> {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            
            {mode === "register" && (
              <>
                <div style={{ display: "flex", gap: "16px" }}>
                  <div style={{ position: "relative", flex: 1 }}>
                    <User size={18} color={C.gray} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }} />
                    <input type="text" name="prenom" required placeholder="Prénom" style={{ width: "100%", padding: "14px 14px 14px 44px", borderRadius: "16px", border: `1px solid ${C.lightGray}`, background: C.arctic, color: C.teal, fontWeight: 600, outline: "none" }} />
                  </div>
                  <div style={{ position: "relative", flex: 1 }}>
                    <input type="text" name="nom" required placeholder="Nom" style={{ width: "100%", padding: "14px", borderRadius: "16px", border: `1px solid ${C.lightGray}`, background: C.arctic, color: C.teal, fontWeight: 600, outline: "none" }} />
                  </div>
                </div>

                <div style={{ position: "relative" }}>
                  <Phone size={18} color={C.gray} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }} />
                  <input type="tel" name="telephone" required placeholder="Numéro de téléphone" style={{ width: "100%", padding: "14px 14px 14px 44px", borderRadius: "16px", border: `1px solid ${C.lightGray}`, background: C.arctic, color: C.teal, fontWeight: 600, outline: "none" }} />
                </div>
              </>
            )}

            <div style={{ position: "relative" }}>
              <Mail size={18} color={C.gray} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }} />
              <input type="email" name="email" required placeholder="Adresse email" style={{ width: "100%", padding: "14px 14px 14px 44px", borderRadius: "16px", border: `1px solid ${C.lightGray}`, background: C.arctic, color: C.teal, fontWeight: 600, outline: "none" }} />
            </div>

            <div style={{ position: "relative" }}>
              <Lock size={18} color={C.gray} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }} />
              <input type="password" name="password" required placeholder="Mot de passe" style={{ width: "100%", padding: "14px 14px 14px 44px", borderRadius: "16px", border: `1px solid ${C.lightGray}`, background: C.arctic, color: C.teal, fontWeight: 600, outline: "none" }} />
            </div>

            {mode === "login" && (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <a href="#" style={{ fontSize: "12px", fontWeight: 700, color: C.saffron, textDecoration: "none" }}>Mot de passe oublié ?</a>
              </div>
            )}

            <button type="submit" disabled={isSubmitting} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: C.yellow, color: C.teal, padding: "16px", borderRadius: "16px", border: "none", fontSize: "16px", fontWeight: 800, marginTop: "8px", cursor: isSubmitting ? "not-allowed" : "pointer", opacity: isSubmitting ? 0.7 : 1, boxShadow: "0 8px 24px rgba(255,200,1,0.25)", transition: "all 0.2s" }}>
              {isSubmitting ? "Chargement..." : mode === "login" ? "Se connecter" : "Créer mon compte"}
              {!isSubmitting && <ArrowRight size={18} />}
            </button>

          </form>

          {mode === "register" && (
            <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: `1px solid ${C.arctic}`, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px" }}>
              {["Inscription rapide", "Suivi des dossiers", "Accès au blog"].map((av, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 600, color: C.gray }}>
                  <CheckCircle2 size={14} color={C.saffron} /> {av}
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}