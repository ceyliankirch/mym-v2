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
/* __next_internal_action_entry_do_not_use__ [{"40b81e21ee2402dfdc17b86f665f61fca694f941a8":"registerUser"},"",""] */ __turbopack_context__.s([
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(registerUser, "40b81e21ee2402dfdc17b86f665f61fca694f941a8", null);
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
"[project]/app/actions/sejours.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/actions/sejours.js
/* __next_internal_action_entry_do_not_use__ [{"40727e276909ecfe61dca975777c2948c3b2fed3aa":"creerSejour","40bc891cdc0f488c348c435c37eda1827ffb08df6a":"supprimerSejour","600f4e201cc5decf890e1dd8f59771eb367cd16d5f":"toggleEnAvant","60155bc9a34b8f9ea67650ca4dc4f352ad30b2956f":"toggleStatut","60cde51aa568503e49ff7fc2ed93b88f0c67876fff":"modifierSejour"},"",""] */ __turbopack_context__.s([
    "creerSejour",
    ()=>creerSejour,
    "modifierSejour",
    ()=>modifierSejour,
    "supprimerSejour",
    ()=>supprimerSejour,
    "toggleEnAvant",
    ()=>toggleEnAvant,
    "toggleStatut",
    ()=>toggleStatut
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@vercel/blob/dist/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function creerSejour(formData) {
    const titre = formData.get("titre");
    const lieu = formData.get("lieu");
    const saison = formData.get("saison");
    const statut = formData.get("statut");
    const dateDebut = formData.get("dateDebut");
    const dateFin = formData.get("dateFin");
    const places = parseInt(formData.get("places")) || 0;
    const tranchesAge = formData.get("tranchesAge");
    // ⚡ Nouveaux champs récupérés du formulaire
    const shortDescription = formData.get("shortDescription") || "";
    const programme = formData.get("programme") || "";
    const infosPratiques = formData.get("infosPratiques") || "";
    const adresseComplete = formData.get("adresseComplete") || "";
    const formSchema = formData.get("formSchema") || "";
    const prixArray = formData.getAll("prix").map((p)=>parseFloat(p)).filter((p)=>!isNaN(p));
    const prixPrincipal = prixArray[0] || 0;
    // Gestion de l'image de couverture
    const imageFile = formData.get("image");
    let imageUrl = null;
    if (imageFile && imageFile.size > 0) {
        const blob = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["put"])(`sejours/${Date.now()}-${imageFile.name}`, imageFile, {
            access: 'public'
        });
        imageUrl = blob.url;
    }
    // ⚡ Gestion de la Galerie (Multiples images)
    const galerieFiles = formData.getAll("galerie");
    const galerieUrls = [];
    for (const file of galerieFiles){
        if (file && file.size > 0) {
            const blob = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["put"])(`sejours/galerie/${Date.now()}-${file.name}`, file, {
                access: 'public'
            });
            galerieUrls.push(blob.url);
        }
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].sejour.create({
        data: {
            titre,
            lieu,
            saison,
            statut,
            dateDebut: dateDebut ? new Date(dateDebut) : null,
            dateFin: dateFin ? new Date(dateFin) : null,
            places,
            tranchesAge,
            prix: prixPrincipal,
            imageUrl,
            // ⚡ Sauvegarde des nouveaux champs
            shortDescription,
            programme,
            infosPratiques,
            adresseComplete,
            formSchema,
            galerie: galerieUrls
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/sejours-enfants-ados");
}
async function modifierSejour(id, formData) {
    const sejourActuel = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].sejour.findUnique({
        where: {
            id
        }
    });
    const titre = formData.get("titre");
    const lieu = formData.get("lieu");
    const saison = formData.get("saison");
    const statut = formData.get("statut");
    const dateDebut = formData.get("dateDebut");
    const dateFin = formData.get("dateFin");
    const places = parseInt(formData.get("places")) || 0;
    const tranchesAge = formData.get("tranchesAge");
    // ⚡ Nouveaux champs récupérés du formulaire
    const shortDescription = formData.get("shortDescription") || "";
    const programme = formData.get("programme") || "";
    const infosPratiques = formData.get("infosPratiques") || "";
    const adresseComplete = formData.get("adresseComplete") || "";
    const formSchema = formData.get("formSchema") || "";
    const prixArray = formData.getAll("prix").map((p)=>parseFloat(p)).filter((p)=>!isNaN(p));
    const prixPrincipal = prixArray[0] || 0;
    // Gestion de l'image de couverture
    const imageFile = formData.get("image");
    let imageUrl = sejourActuel.imageUrl;
    if (imageFile && imageFile.size > 0) {
        if (sejourActuel.imageUrl) {
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["del"])(sejourActuel.imageUrl);
            } catch (e) {
                console.error("Erreur suppression ancien blob", e);
            }
        }
        const blob = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["put"])(`sejours/${Date.now()}-${imageFile.name}`, imageFile, {
            access: 'public'
        });
        imageUrl = blob.url;
    }
    // ⚡ Gestion de la Galerie lors d'une modification
    const galerieFiles = formData.getAll("galerie"); // Les NOUVELLES images uploadées
    const anciennesUrls = formData.getAll("anciennesGalerie"); // Les anciennes images CONSERVÉES
    // 🧹 Nettoyage Vercel : On supprime les images que l'utilisateur a retirées de la galerie
    const removedUrls = (sejourActuel.galerie || []).filter((url)=>!anciennesUrls.includes(url));
    for (const url of removedUrls){
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["del"])(url);
        } catch (e) {
            console.error("Erreur suppression image galerie", e);
        }
    }
    // Upload des nouvelles images
    const nouvellesUrls = [];
    for (const file of galerieFiles){
        if (file && file.size > 0) {
            const blob = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["put"])(`sejours/galerie/${Date.now()}-${file.name}`, file, {
                access: 'public'
            });
            nouvellesUrls.push(blob.url);
        }
    }
    // On fusionne les anciennes qu'on a gardées + les nouvelles
    const finalGalerie = [
        ...anciennesUrls,
        ...nouvellesUrls
    ];
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].sejour.update({
        where: {
            id
        },
        data: {
            titre,
            lieu,
            saison,
            statut,
            dateDebut: dateDebut ? new Date(dateDebut) : null,
            dateFin: dateFin ? new Date(dateFin) : null,
            places,
            tranchesAge,
            prix: prixPrincipal,
            imageUrl,
            // ⚡ Sauvegarde des nouveaux champs
            shortDescription,
            programme,
            infosPratiques,
            adresseComplete,
            formSchema,
            galerie: finalGalerie
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/sejours-enfants-ados");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/sejours-enfants-ados/${id}`);
}
async function supprimerSejour(id) {
    const sejour = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].sejour.findUnique({
        where: {
            id
        }
    });
    // On nettoie l'image principale
    if (sejour?.imageUrl) {
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["del"])(sejour.imageUrl);
        } catch (e) {
            console.error("Erreur suppression blob", e);
        }
    }
    // ⚡ On nettoie aussi toutes les images de la galerie sur Vercel !
    if (sejour?.galerie && sejour.galerie.length > 0) {
        for (const url of sejour.galerie){
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["del"])(url);
            } catch (e) {
                console.error("Erreur suppression image galerie", e);
            }
        }
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].sejour.delete({
        where: {
            id
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/sejours-enfants-ados");
}
async function toggleStatut(id, nouveauStatut) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].sejour.update({
        where: {
            id
        },
        data: {
            statut: nouveauStatut
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/sejours-enfants-ados");
}
async function toggleEnAvant(id, enAvant) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].sejour.update({
        where: {
            id
        },
        data: {
            enAvant: enAvant
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/sejours-enfants-ados");
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    creerSejour,
    modifierSejour,
    supprimerSejour,
    toggleStatut,
    toggleEnAvant
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(creerSejour, "40727e276909ecfe61dca975777c2948c3b2fed3aa", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(modifierSejour, "60cde51aa568503e49ff7fc2ed93b88f0c67876fff", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(supprimerSejour, "40bc891cdc0f488c348c435c37eda1827ffb08df6a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(toggleStatut, "60155bc9a34b8f9ea67650ca4dc4f352ad30b2956f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(toggleEnAvant, "600f4e201cc5decf890e1dd8f59771eb367cd16d5f", null);
}),
"[project]/app/actions/animateurs.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/actions/animateurs.js
/* __next_internal_action_entry_do_not_use__ [{"405ee4f0c5a677a6a6272c87ba65f2442449d61593":"creerAnimateur","40656822c98dd6fbe6faad7c0ed498aae3ba407998":"supprimerAnimateur","6035e9963fa0df93847317cfb2560019b05399b415":"modifierAnimateur"},"",""] */ __turbopack_context__.s([
    "creerAnimateur",
    ()=>creerAnimateur,
    "modifierAnimateur",
    ()=>modifierAnimateur,
    "supprimerAnimateur",
    ()=>supprimerAnimateur
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@vercel/blob/dist/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function creerAnimateur(formData) {
    const nom = formData.get("nom");
    const role = formData.get("role");
    const bio = formData.get("bio");
    const imageFile = formData.get("image");
    let imageUrl = null;
    if (imageFile && imageFile.size > 0) {
        const blob = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["put"])(`equipe/${Date.now()}-${imageFile.name}`, imageFile, {
            access: 'public'
        });
        imageUrl = blob.url;
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].animateur.create({
        data: {
            nom,
            role,
            bio,
            imageUrl
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/qui-sommes-nous");
}
async function modifierAnimateur(id, formData) {
    const nom = formData.get("nom");
    const role = formData.get("role");
    const bio = formData.get("bio");
    const imageFile = formData.get("image");
    const data = {
        nom,
        role,
        bio
    };
    if (imageFile && imageFile.size > 0) {
        const blob = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["put"])(`equipe/${Date.now()}-${imageFile.name}`, imageFile, {
            access: 'public'
        });
        data.imageUrl = blob.url;
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].animateur.update({
        where: {
            id
        },
        data
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/qui-sommes-nous");
}
async function supprimerAnimateur(id) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].animateur.delete({
        where: {
            id
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/qui-sommes-nous");
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    creerAnimateur,
    modifierAnimateur,
    supprimerAnimateur
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(creerAnimateur, "405ee4f0c5a677a6a6272c87ba65f2442449d61593", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(modifierAnimateur, "6035e9963fa0df93847317cfb2560019b05399b415", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(supprimerAnimateur, "40656822c98dd6fbe6faad7c0ed498aae3ba407998", null);
}),
"[project]/.next-internal/server/app/admin/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/auth.js [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/app/actions/sejours.js [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/app/actions/animateurs.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/auth.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$sejours$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/sejours.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$animateurs$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/animateurs.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
}),
"[project]/.next-internal/server/app/admin/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/auth.js [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/app/actions/sejours.js [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/app/actions/animateurs.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "405ee4f0c5a677a6a6272c87ba65f2442449d61593",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$animateurs$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["creerAnimateur"],
    "40656822c98dd6fbe6faad7c0ed498aae3ba407998",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$animateurs$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supprimerAnimateur"],
    "40727e276909ecfe61dca975777c2948c3b2fed3aa",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$sejours$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["creerSejour"],
    "40b81e21ee2402dfdc17b86f665f61fca694f941a8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerUser"],
    "40bc891cdc0f488c348c435c37eda1827ffb08df6a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$sejours$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supprimerSejour"],
    "600f4e201cc5decf890e1dd8f59771eb367cd16d5f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$sejours$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toggleEnAvant"],
    "60155bc9a34b8f9ea67650ca4dc4f352ad30b2956f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$sejours$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toggleStatut"],
    "6035e9963fa0df93847317cfb2560019b05399b415",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$animateurs$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["modifierAnimateur"],
    "60cde51aa568503e49ff7fc2ed93b88f0c67876fff",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$sejours$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["modifierSejour"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$app$2f$actions$2f$sejours$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$app$2f$actions$2f$animateurs$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/admin/page/actions.js { ACTIONS_MODULE0 => "[project]/app/actions/auth.js [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/app/actions/sejours.js [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/app/actions/animateurs.js [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/auth.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$sejours$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/sejours.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$animateurs$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/animateurs.js [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d6d0eb5a._.js.map