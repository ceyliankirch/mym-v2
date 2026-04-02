(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/sejours-enfants-ados/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SEJOURS",
    ()=>SEJOURS,
    "default",
    ()=>SejoursPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2d$medium$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SunMedium$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun-medium.js [app-client] (ecmascript) <export default as SunMedium>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$snowflake$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Snowflake$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/snowflake.js [app-client] (ecmascript) <export default as Snowflake>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flower$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flower2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flower-2.js [app-client] (ecmascript) <export default as Flower2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$waves$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Waves$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/waves.js [app-client] (ecmascript) <export default as Waves>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$landmark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Landmark$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/landmark.js [app-client] (ecmascript) <export default as Landmark>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mountain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mountain$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mountain.js [app-client] (ecmascript) <export default as Mountain>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$anchor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Anchor$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/anchor.js [app-client] (ecmascript) <export default as Anchor>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
/* ─── PALETTE ─────────────────────────────────────────────────────────────── */ const C = {
    yellow: "#FFC801",
    saffron: "#FF9932",
    teal: "#114C5A",
    tealMid: "#1A6B7C",
    lilac: "#EFDEF9",
    arctic: "#F1F6F4",
    white: "#ffffff"
};
const SEJOURS = [
    {
        id: "ski-chatel-enfants",
        slug: "ski-chatel-enfants",
        titre: "Séjour au Ski",
        lieu: "Châtel",
        region: "Alpes",
        ageLabel: "6 – 12 ans",
        ages: [
            "enfants"
        ],
        prix: 890,
        dateLabel: "28 Fév – 6 Mars 2026",
        dateDebut: "2026-02-28",
        dateFin: "2026-03-06",
        duree: "7 jours",
        periode: "hiver",
        categorie: "enfants",
        places: 20,
        placesRestantes: 5,
        img: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80",
        banniere: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1600&q=80",
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$snowflake$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Snowflake$3e$__["Snowflake"],
        shortDescription: "Une semaine inoubliable sur les pistes enneigées de Châtel avec des cours de ski encadrés par des professionnels diplômés.",
        programme: `
      <p><strong>Du 28 février au 6 mars 2026</strong>, venez découvrir les splendides pistes de Châtel avec nos animateurs diplômés.</p>
      <br/>
      <p><u><strong>Au programme :</strong></u></p>
      <br/>
      <p>🎿 Cours de ski du niveau débutant à confirmé avec des moniteurs ESF</p>
      <p>⛷️ Découverte du domaine skiable des Portes du Soleil</p>
      <p>🏔️ Activités après-ski : luge, patinoire, soirées jeux</p>
      <p>🍲 Pension complète dans un chalet confortable</p>
    `,
        infosPratiques: `
      <p>- Départ en car depuis Paris le samedi matin (point de rendez-vous communiqué à l'inscription)</p>
      <p>- Location de matériel de ski incluse</p>
      <p>- Assurance annulation et rapatriement incluse</p>
      <p>- Encadrement : 1 animateur pour 8 enfants</p>
    `,
        cadreDeVie: `
      <p>Hébergement en <strong>chalet tout confort</strong> au cœur de la station. Chambres de 4 à 6 personnes, salle de bains partagée, grande salle commune et coin repas.</p>
    `,
        formLink: "https://www.make-your-moment.com/inscription-ski-petits-1",
        galerie: [
            "https://images.unsplash.com/photo-1610397648930-477b8c7f0943?w=800&q=80",
            "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=800&q=80",
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
        ]
    },
    {
        id: "ski-chatel-ados",
        slug: "ski-chatel-ados",
        titre: "Séjour au Ski",
        lieu: "Châtel",
        region: "Alpes",
        ageLabel: "13 – 17 ans",
        ages: [
            "ados"
        ],
        prix: 915,
        dateLabel: "28 Fév – 6 Mars 2026",
        dateDebut: "2026-02-28",
        dateFin: "2026-03-06",
        duree: "7 jours",
        periode: "hiver",
        categorie: "ados",
        places: 18,
        placesRestantes: 3,
        img: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=800&q=80",
        banniere: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=1600&q=80",
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mountain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mountain$3e$__["Mountain"],
        shortDescription: "Ski, liberté et bonne humeur pour les 13-17 ans sur les Portes du Soleil. Un séjour sports & découverte.",
        programme: `
      <p><strong>Du 28 février au 6 mars 2026</strong>, séjour ski spécial ados sur l'un des plus grands domaines skiables d'Europe.</p>
      <br/>
      <p>🎿 Perfectionnement ski freeride et piste noire</p>
      <p>🏂 Snowpark accessible</p>
      <p>🎮 Soirées thématiques et tournois sportifs</p>
      <p>🍕 Repas en collectivité avec participation à la préparation</p>
    `,
        infosPratiques: `
      <p>- Départ en car depuis Paris</p>
      <p>- Location de matériel incluse</p>
      <p>- Assurance multi-risques incluse</p>
      <p>- Encadrement par enseignants diplômés BAFA</p>
    `,
        cadreDeVie: `
      <p>Chalet indépendant dédié au groupe ados avec <strong>accès autonomie</strong> encadré, espaces détente et salle de jeux.</p>
    `,
        formLink: "https://www.make-your-moment.com/inscription-ski-grands-1",
        galerie: [
            "https://images.unsplash.com/photo-1610397648930-477b8c7f0943?w=800&q=80",
            "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80"
        ]
    },
    {
        id: "ete-landes-enfants",
        slug: "ete-landes-enfants",
        titre: "Été dans les Landes",
        lieu: "Vieux-Boucau-les-Bains",
        region: "Landes",
        ageLabel: "6 – 11 ans",
        ages: [
            "enfants"
        ],
        prix: 885,
        dateLabel: "12 – 19 Juil 2026",
        dateDebut: "2026-07-12",
        dateFin: "2026-07-19",
        duree: "8 jours",
        periode: "ete",
        categorie: "enfants",
        places: 24,
        placesRestantes: 12,
        img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
        banniere: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80",
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$waves$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Waves$3e$__["Waves"],
        shortDescription: "Plage, surf et aventure dans les Landes. 8 jours de pur bonheur au bord de l'Atlantique pour les 6-11 ans.",
        programme: `
      <p>Une semaine en bord d'océan avec activités nautiques et sportives encadrées.</p>
      <br/>
      <p>🏄 Initiation au surf avec école agréée</p>
      <p>🏖️ Jeux de plage, châteaux de sable, olympiades</p>
      <p>🚴 Balades à vélo dans la forêt landaise</p>
      <p>🎨 Ateliers créatifs et soirées à thème</p>
    `,
        infosPratiques: `
      <p>- Départ en car depuis Paris (Porte de Clichy)</p>
      <p>- Hébergement en centre de vacances homologué</p>
      <p>- Activités nautiques encadrées par des MNS</p>
    `,
        cadreDeVie: `
      <p>Centre de vacances <strong>en bord de lac</strong>, à 5 min à pied de la plage. Dortoirs de 6 à 8 enfants, sanitaires rénovés, grande salle d'animation.</p>
    `,
        formLink: "https://www.make-your-moment.com/inscription-ete-petits",
        galerie: [
            "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80",
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"
        ]
    },
    {
        id: "ete-landes-ados",
        slug: "ete-landes-ados",
        titre: "Été dans les Landes",
        lieu: "Vieux-Boucau-les-Bains",
        region: "Landes",
        ageLabel: "13 – 17 ans",
        ages: [
            "ados"
        ],
        prix: 1395,
        dateLabel: "5 – 18 Juil 2026",
        dateDebut: "2026-07-05",
        dateFin: "2026-07-18",
        duree: "14 jours",
        periode: "ete",
        categorie: "ados",
        places: 20,
        placesRestantes: 8,
        img: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80",
        banniere: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1600&q=80",
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2d$medium$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SunMedium$3e$__["SunMedium"],
        shortDescription: "14 jours de liberté surveillée pour les ados : surf, voile, canyoning et vie en collectivité dans les Landes.",
        programme: `
      <p>Deux semaines d'aventures en autonomie progressive pour les 13-17 ans.</p>
      <br/>
      <p>🏄 Surf perfectionnement (niveaux intermédiaire et avancé)</p>
      <p>⛵ Initiation voile sur le lac</p>
      <p>🧗 Accrobranche et VTT en forêt</p>
      <p>🏕️ Nuit bivouac encadrée</p>
      <p>👨‍🍳 Atelier cuisine et vie collective</p>
    `,
        infosPratiques: `
      <p>- Départ et retour en car depuis Paris</p>
      <p>- Toutes activités incluses</p>
      <p>- Encadrement 24h/24 par des animateurs diplômés</p>
    `,
        cadreDeVie: `
      <p>Villa partagée avec <strong>piscine</strong>, à proximité de l'océan. Organisation semi-autonome : les jeunes participent à la gestion du quotidien.</p>
    `,
        formLink: "https://www.make-your-moment.com/inscription-ete-grands",
        galerie: []
    },
    {
        id: "senegal-ados",
        slug: "senegal-ados",
        titre: "Voyage au Sénégal",
        lieu: "Sénégal",
        region: "Afrique de l'Ouest",
        ageLabel: "12 – 17 ans",
        ages: [
            "ados"
        ],
        prix: 2510,
        dateLabel: "16 – 29 Juil 2026",
        dateDebut: "2026-07-16",
        dateFin: "2026-07-29",
        duree: "14 jours",
        periode: "ete",
        categorie: "ados",
        places: 22,
        placesRestantes: 2,
        img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
        banniere: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1600&q=80",
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"],
        featured: true,
        shortDescription: "14 jours d'immersion culturelle au Sénégal : Dakar, Gorée, désert de Lompoul, rencontres locales et surf.",
        programme: `
      <p><strong>Du 16 au 29 juillet 2026</strong>, l'association Make Your Moment propose à 22 adolescents âgés de 13 à 17 ans de vivre une aventure inoubliable au cœur du Sénégal.</p>
      <br/>
      <p><u><strong>Au programme :</strong></u></p>
      <br/>
      <p>✨ Des découvertes incontournables : visites de Dakar, de l'île de Gorée, balade dans la Mangrove en pirogue, visite de la réserve de Bandia.</p>
      <p>✨ Des moments d'immersion : rencontres authentiques dans les villages, partage de la vie locale et découverte des traditions sénégalaises.</p>
      <p>✨ Des activités sportives : surf, quad, multisports, ateliers de musique et de danse, promenade à dos de dromadaire.</p>
      <p>✨ Une aventure unique dans le désert de Lompoul : deux nuits magiques sous les étoiles.</p>
      <p>✨ La vie en collectivité : participation à la préparation des repas et à la vie quotidienne.</p>
    `,
        infosPratiques: `
      <p>- Départ en avion depuis Paris avec Air France, vol direct pour Dakar.</p>
      <p>- Sur place, déplacements en transports privés réservés au groupe.</p>
      <p>- Le séjour est encadré par 3 animateurs expérimentés, tous enseignants ou éducateurs diplômés.</p>
    `,
        cadreDeVie: `
      <p>Séjour à <strong>La Somone</strong>, dans une grande maison située en bord de mer, à proximité de la lagune. Plus de 7 chambres, plusieurs salles de bain, <strong>piscine</strong>, espace détente et grande <strong>terrasse vue mer</strong>.</p>
    `,
        formLink: "https://www.make-your-moment.com/inscription-senegal",
        galerie: [
            "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80"
        ]
    },
    {
        id: "allemagne-ados",
        slug: "allemagne-ados",
        titre: "Séjour en Allemagne",
        lieu: "Allemagne",
        region: "Europe",
        ageLabel: "12 – 17 ans",
        ages: [
            "ados"
        ],
        prix: 585,
        dateLabel: "28 Avr – 1er Mai 2026",
        dateDebut: "2026-04-28",
        dateFin: "2026-05-01",
        duree: "4 jours",
        periode: "printemps",
        categorie: "ados",
        places: 16,
        placesRestantes: 9,
        img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80",
        banniere: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1600&q=80",
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$landmark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Landmark$3e$__["Landmark"],
        shortDescription: "Court séjour découverte en Allemagne : culture, histoire et échanges interculturels pour les jeunes.",
        programme: `
      <p>Un week-end prolongé pour découvrir l'Allemagne autrement.</p>
      <br/>
      <p>🏰 Visites culturelles et historiques</p>
      <p>🎡 Sorties marché et découverte gastronomique</p>
      <p>🗣️ Échanges avec des jeunes allemands</p>
    `,
        infosPratiques: `
      <p>- Départ en car depuis Paris</p>
      <p>- Hébergement en auberge de jeunesse</p>
      <p>- Repas du soir et petits-déjeuners inclus</p>
    `,
        cadreDeVie: "Auberge de jeunesse moderne en centre-ville.",
        formLink: "https://www.make-your-moment.com/inscription-allemagne-jeunes",
        galerie: []
    },
    {
        id: "meaux-seniors",
        slug: "meaux-seniors",
        titre: "Visite de Meaux",
        lieu: "Meaux, France",
        region: "Île-de-France",
        ageLabel: "Séniors",
        ages: [
            "seniors"
        ],
        prix: 125,
        dateLabel: "Sam. 4 Avril 2026",
        dateDebut: "2026-04-04",
        dateFin: "2026-04-04",
        duree: "1 jour",
        periode: "printemps",
        categorie: "seniors",
        places: 30,
        placesRestantes: 18,
        img: "https://images.unsplash.com/photo-1549989476-69a92fa57c36?w=800&q=80",
        banniere: "https://images.unsplash.com/photo-1549989476-69a92fa57c36?w=1600&q=80",
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flower$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flower2$3e$__["Flower2"],
        shortDescription: "Journée conviviale à Meaux : visite de la cité épiscopale, musée de la Brie et dégustation locale.",
        programme: `
      <p>Une belle journée de découverte et de convivialité dans la cité de Bossuet.</p>
      <br/>
      <p>🏛️ Visite guidée de la cité épiscopale et ses jardins</p>
      <p>🎭 Musée de la Grande Guerre (facultatif)</p>
      <p>🧀 Dégustation de brie de Meaux AOP</p>
      <p>🍽️ Déjeuner au restaurant local inclus</p>
    `,
        infosPratiques: `
      <p>- Départ en car depuis Sucy-en-Brie à 8h30</p>
      <p>- Retour prévu vers 18h00</p>
      <p>- Déjeuner au restaurant inclus</p>
      <p>- Accompagnement par 2 animateurs</p>
    `,
        cadreDeVie: "Sortie à la journée. Aucun hébergement nécessaire.",
        formLink: "https://www.make-your-moment.com/sortie-senior-meaux",
        galerie: []
    },
    {
        id: "deauville-seniors",
        slug: "deauville-seniors",
        titre: "Journée à la mer",
        lieu: "Deauville",
        region: "Normandie",
        ageLabel: "Séniors",
        ages: [
            "seniors"
        ],
        prix: 50,
        dateLabel: "Dim. 23 Août 2026",
        dateDebut: "2026-08-23",
        dateFin: "2026-08-23",
        duree: "1 jour",
        periode: "ete",
        categorie: "seniors",
        places: 40,
        placesRestantes: 22,
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
        banniere: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=80",
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$anchor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Anchor$3e$__["Anchor"],
        shortDescription: "Une journée iodée à Deauville : les planches, la plage et les boutiques de la perle de la Côte Fleurie.",
        programme: `
      <p>Profitez d'une belle journée estivale au bord de la mer.</p>
      <br/>
      <p>🌊 Promenade sur les Planches de Deauville</p>
      <p>🏖️ Temps libre sur la plage</p>
      <p>🛍️ Visite du marché et des boutiques</p>
      <p>🍦 Déjeuner libre (restaurants proposés)</p>
    `,
        infosPratiques: `
      <p>- Départ en car depuis Sucy-en-Brie à 7h30</p>
      <p>- Retour prévu vers 20h00</p>
      <p>- Déjeuner libre (non inclus)</p>
    `,
        cadreDeVie: "Sortie à la journée. Aucun hébergement nécessaire.",
        formLink: "https://www.make-your-moment.com/sortie-jornee-a-la-mer",
        galerie: []
    }
];
/* ─── CONSTANTS ─────────────────────────────────────────────────────────────── */ const CATS = [
    {
        id: "tous",
        label: "Tous"
    },
    {
        id: "enfants",
        label: "Enfants"
    },
    {
        id: "ados",
        label: "Ados"
    },
    {
        id: "seniors",
        label: "Séniors"
    }
];
const PERIODES = [
    {
        id: "tous",
        label: "Toutes saisons"
    },
    {
        id: "hiver",
        label: "Hiver"
    },
    {
        id: "printemps",
        label: "Printemps"
    },
    {
        id: "ete",
        label: "Été"
    }
];
const NAV = [
    "Accueil",
    "Séjours",
    "Qui sommes-nous",
    "Séniors",
    "Contact",
    "FAQ"
];
/* ─── BREADCRUMB ─────────────────────────────────────────────────────────────── */ function Breadcrumb({ items }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            maxWidth: "1320px",
            margin: "0 auto",
            padding: "16px 32px",
            display: "flex",
            alignItems: "center",
            gap: "8px"
        },
        children: items.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                },
                children: [
                    i > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                        size: 12,
                        style: {
                            color: "#aaa"
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                        lineNumber: 370,
                        columnNumber: 17
                    }, this),
                    item.href ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: item.href,
                        style: {
                            fontSize: "12px",
                            color: C.tealMid,
                            textDecoration: "none",
                            fontWeight: 600
                        },
                        children: item.label
                    }, void 0, false, {
                        fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                        lineNumber: 372,
                        columnNumber: 15
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: "12px",
                            color: "#888",
                            fontWeight: 500
                        },
                        children: item.label
                    }, void 0, false, {
                        fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                        lineNumber: 373,
                        columnNumber: 15
                    }, this)
                ]
            }, i, true, {
                fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                lineNumber: 369,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/app/sejours-enfants-ados/page.jsx",
        lineNumber: 367,
        columnNumber: 5
    }, this);
}
_c = Breadcrumb;
/* ─── SEJOUR CARD ────────────────────────────────────────────────────────────── */ function SejourCard({ s, idx }) {
    _s();
    const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const urgent = s.placesRestantes <= 3;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: `/sejours/${s.slug}`,
        style: {
            textDecoration: "none"
        },
        onMouseEnter: ()=>setHovered(true),
        onMouseLeave: ()=>setHovered(false),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                background: C.white,
                borderRadius: "24px",
                overflow: "hidden",
                cursor: "pointer",
                transform: hovered ? "translateY(-6px)" : "translateY(0)",
                boxShadow: hovered ? "0 20px 56px rgba(17,76,90,0.14)" : "0 2px 16px rgba(17,76,90,0.07)",
                transition: "all .3s ease",
                animation: `fadeUp .5s ease both`,
                animationDelay: `${idx * 0.07}s`,
                position: "relative"
            },
            children: [
                urgent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        zIndex: 5,
                        background: "#ef4444",
                        borderRadius: "999px",
                        padding: "3px 10px"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: "10px",
                            fontWeight: 700,
                            color: "white"
                        },
                        children: [
                            "⚡ ",
                            s.placesRestantes,
                            " places restantes"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                        lineNumber: 398,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                    lineNumber: 397,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: "relative",
                        height: "200px",
                        overflow: "hidden"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: s.img,
                            alt: s.titre,
                            style: {
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                transform: hovered ? "scale(1.05)" : "scale(1)",
                                transition: "transform .5s ease"
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                            lineNumber: 402,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: "absolute",
                                top: "12px",
                                left: urgent ? "auto" : "12px",
                                right: urgent ? "auto" : "auto",
                                background: "rgba(255,255,255,0.93)",
                                backdropFilter: "blur(6px)",
                                borderRadius: "999px",
                                padding: "4px 10px",
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                ...urgent ? {
                                    display: "none"
                                } : {}
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                    size: 10,
                                    style: {
                                        color: C.teal
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                    lineNumber: 404,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: "10px",
                                        fontWeight: 700,
                                        color: C.teal
                                    },
                                    children: s.dateLabel
                                }, void 0, false, {
                                    fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                    lineNumber: 405,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                            lineNumber: 403,
                            columnNumber: 11
                        }, this),
                        !urgent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: "absolute",
                                top: "12px",
                                left: "12px",
                                background: "rgba(255,255,255,0.93)",
                                backdropFilter: "blur(6px)",
                                borderRadius: "999px",
                                padding: "4px 10px",
                                display: "flex",
                                alignItems: "center",
                                gap: "5px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                    size: 10,
                                    style: {
                                        color: C.teal
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                    lineNumber: 409,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: "10px",
                                        fontWeight: 700,
                                        color: C.teal
                                    },
                                    children: s.dateLabel
                                }, void 0, false, {
                                    fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                    lineNumber: 410,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                            lineNumber: 408,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: "absolute",
                                bottom: "12px",
                                right: "12px",
                                background: C.yellow,
                                borderRadius: "999px",
                                padding: "3px 10px",
                                display: "flex",
                                alignItems: "center",
                                gap: "4px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                    size: 9,
                                    style: {
                                        color: C.teal
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                    lineNumber: 414,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: "10px",
                                        fontWeight: 700,
                                        color: C.teal
                                    },
                                    children: s.duree
                                }, void 0, false, {
                                    fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                    lineNumber: 415,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                            lineNumber: 413,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                    lineNumber: 401,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: "18px 20px 20px"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                gap: "8px",
                                marginBottom: "4px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    style: {
                                        fontSize: "13px",
                                        fontWeight: 800,
                                        color: C.teal,
                                        lineHeight: 1.3,
                                        margin: 0
                                    },
                                    children: s.titre
                                }, void 0, false, {
                                    fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                    lineNumber: 421,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: "15px",
                                        fontWeight: 900,
                                        color: C.saffron,
                                        whiteSpace: "nowrap"
                                    },
                                    children: [
                                        s.prix,
                                        "€"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                    lineNumber: 422,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                            lineNumber: 420,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                marginBottom: "3px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                    size: 11,
                                    style: {
                                        color: C.saffron,
                                        flexShrink: 0
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                    lineNumber: 425,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: "11px",
                                        fontWeight: 600,
                                        color: C.saffron
                                    },
                                    children: s.lieu
                                }, void 0, false, {
                                    fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                    lineNumber: 426,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                            lineNumber: 424,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                marginBottom: "14px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                    size: 11,
                                    style: {
                                        color: "#ccc",
                                        flexShrink: 0
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                    lineNumber: 429,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: "11px",
                                        color: "#aaa",
                                        fontWeight: 500
                                    },
                                    children: s.ageLabel
                                }, void 0, false, {
                                    fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                    lineNumber: 430,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                            lineNumber: 428,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: "100%",
                                background: hovered ? C.yellow : C.teal,
                                color: hovered ? C.teal : C.white,
                                fontSize: "11px",
                                fontWeight: 800,
                                letterSpacing: ".8px",
                                textTransform: "uppercase",
                                borderRadius: "999px",
                                padding: "10px",
                                border: "none",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "6px",
                                transition: "all .2s"
                            },
                            children: [
                                "Voir le séjour ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                    size: 11
                                }, void 0, false, {
                                    fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                    lineNumber: 439,
                                    columnNumber: 28
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                            lineNumber: 432,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                    lineNumber: 419,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/sejours-enfants-ados/page.jsx",
            lineNumber: 388,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/sejours-enfants-ados/page.jsx",
        lineNumber: 386,
        columnNumber: 5
    }, this);
}
_s(SejourCard, "V8YbV+gTZxGliGj1g0fftBlvsq4=");
_c1 = SejourCard;
function SejoursPage() {
    _s1();
    const [cat, setCat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("tous");
    const [periode, setPeriode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("tous");
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SejoursPage.useEffect": ()=>{
            const fn = {
                "SejoursPage.useEffect.fn": ()=>setScrolled(window.scrollY > 40)
            }["SejoursPage.useEffect.fn"];
            window.addEventListener("scroll", fn);
            return ({
                "SejoursPage.useEffect": ()=>window.removeEventListener("scroll", fn)
            })["SejoursPage.useEffect"];
        }
    }["SejoursPage.useEffect"], []);
    const filtered = SEJOURS.filter((s)=>{
        const matchCat = cat === "tous" || s.categorie === cat;
        const matchPeriode = periode === "tous" || s.periode === periode;
        const matchSearch = !search || s.titre.toLowerCase().includes(search.toLowerCase()) || s.lieu.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchPeriode && matchSearch;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            fontFamily: "'Montserrat',sans-serif",
            background: C.arctic,
            color: C.teal,
            overflowX: "hidden"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');
        *{font-family:'Montserrat',sans-serif;box-sizing:border-box;margin:0;padding:0;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        input::placeholder{color:#aab;}
        input:focus{outline:none;}
        a{color:inherit;}
      `
            }, void 0, false, {
                fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                lineNumber: 471,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    background: C.teal,
                    padding: "64px 32px 80px",
                    position: "relative",
                    overflow: "hidden"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "absolute",
                            top: "-60px",
                            right: "-60px",
                            width: "300px",
                            height: "300px",
                            borderRadius: "50%",
                            background: "rgba(255,200,1,0.08)"
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                        lineNumber: 483,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "absolute",
                            bottom: "-40px",
                            left: "10%",
                            width: "200px",
                            height: "200px",
                            borderRadius: "50%",
                            background: "rgba(255,200,1,0.05)"
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                        lineNumber: 484,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            maxWidth: "1320px",
                            margin: "0 auto",
                            position: "relative",
                            zIndex: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Breadcrumb, {
                                items: [
                                    {
                                        label: "Accueil",
                                        href: "/"
                                    },
                                    {
                                        label: "Tous les séjours"
                                    }
                                ]
                            }, void 0, false, {
                                fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                lineNumber: 487,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: "center",
                                    marginBottom: "40px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            background: "rgba(255,200,1,0.15)",
                                            borderRadius: "999px",
                                            padding: "8px 16px",
                                            marginBottom: "20px"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    width: "8px",
                                                    height: "8px",
                                                    borderRadius: "50%",
                                                    background: C.yellow,
                                                    flexShrink: 0
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                                lineNumber: 491,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: "11px",
                                                    fontWeight: 700,
                                                    color: C.yellow,
                                                    letterSpacing: "1px",
                                                    textTransform: "uppercase"
                                                },
                                                children: "Saison 2026"
                                            }, void 0, false, {
                                                fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                                lineNumber: 492,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                        lineNumber: 490,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        style: {
                                            fontWeight: 900,
                                            color: C.white,
                                            letterSpacing: "-2px",
                                            lineHeight: 1.06,
                                            marginBottom: "16px",
                                            fontSize: "clamp(2.2rem,4vw,3.2rem)"
                                        },
                                        children: [
                                            "Tous nos ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: C.yellow
                                                },
                                                children: "séjours"
                                            }, void 0, false, {
                                                fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                                lineNumber: 495,
                                                columnNumber: 24
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                        lineNumber: 494,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: "15px",
                                            color: "rgba(255,255,255,0.65)",
                                            maxWidth: "520px",
                                            margin: "0 auto",
                                            lineHeight: 1.8
                                        },
                                        children: "Des aventures inoubliables pour enfants, ados et séniors — encadrées par des enseignants diplômés."
                                    }, void 0, false, {
                                        fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                        lineNumber: 497,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                lineNumber: 489,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    maxWidth: "560px",
                                    margin: "0 auto",
                                    background: "rgba(255,255,255,0.1)",
                                    backdropFilter: "blur(8px)",
                                    borderRadius: "16px",
                                    padding: "8px 16px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    border: "1px solid rgba(255,255,255,0.15)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                        size: 16,
                                        style: {
                                            color: "rgba(255,255,255,0.5)",
                                            flexShrink: 0
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                        lineNumber: 504,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: search,
                                        onChange: (e)=>setSearch(e.target.value),
                                        placeholder: "Rechercher un séjour, une destination…",
                                        style: {
                                            flex: 1,
                                            background: "transparent",
                                            border: "none",
                                            color: "white",
                                            fontSize: "13px",
                                            fontWeight: 500,
                                            fontFamily: "Montserrat,sans-serif"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                        lineNumber: 505,
                                        columnNumber: 13
                                    }, this),
                                    search && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setSearch(""),
                                        style: {
                                            background: "none",
                                            border: "none",
                                            cursor: "pointer",
                                            color: "rgba(255,255,255,0.5)"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            size: 14
                                        }, void 0, false, {
                                            fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                            lineNumber: 512,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                        lineNumber: 511,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                lineNumber: 503,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                        lineNumber: 486,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                lineNumber: 481,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    background: C.white,
                    padding: "24px 32px",
                    borderBottom: `1px solid ${C.arctic}`
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        maxWidth: "1320px",
                        margin: "0 auto",
                        display: "flex",
                        gap: "32px",
                        flexWrap: "wrap",
                        justifyContent: "center"
                    },
                    children: [
                        {
                            n: `${SEJOURS.length}`,
                            label: "séjours disponibles"
                        },
                        {
                            n: "4",
                            label: "saisons"
                        },
                        {
                            n: "3",
                            label: "catégories d'âge"
                        },
                        {
                            n: "500+",
                            label: "familles satisfaites"
                        }
                    ].map(({ n, label }, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: "10px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: "20px",
                                        fontWeight: 900,
                                        color: C.yellow
                                    },
                                    children: n
                                }, void 0, false, {
                                    fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                    lineNumber: 529,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: "12px",
                                        color: "#8aa",
                                        fontWeight: 600
                                    },
                                    children: label
                                }, void 0, false, {
                                    fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                    lineNumber: 530,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                            lineNumber: 528,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                    lineNumber: 521,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                lineNumber: 520,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    padding: "48px 32px 96px"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        maxWidth: "1320px",
                        margin: "0 auto"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: "32px",
                                flexWrap: "wrap",
                                gap: "16px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: "13px",
                                        color: "#8aa",
                                        fontWeight: 600
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: C.teal,
                                                fontWeight: 800
                                            },
                                            children: filtered.length
                                        }, void 0, false, {
                                            fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                            lineNumber: 543,
                                            columnNumber: 15
                                        }, this),
                                        " séjour",
                                        filtered.length > 1 ? "s" : "",
                                        " trouvé",
                                        filtered.length > 1 ? "s" : ""
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                    lineNumber: 542,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        background: C.white,
                                        borderRadius: "16px",
                                        padding: "6px",
                                        boxShadow: "0 2px 12px rgba(17,76,90,0.07)",
                                        flexWrap: "wrap"
                                    },
                                    children: [
                                        CATS.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setCat(c.id),
                                                style: {
                                                    fontSize: "11px",
                                                    fontWeight: 700,
                                                    borderRadius: "10px",
                                                    padding: "7px 14px",
                                                    border: "none",
                                                    cursor: "pointer",
                                                    transition: "all .2s",
                                                    background: cat === c.id ? C.yellow : "transparent",
                                                    color: C.teal,
                                                    fontFamily: "Montserrat,sans-serif"
                                                },
                                                children: c.label
                                            }, c.id, false, {
                                                fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                                lineNumber: 548,
                                                columnNumber: 17
                                            }, this)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: "1px",
                                                height: "20px",
                                                background: "#eee",
                                                margin: "0 4px"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                            lineNumber: 552,
                                            columnNumber: 15
                                        }, this),
                                        PERIODES.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setPeriode(p.id),
                                                style: {
                                                    fontSize: "11px",
                                                    fontWeight: 700,
                                                    borderRadius: "10px",
                                                    padding: "7px 14px",
                                                    border: "none",
                                                    cursor: "pointer",
                                                    transition: "all .2s",
                                                    background: periode === p.id ? C.teal : "transparent",
                                                    color: periode === p.id ? "white" : C.teal,
                                                    fontFamily: "Montserrat,sans-serif"
                                                },
                                                children: p.label
                                            }, p.id, false, {
                                                fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                                lineNumber: 554,
                                                columnNumber: 17
                                            }, this)),
                                        (cat !== "tous" || periode !== "tous" || search) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setCat("tous");
                                                setPeriode("tous");
                                                setSearch("");
                                            },
                                            style: {
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "4px",
                                                fontSize: "11px",
                                                fontWeight: 700,
                                                color: C.saffron,
                                                background: "none",
                                                border: "none",
                                                cursor: "pointer",
                                                marginLeft: "4px",
                                                fontFamily: "Montserrat,sans-serif"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                    size: 11
                                                }, void 0, false, {
                                                    fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                                    lineNumber: 560,
                                                    columnNumber: 19
                                                }, this),
                                                " Reset"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                            lineNumber: 559,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                    lineNumber: 546,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                            lineNumber: 541,
                            columnNumber: 11
                        }, this),
                        filtered.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "grid",
                                gridTemplateColumns: "repeat(4,1fr)",
                                gap: "18px"
                            },
                            children: filtered.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SejourCard, {
                                    s: s,
                                    idx: i
                                }, s.id, false, {
                                    fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                    lineNumber: 569,
                                    columnNumber: 36
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                            lineNumber: 568,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: "80px 0",
                                color: "#ccc"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                    size: 40,
                                    strokeWidth: 1,
                                    style: {
                                        marginBottom: "12px"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                    lineNumber: 573,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        color: "#8aaa"
                                    },
                                    children: "Aucun séjour ne correspond à votre recherche."
                                }, void 0, false, {
                                    fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                    lineNumber: 574,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setCat("tous");
                                        setPeriode("tous");
                                        setSearch("");
                                    },
                                    style: {
                                        marginTop: "16px",
                                        background: C.yellow,
                                        color: C.teal,
                                        border: "none",
                                        borderRadius: "999px",
                                        padding: "10px 24px",
                                        fontSize: "12px",
                                        fontWeight: 700,
                                        cursor: "pointer",
                                        fontFamily: "Montserrat,sans-serif"
                                    },
                                    children: "Voir tous les séjours"
                                }, void 0, false, {
                                    fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                    lineNumber: 575,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                            lineNumber: 572,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                    lineNumber: 538,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                lineNumber: 537,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    padding: "0 32px 80px"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        maxWidth: "1320px",
                        margin: "0 auto"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: C.teal,
                            borderRadius: "28px",
                            padding: "48px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "32px",
                            flexWrap: "wrap",
                            boxShadow: "0 24px 80px rgba(17,76,90,0.2)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            fontWeight: 900,
                                            color: C.white,
                                            fontSize: "1.6rem",
                                            letterSpacing: "-0.5px",
                                            marginBottom: "8px"
                                        },
                                        children: "Besoin d'un conseil ?"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                        lineNumber: 588,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: "13px",
                                            color: "rgba(255,255,255,0.6)"
                                        },
                                        children: "Notre équipe répond à toutes vos questions par téléphone ou email."
                                    }, void 0, false, {
                                        fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                        lineNumber: 589,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                lineNumber: 587,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: "12px",
                                    flexShrink: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "tel:+33698965002",
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            background: C.yellow,
                                            color: C.teal,
                                            fontSize: "12px",
                                            fontWeight: 800,
                                            borderRadius: "999px",
                                            padding: "14px 28px",
                                            textDecoration: "none"
                                        },
                                        children: "📞 Nous appeler"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                        lineNumber: 592,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "mailto:mym.makeyourmoment@gmail.com",
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            background: "transparent",
                                            color: C.white,
                                            fontSize: "12px",
                                            fontWeight: 700,
                                            borderRadius: "999px",
                                            padding: "14px 28px",
                                            textDecoration: "none",
                                            border: "2px solid rgba(255,255,255,0.25)"
                                        },
                                        children: "✉️ Nous écrire"
                                    }, void 0, false, {
                                        fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                        lineNumber: 595,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                                lineNumber: 591,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                        lineNumber: 586,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                    lineNumber: 585,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/sejours-enfants-ados/page.jsx",
                lineNumber: 584,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/sejours-enfants-ados/page.jsx",
        lineNumber: 470,
        columnNumber: 5
    }, this);
}
_s1(SejoursPage, "0OzxSjHIl/C+5xwRL3GfAs3pUBM=");
_c2 = SejoursPage;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Breadcrumb");
__turbopack_context__.k.register(_c1, "SejourCard");
__turbopack_context__.k.register(_c2, "SejoursPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Calendar
]);
/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M8 2v4",
            key: "1cmpym"
        }
    ],
    [
        "path",
        {
            d: "M16 2v4",
            key: "4m81vk"
        }
    ],
    [
        "rect",
        {
            width: "18",
            height: "18",
            x: "3",
            y: "4",
            rx: "2",
            key: "1hopcy"
        }
    ],
    [
        "path",
        {
            d: "M3 10h18",
            key: "8toen8"
        }
    ]
];
const Calendar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("calendar", __iconNode);
;
 //# sourceMappingURL=calendar.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Calendar",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Users
]);
/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
            key: "1yyitq"
        }
    ],
    [
        "path",
        {
            d: "M16 3.128a4 4 0 0 1 0 7.744",
            key: "16gr8j"
        }
    ],
    [
        "path",
        {
            d: "M22 21v-2a4 4 0 0 0-3-3.87",
            key: "kshegd"
        }
    ],
    [
        "circle",
        {
            cx: "9",
            cy: "7",
            r: "4",
            key: "nufk8"
        }
    ]
];
const Users = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("users", __iconNode);
;
 //# sourceMappingURL=users.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Users",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Clock
]);
/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "path",
        {
            d: "M12 6v6l4 2",
            key: "mmk7yg"
        }
    ]
];
const Clock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("clock", __iconNode);
;
 //# sourceMappingURL=clock.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Clock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Search
]);
/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m21 21-4.34-4.34",
            key: "14j7rj"
        }
    ],
    [
        "circle",
        {
            cx: "11",
            cy: "11",
            r: "8",
            key: "4ej97u"
        }
    ]
];
const Search = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("search", __iconNode);
;
 //# sourceMappingURL=search.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Search",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/sun-medium.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>SunMedium
]);
/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "4",
            key: "4exip2"
        }
    ],
    [
        "path",
        {
            d: "M12 3v1",
            key: "1asbbs"
        }
    ],
    [
        "path",
        {
            d: "M12 20v1",
            key: "1wcdkc"
        }
    ],
    [
        "path",
        {
            d: "M3 12h1",
            key: "lp3yf2"
        }
    ],
    [
        "path",
        {
            d: "M20 12h1",
            key: "1vloll"
        }
    ],
    [
        "path",
        {
            d: "m18.364 5.636-.707.707",
            key: "1hakh0"
        }
    ],
    [
        "path",
        {
            d: "m6.343 17.657-.707.707",
            key: "18m9nf"
        }
    ],
    [
        "path",
        {
            d: "m5.636 5.636.707.707",
            key: "1xv1c5"
        }
    ],
    [
        "path",
        {
            d: "m17.657 17.657.707.707",
            key: "vl76zb"
        }
    ]
];
const SunMedium = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("sun-medium", __iconNode);
;
 //# sourceMappingURL=sun-medium.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/sun-medium.js [app-client] (ecmascript) <export default as SunMedium>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SunMedium",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2d$medium$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2d$medium$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun-medium.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/snowflake.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Snowflake
]);
/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m10 20-1.25-2.5L6 18",
            key: "18frcb"
        }
    ],
    [
        "path",
        {
            d: "M10 4 8.75 6.5 6 6",
            key: "7mghy3"
        }
    ],
    [
        "path",
        {
            d: "m14 20 1.25-2.5L18 18",
            key: "1chtki"
        }
    ],
    [
        "path",
        {
            d: "m14 4 1.25 2.5L18 6",
            key: "1b4wsy"
        }
    ],
    [
        "path",
        {
            d: "m17 21-3-6h-4",
            key: "15hhxa"
        }
    ],
    [
        "path",
        {
            d: "m17 3-3 6 1.5 3",
            key: "11697g"
        }
    ],
    [
        "path",
        {
            d: "M2 12h6.5L10 9",
            key: "kv9z4n"
        }
    ],
    [
        "path",
        {
            d: "m20 10-1.5 2 1.5 2",
            key: "1swlpi"
        }
    ],
    [
        "path",
        {
            d: "M22 12h-6.5L14 15",
            key: "1mxi28"
        }
    ],
    [
        "path",
        {
            d: "m4 10 1.5 2L4 14",
            key: "k9enpj"
        }
    ],
    [
        "path",
        {
            d: "m7 21 3-6-1.5-3",
            key: "j8hb9u"
        }
    ],
    [
        "path",
        {
            d: "m7 3 3 6h4",
            key: "1otusx"
        }
    ]
];
const Snowflake = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("snowflake", __iconNode);
;
 //# sourceMappingURL=snowflake.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/snowflake.js [app-client] (ecmascript) <export default as Snowflake>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Snowflake",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$snowflake$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$snowflake$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/snowflake.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/flower-2.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Flower2
]);
/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1",
            key: "3pnvol"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "8",
            r: "2",
            key: "1822b1"
        }
    ],
    [
        "path",
        {
            d: "M12 10v12",
            key: "6ubwww"
        }
    ],
    [
        "path",
        {
            d: "M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z",
            key: "9hd38g"
        }
    ],
    [
        "path",
        {
            d: "M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z",
            key: "ufn41s"
        }
    ]
];
const Flower2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("flower-2", __iconNode);
;
 //# sourceMappingURL=flower-2.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/flower-2.js [app-client] (ecmascript) <export default as Flower2>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Flower2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flower$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flower$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flower-2.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/waves.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Waves
]);
/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
            key: "knzxuh"
        }
    ],
    [
        "path",
        {
            d: "M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
            key: "2jd2cc"
        }
    ],
    [
        "path",
        {
            d: "M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
            key: "rd2r6e"
        }
    ]
];
const Waves = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("waves", __iconNode);
;
 //# sourceMappingURL=waves.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/waves.js [app-client] (ecmascript) <export default as Waves>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Waves",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$waves$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$waves$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/waves.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Globe
]);
/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "path",
        {
            d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",
            key: "13o1zl"
        }
    ],
    [
        "path",
        {
            d: "M2 12h20",
            key: "9i4pu4"
        }
    ]
];
const Globe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("globe", __iconNode);
;
 //# sourceMappingURL=globe.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript) <export default as Globe>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Globe",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/landmark.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Landmark
]);
/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M10 18v-7",
            key: "wt116b"
        }
    ],
    [
        "path",
        {
            d: "M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z",
            key: "1m329m"
        }
    ],
    [
        "path",
        {
            d: "M14 18v-7",
            key: "vav6t3"
        }
    ],
    [
        "path",
        {
            d: "M18 18v-7",
            key: "aexdmj"
        }
    ],
    [
        "path",
        {
            d: "M3 22h18",
            key: "8prr45"
        }
    ],
    [
        "path",
        {
            d: "M6 18v-7",
            key: "1ivflk"
        }
    ]
];
const Landmark = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("landmark", __iconNode);
;
 //# sourceMappingURL=landmark.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/landmark.js [app-client] (ecmascript) <export default as Landmark>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Landmark",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$landmark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$landmark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/landmark.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/mountain.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Mountain
]);
/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m8 3 4 8 5-5 5 15H2L8 3z",
            key: "otkl63"
        }
    ]
];
const Mountain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("mountain", __iconNode);
;
 //# sourceMappingURL=mountain.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/mountain.js [app-client] (ecmascript) <export default as Mountain>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Mountain",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mountain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mountain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mountain.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/anchor.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Anchor
]);
/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M12 6v16",
            key: "nqf5sj"
        }
    ],
    [
        "path",
        {
            d: "m19 13 2-1a9 9 0 0 1-18 0l2 1",
            key: "y7qv08"
        }
    ],
    [
        "path",
        {
            d: "M9 11h6",
            key: "1fldmi"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "4",
            r: "2",
            key: "muu5ef"
        }
    ]
];
const Anchor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("anchor", __iconNode);
;
 //# sourceMappingURL=anchor.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/anchor.js [app-client] (ecmascript) <export default as Anchor>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Anchor",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$anchor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$anchor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/anchor.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ChevronRight
]);
/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m9 18 6-6-6-6",
            key: "mthhwq"
        }
    ]
];
const ChevronRight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("chevron-right", __iconNode);
;
 //# sourceMappingURL=chevron-right.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronRight",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_7bc02b3a._.js.map