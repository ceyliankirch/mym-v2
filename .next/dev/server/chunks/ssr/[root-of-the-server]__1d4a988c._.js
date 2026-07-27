module.exports = [
"[project]/lib/prisma.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
;
// ⚡ L'URL de ta base de données Neon
const connectionString = "postgresql://neondb_owner:npg_w9qzNQjgc1ED@ep-purple-cake-abueyggh-pooler.eu-west-2.aws.neon.tech/sejours?sslmode=require";
const prismaClientSingleton = ()=>{
    console.log("🚀 PRISMA : Démarrage en mode NATIF (Sans Adaptateur) !");
    // Comme on n'utilise plus l'adaptateur, Prisma AUTORISE le bloc datasources !
    return new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]({
        datasources: {
            db: {
                url: connectionString
            }
        }
    });
};
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma || prismaClientSingleton();
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/app/actions/auth.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/actions/auth.js
/* __next_internal_action_entry_do_not_use__ [{"40eca645d15c4fc7e4f50863014333b24caacbabc9":"registerUser"},"",""] */ __turbopack_context__.s([
    "registerUser",
    ()=>registerUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function registerUser(formData) {
    const prenom = formData.get("prenom");
    const nom = formData.get("nom");
    const telephone = formData.get("telephone");
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password || !prenom || !nom) {
        return {
            error: "Tous les champs obligatoires doivent être remplis."
        };
    }
    try {
        // 1. Vérifier si l'email existe déjà
        const existingUser = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
            where: {
                email
            }
        });
        if (existingUser) {
            return {
                error: "Cet email est déjà utilisé par un autre compte."
            };
        }
        // 2. Crypter le mot de passe
        const hashedPassword = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].hash(password, 10);
        // 3. Créer l'utilisateur dans la base Neon
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.create({
            data: {
                prenom,
                nom,
                telephone,
                email,
                password: hashedPassword,
                role: "PARENT"
            }
        });
        return {
            success: true
        };
    } catch (error) {
        console.error("Erreur d'inscription:", error);
        return {
            error: "Une erreur s'est produite lors de la création du compte."
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    registerUser
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(registerUser, "40eca645d15c4fc7e4f50863014333b24caacbabc9", null);
}),
"[project]/lib/resend.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendDocumentsRequestEmail",
    ()=>sendDocumentsRequestEmail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/resend/dist/index.mjs [app-rsc] (ecmascript)");
;
function getResendClient() {
    if (!process.env.RESEND_API_KEY) {
        return null;
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Resend"](process.env.RESEND_API_KEY);
}
async function sendDocumentsRequestEmail({ to, prenomEnfant, sejourTitre, documentsManquants }) {
    if (!to) {
        console.warn("Email address is missing, skipping email send");
        return {
            success: false,
            error: "No email address"
        };
    }
    const resend = getResendClient();
    if (!resend) {
        console.warn("RESEND_API_KEY not configured, skipping email send");
        return {
            success: false,
            error: "RESEND_API_KEY not configured"
        };
    }
    const documentsList = documentsManquants.map((doc)=>`<li style="color: #333; margin: 8px 0;">${doc}</li>`).join("");
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
            <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://makeyourmoment.fr"}/espace-famille?tab=documents" class="cta">
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
        const response = await resend.emails.send({
            from: "noreply@makeyourmoment.fr",
            to,
            subject: `Documents requis pour l'inscription de ${prenomEnfant}`,
            html
        });
        if (response.error) {
            console.error("Resend error:", response.error);
            return {
                success: false,
                error: response.error.message
            };
        }
        return {
            success: true,
            messageId: response.data?.id
        };
    } catch (error) {
        console.error("Error sending email:", error);
        return {
            success: false,
            error: error.message
        };
    }
}
}),
"[project]/lib/documents.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CATALOGUE_DOCUMENTS",
    ()=>CATALOGUE_DOCUMENTS,
    "getDocumentLabel",
    ()=>getDocumentLabel
]);
const CATALOGUE_DOCUMENTS = [
    "Fiche sanitaire de liaison",
    "Photocopie attestation d'assurance",
    "Attestation 25m natation",
    "Photocopie carte de mutuelle",
    "Photocopie carte vitale"
];
function getDocumentLabel(type) {
    return CATALOGUE_DOCUMENTS.find((doc)=>doc === type) || type;
}
}),
"[project]/app/actions/inscriptions.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40b893fc083e6aea39e2a38e3b87671a4a71ad1534":"getOrCreateClientForUser","60dab24c8298d0c0a2d106c5262d89564c1d931f2e":"creerEnfant","70999df2598895b34adbd0c203d6449cba5a913604":"creerInscription"},"",""] */ __turbopack_context__.s([
    "creerEnfant",
    ()=>creerEnfant,
    "creerInscription",
    ()=>creerInscription,
    "getOrCreateClientForUser",
    ()=>getOrCreateClientForUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$resend$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/resend.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$documents$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/documents.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
async function getOrCreateClientForUser(userId) {
    let client = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].client.findUnique({
        where: {
            userId
        }
    });
    if (client) return client;
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
        where: {
            id: userId
        }
    });
    if (!user) return null;
    client = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].client.upsert({
        where: {
            email: user.email || ""
        },
        update: {
            userId
        },
        create: {
            userId,
            nom: user.nom || "",
            prenom: user.prenom,
            email: user.email,
            telephone: user.telephone
        }
    });
    return client;
}
async function creerEnfant(clientId, enfantData) {
    if (!clientId || !enfantData?.prenom || !enfantData?.nom) {
        return {
            error: "Données incomplètes"
        };
    }
    try {
        const enfant = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].enfant.create({
            data: {
                clientId,
                prenom: enfantData.prenom,
                nom: enfantData.nom,
                dateNaissance: enfantData.dateNaissance ? new Date(enfantData.dateNaissance) : null
            }
        });
        return {
            success: true,
            enfant
        };
    } catch (error) {
        console.error("Error creating enfant:", error);
        return {
            error: "Erreur lors de la création de l'enfant"
        };
    }
}
async function creerInscription(sejourId, enfantData, userId) {
    if (!sejourId || !enfantData || !userId) {
        return {
            error: "Données incomplètes"
        };
    }
    try {
        const sejour = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].sejour.findUnique({
            where: {
                id: sejourId
            }
        });
        if (!sejour) {
            return {
                error: "Séjour introuvable"
            };
        }
        const client = await getOrCreateClientForUser(userId);
        if (!client) {
            return {
                error: "Impossible de créer/retrouver le client"
            };
        }
        let enfant;
        if (enfantData.id) {
            enfant = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].enfant.findUnique({
                where: {
                    id: enfantData.id
                }
            });
        } else {
            const result = await creerEnfant(client.id, enfantData);
            if (result.error) return result;
            enfant = result.enfant;
        }
        const inscription = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].inscription.create({
            data: {
                clientId: client.id,
                enfantId: enfant.id,
                sejourId,
                statut: "En attente"
            }
        });
        const documentsRequis = sejour.documentsRequis || [];
        const documentsManquants = [];
        for (const docType of documentsRequis){
            const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].document.findUnique({
                where: {
                    enfantId_type: {
                        enfantId: enfant.id,
                        type: docType
                    }
                }
            });
            if (!existing || existing.statut === "MANQUANT") {
                if (!existing) {
                    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].document.create({
                        data: {
                            enfantId: enfant.id,
                            type: docType,
                            statut: "MANQUANT"
                        }
                    });
                }
                documentsManquants.push(docType);
            }
        }
        if (documentsManquants.length > 0 && client.email) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$resend$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendDocumentsRequestEmail"])({
                to: client.email,
                prenomEnfant: enfant.prenom,
                sejourTitre: sejour.titre,
                documentsManquants
            });
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/espace-famille");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin");
        return {
            success: true,
            inscription
        };
    } catch (error) {
        console.error("Error creating inscription:", error);
        return {
            error: "Erreur lors de la création de l'inscription"
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getOrCreateClientForUser,
    creerEnfant,
    creerInscription
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getOrCreateClientForUser, "40b893fc083e6aea39e2a38e3b87671a4a71ad1534", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(creerEnfant, "60dab24c8298d0c0a2d106c5262d89564c1d931f2e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(creerInscription, "70999df2598895b34adbd0c203d6449cba5a913604", null);
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/node:assert [external] (node:assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:assert", () => require("node:assert"));

module.exports = mod;
}),
"[externals]/node:http [external] (node:http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:http", () => require("node:http"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/node:net [external] (node:net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:net", () => require("node:net"));

module.exports = mod;
}),
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:util [external] (node:util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:util", () => require("node:util"));

module.exports = mod;
}),
"[externals]/node:querystring [external] (node:querystring, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:querystring", () => require("node:querystring"));

module.exports = mod;
}),
"[externals]/node:events [external] (node:events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:events", () => require("node:events"));

module.exports = mod;
}),
"[externals]/node:zlib [external] (node:zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:zlib", () => require("node:zlib"));

module.exports = mod;
}),
"[externals]/node:perf_hooks [external] (node:perf_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:perf_hooks", () => require("node:perf_hooks"));

module.exports = mod;
}),
"[externals]/node:util/types [external] (node:util/types, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:util/types", () => require("node:util/types"));

module.exports = mod;
}),
"[externals]/node:worker_threads [external] (node:worker_threads, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:worker_threads", () => require("node:worker_threads"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/node:diagnostics_channel [external] (node:diagnostics_channel, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:diagnostics_channel", () => require("node:diagnostics_channel"));

module.exports = mod;
}),
"[externals]/node:tls [external] (node:tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:tls", () => require("node:tls"));

module.exports = mod;
}),
"[externals]/node:http2 [external] (node:http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:http2", () => require("node:http2"));

module.exports = mod;
}),
"[externals]/string_decoder [external] (string_decoder, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("string_decoder", () => require("string_decoder"));

module.exports = mod;
}),
"[externals]/node:url [external] (node:url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:url", () => require("node:url"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[externals]/node:console [external] (node:console, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:console", () => require("node:console"));

module.exports = mod;
}),
"[externals]/node:dns [external] (node:dns, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:dns", () => require("node:dns"));

module.exports = mod;
}),
"[project]/app/actions/documents.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40293d189fe727c59436fb160b0ce2b70ffbe56a96":"validerDocument","40a1304e0a32ffc6001c97f491a89fc21e363ad86e":"rejeterDocument","703af1beab00aedfe8340e90713a2d9174be2e2d29":"uploaderDocument"},"",""] */ __turbopack_context__.s([
    "rejeterDocument",
    ()=>rejeterDocument,
    "uploaderDocument",
    ()=>uploaderDocument,
    "validerDocument",
    ()=>validerDocument
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@vercel/blob/dist/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function uploaderDocument(enfantId, docType, file) {
    if (!enfantId || !docType || !file) {
        return {
            error: "Données incomplètes"
        };
    }
    try {
        const enfant = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].enfant.findUnique({
            where: {
                id: enfantId
            }
        });
        if (!enfant) {
            return {
                error: "Enfant introuvable"
            };
        }
        const blob = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["put"])(`documents/${enfantId}/${docType}-${Date.now()}-${file.name}`, file, {
            access: "public"
        });
        const document = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].document.upsert({
            where: {
                enfantId_type: {
                    enfantId,
                    type: docType
                }
            },
            update: {
                url: blob.url,
                statut: "EN_COURS"
            },
            create: {
                enfantId,
                type: docType,
                url: blob.url,
                statut: "EN_COURS"
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/espace-famille");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin");
        return {
            success: true,
            document
        };
    } catch (error) {
        console.error("Error uploading document:", error);
        return {
            error: "Erreur lors de l'upload du document"
        };
    }
}
async function validerDocument(documentId) {
    if (!documentId) {
        return {
            error: "ID document manquant"
        };
    }
    try {
        const document = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].document.update({
            where: {
                id: documentId
            },
            data: {
                statut: "VALIDE"
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/espace-famille");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin");
        return {
            success: true,
            document
        };
    } catch (error) {
        console.error("Error validating document:", error);
        return {
            error: "Erreur lors de la validation du document"
        };
    }
}
async function rejeterDocument(documentId) {
    if (!documentId) {
        return {
            error: "ID document manquant"
        };
    }
    try {
        const document = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].document.update({
            where: {
                id: documentId
            },
            data: {
                statut: "MANQUANT"
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/espace-famille");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin");
        return {
            success: true,
            document
        };
    } catch (error) {
        console.error("Error rejecting document:", error);
        return {
            error: "Erreur lors du rejet du document"
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    uploaderDocument,
    validerDocument,
    rejeterDocument
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(uploaderDocument, "703af1beab00aedfe8340e90713a2d9174be2e2d29", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(validerDocument, "40293d189fe727c59436fb160b0ce2b70ffbe56a96", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(rejeterDocument, "40a1304e0a32ffc6001c97f491a89fc21e363ad86e", null);
}),
"[project]/.next-internal/server/app/espace-famille/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/auth.js [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/app/actions/inscriptions.js [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/app/actions/documents.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/auth.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$inscriptions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/inscriptions.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$documents$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/documents.js [app-rsc] (ecmascript)");
;
;
;
;
;
}),
"[project]/.next-internal/server/app/espace-famille/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/auth.js [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/app/actions/inscriptions.js [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/app/actions/documents.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "40b893fc083e6aea39e2a38e3b87671a4a71ad1534",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$inscriptions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getOrCreateClientForUser"],
    "40eca645d15c4fc7e4f50863014333b24caacbabc9",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerUser"],
    "60dab24c8298d0c0a2d106c5262d89564c1d931f2e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$inscriptions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["creerEnfant"],
    "703af1beab00aedfe8340e90713a2d9174be2e2d29",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$documents$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["uploaderDocument"],
    "70999df2598895b34adbd0c203d6449cba5a913604",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$inscriptions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["creerInscription"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$espace$2d$famille$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$app$2f$actions$2f$inscriptions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$app$2f$actions$2f$documents$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/espace-famille/page/actions.js { ACTIONS_MODULE0 => "[project]/app/actions/auth.js [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/app/actions/inscriptions.js [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/app/actions/documents.js [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/auth.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$inscriptions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/inscriptions.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$documents$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/documents.js [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1d4a988c._.js.map