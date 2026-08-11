"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ─── DICTIONNAIRE DES COORDONNÉES POUR LA CARTE ─────────────────── */
// ⚡ geoViewBox du SVG (public/france.svg) : minLon, maxLat, maxLon, minLat
const GEO_BOX = { minLon: -4.796120, maxLat: 51.089515, maxLon: 9.560553, minLat: 41.363289 };

function geoToPercent(lat, lon) {
  const left = ((lon - GEO_BOX.minLon) / (GEO_BOX.maxLon - GEO_BOX.minLon)) * 100;
  const top = ((GEO_BOX.maxLat - lat) / (GEO_BOX.maxLat - GEO_BOX.minLat)) * 100;
  return { top: `${top.toFixed(1)}%`, left: `${left.toFixed(1)}%` };
}

// Coordonnées calculées à partir des lat/lon réelles (et non plus estimées à l'œil)
const FRANCE_COORDS = {
  "strasbourg": geoToPercent(48.5734, 7.7521),
  "vincennes": geoToPercent(48.8481, 2.4383),
  "meaux": geoToPercent(48.9605, 2.8878),
  "chapelle": geoToPercent(46.2710, 6.7980), // La Chapelle-d'Abondance (Châtel)
  "elancourt": geoToPercent(48.7860, 1.9486),
  "deauville": geoToPercent(49.3592, 0.0752),
  "vieux-boucau": geoToPercent(43.7886, -1.3986),
  "default": { top: "50%", left: "50%" }
};

function getCoordinates(ville) {
  if (!ville) return FRANCE_COORDS.default;
  const normalized = ville.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
  const foundKey = Object.keys(FRANCE_COORDS).find(k => k !== "default" && normalized.includes(k));
  return foundKey ? FRANCE_COORDS[foundKey] : FRANCE_COORDS.default;
}

/* ─── POPUP DE CARTE (Défilement horizontal des séjours d'un lieu) ─────── */
function MapPopup({ group, renderCard, C }) {
  const scrollRef = useRef(null);
  const isMulti = group.stays.length > 1;

  const scrollL = (e) => {
    e.preventDefault(); e.stopPropagation();
    scrollRef.current?.scrollBy({ left: -292, behavior: 'smooth' });
  };
  const scrollR = (e) => {
    e.preventDefault(); e.stopPropagation();
    scrollRef.current?.scrollBy({ left: 292, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      style={{
        width: isMulti ? "100%" : "280px",
        maxWidth: "600px",
        pointerEvents: "auto",
        position: "relative"
      }}
    >
      {isMulti && (
        <>
          <button onClick={scrollL} style={{ position: "absolute", left: "12px", top: "45%", transform: "translateY(-50%)", zIndex: 10, width: "40px", height: "40px", borderRadius: "50%", background: C.white, border: `1px solid #e2e8f0`, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <ChevronLeft size={20} color={C.teal} />
          </button>
          <button onClick={scrollR} style={{ position: "absolute", right: "12px", top: "45%", transform: "translateY(-50%)", zIndex: 10, width: "40px", height: "40px", borderRadius: "50%", background: C.white, border: `1px solid #e2e8f0`, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <ChevronRight size={20} color={C.teal} />
          </button>
        </>
      )}

      <div style={{
        WebkitMaskImage: isMulti ? "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)" : "none",
        maskImage: isMulti ? "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)" : "none",
      }}>
        <div
          ref={scrollRef}
          className="hide-scroll"
          style={{
            display: "flex",
            gap: "16px",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
            padding: isMulti ? "0 70px" : "0",
            paddingBottom: "24px",
            justifyContent: isMulti ? "flex-start" : "center"
          }}
        >
          {group.stays.map((s, i) => (
            <div key={s.id} style={{ width: "280px", flexShrink: 0, scrollSnapAlign: "center" }}>
              {renderCard(s, i)}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── VUE CARTE (MAP) INTERACTIVE — partagée entre les pages ───────────── */
export default function SejoursMap({ sejours, renderCard, C, height = "700px" }) {
  const [activeKey, setActiveKey] = useState(null);
  const timeoutRef = useRef(null);

  // Groupement des séjours par lieu géographique
  const grouped = {};
  (sejours || []).forEach(s => {
    const villeCourte = s.lieu ? s.lieu.split(',')[0].trim() : "France";
    const coords = getCoordinates(villeCourte);
    const key = `${coords.top}-${coords.left}`;

    if (!grouped[key]) grouped[key] = { coords, stays: [], isPast: true };
    grouped[key].stays.push(s);
    if (!s.isPast) grouped[key].isPast = false; // S'il y a un séjour à venir, le pin est allumé
  });

  const handleMouseEnter = (key) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveKey(key);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveKey(null);
    }, 300);
  };

  const activeGroup = activeKey ? grouped[activeKey] : null;

  return (
    <div style={{ position: "relative", width: "100%", height, borderRadius: "32px", border: "none", background: "transparent", margin: "0 auto", overflow: "hidden" }}>
      <style>{`.hide-scroll::-webkit-scrollbar{display:none} .hide-scroll{-ms-overflow-style:none;scrollbar-width:none}`}</style>

      {/* Couche de la carte de France */}
      <div style={{ position: "absolute", inset: 0 }}>
        {/* ⚡ Le ratio doit correspondre exactement au SVG (596.4 / 584.5) pour que les points
            en % restent alignés avec le contenu réel de l'image, sans bandes vides autour. */}
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", height: "100%", aspectRatio: "596.41547 / 584.5448" }}>
          <img src="/france.svg" alt="Carte" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.08, objectFit: "fill", pointerEvents: "none" }} />

          {/* Rendu des Pins (Points sur la carte) */}
          {Object.entries(grouped).map(([key, group]) => {
            const isActive = activeKey === key;

            return (
              <div key={key}
                   onMouseEnter={() => handleMouseEnter(key)}
                   onMouseLeave={handleMouseLeave}
                   style={{ position: "absolute", top: group.coords.top, left: group.coords.left, zIndex: isActive ? 100 : 10 }}>
                <div style={{
                  transform: "translate(-50%, -50%)", width: group.isPast ? "12px" : "20px", height: group.isPast ? "12px" : "20px", borderRadius: "50%",
                  background: group.isPast ? "#ccc" : C.yellow, border: `3px solid ${C.white}`,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)", cursor: "pointer", transition: "transform 0.2s",
                  ...(isActive && { transform: "translate(-50%, -50%) scale(1.5)" })
                }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Widget central en bas : affichage du/des séjours du lieu survolé */}
      <div
        onMouseEnter={() => activeKey && handleMouseEnter(activeKey)}
        onMouseLeave={handleMouseLeave}
        style={{ position: "absolute", bottom: "16px", left: 0, width: "100%", display: "flex", justifyContent: "center", zIndex: 200, pointerEvents: "none" }}
      >
        <AnimatePresence>
          {activeGroup && <MapPopup group={activeGroup} renderCard={renderCard} C={C} />}
        </AnimatePresence>
      </div>
    </div>
  );
}
