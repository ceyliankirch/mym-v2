// app/admin/AdminLayout.jsx
import { Menu } from "lucide-react";

export default function AdminLayout({ 
  children, 
  sidebarOpen, 
  setSidebarOpen, 
  activeTab, 
  setActiveTab, 
  MENU, 
  C 
}) {
  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", background: C.arctic, fontFamily: "var(--font-montserrat), sans-serif", overflow: "hidden" }}>
      
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
          .main-container > div {
            padding: 24px 16px 120px 16px !important; 
          }
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
        <nav style={{ flex: 1, padding: sidebarOpen ? "24px 16px" : "24px 12px", display: "flex", flexDirection: "column", gap: "12px", overflowY: "auto", alignItems: sidebarOpen ? "stretch" : "center" }}>
          {MENU.map((item) => (
            <button 
              key={item.id} 
              onClick={() => setActiveTab(item.id)}
              title={!sidebarOpen ? item.label : ""} 
              style={{ display: "flex", alignItems: "center", justifyContent: sidebarOpen ? "flex-start" : "center", gap: "16px", padding: sidebarOpen ? "12px 16px" : "14px", borderRadius: "14px", border: "none", cursor: "pointer", background: activeTab === item.id ? C.yellow : "transparent", color: activeTab === item.id ? C.teal : C.gray, transition: "all 0.2s", width: sidebarOpen ? "100%" : "56px", height: sidebarOpen ? "auto" : "56px" }}>
              <item.icon size={sidebarOpen ? 20 : 26} style={{ flexShrink: 0 }} />
              {sidebarOpen && <span style={{ fontSize: "13px", fontWeight: activeTab === item.id ? 800 : 600, whiteSpace: "nowrap" }}>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Profil Desktop */}
        <div style={{ padding: sidebarOpen ? "20px" : "20px 0", borderTop: `1px solid ${C.lightGray}`, display: "flex", alignItems: "center", justifyContent: sidebarOpen ? "flex-start" : "center", gap: "12px", overflow: "hidden" }}>
          <div style={{ width: "46px", height: "46px", borderRadius: "14px", background: C.saffron, display: "flex", alignItems: "center", justifyContent: "center", color: C.white, fontWeight: 900, fontSize: "16px", flexShrink: 0 }}>AD</div>
          {sidebarOpen && (
            <div style={{ display: "flex", flexDirection: "column", whiteSpace: "nowrap" }}>
              <span style={{ fontSize: "13px", fontWeight: 800, color: C.teal }}>Admin</span>
              <span style={{ fontSize: "11px", fontWeight: 600, color: C.gray }}>contact@mym.com</span>
            </div>
          )}
        </div>
      </aside>

      {/* 📱 MOBILE : BOTTOM NAVIGATION BAR (LIQUID GLASS) */}
      <nav className="mobile-bottom-bar">
        {MENU.map((item) => (
          <button 
            key={item.id} 
            onClick={() => setActiveTab(item.id)}
            className={`mobile-nav-item ${activeTab === item.id ? 'active' : ''}`}
            aria-label={item.label}
          >
            <item.icon size={28} />
          </button>
        ))}
      </nav>

      {/* ⚪ MAIN CONTENT SHELL */}
      <main className="main-container" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
        {children}
      </main>
    </div>
  );
}