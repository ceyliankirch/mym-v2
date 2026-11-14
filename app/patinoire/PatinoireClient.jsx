"use client";
import { useState, useEffect } from "react";
import { CalendarDays, Clock, MapPin, Ticket, CheckCircle2, Snowflake, Minus, Plus } from "lucide-react";
import { inscrirePatinoire } from "@/app/actions/patinoire";

/* ─── PALETTE ────────────────────────────────────────────────────────────── */
const C = {
  yellow: "#FFC801",
  saffron: "#FF9932",
  teal: "#114C5A",
  lilac: "#EFDEF9",
  arctic: "#F1F6F4",
  white: "#ffffff",
};

const INFOS = [
  { Icon: CalendarDays, label: "Date", valeur: "Vendredi 11 décembre" },
  { Icon: Clock, label: "Horaires", valeur: "19 h 30 – 23 h" },
  { Icon: MapPin, label: "Lieu", valeur: "Patinoire de Sucy-en-Brie" },
  { Icon: Ticket, label: "Tarif", valeur: "Gratuit" },
];

const PHOTOS = [
  { src: "/patinoire/patinoire-3.jpg", alt: "Deux enfants avec leur casque sur la patinoire" },
  { src: "/patinoire/patinoire-2.jpg", alt: "Un enfant pousse un déambulateur sur la glace" },
  { src: "/patinoire/patinoire-4.jpg", alt: "La patinoire au coucher du soleil, remplie de familles" },
];

const label = { fontSize: 11, fontWeight: 700, color: C.teal, textTransform: "uppercase", letterSpacing: 1 };
const champ = {
  width: "100%", background: C.arctic, border: "2px solid transparent", borderRadius: 14,
  padding: "14px 16px", fontSize: 14, color: C.teal, outline: "none", transition: "border .2s",
  fontFamily: "inherit", boxSizing: "border-box",
};
const focus = { onFocus: (e) => (e.target.style.borderColor = C.yellow), onBlur: (e) => (e.target.style.borderColor = "transparent") };

export default function PatinoireClient() {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | submitting | success
  const [erreur, setErreur] = useState("");
  const [patineurs, setPatineurs] = useState(1);
  const [prenomConfirme, setPrenomConfirme] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus("submitting");
    setErreur("");
    const res = await inscrirePatinoire({
      prenom: form.get("prenom"),
      nom: form.get("nom"),
      email: form.get("email"),
      patineurs,
    });
    if (res?.success) {
      setPrenomConfirme((form.get("prenom") || "").toString().trim());
      setStatus("success");
    } else {
      setErreur(res?.error || "Une erreur est survenue. Merci de réessayer.");
      setStatus("idle");
    }
  };

  const fade = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(20px)",
    transition: `all .8s ease ${delay}s`,
  });

  return (
    <div style={{ background: C.arctic, color: C.teal, overflowX: "hidden" }}>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", minHeight: 460, display: "flex", alignItems: "center", background: C.teal }}>
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage: "url(/patinoire/patinoire-1.jpg)", backgroundSize: "cover", backgroundPosition: "center 60%",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(17,76,90,0.94) 0%, rgba(17,76,90,0.75) 55%, rgba(17,76,90,0.25) 100%)" }} />
        <div style={{ position: "relative", maxWidth: 1320, width: "100%", margin: "0 auto", padding: "80px 32px", ...fade() }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.yellow, borderRadius: 999, padding: "8px 16px", marginBottom: 24 }}>
            <Snowflake size={14} style={{ color: C.teal }} />
            <span style={{ fontSize: 11, fontWeight: 800, color: C.teal, textTransform: "uppercase", letterSpacing: 1 }}>Soirée entre familles</span>
          </div>
          <h1 style={{ fontWeight: 900, fontSize: "clamp(2.4rem, 5vw, 4.2rem)", lineHeight: 1.08, letterSpacing: "-1px", margin: "0 0 20px", color: C.white, maxWidth: 720 }}>
            Soirée à la <span style={{ color: C.yellow }}>patinoire</span>
          </h1>
          <p style={{ fontSize: 18, fontWeight: 600, color: "rgba(255,255,255,0.9)", maxWidth: 560, lineHeight: 1.6, margin: "0 0 32px" }}>
            Vendredi 11 décembre, de 19 h 30 à 23 h, à Sucy-en-Brie. Gratuit, privatisé pour nous.
          </p>
          <a href="#inscription" style={{ display: "inline-block", background: C.yellow, color: C.teal, fontWeight: 800, fontSize: 14, padding: "16px 32px", borderRadius: 999, textDecoration: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
            Je m&apos;inscris
          </a>
        </div>
      </section>

      {/* ── INFOS CLÉS ───────────────────────────────────────────────────── */}
      <section style={{ padding: "0 32px", marginTop: -40, position: "relative" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, ...fade(0.15) }}>
          {INFOS.map(({ Icon, label: l, valeur }) => (
            <div key={l} style={{ background: C.white, borderRadius: 24, padding: "22px 24px", display: "flex", alignItems: "center", gap: 16, boxShadow: "0 12px 32px rgba(17,76,90,0.08)" }}>
              <div style={{ width: 48, height: 48, borderRadius: 16, background: C.yellow + "30", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={22} style={{ color: C.teal }} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: "#8aa", textTransform: "uppercase", letterSpacing: 1 }}>{l}</p>
                <p style={{ margin: "2px 0 0", fontSize: 15, fontWeight: 800 }}>{valeur}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRÉSENTATION + FORMULAIRE ───────────────────────────────────── */}
      <section style={{ padding: "64px 32px 48px" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "flex", gap: 48, flexWrap: "wrap", alignItems: "flex-start" }}>
          {/* Texte */}
          <div style={{ flex: "1 1 420px" }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 900, letterSpacing: "-0.5px", margin: "0 0 20px" }}>
              Se retrouver avant les <span style={{ color: C.saffron }}>fêtes</span>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: 16, color: "#41545c", lineHeight: 1.8 }}>
              <p style={{ margin: 0 }}>
                Afin de nous retrouver tous ensemble avant les fêtes de fin d&apos;année, nous proposons aux participants de nos différents séjours une soirée à la patinoire de Sucy-en-Brie, de 19 h 30 à 23 h.
              </p>
              <p style={{ margin: 0 }}>
                <strong>Make Your Moment a privatisé la patinoire pour l&apos;occasion.</strong> La soirée est gratuite et réservée aux participants des séjours organisés par l&apos;association.
              </p>
              <p style={{ margin: 0 }}>
                Pour nous aider à organiser cet événement, merci de remplir le formulaire en indiquant vos nom et prénom, ainsi que le nombre de personnes qui chausseront les patins.
              </p>
              <p style={{ margin: 0, fontWeight: 800, color: C.teal }}>Nous espérons vous retrouver nombreux et nombreuses !</p>
            </div>

            {/* Photos */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 36 }}>
              <img src={PHOTOS[2].src} alt={PHOTOS[2].alt} style={{ gridColumn: "1 / -1", width: "100%", height: 220, objectFit: "cover", borderRadius: 24 }} />
              <img src={PHOTOS[0].src} alt={PHOTOS[0].alt} style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 24 }} />
              <img src={PHOTOS[1].src} alt={PHOTOS[1].alt} style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 24 }} />
            </div>
          </div>

          {/* Formulaire */}
          <div id="inscription" style={{ flex: "1 1 460px", background: C.white, borderRadius: 32, padding: "44px 40px", boxShadow: "0 24px 64px rgba(17,76,90,0.08)", scrollMarginTop: 100 }}>
            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: C.yellow + "30", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                  <CheckCircle2 size={40} style={{ color: C.teal }} />
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 900, margin: "0 0 12px" }}>C&apos;est noté{prenomConfirme ? `, ${prenomConfirme}` : ""} !</h3>
                <p style={{ fontSize: 15, color: "#5a7a84", lineHeight: 1.7, margin: "0 0 28px" }}>
                  Votre inscription à la soirée patinoire du vendredi 11 décembre est bien enregistrée. À très vite sur la glace !
                </p>
                <button
                  onClick={() => { setStatus("idle"); setPatineurs(1); }}
                  style={{ background: C.arctic, color: C.teal, border: "none", padding: "14px 28px", borderRadius: 999, fontSize: 12, fontWeight: 800, cursor: "pointer" }}
                >
                  Inscrire une autre famille
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <h3 style={{ fontSize: 24, fontWeight: 900, letterSpacing: "-0.5px", margin: "0 0 6px" }}>Je m&apos;inscris</h3>
                  <p style={{ fontSize: 13, color: "#8aa", margin: 0 }}>Gratuit · réservé aux participants de nos séjours</p>
                </div>

                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  <div style={{ flex: "1 1 180px", display: "flex", flexDirection: "column", gap: 8 }}>
                    <label htmlFor="prenom" style={label}>Prénom *</label>
                    <input id="prenom" name="prenom" required autoComplete="given-name" maxLength={100} style={champ} {...focus} />
                  </div>
                  <div style={{ flex: "1 1 180px", display: "flex", flexDirection: "column", gap: 8 }}>
                    <label htmlFor="nom" style={label}>Nom *</label>
                    <input id="nom" name="nom" required autoComplete="family-name" maxLength={100} style={champ} {...focus} />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <span style={label}>Nombre de personnes qui chausseront les patins *</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <button type="button" aria-label="Retirer une personne" onClick={() => setPatineurs((n) => Math.max(1, n - 1))}
                      style={{ width: 48, height: 48, borderRadius: 14, border: "none", background: C.arctic, color: C.teal, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Minus size={18} />
                    </button>
                    <span aria-live="polite" style={{ minWidth: 40, textAlign: "center", fontSize: 28, fontWeight: 900 }}>{patineurs}</span>
                    <button type="button" aria-label="Ajouter une personne" onClick={() => setPatineurs((n) => Math.min(20, n + 1))}
                      style={{ width: 48, height: 48, borderRadius: 14, border: "none", background: C.yellow, color: C.teal, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <label htmlFor="email" style={label}>Email (facultatif)</label>
                  <input id="email" name="email" type="email" autoComplete="email" placeholder="Pour recevoir une confirmation" maxLength={200} style={champ} {...focus} />
                </div>

                {erreur && (
                  <div role="alert" style={{ background: "#fef2f2", color: "#991b1b", padding: "10px 14px", borderRadius: 12, fontSize: 13, fontWeight: 600 }}>{erreur}</div>
                )}

                <button type="submit" disabled={status === "submitting"}
                  style={{ border: "none", borderRadius: 999, background: C.yellow, color: C.teal, fontWeight: 800, fontSize: 14, padding: "16px 28px", cursor: status === "submitting" ? "wait" : "pointer", opacity: status === "submitting" ? 0.7 : 1, boxShadow: "0 8px 24px rgba(255,200,1,0.35)" }}>
                  {status === "submitting" ? "Envoi en cours…" : "Valider mon inscription"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
