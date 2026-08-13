// app/layout.jsx
import { Montserrat } from "next/font/google";
import fs from "fs";
import path from "path";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PartnersMarquee from "@/components/PartnersMarquee";
import AuthProvider from "@/components/AuthProvider"; // ⚡ On importe le provider
import { prisma } from "@/lib/prisma";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
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
          <main>{children}</main>
          <PartnersMarquee logos={partnerLogos} />
          <Footer sejours={footerSejours} />
        </AuthProvider>
      </body>
    </html>
  );
}