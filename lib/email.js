import fs from "fs";
import path from "path";

// 📮 Emails transactionnels via l'API Brevo (https://api.brevo.com/v3/smtp/email).
// Un seul point de contact avec le fournisseur : la fonction send() ci-dessous.
const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
const FROM = { name: "Make Your Moment", email: "noreply@make-your-moment.com" };
const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://mym-v2.vercel.app";

const C = {
  teal: "#114C5A",
  yellow: "#FFC801",
  saffron: "#FF9932",
  arctic: "#F1F6F4",
  red: "#e5484d",
  green: "#10b981",
};

function formatDate(dateStr) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

function formatPeriode(dateDebut, dateFin) {
  const d1 = formatDate(dateDebut);
  const d2 = formatDate(dateFin);
  if (!d1) return "";
  if (!d2 || d1 === d2) return `le ${d1}`;
  return `du ${d1} au ${d2}`;
}

/* ─── ICÔNES (documents) ──────────────────────────────────────────
   Outlook desktop (moteur Word) ne supporte pas le SVG inline : on
   utilise des emoji, qui s'affichent partout sans dépendance externe. */
const ICONS = {
  sante: "🩺",
  assurance: "🛡️",
  natation: "🏊",
  carte: "💳",
  document: "📄",
};

function iconForDocument(type) {
  const t = (type || "").toLowerCase();
  if (t.includes("sanitaire") || t.includes("médic")) return ICONS.sante;
  if (t.includes("assurance")) return ICONS.assurance;
  if (t.includes("natation") || t.includes("nage")) return ICONS.natation;
  if (t.includes("mutuelle") || t.includes("vitale") || t.includes("carte")) return ICONS.carte;
  return ICONS.document;
}

/* ─── GABARIT COMMUN (logo + habillage) ──────────────────────────── */
function emailShell({ title, emoji, bodyHtml }) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body { margin: 0; padding: 0; background: ${C.arctic}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
          a { color: ${C.teal}; }
        </style>
      </head>
      <body style="margin:0; padding:0; background:${C.arctic};">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.arctic}; padding: 32px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%;">
                <tr>
                  <td align="center" style="padding-bottom: 20px;">
                    <img src="${SITE_URL}/mym-logo-192.png" alt="Make Your Moment" width="56" height="56" style="border-radius: 14px; display:block;" />
                  </td>
                </tr>
                <tr>
                  <td bgcolor="${C.teal}" style="background-color: ${C.teal}; border-radius: 24px 24px 0 0; padding: 32px 32px 28px;" align="center">
                    <p style="margin:0 0 8px; font-size:11px; font-weight:800; letter-spacing:1.5px; text-transform:uppercase; color:${C.yellow};">Make Your Moment</p>
                    <h1 style="margin:0; font-size: 24px; font-weight: 900; color: #ffffff !important;">${emoji ? emoji + " " : ""}${title}</h1>
                  </td>
                </tr>
                <tr>
                  <td bgcolor="#ffffff" style="background-color: #ffffff; border-radius: 0 0 24px 24px; padding: 32px;">
                    ${bodyHtml}
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding: 24px 16px 0;">
                    <p style="margin:0 0 12px; font-size:12px; color:#8aaa; line-height:1.6;">
                      <span style="color:#000000; font-weight:700;">Make Your Moment</span> — Association loi 1901
                    </p>
                    <a href="${SITE_URL}" style="display:inline-block; background:${C.yellow}; color:${C.teal}; text-decoration:none; font-size:12px; font-weight:800; padding:9px 22px; border-radius:999px;">make-your-moment.com</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

function paragraph(text) {
  return `<p style="margin:0 0 16px; font-size:15px; line-height:1.7; color:#41545c;">${text}</p>`;
}

function ctaButton(label, href, color = C.yellow, textColor = C.teal) {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 8px 0 24px;">
      <tr>
        <td style="border-radius: 999px; background: ${color};">
          <a href="${href}" style="display:inline-block; padding: 14px 28px; font-size:14px; font-weight:800; color:${textColor}; text-decoration:none;">${label}</a>
        </td>
      </tr>
    </table>
  `;
}

function documentsBox({ title, documents }) {
  if (!documents || documents.length === 0) return "";
  const rows = documents
    .map(
      (doc) => `
      <tr>
        <td style="padding: 10px 0;">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td style="width:36px; height:36px; border-radius:10px; background:${C.saffron}; font-size:18px; line-height:36px;" align="center" valign="middle">${iconForDocument(doc)}</td>
            <td style="padding-left:12px; font-size:14px; font-weight:700; color:${C.teal};">${doc}</td>
          </tr></table>
        </td>
      </tr>`
    )
    .join("");

  return `
    <div style="background:${C.arctic}; border-radius:16px; padding:20px 24px; margin: 8px 0 24px;">
      <p style="margin:0 0 8px; font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:1px; color:${C.teal};">${title}</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
    </div>
  `;
}

// 🪜 Bloc "Prochaines étapes" réutilisable (paiement + documents à fournir)
function prochainesEtapes({ lienPaiementCIC, documents, documentsTitle = "Documents à fournir" }) {
  const aDesDocuments = documents && documents.length > 0;
  if (!lienPaiementCIC && !aDesDocuments) return "";

  let etape = 1;
  return `
    <p style="margin:0 0 12px; font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:1px; color:${C.teal};">Prochaines étapes</p>
    ${lienPaiementCIC ? `
      ${paragraph(`${etape++}. Régler le séjour en ligne, en toute sécurité :`)}
      ${ctaButton("Procéder au paiement →", lienPaiementCIC, C.yellow, C.teal)}
    ` : ""}
    ${aDesDocuments ? `
      ${paragraph(`${etape++}. Nous transmettre les documents suivants :`)}
      ${documentsBox({ title: documentsTitle, documents })}
    ` : ""}
  `;
}

function footNote(text) {
  return `<p style="margin: 24px 0 0; font-size:13px; color:#8aaa; line-height:1.6;">${text}</p>`;
}

async function send({ to, subject, html, attachments }) {
  if (!process.env.BREVO_API_KEY) {
    console.warn("BREVO_API_KEY not configured, skipping email send");
    return { success: false, error: "BREVO_API_KEY not configured" };
  }
  try {
    const res = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: FROM,
        to: [{ email: to }],
        subject,
        htmlContent: html,
        ...(attachments && attachments.length > 0 ? { attachment: attachments } : {}),
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Error sending email (Brevo):", res.status, detail);
      return { success: false, error: `Brevo ${res.status}: ${detail}` };
    }

    const data = await res.json().catch(() => ({}));
    return { success: true, messageId: data.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
}

// Format de pièce jointe attendu par Brevo : { name, content (base64) }
function pdfAttachment(pdfBuffer, filename) {
  if (!pdfBuffer) return [];
  return [
    {
      name: filename,
      content: pdfBuffer.toString("base64"),
    },
  ];
}

// 🩺 Fiche sanitaire de liaison (document CERFA statique fourni par l'association)
function ficheSanitaireAttachment() {
  try {
    const filePath = path.join(process.cwd(), "public", "CERFA FICHE SANITAIRE DE LIAISON 2025 2026 (3).pdf");
    const buffer = fs.readFileSync(filePath);
    return pdfAttachment(buffer, "fiche-sanitaire-de-liaison.pdf");
  } catch (e) {
    console.error("Erreur lecture fiche sanitaire de liaison", e);
    return [];
  }
}

function formatMontant(montant) {
  if (montant === undefined || montant === null) return null;
  return `${Number(montant).toFixed(2).replace(".", ",")} €`;
}

// 💳 Pré-inscription envoyée quand la famille a choisi de régler par carte bleue :
// elle doit encore payer (bouton vers le bon lien, standard ou Val-de-Marne) avant
// de recevoir l'email "Inscription validée" (avec la fiche sanitaire à fournir).
export async function sendPreInscriptionEmail({
  to,
  prenomEnfant,
  sejourTitre,
  lienPaiement,
  montantTotal,
  documentsManquants,
  pdfBuffer,
}) {
  if (!to) return { success: false, error: "No email address" };

  const montant = formatMontant(montantTotal);

  const html = emailShell({
    title: "Pré-inscription enregistrée",
    emoji: "📝",
    bodyHtml: `
      ${paragraph("Bonjour,")}
      ${paragraph(`Nous avons bien reçu la pré-inscription de <strong>${prenomEnfant}</strong> pour le séjour <strong>${sejourTitre}</strong>. Vous trouverez en pièce jointe un récapitulatif.`)}
      ${paragraph("Pour finaliser le dossier, il ne reste plus qu'à :")}
      ${prochainesEtapes({
        lienPaiementCIC: lienPaiement,
        documents: documentsManquants,
      })}
      ${montant ? footNote(`Montant à régler : <strong>${montant}</strong>. Si vous avez déjà réglé le séjour, vous pouvez ignorer le bouton de paiement ci-dessus.`) : ""}
    `,
  });

  return send({
    to,
    subject: `Pré-inscription de ${prenomEnfant} - ${sejourTitre}`,
    html,
    attachments: pdfAttachment(pdfBuffer, "recapitulatif-inscription.pdf"),
  });
}

// 📩 Accusé de réception envoyé dès qu'une inscription est soumise (aucun document à fournir)
export async function sendInscriptionReceivedEmail({ to, prenomEnfant, sejourTitre, lienPaiementCIC, pdfBuffer }) {
  if (!to) return { success: false, error: "No email address" };

  const html = emailShell({
    title: "Inscription bien reçue",
    emoji: "📩",
    bodyHtml: `
      ${paragraph("Bonjour,")}
      ${paragraph(`Nous avons le plaisir de vous confirmer la bonne réception de l'inscription de <strong>${prenomEnfant}</strong> au séjour <strong>${sejourTitre}</strong>.`)}
      ${paragraph("Vous trouverez en pièce jointe un récapitulatif de votre inscription. Votre dossier est en cours de traitement par notre équipe, vous recevrez un nouvel email dès qu'il sera validé.")}
      ${prochainesEtapes({ lienPaiementCIC })}
      ${ctaButton("Accéder à mon espace famille →", `${SITE_URL}/espace-famille`)}
      ${footNote("Une question en attendant ? N'hésitez pas à nous contacter, notre équipe se fera un plaisir de vous répondre.")}
    `,
  });

  return send({
    to,
    subject: `Inscription bien reçue pour ${prenomEnfant} - ${sejourTitre}`,
    html,
    attachments: pdfAttachment(pdfBuffer, "recapitulatif-inscription.pdf"),
  });
}

// 📋 Demande de documents envoyée après l'inscription
export async function sendDocumentsRequestEmail({ to, prenomEnfant, sejourTitre, documentsManquants, lienPaiementCIC, pdfBuffer }) {
  if (!to) return { success: false, error: "No email address" };

  const html = emailShell({
    title: "Confirmation d'inscription",
    emoji: "✅",
    bodyHtml: `
      ${paragraph("Bonjour,")}
      ${paragraph(`Nous avons bien reçu l'inscription de <strong>${prenomEnfant}</strong> pour le séjour <strong>${sejourTitre}</strong>. Vous trouverez en pièce jointe un récapitulatif de votre inscription.`)}
      ${paragraph("Pour finaliser le dossier, il ne reste plus qu'à :")}
      ${prochainesEtapes({ lienPaiementCIC, documents: documentsManquants })}
      ${ctaButton("Déposer mes documents →", `${SITE_URL}/espace-famille?tab=documents`)}
      ${footNote("Une question sur l'un de ces documents ? N'hésitez pas à nous contacter.")}
    `,
  });

  return send({
    to,
    subject: `Confirmation d'inscription de ${prenomEnfant} - ${sejourTitre}`,
    html,
    attachments: pdfAttachment(pdfBuffer, "recapitulatif-inscription.pdf"),
  });
}

// ✅ Confirmation envoyée à la famille quand l'inscription est validée (paiement reçu)
export async function sendInscriptionConfirmationEmail({
  to,
  prenomEnfant,
  nomEnfant,
  sejourTitre,
  dateDebut,
  dateFin,
  lienPaiementCIC,
  documentsRequis,
  montantARegler,
}) {
  if (!to) return { success: false, error: "No email address" };

  const periode = formatPeriode(dateDebut, dateFin);
  const nomComplet = [prenomEnfant, nomEnfant].filter(Boolean).join(" ");
  const montant = formatMontant(montantARegler);

  const html = emailShell({
    title: "Inscription validée !",
    emoji: "🎉",
    bodyHtml: `
      ${paragraph("Bonjour,")}
      ${paragraph(`Nous avons le plaisir de vous annoncer que l'inscription de <strong>${nomComplet || prenomEnfant}</strong> au séjour <strong>${sejourTitre}</strong>${periode ? ` ${periode}` : ""} a été validée !`)}
      ${montant ? paragraph(`Pour rappel, le montant à régler pour ce séjour est de <strong>${montant}</strong>.`) : ""}
      ${paragraph("Vous trouverez ci-joint la fiche sanitaire de liaison : merci de la remplir et de l'uploader dans votre espace famille.")}
      ${prochainesEtapes({ lienPaiementCIC, documents: documentsRequis })}
      ${ctaButton("Accéder à mon espace famille →", `${SITE_URL}/espace-famille?tab=documents`)}
      ${footNote("Si vous avez la moindre question sur la suite, notre équipe reste à votre disposition.")}
    `,
  });

  return send({
    to,
    subject: `Inscription confirmée pour ${prenomEnfant} - ${sejourTitre}`,
    html,
    attachments: ficheSanitaireAttachment(),
  });
}

// ❌ Notification envoyée à la famille quand l'inscription est annulée
export async function sendInscriptionCancelledEmail({ to, prenomEnfant, sejourTitre }) {
  if (!to) return { success: false, error: "No email address" };

  const html = emailShell({
    title: "Inscription annulée",
    emoji: "❌",
    bodyHtml: `
      ${paragraph("Bonjour,")}
      ${paragraph(`L'inscription de <strong>${prenomEnfant}</strong> au séjour <strong>${sejourTitre}</strong> a été annulée.`)}
      ${footNote("Si vous pensez qu'il s'agit d'une erreur, ou pour toute question, n'hésitez pas à nous contacter — nous serons ravis de vous aider.")}
    `,
  });

  return send({ to, subject: `Inscription annulée pour ${prenomEnfant} - ${sejourTitre}`, html });
}

const NOTIF_INFO_ROW = (label, value) => `
  <tr>
    <td style="padding: 6px 0; font-size:13px; color:#8aaa; font-weight:700; width:140px;">${label}</td>
    <td style="padding: 6px 0; font-size:13px; color:${C.teal}; font-weight:700;">${value || "Non renseigné"}</td>
  </tr>
`;

// 🔔 Notification interne envoyée à l'organisation dès qu'une nouvelle inscription est soumise
export async function sendNewInscriptionSubmittedEmail({
  prenomEnfant,
  nomEnfant,
  dateNaissanceEnfant,
  sejourTitre,
  clientNom,
  clientPrenom,
  clientEmail,
  clientTelephone,
  pdfBuffer,
}) {
  const html = emailShell({
    title: "Nouvelle inscription reçue",
    emoji: "📥",
    bodyHtml: `
      ${paragraph(`Une nouvelle inscription vient d'être soumise pour le séjour <strong>${sejourTitre}</strong>. Le récapitulatif complet est joint en pièce jointe (PDF).`)}
      <div style="background:${C.arctic}; border-radius:16px; padding:20px 24px; margin: 8px 0 24px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${NOTIF_INFO_ROW("Enfant", `${prenomEnfant} ${nomEnfant}`)}
          ${NOTIF_INFO_ROW("Né(e) le", formatDate(dateNaissanceEnfant) || "Non renseigné")}
          ${NOTIF_INFO_ROW("Représentant légal", `${clientPrenom || ""} ${clientNom || ""}`)}
          ${NOTIF_INFO_ROW("Email", clientEmail)}
          ${NOTIF_INFO_ROW("Téléphone", clientTelephone)}
        </table>
      </div>
      ${ctaButton("Ouvrir le tableau de bord →", `${SITE_URL}/admin`)}
    `,
  });

  return send({
    to: "contact@make-your-moment.com",
    subject: `Nouvelle inscription reçue - ${sejourTitre}`,
    html,
    attachments: pdfAttachment(pdfBuffer, "recapitulatif-inscription.pdf"),
  });
}

// 🔔 Notification interne envoyée à l'organisation quand une inscription est validée
export async function sendNewInscriptionNotificationEmail({
  prenomEnfant,
  nomEnfant,
  sejourTitre,
  clientNom,
  clientPrenom,
  clientEmail,
  clientTelephone,
}) {
  const html = emailShell({
    title: "Nouvelle inscription validée",
    emoji: "✅",
    bodyHtml: `
      ${paragraph(`Une inscription vient d'être validée (paiement confirmé) pour le séjour <strong>${sejourTitre}</strong>.`)}
      <div style="background:${C.arctic}; border-radius:16px; padding:20px 24px; margin: 8px 0 24px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${NOTIF_INFO_ROW("Enfant", `${prenomEnfant} ${nomEnfant}`)}
          ${NOTIF_INFO_ROW("Représentant légal", `${clientPrenom || ""} ${clientNom || ""}`)}
          ${NOTIF_INFO_ROW("Email", clientEmail)}
          ${NOTIF_INFO_ROW("Téléphone", clientTelephone)}
        </table>
      </div>
      ${ctaButton("Ouvrir le tableau de bord →", `${SITE_URL}/admin`)}
    `,
  });

  return send({ to: "contact@make-your-moment.com", subject: `Nouvelle inscription validée - ${sejourTitre}`, html });
}

// 👋 Email de bienvenue envoyé à la création d'un compte
export async function sendWelcomeEmail({ to, prenom }) {
  if (!to) return { success: false, error: "No email address" };

  const html = emailShell({
    title: "Bienvenue chez Make Your Moment !",
    emoji: "👋",
    bodyHtml: `
      ${paragraph(`Bonjour ${prenom || ""},`)}
      ${paragraph("Votre compte a bien été créé. Vous pouvez dès maintenant ajouter vos enfants et les inscrire à nos séjours.")}
      ${ctaButton("Accéder à mon espace famille →", `${SITE_URL}/espace-famille`)}
      ${footNote("Une question ? Notre équipe se fera un plaisir de vous répondre.")}
    `,
  });

  return send({ to, subject: "Bienvenue chez Make Your Moment", html });
}

// 🔑 Email de réinitialisation de mot de passe
export async function sendPasswordResetEmail({ to, prenom, resetLink }) {
  if (!to) return { success: false, error: "No email address" };

  const html = emailShell({
    title: "Réinitialisation de mot de passe",
    emoji: "🔑",
    bodyHtml: `
      ${paragraph(`Bonjour ${prenom || ""},`)}
      ${paragraph("Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le bouton ci-dessous pour en choisir un nouveau. Ce lien est valable 1 heure.")}
      ${ctaButton("Réinitialiser mon mot de passe →", resetLink)}
      ${footNote("Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet email en toute sécurité.")}
    `,
  });

  return send({ to, subject: "Réinitialisation de votre mot de passe", html });
}

// ✅ Email envoyé à la famille quand un document est validé par l'équipe
export async function sendDocumentValidatedEmail({ to, prenomEnfant, docType }) {
  if (!to) return { success: false, error: "No email address" };

  const html = emailShell({
    title: "Document validé",
    emoji: "✅",
    bodyHtml: `
      ${paragraph("Bonjour,")}
      ${paragraph(`Le document <strong>${docType}</strong> transmis pour <strong>${prenomEnfant}</strong> a bien été vérifié et validé par notre équipe.`)}
      ${ctaButton("Voir mes documents →", `${SITE_URL}/espace-famille?tab=documents`)}
      ${footNote("Merci pour votre réactivité !")}
    `,
  });

  return send({ to, subject: `Document validé — ${docType}`, html });
}

// ⚠️ Email envoyé à la famille quand un document est rejeté par l'équipe
export async function sendDocumentRejectedEmail({ to, prenomEnfant, docType }) {
  if (!to) return { success: false, error: "No email address" };

  const html = emailShell({
    title: "Document à renvoyer",
    emoji: "⚠️",
    bodyHtml: `
      ${paragraph("Bonjour,")}
      ${paragraph(`Le document <strong>${docType}</strong> transmis pour <strong>${prenomEnfant}</strong> n'a pas pu être validé par notre équipe et doit être renvoyé.`)}
      ${ctaButton("Renvoyer ce document →", `${SITE_URL}/espace-famille?tab=documents`)}
      ${footNote("Une question sur ce document ? N'hésitez pas à nous contacter.")}
    `,
  });

  return send({ to, subject: `Document à renvoyer — ${docType}`, html });
}

/* ─── NEWSLETTER / LISTE DE DIFFUSION ─────────────────────────────
   Les campagnes ne sont pas envoyées par l'application : la liste de
   contacts est gérée dans l'admin (import/export CSV, tags) puis
   exportée vers Brevo, où l'emailing est composé et envoyé manuellement.
   Seuls les emails transactionnels ci-dessus partent via l'API Brevo. */
