// app/admin/AdminDashboardClient.jsx
"use client";
import { useState, useRef, useEffect } from "react";
import { 
  LayoutDashboard, Map, Users, FileText, Settings, 
  Menu, Tent, Euro, CheckCircle2, Clock, X, ChevronDown, 
  UploadCloud, Image as ImageIcon, Mail, Phone, Calendar, Search,
  LayoutGrid, List, CalendarDays,
  ClipboardList, ExternalLink, Edit, Trash2,
  MapPin, Filter, Link as LinkIcon,
  Leaf, Snowflake, Flower, Sun,
  Eye, EyeOff, Star, Plus, ArrowUp, ArrowDown, Type, AlignLeft, CheckSquare, Copy,
  Bold, Italic, Underline, ListOrdered, Archive, AlertTriangle, BarChart3,
  Baby, Cake, Ruler, Footprints, Weight
} from "lucide-react";

import AdminLayout from "./AdminLayout";
import NewsletterSection from "./NewsletterSection";
import StatistiquesSection from "./StatistiquesSection";
import { CATALOGUE_DOCUMENTS } from "@/lib/documents";

// ⚡ IMPORTS SEJOURS
import { creerSejour, modifierSejour, supprimerSejour, toggleStatut, toggleEnAvant, dupliquerSejour, getOuCreerLienTotemia } from "../actions/sejours";
// ⚡ IMPORTS ANIMATEURS
import { creerAnimateur, modifierAnimateur, supprimerAnimateur } from "../actions/animateurs";
// ⚡ IMPORTS DOCUMENTS
import { validerDocument, rejeterDocument } from "../actions/documents";
// ⚡ IMPORTS INSCRIPTIONS
import { changerStatutInscription, supprimerInscription, supprimerEnfantAdmin, renvoyerEmailInscription } from "../actions/inscriptions";
import { STATUTS_INSCRIPTION } from "@/lib/inscriptions";
// ⚡ IMPORTS GALERIE
import { creerAlbum, modifierAlbum, supprimerAlbum, supprimerPhoto, togglePhotoEnAvant } from "../actions/galerie";

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
  { id: "inscriptions", label: "Inscriptions & Enfants", icon: FileText },
  { id: "galerie", label: "Galerie Photos", icon: ImageIcon },
  { id: "clients", label: "Clients & Familles", icon: Users },
  { id: "newsletter", label: "Liste de diffusion", icon: Mail },
  { id: "statistiques", label: "Statistiques", icon: BarChart3 },
  { id: "settings", label: "Paramètres (Équipe)", icon: Settings },
];

const STATUT_INSCRIPTION_COLORS = {
  "Inscription envoyée": { bg: "#e0f2fe", color: "#075985" },
  "Paiement validé": { bg: "#d1fae5", color: "#065f46" },
  "Annulée": { bg: "#fee2e2", color: "#991b1b" },
};

// Palette pour colorer chaque séjour (assignée dans l'ordre des séjours)
const SEJOUR_PALETTE = [
  "#114C5A", "#FF9932", "#7C3AED", "#0EA5E9", "#10B981",
  "#EF4444", "#EC4899", "#6366F1", "#14B8A6", "#F59E0B",
  "#8B5CF6", "#22C55E",
];

/* ── UTILS ── */
const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toISOString().split('T')[0];
};

const calculerAge = (dateNaissance) => {
  if (!dateNaissance) return null;
  const naissance = new Date(dateNaissance);
  if (Number.isNaN(naissance.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - naissance.getFullYear();
  const m = now.getMonth() - naissance.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < naissance.getDate())) age--;
  return age;
};

const formatAge = (ageString) => {
  if (!ageString) return "Âges à définir";
  const str = ageString.toLowerCase();
  if (str.includes("ans") || str.includes("sénior") || str.includes("senior")) return ageString;
  return `${ageString} ans`;
};

const formatSejourDates = (startStr, endStr) => {
  if (!startStr) return "À définir";
  const start = new Date(startStr);
  if (!endStr) return start.toLocaleDateString("fr-FR");
  const end = new Date(endStr);
  if (start.getTime() === end.getTime()) return start.toLocaleDateString("fr-FR");
  const mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  const startDay = start.getDate(), startMonth = mois[start.getMonth()], startYear = start.getFullYear();
  const endDay = end.getDate(), endMonth = mois[end.getMonth()], endYear = end.getFullYear();
  if (startYear !== endYear) return `Du ${startDay} ${startMonth} ${startYear} au ${endDay} ${endMonth} ${endYear}`;
  if (startMonth !== endMonth) return `Du ${startDay} ${startMonth} au ${endDay} ${endMonth}`;
  return `Du ${startDay} au ${endDay} ${startMonth}`;
};

const compressToWebP = (file, maxWidth = 1200, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          if (!blob) return reject(new Error("Erreur de compression"));
          const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
          const compressedFile = new File([blob], newFileName, { type: 'image/webp' });
          resolve({ file: compressedFile, preview: URL.createObjectURL(blob) });
        }, 'image/webp', quality);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

/* ── COMPOSANTS UI ── */
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
      <div onClick={() => setIsOpen(!isOpen)} style={{ padding: "10px 14px", borderRadius: "10px", border: `1px solid ${isOpen ? C.yellow : C.lightGray}`, background: C.white, fontSize: "13px", color: C.teal, fontWeight: 700, display: "flex", alignItems: "center", gap: "16px", cursor: "pointer", transition: "all 0.2s", boxShadow: isOpen ? "0 4px 12px rgba(255, 200, 1, 0.15)" : "none" }}>
        <span>{displayLabel}</span>
        <ChevronDown size={14} style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", color: C.gray }} />
      </div>
      {isOpen && (
        <div style={{ position: "absolute", top: "100%", left: 0, minWidth: "100%", marginTop: "8px", background: C.white, borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", zIndex: 50, overflow: "hidden", border: `1px solid ${C.lightGray}`, whiteSpace: "nowrap" }}>
          <div onClick={() => { onChange(""); setIsOpen(false); }} style={{ padding: "12px 16px", fontSize: "13px", fontWeight: 700, color: value === "" ? C.teal : C.gray, cursor: "pointer", background: value === "" ? C.arctic : "transparent" }} onMouseOver={e => e.currentTarget.style.background = C.arctic} onMouseOut={e => e.currentTarget.style.background = value === "" ? C.arctic : "transparent"}>{defaultLabel}</div>
          {options.map(opt => (
            <div key={opt.value} onClick={() => { onChange(opt.value); setIsOpen(false); }} style={{ padding: "12px 16px", fontSize: "13px", fontWeight: 600, color: C.teal, cursor: "pointer", background: value === opt.value ? C.arctic : "transparent" }} onMouseOver={e => e.currentTarget.style.background = C.arctic} onMouseOut={e => e.currentTarget.style.background = value === opt.value ? C.arctic : "transparent"}>{opt.label}</div>
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
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>{selected.icon && <selected.icon size={14} color={selected.color || C.teal} />}{selected.label}</span>
        <ChevronDown size={14} style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }} />
      </div>
      {isOpen && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, marginTop: "8px", background: C.white, borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", zIndex: 10, overflow: "hidden", border: `1px solid ${C.lightGray}` }}>
          {options.map((opt) => (
            <div key={opt.value} onClick={() => { setSelected(opt); setIsOpen(false); }} style={{ padding: "12px 16px", fontSize: "13px", fontWeight: 600, color: C.teal, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
              {opt.icon && <opt.icon size={14} color={opt.color || C.teal} />}{opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ImageUpload({ defaultValue, onImageCompressed }) {
  const [preview, setPreview] = useState(defaultValue || null);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef(null);
  
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsCompressing(true);
      try {
        const { file: webpFile, preview: webpPreview } = await compressToWebP(file);
        setPreview(webpPreview);
        onImageCompressed(webpFile);
      } catch (error) { console.error(error); }
      setIsCompressing(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontSize: "11px", fontWeight: 700, color: C.gray, textTransform: "uppercase" }}>Image de couverture</label>
      <div onClick={() => fileInputRef.current?.click()} style={{ width: "100%", height: "160px", borderRadius: "16px", border: `2px dashed ${preview ? "transparent" : C.lightGray}`, background: C.arctic, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative", overflow: "hidden" }}>
        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} style={{ display: "none" }} />
        {isCompressing ? <p style={{ fontSize: "13px", fontWeight: 700, color: C.saffron }}>Compression WebP... ⚡</p> : preview ? <img src={preview} alt="Aperçu" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <><UploadCloud size={32} color={C.gray} style={{ marginBottom: "8px" }} /><p style={{ fontSize: "13px", fontWeight: 700, color: C.teal }}>Cliquez pour uploader (1200px max)</p></>}
      </div>
    </div>
  );
}

function GalleryUpload({ defaultValues = [], onImagesCompressed }) {
  const [previews, setPreviews] = useState(defaultValues);
  const [files, setFiles] = useState([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef(null);

  const handleImagesChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (!selectedFiles.length) return;
    if (previews.length + selectedFiles.length > 10) return alert("10 photos maximum.");
    setIsCompressing(true);
    const newPreviews = [...previews];
    const newFiles = [...files];
    for (const file of selectedFiles) {
      try {
        const { file: webpFile, preview: webpPreview } = await compressToWebP(file, 1000);
        newPreviews.push(webpPreview);
        newFiles.push(webpFile);
      } catch (err) { console.error(err); }
    }
    setPreviews(newPreviews); setFiles(newFiles); onImagesCompressed(newFiles);
    setIsCompressing(false);
  };

  const removeImage = (index) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    const newFiles = files.filter((_, i) => i !== (index - (previews.length - files.length)));
    setPreviews(newPreviews); setFiles(newFiles); onImagesCompressed(newFiles);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <label style={{ fontSize: "11px", fontWeight: 700, color: C.gray, textTransform: "uppercase" }}>Galerie Photos ({previews.length}/10)</label>
      
      {/* ⚡ ASTUCE : On génère les champs cachés ici pour les ANCIENNES images que l'on conserve */}
      {previews.map((src, i) => {
        if (src.startsWith('http')) {
          return <input key={`old-${i}`} type="hidden" name="anciennesGalerie" value={src} />;
        }
        return null;
      })}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
        {previews.map((src, i) => (
          <div key={i} style={{ width: "80px", height: "80px", borderRadius: "12px", overflow: "hidden", position: "relative", border: `1px solid ${C.lightGray}` }}>
            <img src={src} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="galerie" />
            <button type="button" onClick={() => removeImage(i)} style={{ position: "absolute", top: "4px", right: "4px", background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "50%", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white" }}><X size={12} /></button>
          </div>
        ))}
        {previews.length < 10 && (
          <div onClick={() => fileInputRef.current?.click()} style={{ width: "80px", height: "80px", borderRadius: "12px", border: `2px dashed ${C.gray}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", background: C.arctic }}>
            <input type="file" multiple accept="image/*" ref={fileInputRef} onChange={handleImagesChange} style={{ display: "none" }} />
            {isCompressing ? <Clock size={20} color={C.saffron} className="animate-spin" /> : <UploadCloud size={20} color={C.gray} />}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── ÉDITEUR DE TEXTE RICHE (Gras, Italique, Souligné, Listes) ── */
function RichTextToolbarButton({ onClick, title, children }) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => e.preventDefault()} // ⚡ Empêche la perte de focus/sélection dans l'éditeur
      onClick={onClick}
      style={{ width: "28px", height: "28px", borderRadius: "6px", border: "none", background: "transparent", color: C.teal, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
      onMouseOver={(e) => e.currentTarget.style.background = C.lightGray}
      onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
    >
      {children}
    </button>
  );
}

function RichTextEditor({ name, label, defaultValue, placeholder }) {
  const editorRef = useRef(null);
  const [html, setHtml] = useState(defaultValue || "");
  const [isEmpty, setIsEmpty] = useState(!defaultValue);

  // ⚡ On initialise le contenu UNE SEULE FOIS via le DOM (pattern "non contrôlé"),
  // pour ne jamais laisser React retoucher le HTML pendant que l'utilisateur tape.
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = defaultValue || "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const syncState = () => {
    const content = editorRef.current?.innerHTML || "";
    setHtml(content);
    setIsEmpty(!editorRef.current?.textContent?.trim());
  };

  const exec = (command) => {
    editorRef.current?.focus();
    document.execCommand(command, false, null);
    syncState();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {label && <label style={{ fontSize: "11px", fontWeight: 700, color: C.gray, textTransform: "uppercase" }}>{label}</label>}
      <input type="hidden" name={name} value={html} />
      <div style={{ border: `1px solid ${C.lightGray}`, borderRadius: "12px", overflow: "hidden", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2px", padding: "6px 8px", background: C.arctic, borderBottom: `1px solid ${C.lightGray}` }}>
          <RichTextToolbarButton title="Gras" onClick={() => exec("bold")}><Bold size={14} /></RichTextToolbarButton>
          <RichTextToolbarButton title="Italique" onClick={() => exec("italic")}><Italic size={14} /></RichTextToolbarButton>
          <RichTextToolbarButton title="Souligné" onClick={() => exec("underline")}><Underline size={14} /></RichTextToolbarButton>
          <div style={{ width: "1px", height: "18px", background: C.lightGray, margin: "0 4px" }} />
          <RichTextToolbarButton title="Liste à puces" onClick={() => exec("insertUnorderedList")}><List size={14} /></RichTextToolbarButton>
          <RichTextToolbarButton title="Liste numérotée" onClick={() => exec("insertOrderedList")}><ListOrdered size={14} /></RichTextToolbarButton>
        </div>
        <div style={{ position: "relative" }}>
          {isEmpty && placeholder && (
            <div style={{ position: "absolute", top: "12px", left: "12px", fontSize: "13px", color: C.gray, pointerEvents: "none" }}>
              {placeholder}
            </div>
          )}
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={syncState}
            onBlur={syncState}
            className="rich-text-editor-content"
            style={{ padding: "12px", minHeight: "120px", fontSize: "13px", lineHeight: 1.7, outline: "none", fontFamily: "inherit", color: C.teal }}
          />
        </div>
      </div>
      <style>{`
        .rich-text-editor-content ul, .rich-text-editor-content ol { padding-left: 20px; margin: 8px 0; }
        .rich-text-editor-content li { margin-bottom: 4px; }
        .rich-text-editor-content b, .rich-text-editor-content strong { font-weight: 800; }
        .rich-text-editor-content i, .rich-text-editor-content em { font-style: italic; }
      `}</style>
    </div>
  );
}

/* ── MODALE CRÉATION SÉJOUR AVEC ÉDITEUR DE FORMULAIRE ── */
function ModalSejour({ sejourData, setSejourEnEdition, isSubmitting, setIsSubmitting }) {
  const isEditing = sejourData !== "nouveau" && sejourData !== "nouveau-senior";
  const defaultAge = sejourData === "nouveau-senior" ? "Séniors" : "";
  
  const [tab, setTab] = useState("infos");
  const [prixOptions, setPrixOptions] = useState(isEditing && sejourData.prix ? [sejourData.prix] : [0]);
  const [compressedImage, setCompressedImage] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [documentsRequis, setDocumentsRequis] = useState(
    isEditing && sejourData.documentsRequis ? sejourData.documentsRequis : []
  );

  const DEFAULT_FORM = [
    { id: "1", type: "section", label: "Informations du représentant légal", required: false },
    { id: "2", type: "text", label: "Nom", required: true },
    { id: "3", type: "text", label: "Prénom", required: true },
    { id: "4", type: "email", label: "Adresse Email", required: true },
    { id: "5", type: "tel", label: "Téléphone n°1", required: true },
    { id: "6", type: "tel", label: "Téléphone n°2", required: false },
    { id: "7", type: "text", label: "N° de Sécurité Sociale", required: true },
    { id: "8", type: "text", label: "N° de Police d'assurance", required: true },
    { id: "9", type: "text", label: "Compagnie d'assurance", required: true },

    { id: "10", type: "section", label: "Informations du participant", required: false },
    { id: "11", type: "text", label: "Nom et Prénom de l'enfant", required: true },
    { id: "12", type: "date", label: "Date de naissance", required: true },
    { id: "13", type: "textarea", label: "Allergies ou informations médicales importantes", required: false },

    { id: "14", type: "section", label: "Autorisations", required: false },
    { id: "15", type: "checkbox", label: "J'autorise mon enfant à participer au séjour organisé par Make Your Moment.", required: true },
    { id: "16", type: "checkbox", label: "J'autorise mon enfant à être véhiculé durant le séjour, le cas échéant, par le ou la directrice du séjour.", required: true },
    { id: "17", type: "checkbox", label: "J'autorise les responsables du séjour à prendre toutes les dispositions qu'ils jugeraient utiles en cas d'urgence relative à l'état de santé de mon enfant.", required: true },
    { id: "18", type: "checkbox", label: "J'autorise l'administration de paracétamol en cas de nécessité et d'arnica en cas de chute, choc, contusion ou hématome.", required: true },
    { id: "19", type: "checkbox", label: "Je m'engage à rembourser l'intégralité des frais médicaux et pharmaceutiques éventuellement déboursés par Make Your Moment.", required: true },
    { id: "20", type: "checkbox", label: "J'autorise l'utilisation de l'image de mon enfant (photos & vidéos) liée au séjour, à titre gracieux, pour permettre aux familles de suivre le déroulement du séjour, pour la réalisation de plaquettes d'informations et pour le site de l'association.", required: true },

    { id: "21", type: "section", label: "Assurance annulation (partenaire MAIF)", required: false },
    { id: "22", type: "info", label: "Vous avez la possibilité de souscrire à une assurance annulation auprès de notre partenaire MAIF. Le prix de cette assurance est de 30€, à ajouter au prix du séjour, et doit être souscrite au moment de l'inscription.\nEn cas d'annulation sous conditions, Make Your Moment retient 25% du montant du séjour ; le reste (après remboursement MAIF) vous est remboursé à la date de l'annulation.", required: false },
    { id: "23", type: "select", label: "Souscrire à cette assurance ?", required: true, options: "Oui, Non" },

    { id: "24", type: "section", label: "Paiement", required: false },
    { id: "25", type: "info", label: "Chèque : à l'ordre de \"Make Your Moment\", à envoyer à Make Your Moment - 16 avenue du Rond-Point, 94370 Sucy-en-Brie. Paiement en 3 fois autorisé.\nCarte bleue : paiement en ligne via une plateforme du Crédit Mutuel (5€ de frais). Un lien vous sera envoyé.\nVirement : IBAN FR76 1027 8060 3600 0209 3910 120, libellé au nom et prénom du participant.\nChèques ANCV : à envoyer à Make Your Moment - 16 avenue du Rond-Point, 94370 Sucy-en-Brie.\nEspèces : nous contacter.", required: false },
    { id: "26", type: "select", label: "Comment souhaitez-vous régler ?", required: true, options: "Chèque, Carte bleue, Virement bancaire, Chèques ANCV, Espèces" },
    { id: "27", type: "checkbox", label: "J'accepte, après en avoir pris connaissance, les modalités de paiement et d'annulation.", required: true },
  ];
  
  const [formFields, setFormFields] = useState(() => {
    try { return (isEditing && sejourData.formSchema) ? JSON.parse(sejourData.formSchema) : DEFAULT_FORM; }
    catch(e) { return DEFAULT_FORM; }
  });

  const addField = (type) => {
    const newField = { id: Date.now().toString(), type, label: type === 'section' ? "Nouvelle Section" : "Nouveau champ", required: false };
    if (type === 'select') newField.options = "Option 1, Option 2";
    setFormFields([...formFields, newField]);
  };

  const updateField = (id, key, value) => {
    setFormFields(formFields.map(f => f.id === id ? { ...f, [key]: value } : f));
  };

  const removeField = (id) => {
    setFormFields(formFields.filter(f => f.id !== id));
  };

  const moveField = (index, dir) => {
    if ((dir === -1 && index === 0) || (dir === 1 && index === formFields.length - 1)) return;
    const newFields = [...formFields];
    const temp = newFields[index];
    newFields[index] = newFields[index + dir];
    newFields[index + dir] = temp;
    setFormFields(newFields);
  };

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(17, 76, 90, 0.6)", backdropFilter: "blur(4px)" }}>
      <div style={{ background: C.white, width: "100%", maxWidth: "750px", maxHeight: "90vh", overflowY: "auto", borderRadius: "24px", padding: "32px", position: "relative", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)" }}>
        
        <button onClick={() => setSejourEnEdition(null)} style={{ position: "absolute", top: "24px", right: "24px", background: C.arctic, border: "none", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={16}/></button>
        
        <h2 style={{ fontSize: "22px", fontWeight: 900, color: C.teal, marginBottom: "20px" }}>
          {isEditing ? "Modifier le séjour" : (sejourData === "nouveau-senior" ? "Créer une sortie Sénior" : "Créer un nouveau séjour")}
        </h2>

        {/* NAVIGATION DES ONGLETS */}
        <div style={{ display: "flex", borderBottom: `2px solid ${C.arctic}`, marginBottom: "24px" }}>
          {[
            { id: "infos", label: "Infos de base" },
            { id: "details", label: "Détails & Galerie" },
            { id: "form", label: "Formulaire d'inscription" },
            { id: "documents", label: "Documents requis" }
          ].map(t => (
            <button key={t.id} type="button" onClick={() => setTab(t.id)} style={{
              padding: "12px 20px", fontSize: "13px", fontWeight: 800, border: "none", background: "transparent", cursor: "pointer", transition: "all 0.2s",
              color: tab === t.id ? C.teal : C.gray,
              borderBottom: tab === t.id ? `3px solid ${C.yellow}` : "3px solid transparent",
              transform: "translateY(2px)"
            }}>
              {t.label}
            </button>
          ))}
        </div>
        
        <form action={async (formData) => {
          setIsSubmitting(true);
          if (compressedImage) formData.set("image", compressedImage);
          galleryFiles.forEach((file) => { formData.append("galerie", file); });

          // ⚡ ON INJECTE LE FORMULAIRE JSON DANS UN CHAMP CACHÉ
          formData.set("formSchema", JSON.stringify(formFields));
          formData.set("documentsRequis", JSON.stringify(documentsRequis));

          if (isEditing) { await modifierSejour(sejourData.id, formData); }
          else { await creerSejour(formData); }
          
          setIsSubmitting(false);
          setSejourEnEdition(null);
        }} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* ── ONGLET 1 : INFOS DE BASE ── */}
          <div style={{ display: tab === "infos" ? "flex" : "none", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <input type="text" name="titre" defaultValue={isEditing ? sejourData.titre : ""} required placeholder="Titre du séjour" style={{ flex: 1, minWidth: "160px", padding: "12px", borderRadius: "12px", border: `1px solid ${C.lightGray}` }} />
              <input type="text" name="tranchesAge" defaultValue={isEditing ? sejourData.tranchesAge : defaultAge} placeholder="Âges (ex: 6-12 ans)" style={{ flex: 1, minWidth: "160px", padding: "12px", borderRadius: "12px", border: `1px solid ${C.lightGray}` }} />
            </div>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
               <input type="text" name="lieu" defaultValue={isEditing ? sejourData.lieu : ""} placeholder="Lieu (Ville, Région)" style={{ flex: 1, minWidth: "160px", padding: "12px", borderRadius: "12px", border: `1px solid ${C.lightGray}` }} />
               <input type="number" name="places" defaultValue={isEditing ? sejourData.places : ""} placeholder="Nb. de places" style={{ width: "140px", padding: "12px", borderRadius: "12px", border: `1px solid ${C.lightGray}` }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "11px", fontWeight: 700, color: C.gray, textTransform: "uppercase" }}>Tarification (€)</label>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {prixOptions.map((p, idx) => (
                  <input key={idx} type="number" name="prix" defaultValue={p} placeholder="Prix" style={{ width: "120px", padding: "12px", borderRadius: "12px", border: `1px solid ${C.lightGray}` }} />
                ))}
                <button type="button" onClick={() => setPrixOptions([...prixOptions, 0])} style={{ background: "none", border: `1px dashed ${C.gray}`, color: C.gray, padding: "0 16px", borderRadius: "12px", fontSize: "12px", cursor: "pointer" }}>+ Prix</button>
              </div>
            </div>
            
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <input type="date" name="dateDebut" defaultValue={isEditing ? formatDateForInput(sejourData.dateDebut) : ""} style={{ flex: 1, minWidth: "160px", padding: "12px", borderRadius: "12px", border: `1px solid ${C.lightGray}`, color: C.gray }} />
              <input type="date" name="dateFin" defaultValue={isEditing ? formatDateForInput(sejourData.dateFin) : ""} style={{ flex: 1, minWidth: "160px", padding: "12px", borderRadius: "12px", border: `1px solid ${C.lightGray}`, color: C.gray }} />
            </div>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", zIndex: 20 }}>
              <CustomSelect name="saison" label="Saison" defaultValue={isEditing ? sejourData.saison : "Automne"} options={[{ value: "Automne", label: "Automne", icon: Leaf, color: C.saffron }, { value: "Hiver", label: "Hiver", icon: Snowflake, color: C.teal }, { value: "Printemps", label: "Printemps", icon: Flower, color: "#10b981" }, { value: "Été", label: "Été", icon: Sun, color: C.yellow }]} />
              <CustomSelect name="statut" label="Statut" defaultValue={isEditing ? sejourData.statut : "Brouillon"} options={[{ value: "Brouillon", label: "Brouillon", icon: Clock, color: C.gray }, { value: "Publié", label: "Publié", icon: CheckCircle2, color: "#10b981" }]} />
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11px", fontWeight: 700, color: C.gray, textTransform: "uppercase" }}>Lien de paiement CIC — Tarif standard</label>
              <input type="url" name="lienPaiementCIC" defaultValue={isEditing ? sejourData.lienPaiementCIC : ""} placeholder="https://paiement.cic.fr/..." style={{ padding: "12px", borderRadius: "12px", border: `1px solid ${C.lightGray}` }} />
              <p style={{ fontSize: "11px", color: C.gray }}>Une fois son inscription envoyée, la famille sera redirigée vers ce lien pour régler le séjour. Laissez vide si le paiement se fait autrement.</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11px", fontWeight: 700, color: C.gray, textTransform: "uppercase" }}>Lien de paiement CIC — Tarif Habitant du Val-de-Marne</label>
              <input type="url" name="lienPaiementCICValDeMarne" defaultValue={isEditing ? sejourData.lienPaiementCICValDeMarne : ""} placeholder="https://paiement.cic.fr/..." style={{ padding: "12px", borderRadius: "12px", border: `1px solid ${C.lightGray}` }} />
              <p style={{ fontSize: "11px", color: C.gray }}>Lien utilisé quand la famille sélectionne le tarif réduit (-100€) réservé aux habitants du Val-de-Marne.</p>
            </div>

            <ImageUpload defaultValue={isEditing ? sejourData.imageUrl : null} onImageCompressed={setCompressedImage} />
          </div>

          {/* ── ONGLET 2 : DÉTAILS ET GALERIE ── */}
          <div style={{ display: tab === "details" ? "flex" : "none", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11px", fontWeight: 700, color: C.gray, textTransform: "uppercase" }}>Résumé rapide (En bref)</label>
              <textarea name="shortDescription" defaultValue={isEditing ? sejourData.shortDescription : ""} rows="2" placeholder="Une phrase d'accroche pour décrire l'ambiance du séjour..." style={{ padding: "12px", borderRadius: "12px", border: `1px solid ${C.lightGray}`, resize: "none", fontFamily: "inherit" }} />
            </div>
            
            <RichTextEditor name="programme" label="Programme du séjour" defaultValue={isEditing ? sejourData.programme : ""} placeholder="Jour 1 : Arrivée..." />

            <RichTextEditor name="infosPratiques" label="Infos pratiques & Cadre de vie" defaultValue={isEditing ? sejourData.infosPratiques : ""} placeholder="Lieu de départ, type d'hébergement, repas..." />

            <RichTextEditor name="cadreDeVie" label="Lieu & Cadre de vie" defaultValue={isEditing ? sejourData.cadreDeVie : ""} placeholder="Hébergement, type de chambres, repas..." />

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11px", fontWeight: 700, color: C.gray, textTransform: "uppercase" }}>Adresse Complète (Pour la carte)</label>
              <div style={{ position: "relative" }}>
                <MapPin size={16} color={C.gray} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
                <input type="text" name="adresseComplete" defaultValue={isEditing ? sejourData.adresseComplete : ""} placeholder="Ex: 12 Rue de la Plage, 40140 Vieux-Boucau" style={{ width: "100%", padding: "12px 12px 12px 36px", borderRadius: "12px", border: `1px solid ${C.lightGray}` }} />
              </div>
            </div>

            <GalleryUpload defaultValues={isEditing && sejourData.galerie ? sejourData.galerie : []} onImagesCompressed={setGalleryFiles} />
          </div>

          {/* ── ONGLET 3 : ÉDITEUR DE FORMULAIRE D'INSCRIPTION ── */}
          <div style={{ display: tab === "form" ? "flex" : "none", flexDirection: "column", gap: "16px" }}>
            <div style={{ background: C.arctic, padding: "16px", borderRadius: "16px", marginBottom: "8px" }}>
              <h4 style={{ fontSize: "14px", fontWeight: 800, color: C.teal, marginBottom: "4px" }}>Générateur de formulaire</h4>
              <p style={{ fontSize: "12px", color: C.gray, lineHeight: 1.5 }}>
                Construisez le formulaire que les parents/clients devront remplir pour s'inscrire à ce séjour précis. Les données seront récoltées directement sur votre tableau de bord.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxHeight: "400px", overflowY: "auto", paddingRight: "8px" }}>
              {formFields.map((field, index) => (
                <div key={field.id} style={{ background: field.type === 'section' ? C.teal : C.white, border: `1px solid ${field.type === 'section' ? C.teal : C.lightGray}`, borderRadius: "12px", padding: "12px", display: "flex", flexDirection: "column", gap: "12px", transition: "all 0.2s" }}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    
                    <div style={{ flex: 1 }}>
                      <input type="text" value={field.label} onChange={(e) => updateField(field.id, "label", e.target.value)} placeholder={field.type === 'section' ? "Titre de la section" : "Question posée..."} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "none", background: field.type === 'section' ? "rgba(255,255,255,0.1)" : C.arctic, color: field.type === 'section' ? "white" : C.teal, fontWeight: field.type === 'section' ? 800 : 600, fontSize: "13px" }} />
                    </div>

                    {field.type !== 'section' && (
                      <select value={field.type} onChange={(e) => updateField(field.id, "type", e.target.value)} style={{ padding: "10px", borderRadius: "8px", border: "none", background: C.arctic, color: C.teal, fontSize: "12px", fontWeight: 600, outline: "none", cursor: "pointer" }}>
                        <option value="text">Texte court</option>
                        <option value="textarea">Texte long</option>
                        <option value="email">Email</option>
                        <option value="tel">Téléphone</option>
                        <option value="date">Date</option>
                        <option value="select">Choix multiple</option>
                        <option value="checkbox">Case à cocher</option>
                        <option value="info">Texte informatif</option>
                      </select>
                    )}

                    {field.type !== 'section' && field.type !== 'info' && (
                      <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", background: C.arctic, padding: "8px 12px", borderRadius: "8px" }}>
                        <input type="checkbox" checked={field.required} onChange={(e) => updateField(field.id, "required", e.target.checked)} style={{ cursor: "pointer" }} />
                        <span style={{ fontSize: "11px", fontWeight: 700, color: C.teal }}>Requis</span>
                      </label>
                    )}

                    <div style={{ display: "flex", background: field.type === 'section' ? "rgba(255,255,255,0.1)" : C.arctic, borderRadius: "8px", overflow: "hidden" }}>
                      <button type="button" onClick={() => moveField(index, -1)} disabled={index === 0} style={{ padding: "8px", background: "none", border: "none", cursor: index === 0 ? "not-allowed" : "pointer", color: field.type === 'section' ? "white" : C.gray, opacity: index === 0 ? 0.3 : 1 }}><ArrowUp size={14}/></button>
                      <button type="button" onClick={() => moveField(index, 1)} disabled={index === formFields.length - 1} style={{ padding: "8px", background: "none", border: "none", cursor: index === formFields.length - 1 ? "not-allowed" : "pointer", color: field.type === 'section' ? "white" : C.gray, opacity: index === formFields.length - 1 ? 0.3 : 1 }}><ArrowDown size={14}/></button>
                      <button type="button" onClick={() => removeField(field.id)} style={{ padding: "8px", background: "none", border: "none", cursor: "pointer", color: "#ef4444" }}><Trash2 size={14}/></button>
                    </div>
                  </div>

                  {field.type === 'select' && (
                    <div style={{ background: C.arctic, padding: "10px", borderRadius: "8px" }}>
                      <label style={{ fontSize: "10px", fontWeight: 700, color: C.gray, textTransform: "uppercase", marginBottom: "4px", display: "block" }}>Options (séparées par des virgules)</label>
                      <input type="text" value={field.options || ""} onChange={(e) => updateField(field.id, "options", e.target.value)} placeholder="Ex: S, M, L, XL" style={{ width: "100%", padding: "8px", borderRadius: "6px", border: `1px solid ${C.lightGray}`, fontSize: "12px" }} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
              <button type="button" onClick={() => addField("text")} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "10px", borderRadius: "10px", background: C.white, border: `1px dashed ${C.teal}`, color: C.teal, fontSize: "12px", fontWeight: 700, cursor: "pointer" }}><Type size={14}/> Champ</button>
              <button type="button" onClick={() => addField("select")} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "10px", borderRadius: "10px", background: C.white, border: `1px dashed ${C.teal}`, color: C.teal, fontSize: "12px", fontWeight: 700, cursor: "pointer" }}><CheckSquare size={14}/> Choix</button>
              <button type="button" onClick={() => addField("section")} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "10px", borderRadius: "10px", background: C.teal, border: `1px solid ${C.teal}`, color: C.yellow, fontSize: "12px", fontWeight: 700, cursor: "pointer" }}><AlignLeft size={14}/> Section</button>
            </div>
          </div>

          <div style={{ display: tab === "documents" ? "flex" : "none", flexDirection: "column", gap: "16px" }}>
            <div style={{ background: C.arctic, padding: "16px", borderRadius: "16px", marginBottom: "8px" }}>
              <h4 style={{ fontSize: "14px", fontWeight: 800, color: C.teal, marginBottom: "4px" }}>Documents requis</h4>
              <p style={{ fontSize: "12px", color: C.gray, lineHeight: 1.5 }}>
                Sélectionnez les documents que les familles devront fournir pour s'inscrire à ce séjour.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {CATALOGUE_DOCUMENTS.map((doc) => (
                <label key={doc} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", background: C.arctic, borderRadius: "12px", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={documentsRequis.includes(doc)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setDocumentsRequis([...documentsRequis, doc]);
                      } else {
                        setDocumentsRequis(documentsRequis.filter((d) => d !== doc));
                      }
                    }}
                    style={{ cursor: "pointer", width: "16px", height: "16px" }}
                  />
                  <span style={{ fontSize: "14px", fontWeight: 600, color: C.teal }}>{doc}</span>
                </label>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", paddingTop: "20px", borderTop: `1px solid ${C.arctic}` }}>
            <button type="button" onClick={() => setSejourEnEdition(null)} style={{ cursor: "pointer", background: "none", border: "none", color: C.gray, fontWeight: 700 }}>Annuler</button>
            <button type="submit" disabled={isSubmitting} style={{ background: C.yellow, color: C.teal, padding: "14px 28px", borderRadius: "999px", border: "none", fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 16px rgba(255,200,1,0.3)" }}>
              {isSubmitting ? "Enregistrement..." : "Enregistrer le séjour"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

/* ── MODALE : ANIMATEUR ── */
function ModalAnimateur({ data, setEdition, isSubmitting, setIsSubmitting }) {
  const isEditing = data !== "nouveau";
  const [compressedImage, setCompressedImage] = useState(null);

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(17, 76, 90, 0.4)", backdropFilter: "blur(4px)" }}>
      <div style={{ background: C.white, width: "100%", maxWidth: "500px", borderRadius: "24px", padding: "32px", position: "relative", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}>
        <button onClick={() => setEdition(null)} style={{ position: "absolute", top: "24px", right: "24px", background: C.arctic, border: "none", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={16}/></button>
        <h2 style={{ fontSize: "20px", fontWeight: 900, color: C.teal, marginBottom: "24px" }}>{isEditing ? "Modifier le membre" : "Ajouter à l'équipe"}</h2>
        
        <form action={async (formData) => {
          setIsSubmitting(true);
          if (compressedImage) formData.set("image", compressedImage);
          if (isEditing) await modifierAnimateur(data.id, formData);
          else await creerAnimateur(formData);
          setIsSubmitting(false);
          setEdition(null);
        }} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          
          <input type="text" name="nom" defaultValue={isEditing ? data.nom : ""} required placeholder="Prénom Nom" style={{ padding: "12px", borderRadius: "12px", border: `1px solid ${C.lightGray}` }} />
          <input type="text" name="role" defaultValue={isEditing ? data.role : "Animateur"} required placeholder="Rôle (ex: Directeur, Animateur...)" style={{ padding: "12px", borderRadius: "12px", border: `1px solid ${C.lightGray}` }} />
          <textarea name="bio" defaultValue={isEditing ? data.bio : ""} placeholder="Petite description, passions, diplômes..." rows="3" style={{ padding: "12px", borderRadius: "12px", border: `1px solid ${C.lightGray}`, resize: "none", fontFamily: "inherit" }} />
          
          <ImageUpload defaultValue={isEditing ? data.imageUrl : null} onImageCompressed={setCompressedImage} />
          
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "10px" }}>
            <button type="button" onClick={() => setEdition(null)} style={{ cursor: "pointer", background: "none", border: "none", color: C.gray, fontWeight: 600 }}>Annuler</button>
            <button type="submit" disabled={isSubmitting} style={{ background: C.yellow, color: C.teal, padding: "12px 24px", borderRadius: "12px", border: "none", fontWeight: 800, cursor: "pointer" }}>
              {isSubmitting ? "Enregistrement..." : "Sauvegarder"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ── MODALE : ALBUM PHOTO (GALERIE) ── */
function ModalAlbum({ albumData, setAlbumEnEdition, sejours, isSubmitting, setIsSubmitting }) {
  const isEditing = albumData !== "nouveau";
  const [existingPhotos, setExistingPhotos] = useState(isEditing ? (albumData.photos || []) : []);
  const [newPreviews, setNewPreviews] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef(null);

  const handleFilesChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setIsCompressing(true);
    const previews = [...newPreviews];
    const compressedFiles = [...newFiles];
    for (const file of files) {
      try {
        const { file: webpFile, preview } = await compressToWebP(file, 1000);
        previews.push(preview);
        compressedFiles.push(webpFile);
      } catch (err) { console.error(err); }
    }
    setNewPreviews(previews); setNewFiles(compressedFiles);
    setIsCompressing(false);
  };

  const removeNewFile = (idx) => {
    setNewPreviews(newPreviews.filter((_, i) => i !== idx));
    setNewFiles(newFiles.filter((_, i) => i !== idx));
  };

  const removeExistingPhoto = async (photoId) => {
    if (!window.confirm("Supprimer définitivement cette photo ?")) return;
    setExistingPhotos(existingPhotos.filter((p) => p.id !== photoId));
    await supprimerPhoto(photoId);
  };

  const toggleFeatured = async (photoId, current) => {
    setExistingPhotos(existingPhotos.map((p) => p.id === photoId ? { ...p, enAvant: !current } : p));
    await togglePhotoEnAvant(photoId, !current);
  };

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(17, 76, 90, 0.6)", backdropFilter: "blur(4px)" }}>
      <div style={{ background: C.white, width: "100%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto", borderRadius: "24px", padding: "32px", position: "relative", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)" }}>
        <button onClick={() => setAlbumEnEdition(null)} style={{ position: "absolute", top: "24px", right: "24px", background: C.arctic, border: "none", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={16}/></button>
        <h2 style={{ fontSize: "22px", fontWeight: 900, color: C.teal, marginBottom: "24px" }}>{isEditing ? "Modifier l'album" : "Créer un album photo"}</h2>

        <form action={async (formData) => {
          setIsSubmitting(true);
          newFiles.forEach((file) => { formData.append("photos", file); });
          if (isEditing) await modifierAlbum(albumData.id, formData);
          else await creerAlbum(formData);
          setIsSubmitting(false);
          setAlbumEnEdition(null);
        }} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "11px", fontWeight: 700, color: C.gray, textTransform: "uppercase" }}>Nom de l'album</label>
            <input type="text" name="titre" defaultValue={isEditing ? albumData.titre : ""} required placeholder="Ex: Colonie Été 2026" style={{ padding: "12px", borderRadius: "12px", border: `1px solid ${C.lightGray}` }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "11px", fontWeight: 700, color: C.gray, textTransform: "uppercase" }}>Séjour lié (optionnel)</label>
            <select name="sejourId" defaultValue={isEditing ? (albumData.sejourId || "") : ""} style={{ padding: "12px", borderRadius: "12px", border: `1px solid ${C.lightGray}`, background: C.arctic, color: C.teal, fontWeight: 600 }}>
              <option value="">Aucun séjour lié</option>
              {sejours?.map((s) => (
                <option key={s.id} value={s.id}>{s.titre}</option>
              ))}
            </select>
          </div>

          {existingPhotos.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <label style={{ fontSize: "11px", fontWeight: 700, color: C.gray, textTransform: "uppercase" }}>Photos actuelles ({existingPhotos.length})</label>
              <p style={{ fontSize: "11px", color: C.gray }}>Cliquez sur l'étoile pour mettre une photo "à l'affiche" sur la page d'accueil.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {existingPhotos.map((p) => (
                  <div key={p.id} style={{ width: "80px", height: "80px", borderRadius: "12px", overflow: "hidden", position: "relative", border: `1px solid ${p.enAvant ? C.yellow : C.lightGray}` }}>
                    <img src={p.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="photo album" />
                    <button type="button" onClick={() => toggleFeatured(p.id, p.enAvant)} title={p.enAvant ? "Retirer de l'affiche" : "Mettre à l'affiche"} style={{ position: "absolute", bottom: "4px", left: "4px", background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "50%", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Star size={12} color={p.enAvant ? C.yellow : "white"} fill={p.enAvant ? C.yellow : "transparent"} /></button>
                    <button type="button" onClick={() => removeExistingPhoto(p.id)} style={{ position: "absolute", top: "4px", right: "4px", background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "50%", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white" }}><X size={12} /></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <label style={{ fontSize: "11px", fontWeight: 700, color: C.gray, textTransform: "uppercase" }}>Ajouter des photos</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {newPreviews.map((src, i) => (
                <div key={i} style={{ width: "80px", height: "80px", borderRadius: "12px", overflow: "hidden", position: "relative", border: `1px solid ${C.lightGray}` }}>
                  <img src={src} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="nouvelle photo" />
                  <button type="button" onClick={() => removeNewFile(i)} style={{ position: "absolute", top: "4px", right: "4px", background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "50%", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white" }}><X size={12} /></button>
                </div>
              ))}
              <div onClick={() => fileInputRef.current?.click()} style={{ width: "80px", height: "80px", borderRadius: "12px", border: `2px dashed ${C.gray}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", background: C.arctic }}>
                <input type="file" multiple accept="image/*" ref={fileInputRef} onChange={handleFilesChange} style={{ display: "none" }} />
                {isCompressing ? <Clock size={20} color={C.saffron} className="animate-spin" /> : <UploadCloud size={20} color={C.gray} />}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", paddingTop: "20px", borderTop: `1px solid ${C.arctic}` }}>
            <button type="button" onClick={() => setAlbumEnEdition(null)} style={{ cursor: "pointer", background: "none", border: "none", color: C.gray, fontWeight: 700 }}>Annuler</button>
            <button type="submit" disabled={isSubmitting} style={{ background: C.yellow, color: C.teal, padding: "14px 28px", borderRadius: "999px", border: "none", fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 16px rgba(255,200,1,0.3)" }}>
              {isSubmitting ? "Enregistrement..." : "Enregistrer l'album"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ── LIGNE DOCUMENT AVEC DROPDOWN VALIDE / INVALIDE (admin) ── */
function DocumentValidationRow({ doc }) {
  const [saving, setSaving] = useState(false);
  const estValide = doc.statut === "VALIDE";

  const handleChange = async (e) => {
    setSaving(true);
    try {
      if (e.target.value === "VALIDE") {
        await validerDocument(doc.id);
      } else {
        await rejeterDocument(doc.id);
      }
      window.location.reload();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", background: C.white, borderRadius: "10px", border: `1px solid ${C.lightGray}` }}>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: "13px", fontWeight: 700, color: C.teal }}>{doc.type}</p>
        {doc.url && (
          <a href={doc.url} target="_blank" rel="noreferrer" style={{ fontSize: "11px", color: C.saffron, fontWeight: 600 }}>
            Voir le fichier →
          </a>
        )}
      </div>
      <select
        value={estValide ? "VALIDE" : "INVALIDE"}
        onChange={handleChange}
        disabled={saving || !doc.url}
        title={!doc.url ? "Aucun fichier importé" : ""}
        style={{
          background: estValide ? "#d1fae5" : "#fee2e2",
          color: estValide ? "#065f46" : "#991b1b",
          padding: "6px 10px", borderRadius: "8px", fontSize: "12px", fontWeight: 700, border: "none", cursor: saving || !doc.url ? "not-allowed" : "pointer", outline: "none",
          opacity: !doc.url ? 0.5 : 1,
        }}
      >
        <option value="INVALIDE">Doc invalide</option>
        <option value="VALIDE">Doc valide</option>
      </select>
    </div>
  );
}

/* ── MODALE : LISTE DES INSCRITS D'UN SÉJOUR ── */
function ModalInscrits({ sejour, inscriptions, onClose, onChangerStatut, onDelete }) {
  const inscrits = (inscriptions || []).filter((ins) => ins.sejourId === sejour.id);
  const [enfantOuvertId, setEnfantOuvertId] = useState(null);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(17, 76, 90, 0.6)", backdropFilter: "blur(4px)", padding: "20px" }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: C.white, width: "100%", maxWidth: "700px", maxHeight: "85vh", overflowY: "auto", borderRadius: "24px", padding: "32px", position: "relative", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)" }}>
        <button onClick={onClose} style={{ position: "absolute", top: "24px", right: "24px", background: C.arctic, border: "none", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={16} /></button>

        <h2 style={{ fontSize: "20px", fontWeight: 900, color: C.teal, marginBottom: "4px" }}>{sejour.titre}</h2>
        <p style={{ fontSize: "13px", color: C.gray, marginBottom: "24px" }}>{inscrits.length} inscrit{inscrits.length > 1 ? "s" : ""} · {sejour.places || 0} place{(sejour.places || 0) > 1 ? "s" : ""} au total</p>

        {inscrits.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: C.gray }}>
            <Users size={40} style={{ opacity: 0.2, marginBottom: "16px", margin: "0 auto" }} />
            <p>Aucune inscription pour ce séjour pour le moment.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {inscrits.map((ins) => {
              const docsManquants = (ins.enfant?.documents || []).filter((d) => d.statut === "MANQUANT").length;
              const dotColor = ins.enfant?.sexe === "M" ? "#3b82f6" : ins.enfant?.sexe === "F" ? "#ec4899" : C.gray;
              const estOuvert = enfantOuvertId === ins.id;
              return (
                <div key={ins.id} style={{ background: C.arctic, borderRadius: "16px", overflow: "hidden" }}>
                  <div
                    onClick={() => setEnfantOuvertId(estOuvert ? null : ins.id)}
                    style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap", cursor: "pointer" }}
                  >
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 800, color: C.teal, display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: dotColor, flexShrink: 0 }} />
                        {ins.enfant?.prenom} {ins.enfant?.nom}
                      </p>
                      <p style={{ fontSize: "12px", color: C.gray, marginTop: "2px" }}>
                        Parent : {ins.client?.prenom} {ins.client?.nom} {ins.client?.email ? `· ${ins.client.email}` : ""} {ins.client?.telephone ? `· ${ins.client.telephone}` : ""}
                      </p>
                      {docsManquants > 0 && (
                        <p style={{ fontSize: "11px", color: "#ef4444", fontWeight: 700, marginTop: "4px" }}>{docsManquants} document(s) manquant(s)</p>
                      )}
                      {ins.enfant?.allergies && (
                        <p style={{ fontSize: "11px", color: "#b45309", fontWeight: 700, marginTop: "4px" }}>⚠️ Allergies : {ins.enfant.allergies}</p>
                      )}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }} onClick={(e) => e.stopPropagation()}>
                      <select
                        value={ins.statut}
                        onChange={(e) => onChangerStatut(ins.id, e.target.value)}
                        style={{
                          background: (STATUT_INSCRIPTION_COLORS[ins.statut] || STATUT_INSCRIPTION_COLORS["Inscription envoyée"]).bg,
                          color: (STATUT_INSCRIPTION_COLORS[ins.statut] || STATUT_INSCRIPTION_COLORS["Inscription envoyée"]).color,
                          padding: "6px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: 700, border: "none", cursor: "pointer", outline: "none",
                        }}
                      >
                        {STATUTS_INSCRIPTION.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => onDelete(ins)}
                        title="Supprimer l'inscription"
                        style={{ background: "#fee2e2", border: "none", width: "32px", height: "32px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#991b1b" }}
                      >
                        <Trash2 size={14} />
                      </button>
                      <div style={{ color: C.gray, transform: estOuvert ? "rotate(180deg)" : "rotate(0)", transition: "transform .2s", display: "flex" }}>
                        <ChevronDown size={16} />
                      </div>
                    </div>
                  </div>

                  {estOuvert && (
                    <div style={{ padding: "0 20px 20px" }}>
                      <div style={{ borderTop: `1px solid ${C.lightGray}`, paddingTop: "16px" }}>
                        {/* Fiche enfant complète */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "10px", marginBottom: "16px" }}>
                          {ins.enfant?.dateNaissance && (
                            <InfoPill label="Né(e) le" value={new Date(ins.enfant.dateNaissance).toLocaleDateString("fr-FR")} />
                          )}
                          {ins.enfant?.taille && <InfoPill label="Taille" value={`${ins.enfant.taille} cm`} />}
                          {ins.enfant?.poids && <InfoPill label="Poids" value={`${ins.enfant.poids} kg`} />}
                          {ins.enfant?.pointure && <InfoPill label="Pointure" value={ins.enfant.pointure} />}
                        </div>
                        {ins.enfant?.informationsComplementaires && (
                          <div style={{ background: C.white, borderRadius: "10px", padding: "10px 12px", marginBottom: "16px" }}>
                            <p style={{ fontSize: "11px", fontWeight: 700, color: C.gray, textTransform: "uppercase", marginBottom: "2px" }}>Informations complémentaires</p>
                            <p style={{ fontSize: "13px", color: C.teal }}>{ins.enfant.informationsComplementaires}</p>
                          </div>
                        )}

                        <p style={{ fontSize: "12px", fontWeight: 800, color: C.teal, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "10px" }}>Documents</p>
                        {(!ins.enfant?.documents || ins.enfant.documents.length === 0) ? (
                          <p style={{ fontSize: "13px", color: C.gray }}>Aucun document déposé.</p>
                        ) : (
                          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            {ins.enfant.documents.map((doc) => (
                              <DocumentValidationRow key={doc.id} doc={doc} />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function InfoPill({ label, value }) {
  return (
    <div style={{ background: C.white, borderRadius: "10px", padding: "8px 12px" }}>
      <p style={{ fontSize: "10px", fontWeight: 700, color: C.gray, textTransform: "uppercase" }}>{label}</p>
      <p style={{ fontSize: "13px", fontWeight: 700, color: C.teal }}>{value}</p>
    </div>
  );
}

/* ── MODALE : FICHE COMPLÈTE D'UN ENFANT ── */
function ModalFicheEnfant({ enfant, onClose, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!enfant) return null;

  const age = calculerAge(enfant.dateNaissance);
  const sexeLabel = enfant.sexe === "M" ? "Garçon" : enfant.sexe === "F" ? "Fille" : "Non renseigné";
  const accent = enfant.sexe === "M" ? "#3b82f6" : enfant.sexe === "F" ? "#ec4899" : C.teal;
  const documents = enfant.documents || [];
  const docsValides = documents.filter((d) => d.statut === "VALIDE").length;
  const docsEnCours = documents.filter((d) => d.statut === "EN_COURS").length;
  const docsManquants = documents.filter((d) => d.statut === "MANQUANT").length;
  const inscriptions = enfant.inscriptions || [];

  const physique = [
    { label: "Date de naissance", value: enfant.dateNaissance ? new Date(enfant.dateNaissance).toLocaleDateString("fr-FR") : null, icon: Cake },
    { label: "Âge", value: age != null ? `${age} ans` : null, icon: Cake },
    { label: "Taille", value: enfant.taille ? `${enfant.taille} cm` : null, icon: Ruler },
    { label: "Poids", value: enfant.poids ? `${enfant.poids} kg` : null, icon: Weight },
    { label: "Pointure", value: enfant.pointure ? `${enfant.pointure}` : null, icon: Footprints },
    { label: "Sexe", value: sexeLabel, icon: Baby },
  ];

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(17, 76, 90, 0.6)", backdropFilter: "blur(4px)", padding: "20px" }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: C.white, width: "100%", maxWidth: "720px", maxHeight: "88vh", overflowY: "auto", borderRadius: "24px", padding: "32px", position: "relative", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)" }}>
        <button onClick={onClose} style={{ position: "absolute", top: "24px", right: "24px", background: C.arctic, border: "none", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={16} /></button>

        {/* En-tête */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "18px", background: accent + "20", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Baby size={28} style={{ color: accent }} />
          </div>
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: 900, color: C.teal }}>{enfant.prenom} {enfant.nom}</h2>
            <p style={{ fontSize: "13px", color: C.gray, marginTop: "2px" }}>
              {sexeLabel}{age != null ? ` · ${age} ans` : ""}
            </p>
          </div>
        </div>

        {/* Caractéristiques physiques */}
        <p style={{ fontSize: "12px", fontWeight: 800, color: C.teal, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "10px" }}>Caractéristiques</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "10px", marginBottom: "24px" }}>
          {physique.map((p) => (
            <div key={p.label} style={{ background: C.arctic, borderRadius: "12px", padding: "12px 14px" }}>
              <p style={{ fontSize: "10px", fontWeight: 700, color: C.gray, textTransform: "uppercase", display: "flex", alignItems: "center", gap: "6px" }}><p.icon size={12} /> {p.label}</p>
              <p style={{ fontSize: "14px", fontWeight: 800, color: p.value ? C.teal : C.gray, marginTop: "4px" }}>{p.value || "—"}</p>
            </div>
          ))}
        </div>

        {/* Allergies & médical */}
        <p style={{ fontSize: "12px", fontWeight: 800, color: C.teal, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "10px" }}>Santé</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
          <div style={{ background: enfant.allergies ? "#fef3c7" : C.arctic, borderRadius: "12px", padding: "12px 14px" }}>
            <p style={{ fontSize: "10px", fontWeight: 700, color: enfant.allergies ? "#b45309" : C.gray, textTransform: "uppercase", display: "flex", alignItems: "center", gap: "6px" }}>
              {enfant.allergies && <AlertTriangle size={12} />} Allergies
            </p>
            <p style={{ fontSize: "13px", fontWeight: enfant.allergies ? 700 : 400, color: enfant.allergies ? "#92400e" : C.gray, marginTop: "4px", whiteSpace: "pre-wrap" }}>
              {enfant.allergies || "Aucune allergie signalée"}
            </p>
          </div>
          <div style={{ background: C.arctic, borderRadius: "12px", padding: "12px 14px" }}>
            <p style={{ fontSize: "10px", fontWeight: 700, color: C.gray, textTransform: "uppercase" }}>Informations complémentaires</p>
            <p style={{ fontSize: "13px", color: enfant.informationsComplementaires ? C.teal : C.gray, marginTop: "4px", whiteSpace: "pre-wrap" }}>
              {enfant.informationsComplementaires || "—"}
            </p>
          </div>
        </div>

        {/* Documents */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
          <p style={{ fontSize: "12px", fontWeight: 800, color: C.teal, textTransform: "uppercase", letterSpacing: "0.5px" }}>Documents ({documents.length})</p>
          {docsValides > 0 && <span style={{ background: "#d1fae5", color: "#065f46", padding: "2px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 700 }}>{docsValides} validé{docsValides > 1 ? "s" : ""}</span>}
          {docsEnCours > 0 && <span style={{ background: "#fef3c7", color: "#92400e", padding: "2px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 700 }}>{docsEnCours} en vérif.</span>}
          {docsManquants > 0 && <span style={{ background: "#fee2e2", color: "#991b1b", padding: "2px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 700 }}>{docsManquants} manquant{docsManquants > 1 ? "s" : ""}</span>}
        </div>
        {documents.length === 0 ? (
          <p style={{ fontSize: "13px", color: C.gray, marginBottom: "24px" }}>Aucun document rattaché à cet enfant.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
            {documents.map((doc) => (
              <DocumentValidationRow key={doc.id} doc={doc} />
            ))}
          </div>
        )}

        {/* Inscriptions */}
        <p style={{ fontSize: "12px", fontWeight: 800, color: C.teal, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "10px" }}>Inscriptions ({inscriptions.length})</p>
        {inscriptions.length === 0 ? (
          <p style={{ fontSize: "13px", color: C.gray, marginBottom: "24px" }}>Aucune inscription.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
            {inscriptions.map((ins) => {
              const colors = STATUT_INSCRIPTION_COLORS[ins.statut] || STATUT_INSCRIPTION_COLORS["Inscription envoyée"];
              return (
                <div key={ins.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", background: C.arctic, borderRadius: "12px", padding: "12px 14px", flexWrap: "wrap" }}>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 800, color: C.teal }}>{ins.sejour?.titre || "Séjour supprimé"}</p>
                    <p style={{ fontSize: "11px", color: C.gray, marginTop: "2px" }}>Inscrit le {new Date(ins.createdAt).toLocaleDateString("fr-FR")}</p>
                  </div>
                  <span style={{ background: colors.bg, color: colors.color, padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: 700 }}>{ins.statut}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Parent */}
        <p style={{ fontSize: "12px", fontWeight: 800, color: C.teal, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "10px" }}>Représentant légal</p>
        <div style={{ background: C.arctic, borderRadius: "12px", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "6px" }}>
          <p style={{ fontSize: "14px", fontWeight: 800, color: C.teal }}>{enfant.client?.prenom} {enfant.client?.nom}</p>
          <span style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: C.gray }}><Mail size={14} /> {enfant.client?.email || "Non renseigné"}</span>
          <span style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: C.gray }}><Phone size={14} /> {enfant.client?.telephone || "Non renseigné"}</span>
        </div>

        {/* Zone de suppression */}
        <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: `1px solid ${C.arctic}`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <p style={{ fontSize: "12px", color: C.gray, flex: 1, minWidth: "200px" }}>
            {inscriptions.length > 0
              ? "Cet enfant a des inscriptions : supprimez-les d'abord pour pouvoir le supprimer."
              : "La suppression est définitive et retire aussi ses documents."}
          </p>
          <button
            onClick={async () => {
              if (inscriptions.length > 0) return;
              if (!window.confirm(`Supprimer définitivement la fiche de ${enfant.prenom} ${enfant.nom} ?`)) return;
              setIsDeleting(true);
              const res = await onDelete(enfant.id);
              setIsDeleting(false);
              if (res?.error) {
                alert(res.error);
              } else {
                onClose();
              }
            }}
            disabled={isDeleting || inscriptions.length > 0}
            style={{ display: "flex", alignItems: "center", gap: "8px", background: inscriptions.length > 0 ? C.arctic : "#fee2e2", color: inscriptions.length > 0 ? C.gray : "#991b1b", border: "none", padding: "12px 20px", borderRadius: "12px", fontWeight: 800, fontSize: "13px", cursor: isDeleting || inscriptions.length > 0 ? "not-allowed" : "pointer", flexShrink: 0 }}
          >
            <Trash2 size={15} /> {isDeleting ? "Suppression..." : "Supprimer l'enfant"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── TABLEAUX / GRILLES ── */
function TableInscriptions({ data, onFicheEnfant, onChangerStatut }) {
  const recent = (data || []).slice(0, 8);
  return (
    <div style={{ background: C.white, borderRadius: "24px", padding: "32px", boxShadow: "0 4px 16px rgba(17,76,90,0.04)" }}>
      <h2 style={{ fontSize: "18px", fontWeight: 800, color: C.teal, marginBottom: "24px" }}>Dernières Inscriptions</h2>
      {recent.length === 0 ? (
        <p style={{ fontSize: "13px", color: C.gray }}>Aucune inscription pour le moment.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ borderBottom: `2px solid ${C.arctic}`, textAlign: "left" }}>
            <th style={{ padding: "16px", fontSize: "12px", color: C.gray }}>PARTICIPANT</th>
            <th style={{ padding: "16px", fontSize: "12px", color: C.gray }}>SÉJOUR</th>
            <th style={{ padding: "16px", fontSize: "12px", color: C.gray }}>DATE</th>
            <th style={{ padding: "16px", fontSize: "12px", color: C.gray }}>STATUT</th>
          </tr></thead>
          <tbody>
            {recent.map(b => {
              const dotColor = b.enfant?.sexe === "M" ? "#3b82f6" : b.enfant?.sexe === "F" ? "#ec4899" : C.gray;
              return (
                <tr key={b.id} style={{ borderBottom: `1px solid ${C.arctic}` }}>
                  <td style={{ padding: "16px", fontSize: "13px", fontWeight: 700, color: C.teal }}>
                    <button
                      onClick={() => b.enfant?.id && onFicheEnfant(b.enfant.id)}
                      title="Voir la fiche complète de l'enfant"
                      style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: "13px", fontWeight: 700, color: C.teal }}
                    >
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: dotColor, flexShrink: 0 }} />
                      {b.enfant?.prenom} {b.enfant?.nom}
                    </button>
                  </td>
                  <td style={{ padding: "16px", fontSize: "13px" }}>{b.sejour?.titre}</td>
                  <td style={{ padding: "16px", fontSize: "13px", color: C.gray }}>{new Date(b.createdAt).toLocaleDateString("fr-FR")}</td>
                  <td style={{ padding: "16px" }}>
                    <select
                      value={b.statut}
                      onChange={(e) => onChangerStatut(b.id, e.target.value)}
                      style={{
                        background: (STATUT_INSCRIPTION_COLORS[b.statut] || STATUT_INSCRIPTION_COLORS["Inscription envoyée"]).bg,
                        color: (STATUT_INSCRIPTION_COLORS[b.statut] || STATUT_INSCRIPTION_COLORS["Inscription envoyée"]).color,
                        padding: "6px 10px", borderRadius: "8px", fontSize: "12px", fontWeight: 700, border: "none", cursor: "pointer", outline: "none",
                      }}
                    >
                      {STATUTS_INSCRIPTION.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

function TableSejours({ data, onEdit, onDelete, onToggleStatut, onToggleEnAvant, onDuplicate, onViewInscrits, onCopyTotemia }) {
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
                    <button onClick={() => onToggleStatut(s.id, isPublie ? "Brouillon" : "Publié")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", opacity: 1 }} title={isPublie ? "Masquer" : "Publier"}><Eye size={18} color={isPublie ? "#10b981" : C.gray} /></button>
                    <button onClick={() => onToggleEnAvant(s.id, !isEnAvant)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", opacity: 1 }} title={isEnAvant ? "Retirer" : "Mettre à l'affiche"}><Star size={18} color={isEnAvant ? C.yellow : C.gray} fill={isEnAvant ? C.yellow : "transparent"} /></button>
                  </div>
                </td>
                <td style={{ padding: "16px", fontSize: "13px", fontWeight: 800, color: C.teal, filter: isPublie ? "none" : "grayscale(100%)" }}>
                  {s.titre}
                  <div style={{ fontSize: "11px", fontWeight: 600, color: C.gray, marginTop: "4px" }}>{s.saison}</div>
                </td>
                <td style={{ padding: "16px", fontSize: "13px", color: C.gray, fontWeight: 600 }}>{formatAge(s.tranchesAge)}</td>
                <td style={{ padding: "16px", minWidth: "140px", filter: isPublie ? "none" : "grayscale(100%)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: 700, color: C.teal, marginBottom: "6px" }}>
                    <span>{nbInscrits} inscrit{nbInscrits > 1 ? 's' : ''}</span><span style={{ color: C.gray }}>/ {places}</span>
                  </div>
                  <div style={{ width: "100%", height: "6px", background: C.lightGray, borderRadius: "3px", overflow: "hidden" }}>
                    <div style={{ width: `${pourcentage}%`, height: "100%", background: jaugeColor, borderRadius: "3px", transition: "width 0.3s" }} />
                  </div>
                </td>
                <td style={{ padding: "16px", fontSize: "13px", color: C.gray }}>{formatSejourDates(s.dateDebut, s.dateFin)}</td>
                <td style={{ padding: "16px", fontSize: "13px", fontWeight: 800, color: C.teal }}>{s.prix || 0} €</td>
                <td style={{ padding: "16px", display: "flex", gap: "6px", justifyContent: "flex-end", alignItems: "center" }}>
                  <div className="extra-actions" style={{ display: "flex", gap: "6px" }}>
                    <button title="Voir les inscrits" onClick={() => onViewInscrits(s)} style={{...actionBtnStyle, opacity: 1}}><Users size={15} /></button>
                    <button title="Copier le formulaire Totemia" onClick={() => onCopyTotemia(s)} style={{...actionBtnStyle, opacity: 1}}><ClipboardList size={15} /></button>
                  </div>
                  <button title="Dupliquer" onClick={() => onDuplicate(s.id)} style={{...actionBtnStyle, opacity: 1}}><Copy size={15} /></button>
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

function GridSejours({ data, onEdit, onDelete, onToggleStatut, onToggleEnAvant, onDuplicate, onViewInscrits, onCopyTotemia }) {
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
                <button onClick={() => onToggleStatut(s.id, isPublie ? "Brouillon" : "Publié")} style={{ background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "8px", padding: "6px", cursor: "pointer", display: "flex", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", opacity: 1 }}><Eye size={14} color={isPublie?"#10b981":C.gray} /></button>
                <button onClick={() => onToggleEnAvant(s.id, !isEnAvant)} style={{ background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "8px", padding: "6px", cursor: "pointer", display: "flex", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", opacity: 1 }}><Star size={14} color={isEnAvant ? C.yellow : C.gray} fill={isEnAvant ? C.yellow : "transparent"} /></button>
              </div>
              <div style={{ position: "absolute", top: "12px", right: "12px", background: C.white, padding: "6px 10px", borderRadius: "10px", fontSize: "12px", fontWeight: 800, color: C.teal, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>{s.prix || "0"} €</div>
            </div>
            
            <div style={{ padding: "16px", flex: 1, filter: isPublie ? "none" : "grayscale(100%)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 800, color: C.teal, lineHeight: 1.3 }}>{s.titre}</h3>
                <span style={{ background: C.arctic, padding: "4px 8px", borderRadius: "6px", fontSize: "10px", fontWeight: 800, color: C.teal, textTransform: "uppercase" }}>{s.saison}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "12px", color: C.gray, fontWeight: 600 }}><CalendarDays size={16} color={C.saffron} /> {formatSejourDates(s.dateDebut, s.dateFin)}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "12px", color: C.gray, fontWeight: 600 }}><MapPin size={16} color={"#10b981"} /> {s.lieu || "Lieu à définir"}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "12px", color: C.gray, fontWeight: 600 }}><Users size={16} color={C.teal} /> {formatAge(s.tranchesAge)}</div>
              </div>
              <div style={{ background: C.arctic + "60", padding: "12px", borderRadius: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", fontWeight: 700, color: C.teal, marginBottom: "6px" }}><span>{nbInscrits} inscrit{nbInscrits > 1 ? 's' : ''}</span><span style={{ color: C.gray }}>/ {places} max.</span></div>
                <div style={{ width: "100%", height: "6px", background: C.lightGray, borderRadius: "3px", overflow: "hidden" }}><div style={{ width: `${pourcentage}%`, height: "100%", background: jaugeColor, borderRadius: "3px" }} /></div>
              </div>
            </div>

            <div style={{ padding: "12px 16px", borderTop: `1px solid ${C.lightGray}`, display: "flex", justifyContent: "space-between", background: C.arctic + "40" }}>
              <div className="extra-actions" style={{ display: "flex", gap: "4px" }}><button title="Voir les inscrits" onClick={() => onViewInscrits(s)} style={{...actionBtnStyle, opacity: 1}}><Users size={16} /></button><button title="Copier le formulaire Totemia" onClick={() => onCopyTotemia(s)} style={{...actionBtnStyle, opacity: 1}}><ClipboardList size={16} /></button></div>
              <div style={{ display: "flex", gap: "4px" }}><button title="Dupliquer" onClick={() => onDuplicate(s.id)} style={{...actionBtnStyle, opacity: 1}}><Copy size={16} /></button><button title="Éditer" onClick={() => onEdit(s)} style={{...actionBtnStyle, opacity: 1}}><Edit size={16} /></button><button title="Supprimer" onClick={() => onDelete(s.id)} style={{...actionBtnStyle, color: "#f63656", opacity: 1}}><Trash2 size={16} /></button></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function GridAlbums({ data, onEdit, onDelete }) {
  const actionBtnStyle = { background: "transparent", border: "none", width: "32px", height: "32px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.gray };

  if (!data || data.length === 0) {
    return (
      <div style={{ background: C.white, borderRadius: "24px", padding: "48px", textAlign: "center", color: C.gray }}>
        <ImageIcon size={40} style={{ opacity: 0.2, marginBottom: "16px", margin: "0 auto" }} />
        <p>Aucun album photo pour le moment.</p>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
      {data.map((album) => (
        <div key={album.id} style={{ background: C.white, borderRadius: "20px", overflow: "hidden", boxShadow: "0 4px 16px rgba(17,76,90,0.04)", border: `1px solid ${C.lightGray}`, display: "flex", flexDirection: "column" }}>
          <div style={{ height: "150px", background: C.arctic, position: "relative", overflow: "hidden" }}>
            {album.photos?.[0] ? <img src={album.photos[0].url} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <ImageIcon size={32} color={C.gray} style={{ opacity: 0.3, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />}
            <div style={{ position: "absolute", top: "12px", right: "12px", background: C.white, padding: "6px 10px", borderRadius: "10px", fontSize: "12px", fontWeight: 800, color: C.teal, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>{album.photos?.length || 0} photo{(album.photos?.length || 0) > 1 ? "s" : ""}</div>
          </div>
          <div style={{ padding: "16px", flex: 1 }}>
            <h3 style={{ fontSize: "15px", fontWeight: 800, color: C.teal, marginBottom: "6px" }}>{album.titre}</h3>
            {album.sejour && <p style={{ fontSize: "12px", color: C.gray, fontWeight: 600 }}>Lié à : {album.sejour.titre}</p>}
          </div>
          <div style={{ padding: "12px 16px", borderTop: `1px solid ${C.lightGray}`, display: "flex", justifyContent: "flex-end", background: C.arctic + "40" }}>
            <div style={{ display: "flex", gap: "4px" }}>
              <button title="Éditer" onClick={() => onEdit(album)} style={{ ...actionBtnStyle }}><Edit size={16} /></button>
              <button title="Supprimer" onClick={() => onDelete(album.id)} style={{ ...actionBtnStyle, color: "#f63656" }}><Trash2 size={16} /></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── DASHBOARD PRINCIPAL ── */
export default function AdminDashboardClient({ stats, inscriptions, sejours, clients, enfants, animateurs, albums, prochainsDeparts }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [sejourEnEdition, setSejourEnEdition] = useState(null);
  const [animEnEdition, setAnimEnEdition] = useState(null);
  const [albumEnEdition, setAlbumEnEdition] = useState(null);
  const [sejourInscritsEnView, setSejourInscritsEnView] = useState(null);
  const [ficheEnfantId, setFicheEnfantId] = useState(null);
  const [rechercheEnfant, setRechercheEnfant] = useState("");
  const [filtreSejourId, setFiltreSejourId] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewMode, setViewMode] = useState("table");

  const [filterSaison, setFilterSaison] = useState("");
  const [filterAge, setFilterAge] = useState("");
  const [filterStatut, setFilterStatut] = useState("");
  const [sejoursSection, setSejoursSection] = useState("actifs"); // "actifs" | "archive"

  const today = new Date();
  const isSejourTermine = (s) => {
    const refDate = s.dateFin || s.dateDebut;
    return !!refDate && new Date(refDate) < today;
  };

  const sejoursTries = [...(sejours || [])].sort((a, b) => new Date(a.dateDebut) - new Date(b.dateDebut));
  const uniqueAges = [...new Set(sejoursTries.map(s => s.tranchesAge).filter(Boolean))];
  const sejoursArchives = sejoursTries.filter(isSejourTermine);
  const sejoursActifs = sejoursTries.filter(s => !isSejourTermine(s));

  const sejoursFiltres = (sejoursSection === "archive" ? sejoursArchives : sejoursActifs).filter(s => {
    if (filterSaison && s.saison !== filterSaison) return false;
    if (filterAge && s.tranchesAge !== filterAge) return false;
    if (filterStatut && s.statut !== filterStatut) return false;
    return true;
  });

  const handleDelete = async (id) => {
    if(window.confirm("Supprimer définitivement ce séjour ?")) { 
      await supprimerSejour(id); 
    }
  };

  const handleToggleStatut = async (id, nouveauStatut) => {
    await toggleStatut(id, nouveauStatut);
  };

  const handleToggleEnAvant = async (id, estEnAvant) => {
    await toggleEnAvant(id, estEnAvant);
  };

  const handleDuplicate = async (id) => {
    const copie = await dupliquerSejour(id);
    if (copie) setSejourEnEdition(copie);
  };

  const handleCopyTotemia = async (s) => {
    const res = await getOuCreerLienTotemia(s.id);
    if (res?.error) return alert(res.error);
    const url = `${window.location.origin}/inscription/totemia/${res.token}`;
    try {
      await navigator.clipboard.writeText(url);
      alert(`Lien du formulaire Totemia copié :\n${url}`);
    } catch {
      window.prompt("Copiez le lien du formulaire Totemia :", url);
    }
  };

  const handleChangerStatutInscription = async (id, statut) => {
    await changerStatutInscription(id, statut);
  };

  const handleDeleteInscription = async (ins) => {
    const nom = ins.enfant ? `${ins.enfant.prenom} ${ins.enfant.nom}` : "cet inscrit";
    if (window.confirm(`Supprimer définitivement l'inscription de ${nom} ?`)) {
      await supprimerInscription(ins.id);
    }
  };

  const [renvoiEnCours, setRenvoiEnCours] = useState(null);
  const handleRenvoyerEmail = async (ins) => {
    const email = ins.client?.email;
    if (!email) return alert("Cette famille n'a pas d'adresse email renseignée.");
    if (!window.confirm(`Renvoyer l'email d'inscription à ${email} ?`)) return;
    setRenvoiEnCours(ins.id);
    const res = await renvoyerEmailInscription(ins.id);
    setRenvoiEnCours(null);
    alert(res?.error ? `Échec : ${res.error}` : `Email renvoyé à ${res.email}.`);
  };

  const handleDeleteEnfant = async (id) => {
    const res = await supprimerEnfantAdmin(id);
    if (res?.success) setFicheEnfantId(null);
    return res;
  };

  const handleDeleteAlbum = async (id) => {
    if (window.confirm("Supprimer définitivement cet album et toutes ses photos ?")) {
      await supprimerAlbum(id);
    }
  };

  const featuredPhotos = (albums || []).flatMap(a => (a.photos || []).filter(p => p.enAvant));

  const handleUnfeaturePhoto = async (photoId) => {
    await togglePhotoEnAvant(photoId, false);
  };

  // ── Inscriptions & fiches enfants ──
  const ficheEnfant = (enfants || []).find((e) => e.id === ficheEnfantId) || null;

  // Couleur stable par séjour (assignée dans l'ordre de la liste des séjours)
  const sejourColorMap = {};
  (sejours || []).forEach((s, i) => { sejourColorMap[s.id] = SEJOUR_PALETTE[i % SEJOUR_PALETTE.length]; });
  const couleurSejour = (id) => sejourColorMap[id] || C.gray;

  // Séjours qui ont au moins une inscription (pour la barre de filtres)
  const sejoursAvecInscrits = (sejours || []).filter((s) =>
    (inscriptions || []).some((ins) => ins.sejourId === s.id)
  );

  const inscriptionsFiltrees = (inscriptions || []).filter((ins) => {
    if (filtreSejourId && ins.sejourId !== filtreSejourId) return false;
    const q = rechercheEnfant.trim().toLowerCase();
    if (!q) return true;
    const parent = `${ins.client?.prenom || ""} ${ins.client?.nom || ""}`.toLowerCase();
    return (
      `${ins.enfant?.prenom || ""} ${ins.enfant?.nom || ""}`.toLowerCase().includes(q) ||
      parent.includes(q) ||
      (ins.sejour?.titre || "").toLowerCase().includes(q)
    );
  });

  return (
    <AdminLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} MENU={MENU} C={C}>
      
      <style>{`
        .extra-actions { opacity: 0; transform: translateX(10px); transition: all 0.2s ease; }
        .hover-row:hover .extra-actions { opacity: 1; transform: translateX(0); }
      `}</style>

      <div style={{ flex: 1, overflowY: "auto", padding: "40px 32px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          <div style={{ marginBottom: "40px" }}>
            <h1 style={{ fontSize: "32px", fontWeight: 900, color: C.teal }}>
              {activeTab === "dashboard" && "Bonjour, l'équipe 👋"}
              {activeTab === "sejours" && "Gestion des Séjours 🏕️"}
              {activeTab === "galerie" && "Galerie Photos 📸"}
              {activeTab === "clients" && "Répertoire Clients 👥"}
              {activeTab === "inscriptions" && "Inscriptions & Enfants 🧒"}
              {activeTab === "newsletter" && "Liste de diffusion 📧"}
              {activeTab === "statistiques" && "Statistiques 📊"}
              {activeTab === "settings" && "Paramètres & Équipe ⚙️"}
            </h1>
          </div>

          {activeTab === "dashboard" && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px", marginBottom: "32px" }}>
                <StatCard title="Inscriptions" value={stats?.inscriptionsTotal || 0} icon={FileText} color={C.saffron} />
                <StatCard title="CA (validé)" value={`${stats?.ca || 0} €`} icon={Euro} color={"#10b981"} />
                <StatCard title="Séjours publiés" value={stats?.sejoursActifs || 0} icon={Tent} color={C.teal} />
                <StatCard title="Familles" value={stats?.familles || 0} icon={Users} color={C.yellow} />
                <StatCard title="Docs manquants" value={stats?.documentsManquants || 0} icon={AlertTriangle} color={"#ef4444"} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div style={{ background: C.white, borderRadius: "24px", padding: "32px", boxShadow: "0 4px 16px rgba(17,76,90,0.04)" }}>
                  <h2 style={{ fontSize: "18px", fontWeight: 800, color: C.teal, marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}><CalendarDays size={18} color={C.saffron} /> Prochains départs</h2>
                  {(!prochainsDeparts || prochainsDeparts.length === 0) ? (
                    <p style={{ fontSize: "13px", color: C.gray }}>Aucun départ à venir.</p>
                  ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" }}>
                      {prochainsDeparts.map((s) => (
                        <div key={s.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", background: C.arctic, borderRadius: "14px", padding: "14px 16px" }}>
                          <div>
                            <p style={{ fontSize: "13px", fontWeight: 800, color: C.teal }}>{s.titre}</p>
                            <p style={{ fontSize: "12px", color: C.gray, marginTop: "2px" }}>{formatSejourDates(s.dateDebut, s.dateFin)}</p>
                          </div>
                          <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                            <button onClick={() => { setActiveTab("sejours"); setSejourInscritsEnView(s); }} style={{ background: C.white, border: "none", width: "32px", height: "32px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: C.teal }} title="Voir les inscrits"><Users size={14} /></button>
                            <button onClick={() => { setActiveTab("sejours"); setSejourEnEdition(s); }} style={{ background: C.white, border: "none", width: "32px", height: "32px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: C.teal }} title="Modifier le séjour"><Edit size={14} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <TableInscriptions data={inscriptions} onFicheEnfant={setFicheEnfantId} onChangerStatut={handleChangerStatutInscription} />
              </div>
            </>
          )}

          {activeTab === "sejours" && (
            <>
              <div style={{ display: "flex", background: C.white, borderRadius: "12px", padding: "4px", border: `1px solid ${C.lightGray}`, width: "fit-content", marginBottom: "20px" }}>
                <button onClick={() => setSejoursSection("actifs")} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 18px", borderRadius: "8px", border: "none", cursor: "pointer", background: sejoursSection === "actifs" ? C.teal : "transparent", color: sejoursSection === "actifs" ? C.white : C.gray, fontWeight: 800, fontSize: "13px", transition: "all 0.2s" }}>
                  <Tent size={15} /> Actifs
                  <span style={{ background: sejoursSection === "actifs" ? "rgba(255,255,255,0.2)" : C.arctic, padding: "2px 8px", borderRadius: "999px", fontSize: "11px" }}>{sejoursActifs.length}</span>
                </button>
                <button onClick={() => setSejoursSection("archive")} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 18px", borderRadius: "8px", border: "none", cursor: "pointer", background: sejoursSection === "archive" ? C.teal : "transparent", color: sejoursSection === "archive" ? C.white : C.gray, fontWeight: 800, fontSize: "13px", transition: "all 0.2s" }}>
                  <Archive size={15} /> Archive
                  <span style={{ background: sejoursSection === "archive" ? "rgba(255,255,255,0.2)" : C.arctic, padding: "2px 8px", borderRadius: "999px", fontSize: "11px" }}>{sejoursArchives.length}</span>
                </button>
              </div>

              {sejoursSection === "archive" && (
                <div style={{ background: C.lilac, borderRadius: "12px", padding: "14px 18px", marginBottom: "20px", fontSize: "13px", color: C.teal, fontWeight: 600 }}>
                  Les séjours dont la date de fin est passée arrivent automatiquement ici. Ils restent modifiables et supprimables ; pour les retirer du site public, pensez à les repasser en "Brouillon".
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>

                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: C.gray }}>{sejoursFiltres.length} séjour(s)</div>
                  
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", borderLeft: `1px solid ${C.lightGray}`, paddingLeft: "16px" }}>
                    <Filter size={16} color={C.gray} />
                    <FilterDropdown value={filterStatut} onChange={setFilterStatut} options={[{ value: "Publié", label: "Affichés" }, { value: "Brouillon", label: "Masqués" }]} defaultLabel="Tous statuts" />
                    <FilterDropdown value={filterSaison} onChange={setFilterSaison} options={[{ value: "Automne", label: "Automne" }, { value: "Hiver", label: "Hiver" }, { value: "Printemps", label: "Printemps" }, { value: "Été", label: "Été" }]} defaultLabel="Toutes saisons" />
                    <FilterDropdown value={filterAge} onChange={setFilterAge} options={uniqueAges.map(age => ({ value: age, label: formatAge(age) }))} defaultLabel="Tous âges" />
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
                <TableSejours data={sejoursFiltres} onEdit={setSejourEnEdition} onDelete={handleDelete} onToggleStatut={handleToggleStatut} onToggleEnAvant={handleToggleEnAvant} onDuplicate={handleDuplicate} onViewInscrits={setSejourInscritsEnView} onCopyTotemia={handleCopyTotemia} /> :
                <GridSejours data={sejoursFiltres} onEdit={setSejourEnEdition} onDelete={handleDelete} onToggleStatut={handleToggleStatut} onToggleEnAvant={handleToggleEnAvant} onDuplicate={handleDuplicate} onViewInscrits={setSejourInscritsEnView} onCopyTotemia={handleCopyTotemia} />}
            </>
          )}

          {activeTab === "inscriptions" && (
            <>
              {/* Filtres par séjour + recherche */}
              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontSize: "14px", fontWeight: 700, color: C.gray, marginBottom: "14px" }}>
                  {inscriptionsFiltrees.length} inscription{inscriptionsFiltrees.length > 1 ? "s" : ""}
                  {filtreSejourId ? ` · ${(sejours || []).find((s) => s.id === filtreSejourId)?.titre || ""}` : ""}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
                  {sejoursAvecInscrits.length > 0 && (
                    <>
                      <button
                        onClick={() => setFiltreSejourId("")}
                        style={{ fontSize: "12px", fontWeight: 800, padding: "8px 16px", borderRadius: "999px", cursor: "pointer", border: `1px solid ${filtreSejourId === "" ? C.teal : C.lightGray}`, background: filtreSejourId === "" ? C.teal : C.white, color: filtreSejourId === "" ? C.white : C.teal }}
                      >
                        Tous ({inscriptions.length})
                      </button>
                      {sejoursAvecInscrits.map((s) => {
                        const col = couleurSejour(s.id);
                        const actif = filtreSejourId === s.id;
                        const n = inscriptions.filter((ins) => ins.sejourId === s.id).length;
                        return (
                          <button
                            key={s.id}
                            onClick={() => setFiltreSejourId(actif ? "" : s.id)}
                            style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "12px", fontWeight: 800, padding: "8px 16px", borderRadius: "999px", cursor: "pointer", border: `1px solid ${actif ? col : C.lightGray}`, background: actif ? col : C.white, color: actif ? C.white : C.teal }}
                          >
                            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: actif ? C.white : col, flexShrink: 0 }} />
                            {s.titre} ({n})
                          </button>
                        );
                      })}
                    </>
                  )}

                  <div style={{ position: "relative", flex: "1 1 280px", minWidth: "220px" }}>
                    <Search size={18} color={C.gray} style={{ position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)" }} />
                    <input
                      type="text"
                      value={rechercheEnfant}
                      onChange={(e) => setRechercheEnfant(e.target.value)}
                      placeholder="Rechercher un enfant, un parent, un séjour..."
                      style={{ width: "100%", padding: "13px 22px 13px 48px", borderRadius: "999px", border: `1px solid ${C.lightGray}`, background: C.white, outline: "none", color: C.teal, fontWeight: 600, fontSize: "14px" }}
                      onFocus={(e) => (e.target.style.borderColor = C.yellow)}
                      onBlur={(e) => (e.target.style.borderColor = C.lightGray)}
                    />
                  </div>
                </div>
              </div>

              {(!inscriptions || inscriptions.length === 0) ? (
                <div style={{ background: C.white, padding: "40px", borderRadius: "20px", textAlign: "center", color: C.gray }}>
                  <FileText size={40} style={{ opacity: 0.2, margin: "0 auto 16px" }} />
                  <p>Aucune inscription pour le moment.</p>
                </div>
              ) : inscriptionsFiltrees.length === 0 ? (
                <div style={{ background: C.white, padding: "40px", borderRadius: "20px", textAlign: "center", color: C.gray }}>
                  <p>Aucune inscription ne correspond à ces critères.</p>
                </div>
              ) : (
                <div style={{ background: C.white, borderRadius: "20px", overflow: "hidden", boxShadow: "0 4px 16px rgba(17,76,90,0.04)" }}>
                  {inscriptionsFiltrees.map((ins, idx) => {
                    const col = couleurSejour(ins.sejourId);
                    const docs = ins.enfant?.documents || [];
                    const envoyes = docs.filter((d) => d.statut !== "MANQUANT").length;
                    const total = docs.length;
                    const docColor = total === 0 ? C.gray : envoyes === 0 ? "#991b1b" : envoyes < total ? "#92400e" : "#065f46";
                    const dotColor = ins.enfant?.sexe === "M" ? "#3b82f6" : ins.enfant?.sexe === "F" ? "#ec4899" : C.gray;
                    return (
                      <div
                        key={ins.id}
                        style={{ display: "flex", alignItems: "center", gap: "16px", padding: "14px 18px", borderLeft: `5px solid ${col}`, borderBottom: idx < inscriptionsFiltrees.length - 1 ? `1px solid ${C.arctic}` : "none", flexWrap: "wrap" }}
                      >
                        <div style={{ flex: "1 1 220px", minWidth: 0 }}>
                          <button
                            onClick={() => ins.enfant?.id && setFicheEnfantId(ins.enfant.id)}
                            title="Voir la fiche complète de l'enfant"
                            style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: "14px", fontWeight: 800, color: C.teal }}
                          >
                            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: dotColor, flexShrink: 0 }} />
                            {ins.enfant?.prenom} {ins.enfant?.nom}
                          </button>
                          <p style={{ fontSize: "12px", color: C.gray, marginTop: "3px", display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: col, flexShrink: 0 }} />
                              {ins.sejour?.titre || "Séjour supprimé"}
                            </span>
                            <span>· {ins.client?.prenom} {ins.client?.nom}</span>
                          </p>
                        </div>

                        <div style={{ flex: "0 0 auto", fontSize: "12px", fontWeight: 700, color: docColor }}>
                          {total === 0 ? "Aucun document requis" : `${envoyes} document${envoyes > 1 ? "s" : ""} sur ${total} envoyé${envoyes > 1 ? "s" : ""}`}
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                          <select
                            value={ins.statut}
                            onChange={(e) => handleChangerStatutInscription(ins.id, e.target.value)}
                            style={{
                              background: (STATUT_INSCRIPTION_COLORS[ins.statut] || STATUT_INSCRIPTION_COLORS["Inscription envoyée"]).bg,
                              color: (STATUT_INSCRIPTION_COLORS[ins.statut] || STATUT_INSCRIPTION_COLORS["Inscription envoyée"]).color,
                              padding: "6px 10px", borderRadius: "8px", fontSize: "12px", fontWeight: 700, border: "none", cursor: "pointer", outline: "none",
                            }}
                          >
                            {STATUTS_INSCRIPTION.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                          <button
                            onClick={() => handleRenvoyerEmail(ins)}
                            disabled={renvoiEnCours === ins.id}
                            title="Renvoyer l'email d'inscription à la famille"
                            style={{ background: C.arctic, border: "none", width: "30px", height: "30px", borderRadius: "8px", cursor: renvoiEnCours === ins.id ? "wait" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: C.teal, opacity: renvoiEnCours === ins.id ? 0.5 : 1 }}
                          >
                            <Mail size={13} />
                          </button>
                          <button
                            onClick={() => handleDeleteInscription(ins)}
                            title="Supprimer l'inscription"
                            style={{ background: "#fee2e2", border: "none", width: "30px", height: "30px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#991b1b" }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {activeTab === "galerie" && (
            <>
              <div style={{ marginBottom: "40px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
                  <div>
                    <h2 style={{ fontSize: "18px", fontWeight: 800, color: C.teal, display: "flex", alignItems: "center", gap: "8px" }}><Star size={18} color={C.yellow} fill={C.yellow} /> Photos à l'affiche</h2>
                    <p style={{ fontSize: "13px", color: C.gray, marginTop: "4px" }}>Ces photos sont affichées dans la section "Nos plus beaux souvenirs" de la page d'accueil.</p>
                  </div>
                </div>
                {featuredPhotos.length === 0 ? (
                  <div style={{ background: C.white, borderRadius: "20px", padding: "32px", textAlign: "center", color: C.gray, border: `1px dashed ${C.lightGray}` }}>
                    <p style={{ fontSize: "13px" }}>Aucune photo à l'affiche. Ouvrez un album et cliquez sur l'étoile d'une photo pour l'ajouter ici.</p>
                  </div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "16px" }}>
                    {featuredPhotos.map((p) => (
                      <div key={p.id} style={{ borderRadius: "16px", overflow: "hidden", position: "relative", aspectRatio: "1 / 1", border: `2px solid ${C.yellow}` }}>
                        <img src={p.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="photo à l'affiche" />
                        <button onClick={() => handleUnfeaturePhoto(p.id)} title="Retirer de l'affiche" style={{ position: "absolute", top: "8px", right: "8px", background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "50%", width: "26px", height: "26px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Star size={14} color={C.yellow} fill={C.yellow} /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
                <div style={{ fontSize: "14px", fontWeight: 700, color: C.gray }}>{albums?.length || 0} album(s)</div>
                <button onClick={() => setAlbumEnEdition("nouveau")} style={{ background: C.yellow, color: C.teal, border: "none", padding: "10px 16px", borderRadius: "10px", fontWeight: 800, cursor: "pointer" }}>+ Album photo</button>
              </div>
              <GridAlbums data={albums} onEdit={setAlbumEnEdition} onDelete={handleDeleteAlbum} />
            </>
          )}

          {activeTab === "clients" && (
            <>
              <div style={{ fontSize: "14px", fontWeight: 700, color: C.gray, marginBottom: "20px" }}>{clients?.length || 0} famille(s)</div>
              {(!clients || clients.length === 0) ? (
                <div style={{ background: C.white, padding: "40px", borderRadius: "20px", textAlign: "center", color: C.gray }}>
                  <Users size={40} style={{ opacity: 0.2, margin: "0 auto 16px" }} />
                  <p>Aucune famille enregistrée pour le moment.</p>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
                  {clients.map(c => (
                    <div key={c.id} style={{ background: C.white, padding: "24px", borderRadius: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                        <h3 style={{ color: C.teal, fontWeight: 800 }}>{c.nom} {c.prenom}</h3>
                        <span style={{ background: C.arctic, color: C.teal, padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: 700, flexShrink: 0 }}>{c._count?.inscriptions || 0} inscription{(c._count?.inscriptions || 0) > 1 ? "s" : ""}</span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "13px", color: C.gray, marginBottom: "12px" }}>
                         <span style={{ display: "flex", alignItems: "center", gap: "8px" }}><Mail size={14}/> {c.email || "Non renseigné"}</span>
                         <span style={{ display: "flex", alignItems: "center", gap: "8px" }}><Phone size={14}/> {c.telephone || "Non renseigné"}</span>
                      </div>
                      {c.enfants?.length > 0 && (
                        <div style={{ borderTop: `1px solid ${C.arctic}`, paddingTop: "12px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                          {c.enfants.map(e => {
                            const bg = e.sexe === "M" ? "#dbeafe" : e.sexe === "F" ? "#fce7f3" : C.lilac;
                            const fg = e.sexe === "M" ? "#1d4ed8" : e.sexe === "F" ? "#be185d" : C.teal;
                            return (
                              <button key={e.id} onClick={() => setFicheEnfantId(e.id)} title="Voir la fiche complète" style={{ fontSize: "12px", fontWeight: 600, color: fg, background: bg, padding: "4px 10px", borderRadius: "999px", border: "none", cursor: "pointer" }}>{e.prenom} {e.nom}</button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === "newsletter" && <NewsletterSection />}

          {activeTab === "statistiques" && <StatistiquesSection />}

          {activeTab === "settings" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
                <div>
                  <h2 style={{ fontSize: "24px", fontWeight: 900, color: C.teal, marginBottom: "8px" }}>L'équipe d'encadrants</h2>
                  <p style={{ color: C.gray, fontSize: "14px" }}>Gérez les membres affichés sur la page "Qui sommes-nous".</p>
                </div>
                <button onClick={() => setAnimEnEdition("nouveau")} style={{ background: C.yellow, color: C.teal, border: "none", padding: "12px 24px", borderRadius: "12px", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
                  + Ajouter un membre
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "24px" }}>
                {animateurs?.map(anim => (
                  <div key={anim.id} style={{ background: C.white, borderRadius: "24px", padding: "24px", boxShadow: "0 4px 16px rgba(17,76,90,0.04)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative" }}>
                    
                    <div style={{ position: "absolute", top: "16px", right: "16px", display: "flex", gap: "8px" }}>
                      <button onClick={() => setAnimEnEdition(anim)} style={{ background: C.arctic, border: "none", width: "32px", height: "32px", borderRadius: "8px", cursor: "pointer", color: C.teal, display: "flex", alignItems: "center", justifyContent: "center" }}><Edit size={14}/></button>
                      <button onClick={async () => { if(window.confirm("Supprimer ce membre ?")) await supprimerAnimateur(anim.id); }} style={{ background: "#fef2f2", border: "none", width: "32px", height: "32px", borderRadius: "8px", cursor: "pointer", color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={14}/></button>
                    </div>

                    <div style={{ width: "90px", height: "90px", borderRadius: "50%", background: C.arctic, overflow: "hidden", marginBottom: "16px" }}>
                      {anim.imageUrl ? <img src={anim.imageUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <Users size={32} color={C.gray} style={{ marginTop: "28px" }}/>}
                    </div>
                    <h3 style={{ fontSize: "16px", fontWeight: 800, color: C.teal, marginBottom: "4px" }}>{anim.nom}</h3>
                    <p style={{ fontSize: "12px", fontWeight: 700, color: C.saffron, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>{anim.role}</p>
                    <p style={{ fontSize: "13px", color: C.gray, lineHeight: 1.6 }}>{anim.bio}</p>
                  </div>
                ))}
                
                {(!animateurs || animateurs.length === 0) && (
                  <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px 0", color: C.gray }}>
                    <Users size={40} style={{ opacity: 0.2, marginBottom: "16px", margin: "0 auto" }} />
                    <p>Aucun membre dans l'équipe pour le moment.</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
        </div>
      </div>

      {sejourEnEdition && <ModalSejour sejourData={sejourEnEdition} setSejourEnEdition={setSejourEnEdition} isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting} />}
      {animEnEdition && <ModalAnimateur data={animEnEdition} setEdition={setAnimEnEdition} isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting} />}
      {albumEnEdition && <ModalAlbum albumData={albumEnEdition} setAlbumEnEdition={setAlbumEnEdition} sejours={sejours} isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting} />}
      {sejourInscritsEnView && <ModalInscrits sejour={sejourInscritsEnView} inscriptions={inscriptions} onClose={() => setSejourInscritsEnView(null)} onChangerStatut={handleChangerStatutInscription} onDelete={handleDeleteInscription} />}
      {ficheEnfant && <ModalFicheEnfant enfant={ficheEnfant} onClose={() => setFicheEnfantId(null)} onDelete={handleDeleteEnfant} />}
    </AdminLayout>
  );
}