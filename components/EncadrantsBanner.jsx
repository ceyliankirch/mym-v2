"use client";
import { usePathname } from "next/navigation";

/* ─── BANDEAU "ENCADRÉ PAR DES ENSEIGNANTS..." ───────────────────────
   Affiché sur toutes les pages publiques, juste sous la navbar. */
export default function EncadrantsBanner() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  if (pathname?.startsWith("/inscription/totemia")) return null;

  return (
    <div className="bg-[#FFC801] py-3 px-4">
      <p className="text-center text-xs sm:text-sm font-black text-[#114C5A] uppercase tracking-wide">
        Encadré par des enseignants &amp; des éducateurs diplômés
      </p>
    </div>
  );
}
