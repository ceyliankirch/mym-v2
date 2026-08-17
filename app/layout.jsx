// app/layout.jsx
import localFont from "next/font/local";
import fs from "fs";
import path from "path";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PartnersMarquee from "@/components/PartnersMarquee";
import EncadrantsBanner from "@/components/EncadrantsBanner";
import AuthProvider from "@/components/AuthProvider"; // ⚡ On importe le provider
import { prisma } from "@/lib/prisma";

// ⚡ Police auto-hébergée (au lieu de next/font/google) : évite les échecs de
// build Vercel quand fonts.gstatic.com est injoignable au moment du build.
const montserrat = localFont({
  src: [
    { path: "./fonts/Montserrat-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Montserrat-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/Montserrat-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/Montserrat-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "./fonts/Montserrat-Black.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Make Your Moment",
    template: "%s - Make Your Moment",
  },
  description: "Association Make Your Moment - Séjours, colonies de vacances et sorties pour enfants, ados et séniors.",
};

export default async function RootLayout({ children }) {
  // ⚡ Séjours publiés pour la colonne "Séjours" du pied de page
  let footerSejours = [];
  try {
    footerSejours = await prisma.sejour.findMany({
      where: { statut: "Publié" },
      orderBy: { dateDebut: "asc" },
      take: 5,
      select: { id: true, titre: true },
    });
  } catch (e) {
    console.error("Erreur récupération séjours pour le footer", e);
  }

  // ⚡ Logos partenaires : lus depuis public/partenaires (déposer un fichier suffit)
  let partnerLogos = [];
  try {
    const partenairesDir = path.join(process.cwd(), "public", "partenaires");
    partnerLogos = fs
      .readdirSync(partenairesDir)
      .filter((f) => /\.(png|jpe?g|svg|webp)$/i.test(f));
  } catch (e) {
    partnerLogos = [];
  }

  return (
    <html lang="fr" className={montserrat.variable}>
      <body style={{
        margin: 0,
        fontFamily: "var(--font-montserrat), sans-serif"
      }}>
        {/* ⚡ On englobe toute l'application avec le AuthProvider */}
        <AuthProvider>
          <Navbar />
          <EncadrantsBanner />
          <main>{children}</main>
          <PartnersMarquee logos={partnerLogos} />
          <Footer sejours={footerSejours} />
        </AuthProvider>
      </body>
    </html>
  );
}