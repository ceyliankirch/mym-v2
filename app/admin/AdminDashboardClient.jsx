// app/admin/AdminDashboardClient.jsx
"use client";
import { useState, useRef } from "react";
import { 
  LayoutDashboard, Map, Users, FileText, Settings, 
  Menu, Tent, Euro, CheckCircle2, Clock, X, ChevronDown, 
  UploadCloud, Image as ImageIcon, Mail, Phone, Calendar, Search,
  LayoutGrid, List, CalendarDays,
  ClipboardList, ExternalLink, Edit, Trash2,
  MapPin, Filter,
  Leaf, Snowflake, Flower, Sun,
  Eye, EyeOff, Star
} from "lucide-react";

import AdminLayout from "./AdminLayout"; 
// ⚡ IMPORT DÉCOMMENTÉ : On active la connexion avec les actions serveur
import { creerSejour, modifierSejour, supprimerSejour, toggleStatut, toggleEnAvant } from "../actions/sejours";

/* ── CONSTANTES GLOBALES ── */
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

/* ── UTILS ── */
const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toISOString().split('T')[0];
};

const formatAge = (ageString) => {
  if (!ageString) return "Âges à définir";
  const str = ageString.toLowerCase();
  if (str.includes("ans") || str.includes("sénior") || str.includes("senior")) {
    return ageString;
  }
  return `${ageString} ans`;
};

// ⚡ FONCTION INTELLIGENTE POUR FORMATER LES DATES
const formatSejourDates = (startStr, endStr) => {
  if (!startStr) return "À définir";
  
  const start = new Date(startStr);
  if (!endStr) return start.toLocaleDateString("fr-FR");
  
  const end = new Date(endStr);
  if (start.getTime() === end.getTime()) {
    return start.toLocaleDateString("fr-FR");
  }

  const mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  
  const startDay = start.getDate();
  const startMonth = mois[start.getMonth()];
  const startYear = start.getFullYear();
  
  const endDay = end.getDate();
  const endMonth = mois[end.getMonth()];
  const endYear = end.getFullYear();

  if (startYear !== endYear) return `Du ${startDay} ${startMonth} ${startYear} au ${endDay} ${endMonth} ${endYear}`;
  if (startMonth !== endMonth) return `Du ${startDay} ${startMonth} au ${endDay} ${endMonth}`;
  return `Du ${startDay} au ${endDay} ${startMonth}`;
};

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

function FilterDropdown({ value, onChange, options, defaultLabel }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOpt = options.find(o => o.value === value);
  const displayLabel = selectedOpt ? selectedOpt.label : defaultLabel;

  return (
    <div style={{ position: "relative" }}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{ padding: "10px 14px", borderRadius: "10px", border: `1px solid ${isOpen ? C.yellow : C.lightGray}`, background: C.white, fontSize: "13px", color: C.teal, fontWeight: 700, display: "flex", alignItems: "center", gap: "16px", cursor: "pointer", transition: "all 0.2s", boxShadow: isOpen ? "0 4px 12px rgba(255, 200, 1, 0.15)" : "none" }}
      >
        <span>{displayLabel}</span>
        <ChevronDown size={14} style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", color: C.gray }} />
      </div>

      {isOpen && (
        <div style={{ position: "absolute", top: "100%", left: 0, minWidth: "100%", marginTop: "8px", background: C.white, borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", zIndex: 50, overflow: "hidden", border: `1px solid ${C.lightGray}`, whiteSpace: "nowrap" }}>
          <div onClick={() => { onChange(""); setIsOpen(false); }} style={{ padding: "12px 16px", fontSize: "13px", fontWeight: 700, color: value === "" ? C.teal : C.gray, cursor: "pointer", background: value === "" ? C.arctic : "transparent" }} onMouseOver={e => e.currentTarget.style.background = C.arctic} onMouseOut={e => e.currentTarget.style.background = value === "" ? C.arctic : "transparent"}>
            {defaultLabel}
          </div>
          {options.map(opt => (
            <div key={opt.value} onClick={() => { onChange(opt.value); setIsOpen(false); }} style={{ padding: "12px 16px", fontSize: "13px", fontWeight: 600, color: C.teal, cursor: "pointer", background: value === opt.value ? C.arctic : "transparent" }} onMouseOver={e => e.currentTarget.style.background = C.arctic} onMouseOut={e => e.currentTarget.style.background = value === opt.value ? C.arctic : "transparent"}>
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CustomSelect({ name, label, options, defaultValue }) {
  const [isOpen, setIsOpen] = useState(false);
  const initialOption = options.find(o => o.value === defaultValue) || options[0];
  const [selected, setSelected] = useState(initialOption);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px", position: "relative" }}>
      <label style={{ fontSize: "11px", fontWeight: 700, color: C.gray, textTransform: "uppercase" }}>{label}</label>
      <input type="hidden" name={name} value={selected.value} />
      <div onClick={() => setIsOpen(!isOpen)} style={{ padding: "12px 16px", borderRadius: "12px", border: `1px solid ${isOpen ? C.yellow : C.lightGray}`, background: C.arctic, fontSize: "13px", color: C.teal, fontWeight: 600, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {selected.icon && <selected.icon size={14} color={selected.color || C.teal} />}
          {selected.label}
        </span>
        <ChevronDown size={14} style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }} />
      </div>
      {isOpen && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, marginTop: "8px", background: C.white, borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", zIndex: 10, overflow: "hidden", border: `1px solid ${C.lightGray}` }}>
          {options.map((opt) => (
            <div key={opt.value} onClick={() => { setSelected(opt); setIsOpen(false); }} style={{ padding: "12px 16px", fontSize: "13px", fontWeight: 600, color: C.teal, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
              {opt.icon && <opt.icon size={14} color={opt.color || C.teal} />}
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ImageUpload({ defaultValue }) {
  const [preview, setPreview] = useState(defaultValue || null);
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
      <div onClick={() => fileInputRef.current?.click()} style={{ width: "100%", height: "140px", borderRadius: "16px", border: `2px dashed ${preview ? "transparent" : C.lightGray}`, background: C.arctic, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative", overflow: "hidden" }}>
        <input type="file" name="image" accept="image/*" ref={fileInputRef} onChange={handleImageChange} style={{ display: "none" }} />
        {preview ? <img src={preview} alt="Aperçu" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : (
          <>
            <UploadCloud size={32} color={C.gray} style={{ marginBottom: "8px" }} />
            <p style={{ fontSize: "13px", fontWeight: 700, color: C.teal }}>Cliquez pour uploader</p>
          </>
        )}
      </div>
    </div>
  );
}

/* ── MODALE CRÉATION / ÉDITION ── */
function ModalSejour({ sejourData, setSejourEnEdition, isSubmitting, setIsSubmitting }) {
  const isEditing = sejourData !== "nouveau" && sejourData !== "nouveau-senior";
  const defaultAge = sejourData === "nouveau-senior" ? "Séniors" : "";
  const [prixOptions, setPrixOptions] = useState(isEditing && sejourData.prix ? [sejourData.prix] : [0]);

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(17, 76, 90, 0.4)", backdropFilter: "blur(4px)" }}>
      <div style={{ background: C.white, width: "100%", maxWidth: "650px", maxHeight: "90vh", overflowY: "auto", borderRadius: "24px", padding: "32px", position: "relative", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}>
        <button onClick={() => setSejourEnEdition(null)} style={{ position: "absolute", top: "24px", right: "24px", background: C.arctic, border: "none", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={16}/></button>
        <h2 style={{ fontSize: "20px", fontWeight: 900, color: C.teal, marginBottom: "24px" }}>
          {isEditing ? "Modifier le séjour" : (sejourData === "nouveau-senior" ? "Créer une sortie Sénior" : "Créer un nouveau séjour")}
        </h2>
        
        <form action={async (formData) => {
          setIsSubmitting(true);
          // ⚡ DÉCOMMENTÉ : On sauvegarde en base de données
          if (isEditing) { await modifierSejour(sejourData.id, formData); } 
          else { await creerSejour(formData); }
          setIsSubmitting(false);
          setSejourEnEdition(null);
        }} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          <div style={{ display: "flex", gap: "16px" }}>
            <input type="text" name="titre" defaultValue={isEditing ? sejourData.titre : ""} required placeholder="Titre du séjour" style={{ flex: 1, padding: "12px", borderRadius: "12px", border: `1px solid ${C.lightGray}` }} />
            <input type="text" name="tranchesAge" defaultValue={isEditing ? sejourData.tranchesAge : defaultAge} placeholder="Âges (ex: 6-12)" style={{ flex: 1, padding: "12px", borderRadius: "12px", border: `1px solid ${C.lightGray}` }} />
          </div>

          <div style={{ display: "flex", gap: "16px" }}>
             <input type="text" name="lieu" defaultValue={isEditing ? sejourData.lieu : ""} placeholder="Lieu (Ville, Pays)" style={{ flex: 1, padding: "12px", borderRadius: "12px", border: `1px solid ${C.lightGray}` }} />
             <input type="number" name="places" defaultValue={isEditing ? sejourData.places : ""} placeholder="Nombre de places" style={{ flex: 1, padding: "12px", borderRadius: "12px", border: `1px solid ${C.lightGray}` }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "11px", fontWeight: 700, color: C.gray, textTransform: "uppercase" }}>Option(s) de prix (€)</label>
            {prixOptions.map((p, idx) => (
              <input key={idx} type="number" name="prix" defaultValue={p} placeholder="Prix" style={{ padding: "12px", borderRadius: "12px", border: `1px solid ${C.lightGray}` }} />
            ))}
            <button type="button" onClick={() => setPrixOptions([...prixOptions, 0])} style={{ background: "none", border: `1px dashed ${C.gray}`, color: C.gray, padding: "8px", borderRadius: "10px", fontSize: "12px", cursor: "pointer" }}>+ Ajouter une option de prix</button>
          </div>
          
          <div style={{ display: "flex", gap: "16px" }}>
            <input type="date" name="dateDebut" defaultValue={isEditing ? formatDateForInput(sejourData.dateDebut) : ""} style={{ flex: 1, padding: "12px", borderRadius: "12px", border: `1px solid ${C.lightGray}`, color: C.gray }} />
            <input type="date" name="dateFin" defaultValue={isEditing ? formatDateForInput(sejourData.dateFin) : ""} style={{ flex: 1, padding: "12px", borderRadius: "12px", border: `1px solid ${C.lightGray}`, color: C.gray }} />
          </div>
          
          <div style={{ display: "flex", gap: "16px", zIndex: 20 }}>
            <CustomSelect name="saison" label="Saison" defaultValue={isEditing ? sejourData.saison : "Automne"} options={[
              { value: "Automne", label: "Automne", icon: Leaf, color: C.saffron },
              { value: "Hiver", label: "Hiver", icon: Snowflake, color: C.teal },
              { value: "Printemps", label: "Printemps", icon: Flower, color: "#10b981" },
              { value: "Été", label: "Été", icon: Sun, color: C.yellow }
            ]} />
            <CustomSelect name="statut" label="Statut" defaultValue={isEditing ? sejourData.statut : "Brouillon"} options={[
              { value: "Brouillon", label: "Brouillon", icon: Clock, color: C.gray },
              { value: "Publié", label: "Publié", icon: CheckCircle2, color: "#10b981" }
            ]} />
          </div>
          
          <ImageUpload defaultValue={isEditing ? sejourData.imageUrl : null} />
          
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
            <button type="button" onClick={() => setSejourEnEdition(null)} style={{ cursor: "pointer", background: "none", border: "none", color: C.gray, fontWeight: 600 }}>Annuler</button>
            <button type="submit" disabled={isSubmitting} style={{ background: C.yellow, color: C.teal, padding: "12px 24px", borderRadius: "12px", border: "none", fontWeight: 800 }}>
              {isSubmitting ? "Enregistrement..." : (isEditing ? "Enregistrer les modifications" : "Enregistrer")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ── COMPOSANTS DE TABLEAUX ET GRILLES ── */
function TableInscriptions({ data }) {
  return (
    <div style={{ background: C.white, borderRadius: "24px", padding: "32px", boxShadow: "0 4px 16px rgba(17,76,90,0.04)" }}>
      <h2 style={{ fontSize: "18px", fontWeight: 800, color: C.teal, marginBottom: "24px" }}>Dernières Inscriptions</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead><tr style={{ borderBottom: `2px solid ${C.arctic}`, textAlign: "left" }}>
          <th style={{ padding: "16px", fontSize: "12px", color: C.gray }}>PARTICIPANT</th>
          <th style={{ padding: "16px", fontSize: "12px", color: C.gray }}>SÉJOUR</th>
          <th style={{ padding: "16px", fontSize: "12px", color: C.gray }}>MONTANT</th>
        </tr></thead>
        <tbody>
          {data?.map(b => (
            <tr key={b.id} style={{ borderBottom: `1px solid ${C.arctic}` }}>
              <td style={{ padding: "16px", fontSize: "13px", fontWeight: 700, color: C.teal }}>{b.client?.nom} {b.client?.prenom}</td>
              <td style={{ padding: "16px", fontSize: "13px" }}>{b.sejour?.titre}</td>
              <td style={{ padding: "16px", fontSize: "13px", fontWeight: 800 }}>{b.montantPaye} €</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableSejours({ data, onEdit, onDelete, onToggleStatut, onToggleEnAvant }) {
  const actionBtnStyle = { background: C.arctic, border: "none", width: "32px", height: "32px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.teal, transition: "background 0.2s" };

  return (
    <div style={{ background: C.white, borderRadius: "24px", padding: "32px", boxShadow: "0 4px 16px rgba(17,76,90,0.04)", overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
        <thead>
          <tr style={{ borderBottom: `2px solid ${C.arctic}`, textAlign: "left" }}>
            <th style={{ padding: "16px", width: "70px" }}></th>
            <th style={{ padding: "16px", fontSize: "12px", color: C.gray }}>SÉJOUR</th>
            <th style={{ padding: "16px", fontSize: "12px", color: C.gray }}>ÂGE</th>
            <th style={{ padding: "16px", fontSize: "12px", color: C.gray }}>REMPLISSAGE</th>
            <th style={{ padding: "16px", fontSize: "12px", color: C.gray }}>DATES</th>
            <th style={{ padding: "16px", fontSize: "12px", color: C.gray }}>PRIX</th>
            <th style={{ padding: "16px", fontSize: "12px", color: C.gray, textAlign: "right" }}>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(s => {
            const nbInscrits = s._count?.inscriptions || s.inscriptions?.length || 0;
            const places = s.places || 0;
            const pourcentage = places > 0 ? Math.min(100, Math.round((nbInscrits / places) * 100)) : 0;
            const jaugeColor = pourcentage >= 100 ? "#f63656" : pourcentage >= 80 ? C.saffron : "#10b981";
            
            const isPublie = s.statut === "Publié";
            const isEnAvant = s.enAvant;

            return (
              <tr key={s.id} className="hover-row" style={{ borderBottom: `1px solid ${C.arctic}`, transition: "all 0.2s", background: isPublie ? "transparent" : "#f8fafc", opacity: isPublie ? 1 : 0.6 }} onMouseOver={e => e.currentTarget.style.background = C.arctic} onMouseOut={e => e.currentTarget.style.background = isPublie ? "transparent" : "#f8fafc"}>
                
                <td style={{ padding: "16px" }}>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <button onClick={() => onToggleStatut(s.id, isPublie ? "Brouillon" : "Publié")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", opacity: 1 }} title={isPublie ? "Masquer (Passer en Brouillon)" : "Publier"}>
                      {isPublie ? <Eye size={18} color={"#10b981"} /> : <EyeOff size={18} color={C.gray} />}
                    </button>
                    <button onClick={() => onToggleEnAvant(s.id, !isEnAvant)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", opacity: 1 }} title={isEnAvant ? "Retirer de l'affiche" : "Mettre à l'affiche"}>
                      <Star size={18} color={isEnAvant ? C.yellow : C.gray} fill={isEnAvant ? C.yellow : "transparent"} />
                    </button>
                  </div>
                </td>

                <td style={{ padding: "16px", fontSize: "13px", fontWeight: 800, color: C.teal, filter: isPublie ? "none" : "grayscale(100%)" }}>
                  {s.titre}
                  <div style={{ fontSize: "11px", fontWeight: 600, color: C.gray, marginTop: "4px" }}>{s.saison}</div>
                </td>
                
                <td style={{ padding: "16px", fontSize: "13px", color: C.gray, fontWeight: 600 }}>
                  {formatAge(s.tranchesAge)}
                </td>

                <td style={{ padding: "16px", minWidth: "140px", filter: isPublie ? "none" : "grayscale(100%)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: 700, color: C.teal, marginBottom: "6px" }}>
                    <span>{nbInscrits} inscrit{nbInscrits > 1 ? 's' : ''}</span>
                    <span style={{ color: C.gray }}>/ {places}</span>
                  </div>
                  <div style={{ width: "100%", height: "6px", background: C.lightGray, borderRadius: "3px", overflow: "hidden" }}>
                    <div style={{ width: `${pourcentage}%`, height: "100%", background: jaugeColor, borderRadius: "3px", transition: "width 0.3s" }} />
                  </div>
                </td>

                <td style={{ padding: "16px", fontSize: "13px", color: C.gray }}>
                  {formatSejourDates(s.dateDebut, s.dateFin)}
                </td>
                
                <td style={{ padding: "16px", fontSize: "13px", fontWeight: 800, color: C.teal }}>{s.prix || 0} €</td>
                <td style={{ padding: "16px", display: "flex", gap: "6px", justifyContent: "flex-end", alignItems: "center" }}>
                  <div className="extra-actions" style={{ display: "flex", gap: "6px" }}>
                    <button title="Inscrits" style={actionBtnStyle}><Users size={15} /></button>
                    <button title="Formulaire" style={actionBtnStyle}><ClipboardList size={15} /></button>
                    <button title="Lien public" style={actionBtnStyle}><ExternalLink size={15} /></button>
                  </div>
                  <button title="Éditer" onClick={() => onEdit(s)} style={{...actionBtnStyle, opacity: 1}}><Edit size={15} /></button>
                  <button title="Supprimer" onClick={() => onDelete(s.id)} style={{ ...actionBtnStyle, color: "#f63656", background: "#f6365615", opacity: 1 }}><Trash2 size={15} /></button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function GridSejours({ data, onEdit, onDelete, onToggleStatut, onToggleEnAvant }) {
  const actionBtnStyle = { background: "transparent", border: "none", width: "32px", height: "32px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.gray };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
      {data?.map(s => {
        const nbInscrits = s._count?.inscriptions || s.inscriptions?.length || 0;
        const places = s.places || 0;
        const pourcentage = places > 0 ? Math.min(100, Math.round((nbInscrits / places) * 100)) : 0;
        const jaugeColor = pourcentage >= 100 ? "#f63656" : pourcentage >= 80 ? C.saffron : "#10b981";
        const isPublie = s.statut === "Publié";
        const isEnAvant = s.enAvant;

        return (
          <div key={s.id} className="hover-row" style={{ background: isPublie ? C.white : "#f8fafc", borderRadius: "20px", overflow: "hidden", boxShadow: "0 4px 16px rgba(17,76,90,0.04)", border: `1px solid ${C.lightGray}`, display: "flex", flexDirection: "column", opacity: isPublie ? 1 : 0.6, transition: "all 0.2s" }}>
            
            <div style={{ height: "130px", background: C.arctic, position: "relative", overflow: "hidden" }}>
              {s.imageUrl ? <img src={s.imageUrl} style={{width:'100%', height:'100%', objectFit:'cover', filter: isPublie ? "none" : "grayscale(100%)"}} /> : <ImageIcon size={32} color={C.gray} style={{opacity:0.3, position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)'}} />}
              
              <div style={{ position: "absolute", top: "12px", left: "12px", display: "flex", gap: "8px" }}>
                <button onClick={() => onToggleStatut(s.id, isPublie ? "Brouillon" : "Publié")} style={{ background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "8px", padding: "6px", cursor: "pointer", display: "flex", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", opacity: 1 }} title={isPublie ? "Masquer" : "Publier"}>
                  {isPublie ? <Eye size={14} color={"#10b981"} /> : <EyeOff size={14} color={C.gray} />}
                </button>
                <button onClick={() => onToggleEnAvant(s.id, !isEnAvant)} style={{ background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "8px", padding: "6px", cursor: "pointer", display: "flex", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", opacity: 1 }} title={isEnAvant ? "Retirer de l'affiche" : "Mettre à l'affiche"}>
                  <Star size={14} color={isEnAvant ? C.yellow : C.gray} fill={isEnAvant ? C.yellow : "transparent"} />
                </button>
              </div>

              <div style={{ position: "absolute", top: "12px", right: "12px", background: C.white, padding: "6px 10px", borderRadius: "10px", fontSize: "12px", fontWeight: 800, color: C.teal, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>{s.prix || "0"} €</div>
            </div>
            
            <div style={{ padding: "16px", flex: 1, filter: isPublie ? "none" : "grayscale(100%)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 800, color: C.teal, lineHeight: 1.3 }}>{s.titre}</h3>
                <span style={{ background: C.arctic, padding: "4px 8px", borderRadius: "6px", fontSize: "10px", fontWeight: 800, color: C.teal, textTransform: "uppercase" }}>{s.saison}</span>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "12px", color: C.gray, fontWeight: 600 }}>
                  <CalendarDays size={16} color={C.saffron} /> {formatSejourDates(s.dateDebut, s.dateFin)}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "12px", color: C.gray, fontWeight: 600 }}>
                  <MapPin size={16} color={"#10b981"} /> {s.lieu || "Lieu à définir"}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "12px", color: C.gray, fontWeight: 600 }}>
                  <Users size={16} color={C.teal} /> {formatAge(s.tranchesAge)}
                </div>
              </div>

              <div style={{ background: C.arctic + "60", padding: "12px", borderRadius: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", fontWeight: 700, color: C.teal, marginBottom: "6px" }}>
                  <span>{nbInscrits} inscrit{nbInscrits > 1 ? 's' : ''}</span>
                  <span style={{ color: C.gray }}>/ {places} max.</span>
                </div>
                <div style={{ width: "100%", height: "6px", background: C.lightGray, borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ width: `${pourcentage}%`, height: "100%", background: jaugeColor, borderRadius: "3px" }} />
                </div>
              </div>
            </div>

            <div style={{ padding: "12px 16px", borderTop: `1px solid ${C.lightGray}`, display: "flex", justifyContent: "space-between", background: C.arctic + "40" }}>
              <div className="extra-actions" style={{ display: "flex", gap: "4px" }}>
                <button title="Voir les inscrits" style={actionBtnStyle}><Users size={16} /></button>
                <button title="Lien du formulaire" style={actionBtnStyle}><ClipboardList size={16} /></button>
              </div>
              <div style={{ display: "flex", gap: "4px" }}>
                <button title="Éditer" onClick={() => onEdit(s)} style={{...actionBtnStyle, opacity: 1}}><Edit size={16} /></button>
                <button title="Supprimer" onClick={() => onDelete(s.id)} style={{...actionBtnStyle, color: "#f63656", opacity: 1}}><Trash2 size={16} /></button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── DASHBOARD PRINCIPAL ── */
export default function AdminDashboardClient({ stats, inscriptions, sejours, clients }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sejourEnEdition, setSejourEnEdition] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewMode, setViewMode] = useState("table");

  const [filterSaison, setFilterSaison] = useState("");
  const [filterAge, setFilterAge] = useState("");
  const [filterStatut, setFilterStatut] = useState("");

  const sejoursTries = [...(sejours || [])].sort((a, b) => new Date(a.dateDebut) - new Date(b.dateDebut));
  const uniqueAges = [...new Set(sejoursTries.map(s => s.tranchesAge).filter(Boolean))];

  const sejoursFiltres = sejoursTries.filter(s => {
    if (filterSaison && s.saison !== filterSaison) return false;
    if (filterAge && s.tranchesAge !== filterAge) return false;
    if (filterStatut && s.statut !== filterStatut) return false;
    return true;
  });

  // ⚡ DÉCOMMENTÉ : Déclenche la Server Action de suppression
  const handleDelete = async (id) => {
    if(window.confirm("Supprimer définitivement ce séjour ?")) { 
      await supprimerSejour(id); 
    }
  };

  // ⚡ DÉCOMMENTÉ : Déclenche la Server Action pour le Statut (Brouillon/Publié)
  const handleToggleStatut = async (id, nouveauStatut) => {
    await toggleStatut(id, nouveauStatut);
  };

  // ⚡ DÉCOMMENTÉ : Déclenche la Server Action pour la mise en avant (Etoile)
  const handleToggleEnAvant = async (id, estEnAvant) => {
    await toggleEnAvant(id, estEnAvant);
  };

  return (
    <AdminLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} MENU={MENU} C={C}>
      
      <style>{`
        .extra-actions { opacity: 0; transform: translateX(10px); transition: all 0.2s ease; }
        .hover-row:hover .extra-actions { opacity: 1; transform: translateX(0); }
      `}</style>

      <div style={{ flex: 1, overflowY: "auto", padding: "40px 32px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          <div style={{ marginBottom: "40px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "20px", flexWrap: "wrap" }}>
            <div>
              <h1 style={{ fontSize: "32px", fontWeight: 900, color: C.teal, marginBottom: "8px" }}>
                {activeTab === "dashboard" && "Bonjour, l'équipe 👋"}
                {activeTab === "sejours" && "Gestion des Séjours 🏕️"}
                {activeTab === "clients" && "Répertoire Clients 👥"}
              </h1>
              <p style={{ fontSize: "14px", color: C.gray }}>Données Neon en temps réel.</p>
            </div>
            <div style={{ position: "relative", width: "320px" }}>
              <Search size={18} color={C.gray} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }} />
              <input type="text" placeholder="Rechercher..." style={{ width: "100%", padding: "14px 16px 14px 44px", borderRadius: "14px", border: `1px solid ${C.lightGray}`, background: C.white, outline: "none", color: C.teal, fontWeight: 600 }} onFocus={e => e.target.style.borderColor = C.yellow} onBlur={e => e.target.style.borderColor = C.lightGray} />
            </div>
          </div>

          {activeTab === "dashboard" && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", marginBottom: "40px" }}>
                <StatCard title="Inscriptions" value={stats?.inscriptionsTotal || 0} icon={FileText} color={C.saffron} />
                <StatCard title="CA" value={`${stats?.ca || 0} €`} icon={Euro} color={"#10b981"} />
                <StatCard title="Séjours" value={stats?.sejoursActifs || 0} icon={Tent} color={C.teal} />
                <StatCard title="Familles" value={stats?.familles || 0} icon={Users} color={C.yellow} />
              </div>
              <TableInscriptions data={inscriptions} />
            </>
          )}

          {activeTab === "sejours" && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
                
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: C.gray }}>{sejoursFiltres.length} séjour(s)</div>
                  
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", borderLeft: `1px solid ${C.lightGray}`, paddingLeft: "16px" }}>
                    <Filter size={16} color={C.gray} />
                    <FilterDropdown 
                      value={filterStatut} 
                      onChange={setFilterStatut} 
                      options={[
                        { value: "Publié", label: "Affichés" },
                        { value: "Brouillon", label: "Masqués" }
                      ]} 
                      defaultLabel="Tous les statuts" 
                    />
                    <FilterDropdown 
                      value={filterSaison} 
                      onChange={setFilterSaison} 
                      options={[
                        { value: "Automne", label: "Automne" },
                        { value: "Hiver", label: "Hiver" },
                        { value: "Printemps", label: "Printemps" },
                        { value: "Été", label: "Été" }
                      ]} 
                      defaultLabel="Toutes les saisons" 
                    />
                    <FilterDropdown 
                      value={filterAge} 
                      onChange={setFilterAge} 
                      options={uniqueAges.map(age => ({ value: age, label: formatAge(age) }))} 
                      defaultLabel="Tous les âges" 
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <button onClick={() => setSejourEnEdition("nouveau")} style={{ background: C.yellow, color: C.teal, border: "none", padding: "10px 16px", borderRadius: "10px", fontWeight: 800, cursor: "pointer" }}>+ Séjour</button>
                  <button onClick={() => setSejourEnEdition("nouveau-senior")} style={{ background: C.lilac, color: C.teal, border: "none", padding: "10px 16px", borderRadius: "10px", fontWeight: 800, cursor: "pointer" }}>+ Sortie Sénior</button>
                  <div style={{ display: "flex", background: C.white, borderRadius: "10px", padding: "4px", border: `1px solid ${C.lightGray}` }}>
                    <button onClick={() => setViewMode("table")} style={{ background: viewMode === "table" ? C.arctic : "transparent", color: viewMode === "table" ? C.teal : C.gray, border:'none', padding:'8px', borderRadius:'8px', cursor:'pointer', transition: "all 0.2s" }}><List size={18} /></button>
                    <button onClick={() => setViewMode("grid")} style={{ background: viewMode === "grid" ? C.arctic : "transparent", color: viewMode === "grid" ? C.teal : C.gray, border:'none', padding:'8px', borderRadius:'8px', cursor:'pointer', transition: "all 0.2s" }}><LayoutGrid size={18} /></button>
                  </div>
                </div>
              </div>
              
              {viewMode === "table" ? 
                <TableSejours data={sejoursFiltres} onEdit={setSejourEnEdition} onDelete={handleDelete} onToggleStatut={handleToggleStatut} onToggleEnAvant={handleToggleEnAvant} /> : 
                <GridSejours data={sejoursFiltres} onEdit={setSejourEnEdition} onDelete={handleDelete} onToggleStatut={handleToggleStatut} onToggleEnAvant={handleToggleEnAvant} />}
            </>
          )}

          {activeTab === "clients" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
              {clients?.map(c => (
                <div key={c.id} style={{ background: C.white, padding: "24px", borderRadius: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
                  <h3 style={{ color: C.teal, fontWeight: 800, marginBottom: "8px" }}>{c.nom} {c.prenom}</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "13px", color: C.gray }}>
                     <span style={{ display: "flex", alignItems: "center", gap: "8px" }}><Mail size={14}/> {c.email}</span>
                     <span style={{ display: "flex", alignItems: "center", gap: "8px" }}><Phone size={14}/> {c.telephone}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
        </div>
      </div>

      {sejourEnEdition && <ModalSejour sejourData={sejourEnEdition} setSejourEnEdition={setSejourEnEdition} isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting} />}
    </AdminLayout>
  );
}