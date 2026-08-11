"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { uploaderDocument } from "@/app/actions/documents";

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
function SejourDocumentsModal({ sejour, enfants, onClose, onUpload, uploadingDocId }) {
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
      </div>
    </div>
  );
}

export default function EspaceFamilleClient({
  userName = "Parent",
  notifications = [],
  sejoursAVenir = [],
  documents = [],
  enfants = [],
}) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [uploadingDocId, setUploadingDocId] = useState(null);
  const [sejourEnConsultation, setSejourEnConsultation] = useState(null);

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

            {/* UPCOMING TRIPS */}
            {sejoursAVenir.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Calendar className="text-[#FF9932]" size={24} /> Mes séjours
                  inscrits
                </h2>
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
              </section>
            )}
          </div>
        )}

        {/* MES ENFANTS */}
        {activeTab === "enfants" && (
          <div className="animate-in fade-in duration-500 space-y-8">
            <header className="pb-6 border-b border-slate-200">
              <h1 className="text-3xl font-black text-slate-900">Mes Enfants</h1>
              <p className="text-slate-500 mt-2 font-medium">
                Voici la liste de vos enfants inscrits.
              </p>
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
                  const colors = ["bg-blue-100 text-blue-600", "bg-pink-100 text-pink-600", "bg-green-100 text-green-600", "bg-purple-100 text-purple-600"];
                  const colorIdx = enfant.prenom?.charCodeAt(0) % colors.length;

                  return (
                    <div
                      key={enfant.id}
                      className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-16 h-16 ${colors[colorIdx] || colors[0]} rounded-full flex items-center justify-center font-black text-2xl`}>
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
        />
      )}
    </div>
  );
}
