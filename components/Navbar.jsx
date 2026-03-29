"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion"; // <-- Import pour l'animation
import { 
  GraduationCap, CreditCard, Award, ArrowRight, Menu, X, Mail 
} from "lucide-react";

const C = {
  yellow:  "#FFC801",
  saffron: "#FF9932",
  teal:    "#114C5A",
  lilac:   "#EFDEF9",
  white:   "#ffffff",
  pink:    "#f63656",
};

const NAV = [
  { label: "Accueil", href: "/" },
  { label: "Qui sommes-nous", href: "/qui-sommes-nous" },
  { label: "Séjours enfants / ados", href: "/sejours-enfants-ados" },
  { label: "Sorties séniors", href: "/sorties-seniors" },
  { label: "Séjours scolaires", href: "/sejours-scolaires" },
  { label: "FAQ", href: "/faq" }
];

/* ─── LE COMPOSANT DE LIEN ANIMÉ ────────────────────────────────────────── */
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
      {/* Animation du fond JAUNE (Actif) - Il "glisse" entre les onglets */}
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

      {/* Animation du fond LILAS (Hover) */}
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

  return (
    <div style={{ position: "relative", zIndex: 1000 }}>
      <style>{`
        @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .my-ticker { animation: ticker 45s linear infinite; display: flex; white-space: nowrap; }
      `}</style>

      {/* ── Ticker ──────────────────────────────────────────────────────────── */}
      <div style={{ background: C.teal, height: "36px", overflow: "hidden", display: "flex", alignItems: "center" }}>
        <div className="my-ticker">
          {[...Array(10)].map((_, i) => (
            <span key={i} style={{ padding: "0 48px", fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: C.saffron, display: "flex", alignItems: "center", gap: "10px", flexShrink: 0, fontFamily: "var(--font-montserrat), sans-serif" }}>
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
        position: "sticky", top: 0,
        background: scrolled ? "rgba(241,246,244,.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 2px 24px rgba(17,76,90,0.08)" : "none",
        transition: "all .3s",
      }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px" }}>
          
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0, textDecoration: "none" }}>
            <img src="/logo-mym-couleur.png" alt="Logo Make Your Moment" style={{ height: "45px", borderRadius: "6px" }} />
          </Link>

          {/* Navigation avec animation de layout */}
          <nav style={{ display: "flex", alignItems: "center", gap: "8px", background: C.white, borderRadius: "999px", padding: "6px", boxShadow: "0 2px 12px rgba(17,76,90,0.08)" }}>
            {NAV.map((item) => (
              <NavItem 
                key={item.href} 
                item={item} 
                active={pathname === item.href} 
              />
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: "flex", gap: "10px", alignItems: "center", flexShrink: 0 }}>
             <Link href="/contact" style={{ background: C.yellow, color: C.teal, border: "none", padding: "10px 22px", borderRadius: "999px", fontSize: "14px", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 6px 20px rgba(255,200,1,0.3)" }}>
              Contactez-nous <Mail size={13} />
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}