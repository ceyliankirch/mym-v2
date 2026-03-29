"use client";
import Link from "next/link";
import { useState } from "react";
import { 
  ArrowRight, Mail, Phone, MapPin, Facebook, Instagram 
} from "lucide-react";

/* ─── PALETTE LOCALE ─────────────────────────────────────────────────────── */
const C = {
  yellow:  "#FFC801",
  saffron: "#FF9932",
  teal:    "#114C5A",
  white:   "#ffffff",
};

const NAV = ["Accueil", "Séjours", "Qui sommes-nous", "Séniors", "Contact", "FAQ"];

/* ─── MINI-COMPOSANT ─────────────────────────────────────────────────────── */
function FooterCol({ title, links }) {
  return (
    <div>
      <h4 style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "18px" }}>{title}</h4>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "11px", padding: 0, margin: 0 }}>
        {links.map((l, i) => (
          <li key={i}>
            <Link href="#" style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", textDecoration: "none", fontWeight: 500, transition: "color .2s" }}
              onMouseEnter={e => e.currentTarget.style.color = C.yellow}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}>
              {l}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── FOOTER PRINCIPAL ───────────────────────────────────────────────────── */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: C.teal, color: C.white, padding: "64px 32px 32px", borderRadius: "40px 40px 0 0" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: "48px", marginBottom: "48px" }}>
          
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "14px", background: C.yellow, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: C.teal, fontWeight: 900, fontSize: "1.1rem" }}>M</span>
              </div>
              <div>
                <div style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase", color: C.white, lineHeight: 1.2 }}>Make Your</div>
                <div style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase", color: C.yellow, lineHeight: 1.2 }}>Moment</div>
              </div>
            </div>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: "20px" }}>
              Séjours inoubliables pour enfants, ados et séniors depuis Sucy-en-Brie.
            </p>
            <div style={{ display: "flex", borderRadius: "14px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)" }}>
              <input type="email" placeholder="Votre email"
                style={{ flex: 1, background: "rgba(255,255,255,0.06)", color: C.white, fontSize: "12px", padding: "11px 14px", border: "none", outline: "none", minWidth: 0 }} />
              <button style={{ background: C.yellow, color: C.teal, padding: "0 16px", border: "none", cursor: "pointer", flexShrink: 0, transition: "background .2s" }}
                onMouseEnter={e => e.currentTarget.style.background = C.saffron}
                onMouseLeave={e => e.currentTarget.style.background = C.yellow}>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Nav */}
          <FooterCol title="Navigation" links={NAV} />
          
          {/* Séjours */}
          <FooterCol title="Séjours" links={["Ski · Châtel","Été dans les Landes","Voyage au Sénégal","Séjour en Allemagne","Sorties Séniors"]} />

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "18px" }}>Contact</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "14px", padding: 0, margin: 0 }}>
              {[
                { Ic: Mail,   t: "mym.makeyourmoment@gmail.com" },
                { Ic: Phone,  t: "+33 6 98 96 50 02" },
                { Ic: MapPin, t: "16 av. du Rond Point\n94370 Sucy-en-Brie" },
              ].map(({ Ic, t }, i) => (
                <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <Ic size={13} style={{ color: C.yellow, flexShrink: 0, marginTop: "1px" }} />
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", whiteSpace: "pre-line" }}>{t}</span>
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", gap: "8px", marginTop: "20px" }}>
              {[{ Ic: Facebook, l: "Facebook" }, { Ic: Instagram, l: "Instagram" }].map(({ Ic, l }, i) => (
                <button key={i} title={l}
                  style={{ width: "36px", height: "36px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.15)", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(255,255,255,0.45)", transition: "all .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.yellow; e.currentTarget.style.color = C.yellow; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}>
                  <Ic size={14} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", margin: 0 }}>© {currentYear} Make Your Moment · Association loi 1901</p>
          <div style={{ display: "flex", gap: "20px" }}>
            {["Mentions légales", "CGV", "Confidentialité"].map((l, i) => (
              <Link key={i} href="#" style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", textDecoration: "none", transition: "color .2s" }}
                onMouseEnter={e => e.currentTarget.style.color = C.yellow}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.25)"}>{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}