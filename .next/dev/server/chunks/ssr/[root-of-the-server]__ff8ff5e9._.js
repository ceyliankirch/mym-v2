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
/* __next_internal_action_entry_do_not_use__ [{"407c2bab59b5b2e5d043b0826917d0552e7fdb249a":"creerSejour","40d23c9cb36a941d9ff74f41a3ccde9553e4668917":"supprimerSejour","6034dbf4a0c4ebb8808f9364aabbbb3a7a650297b1":"toggleEnAvant","60483fe72ae78e9c438a5ad70007bfc2a3b93003e9":"modifierSejour","606c4f1e58ce9cb706c5d270303b0fd00fd67120f7":"toggleStatut"},"",""] */ __turbopack_context__.s([
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
    // ⚡ Gestion des documents requis
    let documentsRequis = [];
    try {
        const docsRequisStr = formData.get("documentsRequis");
        if (docsRequisStr) {
            documentsRequis = JSON.parse(docsRequisStr);
        }
    } catch (e) {
        console.error("Erreur parsing documentsRequis", e);
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
            documentsRequis,
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
    // ⚡ Gestion des documents requis
    let documentsRequis = sejourActuel.documentsRequis;
    try {
        const docsRequisStr = formData.get("documentsRequis");
        if (docsRequisStr) {
            documentsRequis = JSON.parse(docsRequisStr);
        }
    } catch (e) {
        console.error("Erreur parsing documentsRequis", e);
    }
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
            documentsRequis,
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(creerSejour, "407c2bab59b5b2e5d043b0826917d0552e7fdb249a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(modifierSejour, "60483fe72ae78e9c438a5ad70007bfc2a3b93003e9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(supprimerSejour, "40d23c9cb36a941d9ff74f41a3ccde9553e4668917", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(toggleStatut, "606c4f1e58ce9cb706c5d270303b0fd00fd67120f7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(toggleEnAvant, "6034dbf4a0c4ebb8808f9364aabbbb3a7a650297b1", null);
}),
"[project]/app/actions/animateurs.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/actions/animateurs.js
/* __next_internal_action_entry_do_not_use__ [{"40c8fa069927252a7edc9ade8dd8fcc232a4578aa0":"supprimerAnimateur","40e0f47f8475f63c690121561d98b3a6b3c08dadd9":"creerAnimateur","60ba66b34b9ec6ff5d925c197f056563c8d639f650":"modifierAnimateur"},"",""] */ __turbopack_context__.s([
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(creerAnimateur, "40e0f47f8475f63c690121561d98b3a6b3c08dadd9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(modifierAnimateur, "60ba66b34b9ec6ff5d925c197f056563c8d639f650", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(supprimerAnimateur, "40c8fa069927252a7edc9ade8dd8fcc232a4578aa0", null);
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
"[project]/app/actions/galerie.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/actions/galerie.js
/* __next_internal_action_entry_do_not_use__ [{"404390cfd0755f98c2854861c45e5f307305568ec4":"supprimerAlbum","40aee4c1a35c708787f3a6a9eea75f591ad8e048be":"creerAlbum","40e768bb1910f8717f308367150608a6e0db08b6bf":"supprimerPhoto","60268cb462889c24bdad20f99d9e3f532908c006cb":"togglePhotoEnAvant","60a2f8117ff515c3f7ce33caa43f95d7e99aabe80b":"modifierAlbum"},"",""] */ __turbopack_context__.s([
    "creerAlbum",
    ()=>creerAlbum,
    "modifierAlbum",
    ()=>modifierAlbum,
    "supprimerAlbum",
    ()=>supprimerAlbum,
    "supprimerPhoto",
    ()=>supprimerPhoto,
    "togglePhotoEnAvant",
    ()=>togglePhotoEnAvant
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
async function creerAlbum(formData) {
    const titre = formData.get("titre");
    const sejourId = formData.get("sejourId") || null;
    const photoFiles = formData.getAll("photos");
    const photoUrls = [];
    for (const file of photoFiles){
        if (file && file.size > 0) {
            const blob = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["put"])(`galerie/${Date.now()}-${file.name}`, file, {
                access: "public"
            });
            photoUrls.push(blob.url);
        }
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].album.create({
        data: {
            titre,
            sejourId: sejourId || null,
            photos: {
                create: photoUrls.map((url)=>({
                        url
                    }))
            }
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/galerie");
}
async function modifierAlbum(id, formData) {
    const titre = formData.get("titre");
    const sejourId = formData.get("sejourId") || null;
    const photoFiles = formData.getAll("photos");
    const photoUrls = [];
    for (const file of photoFiles){
        if (file && file.size > 0) {
            const blob = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["put"])(`galerie/${Date.now()}-${file.name}`, file, {
                access: "public"
            });
            photoUrls.push(blob.url);
        }
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].album.update({
        where: {
            id
        },
        data: {
            titre,
            sejourId: sejourId || null,
            photos: {
                create: photoUrls.map((url)=>({
                        url
                    }))
            }
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/galerie");
}
async function supprimerAlbum(id) {
    const album = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].album.findUnique({
        where: {
            id
        },
        include: {
            photos: true
        }
    });
    for (const photo of album?.photos || []){
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["del"])(photo.url);
        } catch (e) {
            console.error("Erreur suppression photo", e);
        }
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].album.delete({
        where: {
            id
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/galerie");
}
async function togglePhotoEnAvant(id, enAvant) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].photo.update({
        where: {
            id
        },
        data: {
            enAvant
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/galerie");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/");
}
async function supprimerPhoto(id) {
    const photo = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].photo.findUnique({
        where: {
            id
        }
    });
    if (!photo) return;
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["del"])(photo.url);
    } catch (e) {
        console.error("Erreur suppression photo", e);
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].photo.delete({
        where: {
            id
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/galerie");
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    creerAlbum,
    modifierAlbum,
    supprimerAlbum,
    togglePhotoEnAvant,
    supprimerPhoto
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(creerAlbum, "40aee4c1a35c708787f3a6a9eea75f591ad8e048be", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(modifierAlbum, "60a2f8117ff515c3f7ce33caa43f95d7e99aabe80b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(supprimerAlbum, "404390cfd0755f98c2854861c45e5f307305568ec4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(togglePhotoEnAvant, "60268cb462889c24bdad20f99d9e3f532908c006cb", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(supprimerPhoto, "40e768bb1910f8717f308367150608a6e0db08b6bf", null);
}),
"[project]/.next-internal/server/app/admin/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/auth.js [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/app/actions/sejours.js [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/app/actions/animateurs.js [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/app/actions/documents.js [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/app/actions/galerie.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/auth.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$sejours$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/sejours.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$animateurs$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/animateurs.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$documents$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/documents.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$galerie$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/galerie.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
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
"[project]/.next-internal/server/app/admin/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/auth.js [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/app/actions/sejours.js [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/app/actions/animateurs.js [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/app/actions/documents.js [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/app/actions/galerie.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "40293d189fe727c59436fb160b0ce2b70ffbe56a96",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$documents$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validerDocument"],
    "404390cfd0755f98c2854861c45e5f307305568ec4",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$galerie$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supprimerAlbum"],
    "407c2bab59b5b2e5d043b0826917d0552e7fdb249a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$sejours$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["creerSejour"],
    "40a1304e0a32ffc6001c97f491a89fc21e363ad86e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$documents$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["rejeterDocument"],
    "40aee4c1a35c708787f3a6a9eea75f591ad8e048be",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$galerie$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["creerAlbum"],
    "40c8fa069927252a7edc9ade8dd8fcc232a4578aa0",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$animateurs$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supprimerAnimateur"],
    "40d23c9cb36a941d9ff74f41a3ccde9553e4668917",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$sejours$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supprimerSejour"],
    "40e0f47f8475f63c690121561d98b3a6b3c08dadd9",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$animateurs$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["creerAnimateur"],
    "40e768bb1910f8717f308367150608a6e0db08b6bf",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$galerie$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supprimerPhoto"],
    "40eca645d15c4fc7e4f50863014333b24caacbabc9",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerUser"],
    "60268cb462889c24bdad20f99d9e3f532908c006cb",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$galerie$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["togglePhotoEnAvant"],
    "6034dbf4a0c4ebb8808f9364aabbbb3a7a650297b1",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$sejours$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toggleEnAvant"],
    "60483fe72ae78e9c438a5ad70007bfc2a3b93003e9",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$sejours$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["modifierSejour"],
    "606c4f1e58ce9cb706c5d270303b0fd00fd67120f7",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$sejours$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toggleStatut"],
    "60a2f8117ff515c3f7ce33caa43f95d7e99aabe80b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$galerie$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["modifierAlbum"],
    "60ba66b34b9ec6ff5d925c197f056563c8d639f650",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$animateurs$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["modifierAnimateur"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$app$2f$actions$2f$sejours$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$app$2f$actions$2f$animateurs$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$app$2f$actions$2f$documents$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$app$2f$actions$2f$galerie$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/admin/page/actions.js { ACTIONS_MODULE0 => "[project]/app/actions/auth.js [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/app/actions/sejours.js [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/app/actions/animateurs.js [app-rsc] (ecmascript)", ACTIONS_MODULE3 => "[project]/app/actions/documents.js [app-rsc] (ecmascript)", ACTIONS_MODULE4 => "[project]/app/actions/galerie.js [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/auth.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$sejours$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/sejours.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$animateurs$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/animateurs.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$documents$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/documents.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$galerie$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/galerie.js [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ff8ff5e9._.js.map