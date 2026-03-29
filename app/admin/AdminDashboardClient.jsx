"use client";
import { useState, useRef } from "react";
import { 
  LayoutDashboard, Map, Users, FileText, Settings, 
  Menu, Tent, Euro, CheckCircle2, Clock, X, ChevronDown, UploadCloud, Image as ImageIcon
} from "lucide-react";

import { creerSejour } from "../actions/sejours";

const C = {
  yellow:  "#FFC801",
  saffron: "#FF9932",
  teal:    "#114C5A",
  lilac:   "#EFDEF9",
  arctic:  "#F1F6F4",
  white:   "#ffffff",
  gray:    "#8aaa",
  lightGray: "#e2e8f0"
};

const MENU = [
  { id: "dashboard", label: "Vue d'ensemble", icon: LayoutDashboard },
  { id: "sejours", label: "Gestion des Séjours", icon: Map },
  { id: "inscriptions", label: "Inscriptions", icon: FileText },
  { id: "clients", label: "Clients & Familles", icon: Users },
  { id: "settings", label: "Paramètres", icon: Settings },
];

/* ── COMPOSANTS UI RÉUTILISABLES ── */
function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div style={{ background: C.white, borderRadius: "24px", padding: "24px", boxShadow: "0 4px 16px rgba(17,76,90,0.04)", display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ width: "48px", height: "48px", borderRadius: "16px", background: color + "20", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={24} style={{ color: color }} />
        </div>
      </div>
      <div>
        <p style={{ fontSize: "13px", fontWeight: 700, color: C.gray, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>{title}</p>
        <h3 style={{ fontSize: "28px", fontWeight: 900, color: C.teal, lineHeight: 1 }}>{value}</h3>
      </div>
    </div>
  );
}

// 💎 MAGNIFIQUE CUSTOM DROPDOWN
function CustomSelect({ name, label, options, defaultValue }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue || options[0]);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px", position: "relative" }}>
      <label style={{ fontSize: "11px", fontWeight: 700, color: C.gray, textTransform: "uppercase" }}>{label}</label>
      
      {/* Input caché pour que le formulaire Next.js puisse lire la valeur */}
      <input type="hidden" name={name} value={selected.value} />

      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{ padding: "12px 16px", borderRadius: "12px", border: `1px solid ${isOpen ? C.yellow : C.lightGray}`, background: C.arctic, fontSize: "13px", color: C.teal, fontWeight: 600, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", transition: "all 0.2s" }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {selected.icon && <selected.icon size={14} color={selected.color || C.teal} />}
          {selected.label}
        </span>
        <ChevronDown size={14} style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
      </div>

      {isOpen && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, marginTop: "8px", background: C.white, borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", zIndex: 10, overflow: "hidden", border: `1px solid ${C.lightGray}` }}>
          {options.map((opt) => (
            <div 
              key={opt.value}
              onClick={() => { setSelected(opt); setIsOpen(false); }}
              style={{ padding: "12px 16px", fontSize: "13px", fontWeight: 600, color: C.teal, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", background: selected.value === opt.value ? C.arctic : "transparent" }}
              onMouseEnter={e => e.currentTarget.style.background = C.arctic}
              onMouseLeave={e => e.currentTarget.style.background = selected.value === opt.value ? C.arctic : "transparent"}
            >
              {opt.icon && <opt.icon size={14} color={opt.color || C.teal} />}
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 📸 ZONE D'UPLOAD D'IMAGE
function ImageUpload() {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontSize: "11px", fontWeight: 700, color: C.gray, textTransform: "uppercase" }}>Image de couverture</label>
      
      <div 
        onClick={() => fileInputRef.current?.click()}
        style={{ width: "100%", height: "140px", borderRadius: "16px", border: `2px dashed ${preview ? "transparent" : C.lightGray}`, background: C.arctic, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative", overflow: "hidden", transition: "all 0.2s" }}
        onMouseEnter={e => !preview && (e.currentTarget.style.borderColor = C.yellow)}
        onMouseLeave={e => !preview && (e.currentTarget.style.borderColor = C.lightGray)}
      >
        <input type="file" name="image" accept="image/*" ref={fileInputRef} onChange={handleImageChange} style={{ display: "none" }} />
        
        {preview ? (
          <img src={preview} alt="Aperçu" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <>
            <UploadCloud size={32} color={C.gray} style={{ marginBottom: "8px" }} />
            <p style={{ fontSize: "13px", fontWeight: 700, color: C.teal }}>Cliquez pour uploader une image</p>
            <p style={{ fontSize: "11px", color: C.gray, marginTop: "4px" }}>JPG, PNG ou WEBP (Max 5Mo)</p>
          </>
        )}
      </div>
    </div>
  );
}

/* ── DASHBOARD PRINCIPAL ── */
export default function AdminDashboardClient({ stats, inscriptions, sejours }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", background: C.arctic, fontFamily: "var(--font-montserrat), sans-serif", overflow: "hidden" }}>
      
      {/* SIDEBAR (Identique) */}
      <aside style={{ width: sidebarOpen ? "280px" : "80px", background: C.white, borderRight: `1px solid ${C.lightGray}`, display: "flex", flexDirection: "column", transition: "width 0.3s ease", zIndex: 50 }}>
        <div style={{ padding: "24px", display: "flex", alignItems: "center", gap: "12px", borderBottom: `1px solid ${C.lightGray}` }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: C.teal, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ color: C.yellow, fontWeight: 900, fontSize: "1rem" }}>M</span>
          </div>
          {sidebarOpen && (
            <div style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
              <div style={{ fontSize: "13px", fontWeight: 900, color: C.teal, letterSpacing: "1px" }}>MYM ADMIN</div>
            </div>
          )}
        </div>
        <nav style={{ flex: 1, padding: "24px 16px", display: "flex", flexDirection: "column", gap: "8px", overflowY: "auto" }}>
          {MENU.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button key={item.id} onClick={() => setActiveTab(item.id)} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "12px 16px", borderRadius: "14px", border: "none", cursor: "pointer", background: isActive ? C.yellow : "transparent", color: isActive ? C.teal : C.gray, transition: "all 0.2s", justifyContent: sidebarOpen ? "flex-start" : "center" }}>
                <item.icon size={20} style={{ flexShrink: 0 }} />
                {sidebarOpen && <span style={{ fontSize: "13px", fontWeight: isActive ? 800 : 600 }}>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
        
        {/* Header (Identique) */}
        <header style={{ height: "80px", background: C.white, borderBottom: `1px solid ${C.lightGray}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", flexShrink: 0 }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: C.arctic, border: "none", width: "40px", height: "40px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.teal }}><Menu size={20} /></button>
          <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: C.saffron, display: "flex", alignItems: "center", justifyContent: "center", color: C.white, fontWeight: 900, fontSize: "14px" }}>AD</div>
        </header>

        <div style={{ flex: 1, overflowY: "auto", padding: "32px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            
            <div style={{ marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div>
                <h1 style={{ fontSize: "28px", fontWeight: 900, color: C.teal, marginBottom: "8px" }}>Bonjour, l'équipe 👋</h1>
                <p style={{ fontSize: "14px", color: C.gray }}>Voici l'état actuel de vos réservations.</p>
              </div>
              <button onClick={() => setIsModalOpen(true)} style={{ background: C.teal, color: C.white, border: "none", padding: "12px 24px", borderRadius: "12px", fontSize: "13px", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", transition: "transform 0.2s" }}>
                + Nouveau Séjour
              </button>
            </div>

            {/* KPIs */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", marginBottom: "40px" }}>
              <StatCard title="Inscriptions" value={stats?.inscriptionsTotal || 0} icon={FileText} color={C.saffron} />
              <StatCard title="Chiffre d'affaires" value={`${stats?.ca || 0} €`} icon={Euro} color={"#10b981"} />
              <StatCard title="Séjours en base" value={stats?.sejoursActifs || 0} icon={Tent} color={C.teal} />
              <StatCard title="Familles" value={stats?.familles || 0} icon={Users} color={C.yellow} />
            </div>

            {/* TABLEAU */}
            <div style={{ background: C.white, borderRadius: "24px", padding: "32px", boxShadow: "0 4px 16px rgba(17,76,90,0.04)" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 800, color: C.teal, marginBottom: "24px" }}>Dernières Inscriptions</h2>
              <div style={{ width: "100%", overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                  <thead>
                    <tr style={{ borderBottom: `2px solid ${C.arctic}` }}>
                      <th style={{ padding: "16px", fontSize: "12px", color: C.gray, fontWeight: 700 }}>PARTICIPANT</th>
                      <th style={{ padding: "16px", fontSize: "12px", color: C.gray, fontWeight: 700 }}>SÉJOUR</th>
                      <th style={{ padding: "16px", fontSize: "12px", color: C.gray, fontWeight: 700 }}>STATUT</th>
                      <th style={{ padding: "16px", fontSize: "12px", color: C.gray, fontWeight: 700 }}>MONTANT PAYÉ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!inscriptions || inscriptions.length === 0 ? (
                      <tr><td colSpan="4" style={{ padding: "24px", textAlign: "center", color: C.gray, fontSize: "14px" }}>Aucune inscription pour le moment.</td></tr>
                    ) : (
                      inscriptions.map((b) => (
                        <tr key={b.id} style={{ borderBottom: `1px solid ${C.arctic}` }}>
                          <td style={{ padding: "16px", fontSize: "13px", fontWeight: 700, color: C.teal }}>{b.client?.nom} {b.client?.prenom}</td>
                          <td style={{ padding: "16px", fontSize: "13px", color: "#5a7a84", fontWeight: 500 }}>{b.sejour?.titre}</td>
                          <td style={{ padding: "16px" }}>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 800, padding: "6px 12px", borderRadius: "999px", background: b.statut === "Validé" ? "#10b98115" : C.saffron + "15", color: b.statut === "Validé" ? "#10b981" : C.saffron }}>
                              {b.statut === "Validé" ? <CheckCircle2 size={12} /> : <Clock size={12} />} {b.statut}
                            </span>
                          </td>
                          <td style={{ padding: "16px", fontSize: "13px", fontWeight: 800, color: C.teal }}>{b.montantPaye} €</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

        {/* ── NOUVELLE MODALE CUSTOM ── */}
        {isModalOpen && (
          <div style={{ position: "absolute", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(17, 76, 90, 0.4)", backdropFilter: "blur(4px)" }}>
            <div style={{ background: C.white, width: "100%", maxWidth: "650px", maxHeight: "90vh", overflowY: "auto", borderRadius: "24px", padding: "32px", boxShadow: "0 20px 40px rgba(0,0,0,0.1)", position: "relative" }}>
              
              <button type="button" onClick={() => setIsModalOpen(false)} style={{ position: "absolute", top: "24px", right: "24px", background: C.arctic, border: "none", width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.teal }}>
                <X size={16} />
              </button>

              <h2 style={{ fontSize: "20px", fontWeight: 900, color: C.teal, marginBottom: "24px" }}>Créer un nouveau séjour</h2>

              <form action={async (formData) => {
                setIsSubmitting(true);
                await creerSejour(formData);
                setIsSubmitting(false);
                setIsModalOpen(false);
              }} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                
                {/* Ligne 1 : Titre et Lieu */}
                <div style={{ display: "flex", gap: "16px" }}>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "11px", fontWeight: 700, color: C.gray, textTransform: "uppercase" }}>Titre du séjour</label>
                    <input type="text" name="titre" required placeholder="Colonie Ski Alpes" style={{ padding: "12px 16px", borderRadius: "12px", border: `1px solid ${C.lightGray}`, background: C.arctic, outline: "none", fontSize: "13px", color: C.teal, fontWeight: 600 }} />
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "11px", fontWeight: 700, color: C.gray, textTransform: "uppercase" }}>Lieu</label>
                    <input type="text" name="lieu" required placeholder="Châtel, France" style={{ padding: "12px 16px", borderRadius: "12px", border: `1px solid ${C.lightGray}`, background: C.arctic, outline: "none", fontSize: "13px", color: C.teal, fontWeight: 600 }} />
                  </div>
                </div>

                {/* Ligne 2 : Dates */}
                <div style={{ display: "flex", gap: "16px" }}>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "11px", fontWeight: 700, color: C.gray, textTransform: "uppercase" }}>Date de début</label>
                    <input type="date" name="dateDebut" required style={{ padding: "12px 16px", borderRadius: "12px", border: `1px solid ${C.lightGray}`, background: C.arctic, outline: "none", fontSize: "13px", color: C.teal, fontWeight: 600 }} />
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "11px", fontWeight: 700, color: C.gray, textTransform: "uppercase" }}>Date de fin</label>
                    <input type="date" name="dateFin" required style={{ padding: "12px 16px", borderRadius: "12px", border: `1px solid ${C.lightGray}`, background: C.arctic, outline: "none", fontSize: "13px", color: C.teal, fontWeight: 600 }} />
                  </div>
                </div>

                {/* Ligne 3 : Tranche d'âge, Prix, Places */}
                <div style={{ display: "flex", gap: "16px" }}>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "11px", fontWeight: 700, color: C.gray, textTransform: "uppercase" }}>Tranche d'âge</label>
                    <input type="text" name="trancheAge" required placeholder="Ex: 13-17 ans" style={{ padding: "12px 16px", borderRadius: "12px", border: `1px solid ${C.lightGray}`, background: C.arctic, outline: "none", fontSize: "13px", color: C.teal, fontWeight: 600 }} />
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "11px", fontWeight: 700, color: C.gray, textTransform: "uppercase" }}>Prix (€)</label>
                    <input type="number" name="prix" required min="0" placeholder="850" style={{ padding: "12px 16px", borderRadius: "12px", border: `1px solid ${C.lightGray}`, background: C.arctic, outline: "none", fontSize: "13px", color: C.teal, fontWeight: 600 }} />
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "11px", fontWeight: 700, color: C.gray, textTransform: "uppercase" }}>Places</label>
                    <input type="number" name="places" required min="1" placeholder="40" style={{ padding: "12px 16px", borderRadius: "12px", border: `1px solid ${C.lightGray}`, background: C.arctic, outline: "none", fontSize: "13px", color: C.teal, fontWeight: 600 }} />
                  </div>
                </div>

                {/* Ligne 4 : Custom Dropdowns */}
                <div style={{ display: "flex", gap: "16px", zIndex: 20 }}>
                  <CustomSelect 
                    name="saison" 
                    label="Saison"
                    options={[
                      { value: "Automne", label: "Automne", icon: Tent, color: C.saffron },
                      { value: "Hiver", label: "Hiver", icon: Tent, color: C.teal },
                      { value: "Printemps", label: "Printemps", icon: Tent, color: "#10b981" },
                      { value: "Été", label: "Été", icon: Tent, color: C.yellow }
                    ]}
                  />
                  <CustomSelect 
                    name="statut" 
                    label="Statut du séjour"
                    options={[
                      { value: "Brouillon", label: "Brouillon", icon: Clock, color: C.gray },
                      { value: "Publié", label: "Publié", icon: CheckCircle2, color: "#10b981" }
                    ]}
                  />
                </div>

                {/* Ligne 5 : L'upload d'image */}
                <ImageUpload />

                {/* Boutons d'action */}
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "8px" }}>
                  <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: "12px 24px", borderRadius: "12px", border: "none", background: "transparent", color: C.gray, fontWeight: 700, cursor: "pointer" }}>
                    Annuler
                  </button>
                  <button type="submit" disabled={isSubmitting} style={{ padding: "12px 24px", borderRadius: "12px", border: "none", background: C.yellow, color: C.teal, fontWeight: 800, cursor: isSubmitting ? "not-allowed" : "pointer", opacity: isSubmitting ? 0.7 : 1 }}>
                    {isSubmitting ? "Création en cours..." : "Enregistrer le séjour"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}