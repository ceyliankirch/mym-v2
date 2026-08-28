import PDFDocument from "pdfkit";
import path from "path";

const TEAL = "#114C5A";
const SAFFRON = "#FF9932";
const GRAY = "#5a7a84";
const LINE = "#c9d6da";

const FONTS_DIR = path.join(process.cwd(), "lib", "fonts");
const FONT_REGULAR = path.join(FONTS_DIR, "Montserrat-Regular.ttf");
const FONT_SEMIBOLD = path.join(FONTS_DIR, "Montserrat-SemiBold.ttf");
const FONT_BOLD = path.join(FONTS_DIR, "Montserrat-Bold.ttf");

// Sections retirées de la version "Totemia" (repérées par le libellé du titre de
// section). Les champs situés dessous, jusqu'à la section suivante, sont retirés.
const SECTIONS_EXCLUES = /assurance|paiement|tarif/i;

function filtrerChamps(fields) {
  const out = [];
  let exclue = false;
  for (const f of fields) {
    if (f.type === "section") {
      exclue = SECTIONS_EXCLUES.test(f.label || "");
      if (!exclue) out.push(f);
      continue;
    }
    if (!exclue) out.push(f);
  }
  return out;
}

function formatDate(date) {
  if (!date) return null;
  return new Date(date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

const LEFT = 50;
const RIGHT = 545;
const WIDTH = RIGHT - LEFT;

function ensureSpace(doc, needed) {
  if (doc.y + needed > doc.page.height - 60) doc.addPage();
}

function blankLine(doc, y) {
  doc.strokeColor(LINE).lineWidth(1).moveTo(LEFT, y).lineTo(RIGHT, y).stroke();
}

/** 📄 Formulaire d'inscription "Totemia" à imprimer et remplir à la main. */
export function generateTotemiaFormPdf(sejour) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, size: "A4" });
    const chunks = [];
    doc.on("data", (c) => chunks.push(c));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc.registerFont("Montserrat", FONT_REGULAR);
    doc.registerFont("Montserrat-SemiBold", FONT_SEMIBOLD);
    doc.registerFont("Montserrat-Bold", FONT_BOLD);
    doc.font("Montserrat");

    // ── En-tête ──
    doc.rect(0, 0, doc.page.width, 90).fill(TEAL);
    doc.fillColor("#ffffff").fontSize(20).font("Montserrat-Bold").text("Make Your Moment", 50, 32);
    doc.fillColor("#FFC801").fontSize(11).font("Montserrat").text("Formulaire d'inscription", 50, 58);

    doc.fillColor(TEAL).fontSize(16).font("Montserrat-Bold").text(sejour?.titre || "Séjour", 50, 110);

    const dates = sejour?.dateDebut
      ? `Du ${formatDate(sejour.dateDebut)} au ${formatDate(sejour.dateFin) || "…"}`
      : null;
    const meta = [sejour?.lieu, dates, sejour?.prix ? `${sejour.prix} €` : null].filter(Boolean).join("  •  ");
    doc.fontSize(10).fillColor(GRAY).font("Montserrat").text(meta || " ", 50, doc.y + 4);
    doc.moveDown(1);

    doc.fontSize(9).fillColor(GRAY).font("Montserrat").text(
      "Merci de compléter ce formulaire en lettres capitales, puis de le remettre à l'organisation avec les documents demandés.",
      LEFT, doc.y, { width: WIDTH }
    );
    doc.moveDown(1);

    // ── Champs ──
    let champs = [];
    try {
      champs = sejour?.formSchema ? filtrerChamps(JSON.parse(sejour.formSchema)) : [];
    } catch (e) {
      champs = [];
    }

    if (champs.length === 0) {
      doc.fontSize(11).fillColor(GRAY).text("Aucun champ configuré pour ce séjour.", LEFT, doc.y);
    }

    champs.forEach((field) => {
      const label = field.label || "";

      if (field.type === "section") {
        ensureSpace(doc, 60);
        doc.moveDown(1);
        doc.fontSize(11).fillColor(SAFFRON).font("Montserrat-Bold").text(label.toUpperCase(), LEFT, doc.y, { characterSpacing: 1, width: WIDTH });
        doc.moveDown(0.3);
        blankLine(doc, doc.y);
        doc.moveDown(0.6);
        return;
      }

      if (field.type === "info") {
        ensureSpace(doc, 50);
        doc.fontSize(9).fillColor(GRAY).font("Montserrat").text(label, LEFT, doc.y, { width: WIDTH });
        doc.moveDown(0.6);
        return;
      }

      if (field.type === "checkbox") {
        ensureSpace(doc, 40);
        const y = doc.y;
        doc.rect(LEFT, y + 1, 11, 11).strokeColor(TEAL).lineWidth(1).stroke();
        doc.fontSize(9.5).fillColor(TEAL).font("Montserrat").text(label + (field.required ? " *" : ""), LEFT + 20, y, { width: WIDTH - 20 });
        doc.moveDown(0.6);
        return;
      }

      // text / email / tel / date / textarea / select
      ensureSpace(doc, field.type === "textarea" ? 90 : 44);
      doc.fontSize(10).fillColor(GRAY).font("Montserrat-SemiBold").text(label + (field.required ? " *" : ""), LEFT, doc.y, { width: WIDTH });
      doc.moveDown(0.35);

      if (field.type === "select") {
        const opts = (field.options || "").split(",").map((o) => o.trim()).filter(Boolean);
        if (opts.length) {
          opts.forEach((opt) => {
            const y = doc.y;
            doc.rect(LEFT, y + 1, 10, 10).strokeColor(TEAL).lineWidth(1).stroke();
            doc.fontSize(9.5).fillColor(TEAL).font("Montserrat").text(opt, LEFT + 18, y, { width: WIDTH - 18 });
            doc.moveDown(0.35);
          });
        } else {
          doc.moveDown(0.8);
          blankLine(doc, doc.y);
        }
        doc.moveDown(0.7);
        return;
      }

      if (field.type === "textarea") {
        for (let i = 0; i < 3; i++) {
          doc.moveDown(1);
          blankLine(doc, doc.y);
        }
        doc.moveDown(0.9);
        return;
      }

      if (field.type === "date") {
        const y = doc.y + 10;
        doc.fontSize(11).fillColor(GRAY).font("Montserrat").text("____ / ____ / ________", LEFT, y);
        doc.moveDown(1.2);
        return;
      }

      // text / email / tel
      doc.moveDown(0.9);
      blankLine(doc, doc.y);
      doc.moveDown(0.9);
    });

    // ── Signature ──
    ensureSpace(doc, 90);
    doc.moveDown(1.5);
    doc.fontSize(10).fillColor(GRAY).font("Montserrat-SemiBold").text("Date et signature du représentant légal :", LEFT, doc.y, { width: WIDTH });
    doc.moveDown(2.5);
    blankLine(doc, doc.y);

    doc.end();
  });
}
