import { ServerClient } from "postmark";

function getPostmarkClient() {
  if (!process.env.POSTMARK_API_TOKEN) {
    return null;
  }
  return new ServerClient(process.env.POSTMARK_API_TOKEN);
}

const FROM_ADDRESS = "noreply@make-your-moment.com";

export async function sendDocumentsRequestEmail({
  to,
  prenomEnfant,
  sejourTitre,
  documentsManquants,
}) {
  if (!to) {
    console.warn("Email address is missing, skipping email send");
    return { success: false, error: "No email address" };
  }

  const client = getPostmarkClient();
  if (!client) {
    console.warn("POSTMARK_API_TOKEN not configured, skipping email send");
    return { success: false, error: "POSTMARK_API_TOKEN not configured" };
  }

  const documentsList = documentsManquants
    .map((doc) => `<li style="color: #333; margin: 8px 0;">${doc}</li>`)
    .join("");

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #114C5A; color: white; padding: 24px; border-radius: 12px; text-align: center; margin-bottom: 24px; }
          .header h1 { margin: 0; font-size: 24px; font-weight: 900; }
          .content { background: #f8fafc; padding: 24px; border-radius: 12px; }
          .content p { color: #555; line-height: 1.6; margin: 0 0 16px 0; }
          .docs-list { background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #FFC801; margin: 16px 0; }
          .docs-list ul { list-style: none; padding: 0; margin: 0; }
          .docs-list li { color: #333; margin: 8px 0; }
          .cta { display: inline-block; background: #FFC801; color: #114C5A; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; margin-top: 16px; }
          .footer { text-align: center; margin-top: 24px; font-size: 12px; color: #999; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Documents requis 📋</h1>
          </div>
          <div class="content">
            <p>Bonjour,</p>
            <p>Nous avons bien reçu l'inscription de <strong>${prenomEnfant}</strong> pour le séjour <strong>${sejourTitre}</strong>.</p>
            <p>Pour finaliser le dossier d'inscription, nous avons besoin des documents suivants :</p>
            <div class="docs-list">
              <ul>${documentsList}</ul>
            </div>
            <p>Vous pouvez télécharger ces documents dans votre espace famille.</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://make-your-moment.com"}/espace-famille?tab=documents" class="cta">
              Accéder à mon espace famille →
            </a>
            <p style="margin-top: 24px; font-size: 14px; color: #999;">
              Si vous avez des questions, n'hésitez pas à nous contacter.
            </p>
          </div>
          <div class="footer">
            <p>Make Your Moment - © 2025. Tous droits réservés.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const response = await client.sendEmail({
      From: FROM_ADDRESS,
      To: to,
      Subject: `Documents requis pour l'inscription de ${prenomEnfant}`,
      HtmlBody: html,
      MessageStream: "outbound",
    });

    return { success: true, messageId: response.MessageID };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
}

// ✅ Confirmation envoyée à la famille quand l'inscription est validée (paiement reçu)
export async function sendInscriptionConfirmationEmail({
  to,
  prenomEnfant,
  sejourTitre,
}) {
  if (!to) {
    console.warn("Email address is missing, skipping email send");
    return { success: false, error: "No email address" };
  }

  const client = getPostmarkClient();
  if (!client) {
    console.warn("POSTMARK_API_TOKEN not configured, skipping email send");
    return { success: false, error: "POSTMARK_API_TOKEN not configured" };
  }

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #114C5A; color: white; padding: 24px; border-radius: 12px; text-align: center; margin-bottom: 24px; }
          .header h1 { margin: 0; font-size: 24px; font-weight: 900; }
          .content { background: #f8fafc; padding: 24px; border-radius: 12px; }
          .content p { color: #555; line-height: 1.6; margin: 0 0 16px 0; }
          .cta { display: inline-block; background: #FFC801; color: #114C5A; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; margin-top: 16px; }
          .footer { text-align: center; margin-top: 24px; font-size: 12px; color: #999; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Inscription confirmée 🎉</h1>
          </div>
          <div class="content">
            <p>Bonjour,</p>
            <p>Nous vous confirmons que l'inscription de <strong>${prenomEnfant}</strong> au séjour <strong>${sejourTitre}</strong> est validée. Le paiement a bien été enregistré.</p>
            <p>Vous pouvez suivre le dossier depuis votre espace famille.</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://make-your-moment.com"}/espace-famille" class="cta">
              Accéder à mon espace famille →
            </a>
            <p style="margin-top: 24px; font-size: 14px; color: #999;">
              Si vous avez des questions, n'hésitez pas à nous contacter.
            </p>
          </div>
          <div class="footer">
            <p>Make Your Moment - © 2026. Tous droits réservés.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const response = await client.sendEmail({
      From: FROM_ADDRESS,
      To: to,
      Subject: `Inscription confirmée pour ${prenomEnfant} - ${sejourTitre}`,
      HtmlBody: html,
      MessageStream: "outbound",
    });

    return { success: true, messageId: response.MessageID };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
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
  const client = getPostmarkClient();
  if (!client) {
    console.warn("POSTMARK_API_TOKEN not configured, skipping email send");
    return { success: false, error: "POSTMARK_API_TOKEN not configured" };
  }

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #114C5A; color: white; padding: 24px; border-radius: 12px; text-align: center; margin-bottom: 24px; }
          .header h1 { margin: 0; font-size: 24px; font-weight: 900; }
          .content { background: #f8fafc; padding: 24px; border-radius: 12px; }
          .content p { color: #555; line-height: 1.6; margin: 0 0 16px 0; }
          .info-box { background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #FFC801; margin: 16px 0; }
          .info-box p { margin: 4px 0; }
          .footer { text-align: center; margin-top: 24px; font-size: 12px; color: #999; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Nouvelle inscription validée ✅</h1>
          </div>
          <div class="content">
            <p>Une inscription vient d'être validée (paiement confirmé) pour le séjour <strong>${sejourTitre}</strong>.</p>
            <div class="info-box">
              <p><strong>Enfant :</strong> ${prenomEnfant} ${nomEnfant}</p>
              <p><strong>Représentant légal :</strong> ${clientPrenom || ""} ${clientNom || ""}</p>
              <p><strong>Email :</strong> ${clientEmail || "Non renseigné"}</p>
              <p><strong>Téléphone :</strong> ${clientTelephone || "Non renseigné"}</p>
            </div>
            <p>Retrouvez le dossier complet dans le tableau de bord admin.</p>
          </div>
          <div class="footer">
            <p>Make Your Moment - © 2026. Tous droits réservés.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const response = await client.sendEmail({
      From: FROM_ADDRESS,
      To: "contact@make-your-moment.com",
      Subject: `Nouvelle inscription validée - ${sejourTitre}`,
      HtmlBody: html,
      MessageStream: "outbound",
    });

    return { success: true, messageId: response.MessageID };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
}
