"use client";
import { useState, useEffect, useRef } from "react";
import {
  Mail, Users, Send, Plus, Trash2, Edit, Download, Upload, X,
  Eye, Code2, CheckCircle2, AlertCircle, Search, Tag, Loader,
  FileText, Radio,
} from "lucide-react";
import {
  listerContacts, creerContact, modifierContact, supprimerContact,
  importerContactsCSV, exporterContactsCSV,
  listerCampagnes, creerCampagne, modifierCampagne, supprimerCampagne,
  envoyerTestCampagne, envoyerCampagne,
} from "@/app/actions/newsletter";

const C = {
  yellow: "#FFC801",
  saffron: "#FF9932",
  teal: "#114C5A",
  lilac: "#EFDEF9",
  arctic: "#F1F6F4",
  white: "#ffffff",
  gray: "#8aaa",
  lightGray: "#e2e8f0",
};

const btnPrimary = { background: C.yellow, color: C.teal, border: "none", padding: "10px 18px", borderRadius: "10px", fontWeight: 800, fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" };
const btnGhost = { background: C.arctic, color: C.teal, border: "none", padding: "10px 18px", borderRadius: "10px", fontWeight: 700, fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" };
const inputStyle = { padding: "12px", borderRadius: "12px", border: `1px solid ${C.lightGray}`, fontSize: "13px", fontFamily: "inherit", width: "100%" };
const labelStyle = { fontSize: "11px", fontWeight: 700, color: C.gray, textTransform: "uppercase", marginBottom: "6px", display: "block" };

/* ─── MODALE : AJOUTER / MODIFIER UN CONTACT ─────────────────────────── */
function ContactModal({ contact, onClose, onSaved }) {
  const isEditing = !!contact;
  const [email, setEmail] = useState(contact?.email || "");
  const [prenom, setPrenom] = useState(contact?.prenom || "");
  const [nom, setNom] = useState(contact?.nom || "");
  const [tagsStr, setTagsStr] = useState((contact?.tags || []).join(", "));
  const [abonne, setAbonne] = useState(contact?.abonne ?? true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    const tags = tagsStr.split(",").map((t) => t.trim()).filter(Boolean);

    const result = isEditing
      ? await modifierContact(contact.id, { prenom, nom, tags, abonne })
      : await creerContact({ email, prenom, nom, tags });

    setIsSubmitting(false);
    if (result.error) {
      setError(result.error);
    } else {
      onSaved();
      onClose();
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(17,76,90,0.6)", backdropFilter: "blur(4px)", padding: "20px" }} onClick={onClose}>
      <form onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit} style={{ background: C.white, width: "100%", maxWidth: "440px", borderRadius: "24px", padding: "28px", position: "relative" }}>
        <button type="button" onClick={onClose} style={{ position: "absolute", top: "20px", right: "20px", background: C.arctic, border: "none", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={16} /></button>
        <h2 style={{ fontSize: "18px", fontWeight: 900, color: C.teal, marginBottom: "20px" }}>{isEditing ? "Modifier le contact" : "Ajouter un contact"}</h2>

        {error && <div style={{ background: "#fef2f2", color: "#991b1b", padding: "10px 14px", borderRadius: "10px", fontSize: "12px", fontWeight: 600, marginBottom: "14px" }}>{error}</div>}

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={labelStyle}>Email {isEditing && "(non modifiable)"}</label>
            <input type="email" required disabled={isEditing} value={email} onChange={(e) => setEmail(e.target.value)} style={{ ...inputStyle, opacity: isEditing ? 0.6 : 1 }} placeholder="famille@exemple.com" />
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Prénom</label>
              <input value={prenom} onChange={(e) => setPrenom(e.target.value)} style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Nom</label>
              <input value={nom} onChange={(e) => setNom(e.target.value)} style={inputStyle} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Tags (séparés par des virgules)</label>
            <input value={tagsStr} onChange={(e) => setTagsStr(e.target.value)} style={inputStyle} placeholder="ex: famille, prospect, sénior" />
          </div>
          {isEditing && (
            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 700, color: C.teal, cursor: "pointer" }}>
              <input type="checkbox" checked={abonne} onChange={(e) => setAbonne(e.target.checked)} />
              Abonné (reçoit les campagnes)
            </label>
          )}
        </div>

        <button type="submit" disabled={isSubmitting} style={{ ...btnPrimary, width: "100%", justifyContent: "center", marginTop: "22px", opacity: isSubmitting ? 0.7 : 1 }}>
          {isSubmitting ? "Enregistrement..." : isEditing ? "Enregistrer" : "Ajouter le contact"}
        </button>
      </form>
    </div>
  );
}

/* ─── ONGLET : CONTACTS ───────────────────────────────────────────────── */
function ContactsTab({ contacts, onRefresh }) {
  const [search, setSearch] = useState("");
  const [tagFiltre, setTagFiltre] = useState("");
  const [contactEnEdition, setContactEnEdition] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importMsg, setImportMsg] = useState("");
  const fileInputRef = useRef(null);

  const allTags = [...new Set(contacts.flatMap((c) => c.tags || []))].sort();

  const filtered = contacts.filter((c) => {
    const matchesSearch = !search || `${c.email} ${c.prenom || ""} ${c.nom || ""}`.toLowerCase().includes(search.toLowerCase());
    const matchesTag = !tagFiltre || (c.tags || []).includes(tagFiltre);
    return matchesSearch && matchesTag;
  });

  const handleDelete = async (contact) => {
    if (!window.confirm(`Supprimer ${contact.email} de la liste ?`)) return;
    await supprimerContact(contact.id);
    onRefresh();
  };

  const handleImportFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsImporting(true);
    setImportMsg("");
    try {
      const text = await file.text();
      const result = await importerContactsCSV(text);
      if (result.error) {
        setImportMsg(`Erreur : ${result.error}`);
      } else {
        setImportMsg(`${result.imported} contact(s) importé(s), ${result.skipped} ignoré(s).`);
        onRefresh();
      }
    } catch (err) {
      setImportMsg("Erreur lors de la lecture du fichier.");
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleExport = async () => {
    const result = await exporterContactsCSV(tagFiltre || undefined);
    if (!result.success) return;
    const blob = new Blob([result.csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contacts-newsletter${tagFiltre ? `-${tagFiltre}` : ""}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "20px", alignItems: "center" }}>
        <div style={{ position: "relative", flex: "1 1 240px" }}>
          <Search size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: C.gray }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher un contact..." style={{ ...inputStyle, paddingLeft: "38px" }} />
        </div>
        <select value={tagFiltre} onChange={(e) => setTagFiltre(e.target.value)} style={{ ...inputStyle, width: "auto" }}>
          <option value="">Tous les tags</option>
          {allTags.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <button onClick={handleExport} style={btnGhost}><Download size={15} /> Exporter CSV</button>
        <label style={{ ...btnGhost, cursor: isImporting ? "not-allowed" : "pointer", opacity: isImporting ? 0.6 : 1 }}>
          {isImporting ? <Loader size={15} className="animate-spin" /> : <Upload size={15} />} Importer CSV
          <input ref={fileInputRef} type="file" accept=".csv,text/csv" onChange={handleImportFile} disabled={isImporting} style={{ display: "none" }} />
        </label>
        <button onClick={() => setShowAddModal(true)} style={btnPrimary}><Plus size={15} /> Contact</button>
      </div>

      {importMsg && <div style={{ background: C.arctic, color: C.teal, padding: "10px 14px", borderRadius: "10px", fontSize: "12px", fontWeight: 700, marginBottom: "16px" }}>{importMsg}</div>}

      <div style={{ fontSize: "13px", fontWeight: 700, color: C.gray, marginBottom: "12px" }}>{filtered.length} contact{filtered.length !== 1 ? "s" : ""}</div>

      <div style={{ background: C.white, borderRadius: "20px", overflow: "hidden", boxShadow: "0 4px 16px rgba(17,76,90,0.04)" }}>
        {filtered.length === 0 ? (
          <div style={{ padding: "48px", textAlign: "center", color: C.gray }}>
            <Users size={36} style={{ opacity: 0.2, marginBottom: "12px" }} />
            <p>Aucun contact pour le moment.</p>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${C.arctic}`, textAlign: "left" }}>
                <th style={{ padding: "14px 16px", fontSize: "11px", color: C.gray, textTransform: "uppercase" }}>Contact</th>
                <th style={{ padding: "14px 16px", fontSize: "11px", color: C.gray, textTransform: "uppercase" }}>Tags</th>
                <th style={{ padding: "14px 16px", fontSize: "11px", color: C.gray, textTransform: "uppercase" }}>Statut</th>
                <th style={{ padding: "14px 16px" }}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} style={{ borderBottom: `1px solid ${C.arctic}` }}>
                  <td style={{ padding: "14px 16px" }}>
                    <p style={{ fontSize: "13px", fontWeight: 800, color: C.teal }}>{c.email}</p>
                    {(c.prenom || c.nom) && <p style={{ fontSize: "12px", color: C.gray }}>{c.prenom} {c.nom}</p>}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {(c.tags || []).map((t) => (
                        <span key={t} style={{ fontSize: "10px", fontWeight: 700, color: C.teal, background: C.lilac, padding: "2px 8px", borderRadius: "999px" }}>{t}</span>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "8px", background: c.abonne ? "#d1fae5" : "#fee2e2", color: c.abonne ? "#065f46" : "#991b1b" }}>
                      {c.abonne ? "Abonné" : "Désabonné"}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}>
                      <button onClick={() => setContactEnEdition(c)} style={{ background: C.arctic, border: "none", width: "30px", height: "30px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: C.teal }}><Edit size={13} /></button>
                      <button onClick={() => handleDelete(c)} style={{ background: "#fee2e2", border: "none", width: "30px", height: "30px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#991b1b" }}><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showAddModal && <ContactModal onClose={() => setShowAddModal(false)} onSaved={onRefresh} />}
      {contactEnEdition && <ContactModal contact={contactEnEdition} onClose={() => setContactEnEdition(null)} onSaved={onRefresh} />}
    </div>
  );
}

/* ─── ÉDITEUR DE CAMPAGNE (code HTML + preview + test + envoi) ──────────── */
function CampagneEditor({ campagne, allTags, contacts, onClose, onSaved }) {
  const isNew = !campagne;
  const isSent = campagne?.statut === "Envoyée";
  const [sujet, setSujet] = useState(campagne?.sujet || "");
  const [html, setHtml] = useState(campagne?.htmlContent || "");
  const [tagsCiblage, setTagsCiblage] = useState(campagne?.tagsCiblage || []);
  const [view, setView] = useState("code"); // "code" | "preview"
  const [isSaving, setIsSaving] = useState(false);
  const [testEmail, setTestEmail] = useState("");
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testMsg, setTestMsg] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [savedId, setSavedId] = useState(campagne?.id || null);
  const [modeDestinataires, setModeDestinataires] = useState(campagne?.tagsCiblage?.length ? "tags" : "tous");

  const toggleTag = (tag) => {
    setTagsCiblage((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  };

  const abonnesCount = (contacts || []).filter((c) => c.abonne).length;
  const destinatairesCount = (contacts || []).filter((c) => {
    if (!c.abonne) return false;
    if (modeDestinataires === "tous") return true;
    return (c.tags || []).some((t) => tagsCiblage.includes(t));
  }).length;

  const tagsCiblageEffectif = modeDestinataires === "tous" ? [] : tagsCiblage;

  const handleSave = async () => {
    setIsSaving(true);
    setError("");
    const result = savedId
      ? await modifierCampagne(savedId, { sujet, htmlContent: html, tagsCiblage: tagsCiblageEffectif })
      : await creerCampagne({ sujet, htmlContent: html, tagsCiblage: tagsCiblageEffectif });
    setIsSaving(false);
    if (result.error) {
      setError(result.error);
      return null;
    }
    setSavedId(result.campagne.id);
    onSaved();
    return result.campagne.id;
  };

  const handleSendTest = async () => {
    if (!testEmail) return;
    setIsSendingTest(true);
    setTestMsg("");
    const id = savedId || (await handleSave());
    if (!id) { setIsSendingTest(false); return; }
    const result = await envoyerTestCampagne(id, testEmail);
    setIsSendingTest(false);
    setTestMsg(result.error ? `Erreur : ${result.error}` : `Email de test envoyé à ${testEmail} !`);
  };

  const handleSendCampagne = async () => {
    const destTxt = tagsCiblageEffectif.length ? `aux contacts avec le(s) tag(s) : ${tagsCiblageEffectif.join(", ")}` : "à TOUS les contacts abonnés";
    if (!window.confirm(`Envoyer définitivement cette campagne ${destTxt} (${destinatairesCount} destinataire(s)) ? Cette action est irréversible.`)) return;

    setIsSending(true);
    setError("");
    const id = savedId || (await handleSave());
    if (!id) { setIsSending(false); return; }

    const result = await envoyerCampagne(id);
    setIsSending(false);
    if (result.error) {
      setError(result.error);
    } else {
      alert(`Campagne envoyée à ${result.destinatairesCount} contact(s) !`);
      onSaved();
      onClose();
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(17,76,90,0.6)", backdropFilter: "blur(4px)", padding: "20px" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: C.white, width: "100%", maxWidth: "980px", maxHeight: "92vh", borderRadius: "24px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: `1px solid ${C.arctic}` }}>
          <h2 style={{ fontSize: "17px", fontWeight: 900, color: C.teal }}>{isNew ? "Nouvelle campagne" : isSent ? "Campagne envoyée (lecture seule)" : "Modifier la campagne"}</h2>
          <button onClick={onClose} style={{ background: C.arctic, border: "none", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={16} /></button>
        </div>

        <div style={{ padding: "20px 24px", overflowY: "auto", flex: 1 }}>
          {error && <div style={{ background: "#fef2f2", color: "#991b1b", padding: "10px 14px", borderRadius: "10px", fontSize: "12px", fontWeight: 600, marginBottom: "16px" }}>{error}</div>}

          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Sujet de l'email</label>
            <input disabled={isSent} value={sujet} onChange={(e) => setSujet(e.target.value)} style={inputStyle} placeholder="Ex: Notre nouveau site est en ligne !" />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Destinataires</label>

            <div style={{ display: "flex", gap: "8px", marginBottom: allTags.length > 0 ? "10px" : 0 }}>
              <button
                type="button"
                disabled={isSent}
                onClick={() => setModeDestinataires("tous")}
                style={{
                  flex: 1, padding: "12px", borderRadius: "12px", cursor: isSent ? "default" : "pointer", fontSize: "13px", fontWeight: 700, textAlign: "left",
                  border: `2px solid ${modeDestinataires === "tous" ? C.teal : C.lightGray}`,
                  background: modeDestinataires === "tous" ? C.lilac : C.white,
                  color: C.teal,
                }}
              >
                Tous les contacts abonnés
                <div style={{ fontSize: "11px", fontWeight: 600, color: C.gray, marginTop: "2px" }}>{abonnesCount} contact{abonnesCount !== 1 ? "s" : ""}</div>
              </button>
              {allTags.length > 0 && (
                <button
                  type="button"
                  disabled={isSent}
                  onClick={() => setModeDestinataires("tags")}
                  style={{
                    flex: 1, padding: "12px", borderRadius: "12px", cursor: isSent ? "default" : "pointer", fontSize: "13px", fontWeight: 700, textAlign: "left",
                    border: `2px solid ${modeDestinataires === "tags" ? C.teal : C.lightGray}`,
                    background: modeDestinataires === "tags" ? C.lilac : C.white,
                    color: C.teal,
                  }}
                >
                  Une liste précise (par tag)
                  <div style={{ fontSize: "11px", fontWeight: 600, color: C.gray, marginTop: "2px" }}>Choisir un ou plusieurs tags</div>
                </button>
              )}
            </div>

            {modeDestinataires === "tags" && allTags.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "10px" }}>
                {allTags.map((t) => (
                  <button
                    key={t}
                    type="button"
                    disabled={isSent}
                    onClick={() => toggleTag(t)}
                    style={{
                      fontSize: "11px", fontWeight: 700, padding: "6px 12px", borderRadius: "999px", cursor: isSent ? "default" : "pointer",
                      border: `1px solid ${tagsCiblage.includes(t) ? C.teal : C.lightGray}`,
                      background: tagsCiblage.includes(t) ? C.teal : C.white,
                      color: tagsCiblage.includes(t) ? C.white : C.teal,
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}

            <p style={{ fontSize: "12px", fontWeight: 800, color: destinatairesCount === 0 ? "#ef4444" : "#065f46" }}>
              → {destinatairesCount} destinataire{destinatairesCount !== 1 ? "s" : ""}
            </p>
          </div>

          <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
            <button onClick={() => setView("code")} style={{ ...(view === "code" ? btnPrimary : btnGhost), padding: "8px 14px" }}><Code2 size={14} /> Code HTML</button>
            <button onClick={() => setView("preview")} style={{ ...(view === "preview" ? btnPrimary : btnGhost), padding: "8px 14px" }}><Eye size={14} /> Aperçu</button>
          </div>

          {view === "code" ? (
            <textarea
              disabled={isSent}
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              spellCheck={false}
              placeholder="Collez ici le code HTML complet de votre email..."
              style={{ width: "100%", height: "380px", padding: "16px", borderRadius: "14px", border: `1px solid ${C.lightGray}`, fontFamily: "'SF Mono', Menlo, Consolas, monospace", fontSize: "12px", lineHeight: 1.6, resize: "vertical", background: "#0d1b1f", color: "#e2e8f0" }}
            />
          ) : (
            <div style={{ border: `1px solid ${C.lightGray}`, borderRadius: "14px", overflow: "hidden", height: "380px", background: C.arctic }}>
              {html ? (
                <iframe title="Aperçu" srcDoc={html} style={{ width: "100%", height: "100%", border: "none" }} />
              ) : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: C.gray, fontSize: "13px" }}>Aucun contenu à prévisualiser</div>
              )}
            </div>
          )}
        </div>

        {!isSent && (
          <div style={{ padding: "18px 24px", borderTop: `1px solid ${C.arctic}`, display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", justifyContent: "space-between", background: C.arctic }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
              <input type="email" value={testEmail} onChange={(e) => setTestEmail(e.target.value)} placeholder="email@test.com" style={{ ...inputStyle, width: "200px" }} />
              <button onClick={handleSendTest} disabled={isSendingTest || !testEmail} style={{ ...btnGhost, opacity: isSendingTest || !testEmail ? 0.6 : 1 }}>
                {isSendingTest ? <Loader size={14} className="animate-spin" /> : <Send size={14} />} Envoyer un test
              </button>
              {testMsg && <span style={{ fontSize: "12px", fontWeight: 700, color: testMsg.startsWith("Erreur") ? "#991b1b" : "#065f46" }}>{testMsg}</span>}
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={handleSave} disabled={isSaving || !sujet || !html} style={{ ...btnGhost, opacity: isSaving || !sujet || !html ? 0.6 : 1 }}>
                {isSaving ? "Enregistrement..." : "Enregistrer le brouillon"}
              </button>
              <button onClick={handleSendCampagne} disabled={isSending || !sujet || !html || destinatairesCount === 0} style={{ ...btnPrimary, background: "#ef4444", color: "white", opacity: isSending || !sujet || !html || destinatairesCount === 0 ? 0.6 : 1 }}>
                <Radio size={14} /> {isSending ? "Envoi en cours..." : "Envoyer la campagne"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── ONGLET : CAMPAGNES ──────────────────────────────────────────────── */
function CampagnesTab({ campagnes, contacts, onRefresh }) {
  const [editorTarget, setEditorTarget] = useState(undefined); // undefined = closed, null = new, object = edit
  const allTags = [...new Set(contacts.flatMap((c) => c.tags || []))].sort();

  const handleDelete = async (campagne) => {
    if (!window.confirm(`Supprimer la campagne "${campagne.sujet}" ?`)) return;
    await supprimerCampagne(campagne.id);
    onRefresh();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
        <button onClick={() => setEditorTarget(null)} style={btnPrimary}><Plus size={15} /> Nouvelle campagne</button>
      </div>

      {campagnes.length === 0 ? (
        <div style={{ background: C.white, borderRadius: "20px", padding: "48px", textAlign: "center", color: C.gray }}>
          <Mail size={36} style={{ opacity: 0.2, marginBottom: "12px" }} />
          <p>Aucune campagne pour le moment.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {campagnes.map((camp) => (
            <div key={camp.id} onClick={() => setEditorTarget(camp)} style={{ background: C.white, borderRadius: "16px", padding: "18px 20px", boxShadow: "0 2px 12px rgba(17,76,90,0.04)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", cursor: "pointer" }}>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: "14px", fontWeight: 800, color: C.teal, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{camp.sujet || "Sans titre"}</p>
                <p style={{ fontSize: "12px", color: C.gray, marginTop: "2px" }}>
                  {camp.statut === "Envoyée"
                    ? `Envoyée à ${camp.destinatairesCount} contact(s) le ${new Date(camp.envoyeeLe).toLocaleDateString("fr-FR")}`
                    : `Créée le ${new Date(camp.createdAt).toLocaleDateString("fr-FR")}`}
                  {camp.tagsCiblage?.length > 0 && ` · Ciblage : ${camp.tagsCiblage.join(", ")}`}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                <span style={{ fontSize: "11px", fontWeight: 700, padding: "5px 12px", borderRadius: "8px", background: camp.statut === "Envoyée" ? "#d1fae5" : "#fef3c7", color: camp.statut === "Envoyée" ? "#065f46" : "#92400e" }}>
                  {camp.statut}
                </span>
                {camp.statut !== "Envoyée" && (
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(camp); }} style={{ background: "#fee2e2", border: "none", width: "30px", height: "30px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#991b1b" }}><Trash2 size={13} /></button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {editorTarget !== undefined && (
        <CampagneEditor
          campagne={editorTarget}
          allTags={allTags}
          contacts={contacts}
          onClose={() => setEditorTarget(undefined)}
          onSaved={onRefresh}
        />
      )}
    </div>
  );
}

/* ─── SECTION NEWSLETTER (PAGE PRINCIPALE) ───────────────────────────── */
export default function NewsletterSection() {
  const [tab, setTab] = useState("campagnes"); // "campagnes" | "contacts"
  const [contacts, setContacts] = useState([]);
  const [campagnes, setCampagnes] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    const [c, camp] = await Promise.all([listerContacts(), listerCampagnes()]);
    setContacts(c);
    setCampagnes(camp);
    setLoading(false);
  };

  useEffect(() => { refresh(); }, []);

  const abonnesCount = contacts.filter((c) => c.abonne).length;

  return (
    <div>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "24px" }}>
        <div style={{ background: C.white, borderRadius: "16px", padding: "16px 20px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 2px 12px rgba(17,76,90,0.04)" }}>
          <Users size={20} style={{ color: C.saffron }} />
          <div><p style={{ fontSize: "18px", fontWeight: 900, color: C.teal }}>{abonnesCount}</p><p style={{ fontSize: "11px", color: C.gray, fontWeight: 700 }}>Contacts abonnés</p></div>
        </div>
        <div style={{ background: C.white, borderRadius: "16px", padding: "16px 20px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 2px 12px rgba(17,76,90,0.04)" }}>
          <Mail size={20} style={{ color: C.saffron }} />
          <div><p style={{ fontSize: "18px", fontWeight: 900, color: C.teal }}>{campagnes.filter((c) => c.statut === "Envoyée").length}</p><p style={{ fontSize: "11px", color: C.gray, fontWeight: 700 }}>Campagnes envoyées</p></div>
        </div>
      </div>

      <div style={{ display: "flex", background: C.white, borderRadius: "12px", padding: "4px", border: `1px solid ${C.lightGray}`, width: "fit-content", marginBottom: "24px" }}>
        <button onClick={() => setTab("campagnes")} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 18px", borderRadius: "8px", border: "none", cursor: "pointer", background: tab === "campagnes" ? C.teal : "transparent", color: tab === "campagnes" ? C.white : C.gray, fontWeight: 800, fontSize: "13px" }}>
          <Mail size={14} /> Campagnes
        </button>
        <button onClick={() => setTab("contacts")} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 18px", borderRadius: "8px", border: "none", cursor: "pointer", background: tab === "contacts" ? C.teal : "transparent", color: tab === "contacts" ? C.white : C.gray, fontWeight: 800, fontSize: "13px" }}>
          <Users size={14} /> Contacts
        </button>
      </div>

      {loading ? (
        <div style={{ padding: "60px", textAlign: "center", color: C.gray }}>Chargement...</div>
      ) : tab === "contacts" ? (
        <ContactsTab contacts={contacts} onRefresh={refresh} />
      ) : (
        <CampagnesTab campagnes={campagnes} contacts={contacts} onRefresh={refresh} />
      )}
    </div>
  );
}
