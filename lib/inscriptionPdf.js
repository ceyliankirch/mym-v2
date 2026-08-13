import PDFDocument from "pdfkit";
import path from "path";

const TEAL = "#114C5A";
const SAFFRON = "#FF9932";
const GRAY = "#5a7a84";

const FONTS_DIR = path.join(process.cwd(), "lib", "fonts");
const FONT_REGULAR = path.join(FONTS_DIR, "Montserrat-Regular.ttf");
const FONT_SEMIBOLD = path.join(FONTS_DIR, "Montserrat-SemiBold.ttf");
const FONT_BOLD = path.join(FONTS_DIR, "Montserrat-Bold.ttf");

function formatDate(date) {
  if (!date) return "Non renseignée";
  return new Date(date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

function section(doc, title) {
  doc.moveDown(1);
  doc.fontSize(11).fillColor(SAFFRON).font("Montserrat-Bold").text(title.toUpperCase(), { characterSpacing: 1 });
  doc.moveDown(0.3);
  doc.strokeColor("#e2e8f0").lineWidth(1).moveTo(doc.x, doc.y).lineTo(545, doc.y).stroke();
  doc.moveDown(0.5);
}

function row(doc, label, value) {
  const y = doc.y;
  doc.fontSize(10).fillColor(GRAY).font("Montserrat-SemiBold").text(label, 50, y, { width: 150 });
  doc.fontSize(10).fillColor(TEAL).font("Montserrat").text(value || "Non renseigné", 210, y, { width: 335 });
  doc.moveDown(0.6);
}

// 📄 Génère un récapitulatif PDF d'une inscription (enfant, représentant légal, séjour, documents requis)
export function generateInscriptionPdf({ enfant, client, sejour, documentsRequis }) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, size: "A4" });
    const chunks = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    // ── Polices ──
    doc.registerFont("Montserrat", FONT_REGULAR);
    doc.registerFont("Montserrat-SemiBold", FONT_SEMIBOLD);
    doc.registerFont("Montserrat-Bold", FONT_BOLD);
    doc.font("Montserrat");

    // ── En-tête ──
    doc.rect(0, 0, doc.page.width, 90).fill(TEAL);
    doc.fillColor("#ffffff").fontSize(20).font("Montserrat-Bold").text("Make Your Moment", 50, 32);
    doc.fillColor("#FFC801").fontSize(11).font("Montserrat").text("Récapitulatif d'inscription", 50, 58);

    doc.moveDown(4);
    doc.fillColor(TEAL).fontSize(16).font("Montserrat-Bold").text(sejour?.titre || "Séjour", 50, 110);
    doc.fontSize(10).fillColor(GRAY).font("Montserrat").text(`Document généré le ${formatDate(new Date())}`);

    // ── Enfant ──
    section(doc, "Participant");
    row(doc, "Prénom et nom", `${enfant?.prenom || ""} ${enfant?.nom || ""}`.trim());
    row(doc, "Date de naissance", formatDate(enfant?.dateNaissance));

    // ── Représentant légal ──
    section(doc, "Représentant légal");
    row(doc, "Prénom et nom", `${client?.prenom || ""} ${client?.nom || ""}`.trim());
    row(doc, "Email", client?.email);
    row(doc, "Téléphone", client?.telephone);

    // ── Séjour ──
    section(doc, "Séjour");
    row(doc, "Séjour", sejour?.titre);
    row(doc, "Lieu", sejour?.lieu);
    row(doc, "Dates", sejour?.dateDebut ? `Du ${formatDate(sejour.dateDebut)} au ${formatDate(sejour.dateFin)}` : "À définir");
    row(doc, "Tarif", sejour?.prix ? `${sejour.prix} €` : "Non renseigné");

    // ── Documents requis ──
    if (documentsRequis && documentsRequis.length > 0) {
      section(doc, "Documents à fournir");
      documentsRequis.forEach((docType) => {
        doc.fontSize(10).fillColor(TEAL).font("Montserrat").text(`•  ${docType}`, 50);
        doc.moveDown(0.3);
      });
    }

    doc.moveDown(2);
    doc.fontSize(9).fillColor(GRAY).font("Montserrat").text(
      "Ce document récapitule les informations transmises lors de l'inscription en ligne sur make-your-moment.com. Il ne constitue pas une confirmation de paiement.",
      50,
      doc.y,
      { width: 495 }
    );

    doc.end();
  });
}
