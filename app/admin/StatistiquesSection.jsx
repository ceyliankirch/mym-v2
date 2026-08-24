"use client";
import { useState, useEffect } from "react";
import {
  Users, TrendingUp, Repeat, Euro, CheckCircle2, Clock, XCircle,
  Eye, MapPin, ExternalLink, Info, Search,
} from "lucide-react";
import { statsAssociation, statsPagesVues, statsSejoursVus } from "@/app/actions/analytics";

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

const cardStyle = { background: C.white, borderRadius: "16px", padding: "20px", boxShadow: "0 2px 12px rgba(17,76,90,0.04)" };

function KpiCard({ icon: Icon, label, value, color = C.teal }) {
  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
        <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={16} style={{ color }} />
        </div>
        <p style={{ fontSize: "11px", fontWeight: 700, color: C.gray, textTransform: "uppercase" }}>{label}</p>
      </div>
      <p style={{ fontSize: "24px", fontWeight: 900, color: C.teal }}>{value}</p>
    </div>
  );
}

/* ─── ONGLET : ASSOCIATION ────────────────────────────────────────────── */
function AssociationTab({ stats }) {
  if (!stats) return null;
  const maxMois = Math.max(1, ...stats.evolutionMensuelle.map((m) => m.count));

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "24px" }}>
        <KpiCard icon={Users} label="Inscriptions totales" value={stats.totalInscriptions} />
        <KpiCard icon={CheckCircle2} label="Paiements validés" value={stats.totalConfirmees} color="#10b981" />
        <KpiCard icon={Clock} label="En attente" value={stats.totalEnAttente} color={C.saffron} />
        <KpiCard icon={XCircle} label="Annulées" value={stats.totalAnnulees} color="#ef4444" />
        <KpiCard icon={TrendingUp} label="Taux de conversion" value={`${stats.tauxConversion}%`} />
        <KpiCard icon={Users} label="Familles distinctes" value={stats.famillesUniques} />
        <KpiCard icon={Repeat} label="Enfants réinscrits" value={`${stats.enfantsReinscrits} (${stats.tauxReinscription}%)`} color={C.saffron} />
        <KpiCard icon={Euro} label="Revenu (paiements validés)" value={`${stats.revenuTotal.toLocaleString("fr-FR")} €`} color="#10b981" />
      </div>

      {/* Évolution mensuelle */}
      <div style={{ ...cardStyle, marginBottom: "24px" }}>
        <h3 style={{ fontSize: "14px", fontWeight: 800, color: C.teal, marginBottom: "20px" }}>Inscriptions par mois (12 derniers mois)</h3>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "140px" }}>
          {stats.evolutionMensuelle.map((m, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
              <div style={{ fontSize: "10px", fontWeight: 800, color: C.teal }}>{m.count > 0 ? m.count : ""}</div>
              <div style={{
                width: "100%", maxWidth: "28px",
                height: `${Math.max(4, (m.count / maxMois) * 90)}px`,
                background: m.count > 0 ? C.saffron : C.lightGray,
                borderRadius: "6px 6px 0 0",
              }} />
              <div style={{ fontSize: "9px", color: C.gray, fontWeight: 700, textAlign: "center" }}>{m.mois}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Participants par séjour */}
      <div style={{ ...cardStyle, padding: 0, overflow: "hidden" }}>
        <h3 style={{ fontSize: "14px", fontWeight: 800, color: C.teal, padding: "20px 20px 0" }}>Participants par séjour</h3>
        {stats.parSejour.length === 0 ? (
          <p style={{ padding: "20px", color: C.gray, fontSize: "13px" }}>Aucun séjour pour le moment.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "12px" }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${C.arctic}`, textAlign: "left" }}>
                <th style={{ padding: "12px 20px", fontSize: "11px", color: C.gray, textTransform: "uppercase" }}>Séjour</th>
                <th style={{ padding: "12px 20px", fontSize: "11px", color: C.gray, textTransform: "uppercase" }}>Confirmés</th>
                <th style={{ padding: "12px 20px", fontSize: "11px", color: C.gray, textTransform: "uppercase" }}>En attente</th>
                <th style={{ padding: "12px 20px", fontSize: "11px", color: C.gray, textTransform: "uppercase" }}>Remplissage</th>
                <th style={{ padding: "12px 20px", fontSize: "11px", color: C.gray, textTransform: "uppercase" }}>Revenu</th>
              </tr>
            </thead>
            <tbody>
              {stats.parSejour.map((s) => (
                <tr key={s.id} style={{ borderBottom: `1px solid ${C.arctic}` }}>
                  <td style={{ padding: "12px 20px", fontSize: "13px", fontWeight: 800, color: C.teal }}>{s.titre}</td>
                  <td style={{ padding: "12px 20px", fontSize: "13px", color: "#10b981", fontWeight: 700 }}>{s.confirmes}</td>
                  <td style={{ padding: "12px 20px", fontSize: "13px", color: C.saffron, fontWeight: 700 }}>{s.enAttente}</td>
                  <td style={{ padding: "12px 20px", fontSize: "13px", fontWeight: 700, color: s.tauxRemplissage >= 100 ? "#ef4444" : C.teal }}>{s.tauxRemplissage}% ({s.confirmes}/{s.places})</td>
                  <td style={{ padding: "12px 20px", fontSize: "13px", fontWeight: 700, color: C.teal }}>{s.revenu.toLocaleString("fr-FR")} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

/* ─── ONGLET : TRAFIC DU SITE (suivi interne maison) ─────────────────── */
function TraficTab({ pagesVues, sejoursVus }) {
  return (
    <div>
      <div style={{ background: `${C.saffron}14`, border: `1px solid ${C.saffron}40`, borderRadius: "14px", padding: "14px 18px", display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Info size={16} style={{ color: C.saffron, flexShrink: 0, marginTop: "2px" }} />
        <p style={{ fontSize: "12px", color: C.teal, lineHeight: 1.6 }}>
          Suivi interne, sans dépendance externe. Les données ne s'accumulent qu'à partir de la mise en place de ce suivi — pas d'historique antérieur. Pour des statistiques plus complètes (recherches Google, provenance du trafic...), voir l'onglet Google.
        </p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <KpiCard icon={Eye} label="Pages vues (30 derniers jours)" value={pagesVues?.total ?? 0} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div style={{ ...cardStyle, padding: 0, overflow: "hidden" }}>
          <h3 style={{ fontSize: "14px", fontWeight: 800, color: C.teal, padding: "20px 20px 12px" }}>Pages les plus consultées</h3>
          {!pagesVues?.parPage?.length ? (
            <p style={{ padding: "0 20px 20px", color: C.gray, fontSize: "13px" }}>Pas encore de données.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {pagesVues.parPage.map((p, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px", borderTop: `1px solid ${C.arctic}` }}>
                  <span style={{ fontSize: "12px", color: C.teal, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.path}</span>
                  <span style={{ fontSize: "12px", fontWeight: 800, color: C.saffron, flexShrink: 0, marginLeft: "10px" }}>{p.vues}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ ...cardStyle, padding: 0, overflow: "hidden" }}>
          <h3 style={{ fontSize: "14px", fontWeight: 800, color: C.teal, padding: "20px 20px 12px" }}>Séjours les plus consultés</h3>
          {!sejoursVus?.length ? (
            <p style={{ padding: "0 20px 20px", color: C.gray, fontSize: "13px" }}>Pas encore de données.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {sejoursVus.map((s, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px", borderTop: `1px solid ${C.arctic}` }}>
                  <span style={{ fontSize: "12px", color: C.teal, fontWeight: 700, display: "flex", alignItems: "center", gap: "6px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}><MapPin size={12} style={{ flexShrink: 0, color: C.saffron }} />{s.titre}</span>
                  <span style={{ fontSize: "12px", fontWeight: 800, color: C.saffron, flexShrink: 0, marginLeft: "10px" }}>{s.vues}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── ONGLET : GOOGLE (Analytics / Search Console / Avis) ────────────── */
function GoogleTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={cardStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <TrendingUp size={18} style={{ color: C.saffron }} />
          <h3 style={{ fontSize: "15px", fontWeight: 800, color: C.teal }}>Google Analytics 4</h3>
        </div>
        <p style={{ fontSize: "13px", color: C.gray, lineHeight: 1.7, marginBottom: "14px" }}>
          Le tracking GA4 est prêt côté code (composant <code>GoogleAnalytics</code>) mais reste inactif tant qu'aucun Measurement ID n'est configuré. Pour l'activer :
        </p>
        <ol style={{ fontSize: "13px", color: C.teal, lineHeight: 2, paddingLeft: "20px", marginBottom: "14px" }}>
          <li>Crée une propriété sur <a href="https://analytics.google.com" target="_blank" rel="noreferrer" style={{ color: C.teal, fontWeight: 700 }}>analytics.google.com</a> pour make-your-moment.com</li>
          <li>Récupère le Measurement ID (format <code>G-XXXXXXXXXX</code>)</li>
          <li>Ajoute-le en variable d'environnement <code>NEXT_PUBLIC_GA_MEASUREMENT_ID</code> sur Vercel</li>
        </ol>
        <p style={{ fontSize: "12px", color: C.gray }}>
          Une fois actif, les statistiques détaillées (recherches, provenance du trafic, comportement des visiteurs) seront consultables directement sur Google Analytics. Une intégration future pourra les faire remonter ici, mais nécessite un compte de service Google Cloud supplémentaire.
        </p>
      </div>

      <div style={cardStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <Search size={18} style={{ color: C.saffron }} />
          <h3 style={{ fontSize: "15px", fontWeight: 800, color: C.teal }}>Google Search Console</h3>
        </div>
        <p style={{ fontSize: "13px", color: C.gray, lineHeight: 1.7 }}>
          Pas encore configuré. Une fois le site vérifié sur <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer" style={{ color: C.teal, fontWeight: 700 }}>search.google.com/search-console</a>, on pourra y consulter les recherches qui amènent des visiteurs sur le site (clics, impressions, position moyenne).
        </p>
      </div>

      <div style={cardStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <Users size={18} style={{ color: C.saffron }} />
          <h3 style={{ fontSize: "15px", fontWeight: 800, color: C.teal }}>Avis Google Business</h3>
        </div>
        <p style={{ fontSize: "13px", color: C.gray, lineHeight: 1.7 }}>
          Non connecté. L'accès à l'API Google Business Profile (pour récupérer automatiquement la note et les avis) est restreint par Google et nécessite une demande d'accès spécifique — pas de garantie d'obtention. En attendant, la note et les avis peuvent être consultés directement sur la fiche établissement Google de l'association.
        </p>
      </div>
    </div>
  );
}

/* ─── SECTION STATISTIQUES (PAGE PRINCIPALE) ─────────────────────────── */
export default function StatistiquesSection() {
  const [tab, setTab] = useState("association");
  const [assoStats, setAssoStats] = useState(null);
  const [pagesVues, setPagesVues] = useState(null);
  const [sejoursVus, setSejoursVus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [asso, pv, sv] = await Promise.all([
        statsAssociation(),
        statsPagesVues(30),
        statsSejoursVus(30),
      ]);
      setAssoStats(asso);
      setPagesVues(pv);
      setSejoursVus(sv);
      setLoading(false);
    })();
  }, []);

  const TABS = [
    { id: "association", label: "Association", icon: Users },
    { id: "trafic", label: "Trafic du site", icon: Eye },
    { id: "google", label: "Google", icon: ExternalLink },
  ];

  return (
    <div>
      <div style={{ display: "flex", background: C.white, borderRadius: "12px", padding: "4px", border: `1px solid ${C.lightGray}`, width: "fit-content", marginBottom: "24px" }}>
        {TABS.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 18px", borderRadius: "8px", border: "none", cursor: "pointer", background: tab === t.id ? C.teal : "transparent", color: tab === t.id ? C.white : C.gray, fontWeight: 800, fontSize: "13px" }}
            >
              <Icon size={14} /> {t.label}
            </button>
          );
        })}
      </div>

      {loading ? (
        <div style={{ padding: "60px", textAlign: "center", color: C.gray }}>Chargement des statistiques...</div>
      ) : tab === "association" ? (
        <AssociationTab stats={assoStats} />
      ) : tab === "trafic" ? (
        <TraficTab pagesVues={pagesVues} sejoursVus={sejoursVus} />
      ) : (
        <GoogleTab />
      )}
    </div>
  );
}
