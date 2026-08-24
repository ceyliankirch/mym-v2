"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { enregistrerVue } from "@/app/actions/analytics";

// 📊 Enregistre une vue à chaque changement de page (suivi interne, sans dépendance externe).
// N'enregistre rien sur /admin pour ne pas polluer les stats avec l'activité de l'équipe.
export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;

    const match = pathname.match(/^\/sejours-enfants-ados\/([^/]+)$/);
    const sejourId = match ? match[1] : undefined;

    enregistrerVue(pathname, sejourId).catch(() => {});
  }, [pathname]);

  return null;
}
