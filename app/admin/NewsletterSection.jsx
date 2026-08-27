"use client";
import { useState, useEffect, useRef } from "react";
import {
  Mail, Users, Plus, Trash2, Edit, Download, Upload, X,
  Search, Loader,
} from "lucide-react";
import {
  listerContacts, creerContact, modifierContact, supprimerContact, supprimerContacts,
  importerLotContacts, exporterContactsCSV, assignerListeContacts,
} from "@/app/actions/newsletter";
import { parserContactsCSV } from "@/lib/csvContacts";

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
            <label style={labelStyle}>Listes / tags (séparés par des virgules)</label>
            <input value={tagsStr} onChange={(e) => setTagsStr(e.target.value)} style={inputStyle} placeholder="ex: famille, prospect, sénior" />
          </div>
          {isEditing && (
            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 700, color: C.teal, cursor: "pointer" }}>
              <input type="checkbox" checked={abonne} onChange={(e) => setAbonne(e.target.checked)} />
              Abonné (à exporter vers Brevo)
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

/* ─── LISTE DES CONTACTS ─────────────────────────────────────────────── */
function ContactsTab({ contacts, onRefresh }) {
  const [search, setSearch] = useState("");
  const [tagFiltre, setTagFiltre] = useState("");
  const [contactEnEdition, setContactEnEdition] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importMsg, setImportMsg] = useState("");
  const [importProgress, setImportProgress] = useState(null); // { done, total }
  const fileInputRef = useRef(null);

  const [selectedIds, setSelectedIds] = useState(new Set());
  const [nouvelleListe, setNouvelleListe] = useState("");
  const [isAssigning, setIsAssigning] = useState(false);
  const [assignMsg, setAssignMsg] = useState("");

  const allTags = [...new Set(contacts.flatMap((c) => c.tags || []))].sort();

  const filtered = contacts.filter((c) => {
    const matchesSearch = !search || `${c.email} ${c.prenom || ""} ${c.nom || ""}`.toLowerCase().includes(search.toLowerCase());
    const matchesTag = !tagFiltre || (c.tags || []).includes(tagFiltre);
    return matchesSearch && matchesTag;
  });

  const toutSelectionne = filtered.length > 0 && filtered.every((c) => selectedIds.has(c.id));

  const toggleSelectAll = () => {
    setSelectedIds(() => {
      if (toutSelectionne) return new Set();
      return new Set(filtered.map((c) => c.id));
    });
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAssignerListe = async () => {
    const liste = nouvelleListe.trim();
    if (!liste) {
      setAssignMsg("Merci de saisir un nom de liste.");
      return;
    }
    if (selectedIds.size === 0) return;
    setIsAssigning(true);
    setAssignMsg("");
    const result = await assignerListeContacts([...selectedIds], liste);
    setIsAssigning(false);
    if (result.error) {
      setAssignMsg(`Erreur : ${result.error}`);
    } else {
      setAssignMsg(`${result.count} contact(s) ajouté(s) à la liste "${liste}".`);
      setNouvelleListe("");
      setSelectedIds(new Set());
      onRefresh();
    }
  };

  const handleDelete = async (contact) => {
    if (!window.confirm(`Supprimer ${contact.email} de la liste ?`)) return;
    await supprimerContact(contact.id);
    onRefresh();
  };

  const handleDeleteSelection = async () => {
    if (selectedIds.size === 0) return;
    if (!window.confirm(`Supprimer définitivement ${selectedIds.size} contact(s) ?`)) return;
    setIsAssigning(true);
    setAssignMsg("");
    const result = await supprimerContacts([...selectedIds]);
    setIsAssigning(false);
    if (result.error) {
      setAssignMsg(`Erreur : ${result.error}`);
    } else {
      setAssignMsg(`${result.count} contact(s) supprimé(s).`);
      setSelectedIds(new Set());
      onRefresh();
    }
  };

  const TAILLE_LOT_IMPORT = 50;

  const handleImportFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsImporting(true);
    setImportMsg("");
    setImportProgress(null);
    try {
      const text = await file.text();
      const parsed = parserContactsCSV(text);
      if (parsed.error) {
        setImportMsg(`Erreur : ${parsed.error}`);
        return;
      }

      const { contacts, doublonsFichier } = parsed;
      let nouveaux = 0;
      let misAJour = 0;
      let invalides = parsed.invalides;

      setImportProgress({ done: 0, total: contacts.length });

      for (let i = 0; i < contacts.length; i += TAILLE_LOT_IMPORT) {
        const lot = contacts.slice(i, i + TAILLE_LOT_IMPORT);
        const result = await importerLotContacts(lot);
        nouveaux += result.nouveaux;
        misAJour += result.misAJour;
        invalides += result.invalides;
        setImportProgress({ done: Math.min(i + lot.length, contacts.length), total: contacts.length });
      }

      const parts = [`${nouveaux} nouveau(x) contact(s)`];
      if (misAJour > 0) parts.push(`${misAJour} déjà existant(s) (mis à jour)`);
      if (doublonsFichier > 0) parts.push(`${doublonsFichier} doublon(s) dans le fichier`);
      if (invalides > 0) parts.push(`${invalides} ligne(s) ignorée(s)`);
      setImportMsg(parts.join(", ") + ".");
      onRefresh();
    } catch (err) {
      setImportMsg("Erreur lors de la lecture du fichier.");
    } finally {
      setIsImporting(false);
      setImportProgress(null);
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
    a.download = `contacts-brevo${tagFiltre ? `-${tagFiltre}` : ""}.csv`;
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
          <option value="">Toutes les listes</option>
          {allTags.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <button onClick={handleExport} style={btnGhost}><Download size={15} /> Exporter CSV{tagFiltre ? " (liste filtrée)" : ""}</button>
        <label style={{ ...btnGhost, cursor: isImporting ? "not-allowed" : "pointer", opacity: isImporting ? 0.6 : 1 }}>
          {isImporting ? <Loader size={15} className="animate-spin" /> : <Upload size={15} />} Importer CSV
          <input ref={fileInputRef} type="file" accept=".csv,text/csv" onChange={handleImportFile} disabled={isImporting} style={{ display: "none" }} />
        </label>
        <button onClick={() => setShowAddModal(true)} style={btnPrimary}><Plus size={15} /> Contact</button>
      </div>

      {importProgress && (
        <div style={{ background: C.arctic, borderRadius: "10px", padding: "12px 14px", marginBottom: "16px" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: C.teal, marginBottom: "8px" }}>
            {importProgress.done} contact{importProgress.done !== 1 ? "s" : ""} importé{importProgress.done !== 1 ? "s" : ""} sur {importProgress.total}
          </div>
          <div style={{ background: "#fff", borderRadius: "999px", height: "8px", overflow: "hidden" }}>
            <div
              style={{
                width: `${importProgress.total ? Math.round((importProgress.done / importProgress.total) * 100) : 0}%`,
                height: "100%",
                background: C.yellow,
                borderRadius: "999px",
                transition: "width 0.2s ease",
              }}
            />
          </div>
        </div>
      )}

      {importMsg && <div style={{ background: C.arctic, color: C.teal, padding: "10px 14px", borderRadius: "10px", fontSize: "12px", fontWeight: 700, marginBottom: "16px" }}>{importMsg}</div>}

      {selectedIds.size > 0 && (
        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap", background: C.lilac, padding: "12px 16px", borderRadius: "14px", marginBottom: "16px" }}>
          <span style={{ fontSize: "13px", fontWeight: 800, color: C.teal }}>{selectedIds.size} sélectionné(s)</span>
          <input
            list="listes-existantes"
            value={nouvelleListe}
            onChange={(e) => setNouvelleListe(e.target.value)}
            placeholder="Nom de la liste (ex: séjours été)"
            style={{ ...inputStyle, width: "220px" }}
          />
          <datalist id="listes-existantes">
            {allTags.map((t) => <option key={t} value={t} />)}
          </datalist>
          <button onClick={handleAssignerListe} disabled={isAssigning} style={{ ...btnPrimary, opacity: isAssigning ? 0.6 : 1 }}>
            {isAssigning ? "Patientez..." : "Ajouter à la liste"}
          </button>
          <button onClick={handleDeleteSelection} disabled={isAssigning} style={{ background: "#fee2e2", color: "#991b1b", border: "none", padding: "10px 18px", borderRadius: "10px", fontWeight: 800, fontSize: "13px", cursor: isAssigning ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: "8px", opacity: isAssigning ? 0.6 : 1 }}>
            <Trash2 size={15} /> Supprimer
          </button>
          <button onClick={() => setSelectedIds(new Set())} style={btnGhost}>Annuler la sélection</button>
        </div>
      )}

      {assignMsg && <div style={{ background: C.arctic, color: C.teal, padding: "10px 14px", borderRadius: "10px", fontSize: "12px", fontWeight: 700, marginBottom: "16px" }}>{assignMsg}</div>}

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
                <th style={{ padding: "14px 16px", width: "36px" }}>
                  <input type="checkbox" checked={toutSelectionne} onChange={toggleSelectAll} style={{ cursor: "pointer" }} />
                </th>
                <th style={{ padding: "14px 16px", fontSize: "11px", color: C.gray, textTransform: "uppercase" }}>Contact</th>
                <th style={{ padding: "14px 16px", fontSize: "11px", color: C.gray, textTransform: "uppercase" }}>Listes</th>
                <th style={{ padding: "14px 16px", fontSize: "11px", color: C.gray, textTransform: "uppercase" }}>Statut</th>
                <th style={{ padding: "14px 16px" }}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} style={{ borderBottom: `1px solid ${C.arctic}` }}>
                  <td style={{ padding: "14px 16px" }}>
                    <input type="checkbox" checked={selectedIds.has(c.id)} onChange={() => toggleSelect(c.id)} style={{ cursor: "pointer" }} />
                  </td>
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

/* ─── SECTION LISTE DE DIFFUSION (PAGE PRINCIPALE) ───────────────────── */
export default function NewsletterSection() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    const c = await listerContacts();
    setContacts(c);
    setLoading(false);
  };

  useEffect(() => { refresh(); }, []);

  const abonnesCount = contacts.filter((c) => c.abonne).length;
  const listesCount = new Set(contacts.flatMap((c) => c.tags || [])).size;

  return (
    <div>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "20px" }}>
        <div style={{ background: C.white, borderRadius: "16px", padding: "16px 20px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 2px 12px rgba(17,76,90,0.04)" }}>
          <Users size={20} style={{ color: C.saffron }} />
          <div><p style={{ fontSize: "18px", fontWeight: 900, color: C.teal }}>{abonnesCount}</p><p style={{ fontSize: "11px", color: C.gray, fontWeight: 700 }}>Contacts abonnés</p></div>
        </div>
        <div style={{ background: C.white, borderRadius: "16px", padding: "16px 20px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 2px 12px rgba(17,76,90,0.04)" }}>
          <Mail size={20} style={{ color: C.saffron }} />
          <div><p style={{ fontSize: "18px", fontWeight: 900, color: C.teal }}>{listesCount}</p><p style={{ fontSize: "11px", color: C.gray, fontWeight: 700 }}>Listes</p></div>
        </div>
      </div>

      <div style={{ background: C.lilac, borderRadius: "14px", padding: "14px 18px", marginBottom: "24px", fontSize: "13px", color: C.teal, fontWeight: 600, lineHeight: 1.5 }}>
        Cette section sert uniquement à tenir à jour la liste de diffusion. Les campagnes ne sont plus envoyées depuis le site :
        segmentez les contacts avec les listes, exportez le CSV, puis importez-le dans Brevo pour composer et envoyer l'emailing.
      </div>

      {loading ? (
        <div style={{ padding: "60px", textAlign: "center", color: C.gray }}>Chargement...</div>
      ) : (
        <ContactsTab contacts={contacts} onRefresh={refresh} />
      )}
    </div>
  );
}
