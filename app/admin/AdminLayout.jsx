// app/admin/AdminLayout.jsx
"use client";
import { useEffect, useRef, useState } from "react";
import { Menu, Search, ExternalLink } from "lucide-react";

export default function AdminLayout({ 
  children, 
  sidebarOpen, 
  setSidebarOpen, 
  activeTab, 
  setActiveTab, 
  MENU, 
  C,
  adminPrenom,
  recherche,
  onRecherche
}) {
  const initiale = (adminPrenom || "A").trim().charAt(0).toUpperCase();

  // Le bandeau + la navbar du site s'affichent au-dessus de l'admin : on retire leur
  // hauteur pour que l'admin tienne exactement dans l'écran (sinon le bas de la sidebar est coupé).
  const racine = useRef(null);
  const [decalage, setDecalage] = useState(0);
  useEffect(() => {
    const mesurer = () => {
      if (!racine.current) return;
      setDecalage(Math.max(0, Math.round(racine.current.getBoundingClientRect().top + window.scrollY)));
    };
    mesurer();
    window.addEventListener("resize", mesurer);
    return () => window.removeEventListener("resize", mesurer);
  }, []);
  return (
    <div ref={racine} style={{ display: "flex", height: `calc(100vh - ${decalage}px)`, width: "100%", background: C.arctic, fontFamily: "var(--font-montserrat), sans-serif", overflow: "hidden" }}>
      
      {/* ⚡ STYLES RESPONSIVES INJECTÉS */}
      <style>{`
        /* Sur Desktop (> 768px) */
        @media (min-width: 769px) {
          .mobile-bottom-bar { display: none !important; }
          .desktop-sidebar { display: flex !important; }
        }

        /* Sur Mobile (< 768px) */
        @media (max-width: 768px) {
          .desktop-sidebar { display: none !important; }
          .mobile-bottom-bar { display: flex !important; }
          
          /* On ajoute de l'espace en bas du contenu pour ne pas le cacher sous la barre */
          .main-container > .admin-content {
            padding: 24px 16px 120px 16px !important; 
          }
          .admin-topbar { padding: 10px 16px !important; }
        }

        /* 💧 EFFET LIQUID GLASS POUR LA BOTTOM BAR */
        .mobile-bottom-bar {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 32px);
          max-width: 400px;
          
          /* La fameuse pilule en fond */
          background: rgba(255, 255, 255, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.6);
          border-radius: 100px;
          padding: 8px 12px;
          
          /* L'effet flou (Glassmorphism) */
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 10px 40px rgba(17, 76, 90, 0.15), inset 0 1px 0 rgba(255,255,255,0.8);
          
          justify-content: space-between;
          align-items: center;
          z-index: 1000;
        }

        /* ⭕ HOVER CIRCULAIRES DES ICÔNES MOBILES */
        .mobile-nav-item {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }
        
        .mobile-nav-item.active {
          background: ${C.yellow};
          color: ${C.teal};
          box-shadow: 0 4px 12px rgba(255, 200, 1, 0.4);
        }
        
        .mobile-nav-item:not(.active) {
          background: transparent;
          color: ${C.gray};
        }

        .mobile-nav-item:hover:not(.active) {
          background: rgba(17, 76, 90, 0.08);
          color: ${C.teal};
        }
      `}</style>

      {/* 💻 DESKTOP : VOLET DE GAUCHE (SIDEBAR) */}
      <aside className="desktop-sidebar" style={{ width: sidebarOpen ? "280px" : "90px", background: C.white, borderRight: `1px solid ${C.lightGray}`, flexDirection: "column", transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)", zIndex: 50 }}>
        
        {/* En-tête Sidebar */}
        <div style={{ padding: "24px", display: "flex", alignItems: "center", justifyContent: sidebarOpen ? "flex-start" : "center", gap: "12px", borderBottom: `1px solid ${C.lightGray}` }}>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            style={{ background: C.arctic, border: "none", width: "42px", height: "42px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.teal, flexShrink: 0, transition: "background 0.2s" }}
            onMouseOver={(e) => e.currentTarget.style.background = C.lightGray}
            onMouseOut={(e) => e.currentTarget.style.background = C.arctic}
          >
            <Menu size={sidebarOpen ? 20 : 24} />
          </button>
          {sidebarOpen && <div style={{ fontSize: "14px", fontWeight: 900, color: C.teal, whiteSpace: "nowrap" }}>TABLEAU DE BORD</div>}
        </div>

        {/* Navigation Desktop */}
        <nav style={{ flex: 1, padding: sidebarOpen ? "16px 14px" : "16px 12px", display: "flex", flexDirection: "column", gap: "2px", overflowY: "auto", alignItems: sidebarOpen ? "stretch" : "center" }}>
          {MENU.map((item, i) => {
            const actif = activeTab === item.id;
            const nouveauGroupe = item.group && item.group !== MENU[i - 1]?.group;
            return (
              <div key={item.id} style={{ display: "contents" }}>
                {nouveauGroupe && (sidebarOpen
                  ? <div style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", color: "#a5bcc2", padding: i === 0 ? "4px 12px 8px" : "18px 12px 8px" }}>{item.group}</div>
                  : (i > 0 && <div style={{ width: "28px", height: "1px", background: C.lightGray, margin: "10px 0" }} />))}
                <button
                  onClick={() => (item.href ? (window.location.href = item.href) : setActiveTab(item.id))}
                  title={!sidebarOpen ? item.label : ""}
                  style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: sidebarOpen ? "flex-start" : "center", gap: "12px", padding: sidebarOpen ? "10px 12px" : "0", borderRadius: "12px", border: "none", cursor: "pointer", background: actif ? "rgba(255,200,1,0.2)" : "transparent", color: actif ? C.teal : C.gray, transition: "all 0.15s", width: sidebarOpen ? "100%" : "48px", height: sidebarOpen ? "auto" : "48px" }}
                  onMouseOver={(e) => { if (!actif) e.currentTarget.style.background = "rgba(17,76,90,0.05)"; }}
                  onMouseOut={(e) => { if (!actif) e.currentTarget.style.background = "transparent"; }}
                >
                  {actif && <span style={{ position: "absolute", left: sidebarOpen ? "-14px" : "-12px", top: "20%", bottom: "20%", width: "4px", borderRadius: "0 4px 4px 0", background: C.yellow }} />}
                  <item.icon size={sidebarOpen ? 18 : 22} style={{ flexShrink: 0 }} />
                  {sidebarOpen && <span style={{ fontSize: "13px", fontWeight: actif ? 800 : 600, whiteSpace: "nowrap" }}>{item.label}</span>}
                </button>
              </div>
            );
          })}
        </nav>

        {/* Bas de sidebar : lien vers le site + utilisateur */}
        <div style={{ borderTop: `1px solid ${C.lightGray}`, padding: sidebarOpen ? "14px" : "14px 12px", display: "flex", flexDirection: "column", gap: "10px", alignItems: sidebarOpen ? "stretch" : "center" }}>
          <a href="/" target="_blank" rel="noreferrer" title="Voir le site" style={{ display: "flex", alignItems: "center", justifyContent: sidebarOpen ? "flex-start" : "center", gap: "10px", padding: sidebarOpen ? "9px 12px" : "0", width: sidebarOpen ? "auto" : "40px", height: sidebarOpen ? "auto" : "40px", borderRadius: "10px", background: C.arctic, color: C.teal, fontSize: "12px", fontWeight: 700, textDecoration: "none" }}>
            <ExternalLink size={15} style={{ flexShrink: 0 }} />{sidebarOpen && "Voir le site"}
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: sidebarOpen ? "flex-start" : "center", padding: sidebarOpen ? "2px 4px" : 0 }}>
            <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: C.yellow, color: C.teal, fontWeight: 900, fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{initiale}</div>
            {sidebarOpen && (
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: "13px", fontWeight: 800, color: C.teal, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{adminPrenom || "L'équipe"}</div>
                <div style={{ fontSize: "11px", color: C.gray }}>Administrateur</div>
              </div>
            )}
          </div>
        </div>

      </aside>

      {/* 📱 MOBILE : BOTTOM NAVIGATION BAR (LIQUID GLASS) */}
      <nav className="mobile-bottom-bar">
        {MENU.map((item) => (
          <button 
            key={item.id} 
            onClick={() => (item.href ? (window.location.href = item.href) : setActiveTab(item.id))}
            className={`mobile-nav-item ${activeTab === item.id ? 'active' : ''}`}
            aria-label={item.label}
          >
            <item.icon size={28} />
          </button>
        ))}
      </nav>

      {/* ⚪ MAIN CONTENT SHELL */}
      <main className="main-container" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
        {onRecherche && (
          <div className="admin-topbar" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "12px 32px", background: C.white, borderBottom: `1px solid ${C.lightGray}`, flexShrink: 0 }}>
            <div style={{ position: "relative", flex: "1 1 auto", maxWidth: "520px" }}>
              <Search size={16} color={C.gray} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="search"
                value={recherche || ""}
                onChange={(e) => onRecherche(e.target.value)}
                placeholder="Rechercher un participant, un parent, un séjour…"
                style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px 10px 40px", borderRadius: "999px", border: `1px solid ${C.lightGray}`, background: C.arctic, fontSize: "13px", color: C.teal, outline: "none", fontFamily: "inherit" }}
              />
            </div>
          </div>
        )}
        {children}
      </main>
    </div>
  );
}