"use client";

import React, { useState } from "react";
import { 
  LayoutDashboard, Users, FileText, CheckSquare, History, 
  AlertCircle, Gift, CheckCircle2, Clock, XCircle, UploadCloud, 
  Calendar, Sparkles, Plus, ChevronRight
} from "lucide-react";

export default function EspaceFamilleClient({ 
  userName = "Parent", 
  fidelite = { sejoursEffectues: 3, objectif: 5, recompense: "Bon de réduction de -5%" }, 
  notifications = [{ id: 1, type: "urgence", message: "Il manque l'attestation d'assurance civile." }], 
  sejoursAVenir = [
    { id: 1, titre: "Séjour Montagne Hiver", enfant: "Léo", dates: "10 Fév - 17 Fév 2027", statut: "Confirmé", isValide: true },
    { id: 2, titre: "Stage Surf Été", enfant: "Emma", dates: "15 Juil - 22 Juil 2027", statut: "En attente de documents", isValide: false }
  ], 
  documents = [
    { id: 1, nom: "Fiche Sanitaire de liaison", concerne: "Léo", statut: "Validé", etat: "success" },
    { id: 2, nom: "Brevet de natation (50m)", concerne: "Emma", statut: "En cours d'analyse", etat: "warning" },
    { id: 3, nom: "Attestation d'assurance civile", concerne: "Famille", statut: "À fournir", etat: "error" }
  ]
}) {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Pour la simulation du trousseau interactif
  const [checklist, setChecklist] = useState({
    chaussettes: true,
    creme: false,
    gourde: false,
  });

  const pourcentageFidelite = Math.min((fidelite.sejoursEffectues / fidelite.objectif) * 100, 100);

  const handleUploadClick = (docNom) => {
    alert(`Ouverture de la fenêtre d'upload pour : ${docNom}`);
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
      
      {/* MENU LATÉRAL (Sidebar) */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-6 flex-shrink-0 md:min-h-screen sticky top-0">
        <h2 className="text-xl font-black text-[#114C5A] mb-8 hidden md:block">Mon Espace</h2>
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

      {/* CONTENU PRINCIPAL */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full max-w-5xl mx-auto">
        
        {/* =========================================
            ONGLET 1 : TABLEAU DE BORD
        ========================================= */}
        {activeTab === "dashboard" && (
          <div className="animate-in fade-in duration-500 space-y-8">
            <header className="pb-6 border-b border-slate-200 flex justify-between items-end">
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-slate-900">Bonjour, {userName} 👋</h1>
                <p className="text-slate-500 mt-2 font-medium">Voici un résumé de vos démarches en cours.</p>
              </div>
              <button className="hidden md:flex items-center gap-2 bg-[#FF9932] hover:bg-[#e68a2d] text-white px-5 py-2.5 rounded-full font-bold transition-colors shadow-sm">
                <Plus size={20} /> Nouvelle Inscription
              </button>
            </header>

            {/* NOTIFICATIONS */}
            {notifications.length > 0 && (
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div key={notif.id} className="flex items-start gap-3 bg-red-50 border-l-4 border-red-500 p-4 rounded-xl shadow-sm">
                    <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
                    <p className="text-red-800 font-medium">
                      <strong className="font-bold">Action requise :</strong> {notif.message}
                    </p>
                    <button onClick={() => setActiveTab("documents")} className="ml-auto text-sm bg-white text-red-600 px-3 py-1 rounded-lg border border-red-200 hover:bg-red-50 font-bold transition">
                      Voir les documents
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* JAUGE DE FIDÉLITÉ */}
            <section className="bg-gradient-to-br from-[#114C5A] to-[#0a3039] rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
              <Sparkles className="absolute top-4 right-4 text-white/10" size={100} />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[#FFC801] p-2.5 rounded-full shadow-lg shadow-yellow-500/20">
                    <Gift className="text-[#114C5A]" size={24} />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white">Votre fidélité récompensée</h2>
                </div>
                
                <p className="text-slate-200 mb-8 max-w-2xl font-medium">
                  Plus que <strong className="text-white text-lg">{fidelite.objectif - fidelite.sejoursEffectues} séjour(s)</strong> pour débloquer votre <span className="text-[#FFC801]">{fidelite.recompense}</span> !
                </p>

                <div className="relative pt-1 max-w-3xl">
                  <div className="flex mb-3 items-center justify-between text-sm font-bold text-slate-200">
                    <span>{fidelite.sejoursEffectues} séjour(s) réalisé(s)</span>
                    <span>Objectif : {fidelite.objectif}</span>
                  </div>
                  <div className="overflow-hidden h-4 text-xs flex rounded-full bg-slate-800/50 border border-white/10 shadow-inner">
                    <div style={{ width: `${pourcentageFidelite}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#FFC801] transition-all duration-1000 ease-out relative">
                      <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-transparent to-white/40"></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SÉJOURS À VENIR */}
            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Calendar className="text-[#FF9932]" size={24} /> Mes séjours inscrits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sejoursAVenir.map((sejour) => (
                  <div key={sejour.id} className={`bg-white p-6 rounded-2xl shadow-sm border-t-4 transition-all hover:shadow-md ${sejour.isValide ? "border-[#27ae60]" : "border-[#FF9932]"}`}>
                    <h3 className="text-lg font-black text-slate-900 mb-4">{sejour.titre}</h3>
                    <div className="space-y-3 text-sm text-slate-600 mb-6 bg-slate-50 p-4 rounded-xl">
                      <p className="flex justify-between"><strong className="text-slate-800">Enfant :</strong> <span>{sejour.enfant}</span></p>
                      <p className="flex justify-between"><strong className="text-slate-800">Dates :</strong> <span>{sejour.dates}</span></p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${sejour.isValide ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-700"}`}>
                        {sejour.isValide ? <CheckCircle2 size={14} /> : <Clock size={14} />} {sejour.statut}
                      </span>
                      <button className="text-sm font-bold text-[#114C5A] hover:text-[#FF9932] flex items-center gap-1">Détails <ChevronRight size={16}/></button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* =========================================
            ONGLET 2 : MES ENFANTS
        ========================================= */}
        {activeTab === "enfants" && (
          <div className="animate-in fade-in duration-500 space-y-8">
            <header className="pb-6 border-b border-slate-200 flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-black text-slate-900">Mes Enfants</h1>
                <p className="text-slate-500 mt-2 font-medium">Gérez ici les informations médicales et les tailles (ski/surf).</p>
              </div>
              <button className="flex items-center gap-2 bg-[#114C5A] hover:bg-[#0d323c] text-white px-4 py-2 rounded-full font-bold transition-colors">
                <Plus size={18} /> Ajouter un enfant
              </button>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Carte Enfant 1 */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex items-center gap-6">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-black text-2xl">L</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900">Léo</h3>
                  <p className="text-sm text-slate-500">Né le 12/04/2012 (14 ans)</p>
                  <button className="mt-3 text-sm font-bold text-[#FF9932] hover:underline">Mettre à jour le profil</button>
                </div>
              </div>
              {/* Carte Enfant 2 */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex items-center gap-6">
                <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center font-black text-2xl">E</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900">Emma</h3>
                  <p className="text-sm text-slate-500">Née le 05/08/2015 (11 ans)</p>
                  <button className="mt-3 text-sm font-bold text-[#FF9932] hover:underline">Mettre à jour le profil</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================
            ONGLET 3 : MES DOCUMENTS
        ========================================= */}
        {activeTab === "documents" && (
          <div className="animate-in fade-in duration-500 space-y-8">
            <header className="pb-6 border-b border-slate-200">
              <h1 className="text-3xl font-black text-slate-900">Mes Documents</h1>
              <p className="text-slate-500 mt-2 font-medium">Déposez ici les justificatifs demandés pour valider vos séjours.</p>
            </header>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-xs tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Document</th>
                      <th className="px-6 py-4">Concerne</th>
                      <th className="px-6 py-4">Statut</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {documents.map((doc) => (
                      <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-5 font-bold text-slate-900 flex items-center gap-3">
                          <FileText size={18} className="text-slate-400" /> {doc.nom}
                        </td>
                        <td className="px-6 py-5 text-slate-600 font-medium">{doc.concerne}</td>
                        <td className="px-6 py-5">
                          {doc.etat === "success" && <span className="flex items-center gap-1.5 text-green-600 font-bold"><CheckCircle2 size={16} /> {doc.statut}</span>}
                          {doc.etat === "warning" && <span className="flex items-center gap-1.5 text-orange-500 font-bold"><Clock size={16} /> {doc.statut}</span>}
                          {doc.etat === "error" && <span className="flex items-center gap-1.5 text-red-600 font-bold bg-red-50 px-2 py-1 rounded-lg w-fit"><XCircle size={16} /> {doc.statut}</span>}
                        </td>
                        <td className="px-6 py-5 text-right">
                          {doc.etat === "error" ? (
                            <button onClick={() => handleUploadClick(doc.nom)} className="inline-flex items-center gap-2 bg-[#114C5A] hover:bg-[#0d323c] text-white px-4 py-2 rounded-lg font-bold transition-colors shadow-sm">
                              <UploadCloud size={16} /> Fournir
                            </button>
                          ) : (
                            <span className="text-slate-300 italic">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =========================================
            ONGLET 4 : TROUSSEAU (Checklist)
        ========================================= */}
        {activeTab === "trousseau" && (
          <div className="animate-in fade-in duration-500 space-y-8">
            <header className="pb-6 border-b border-slate-200">
              <h1 className="text-3xl font-black text-slate-900">Valise & Trousseau</h1>
              <p className="text-slate-500 mt-2 font-medium">Pour ne rien oublier avant le grand départ.</p>
            </header>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-bold text-[#114C5A] mb-6 flex items-center gap-2">
                <CheckSquare size={24} /> Pour le "Séjour Montagne Hiver" de Léo
              </h3>
              
              <div className="space-y-4">
                <label className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition">
                  <input type="checkbox" className="w-5 h-5 accent-[#FF9932]" checked={checklist.chaussettes} onChange={(e) => setChecklist({...checklist, chaussettes: e.target.checked})} />
                  <span className={`font-medium ${checklist.chaussettes ? 'text-slate-400 line-through' : 'text-slate-800'}`}>3 paires de grosses chaussettes de ski</span>
                </label>
                <label className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition">
                  <input type="checkbox" className="w-5 h-5 accent-[#FF9932]" checked={checklist.creme} onChange={(e) => setChecklist({...checklist, creme: e.target.checked})} />
                  <span className={`font-medium ${checklist.creme ? 'text-slate-400 line-through' : 'text-slate-800'}`}>Crème solaire écran total & Stick à lèvres</span>
                </label>
                <label className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition">
                  <input type="checkbox" className="w-5 h-5 accent-[#FF9932]" checked={checklist.gourde} onChange={(e) => setChecklist({...checklist, gourde: e.target.checked})} />
                  <span className={`font-medium ${checklist.gourde ? 'text-slate-400 line-through' : 'text-slate-800'}`}>1 Gourde isotherme marquée au prénom de l'enfant</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* =========================================
            ONGLET 5 : HISTORIQUE
        ========================================= */}
        {activeTab === "historique" && (
          <div className="animate-in fade-in duration-500 space-y-8">
            <header className="pb-6 border-b border-slate-200">
              <h1 className="text-3xl font-black text-slate-900">Historique des séjours</h1>
              <p className="text-slate-500 mt-2 font-medium">Retrouvez les factures et attestations des années précédentes.</p>
            </header>
            
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
              <History size={48} className="text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-800">Aucun séjour passé</h3>
              <p className="text-slate-500 mt-2">L'historique s'affichera ici une fois vos premiers séjours terminés.</p>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}