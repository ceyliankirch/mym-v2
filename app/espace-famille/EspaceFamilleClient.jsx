"use client";

import React from "react";
import { AlertCircle, Gift, CheckCircle2, Clock, XCircle, UploadCloud, FileText, Calendar, Sparkles } from "lucide-react";

// ⚡ ICI : Les données arrivent dynamiquement depuis la page serveur
export default function EspaceFamilleClient({ 
  userName, 
  fidelite, 
  notifications, 
  sejoursAVenir, 
  documents 
}) {
  
  const pourcentageFidelite = Math.min((fidelite.sejoursEffectues / fidelite.objectif) * 100, 100);

  const handleUploadClick = (docNom) => {
    alert(`Ouverture de la fenêtre d'upload pour : ${docNom}`);
    // Ici on mettra la vraie logique d'upload (S3, UploadThing, etc.)
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* En-tête */}
        <header className="pb-6 border-b border-slate-200">
          <h1 className="text-3xl font-bold text-slate-900">Bienvenue dans votre espace, {userName}</h1>
          <p className="text-slate-500 mt-2">Retrouvez ici le suivi de vos inscriptions et vos documents.</p>
        </header>

        {/* 1. BARRE DE NOTIFICATIONS */}
        {notifications.length > 0 && (
          <div className="space-y-3">
            {notifications.map((notif) => (
              <div key={notif.id} className="flex items-start gap-3 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm">
                <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
                <p className="text-red-800 font-medium text-sm md:text-base">
                  <strong className="font-bold">Action requise :</strong> {notif.message}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* 2. PROGRAMME DE FIDÉLITÉ */}
        <section className="bg-gradient-to-br from-[#114C5A] to-[#0a3039] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <Sparkles className="absolute top-4 right-4 text-white/10" size={80} />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#FFC801] p-2 rounded-full">
                <Gift className="text-[#114C5A]" size={24} />
              </div>
              <h2 className="text-xl font-bold text-white">Votre fidélité récompensée</h2>
            </div>
            
            <p className="text-slate-200 text-sm mb-6 max-w-2xl">
              Plus que <strong className="text-white">{fidelite.objectif - (fidelite.sejoursEffectues % fidelite.objectif)} séjour(s)</strong> pour débloquer votre {fidelite.recompense} !
            </p>

            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between text-xs font-semibold text-slate-200">
                <span>{fidelite.sejoursEffectues} séjour(s) réalisé(s) au total</span>
                <span>Palier en cours : {fidelite.objectif}</span>
              </div>
              <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-slate-800/50 border border-white/10">
                <div style={{ width: `${pourcentageFidelite}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#FFC801] transition-all duration-1000 ease-out relative">
                  <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-transparent to-white/30"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SÉJOURS À VENIR */}
        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Calendar className="text-[#FF9932]" size={24} />
            Mes séjours inscrits
          </h2>
          {sejoursAVenir.length === 0 ? (
            <p className="text-slate-500 italic bg-white p-6 rounded-xl border border-slate-200">Vous n'avez pas encore d'inscription en cours.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sejoursAVenir.map((sejour) => (
                <div key={sejour.id} className={`bg-white p-6 rounded-xl shadow-sm border-t-4 transition-all hover:shadow-md ${sejour.isValide ? "border-[#27ae60]" : "border-[#FF9932]"}`}>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{sejour.titre}</h3>
                  <div className="space-y-2 text-sm text-slate-600 mb-4">
                    <p><strong className="text-slate-800">Enfant inscrit :</strong> {sejour.enfant}</p>
                    <p><strong className="text-slate-800">Dates :</strong> {sejour.dates}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${sejour.isValide ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-700"}`}>
                    {sejour.isValide ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                    {sejour.statut}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 4. DOCUMENTS */}
        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <FileText className="text-[#FF9932]" size={24} />
            Mes documents
          </h2>
          {documents.length === 0 ? (
             <p className="text-slate-500 italic bg-white p-6 rounded-xl border border-slate-200">Aucun document n'est requis pour le moment.</p>
          ) : (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
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
                        <td className="px-6 py-4 font-medium text-slate-900">{doc.nom}</td>
                        <td className="px-6 py-4 text-slate-600">{doc.concerne}</td>
                        <td className="px-6 py-4">
                          {doc.etat === "success" && <span className="flex items-center gap-1.5 text-green-600 font-semibold bg-green-50 px-2 py-1 rounded w-fit"><CheckCircle2 size={16} /> Validé</span>}
                          {doc.etat === "warning" && <span className="flex items-center gap-1.5 text-orange-600 font-semibold bg-orange-50 px-2 py-1 rounded w-fit"><Clock size={16} /> En cours</span>}
                          {doc.etat === "error" && <span className="flex items-center gap-1.5 text-red-600 font-semibold bg-red-50 px-2 py-1 rounded w-fit"><XCircle size={16} /> À fournir</span>}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {doc.etat === "error" ? (
                            <button onClick={() => handleUploadClick(doc.nom)} className="inline-flex items-center gap-2 bg-[#114C5A] hover:bg-[#0d323c] text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-sm">
                              <UploadCloud size={16} />
                              Fournir
                            </button>
                          ) : (
                            <span className="text-slate-400 italic text-sm">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}