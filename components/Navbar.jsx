"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GraduationCap, CreditCard, Award, Menu, X, Mail 
} from "lucide-react";

const C = {
  yellow:  "#FFC801",
  saffron: "#FF9932",
  teal:    "#114C5A",
  lilac:   "#EFDEF9",
  white:   "#ffffff",
  pink:    "#95005a",
  arctic:  "#F1F6F4",
};

const NAV = [
  { label: "Accueil", href: "/" },
  { label: "Qui sommes-nous", href: "/qui-sommes-nous" },
  { label: "Séjours enfants / ados", href: "/sejours-enfants-ados" },
  { label: "Sorties séniors", href: "/sorties-seniors" },
  /*{ label: "Séjours scolaires", href: "/sejours-scolaires" },*/
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
      {/* Fond JAUNE (Actif) */}
      {active && (
        <motion.div
          layoutId="active-pill"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: C.yellow,
            borderRadius: "999px",
            zIndex: -1,
          }}
        />
      )}

      {/* Fond LILAS (Hover) */}
      <AnimatePresence>
        {isHovered && !active && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: C.lilac,
              borderRadius: "999px",
              zIndex: -1,
            }}
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
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloquer le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [menuOpen]);

  return (
    <div style={{ position: "relative", zIndex: 1000, fontFamily: "var(--font-montserrat), sans-serif" }}>
      
      {/* ── STYLES ET MEDIA QUERIES ───────────────────────────────────────── */}
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

      {/* ── Ticker ──────────────────────────────────────────────────────────── */}
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

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <header style={{
        position: "sticky", 
        top: 0,
        background: scrolled || menuOpen ? "rgba(255,255,255,0.98)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
        boxShadow: scrolled || menuOpen ? "0 2px 24px rgba(17,76,90,0.08)" : "none",
        transition: "all .3s ease",
      }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px" }}>
          
          {/* Logo */}
          <Link href="/" onClick={() => setMenuOpen(false)} style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0, textDecoration: "none" }}>
            <img src="/logo-mym-couleur.png" alt="Logo Make Your Moment" style={{ height: "45px", borderRadius: "6px" }} />
          </Link>

          {/* Navigation DESKTOP */}
          <nav className="desktop-only" style={{ alignItems: "center", gap: "8px", background: C.white, borderRadius: "999px", padding: "6px", boxShadow: "0 2px 12px rgba(17,76,90,0.08)" }}>
            {NAV.map((item) => (
              <NavItem 
                key={item.href} 
                item={item} 
                active={pathname === item.href} 
              />
            ))}
          </nav>

          {/* Actions DESKTOP */}
          <div className="desktop-only" style={{ gap: "10px", alignItems: "center", flexShrink: 0 }}>
             <Link href="/contact" style={{ background: C.pink, color: C.white, border: "none", padding: "10px 22px", borderRadius: "999px", fontSize: "14px", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 6px 20px rgba(255,200,1,0.3)", textDecoration: "none" }}>
              Contactez-nous <Mail size={13} />
            </Link>
          </div>

          {/* Bouton Burger MOBILE */}
          <button 
            className="mobile-only"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: C.arctic,
              border: "none",
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              alignItems: "center",
              justifyContent: "center",
              color: C.teal,
              cursor: "pointer",
            }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>

        {/* ── Menu Déroulant MOBILE ───────────────────────────────────────── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: C.white,
                height: "100vh",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                borderTop: `1px solid ${C.arctic}`,
              }}
            >
              {NAV.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      padding: "16px 20px",
                      borderRadius: "16px",
                      background: isActive ? C.yellow : C.arctic,
                      color: C.teal,
                      fontSize: "16px",
                      fontWeight: isActive ? 900 : 700,
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    {item.label}
                    {isActive && <motion.span layoutId="mobile-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: C.teal }} />}
                  </Link>
                );
              })}

              <div style={{ marginTop: "24px" }}>
                <Link 
                  href="/contact" 
                  onClick={() => setMenuOpen(false)}
                  style={{ 
                    background: C.teal, 
                    color: C.white, 
                    padding: "18px", 
                    borderRadius: "16px", 
                    fontSize: "16px", 
                    fontWeight: 800, 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    gap: "12px",
                    textDecoration: "none"
                  }}
                >
                  Contactez-nous <Mail size={16} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </header>
    </div>
  );
}