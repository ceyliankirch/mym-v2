(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/admin/AdminLayout.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// app/admin/AdminLayout.jsx
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
;
;
function AdminLayout({ children, sidebarOpen, setSidebarOpen, activeTab, setActiveTab, MENU, C }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            height: "100vh",
            width: "100vw",
            background: C.arctic,
            fontFamily: "var(--font-montserrat), sans-serif",
            overflow: "hidden"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        /* Sur Desktop (> 768px) */
        @media (min-width: 769px) {
          .mobile-bottom-bar { display: none !important; }
          .desktop-sidebar { display: flex !important; }
        }

        /* Sur Mobile (< 768px) */
        @media (max-width: 768px) {
          .desktop-sidebar { display: none !important; }
          .mobile-bottom-bar { display: flex !important; }
          
          /* On ajoute de l'espace en bas du contenu pour ne pas le cacher sous la barre */
          .main-container > div {
            padding: 24px 16px 120px 16px !important; 
          }
        }

        /* 💧 EFFET LIQUID GLASS POUR LA BOTTOM BAR */
        .mobile-bottom-bar {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 32px);
          max-width: 400px;
          
          /* La fameuse pilule en fond */
          background: rgba(255, 255, 255, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.6);
          border-radius: 100px;
          padding: 8px 12px;
          
          /* L'effet flou (Glassmorphism) */
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 10px 40px rgba(17, 76, 90, 0.15), inset 0 1px 0 rgba(255,255,255,0.8);
          
          justify-content: space-between;
          align-items: center;
          z-index: 1000;
        }

        /* ⭕ HOVER CIRCULAIRES DES ICÔNES MOBILES */
        .mobile-nav-item {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }
        
        .mobile-nav-item.active {
          background: ${C.yellow};
          color: ${C.teal};
          box-shadow: 0 4px 12px rgba(255, 200, 1, 0.4);
        }
        
        .mobile-nav-item:not(.active) {
          background: transparent;
          color: ${C.gray};
        }

        .mobile-nav-item:hover:not(.active) {
          background: rgba(17, 76, 90, 0.08);
          color: ${C.teal};
        }
      `
            }, void 0, false, {
                fileName: "[project]/app/admin/AdminLayout.jsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "desktop-sidebar",
                style: {
                    width: sidebarOpen ? "280px" : "90px",
                    background: C.white,
                    borderRight: `1px solid ${C.lightGray}`,
                    flexDirection: "column",
                    transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    zIndex: 50
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "24px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: sidebarOpen ? "flex-start" : "center",
                            gap: "12px",
                            borderBottom: `1px solid ${C.lightGray}`
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSidebarOpen(!sidebarOpen),
                                style: {
                                    background: C.arctic,
                                    border: "none",
                                    width: "42px",
                                    height: "42px",
                                    borderRadius: "12px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    color: C.teal,
                                    flexShrink: 0,
                                    transition: "background 0.2s"
                                },
                                onMouseOver: (e)=>e.currentTarget.style.background = C.lightGray,
                                onMouseOut: (e)=>e.currentTarget.style.background = C.arctic,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                    size: sidebarOpen ? 20 : 24
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/AdminLayout.jsx",
                                    lineNumber: 102,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminLayout.jsx",
                                lineNumber: 96,
                                columnNumber: 11
                            }, this),
                            sidebarOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: "14px",
                                    fontWeight: 900,
                                    color: C.teal,
                                    whiteSpace: "nowrap"
                                },
                                children: "TABLEAU DE BORD"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminLayout.jsx",
                                lineNumber: 104,
                                columnNumber: 27
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/AdminLayout.jsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        style: {
                            flex: 1,
                            padding: sidebarOpen ? "24px 16px" : "24px 12px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                            overflowY: "auto",
                            alignItems: sidebarOpen ? "stretch" : "center"
                        },
                        children: MENU.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab(item.id),
                                title: !sidebarOpen ? item.label : "",
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: sidebarOpen ? "flex-start" : "center",
                                    gap: "16px",
                                    padding: sidebarOpen ? "12px 16px" : "14px",
                                    borderRadius: "14px",
                                    border: "none",
                                    cursor: "pointer",
                                    background: activeTab === item.id ? C.yellow : "transparent",
                                    color: activeTab === item.id ? C.teal : C.gray,
                                    transition: "all 0.2s",
                                    width: sidebarOpen ? "100%" : "56px",
                                    height: sidebarOpen ? "auto" : "56px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(item.icon, {
                                        size: sidebarOpen ? 20 : 26,
                                        style: {
                                            flexShrink: 0
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/AdminLayout.jsx",
                                        lineNumber: 115,
                                        columnNumber: 15
                                    }, this),
                                    sidebarOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: "13px",
                                            fontWeight: activeTab === item.id ? 800 : 600,
                                            whiteSpace: "nowrap"
                                        },
                                        children: item.label
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/AdminLayout.jsx",
                                        lineNumber: 116,
                                        columnNumber: 31
                                    }, this)
                                ]
                            }, item.id, true, {
                                fileName: "[project]/app/admin/AdminLayout.jsx",
                                lineNumber: 110,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/admin/AdminLayout.jsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: sidebarOpen ? "20px" : "20px 0",
                            borderTop: `1px solid ${C.lightGray}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: sidebarOpen ? "flex-start" : "center",
                            gap: "12px",
                            overflow: "hidden"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: "46px",
                                    height: "46px",
                                    borderRadius: "14px",
                                    background: C.saffron,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: C.white,
                                    fontWeight: 900,
                                    fontSize: "16px",
                                    flexShrink: 0
                                },
                                children: "AD"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminLayout.jsx",
                                lineNumber: 123,
                                columnNumber: 11
                            }, this),
                            sidebarOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    whiteSpace: "nowrap"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: "13px",
                                            fontWeight: 800,
                                            color: C.teal
                                        },
                                        children: "Admin"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/AdminLayout.jsx",
                                        lineNumber: 126,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: "11px",
                                            fontWeight: 600,
                                            color: C.gray
                                        },
                                        children: "contact@mym.com"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/AdminLayout.jsx",
                                        lineNumber: 127,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/AdminLayout.jsx",
                                lineNumber: 125,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/AdminLayout.jsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/AdminLayout.jsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "mobile-bottom-bar",
                children: MENU.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab(item.id),
                        className: `mobile-nav-item ${activeTab === item.id ? 'active' : ''}`,
                        "aria-label": item.label,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(item.icon, {
                            size: 28
                        }, void 0, false, {
                            fileName: "[project]/app/admin/AdminLayout.jsx",
                            lineNumber: 142,
                            columnNumber: 13
                        }, this)
                    }, item.id, false, {
                        fileName: "[project]/app/admin/AdminLayout.jsx",
                        lineNumber: 136,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/admin/AdminLayout.jsx",
                lineNumber: 134,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "main-container",
                style: {
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    position: "relative"
                },
                children: children
            }, void 0, false, {
                fileName: "[project]/app/admin/AdminLayout.jsx",
                lineNumber: 148,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/AdminLayout.jsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = AdminLayout;
var _c;
__turbopack_context__.k.register(_c, "AdminLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/actions/data:d0cc4c [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "creerSejour",
    ()=>$$RSC_SERVER_ACTION_0
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"40727e276909ecfe61dca975777c2948c3b2fed3aa":"creerSejour"},"app/actions/sejours.js",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40727e276909ecfe61dca975777c2948c3b2fed3aa", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "creerSejour");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vc2Vqb3Vycy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuaW1wb3J0IHsgcHV0LCBkZWwgfSBmcm9tIFwiQHZlcmNlbC9ibG9iXCI7IC8vIPCfk7ggSW1wb3J0YXRpb24gZGUgbCdvdXRpbCBkZSBzdG9ja2FnZSBWZXJjZWxcblxuLy8g4p6VIENSw4lFUlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWVyU2Vqb3VyKGZvcm1EYXRhKSB7XG4gIGNvbnN0IHRpdHJlID0gZm9ybURhdGEuZ2V0KFwidGl0cmVcIik7XG4gIGNvbnN0IGxpZXUgPSBmb3JtRGF0YS5nZXQoXCJsaWV1XCIpO1xuICBjb25zdCBzYWlzb24gPSBmb3JtRGF0YS5nZXQoXCJzYWlzb25cIik7XG4gIGNvbnN0IHN0YXR1dCA9IGZvcm1EYXRhLmdldChcInN0YXR1dFwiKTtcbiAgY29uc3QgZGF0ZURlYnV0ID0gZm9ybURhdGEuZ2V0KFwiZGF0ZURlYnV0XCIpO1xuICBjb25zdCBkYXRlRmluID0gZm9ybURhdGEuZ2V0KFwiZGF0ZUZpblwiKTtcbiAgY29uc3QgcGxhY2VzID0gcGFyc2VJbnQoZm9ybURhdGEuZ2V0KFwicGxhY2VzXCIpKSB8fCAwO1xuICBjb25zdCB0cmFuY2hlc0FnZSA9IGZvcm1EYXRhLmdldChcInRyYW5jaGVzQWdlXCIpO1xuICBcbiAgLy8gT24gcsOpY3Vww6hyZSB0b3VzIGxlcyBwcml4IHNhaXNpcyAoZm9ybURhdGEuZ2V0QWxsIHLDqWN1cMOocmUgbGEgbGlzdGUgZGVzIGlucHV0cyBhdmVjIGxlIG3Dqm1lIG5hbWUpXG4gIGNvbnN0IHByaXhBcnJheSA9IGZvcm1EYXRhLmdldEFsbChcInByaXhcIikubWFwKHAgPT4gcGFyc2VGbG9hdChwKSkuZmlsdGVyKHAgPT4gIWlzTmFOKHApKTtcbiAgY29uc3QgcHJpeFByaW5jaXBhbCA9IHByaXhBcnJheVswXSB8fCAwOyAvLyBPbiBzdG9ja2UgbGUgcHJlbWllciBwcml4IGNvbW1lIHByaXggZGUgcsOpZsOpcmVuY2VcblxuICAvLyBHZXN0aW9uIGRlIGwnaW1hZ2UgYXZlYyBWZXJjZWwgQmxvYlxuICBjb25zdCBpbWFnZUZpbGUgPSBmb3JtRGF0YS5nZXQoXCJpbWFnZVwiKTtcbiAgbGV0IGltYWdlVXJsID0gbnVsbDtcblxuICBpZiAoaW1hZ2VGaWxlICYmIGltYWdlRmlsZS5zaXplID4gMCkge1xuICAgIC8vIE9uIGVudm9pZSBsJ2ltYWdlIHN1ciBsZXMgc2VydmV1cnMgZGUgVmVyY2VsXG4gICAgY29uc3QgYmxvYiA9IGF3YWl0IHB1dChgc2Vqb3Vycy8ke0RhdGUubm93KCl9LSR7aW1hZ2VGaWxlLm5hbWV9YCwgaW1hZ2VGaWxlLCB7XG4gICAgICBhY2Nlc3M6ICdwdWJsaWMnLFxuICAgIH0pO1xuICAgIGltYWdlVXJsID0gYmxvYi51cmw7XG4gIH1cblxuICBhd2FpdCBwcmlzbWEuc2Vqb3VyLmNyZWF0ZSh7XG4gICAgZGF0YToge1xuICAgICAgdGl0cmUsXG4gICAgICBsaWV1LFxuICAgICAgc2Fpc29uLFxuICAgICAgc3RhdHV0LFxuICAgICAgZGF0ZURlYnV0OiBkYXRlRGVidXQgPyBuZXcgRGF0ZShkYXRlRGVidXQpIDogbnVsbCxcbiAgICAgIGRhdGVGaW46IGRhdGVGaW4gPyBuZXcgRGF0ZShkYXRlRmluKSA6IG51bGwsXG4gICAgICBwbGFjZXMsXG4gICAgICB0cmFuY2hlc0FnZSxcbiAgICAgIHByaXg6IHByaXhQcmluY2lwYWwsXG4gICAgICBpbWFnZVVybCxcbiAgICB9LFxuICB9KTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9hZG1pblwiKTtcbn1cblxuLy8g4pyP77iPIE1PRElGSUVSXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbW9kaWZpZXJTZWpvdXIoaWQsIGZvcm1EYXRhKSB7XG4gIGNvbnN0IHNlam91ckFjdHVlbCA9IGF3YWl0IHByaXNtYS5zZWpvdXIuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGlkIH0gfSk7XG4gIFxuICBjb25zdCB0aXRyZSA9IGZvcm1EYXRhLmdldChcInRpdHJlXCIpO1xuICBjb25zdCBsaWV1ID0gZm9ybURhdGEuZ2V0KFwibGlldVwiKTtcbiAgY29uc3Qgc2Fpc29uID0gZm9ybURhdGEuZ2V0KFwic2Fpc29uXCIpO1xuICBjb25zdCBzdGF0dXQgPSBmb3JtRGF0YS5nZXQoXCJzdGF0dXRcIik7XG4gIGNvbnN0IGRhdGVEZWJ1dCA9IGZvcm1EYXRhLmdldChcImRhdGVEZWJ1dFwiKTtcbiAgY29uc3QgZGF0ZUZpbiA9IGZvcm1EYXRhLmdldChcImRhdGVGaW5cIik7XG4gIGNvbnN0IHBsYWNlcyA9IHBhcnNlSW50KGZvcm1EYXRhLmdldChcInBsYWNlc1wiKSkgfHwgMDtcbiAgY29uc3QgdHJhbmNoZXNBZ2UgPSBmb3JtRGF0YS5nZXQoXCJ0cmFuY2hlc0FnZVwiKTtcbiAgXG4gIGNvbnN0IHByaXhBcnJheSA9IGZvcm1EYXRhLmdldEFsbChcInByaXhcIikubWFwKHAgPT4gcGFyc2VGbG9hdChwKSkuZmlsdGVyKHAgPT4gIWlzTmFOKHApKTtcbiAgY29uc3QgcHJpeFByaW5jaXBhbCA9IHByaXhBcnJheVswXSB8fCAwO1xuXG4gIC8vIEdlc3Rpb24gZGUgbCdpbWFnZVxuICBjb25zdCBpbWFnZUZpbGUgPSBmb3JtRGF0YS5nZXQoXCJpbWFnZVwiKTtcbiAgbGV0IGltYWdlVXJsID0gc2Vqb3VyQWN0dWVsLmltYWdlVXJsOyAvLyBQYXIgZMOpZmF1dCBvbiBnYXJkZSBsJ2FuY2llbm5lXG5cbiAgLy8gU2kgdW5lIG5vdXZlbGxlIGltYWdlIGVzdCBzw6lsZWN0aW9ubsOpZVxuICBpZiAoaW1hZ2VGaWxlICYmIGltYWdlRmlsZS5zaXplID4gMCkge1xuICAgIC8vIDEuIE9uIHN1cHByaW1lIGwnYW5jaWVubmUgaW1hZ2Ugc3VyIFZlcmNlbCBCbG9iIHBvdXIgbmUgcGFzIGVuY29tYnJlciBsZSBzdG9ja2FnZVxuICAgIGlmIChzZWpvdXJBY3R1ZWwuaW1hZ2VVcmwpIHtcbiAgICAgIHRyeSB7IGF3YWl0IGRlbChzZWpvdXJBY3R1ZWwuaW1hZ2VVcmwpOyB9IGNhdGNoIChlKSB7IGNvbnNvbGUuZXJyb3IoXCJFcnJldXIgc3VwcHJlc3Npb24gYW5jaWVuIGJsb2JcIiwgZSk7IH1cbiAgICB9XG4gICAgLy8gMi4gT24gdXBsb2FkIGxhIG5vdXZlbGxlXG4gICAgY29uc3QgYmxvYiA9IGF3YWl0IHB1dChgc2Vqb3Vycy8ke0RhdGUubm93KCl9LSR7aW1hZ2VGaWxlLm5hbWV9YCwgaW1hZ2VGaWxlLCB7XG4gICAgICBhY2Nlc3M6ICdwdWJsaWMnLFxuICAgIH0pO1xuICAgIGltYWdlVXJsID0gYmxvYi51cmw7XG4gIH1cblxuICBhd2FpdCBwcmlzbWEuc2Vqb3VyLnVwZGF0ZSh7XG4gICAgd2hlcmU6IHsgaWQgfSxcbiAgICBkYXRhOiB7XG4gICAgICB0aXRyZSxcbiAgICAgIGxpZXUsXG4gICAgICBzYWlzb24sXG4gICAgICBzdGF0dXQsXG4gICAgICBkYXRlRGVidXQ6IGRhdGVEZWJ1dCA/IG5ldyBEYXRlKGRhdGVEZWJ1dCkgOiBudWxsLFxuICAgICAgZGF0ZUZpbjogZGF0ZUZpbiA/IG5ldyBEYXRlKGRhdGVGaW4pIDogbnVsbCxcbiAgICAgIHBsYWNlcyxcbiAgICAgIHRyYW5jaGVzQWdlLFxuICAgICAgcHJpeDogcHJpeFByaW5jaXBhbCxcbiAgICAgIGltYWdlVXJsLFxuICAgIH0sXG4gIH0pO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2FkbWluXCIpO1xufVxuXG4vLyDwn5eR77iPIFNVUFBSSU1FUlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHN1cHByaW1lclNlam91cihpZCkge1xuICAvLyBPbiByw6ljdXDDqHJlIGxlIHPDqWpvdXIgcG91ciBhdm9pciBsJ1VSTCBkZSBsJ2ltYWdlXG4gIGNvbnN0IHNlam91ciA9IGF3YWl0IHByaXNtYS5zZWpvdXIuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGlkIH0gfSk7XG5cbiAgLy8gT24gbmV0dG9pZSBsJ2ltYWdlIHN1ciBWZXJjZWwgQmxvYiBhdmFudCBkZSBzdXBwcmltZXIgbGUgcmVjb3JkIGVuIGJhc2VcbiAgaWYgKHNlam91cj8uaW1hZ2VVcmwpIHtcbiAgICB0cnkgeyBhd2FpdCBkZWwoc2Vqb3VyLmltYWdlVXJsKTsgfSBjYXRjaCAoZSkgeyBjb25zb2xlLmVycm9yKFwiRXJyZXVyIHN1cHByZXNzaW9uIGJsb2JcIiwgZSk7IH1cbiAgfVxuXG4gIGF3YWl0IHByaXNtYS5zZWpvdXIuZGVsZXRlKHtcbiAgICB3aGVyZTogeyBpZCB9LFxuICB9KTtcbiAgXG4gIHJldmFsaWRhdGVQYXRoKFwiL2FkbWluXCIpO1xufSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoic1JBT3NCLHdMQUFBIn0=
}),
"[project]/app/actions/data:c4d811 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "modifierSejour",
    ()=>$$RSC_SERVER_ACTION_1
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"60cde51aa568503e49ff7fc2ed93b88f0c67876fff":"modifierSejour"},"app/actions/sejours.js",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("60cde51aa568503e49ff7fc2ed93b88f0c67876fff", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "modifierSejour");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vc2Vqb3Vycy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuaW1wb3J0IHsgcHV0LCBkZWwgfSBmcm9tIFwiQHZlcmNlbC9ibG9iXCI7IC8vIPCfk7ggSW1wb3J0YXRpb24gZGUgbCdvdXRpbCBkZSBzdG9ja2FnZSBWZXJjZWxcblxuLy8g4p6VIENSw4lFUlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWVyU2Vqb3VyKGZvcm1EYXRhKSB7XG4gIGNvbnN0IHRpdHJlID0gZm9ybURhdGEuZ2V0KFwidGl0cmVcIik7XG4gIGNvbnN0IGxpZXUgPSBmb3JtRGF0YS5nZXQoXCJsaWV1XCIpO1xuICBjb25zdCBzYWlzb24gPSBmb3JtRGF0YS5nZXQoXCJzYWlzb25cIik7XG4gIGNvbnN0IHN0YXR1dCA9IGZvcm1EYXRhLmdldChcInN0YXR1dFwiKTtcbiAgY29uc3QgZGF0ZURlYnV0ID0gZm9ybURhdGEuZ2V0KFwiZGF0ZURlYnV0XCIpO1xuICBjb25zdCBkYXRlRmluID0gZm9ybURhdGEuZ2V0KFwiZGF0ZUZpblwiKTtcbiAgY29uc3QgcGxhY2VzID0gcGFyc2VJbnQoZm9ybURhdGEuZ2V0KFwicGxhY2VzXCIpKSB8fCAwO1xuICBjb25zdCB0cmFuY2hlc0FnZSA9IGZvcm1EYXRhLmdldChcInRyYW5jaGVzQWdlXCIpO1xuICBcbiAgLy8gT24gcsOpY3Vww6hyZSB0b3VzIGxlcyBwcml4IHNhaXNpcyAoZm9ybURhdGEuZ2V0QWxsIHLDqWN1cMOocmUgbGEgbGlzdGUgZGVzIGlucHV0cyBhdmVjIGxlIG3Dqm1lIG5hbWUpXG4gIGNvbnN0IHByaXhBcnJheSA9IGZvcm1EYXRhLmdldEFsbChcInByaXhcIikubWFwKHAgPT4gcGFyc2VGbG9hdChwKSkuZmlsdGVyKHAgPT4gIWlzTmFOKHApKTtcbiAgY29uc3QgcHJpeFByaW5jaXBhbCA9IHByaXhBcnJheVswXSB8fCAwOyAvLyBPbiBzdG9ja2UgbGUgcHJlbWllciBwcml4IGNvbW1lIHByaXggZGUgcsOpZsOpcmVuY2VcblxuICAvLyBHZXN0aW9uIGRlIGwnaW1hZ2UgYXZlYyBWZXJjZWwgQmxvYlxuICBjb25zdCBpbWFnZUZpbGUgPSBmb3JtRGF0YS5nZXQoXCJpbWFnZVwiKTtcbiAgbGV0IGltYWdlVXJsID0gbnVsbDtcblxuICBpZiAoaW1hZ2VGaWxlICYmIGltYWdlRmlsZS5zaXplID4gMCkge1xuICAgIC8vIE9uIGVudm9pZSBsJ2ltYWdlIHN1ciBsZXMgc2VydmV1cnMgZGUgVmVyY2VsXG4gICAgY29uc3QgYmxvYiA9IGF3YWl0IHB1dChgc2Vqb3Vycy8ke0RhdGUubm93KCl9LSR7aW1hZ2VGaWxlLm5hbWV9YCwgaW1hZ2VGaWxlLCB7XG4gICAgICBhY2Nlc3M6ICdwdWJsaWMnLFxuICAgIH0pO1xuICAgIGltYWdlVXJsID0gYmxvYi51cmw7XG4gIH1cblxuICBhd2FpdCBwcmlzbWEuc2Vqb3VyLmNyZWF0ZSh7XG4gICAgZGF0YToge1xuICAgICAgdGl0cmUsXG4gICAgICBsaWV1LFxuICAgICAgc2Fpc29uLFxuICAgICAgc3RhdHV0LFxuICAgICAgZGF0ZURlYnV0OiBkYXRlRGVidXQgPyBuZXcgRGF0ZShkYXRlRGVidXQpIDogbnVsbCxcbiAgICAgIGRhdGVGaW46IGRhdGVGaW4gPyBuZXcgRGF0ZShkYXRlRmluKSA6IG51bGwsXG4gICAgICBwbGFjZXMsXG4gICAgICB0cmFuY2hlc0FnZSxcbiAgICAgIHByaXg6IHByaXhQcmluY2lwYWwsXG4gICAgICBpbWFnZVVybCxcbiAgICB9LFxuICB9KTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9hZG1pblwiKTtcbn1cblxuLy8g4pyP77iPIE1PRElGSUVSXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbW9kaWZpZXJTZWpvdXIoaWQsIGZvcm1EYXRhKSB7XG4gIGNvbnN0IHNlam91ckFjdHVlbCA9IGF3YWl0IHByaXNtYS5zZWpvdXIuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGlkIH0gfSk7XG4gIFxuICBjb25zdCB0aXRyZSA9IGZvcm1EYXRhLmdldChcInRpdHJlXCIpO1xuICBjb25zdCBsaWV1ID0gZm9ybURhdGEuZ2V0KFwibGlldVwiKTtcbiAgY29uc3Qgc2Fpc29uID0gZm9ybURhdGEuZ2V0KFwic2Fpc29uXCIpO1xuICBjb25zdCBzdGF0dXQgPSBmb3JtRGF0YS5nZXQoXCJzdGF0dXRcIik7XG4gIGNvbnN0IGRhdGVEZWJ1dCA9IGZvcm1EYXRhLmdldChcImRhdGVEZWJ1dFwiKTtcbiAgY29uc3QgZGF0ZUZpbiA9IGZvcm1EYXRhLmdldChcImRhdGVGaW5cIik7XG4gIGNvbnN0IHBsYWNlcyA9IHBhcnNlSW50KGZvcm1EYXRhLmdldChcInBsYWNlc1wiKSkgfHwgMDtcbiAgY29uc3QgdHJhbmNoZXNBZ2UgPSBmb3JtRGF0YS5nZXQoXCJ0cmFuY2hlc0FnZVwiKTtcbiAgXG4gIGNvbnN0IHByaXhBcnJheSA9IGZvcm1EYXRhLmdldEFsbChcInByaXhcIikubWFwKHAgPT4gcGFyc2VGbG9hdChwKSkuZmlsdGVyKHAgPT4gIWlzTmFOKHApKTtcbiAgY29uc3QgcHJpeFByaW5jaXBhbCA9IHByaXhBcnJheVswXSB8fCAwO1xuXG4gIC8vIEdlc3Rpb24gZGUgbCdpbWFnZVxuICBjb25zdCBpbWFnZUZpbGUgPSBmb3JtRGF0YS5nZXQoXCJpbWFnZVwiKTtcbiAgbGV0IGltYWdlVXJsID0gc2Vqb3VyQWN0dWVsLmltYWdlVXJsOyAvLyBQYXIgZMOpZmF1dCBvbiBnYXJkZSBsJ2FuY2llbm5lXG5cbiAgLy8gU2kgdW5lIG5vdXZlbGxlIGltYWdlIGVzdCBzw6lsZWN0aW9ubsOpZVxuICBpZiAoaW1hZ2VGaWxlICYmIGltYWdlRmlsZS5zaXplID4gMCkge1xuICAgIC8vIDEuIE9uIHN1cHByaW1lIGwnYW5jaWVubmUgaW1hZ2Ugc3VyIFZlcmNlbCBCbG9iIHBvdXIgbmUgcGFzIGVuY29tYnJlciBsZSBzdG9ja2FnZVxuICAgIGlmIChzZWpvdXJBY3R1ZWwuaW1hZ2VVcmwpIHtcbiAgICAgIHRyeSB7IGF3YWl0IGRlbChzZWpvdXJBY3R1ZWwuaW1hZ2VVcmwpOyB9IGNhdGNoIChlKSB7IGNvbnNvbGUuZXJyb3IoXCJFcnJldXIgc3VwcHJlc3Npb24gYW5jaWVuIGJsb2JcIiwgZSk7IH1cbiAgICB9XG4gICAgLy8gMi4gT24gdXBsb2FkIGxhIG5vdXZlbGxlXG4gICAgY29uc3QgYmxvYiA9IGF3YWl0IHB1dChgc2Vqb3Vycy8ke0RhdGUubm93KCl9LSR7aW1hZ2VGaWxlLm5hbWV9YCwgaW1hZ2VGaWxlLCB7XG4gICAgICBhY2Nlc3M6ICdwdWJsaWMnLFxuICAgIH0pO1xuICAgIGltYWdlVXJsID0gYmxvYi51cmw7XG4gIH1cblxuICBhd2FpdCBwcmlzbWEuc2Vqb3VyLnVwZGF0ZSh7XG4gICAgd2hlcmU6IHsgaWQgfSxcbiAgICBkYXRhOiB7XG4gICAgICB0aXRyZSxcbiAgICAgIGxpZXUsXG4gICAgICBzYWlzb24sXG4gICAgICBzdGF0dXQsXG4gICAgICBkYXRlRGVidXQ6IGRhdGVEZWJ1dCA/IG5ldyBEYXRlKGRhdGVEZWJ1dCkgOiBudWxsLFxuICAgICAgZGF0ZUZpbjogZGF0ZUZpbiA/IG5ldyBEYXRlKGRhdGVGaW4pIDogbnVsbCxcbiAgICAgIHBsYWNlcyxcbiAgICAgIHRyYW5jaGVzQWdlLFxuICAgICAgcHJpeDogcHJpeFByaW5jaXBhbCxcbiAgICAgIGltYWdlVXJsLFxuICAgIH0sXG4gIH0pO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2FkbWluXCIpO1xufVxuXG4vLyDwn5eR77iPIFNVUFBSSU1FUlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHN1cHByaW1lclNlam91cihpZCkge1xuICAvLyBPbiByw6ljdXDDqHJlIGxlIHPDqWpvdXIgcG91ciBhdm9pciBsJ1VSTCBkZSBsJ2ltYWdlXG4gIGNvbnN0IHNlam91ciA9IGF3YWl0IHByaXNtYS5zZWpvdXIuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGlkIH0gfSk7XG5cbiAgLy8gT24gbmV0dG9pZSBsJ2ltYWdlIHN1ciBWZXJjZWwgQmxvYiBhdmFudCBkZSBzdXBwcmltZXIgbGUgcmVjb3JkIGVuIGJhc2VcbiAgaWYgKHNlam91cj8uaW1hZ2VVcmwpIHtcbiAgICB0cnkgeyBhd2FpdCBkZWwoc2Vqb3VyLmltYWdlVXJsKTsgfSBjYXRjaCAoZSkgeyBjb25zb2xlLmVycm9yKFwiRXJyZXVyIHN1cHByZXNzaW9uIGJsb2JcIiwgZSk7IH1cbiAgfVxuXG4gIGF3YWl0IHByaXNtYS5zZWpvdXIuZGVsZXRlKHtcbiAgICB3aGVyZTogeyBpZCB9LFxuICB9KTtcbiAgXG4gIHJldmFsaWRhdGVQYXRoKFwiL2FkbWluXCIpO1xufSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoieVJBb0RzQiwyTEFBQSJ9
}),
"[project]/app/actions/data:86380a [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supprimerSejour",
    ()=>$$RSC_SERVER_ACTION_2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"40bc891cdc0f488c348c435c37eda1827ffb08df6a":"supprimerSejour"},"app/actions/sejours.js",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40bc891cdc0f488c348c435c37eda1827ffb08df6a", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "supprimerSejour");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vc2Vqb3Vycy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuaW1wb3J0IHsgcHV0LCBkZWwgfSBmcm9tIFwiQHZlcmNlbC9ibG9iXCI7IC8vIPCfk7ggSW1wb3J0YXRpb24gZGUgbCdvdXRpbCBkZSBzdG9ja2FnZSBWZXJjZWxcblxuLy8g4p6VIENSw4lFUlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWVyU2Vqb3VyKGZvcm1EYXRhKSB7XG4gIGNvbnN0IHRpdHJlID0gZm9ybURhdGEuZ2V0KFwidGl0cmVcIik7XG4gIGNvbnN0IGxpZXUgPSBmb3JtRGF0YS5nZXQoXCJsaWV1XCIpO1xuICBjb25zdCBzYWlzb24gPSBmb3JtRGF0YS5nZXQoXCJzYWlzb25cIik7XG4gIGNvbnN0IHN0YXR1dCA9IGZvcm1EYXRhLmdldChcInN0YXR1dFwiKTtcbiAgY29uc3QgZGF0ZURlYnV0ID0gZm9ybURhdGEuZ2V0KFwiZGF0ZURlYnV0XCIpO1xuICBjb25zdCBkYXRlRmluID0gZm9ybURhdGEuZ2V0KFwiZGF0ZUZpblwiKTtcbiAgY29uc3QgcGxhY2VzID0gcGFyc2VJbnQoZm9ybURhdGEuZ2V0KFwicGxhY2VzXCIpKSB8fCAwO1xuICBjb25zdCB0cmFuY2hlc0FnZSA9IGZvcm1EYXRhLmdldChcInRyYW5jaGVzQWdlXCIpO1xuICBcbiAgLy8gT24gcsOpY3Vww6hyZSB0b3VzIGxlcyBwcml4IHNhaXNpcyAoZm9ybURhdGEuZ2V0QWxsIHLDqWN1cMOocmUgbGEgbGlzdGUgZGVzIGlucHV0cyBhdmVjIGxlIG3Dqm1lIG5hbWUpXG4gIGNvbnN0IHByaXhBcnJheSA9IGZvcm1EYXRhLmdldEFsbChcInByaXhcIikubWFwKHAgPT4gcGFyc2VGbG9hdChwKSkuZmlsdGVyKHAgPT4gIWlzTmFOKHApKTtcbiAgY29uc3QgcHJpeFByaW5jaXBhbCA9IHByaXhBcnJheVswXSB8fCAwOyAvLyBPbiBzdG9ja2UgbGUgcHJlbWllciBwcml4IGNvbW1lIHByaXggZGUgcsOpZsOpcmVuY2VcblxuICAvLyBHZXN0aW9uIGRlIGwnaW1hZ2UgYXZlYyBWZXJjZWwgQmxvYlxuICBjb25zdCBpbWFnZUZpbGUgPSBmb3JtRGF0YS5nZXQoXCJpbWFnZVwiKTtcbiAgbGV0IGltYWdlVXJsID0gbnVsbDtcblxuICBpZiAoaW1hZ2VGaWxlICYmIGltYWdlRmlsZS5zaXplID4gMCkge1xuICAgIC8vIE9uIGVudm9pZSBsJ2ltYWdlIHN1ciBsZXMgc2VydmV1cnMgZGUgVmVyY2VsXG4gICAgY29uc3QgYmxvYiA9IGF3YWl0IHB1dChgc2Vqb3Vycy8ke0RhdGUubm93KCl9LSR7aW1hZ2VGaWxlLm5hbWV9YCwgaW1hZ2VGaWxlLCB7XG4gICAgICBhY2Nlc3M6ICdwdWJsaWMnLFxuICAgIH0pO1xuICAgIGltYWdlVXJsID0gYmxvYi51cmw7XG4gIH1cblxuICBhd2FpdCBwcmlzbWEuc2Vqb3VyLmNyZWF0ZSh7XG4gICAgZGF0YToge1xuICAgICAgdGl0cmUsXG4gICAgICBsaWV1LFxuICAgICAgc2Fpc29uLFxuICAgICAgc3RhdHV0LFxuICAgICAgZGF0ZURlYnV0OiBkYXRlRGVidXQgPyBuZXcgRGF0ZShkYXRlRGVidXQpIDogbnVsbCxcbiAgICAgIGRhdGVGaW46IGRhdGVGaW4gPyBuZXcgRGF0ZShkYXRlRmluKSA6IG51bGwsXG4gICAgICBwbGFjZXMsXG4gICAgICB0cmFuY2hlc0FnZSxcbiAgICAgIHByaXg6IHByaXhQcmluY2lwYWwsXG4gICAgICBpbWFnZVVybCxcbiAgICB9LFxuICB9KTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9hZG1pblwiKTtcbn1cblxuLy8g4pyP77iPIE1PRElGSUVSXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbW9kaWZpZXJTZWpvdXIoaWQsIGZvcm1EYXRhKSB7XG4gIGNvbnN0IHNlam91ckFjdHVlbCA9IGF3YWl0IHByaXNtYS5zZWpvdXIuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGlkIH0gfSk7XG4gIFxuICBjb25zdCB0aXRyZSA9IGZvcm1EYXRhLmdldChcInRpdHJlXCIpO1xuICBjb25zdCBsaWV1ID0gZm9ybURhdGEuZ2V0KFwibGlldVwiKTtcbiAgY29uc3Qgc2Fpc29uID0gZm9ybURhdGEuZ2V0KFwic2Fpc29uXCIpO1xuICBjb25zdCBzdGF0dXQgPSBmb3JtRGF0YS5nZXQoXCJzdGF0dXRcIik7XG4gIGNvbnN0IGRhdGVEZWJ1dCA9IGZvcm1EYXRhLmdldChcImRhdGVEZWJ1dFwiKTtcbiAgY29uc3QgZGF0ZUZpbiA9IGZvcm1EYXRhLmdldChcImRhdGVGaW5cIik7XG4gIGNvbnN0IHBsYWNlcyA9IHBhcnNlSW50KGZvcm1EYXRhLmdldChcInBsYWNlc1wiKSkgfHwgMDtcbiAgY29uc3QgdHJhbmNoZXNBZ2UgPSBmb3JtRGF0YS5nZXQoXCJ0cmFuY2hlc0FnZVwiKTtcbiAgXG4gIGNvbnN0IHByaXhBcnJheSA9IGZvcm1EYXRhLmdldEFsbChcInByaXhcIikubWFwKHAgPT4gcGFyc2VGbG9hdChwKSkuZmlsdGVyKHAgPT4gIWlzTmFOKHApKTtcbiAgY29uc3QgcHJpeFByaW5jaXBhbCA9IHByaXhBcnJheVswXSB8fCAwO1xuXG4gIC8vIEdlc3Rpb24gZGUgbCdpbWFnZVxuICBjb25zdCBpbWFnZUZpbGUgPSBmb3JtRGF0YS5nZXQoXCJpbWFnZVwiKTtcbiAgbGV0IGltYWdlVXJsID0gc2Vqb3VyQWN0dWVsLmltYWdlVXJsOyAvLyBQYXIgZMOpZmF1dCBvbiBnYXJkZSBsJ2FuY2llbm5lXG5cbiAgLy8gU2kgdW5lIG5vdXZlbGxlIGltYWdlIGVzdCBzw6lsZWN0aW9ubsOpZVxuICBpZiAoaW1hZ2VGaWxlICYmIGltYWdlRmlsZS5zaXplID4gMCkge1xuICAgIC8vIDEuIE9uIHN1cHByaW1lIGwnYW5jaWVubmUgaW1hZ2Ugc3VyIFZlcmNlbCBCbG9iIHBvdXIgbmUgcGFzIGVuY29tYnJlciBsZSBzdG9ja2FnZVxuICAgIGlmIChzZWpvdXJBY3R1ZWwuaW1hZ2VVcmwpIHtcbiAgICAgIHRyeSB7IGF3YWl0IGRlbChzZWpvdXJBY3R1ZWwuaW1hZ2VVcmwpOyB9IGNhdGNoIChlKSB7IGNvbnNvbGUuZXJyb3IoXCJFcnJldXIgc3VwcHJlc3Npb24gYW5jaWVuIGJsb2JcIiwgZSk7IH1cbiAgICB9XG4gICAgLy8gMi4gT24gdXBsb2FkIGxhIG5vdXZlbGxlXG4gICAgY29uc3QgYmxvYiA9IGF3YWl0IHB1dChgc2Vqb3Vycy8ke0RhdGUubm93KCl9LSR7aW1hZ2VGaWxlLm5hbWV9YCwgaW1hZ2VGaWxlLCB7XG4gICAgICBhY2Nlc3M6ICdwdWJsaWMnLFxuICAgIH0pO1xuICAgIGltYWdlVXJsID0gYmxvYi51cmw7XG4gIH1cblxuICBhd2FpdCBwcmlzbWEuc2Vqb3VyLnVwZGF0ZSh7XG4gICAgd2hlcmU6IHsgaWQgfSxcbiAgICBkYXRhOiB7XG4gICAgICB0aXRyZSxcbiAgICAgIGxpZXUsXG4gICAgICBzYWlzb24sXG4gICAgICBzdGF0dXQsXG4gICAgICBkYXRlRGVidXQ6IGRhdGVEZWJ1dCA/IG5ldyBEYXRlKGRhdGVEZWJ1dCkgOiBudWxsLFxuICAgICAgZGF0ZUZpbjogZGF0ZUZpbiA/IG5ldyBEYXRlKGRhdGVGaW4pIDogbnVsbCxcbiAgICAgIHBsYWNlcyxcbiAgICAgIHRyYW5jaGVzQWdlLFxuICAgICAgcHJpeDogcHJpeFByaW5jaXBhbCxcbiAgICAgIGltYWdlVXJsLFxuICAgIH0sXG4gIH0pO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2FkbWluXCIpO1xufVxuXG4vLyDwn5eR77iPIFNVUFBSSU1FUlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHN1cHByaW1lclNlam91cihpZCkge1xuICAvLyBPbiByw6ljdXDDqHJlIGxlIHPDqWpvdXIgcG91ciBhdm9pciBsJ1VSTCBkZSBsJ2ltYWdlXG4gIGNvbnN0IHNlam91ciA9IGF3YWl0IHByaXNtYS5zZWpvdXIuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGlkIH0gfSk7XG5cbiAgLy8gT24gbmV0dG9pZSBsJ2ltYWdlIHN1ciBWZXJjZWwgQmxvYiBhdmFudCBkZSBzdXBwcmltZXIgbGUgcmVjb3JkIGVuIGJhc2VcbiAgaWYgKHNlam91cj8uaW1hZ2VVcmwpIHtcbiAgICB0cnkgeyBhd2FpdCBkZWwoc2Vqb3VyLmltYWdlVXJsKTsgfSBjYXRjaCAoZSkgeyBjb25zb2xlLmVycm9yKFwiRXJyZXVyIHN1cHByZXNzaW9uIGJsb2JcIiwgZSk7IH1cbiAgfVxuXG4gIGF3YWl0IHByaXNtYS5zZWpvdXIuZGVsZXRlKHtcbiAgICB3aGVyZTogeyBpZCB9LFxuICB9KTtcbiAgXG4gIHJldmFsaWRhdGVQYXRoKFwiL2FkbWluXCIpO1xufSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiMFJBd0dzQiw0TEFBQSJ9
}),
"[project]/app/admin/AdminDashboardClient.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminDashboardClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-client] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map.js [app-client] (ecmascript) <export default as Map>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tent$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/tent.js [app-client] (ecmascript) <export default as Tent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$euro$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Euro$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/euro.js [app-client] (ecmascript) <export default as Euro>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2d$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UploadCloud$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/cloud-upload.js [app-client] (ecmascript) <export default as UploadCloud>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.js [app-client] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-grid.js [app-client] (ecmascript) <export default as LayoutGrid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/list.js [app-client] (ecmascript) <export default as List>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clipboard-list.js [app-client] (ecmascript) <export default as ClipboardList>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square-pen.js [app-client] (ecmascript) <export default as Edit>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f$AdminLayout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/admin/AdminLayout.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$d0cc4c__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/app/actions/data:d0cc4c [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$c4d811__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/app/actions/data:c4d811 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$86380a__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/app/actions/data:86380a [app-client] (ecmascript) <text/javascript>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
// app/admin/AdminDashboardClient.jsx
"use client";
;
;
;
;
/* ── CONSTANTES GLOBALES ── */ const C = {
    yellow: "#FFC801",
    saffron: "#FF9932",
    teal: "#114C5A",
    lilac: "#EFDEF9",
    arctic: "#F1F6F4",
    white: "#ffffff",
    gray: "#8aaa",
    lightGray: "#e2e8f0"
};
const MENU = [
    {
        id: "dashboard",
        label: "Vue d'ensemble",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"]
    },
    {
        id: "sejours",
        label: "Gestion des Séjours",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__["Map"]
    },
    {
        id: "inscriptions",
        label: "Inscriptions",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
    },
    {
        id: "clients",
        label: "Clients & Familles",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
    },
    {
        id: "settings",
        label: "Paramètres",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"]
    }
];
/* ── UTILS ── */ const formatDateForInput = (dateString)=>{
    if (!dateString) return "";
    return new Date(dateString).toISOString().split('T')[0];
};
/* ── COMPOSANTS UI RÉUTILISABLES ── */ function StatCard({ title, value, icon: Icon, color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: C.white,
            borderRadius: "24px",
            padding: "24px",
            boxShadow: "0 4px 16px rgba(17,76,90,0.04)",
            display: "flex",
            flexDirection: "column",
            gap: "16px"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        width: "48px",
                        height: "48px",
                        borderRadius: "16px",
                        background: color + "20",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                        size: 24,
                        style: {
                            color: color
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                        lineNumber: 47,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: "13px",
                            fontWeight: 700,
                            color: C.gray,
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                            marginBottom: "4px"
                        },
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        style: {
                            fontSize: "28px",
                            fontWeight: 900,
                            color: C.teal,
                            lineHeight: 1
                        },
                        children: value
                    }, void 0, false, {
                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                lineNumber: 50,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_c = StatCard;
function CustomSelect({ name, label, options, defaultValue }) {
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const initialOption = options.find((o)=>o.value === defaultValue) || options[0];
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialOption);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            position: "relative"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                style: {
                    fontSize: "11px",
                    fontWeight: 700,
                    color: C.gray,
                    textTransform: "uppercase"
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "hidden",
                name: name,
                value: selected.value
            }, void 0, false, {
                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: ()=>setIsOpen(!isOpen),
                style: {
                    padding: "12px 16px",
                    borderRadius: "12px",
                    border: `1px solid ${isOpen ? C.yellow : C.lightGray}`,
                    background: C.arctic,
                    fontSize: "13px",
                    color: C.teal,
                    fontWeight: 600,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    transition: "all 0.2s"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "8px"
                        },
                        children: [
                            selected.icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(selected.icon, {
                                size: 14,
                                color: selected.color || C.teal
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                lineNumber: 72,
                                columnNumber: 29
                            }, this),
                            selected.label
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                        size: 14,
                        style: {
                            transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                            transition: "transform 0.2s"
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    marginTop: "8px",
                    background: C.white,
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    zIndex: 10,
                    overflow: "hidden",
                    border: `1px solid ${C.lightGray}`
                },
                children: options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: ()=>{
                            setSelected(opt);
                            setIsOpen(false);
                        },
                        style: {
                            padding: "12px 16px",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: C.teal,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            background: selected.value === opt.value ? C.arctic : "transparent"
                        },
                        children: [
                            opt.icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(opt.icon, {
                                size: 14,
                                color: opt.color || C.teal
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                lineNumber: 81,
                                columnNumber: 28
                            }, this),
                            opt.label
                        ]
                    }, opt.value, true, {
                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                        lineNumber: 80,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                lineNumber: 78,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
_s(CustomSelect, "quk5NPnr/e0BIqUkmvtWExVll/8=");
_c1 = CustomSelect;
function ImageUpload({ defaultValue }) {
    _s1();
    const [preview, setPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultValue || null);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = ()=>setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            flexDirection: "column",
            gap: "6px"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                style: {
                    fontSize: "11px",
                    fontWeight: 700,
                    color: C.gray,
                    textTransform: "uppercase"
                },
                children: "Image de couverture"
            }, void 0, false, {
                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: ()=>fileInputRef.current?.click(),
                style: {
                    width: "100%",
                    height: "140px",
                    borderRadius: "16px",
                    border: `2px dashed ${preview ? "transparent" : C.lightGray}`,
                    background: C.arctic,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "file",
                        name: "image",
                        accept: "image/*",
                        ref: fileInputRef,
                        onChange: handleImageChange,
                        style: {
                            display: "none"
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    preview ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: preview,
                        alt: "Aperçu",
                        style: {
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                        lineNumber: 109,
                        columnNumber: 20
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2d$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UploadCloud$3e$__["UploadCloud"], {
                                size: 32,
                                color: C.gray,
                                style: {
                                    marginBottom: "8px"
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                lineNumber: 111,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: "13px",
                                    fontWeight: 700,
                                    color: C.teal
                                },
                                children: "Cliquez pour uploader"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                lineNumber: 112,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                lineNumber: 107,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
        lineNumber: 105,
        columnNumber: 5
    }, this);
}
_s1(ImageUpload, "4n7EaoOxUXrudna9a2MQF+pdY0U=");
_c2 = ImageUpload;
/* ── MODALE CRÉATION / ÉDITION ── */ function ModalSejour({ sejourData, setSejourEnEdition, isSubmitting, setIsSubmitting }) {
    _s2();
    const isEditing = sejourData !== "nouveau";
    const [prixOptions, setPrixOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(isEditing && sejourData.prix ? [
        sejourData.prix
    ] : [
        0
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "absolute",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(17, 76, 90, 0.4)",
            backdropFilter: "blur(4px)"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                background: C.white,
                width: "100%",
                maxWidth: "650px",
                maxHeight: "90vh",
                overflowY: "auto",
                borderRadius: "24px",
                padding: "32px",
                position: "relative",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setSejourEnEdition(null),
                    style: {
                        position: "absolute",
                        top: "24px",
                        right: "24px",
                        background: C.arctic,
                        border: "none",
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                        size: 16
                    }, void 0, false, {
                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                        lineNumber: 128,
                        columnNumber: 293
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                    lineNumber: 128,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    style: {
                        fontSize: "20px",
                        fontWeight: 900,
                        color: C.teal,
                        marginBottom: "24px"
                    },
                    children: isEditing ? "Modifier le séjour" : "Créer un nouveau séjour"
                }, void 0, false, {
                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                    lineNumber: 129,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    action: async (formData)=>{
                        setIsSubmitting(true);
                        if (isEditing) {
                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$c4d811__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["modifierSejour"])(sejourData.id, formData);
                        } else {
                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$d0cc4c__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["creerSejour"])(formData);
                        }
                        setIsSubmitting(false);
                        setSejourEnEdition(null);
                    },
                    style: {
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: "16px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    name: "titre",
                                    defaultValue: isEditing ? sejourData.titre : "",
                                    required: true,
                                    placeholder: "Titre du séjour",
                                    style: {
                                        flex: 1,
                                        padding: "12px",
                                        borderRadius: "12px",
                                        border: `1px solid ${C.lightGray}`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 142,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    name: "tranchesAge",
                                    defaultValue: isEditing ? sejourData.tranchesAge : "",
                                    placeholder: "Âges (ex: 6-12 ans)",
                                    style: {
                                        flex: 1,
                                        padding: "12px",
                                        borderRadius: "12px",
                                        border: `1px solid ${C.lightGray}`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 143,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                            lineNumber: 141,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: "16px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    name: "lieu",
                                    defaultValue: isEditing ? sejourData.lieu : "",
                                    placeholder: "Lieu (Ville, Pays)",
                                    style: {
                                        flex: 1,
                                        padding: "12px",
                                        borderRadius: "12px",
                                        border: `1px solid ${C.lightGray}`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 147,
                                    columnNumber: 14
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    name: "places",
                                    defaultValue: isEditing ? sejourData.places : "",
                                    placeholder: "Nombre de places",
                                    style: {
                                        flex: 1,
                                        padding: "12px",
                                        borderRadius: "12px",
                                        border: `1px solid ${C.lightGray}`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 148,
                                    columnNumber: 14
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                            lineNumber: 146,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                flexDirection: "column",
                                gap: "8px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: {
                                        fontSize: "11px",
                                        fontWeight: 700,
                                        color: C.gray,
                                        textTransform: "uppercase"
                                    },
                                    children: "Option(s) de prix (€)"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 152,
                                    columnNumber: 13
                                }, this),
                                prixOptions.map((p, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        name: "prix",
                                        defaultValue: p,
                                        placeholder: "Prix",
                                        style: {
                                            padding: "12px",
                                            borderRadius: "12px",
                                            border: `1px solid ${C.lightGray}`
                                        }
                                    }, idx, false, {
                                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                        lineNumber: 154,
                                        columnNumber: 15
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setPrixOptions([
                                            ...prixOptions,
                                            0
                                        ]),
                                    style: {
                                        background: "none",
                                        border: `1px dashed ${C.gray}`,
                                        color: C.gray,
                                        padding: "8px",
                                        borderRadius: "10px",
                                        fontSize: "12px",
                                        cursor: "pointer"
                                    },
                                    children: "+ Ajouter une option de prix"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 156,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                            lineNumber: 151,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: "16px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "date",
                                    name: "dateDebut",
                                    defaultValue: isEditing ? formatDateForInput(sejourData.dateDebut) : "",
                                    style: {
                                        flex: 1,
                                        padding: "12px",
                                        borderRadius: "12px",
                                        border: `1px solid ${C.lightGray}`,
                                        color: C.gray
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 160,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "date",
                                    name: "dateFin",
                                    defaultValue: isEditing ? formatDateForInput(sejourData.dateFin) : "",
                                    style: {
                                        flex: 1,
                                        padding: "12px",
                                        borderRadius: "12px",
                                        border: `1px solid ${C.lightGray}`,
                                        color: C.gray
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 161,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                            lineNumber: 159,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: "16px",
                                zIndex: 20
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomSelect, {
                                    name: "saison",
                                    label: "Saison",
                                    defaultValue: isEditing ? sejourData.saison : "Automne",
                                    options: [
                                        {
                                            value: "Automne",
                                            label: "Automne",
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tent$3e$__["Tent"],
                                            color: C.saffron
                                        },
                                        {
                                            value: "Hiver",
                                            label: "Hiver",
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tent$3e$__["Tent"],
                                            color: C.teal
                                        },
                                        {
                                            value: "Printemps",
                                            label: "Printemps",
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tent$3e$__["Tent"],
                                            color: "#10b981"
                                        },
                                        {
                                            value: "Été",
                                            label: "Été",
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tent$3e$__["Tent"],
                                            color: C.yellow
                                        }
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 165,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomSelect, {
                                    name: "statut",
                                    label: "Statut",
                                    defaultValue: isEditing ? sejourData.statut : "Brouillon",
                                    options: [
                                        {
                                            value: "Brouillon",
                                            label: "Brouillon",
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"],
                                            color: C.gray
                                        },
                                        {
                                            value: "Publié",
                                            label: "Publié",
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"],
                                            color: "#10b981"
                                        }
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 166,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                            lineNumber: 164,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageUpload, {
                            defaultValue: isEditing ? sejourData.imageUrl : null
                        }, void 0, false, {
                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                            lineNumber: 169,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: "12px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setSejourEnEdition(null),
                                    style: {
                                        cursor: "pointer",
                                        background: "none",
                                        border: "none",
                                        color: C.gray,
                                        fontWeight: 600
                                    },
                                    children: "Annuler"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 172,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: isSubmitting,
                                    style: {
                                        background: C.yellow,
                                        color: C.teal,
                                        padding: "12px 24px",
                                        borderRadius: "12px",
                                        border: "none",
                                        fontWeight: 800
                                    },
                                    children: isSubmitting ? "Enregistrement..." : isEditing ? "Enregistrer les modifications" : "Enregistrer"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 173,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                            lineNumber: 171,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                    lineNumber: 133,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
            lineNumber: 127,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
        lineNumber: 126,
        columnNumber: 5
    }, this);
}
_s2(ModalSejour, "3qREGAmKm1jQmfUtr/Olc9OwEaE=");
_c3 = ModalSejour;
/* ── COMPOSANTS DE TABLEAUX ET GRILLES ── */ function TableInscriptions({ data }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: C.white,
            borderRadius: "24px",
            padding: "32px",
            boxShadow: "0 4px 16px rgba(17,76,90,0.04)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                style: {
                    fontSize: "18px",
                    fontWeight: 800,
                    color: C.teal,
                    marginBottom: "24px"
                },
                children: "Dernières Inscriptions"
            }, void 0, false, {
                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                lineNumber: 187,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                style: {
                    width: "100%",
                    borderCollapse: "collapse"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            style: {
                                borderBottom: `2px solid ${C.arctic}`,
                                textAlign: "left"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    style: {
                                        padding: "16px",
                                        fontSize: "12px",
                                        color: C.gray
                                    },
                                    children: "PARTICIPANT"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 190,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    style: {
                                        padding: "16px",
                                        fontSize: "12px",
                                        color: C.gray
                                    },
                                    children: "SÉJOUR"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 191,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    style: {
                                        padding: "16px",
                                        fontSize: "12px",
                                        color: C.gray
                                    },
                                    children: "MONTANT"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 192,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                            lineNumber: 189,
                            columnNumber: 16
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                        lineNumber: 189,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                        children: data?.map((b)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                style: {
                                    borderBottom: `1px solid ${C.arctic}`
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        style: {
                                            padding: "16px",
                                            fontSize: "13px",
                                            fontWeight: 700,
                                            color: C.teal
                                        },
                                        children: [
                                            b.client?.nom,
                                            " ",
                                            b.client?.prenom
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                        lineNumber: 197,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        style: {
                                            padding: "16px",
                                            fontSize: "13px"
                                        },
                                        children: b.sejour?.titre
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                        lineNumber: 198,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        style: {
                                            padding: "16px",
                                            fontSize: "13px",
                                            fontWeight: 800
                                        },
                                        children: [
                                            b.montantPaye,
                                            " €"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                        lineNumber: 199,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, b.id, true, {
                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                lineNumber: 196,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                        lineNumber: 194,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                lineNumber: 188,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
        lineNumber: 186,
        columnNumber: 5
    }, this);
}
_c4 = TableInscriptions;
function TableSejours({ data, onEdit, onDelete }) {
    const actionBtnStyle = {
        background: C.arctic,
        border: "none",
        width: "32px",
        height: "32px",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: C.teal,
        transition: "background 0.2s"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: C.white,
            borderRadius: "24px",
            padding: "32px",
            boxShadow: "0 4px 16px rgba(17,76,90,0.04)"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            style: {
                width: "100%",
                borderCollapse: "collapse"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        style: {
                            borderBottom: `2px solid ${C.arctic}`,
                            textAlign: "left"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                style: {
                                    padding: "16px",
                                    fontSize: "12px",
                                    color: C.gray
                                },
                                children: "SÉJOUR"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                lineNumber: 215,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                style: {
                                    padding: "16px",
                                    fontSize: "12px",
                                    color: C.gray
                                },
                                children: "DATES"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                lineNumber: 216,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                style: {
                                    padding: "16px",
                                    fontSize: "12px",
                                    color: C.gray
                                },
                                children: "SAISON"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                lineNumber: 217,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                style: {
                                    padding: "16px",
                                    fontSize: "12px",
                                    color: C.gray,
                                    textAlign: "right"
                                },
                                children: "ACTIONS"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                lineNumber: 218,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                        lineNumber: 214,
                        columnNumber: 16
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                    lineNumber: 214,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                    children: data?.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: "hover-row",
                            style: {
                                borderBottom: `1px solid ${C.arctic}`,
                                transition: "background 0.2s"
                            },
                            onMouseOver: (e)=>e.currentTarget.style.background = C.arctic,
                            onMouseOut: (e)=>e.currentTarget.style.background = "transparent",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    style: {
                                        padding: "16px",
                                        fontSize: "13px",
                                        fontWeight: 800,
                                        color: C.teal
                                    },
                                    children: s.titre
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 223,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    style: {
                                        padding: "16px",
                                        fontSize: "13px",
                                        color: C.gray
                                    },
                                    children: s.dateDebut ? new Date(s.dateDebut).toLocaleDateString("fr-FR") : "À définir"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 224,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    style: {
                                        padding: "16px"
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            background: C.arctic,
                                            padding: "4px 8px",
                                            borderRadius: "6px",
                                            fontSize: "11px",
                                            fontWeight: 700,
                                            color: C.teal
                                        },
                                        children: s.saison
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                        lineNumber: 225,
                                        columnNumber: 47
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 225,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    style: {
                                        padding: "16px",
                                        display: "flex",
                                        gap: "6px",
                                        justifyContent: "flex-end"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "extra-actions",
                                            style: {
                                                display: "flex",
                                                gap: "6px"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    title: "Inscrits",
                                                    style: actionBtnStyle,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                        size: 15
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                        lineNumber: 228,
                                                        columnNumber: 67
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                    lineNumber: 228,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    title: "Formulaire",
                                                    style: actionBtnStyle,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__["ClipboardList"], {
                                                        size: 15
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                        lineNumber: 229,
                                                        columnNumber: 69
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                    lineNumber: 229,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    title: "Lien public",
                                                    style: actionBtnStyle,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                        size: 15
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                        lineNumber: 230,
                                                        columnNumber: 70
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                    lineNumber: 230,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 227,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            title: "Éditer",
                                            onClick: ()=>onEdit(s),
                                            style: actionBtnStyle,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__["Edit"], {
                                                size: 15
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                lineNumber: 232,
                                                columnNumber: 89
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 232,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            title: "Supprimer",
                                            onClick: ()=>onDelete(s.id),
                                            style: {
                                                ...actionBtnStyle,
                                                color: "#f63656"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                size: 15
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                lineNumber: 233,
                                                columnNumber: 122
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 233,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 226,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, s.id, true, {
                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                            lineNumber: 222,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                    lineNumber: 220,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
            lineNumber: 213,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
        lineNumber: 212,
        columnNumber: 5
    }, this);
}
_c5 = TableSejours;
function GridSejours({ data, onEdit, onDelete }) {
    const actionBtnStyle = {
        background: "transparent",
        border: "none",
        width: "32px",
        height: "32px",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: C.gray
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px"
        },
        children: data?.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hover-row",
                style: {
                    background: C.white,
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 4px 16px rgba(17,76,90,0.04)",
                    border: `1px solid ${C.lightGray}`,
                    display: "flex",
                    flexDirection: "column"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            height: "150px",
                            background: C.arctic,
                            position: "relative",
                            overflow: "hidden"
                        },
                        children: [
                            s.imageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: s.imageUrl,
                                style: {
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                lineNumber: 251,
                                columnNumber: 28
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                size: 32,
                                color: C.gray,
                                style: {
                                    opacity: 0.3,
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%,-50%)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                lineNumber: 251,
                                columnNumber: 112
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: "absolute",
                                    top: "12px",
                                    right: "12px",
                                    background: C.white,
                                    padding: "6px 10px",
                                    borderRadius: "10px",
                                    fontSize: "12px",
                                    fontWeight: 800,
                                    color: C.teal
                                },
                                children: [
                                    s.prix,
                                    " €"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                lineNumber: 252,
                                columnNumber: 14
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                        lineNumber: 250,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "20px",
                            flex: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                style: {
                                    fontSize: "17px",
                                    fontWeight: 800,
                                    color: C.teal,
                                    marginBottom: "8px"
                                },
                                children: s.titre
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                lineNumber: 255,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: '12px',
                                    color: C.gray,
                                    fontWeight: 600
                                },
                                children: s.tranchesAge
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                lineNumber: 256,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                        lineNumber: 254,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "12px 16px",
                            borderTop: `1px solid ${C.lightGray}`,
                            display: "flex",
                            justifyContent: "space-between",
                            background: C.arctic + "40"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "extra-actions",
                                style: {
                                    display: "flex",
                                    gap: "4px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        style: actionBtnStyle,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 260,
                                            columnNumber: 46
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                        lineNumber: 260,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        style: actionBtnStyle,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__["ClipboardList"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 261,
                                            columnNumber: 46
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                        lineNumber: 261,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                lineNumber: 259,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: "4px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onEdit(s),
                                        style: actionBtnStyle,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__["Edit"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 264,
                                            columnNumber: 72
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                        lineNumber: 264,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onDelete(s.id),
                                        style: {
                                            ...actionBtnStyle,
                                            color: "#f63656"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 265,
                                            columnNumber: 100
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                        lineNumber: 265,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                lineNumber: 263,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                        lineNumber: 258,
                        columnNumber: 11
                    }, this)
                ]
            }, s.id, true, {
                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                lineNumber: 249,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
        lineNumber: 247,
        columnNumber: 5
    }, this);
}
_c6 = GridSejours;
function AdminDashboardClient({ stats, inscriptions, sejours, clients }) {
    _s3();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("dashboard");
    const [sidebarOpen, setSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [sejourEnEdition, setSejourEnEdition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("table");
    const sejoursTries = [
        ...sejours || []
    ].sort((a, b)=>new Date(a.dateDebut) - new Date(b.dateDebut));
    const handleDelete = async (id)=>{
        if (window.confirm("Supprimer définitivement ce séjour ?")) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$86380a__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["supprimerSejour"])(id);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f$AdminLayout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        sidebarOpen: sidebarOpen,
        setSidebarOpen: setSidebarOpen,
        activeTab: activeTab,
        setActiveTab: setActiveTab,
        MENU: MENU,
        C: C,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        .extra-actions { opacity: 0; transform: translateX(10px); transition: all 0.2s ease; }
        .hover-row:hover .extra-actions { opacity: 1; transform: translateX(0); }
      `
            }, void 0, false, {
                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                lineNumber: 291,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    overflowY: "auto",
                    padding: "40px 32px"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        maxWidth: "1200px",
                        margin: "0 auto"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: "40px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                gap: "20px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            style: {
                                                fontSize: "32px",
                                                fontWeight: 900,
                                                color: C.teal,
                                                marginBottom: "8px"
                                            },
                                            children: [
                                                activeTab === "dashboard" && "Bonjour, l'équipe 👋",
                                                activeTab === "sejours" && "Gestion des Séjours 🏕️",
                                                activeTab === "clients" && "Répertoire Clients 👥"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 301,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: "14px",
                                                color: C.gray
                                            },
                                            children: "Données Neon en temps réel."
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 306,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 300,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        position: "relative",
                                        width: "320px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                            size: 18,
                                            color: C.gray,
                                            style: {
                                                position: "absolute",
                                                left: "16px",
                                                top: "50%",
                                                transform: "translateY(-50%)"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 309,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            placeholder: "Recherche...",
                                            style: {
                                                width: "100%",
                                                padding: "14px 16px 14px 44px",
                                                borderRadius: "14px",
                                                border: `1px solid ${C.lightGray}`,
                                                background: C.white
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 310,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 308,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                            lineNumber: 299,
                            columnNumber: 11
                        }, this),
                        activeTab === "dashboard" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "grid",
                                        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                                        gap: "24px",
                                        marginBottom: "40px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                                            title: "Inscriptions",
                                            value: stats?.inscriptionsTotal || 0,
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
                                            color: C.saffron
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 317,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                                            title: "CA",
                                            value: `${stats?.ca || 0} €`,
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$euro$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Euro$3e$__["Euro"],
                                            color: "#10b981"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 318,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                                            title: "Séjours",
                                            value: stats?.sejoursActifs || 0,
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tent$3e$__["Tent"],
                                            color: C.teal
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 319,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                                            title: "Familles",
                                            value: stats?.familles || 0,
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
                                            color: C.yellow
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 320,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 316,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TableInscriptions, {
                                    data: inscriptions
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 322,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true),
                        activeTab === "sejours" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: "24px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: "14px",
                                                fontWeight: 700,
                                                color: C.gray
                                            },
                                            children: [
                                                sejoursTries.length,
                                                " séjour(s)"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 329,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                gap: "16px"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setSejourEnEdition("nouveau"),
                                                    style: {
                                                        background: C.yellow,
                                                        color: C.teal,
                                                        border: "none",
                                                        padding: "10px 16px",
                                                        borderRadius: "10px",
                                                        fontWeight: 800,
                                                        cursor: "pointer"
                                                    },
                                                    children: "+ Créer un séjour"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                    lineNumber: 331,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: "flex",
                                                        background: C.white,
                                                        borderRadius: "10px",
                                                        padding: "4px",
                                                        border: `1px solid ${C.lightGray}`
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setViewMode("table"),
                                                            style: {
                                                                background: viewMode === "table" ? C.arctic : "transparent",
                                                                border: 'none',
                                                                padding: '8px',
                                                                borderRadius: '8px',
                                                                cursor: 'pointer'
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"], {
                                                                size: 18
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                                lineNumber: 333,
                                                                columnNumber: 206
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                            lineNumber: 333,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setViewMode("grid"),
                                                            style: {
                                                                background: viewMode === "grid" ? C.arctic : "transparent",
                                                                border: 'none',
                                                                padding: '8px',
                                                                borderRadius: '8px',
                                                                cursor: 'pointer'
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__["LayoutGrid"], {
                                                                size: 18
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                                lineNumber: 334,
                                                                columnNumber: 204
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                            lineNumber: 334,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                    lineNumber: 332,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 330,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 328,
                                    columnNumber: 15
                                }, this),
                                viewMode === "table" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TableSejours, {
                                    data: sejoursTries,
                                    onEdit: setSejourEnEdition,
                                    onDelete: handleDelete
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 338,
                                    columnNumber: 39
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GridSejours, {
                                    data: sejoursTries,
                                    onEdit: setSejourEnEdition,
                                    onDelete: handleDelete
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 338,
                                    columnNumber: 130
                                }, this)
                            ]
                        }, void 0, true),
                        activeTab === "clients" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                                gap: "20px"
                            },
                            children: clients?.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: C.white,
                                        padding: "24px",
                                        borderRadius: "20px",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.03)"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            style: {
                                                color: C.teal,
                                                fontWeight: 800
                                            },
                                            children: [
                                                c.nom,
                                                " ",
                                                c.prenom
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 346,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: '13px',
                                                color: C.gray
                                            },
                                            children: c.email
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 347,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, c.id, true, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 345,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                            lineNumber: 343,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                    lineNumber: 297,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                lineNumber: 296,
                columnNumber: 7
            }, this),
            sejourEnEdition && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ModalSejour, {
                sejourData: sejourEnEdition,
                setSejourEnEdition: setSejourEnEdition,
                isSubmitting: isSubmitting,
                setIsSubmitting: setIsSubmitting
            }, void 0, false, {
                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                lineNumber: 356,
                columnNumber: 27
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
        lineNumber: 289,
        columnNumber: 5
    }, this);
}
_s3(AdminDashboardClient, "xwurSiVk7fXFQqcCn9dPQJfp+UY=");
_c7 = AdminDashboardClient;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7;
__turbopack_context__.k.register(_c, "StatCard");
__turbopack_context__.k.register(_c1, "CustomSelect");
__turbopack_context__.k.register(_c2, "ImageUpload");
__turbopack_context__.k.register(_c3, "ModalSejour");
__turbopack_context__.k.register(_c4, "TableInscriptions");
__turbopack_context__.k.register(_c5, "TableSejours");
__turbopack_context__.k.register(_c6, "GridSejours");
__turbopack_context__.k.register(_c7, "AdminDashboardClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_9e1e5f84._.js.map