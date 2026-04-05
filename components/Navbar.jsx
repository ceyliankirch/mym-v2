"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GraduationCap, CreditCard, Award, Menu, X, Mail, User, LogOut, LayoutDashboard, Home 
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import AuthModal from "@/components/AuthModal";

const C = {
  yellow:  "#FFC801",
  saffron: "#FF9932",
  teal:    "#114C5A",
  lilac:   "#EFDEF9",
  white:   "#ffffff",
  pink:    "#95005a",
  arctic:  "#F1F6F4",
  gray:    "#8aaa",
  lightGray: "#e2e8f0"
};

const NAV = [
  { label: "Accueil", href: "/" },
  { label: "Qui sommes-nous", href: "/qui-sommes-nous" },
  { label: "Séjours enfants / ados", href: "/sejours-enfants-ados" },
  { label: "Sorties séniors", href: "/sorties-seniors" },
  { label: "FAQ", href: "/faq" }
];

/* ─── LE COMPOSANT DE LIEN ANIMÉ (DESKTOP) ──────────────────────────────── */
function NavItem({ item, active }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={item.href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        fontSize: "14px",
        fontWeight: active ? 800 : 700,
        padding: "8px 16px",
        borderRadius: "999px",
        textDecoration: "none",
        color: C.teal,
        whiteSpace: "nowrap",
        zIndex: 10,
        transition: "color 0.3s ease",
        fontFamily: "var(--font-montserrat), sans-serif",
      }}
    >
      {active && (
        <motion.div
          layoutId="active-pill"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          style={{ position: "absolute", inset: 0, backgroundColor: C.yellow, borderRadius: "999px", zIndex: -1 }}
        />
      )}
      <AnimatePresence>
        {isHovered && !active && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            style={{ position: "absolute", inset: 0, backgroundColor: C.lilac, borderRadius: "999px", zIndex: -1 }}
          />
        )}
      </AnimatePresence>
      {item.label}
    </Link>
  );
}

/* ─── NAVBAR PRINCIPALE ──────────────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  // Récupération de l'état de connexion de l'utilisateur
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloquer le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [menuOpen]);

  // Fermer le dropdown si on clique à côté
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Helper pour récupérer les initiales (Prénom + Nom)
  const getInitials = () => {
    if (!session?.user) return "U";
    
    if (session.user.prenom && session.user.nom) {
      return `${session.user.prenom[0]}${session.user.nom[0]}`.toUpperCase();
    }
    
    // Fallback de sécurité
    const fallbackName = session.user.name || session.user.email || "User";
    return fallbackName.substring(0, 2).toUpperCase();
  };

  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <div style={{ position: "relative", zIndex: 1000, fontFamily: "var(--font-montserrat), sans-serif" }}>
      
      <style>{`
        @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .my-ticker { animation: ticker 45s linear infinite; display: flex; white-space: nowrap; }
        
        .desktop-only { display: flex; }
        .mobile-only { display: none; }

        @media (max-width: 1024px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: flex !important; }
        }
      `}</style>

      {/* ── Ticker ── */}
      <div style={{ background: C.teal, height: "36px", overflow: "hidden", display: "flex", alignItems: "center" }}>
        <div className="my-ticker">
          {[...Array(10)].map((_, i) => (
            <span key={i} style={{ padding: "0 48px", fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: C.saffron, display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
              <GraduationCap size={12} /> Encadré par des enseignants diplômés
              <span style={{ opacity: .35, margin: "0 10px" }}>·</span>
              <CreditCard size={12} /> Paiement 8× sans frais
              <span style={{ opacity: .35, margin: "0 10px" }}>·</span>
              <Award size={12} /> Association Jeunesse &amp; Sports
              <span style={{ opacity: 0, margin: "0 40px" }}>—</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Header ── */}
      <header style={{
        position: "sticky", top: 0,
        background: scrolled || menuOpen ? "rgba(255,255,255,0.98)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
        boxShadow: scrolled || menuOpen ? "0 2px 24px rgba(17,76,90,0.08)" : "none",
        transition: "all .3s ease",
      }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px" }}>
          
          <Link href="/" onClick={() => setMenuOpen(false)} style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0, textDecoration: "none" }}>
            <img src="/logo-mym-couleur.png" alt="Logo Make Your Moment" style={{ height: "45px", borderRadius: "6px" }} />
          </Link>

          <nav className="desktop-only" style={{ alignItems: "center", gap: "8px", background: C.white, borderRadius: "999px", padding: "6px", boxShadow: "0 2px 12px rgba(17,76,90,0.08)" }}>
            {NAV.map((item) => (
              <NavItem key={item.href} item={item} active={pathname === item.href} />
            ))}
          </nav>

          {/* ⚡ Actions DESKTOP */}
          <div className="desktop-only" style={{ gap: "12px", alignItems: "center", flexShrink: 0 }}>
             
             {/* 1. Bouton Contact */}
             <Link href="/contact" style={{ background: C.pink, color: C.white, border: "none", padding: "10px 22px", borderRadius: "999px", fontSize: "14px", fontWeight: 800, display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 6px 20px rgba(149,0,90,0.3)", textDecoration: "none" }}>
              Contactez-nous <Mail size={13} />
             </Link>

             {/* 2. Bouton Profil / Avatar */}
             {status === "loading" ? (
               <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: C.arctic, animation: "pulse 1.5s infinite" }} />
             ) : session ? (
                // Connecté : Cercle avec initiales et Dropdown
                <div style={{ position: "relative" }} ref={dropdownRef}>
                  <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    style={{ 
                      width: "42px", 
                      height: "42px", 
                      borderRadius: "50%", 
                      background: "#e2e8f0", // Fond gris clair
                      color: "#0d323c",      // Initiales foncées
                      fontSize: "14px", 
                      fontWeight: 800, 
                      border: `2px solid ${C.white}`, 
                      boxShadow: "0 4px 12px rgba(17,76,90,0.15)", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      cursor: "pointer", 
                      transition: "transform 0.2s" 
                    }}
                    onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
                  >
                    {getInitials()}
                  </button>

                  {/* Menu Déroulant */}
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        style={{ position: "absolute", top: "110%", right: 0, background: C.white, borderRadius: "20px", padding: "8px", width: "220px", boxShadow: "0 10px 40px rgba(0,0,0,0.1)", border: `1px solid ${C.lightGray}`, display: "flex", flexDirection: "column", gap: "4px" }}
                      >
                        <Link 
                          href={isAdmin ? "/admin" : "/profil"} 
                          onClick={() => setDropdownOpen(false)}
                          style={{ padding: "12px 16px", borderRadius: "12px", fontSize: "13px", fontWeight: 700, color: C.teal, textDecoration: "none", display: "flex", alignItems: "center", gap: "10px", transition: "background 0.2s" }}
                          onMouseOver={e => e.currentTarget.style.background = C.arctic} onMouseOut={e => e.currentTarget.style.background = "transparent"}
                        >
                          {isAdmin ? <LayoutDashboard size={16} color={C.saffron} /> : <Home size={16} color={C.saffron} />}
                          {isAdmin ? "Tableau de Bord" : "Espace Famille"}
                        </Link>
                        
                        <div style={{ height: "1px", background: C.lightGray, margin: "4px 8px" }} />
                        
                        <button 
                          onClick={() => signOut({ callbackUrl: "/" })}
                          style={{ padding: "12px 16px", borderRadius: "12px", fontSize: "13px", fontWeight: 700, color: "#ef4444", textDecoration: "none", display: "flex", alignItems: "center", gap: "10px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", transition: "background 0.2s" }}
                          onMouseOver={e => e.currentTarget.style.background = "#fef2f2"} onMouseOut={e => e.currentTarget.style.background = "transparent"}
                        >
                          <LogOut size={16} /> Déconnexion
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
             ) : (
                // Non connecté : Icône classique ouvrant la modale
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  style={{ width: "42px", height: "42px", borderRadius: "50%", background: C.arctic, color: C.teal, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }}
                  onMouseOver={e => { e.currentTarget.style.background = C.teal; e.currentTarget.style.color = C.white; }}
                  onMouseOut={e => { e.currentTarget.style.background = C.arctic; e.currentTarget.style.color = C.teal; }}
                >
                  <User size={18} />
                </button>
             )}
          </div>

          {/* Bouton Burger MOBILE */}
          <button 
            className="mobile-only"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: C.arctic, border: "none", width: "44px", height: "44px", borderRadius: "12px", alignItems: "center", justifyContent: "center", color: C.teal, cursor: "pointer" }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>

        {/* ── Menu Déroulant MOBILE ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }}
              style={{ position: "absolute", top: "100%", left: 0, right: 0, background: C.white, height: "100vh", padding: "24px", display: "flex", flexDirection: "column", gap: "8px", borderTop: `1px solid ${C.arctic}` }}
            >
              {NAV.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
                    style={{ padding: "16px 20px", borderRadius: "16px", background: isActive ? C.yellow : C.arctic, color: C.teal, fontSize: "16px", fontWeight: isActive ? 900 : 700, textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}
                  >
                    {item.label}
                    {isActive && <motion.span layoutId="mobile-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: C.teal }} />}
                  </Link>
                );
              })}

              {/* ⚡ Actions MOBILE Dynamiques */}
              <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
                
                {session ? (
                  <>
                    <Link 
                      href={isAdmin ? "/admin" : "/profil"} onClick={() => setMenuOpen(false)}
                      style={{ background: C.arctic, color: C.teal, padding: "16px", borderRadius: "16px", fontSize: "16px", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", textDecoration: "none" }}
                    >
                      {isAdmin ? <LayoutDashboard size={18} /> : <Home size={18} />} {isAdmin ? "Tableau de Bord" : "Espace Famille"}
                    </Link>
                    <button 
                      onClick={() => { signOut(); setMenuOpen(false); }}
                      style={{ background: "#fef2f2", color: "#ef4444", border: "none", padding: "16px", borderRadius: "16px", fontSize: "16px", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", cursor: "pointer" }}
                    >
                      <LogOut size={18} /> Déconnexion
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => { setIsAuthModalOpen(true); setMenuOpen(false); }}
                    style={{ background: C.arctic, color: C.teal, border: "none", padding: "16px", borderRadius: "16px", fontSize: "16px", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", cursor: "pointer" }}
                  >
                    <User size={18} /> Se connecter / S'inscrire
                  </button>
                )}

                <Link 
                  href="/contact" onClick={() => setMenuOpen(false)}
                  style={{ background: C.pink, color: C.white, padding: "16px", borderRadius: "16px", fontSize: "16px", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", textDecoration: "none" }}
                >
                  Contactez-nous <Mail size={16} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </header>

      {/* Intégration de la modale */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
}