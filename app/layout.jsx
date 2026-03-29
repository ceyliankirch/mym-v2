import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat", // On crée une variable
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={montserrat.variable}>
      <body style={{ 
        margin: 0, 
        fontFamily: "var(--font-montserrat), sans-serif" 
      }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}