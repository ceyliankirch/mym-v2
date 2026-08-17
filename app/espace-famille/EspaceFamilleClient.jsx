"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  FileText,
  CheckSquare,
  History,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
  UploadCloud,
  Calendar,
  ChevronRight,
  Download,
  Loader,
  X,
  Trash2,
  Compass,
  Sparkles,
  MapPin,
  Plus,
  UserCog,
} from "lucide-react";
import { uploaderDocument } from "@/app/actions/documents";
import { supprimerInscriptionFamille, modifierEnfant, supprimerEnfant, creerEnfant, modifierClient } from "@/app/actions/inscriptions";
import { CATALOGUE_DOCUMENTS } from "@/lib/documents";

const C = {
  teal: "#114C5A",
  yellow: "#FFC801",
  saffron: "#FF9932",
  white: "#ffffff",
  gray: "#8aaa",
  lightGray: "#e2e8f0",
};

/* ─── MODALE : DOCUMENTS D'UN SÉJOUR ────────────────────────────────
   Ouverte en cliquant sur un séjour inscrit : reprend les documents déjà
   enregistrés en base pour l'enfant, et permet d'importer ceux qui manquent. */
function SejourDocumentsModal({ sejour, enfants, onClose, onUpload, uploadingDocId, onDeleteInscription, isDeleting }) {
  const enfantRecord = enfants.find((e) => e.id === sejour.enfantId);
  const documentsRequis = sejour.documentsRequis || [];

  const statusConfig = {
    VALIDE: { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", label: "Déjà en base — validé", icon: CheckCircle2 },
    EN_COURS: { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700", label: "Déjà en base — en vérification", icon: Clock },
    MANQUANT: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", label: "À importer", icon: XCircle },
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
      >
        <div className="flex items-start justify-between p-6 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-black text-slate-900">{sejour.titre}</h2>
            <p className="text-sm text-slate-500 mt-1">
              Documents pour <strong>{sejour.enfant}</strong>
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {documentsRequis.length === 0 ? (
            <p className="text-slate-500 font-medium text-center py-6">
              Aucun document requis pour ce séjour.
            </p>
          ) : (
            documentsRequis.map((docType) => {
              const existing = enfantRecord?.documents?.find((d) => d.type === docType);
              const statut = existing?.statut || "MANQUANT";
              const cfg = statusConfig[statut];
              const Icon = cfg.icon;

              return (
                <div
                  key={docType}
                  className={`${cfg.bg} border ${cfg.border} rounded-xl p-4 flex items-center justify-between gap-4`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cfg.text} size={20} />
                    <div>
                      <p className={`font-bold ${cfg.text}`}>{docType}</p>
                      <p className={`text-xs ${cfg.text} opacity-75`}>{cfg.label}</p>
                    </div>
                  </div>

                  {enfantRecord && statut !== "VALIDE" && (
                    <label className="cursor-pointer shrink-0">
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => onUpload(enfantRecord.id, docType, e)}
                        disabled={uploadingDocId === docType}
                      />
                      <div className="flex items-center gap-2 bg-white text-teal px-3 py-2 rounded-lg font-bold text-sm hover:bg-slate-100 transition border border-slate-200">
                        {uploadingDocId === docType ? (
                          <Loader size={16} className="animate-spin" />
                        ) : (
                          <UploadCloud size={16} />
                        )}
                        Importer
                      </div>
                    </label>
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="p-6 border-t border-slate-200">
          <button
            onClick={() => onDeleteInscription(sejour)}
            disabled={isDeleting}
            className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg font-bold text-sm transition disabled:opacity-50"
          >
            {isDeleting ? <Loader size={16} className="animate-spin" /> : <Trash2 size={16} />}
            Annuler cette inscription
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── MODALE : FICHE ENFANT (édition + documents + suppression) ────
   Ouverte en cliquant sur un enfant dans l'onglet "Mes Enfants". Permet de
   modifier ses informations, d'associer des documents pour les prochains
   séjours (indépendamment de toute inscription), et de le supprimer. */
function EnfantModal({ enfant, clientId, onClose, onUpload, uploadingDocId }) {
  const [form, setForm] = useState({
    prenom: enfant.prenom || "",
    nom: enfant.nom || "",
    dateNaissance: enfant.dateNaissance ? new Date(enfant.dateNaissance).toISOString().slice(0, 10) : "",
    sexe: enfant.sexe || "",
    taille: enfant.taille || "",
    poids: enfant.poids || "",
    pointure: enfant.pointure || "",
    allergies: enfant.allergies || "",
    informationsComplementaires: enfant.informationsComplementaires || "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const statusConfig = {
    VALIDE: { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", label: "Validé", icon: CheckCircle2 },
    EN_COURS: { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700", label: "En vérification", icon: Clock },
    MANQUANT: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", label: "À importer", icon: XCircle },
  };

  const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const result = await modifierEnfant(enfant.id, clientId, form);
      if (result.error) {
        alert(`Erreur: ${result.error}`);
      } else {
        window.location.reload();
      }
    } catch (error) {
      alert("Erreur lors de l'enregistrement");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Supprimer définitivement la fiche de ${enfant.prenom} ${enfant.nom} ?`)) return;

    setIsDeleting(true);
    try {
      const result = await supprimerEnfant(enfant.id, clientId);
      if (result.error) {
        alert(`Erreur: ${result.error}`);
      } else {
        onClose();
        window.location.reload();
      }
    } catch (error) {
      alert("Erreur lors de la suppression");
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const inputClass = "w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#114C5A]/20 focus:border-[#114C5A]";
  const labelClass = "block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5";

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
      >
        <div className="flex items-start justify-between p-6 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-black text-slate-900">{enfant.prenom} {enfant.nom}</h2>
            <p className="text-sm text-slate-500 mt-1">Modifier la fiche et gérer les documents</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* INFOS */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Prénom</label>
              <input className={inputClass} value={form.prenom} onChange={(e) => handleChange("prenom", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Nom</label>
              <input className={inputClass} value={form.nom} onChange={(e) => handleChange("nom", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Date de naissance</label>
              <input type="date" className={inputClass} value={form.dateNaissance} onChange={(e) => handleChange("dateNaissance", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Sexe</label>
              <select className={inputClass} value={form.sexe} onChange={(e) => handleChange("sexe", e.target.value)}>
                <option value="">--</option>
                <option value="M">Garçon</option>
                <option value="F">Fille</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Taille (cm)</label>
              <input type="number" min="0" className={inputClass} value={form.taille} onChange={(e) => handleChange("taille", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Poids (kg)</label>
              <input type="number" min="0" className={inputClass} value={form.poids} onChange={(e) => handleChange("poids", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Pointure</label>
              <input type="number" min="0" className={inputClass} value={form.pointure} onChange={(e) => handleChange("pointure", e.target.value)} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Allergies ou intolérances</label>
            <textarea rows="2" className={inputClass} value={form.allergies} onChange={(e) => handleChange("allergies", e.target.value)} placeholder="ex: Allergie aux arachides..." />
          </div>
          <div>
            <label className={labelClass}>Informations complémentaires</label>
            <textarea rows="2" className={inputClass} value={form.informationsComplementaires} onChange={(e) => handleChange("informationsComplementaires", e.target.value)} placeholder="Toute information utile à l'équipe encadrante..." />
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full bg-[#114C5A] text-white font-bold py-3 rounded-xl hover:bg-[#0d3844] transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSaving ? <Loader size={16} className="animate-spin" /> : null}
            Enregistrer les modifications
          </button>

          {/* DOCUMENTS (indépendants de tout séjour, pour les prochaines inscriptions) */}
          <div className="border-t border-slate-200 pt-5">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
              Documents pour les prochains séjours
            </p>
            <div className="space-y-3">
              {CATALOGUE_DOCUMENTS.map((docType) => {
                const existing = enfant.documents?.find((d) => d.type === docType);
                const statut = existing?.statut || "MANQUANT";
                const cfg = statusConfig[statut];
                const Icon = cfg.icon;

                return (
                  <div
                    key={docType}
                    className={`${cfg.bg} border ${cfg.border} rounded-xl p-4 flex items-center justify-between gap-4`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={cfg.text} size={20} />
                      <div>
                        <p className={`font-bold text-sm ${cfg.text}`}>{docType}</p>
                        <p className={`text-xs ${cfg.text} opacity-75`}>{cfg.label}</p>
                      </div>
                    </div>

                    {statut !== "VALIDE" && (
                      <label className="cursor-pointer shrink-0">
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => onUpload(enfant.id, docType, e)}
                          disabled={uploadingDocId === docType}
                        />
                        <div className="flex items-center gap-2 bg-white text-teal px-3 py-2 rounded-lg font-bold text-sm hover:bg-slate-100 transition border border-slate-200">
                          {uploadingDocId === docType ? (
                            <Loader size={16} className="animate-spin" />
                          ) : (
                            <UploadCloud size={16} />
                          )}
                          Importer
                        </div>
                      </label>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-200">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg font-bold text-sm transition disabled:opacity-50"
          >
            {isDeleting ? <Loader size={16} className="animate-spin" /> : <Trash2 size={16} />}
            Supprimer cet enfant
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── MODALE : AJOUTER UN ENFANT ────────────────────────────────────
   Créer un nouvel enfant indépendamment de toute inscription à un séjour. */
function AjouterEnfantModal({ clientId, onClose }) {
  const [form, setForm] = useState({
    prenom: "", nom: "", dateNaissance: "", sexe: "",
    taille: "", poids: "", pointure: "", allergies: "", informationsComplementaires: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    if (!form.prenom || !form.nom) {
      setError("Le prénom et le nom sont obligatoires");
      return;
    }
    setIsSaving(true);
    setError("");
    try {
      const result = await creerEnfant(clientId, form);
      if (result.error) {
        setError(result.error);
      } else {
        window.location.reload();
      }
    } catch (err) {
      setError("Erreur lors de la création");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass = "w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#114C5A]/20 focus:border-[#114C5A]";
  const labelClass = "block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5";

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
        <div className="flex items-start justify-between p-6 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-black text-slate-900">Ajouter un enfant</h2>
            <p className="text-sm text-slate-500 mt-1">Renseignez les informations de votre enfant</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-semibold rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Prénom *</label>
              <input className={inputClass} value={form.prenom} onChange={(e) => handleChange("prenom", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Nom *</label>
              <input className={inputClass} value={form.nom} onChange={(e) => handleChange("nom", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Date de naissance</label>
              <input type="date" className={inputClass} value={form.dateNaissance} onChange={(e) => handleChange("dateNaissance", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Sexe</label>
              <select className={inputClass} value={form.sexe} onChange={(e) => handleChange("sexe", e.target.value)}>
                <option value="">--</option>
                <option value="M">Garçon</option>
                <option value="F">Fille</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Taille (cm)</label>
              <input type="number" min="0" className={inputClass} value={form.taille} onChange={(e) => handleChange("taille", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Poids (kg)</label>
              <input type="number" min="0" className={inputClass} value={form.poids} onChange={(e) => handleChange("poids", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Pointure</label>
              <input type="number" min="0" className={inputClass} value={form.pointure} onChange={(e) => handleChange("pointure", e.target.value)} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Allergies ou intolérances</label>
            <textarea rows="2" className={inputClass} value={form.allergies} onChange={(e) => handleChange("allergies", e.target.value)} placeholder="ex: Allergie aux arachides..." />
          </div>
          <div>
            <label className={labelClass}>Informations complémentaires</label>
            <textarea rows="2" className={inputClass} value={form.informationsComplementaires} onChange={(e) => handleChange("informationsComplementaires", e.target.value)} placeholder="Toute information utile à l'équipe encadrante..." />
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full bg-[#114C5A] text-white font-bold py-3 rounded-xl hover:bg-[#0d3844] transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSaving ? <Loader size={16} className="animate-spin" /> : <Plus size={16} />}
            Ajouter cet enfant
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── MODALE : REPRÉSENTANT LÉGAL ────────────────────────────────────
   Modifier les informations du client (le parent/représentant légal). */
function ModifierClientModal({ client, onClose }) {
  const [form, setForm] = useState({
    prenom: client?.prenom || "",
    nom: client?.nom || "",
    email: client?.email || "",
    telephone: client?.telephone || "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setIsSaving(true);
    setError("");
    try {
      const result = await modifierClient(client.id, form);
      if (result.error) {
        setError(result.error);
      } else {
        window.location.reload();
      }
    } catch (err) {
      setError("Erreur lors de l'enregistrement");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass = "w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#114C5A]/20 focus:border-[#114C5A]";
  const labelClass = "block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5";

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-start justify-between p-6 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-black text-slate-900">Représentant légal</h2>
            <p className="text-sm text-slate-500 mt-1">Vos informations personnelles</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-semibold rounded-xl px-4 py-3">
              {error}
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Prénom</label>
              <input className={inputClass} value={form.prenom} onChange={(e) => handleChange("prenom", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Nom</label>
              <input className={inputClass} value={form.nom} onChange={(e) => handleChange("nom", e.target.value)} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input type="email" className={inputClass} value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Téléphone</label>
            <input type="tel" className={inputClass} value={form.telephone} onChange={(e) => handleChange("telephone", e.target.value)} />
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full bg-[#114C5A] text-white font-bold py-3 rounded-xl hover:bg-[#0d3844] transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSaving ? <Loader size={16} className="animate-spin" /> : null}
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EspaceFamilleClient({
  userName = "Parent",
  client = null,
  notifications = [],
  sejoursAVenir = [],
  sejoursCatalogue = [],
  documents = [],
  enfants = [],
}) {
  const clientId = client?.id;
  const [activeTab, setActiveTab] = useState("dashboard");
  const [uploadingDocId, setUploadingDocId] = useState(null);
  const [showAjouterEnfant, setShowAjouterEnfant] = useState(false);
  const [showModifierClient, setShowModifierClient] = useState(false);
  const [sejourEnConsultation, setSejourEnConsultation] = useState(null);
  const [enfantEnConsultation, setEnfantEnConsultation] = useState(null);
  const [isDeletingInscription, setIsDeletingInscription] = useState(false);

  const handleDeleteInscription = async (sejour) => {
    if (!window.confirm(`Annuler l'inscription de ${sejour.enfant} au séjour "${sejour.titre}" ?`)) return;

    setIsDeletingInscription(true);
    try {
      const result = await supprimerInscriptionFamille(sejour.id, sejour.clientId);
      if (result.error) {
        alert(`Erreur: ${result.error}`);
      } else {
        setSejourEnConsultation(null);
        window.location.reload();
      }
    } catch (error) {
      alert("Erreur lors de la suppression");
      console.error(error);
    } finally {
      setIsDeletingInscription(false);
    }
  };

  const handleUploadClick = async (enfantId, docType, event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingDocId(docType);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await uploaderDocument(enfantId, docType, file);
      if (result.error) {
        alert(`Erreur: ${result.error}`);
      } else {
        alert("Document uploadé avec succès!");
        window.location.reload();
      }
    } catch (error) {
      alert("Erreur lors de l'upload");
      console.error(error);
    } finally {
      setUploadingDocId(null);
    }
  };

  const tabs = [
    { id: "dashboard", label: "Tableau de bord", icon: LayoutDashboard },
    { id: "enfants", label: "Mes Enfants", icon: Users },
    { id: "documents", label: "Mes Documents", icon: FileText },
    { id: "trousseau", label: "Valise & Trousseau", icon: CheckSquare },
    { id: "historique", label: "Historique & Factures", icon: History },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col md:flex-row">
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-6 flex-shrink-0 md:min-h-screen sticky top-0">
        <h2 className="text-xl font-black text-[#114C5A] mb-8 hidden md:block">
          Mon Espace
        </h2>
        <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-[#114C5A] text-white shadow-md"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon size={20} />
                <span className="hidden md:inline">{tab.label}</span>
                <span className="md:hidden text-sm">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full max-w-5xl mx-auto">
        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="animate-in fade-in duration-500 space-y-8">
            <header className="pb-6 border-b border-slate-200">
              <h1 className="text-3xl md:text-4xl font-black text-slate-900">
                Bonjour, {userName} 👋
              </h1>
              <p className="text-slate-500 mt-2 font-medium">
                Voici un résumé de vos démarches en cours.
              </p>
            </header>

            {/* MESSAGE D'ACCUEIL */}
            <div className="bg-gradient-to-r from-[#114C5A] to-[#0d3844] rounded-2xl p-6 md:p-8 flex items-center gap-5 shadow-sm">
              <div className="hidden sm:flex w-14 h-14 rounded-xl bg-white/10 items-center justify-center shrink-0">
                <Compass className="text-[#FFC801]" size={28} />
              </div>
              <div>
                <h2 className="text-white text-lg md:text-xl font-black">
                  Envie de partir à l'aventure ?
                </h2>
                <p className="text-white/70 font-medium mt-1">
                  Trouvez le séjour parfait pour votre enfant parmi nos prochains départs.
                </p>
              </div>
            </div>

            {/* NOTIFICATIONS */}
            {notifications.length > 0 && (
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="flex items-start gap-3 bg-red-50 border-l-4 border-red-500 p-4 rounded-xl shadow-sm"
                  >
                    <AlertCircle
                      className="text-red-500 shrink-0 mt-0.5"
                      size={20}
                    />
                    <p className="text-red-800 font-medium">
                      <strong className="font-bold">Action requise :</strong>{" "}
                      {notif.message}
                    </p>
                    <button
                      onClick={() => setActiveTab("documents")}
                      className="ml-auto text-sm bg-white text-red-600 px-3 py-1 rounded-lg border border-red-200 hover:bg-red-50 font-bold transition"
                    >
                      Voir les documents
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* MES SÉJOURS INSCRITS */}
            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Calendar className="text-[#FF9932]" size={24} /> Mes séjours
                inscrits
              </h2>

              {sejoursAVenir.length === 0 ? (
                <div className="bg-slate-100 rounded-2xl p-8 text-center flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Sparkles className="text-[#FF9932]" size={26} />
                  </div>
                  <p className="text-slate-600 font-bold">
                    Pas de séjour de prévu... mais ce n'est pas trop tard !
                  </p>
                  <p className="text-slate-500 text-sm">
                    Jetez un œil à nos prochains séjours juste en dessous.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sejoursAVenir.map((sejour) => (
                    <div
                      key={sejour.id}
                      onClick={() => setSejourEnConsultation(sejour)}
                      className={`bg-white p-6 rounded-2xl shadow-sm border-t-4 transition-all hover:shadow-md cursor-pointer ${
                        sejour.isValide
                          ? "border-[#27ae60]"
                          : "border-[#FF9932]"
                      }`}
                    >
                      <h3 className="text-lg font-black text-slate-900 mb-4">
                        {sejour.titre}
                      </h3>
                      <div className="space-y-3 text-sm text-slate-600 mb-6 bg-slate-50 p-4 rounded-xl">
                        <p className="flex justify-between">
                          <strong className="text-slate-800">Enfant :</strong>{" "}
                          <span>{sejour.enfant}</span>
                        </p>
                        <p className="flex justify-between">
                          <strong className="text-slate-800">Dates :</strong>{" "}
                          <span>{sejour.dates}</span>
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${
                            sejour.isValide
                              ? "bg-green-50 text-green-700"
                              : "bg-orange-50 text-orange-700"
                          }`}
                        >
                          {sejour.isValide ? (
                            <CheckCircle2 size={14} />
                          ) : (
                            <Clock size={14} />
                          )}{" "}
                          {sejour.statut}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* DÉCOUVREZ NOS SÉJOURS À VENIR */}
            {sejoursCatalogue.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Compass className="text-[#114C5A]" size={24} /> Découvrez nos
                  séjours à venir
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {sejoursCatalogue.map((sejour) => (
                    <Link
                      key={sejour.id}
                      href={`/sejours-enfants-ados/${sejour.id}`}
                      className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all"
                    >
                      <div className="relative w-full h-36 bg-slate-100 overflow-hidden">
                        {sejour.imageUrl ? (
                          <img
                            src={sejour.imageUrl}
                            alt={sejour.titre}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Compass className="text-slate-300" size={32} />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-black text-slate-900 mb-1">
                          {sejour.titre}
                        </h3>
                        {sejour.lieu && (
                          <p className="text-sm text-slate-500 flex items-center gap-1 mb-2">
                            <MapPin size={14} /> {sejour.lieu}
                          </p>
                        )}
                        {sejour.dates && (
                          <p className="text-xs text-slate-500 mb-3">{sejour.dates}</p>
                        )}
                        <span className="inline-flex items-center gap-1 text-sm font-bold text-[#114C5A] group-hover:gap-2 transition-all">
                          Découvrir <ChevronRight size={16} />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* MES ENFANTS */}
        {activeTab === "enfants" && (
          <div className="animate-in fade-in duration-500 space-y-8">
            <header className="pb-6 border-b border-slate-200 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black text-slate-900">Mes Enfants</h1>
                <p className="text-slate-500 mt-2 font-medium">
                  Voici la liste de vos enfants inscrits.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setShowModifierClient(true)}
                  className="flex items-center gap-2 bg-white border border-slate-200 text-[#114C5A] px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-50 transition"
                >
                  <UserCog size={16} /> Représentant légal
                </button>
                <button
                  onClick={() => setShowAjouterEnfant(true)}
                  className="flex items-center gap-2 bg-[#114C5A] text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-[#0d3844] transition"
                >
                  <Plus size={16} /> Ajouter un enfant
                </button>
              </div>
            </header>

            {enfants.length === 0 ? (
              <div className="bg-slate-100 rounded-2xl p-8 text-center">
                <p className="text-slate-600 font-medium">
                  Aucun enfant enregistré pour le moment.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enfants.map((enfant) => {
                  const initials = (enfant.prenom?.[0] || "") + (enfant.nom?.[0] || "");
                  const avatarColor =
                    enfant.sexe === "M"
                      ? "bg-blue-100 text-blue-600"
                      : enfant.sexe === "F"
                      ? "bg-pink-100 text-pink-600"
                      : "bg-slate-100 text-slate-500";

                  return (
                    <div
                      key={enfant.id}
                      onClick={() => setEnfantEnConsultation(enfant)}
                      className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm cursor-pointer hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-16 h-16 ${avatarColor} rounded-full flex items-center justify-center font-black text-2xl`}>
                          {initials}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-slate-900">
                            {enfant.prenom} {enfant.nom}
                          </h3>
                          {enfant.dateNaissance && (
                            <p className="text-sm text-slate-500">
                              Né le{" "}
                              {new Date(enfant.dateNaissance).toLocaleDateString(
                                "fr-FR"
                              )}
                            </p>
                          )}
                        </div>
                      </div>

                      {(enfant.taille || enfant.poids || enfant.pointure) && (
                        <div className="flex gap-2 mb-4">
                          {enfant.taille && (
                            <span className="bg-slate-50 text-slate-600 text-xs font-bold px-3 py-1.5 rounded-lg">
                              {enfant.taille} cm
                            </span>
                          )}
                          {enfant.poids && (
                            <span className="bg-slate-50 text-slate-600 text-xs font-bold px-3 py-1.5 rounded-lg">
                              {enfant.poids} kg
                            </span>
                          )}
                          {enfant.pointure && (
                            <span className="bg-slate-50 text-slate-600 text-xs font-bold px-3 py-1.5 rounded-lg">
                              Pointure {enfant.pointure}
                            </span>
                          )}
                        </div>
                      )}

                      {enfant.allergies && (
                        <div className="bg-red-50 border border-red-100 rounded-xl p-3 mb-3">
                          <p className="text-xs font-bold text-red-700 uppercase tracking-wide mb-1">
                            Allergies / intolérances
                          </p>
                          <p className="text-sm text-red-700">{enfant.allergies}</p>
                        </div>
                      )}

                      {enfant.informationsComplementaires && (
                        <div className="bg-slate-50 rounded-xl p-3 mb-3">
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                            Informations complémentaires
                          </p>
                          <p className="text-sm text-slate-600">{enfant.informationsComplementaires}</p>
                        </div>
                      )}

                      <div className="text-sm text-slate-600">
                        <p>
                          <strong>{enfant.inscriptions?.length || 0}</strong> inscription(s)
                        </p>
                        <p>
                          <strong>
                            {enfant.documents?.filter((d) => d.statut === "VALIDE").length || 0}/
                            {enfant.documents?.length || 0}
                          </strong>{" "}
                          documents validés
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* MES DOCUMENTS */}
        {activeTab === "documents" && (
          <div className="animate-in fade-in duration-500 space-y-8">
            <header className="pb-6 border-b border-slate-200">
              <h1 className="text-3xl font-black text-slate-900">
                Mes Documents
              </h1>
              <p className="text-slate-500 mt-2 font-medium">
                Téléchargez et gérez vos documents importants.
              </p>
            </header>

            {documents.length === 0 ? (
              <div className="bg-slate-100 rounded-2xl p-8 text-center">
                <p className="text-slate-600 font-medium">
                  Aucun document requis pour le moment.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {documents.map((doc) => {
                  const [enfantId, ...rest] = doc.concerne.split("(");
                  const enfantRecord = enfants.find((e) => `${e.prenom} ${e.nom}` === enfantId.trim());

                  const statusBadges = {
                    success: {
                      bg: "bg-green-50",
                      border: "border-green-200",
                      text: "text-green-700",
                      label: "Validé",
                    },
                    warning: {
                      bg: "bg-yellow-50",
                      border: "border-yellow-200",
                      text: "text-yellow-700",
                      label: "En cours",
                    },
                    error: {
                      bg: "bg-red-50",
                      border: "border-red-200",
                      text: "text-red-700",
                      label: "À fournir",
                    },
                  };

                  const badge = statusBadges[doc.etat];

                  return (
                    <div
                      key={doc.id}
                      className={`${badge.bg} border ${badge.border} rounded-2xl p-6 flex items-center justify-between gap-4`}
                    >
                      <div className="flex-1">
                        <h3 className={`font-bold text-lg ${badge.text}`}>
                          {doc.nom}
                        </h3>
                        <p className={`text-sm ${badge.text} opacity-75`}>
                          {doc.concerne}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${badge.text}`}
                        >
                          {doc.etat === "success" && <CheckCircle2 size={14} />}
                          {doc.etat === "warning" && <Clock size={14} />}
                          {doc.etat === "error" && <XCircle size={14} />}
                          {badge.label}
                        </span>

                        {doc.etat === "error" && enfantRecord && (
                          <label className="cursor-pointer">
                            <input
                              type="file"
                              className="hidden"
                              onChange={(e) =>
                                handleUploadClick(
                                  enfantRecord.id,
                                  doc.nom,
                                  e
                                )
                              }
                              disabled={uploadingDocId === doc.nom}
                            />
                            <div className="flex items-center gap-2 bg-white text-teal px-4 py-2 rounded-lg font-bold hover:bg-slate-100 transition cursor-pointer border border-slate-200">
                              {uploadingDocId === doc.nom ? (
                                <Loader size={18} className="animate-spin" />
                              ) : (
                                <UploadCloud size={18} />
                              )}
                              Uploader
                            </div>
                          </label>
                        )}

                        {doc.etat === "success" && (
                          <a
                            href="#"
                            className="flex items-center gap-2 bg-white text-teal px-4 py-2 rounded-lg font-bold hover:bg-slate-100 transition border border-slate-200"
                          >
                            <Download size={18} />
                            Télécharger
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* BAGAGES & TROUSSEAU */}
        {activeTab === "trousseau" && (
          <div className="animate-in fade-in duration-500 space-y-8">
            <header className="pb-6 border-b border-slate-200">
              <h1 className="text-3xl font-black text-slate-900">
                Valise & Trousseau
              </h1>
              <p className="text-slate-500 mt-2 font-medium">
                Préparez le trousseau de votre enfant avec notre checklist.
              </p>
            </header>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <p className="text-blue-700 font-medium">
                Cette fonctionnalité sera disponible prochainement.
              </p>
            </div>
          </div>
        )}

        {/* HISTORIQUE */}
        {activeTab === "historique" && (
          <div className="animate-in fade-in duration-500 space-y-8">
            <header className="pb-6 border-b border-slate-200">
              <h1 className="text-3xl font-black text-slate-900">
                Historique & Factures
              </h1>
              <p className="text-slate-500 mt-2 font-medium">
                Consultez vos précédents séjours et téléchargez vos factures.
              </p>
            </header>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <p className="text-blue-700 font-medium">
                Cette fonctionnalité sera disponible prochainement.
              </p>
            </div>
          </div>
        )}
      </main>

      {sejourEnConsultation && (
        <SejourDocumentsModal
          sejour={sejourEnConsultation}
          enfants={enfants}
          onClose={() => setSejourEnConsultation(null)}
          onUpload={handleUploadClick}
          uploadingDocId={uploadingDocId}
          onDeleteInscription={handleDeleteInscription}
          isDeleting={isDeletingInscription}
        />
      )}

      {enfantEnConsultation && (
        <EnfantModal
          enfant={enfantEnConsultation}
          clientId={clientId}
          onClose={() => setEnfantEnConsultation(null)}
          onUpload={handleUploadClick}
          uploadingDocId={uploadingDocId}
        />
      )}

      {showAjouterEnfant && (
        <AjouterEnfantModal
          clientId={clientId}
          onClose={() => setShowAjouterEnfant(false)}
        />
      )}

      {showModifierClient && (
        <ModifierClientModal
          client={client}
          onClose={() => setShowModifierClient(false)}
        />
      )}
    </div>
  );
}
