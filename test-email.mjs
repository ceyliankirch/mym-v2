// Test d'envoi Brevo isolé de l'app.
// Usage :  node test-email.mjs     (lit automatiquement BREVO_API_KEY depuis .env)

import { readFileSync } from "node:fs";

// `node` ne charge pas .env tout seul (contrairement à Next.js) : on le fait ici.
try {
  for (const line of readFileSync(new URL("./.env", import.meta.url), "utf8").split("\n")) {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
} catch {
  // pas de .env : on se rabat sur l'environnement du shell
}

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
const FROM = { name: "Make Your Moment", email: "noreply@make-your-moment.com" };

const KEY = process.env.BREVO_API_KEY;
if (!KEY) {
  console.error("❌ BREVO_API_KEY absente de l'environnement.");
  process.exit(1);
}

async function send({ to, subject, html }) {
  const res = await fetch(BREVO_API_URL, {
    method: "POST",
    headers: {
      "api-key": KEY,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: FROM,
      to: [{ email: to }],
      subject,
      htmlContent: html,
    }),
  });
  const body = await res.text();
  console.log(`\n→ ${to}`);
  console.log(`   HTTP ${res.status} ${res.statusText}`);
  console.log(`   ${body}`);
  return res.ok;
}

const ok1 = await send({
  to: "ceyliankirch@gmail.com",
  subject: "[TEST] Nouvelle inscription reçue",
  html: "<h1>Test inscription</h1><p>Si tu reçois cet email, l'envoi transactionnel Brevo fonctionne.</p>",
});

const ok2 = await send({
  to: "contact@make-your-moment.com",
  subject: "[TEST] Confirmation d'inscription",
  html: "<h1>Test confirmation</h1><p>Si tu reçois cet email, l'envoi vers l'adresse de l'organisation fonctionne.</p>",
});

console.log(`\n${ok1 && ok2 ? "✅ Les deux appels ont réussi (201)." : "❌ Au moins un appel a échoué — voir le détail ci-dessus."}`);
process.exit(ok1 && ok2 ? 0 : 1);
