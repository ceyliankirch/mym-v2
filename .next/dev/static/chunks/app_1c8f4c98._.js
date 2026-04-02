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
"[project]/app/actions/data:6a4f83 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
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
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vc2Vqb3Vycy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuaW1wb3J0IHsgcHV0LCBkZWwgfSBmcm9tIFwiQHZlcmNlbC9ibG9iXCI7IC8vIPCfk7ggSW1wb3J0YXRpb24gZGUgbCdvdXRpbCBkZSBzdG9ja2FnZSBWZXJjZWxcblxuLy8g4p6VIENSw4lFUlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWVyU2Vqb3VyKGZvcm1EYXRhKSB7XG4gIGNvbnN0IHRpdHJlID0gZm9ybURhdGEuZ2V0KFwidGl0cmVcIik7XG4gIGNvbnN0IGxpZXUgPSBmb3JtRGF0YS5nZXQoXCJsaWV1XCIpO1xuICBjb25zdCBzYWlzb24gPSBmb3JtRGF0YS5nZXQoXCJzYWlzb25cIik7XG4gIGNvbnN0IHN0YXR1dCA9IGZvcm1EYXRhLmdldChcInN0YXR1dFwiKTtcbiAgY29uc3QgZGF0ZURlYnV0ID0gZm9ybURhdGEuZ2V0KFwiZGF0ZURlYnV0XCIpO1xuICBjb25zdCBkYXRlRmluID0gZm9ybURhdGEuZ2V0KFwiZGF0ZUZpblwiKTtcbiAgY29uc3QgcGxhY2VzID0gcGFyc2VJbnQoZm9ybURhdGEuZ2V0KFwicGxhY2VzXCIpKSB8fCAwO1xuICBjb25zdCB0cmFuY2hlc0FnZSA9IGZvcm1EYXRhLmdldChcInRyYW5jaGVzQWdlXCIpO1xuICBcbiAgLy8gT24gcsOpY3Vww6hyZSB0b3VzIGxlcyBwcml4IHNhaXNpcyAoZm9ybURhdGEuZ2V0QWxsIHLDqWN1cMOocmUgbGEgbGlzdGUgZGVzIGlucHV0cyBhdmVjIGxlIG3Dqm1lIG5hbWUpXG4gIGNvbnN0IHByaXhBcnJheSA9IGZvcm1EYXRhLmdldEFsbChcInByaXhcIikubWFwKHAgPT4gcGFyc2VGbG9hdChwKSkuZmlsdGVyKHAgPT4gIWlzTmFOKHApKTtcbiAgY29uc3QgcHJpeFByaW5jaXBhbCA9IHByaXhBcnJheVswXSB8fCAwOyAvLyBPbiBzdG9ja2UgbGUgcHJlbWllciBwcml4IGNvbW1lIHByaXggZGUgcsOpZsOpcmVuY2VcblxuICAvLyBHZXN0aW9uIGRlIGwnaW1hZ2UgYXZlYyBWZXJjZWwgQmxvYlxuICBjb25zdCBpbWFnZUZpbGUgPSBmb3JtRGF0YS5nZXQoXCJpbWFnZVwiKTtcbiAgbGV0IGltYWdlVXJsID0gbnVsbDtcblxuICBpZiAoaW1hZ2VGaWxlICYmIGltYWdlRmlsZS5zaXplID4gMCkge1xuICAgIC8vIE9uIGVudm9pZSBsJ2ltYWdlIHN1ciBsZXMgc2VydmV1cnMgZGUgVmVyY2VsXG4gICAgY29uc3QgYmxvYiA9IGF3YWl0IHB1dChgc2Vqb3Vycy8ke0RhdGUubm93KCl9LSR7aW1hZ2VGaWxlLm5hbWV9YCwgaW1hZ2VGaWxlLCB7XG4gICAgICBhY2Nlc3M6ICdwdWJsaWMnLFxuICAgIH0pO1xuICAgIGltYWdlVXJsID0gYmxvYi51cmw7XG4gIH1cblxuICBhd2FpdCBwcmlzbWEuc2Vqb3VyLmNyZWF0ZSh7XG4gICAgZGF0YToge1xuICAgICAgdGl0cmUsXG4gICAgICBsaWV1LFxuICAgICAgc2Fpc29uLFxuICAgICAgc3RhdHV0LFxuICAgICAgZGF0ZURlYnV0OiBkYXRlRGVidXQgPyBuZXcgRGF0ZShkYXRlRGVidXQpIDogbnVsbCxcbiAgICAgIGRhdGVGaW46IGRhdGVGaW4gPyBuZXcgRGF0ZShkYXRlRmluKSA6IG51bGwsXG4gICAgICBwbGFjZXMsXG4gICAgICB0cmFuY2hlc0FnZSxcbiAgICAgIHByaXg6IHByaXhQcmluY2lwYWwsXG4gICAgICBpbWFnZVVybCxcbiAgICB9LFxuICB9KTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9hZG1pblwiKTtcbn1cblxuLy8g4pyP77iPIE1PRElGSUVSXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbW9kaWZpZXJTZWpvdXIoaWQsIGZvcm1EYXRhKSB7XG4gIGNvbnN0IHNlam91ckFjdHVlbCA9IGF3YWl0IHByaXNtYS5zZWpvdXIuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGlkIH0gfSk7XG4gIFxuICBjb25zdCB0aXRyZSA9IGZvcm1EYXRhLmdldChcInRpdHJlXCIpO1xuICBjb25zdCBsaWV1ID0gZm9ybURhdGEuZ2V0KFwibGlldVwiKTtcbiAgY29uc3Qgc2Fpc29uID0gZm9ybURhdGEuZ2V0KFwic2Fpc29uXCIpO1xuICBjb25zdCBzdGF0dXQgPSBmb3JtRGF0YS5nZXQoXCJzdGF0dXRcIik7XG4gIGNvbnN0IGRhdGVEZWJ1dCA9IGZvcm1EYXRhLmdldChcImRhdGVEZWJ1dFwiKTtcbiAgY29uc3QgZGF0ZUZpbiA9IGZvcm1EYXRhLmdldChcImRhdGVGaW5cIik7XG4gIGNvbnN0IHBsYWNlcyA9IHBhcnNlSW50KGZvcm1EYXRhLmdldChcInBsYWNlc1wiKSkgfHwgMDtcbiAgY29uc3QgdHJhbmNoZXNBZ2UgPSBmb3JtRGF0YS5nZXQoXCJ0cmFuY2hlc0FnZVwiKTtcbiAgXG4gIGNvbnN0IHByaXhBcnJheSA9IGZvcm1EYXRhLmdldEFsbChcInByaXhcIikubWFwKHAgPT4gcGFyc2VGbG9hdChwKSkuZmlsdGVyKHAgPT4gIWlzTmFOKHApKTtcbiAgY29uc3QgcHJpeFByaW5jaXBhbCA9IHByaXhBcnJheVswXSB8fCAwO1xuXG4gIC8vIEdlc3Rpb24gZGUgbCdpbWFnZVxuICBjb25zdCBpbWFnZUZpbGUgPSBmb3JtRGF0YS5nZXQoXCJpbWFnZVwiKTtcbiAgbGV0IGltYWdlVXJsID0gc2Vqb3VyQWN0dWVsLmltYWdlVXJsOyAvLyBQYXIgZMOpZmF1dCBvbiBnYXJkZSBsJ2FuY2llbm5lXG5cbiAgLy8gU2kgdW5lIG5vdXZlbGxlIGltYWdlIGVzdCBzw6lsZWN0aW9ubsOpZVxuICBpZiAoaW1hZ2VGaWxlICYmIGltYWdlRmlsZS5zaXplID4gMCkge1xuICAgIC8vIDEuIE9uIHN1cHByaW1lIGwnYW5jaWVubmUgaW1hZ2Ugc3VyIFZlcmNlbCBCbG9iIHBvdXIgbmUgcGFzIGVuY29tYnJlciBsZSBzdG9ja2FnZVxuICAgIGlmIChzZWpvdXJBY3R1ZWwuaW1hZ2VVcmwpIHtcbiAgICAgIHRyeSB7IGF3YWl0IGRlbChzZWpvdXJBY3R1ZWwuaW1hZ2VVcmwpOyB9IGNhdGNoIChlKSB7IGNvbnNvbGUuZXJyb3IoXCJFcnJldXIgc3VwcHJlc3Npb24gYW5jaWVuIGJsb2JcIiwgZSk7IH1cbiAgICB9XG4gICAgLy8gMi4gT24gdXBsb2FkIGxhIG5vdXZlbGxlXG4gICAgY29uc3QgYmxvYiA9IGF3YWl0IHB1dChgc2Vqb3Vycy8ke0RhdGUubm93KCl9LSR7aW1hZ2VGaWxlLm5hbWV9YCwgaW1hZ2VGaWxlLCB7XG4gICAgICBhY2Nlc3M6ICdwdWJsaWMnLFxuICAgIH0pO1xuICAgIGltYWdlVXJsID0gYmxvYi51cmw7XG4gIH1cblxuICBhd2FpdCBwcmlzbWEuc2Vqb3VyLnVwZGF0ZSh7XG4gICAgd2hlcmU6IHsgaWQgfSxcbiAgICBkYXRhOiB7XG4gICAgICB0aXRyZSxcbiAgICAgIGxpZXUsXG4gICAgICBzYWlzb24sXG4gICAgICBzdGF0dXQsXG4gICAgICBkYXRlRGVidXQ6IGRhdGVEZWJ1dCA/IG5ldyBEYXRlKGRhdGVEZWJ1dCkgOiBudWxsLFxuICAgICAgZGF0ZUZpbjogZGF0ZUZpbiA/IG5ldyBEYXRlKGRhdGVGaW4pIDogbnVsbCxcbiAgICAgIHBsYWNlcyxcbiAgICAgIHRyYW5jaGVzQWdlLFxuICAgICAgcHJpeDogcHJpeFByaW5jaXBhbCxcbiAgICAgIGltYWdlVXJsLFxuICAgIH0sXG4gIH0pO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2FkbWluXCIpO1xufVxuXG4vLyDwn5eR77iPIFNVUFBSSU1FUlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHN1cHByaW1lclNlam91cihpZCkge1xuICAvLyBPbiByw6ljdXDDqHJlIGxlIHPDqWpvdXIgcG91ciBhdm9pciBsJ1VSTCBkZSBsJ2ltYWdlXG4gIGNvbnN0IHNlam91ciA9IGF3YWl0IHByaXNtYS5zZWpvdXIuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGlkIH0gfSk7XG5cbiAgLy8gT24gbmV0dG9pZSBsJ2ltYWdlIHN1ciBWZXJjZWwgQmxvYiBhdmFudCBkZSBzdXBwcmltZXIgbGUgcmVjb3JkIGVuIGJhc2VcbiAgaWYgKHNlam91cj8uaW1hZ2VVcmwpIHtcbiAgICB0cnkgeyBhd2FpdCBkZWwoc2Vqb3VyLmltYWdlVXJsKTsgfSBjYXRjaCAoZSkgeyBjb25zb2xlLmVycm9yKFwiRXJyZXVyIHN1cHByZXNzaW9uIGJsb2JcIiwgZSk7IH1cbiAgfVxuXG4gIGF3YWl0IHByaXNtYS5zZWpvdXIuZGVsZXRlKHtcbiAgICB3aGVyZTogeyBpZCB9LFxuICB9KTtcbiAgXG4gIHJldmFsaWRhdGVQYXRoKFwiL2FkbWluXCIpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdG9nZ2xlU3RhdHV0KGlkLCBub3V2ZWF1U3RhdHV0KSB7XG4gIGF3YWl0IHByaXNtYS5zZWpvdXIudXBkYXRlKHtcbiAgICB3aGVyZTogeyBpZCB9LFxuICAgIGRhdGE6IHsgc3RhdHV0OiBub3V2ZWF1U3RhdHV0IH0sXG4gIH0pO1xuICByZXZhbGlkYXRlUGF0aChcIi9hZG1pblwiKTtcbn1cblxuLy8g4q2QIE1FVFRSRSDDgCBMJ0FGRklDSEUgKE91aSAvIE5vbilcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB0b2dnbGVFbkF2YW50KGlkLCBlbkF2YW50KSB7XG4gIGF3YWl0IHByaXNtYS5zZWpvdXIudXBkYXRlKHtcbiAgICB3aGVyZTogeyBpZCB9LFxuICAgIGRhdGE6IHsgZW5BdmFudDogZW5BdmFudCB9LFxuICB9KTtcbiAgcmV2YWxpZGF0ZVBhdGgoXCIvYWRtaW5cIik7XG59Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJzUkFPc0Isd0xBQUEifQ==
}),
"[project]/app/actions/data:b956da [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
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
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vc2Vqb3Vycy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuaW1wb3J0IHsgcHV0LCBkZWwgfSBmcm9tIFwiQHZlcmNlbC9ibG9iXCI7IC8vIPCfk7ggSW1wb3J0YXRpb24gZGUgbCdvdXRpbCBkZSBzdG9ja2FnZSBWZXJjZWxcblxuLy8g4p6VIENSw4lFUlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWVyU2Vqb3VyKGZvcm1EYXRhKSB7XG4gIGNvbnN0IHRpdHJlID0gZm9ybURhdGEuZ2V0KFwidGl0cmVcIik7XG4gIGNvbnN0IGxpZXUgPSBmb3JtRGF0YS5nZXQoXCJsaWV1XCIpO1xuICBjb25zdCBzYWlzb24gPSBmb3JtRGF0YS5nZXQoXCJzYWlzb25cIik7XG4gIGNvbnN0IHN0YXR1dCA9IGZvcm1EYXRhLmdldChcInN0YXR1dFwiKTtcbiAgY29uc3QgZGF0ZURlYnV0ID0gZm9ybURhdGEuZ2V0KFwiZGF0ZURlYnV0XCIpO1xuICBjb25zdCBkYXRlRmluID0gZm9ybURhdGEuZ2V0KFwiZGF0ZUZpblwiKTtcbiAgY29uc3QgcGxhY2VzID0gcGFyc2VJbnQoZm9ybURhdGEuZ2V0KFwicGxhY2VzXCIpKSB8fCAwO1xuICBjb25zdCB0cmFuY2hlc0FnZSA9IGZvcm1EYXRhLmdldChcInRyYW5jaGVzQWdlXCIpO1xuICBcbiAgLy8gT24gcsOpY3Vww6hyZSB0b3VzIGxlcyBwcml4IHNhaXNpcyAoZm9ybURhdGEuZ2V0QWxsIHLDqWN1cMOocmUgbGEgbGlzdGUgZGVzIGlucHV0cyBhdmVjIGxlIG3Dqm1lIG5hbWUpXG4gIGNvbnN0IHByaXhBcnJheSA9IGZvcm1EYXRhLmdldEFsbChcInByaXhcIikubWFwKHAgPT4gcGFyc2VGbG9hdChwKSkuZmlsdGVyKHAgPT4gIWlzTmFOKHApKTtcbiAgY29uc3QgcHJpeFByaW5jaXBhbCA9IHByaXhBcnJheVswXSB8fCAwOyAvLyBPbiBzdG9ja2UgbGUgcHJlbWllciBwcml4IGNvbW1lIHByaXggZGUgcsOpZsOpcmVuY2VcblxuICAvLyBHZXN0aW9uIGRlIGwnaW1hZ2UgYXZlYyBWZXJjZWwgQmxvYlxuICBjb25zdCBpbWFnZUZpbGUgPSBmb3JtRGF0YS5nZXQoXCJpbWFnZVwiKTtcbiAgbGV0IGltYWdlVXJsID0gbnVsbDtcblxuICBpZiAoaW1hZ2VGaWxlICYmIGltYWdlRmlsZS5zaXplID4gMCkge1xuICAgIC8vIE9uIGVudm9pZSBsJ2ltYWdlIHN1ciBsZXMgc2VydmV1cnMgZGUgVmVyY2VsXG4gICAgY29uc3QgYmxvYiA9IGF3YWl0IHB1dChgc2Vqb3Vycy8ke0RhdGUubm93KCl9LSR7aW1hZ2VGaWxlLm5hbWV9YCwgaW1hZ2VGaWxlLCB7XG4gICAgICBhY2Nlc3M6ICdwdWJsaWMnLFxuICAgIH0pO1xuICAgIGltYWdlVXJsID0gYmxvYi51cmw7XG4gIH1cblxuICBhd2FpdCBwcmlzbWEuc2Vqb3VyLmNyZWF0ZSh7XG4gICAgZGF0YToge1xuICAgICAgdGl0cmUsXG4gICAgICBsaWV1LFxuICAgICAgc2Fpc29uLFxuICAgICAgc3RhdHV0LFxuICAgICAgZGF0ZURlYnV0OiBkYXRlRGVidXQgPyBuZXcgRGF0ZShkYXRlRGVidXQpIDogbnVsbCxcbiAgICAgIGRhdGVGaW46IGRhdGVGaW4gPyBuZXcgRGF0ZShkYXRlRmluKSA6IG51bGwsXG4gICAgICBwbGFjZXMsXG4gICAgICB0cmFuY2hlc0FnZSxcbiAgICAgIHByaXg6IHByaXhQcmluY2lwYWwsXG4gICAgICBpbWFnZVVybCxcbiAgICB9LFxuICB9KTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9hZG1pblwiKTtcbn1cblxuLy8g4pyP77iPIE1PRElGSUVSXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbW9kaWZpZXJTZWpvdXIoaWQsIGZvcm1EYXRhKSB7XG4gIGNvbnN0IHNlam91ckFjdHVlbCA9IGF3YWl0IHByaXNtYS5zZWpvdXIuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGlkIH0gfSk7XG4gIFxuICBjb25zdCB0aXRyZSA9IGZvcm1EYXRhLmdldChcInRpdHJlXCIpO1xuICBjb25zdCBsaWV1ID0gZm9ybURhdGEuZ2V0KFwibGlldVwiKTtcbiAgY29uc3Qgc2Fpc29uID0gZm9ybURhdGEuZ2V0KFwic2Fpc29uXCIpO1xuICBjb25zdCBzdGF0dXQgPSBmb3JtRGF0YS5nZXQoXCJzdGF0dXRcIik7XG4gIGNvbnN0IGRhdGVEZWJ1dCA9IGZvcm1EYXRhLmdldChcImRhdGVEZWJ1dFwiKTtcbiAgY29uc3QgZGF0ZUZpbiA9IGZvcm1EYXRhLmdldChcImRhdGVGaW5cIik7XG4gIGNvbnN0IHBsYWNlcyA9IHBhcnNlSW50KGZvcm1EYXRhLmdldChcInBsYWNlc1wiKSkgfHwgMDtcbiAgY29uc3QgdHJhbmNoZXNBZ2UgPSBmb3JtRGF0YS5nZXQoXCJ0cmFuY2hlc0FnZVwiKTtcbiAgXG4gIGNvbnN0IHByaXhBcnJheSA9IGZvcm1EYXRhLmdldEFsbChcInByaXhcIikubWFwKHAgPT4gcGFyc2VGbG9hdChwKSkuZmlsdGVyKHAgPT4gIWlzTmFOKHApKTtcbiAgY29uc3QgcHJpeFByaW5jaXBhbCA9IHByaXhBcnJheVswXSB8fCAwO1xuXG4gIC8vIEdlc3Rpb24gZGUgbCdpbWFnZVxuICBjb25zdCBpbWFnZUZpbGUgPSBmb3JtRGF0YS5nZXQoXCJpbWFnZVwiKTtcbiAgbGV0IGltYWdlVXJsID0gc2Vqb3VyQWN0dWVsLmltYWdlVXJsOyAvLyBQYXIgZMOpZmF1dCBvbiBnYXJkZSBsJ2FuY2llbm5lXG5cbiAgLy8gU2kgdW5lIG5vdXZlbGxlIGltYWdlIGVzdCBzw6lsZWN0aW9ubsOpZVxuICBpZiAoaW1hZ2VGaWxlICYmIGltYWdlRmlsZS5zaXplID4gMCkge1xuICAgIC8vIDEuIE9uIHN1cHByaW1lIGwnYW5jaWVubmUgaW1hZ2Ugc3VyIFZlcmNlbCBCbG9iIHBvdXIgbmUgcGFzIGVuY29tYnJlciBsZSBzdG9ja2FnZVxuICAgIGlmIChzZWpvdXJBY3R1ZWwuaW1hZ2VVcmwpIHtcbiAgICAgIHRyeSB7IGF3YWl0IGRlbChzZWpvdXJBY3R1ZWwuaW1hZ2VVcmwpOyB9IGNhdGNoIChlKSB7IGNvbnNvbGUuZXJyb3IoXCJFcnJldXIgc3VwcHJlc3Npb24gYW5jaWVuIGJsb2JcIiwgZSk7IH1cbiAgICB9XG4gICAgLy8gMi4gT24gdXBsb2FkIGxhIG5vdXZlbGxlXG4gICAgY29uc3QgYmxvYiA9IGF3YWl0IHB1dChgc2Vqb3Vycy8ke0RhdGUubm93KCl9LSR7aW1hZ2VGaWxlLm5hbWV9YCwgaW1hZ2VGaWxlLCB7XG4gICAgICBhY2Nlc3M6ICdwdWJsaWMnLFxuICAgIH0pO1xuICAgIGltYWdlVXJsID0gYmxvYi51cmw7XG4gIH1cblxuICBhd2FpdCBwcmlzbWEuc2Vqb3VyLnVwZGF0ZSh7XG4gICAgd2hlcmU6IHsgaWQgfSxcbiAgICBkYXRhOiB7XG4gICAgICB0aXRyZSxcbiAgICAgIGxpZXUsXG4gICAgICBzYWlzb24sXG4gICAgICBzdGF0dXQsXG4gICAgICBkYXRlRGVidXQ6IGRhdGVEZWJ1dCA/IG5ldyBEYXRlKGRhdGVEZWJ1dCkgOiBudWxsLFxuICAgICAgZGF0ZUZpbjogZGF0ZUZpbiA/IG5ldyBEYXRlKGRhdGVGaW4pIDogbnVsbCxcbiAgICAgIHBsYWNlcyxcbiAgICAgIHRyYW5jaGVzQWdlLFxuICAgICAgcHJpeDogcHJpeFByaW5jaXBhbCxcbiAgICAgIGltYWdlVXJsLFxuICAgIH0sXG4gIH0pO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2FkbWluXCIpO1xufVxuXG4vLyDwn5eR77iPIFNVUFBSSU1FUlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHN1cHByaW1lclNlam91cihpZCkge1xuICAvLyBPbiByw6ljdXDDqHJlIGxlIHPDqWpvdXIgcG91ciBhdm9pciBsJ1VSTCBkZSBsJ2ltYWdlXG4gIGNvbnN0IHNlam91ciA9IGF3YWl0IHByaXNtYS5zZWpvdXIuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGlkIH0gfSk7XG5cbiAgLy8gT24gbmV0dG9pZSBsJ2ltYWdlIHN1ciBWZXJjZWwgQmxvYiBhdmFudCBkZSBzdXBwcmltZXIgbGUgcmVjb3JkIGVuIGJhc2VcbiAgaWYgKHNlam91cj8uaW1hZ2VVcmwpIHtcbiAgICB0cnkgeyBhd2FpdCBkZWwoc2Vqb3VyLmltYWdlVXJsKTsgfSBjYXRjaCAoZSkgeyBjb25zb2xlLmVycm9yKFwiRXJyZXVyIHN1cHByZXNzaW9uIGJsb2JcIiwgZSk7IH1cbiAgfVxuXG4gIGF3YWl0IHByaXNtYS5zZWpvdXIuZGVsZXRlKHtcbiAgICB3aGVyZTogeyBpZCB9LFxuICB9KTtcbiAgXG4gIHJldmFsaWRhdGVQYXRoKFwiL2FkbWluXCIpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdG9nZ2xlU3RhdHV0KGlkLCBub3V2ZWF1U3RhdHV0KSB7XG4gIGF3YWl0IHByaXNtYS5zZWpvdXIudXBkYXRlKHtcbiAgICB3aGVyZTogeyBpZCB9LFxuICAgIGRhdGE6IHsgc3RhdHV0OiBub3V2ZWF1U3RhdHV0IH0sXG4gIH0pO1xuICByZXZhbGlkYXRlUGF0aChcIi9hZG1pblwiKTtcbn1cblxuLy8g4q2QIE1FVFRSRSDDgCBMJ0FGRklDSEUgKE91aSAvIE5vbilcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB0b2dnbGVFbkF2YW50KGlkLCBlbkF2YW50KSB7XG4gIGF3YWl0IHByaXNtYS5zZWpvdXIudXBkYXRlKHtcbiAgICB3aGVyZTogeyBpZCB9LFxuICAgIGRhdGE6IHsgZW5BdmFudDogZW5BdmFudCB9LFxuICB9KTtcbiAgcmV2YWxpZGF0ZVBhdGgoXCIvYWRtaW5cIik7XG59Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJ5UkFvRHNCLDJMQUFBIn0=
}),
"[project]/app/actions/data:896008 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
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
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vc2Vqb3Vycy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuaW1wb3J0IHsgcHV0LCBkZWwgfSBmcm9tIFwiQHZlcmNlbC9ibG9iXCI7IC8vIPCfk7ggSW1wb3J0YXRpb24gZGUgbCdvdXRpbCBkZSBzdG9ja2FnZSBWZXJjZWxcblxuLy8g4p6VIENSw4lFUlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWVyU2Vqb3VyKGZvcm1EYXRhKSB7XG4gIGNvbnN0IHRpdHJlID0gZm9ybURhdGEuZ2V0KFwidGl0cmVcIik7XG4gIGNvbnN0IGxpZXUgPSBmb3JtRGF0YS5nZXQoXCJsaWV1XCIpO1xuICBjb25zdCBzYWlzb24gPSBmb3JtRGF0YS5nZXQoXCJzYWlzb25cIik7XG4gIGNvbnN0IHN0YXR1dCA9IGZvcm1EYXRhLmdldChcInN0YXR1dFwiKTtcbiAgY29uc3QgZGF0ZURlYnV0ID0gZm9ybURhdGEuZ2V0KFwiZGF0ZURlYnV0XCIpO1xuICBjb25zdCBkYXRlRmluID0gZm9ybURhdGEuZ2V0KFwiZGF0ZUZpblwiKTtcbiAgY29uc3QgcGxhY2VzID0gcGFyc2VJbnQoZm9ybURhdGEuZ2V0KFwicGxhY2VzXCIpKSB8fCAwO1xuICBjb25zdCB0cmFuY2hlc0FnZSA9IGZvcm1EYXRhLmdldChcInRyYW5jaGVzQWdlXCIpO1xuICBcbiAgLy8gT24gcsOpY3Vww6hyZSB0b3VzIGxlcyBwcml4IHNhaXNpcyAoZm9ybURhdGEuZ2V0QWxsIHLDqWN1cMOocmUgbGEgbGlzdGUgZGVzIGlucHV0cyBhdmVjIGxlIG3Dqm1lIG5hbWUpXG4gIGNvbnN0IHByaXhBcnJheSA9IGZvcm1EYXRhLmdldEFsbChcInByaXhcIikubWFwKHAgPT4gcGFyc2VGbG9hdChwKSkuZmlsdGVyKHAgPT4gIWlzTmFOKHApKTtcbiAgY29uc3QgcHJpeFByaW5jaXBhbCA9IHByaXhBcnJheVswXSB8fCAwOyAvLyBPbiBzdG9ja2UgbGUgcHJlbWllciBwcml4IGNvbW1lIHByaXggZGUgcsOpZsOpcmVuY2VcblxuICAvLyBHZXN0aW9uIGRlIGwnaW1hZ2UgYXZlYyBWZXJjZWwgQmxvYlxuICBjb25zdCBpbWFnZUZpbGUgPSBmb3JtRGF0YS5nZXQoXCJpbWFnZVwiKTtcbiAgbGV0IGltYWdlVXJsID0gbnVsbDtcblxuICBpZiAoaW1hZ2VGaWxlICYmIGltYWdlRmlsZS5zaXplID4gMCkge1xuICAgIC8vIE9uIGVudm9pZSBsJ2ltYWdlIHN1ciBsZXMgc2VydmV1cnMgZGUgVmVyY2VsXG4gICAgY29uc3QgYmxvYiA9IGF3YWl0IHB1dChgc2Vqb3Vycy8ke0RhdGUubm93KCl9LSR7aW1hZ2VGaWxlLm5hbWV9YCwgaW1hZ2VGaWxlLCB7XG4gICAgICBhY2Nlc3M6ICdwdWJsaWMnLFxuICAgIH0pO1xuICAgIGltYWdlVXJsID0gYmxvYi51cmw7XG4gIH1cblxuICBhd2FpdCBwcmlzbWEuc2Vqb3VyLmNyZWF0ZSh7XG4gICAgZGF0YToge1xuICAgICAgdGl0cmUsXG4gICAgICBsaWV1LFxuICAgICAgc2Fpc29uLFxuICAgICAgc3RhdHV0LFxuICAgICAgZGF0ZURlYnV0OiBkYXRlRGVidXQgPyBuZXcgRGF0ZShkYXRlRGVidXQpIDogbnVsbCxcbiAgICAgIGRhdGVGaW46IGRhdGVGaW4gPyBuZXcgRGF0ZShkYXRlRmluKSA6IG51bGwsXG4gICAgICBwbGFjZXMsXG4gICAgICB0cmFuY2hlc0FnZSxcbiAgICAgIHByaXg6IHByaXhQcmluY2lwYWwsXG4gICAgICBpbWFnZVVybCxcbiAgICB9LFxuICB9KTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9hZG1pblwiKTtcbn1cblxuLy8g4pyP77iPIE1PRElGSUVSXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbW9kaWZpZXJTZWpvdXIoaWQsIGZvcm1EYXRhKSB7XG4gIGNvbnN0IHNlam91ckFjdHVlbCA9IGF3YWl0IHByaXNtYS5zZWpvdXIuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGlkIH0gfSk7XG4gIFxuICBjb25zdCB0aXRyZSA9IGZvcm1EYXRhLmdldChcInRpdHJlXCIpO1xuICBjb25zdCBsaWV1ID0gZm9ybURhdGEuZ2V0KFwibGlldVwiKTtcbiAgY29uc3Qgc2Fpc29uID0gZm9ybURhdGEuZ2V0KFwic2Fpc29uXCIpO1xuICBjb25zdCBzdGF0dXQgPSBmb3JtRGF0YS5nZXQoXCJzdGF0dXRcIik7XG4gIGNvbnN0IGRhdGVEZWJ1dCA9IGZvcm1EYXRhLmdldChcImRhdGVEZWJ1dFwiKTtcbiAgY29uc3QgZGF0ZUZpbiA9IGZvcm1EYXRhLmdldChcImRhdGVGaW5cIik7XG4gIGNvbnN0IHBsYWNlcyA9IHBhcnNlSW50KGZvcm1EYXRhLmdldChcInBsYWNlc1wiKSkgfHwgMDtcbiAgY29uc3QgdHJhbmNoZXNBZ2UgPSBmb3JtRGF0YS5nZXQoXCJ0cmFuY2hlc0FnZVwiKTtcbiAgXG4gIGNvbnN0IHByaXhBcnJheSA9IGZvcm1EYXRhLmdldEFsbChcInByaXhcIikubWFwKHAgPT4gcGFyc2VGbG9hdChwKSkuZmlsdGVyKHAgPT4gIWlzTmFOKHApKTtcbiAgY29uc3QgcHJpeFByaW5jaXBhbCA9IHByaXhBcnJheVswXSB8fCAwO1xuXG4gIC8vIEdlc3Rpb24gZGUgbCdpbWFnZVxuICBjb25zdCBpbWFnZUZpbGUgPSBmb3JtRGF0YS5nZXQoXCJpbWFnZVwiKTtcbiAgbGV0IGltYWdlVXJsID0gc2Vqb3VyQWN0dWVsLmltYWdlVXJsOyAvLyBQYXIgZMOpZmF1dCBvbiBnYXJkZSBsJ2FuY2llbm5lXG5cbiAgLy8gU2kgdW5lIG5vdXZlbGxlIGltYWdlIGVzdCBzw6lsZWN0aW9ubsOpZVxuICBpZiAoaW1hZ2VGaWxlICYmIGltYWdlRmlsZS5zaXplID4gMCkge1xuICAgIC8vIDEuIE9uIHN1cHByaW1lIGwnYW5jaWVubmUgaW1hZ2Ugc3VyIFZlcmNlbCBCbG9iIHBvdXIgbmUgcGFzIGVuY29tYnJlciBsZSBzdG9ja2FnZVxuICAgIGlmIChzZWpvdXJBY3R1ZWwuaW1hZ2VVcmwpIHtcbiAgICAgIHRyeSB7IGF3YWl0IGRlbChzZWpvdXJBY3R1ZWwuaW1hZ2VVcmwpOyB9IGNhdGNoIChlKSB7IGNvbnNvbGUuZXJyb3IoXCJFcnJldXIgc3VwcHJlc3Npb24gYW5jaWVuIGJsb2JcIiwgZSk7IH1cbiAgICB9XG4gICAgLy8gMi4gT24gdXBsb2FkIGxhIG5vdXZlbGxlXG4gICAgY29uc3QgYmxvYiA9IGF3YWl0IHB1dChgc2Vqb3Vycy8ke0RhdGUubm93KCl9LSR7aW1hZ2VGaWxlLm5hbWV9YCwgaW1hZ2VGaWxlLCB7XG4gICAgICBhY2Nlc3M6ICdwdWJsaWMnLFxuICAgIH0pO1xuICAgIGltYWdlVXJsID0gYmxvYi51cmw7XG4gIH1cblxuICBhd2FpdCBwcmlzbWEuc2Vqb3VyLnVwZGF0ZSh7XG4gICAgd2hlcmU6IHsgaWQgfSxcbiAgICBkYXRhOiB7XG4gICAgICB0aXRyZSxcbiAgICAgIGxpZXUsXG4gICAgICBzYWlzb24sXG4gICAgICBzdGF0dXQsXG4gICAgICBkYXRlRGVidXQ6IGRhdGVEZWJ1dCA/IG5ldyBEYXRlKGRhdGVEZWJ1dCkgOiBudWxsLFxuICAgICAgZGF0ZUZpbjogZGF0ZUZpbiA/IG5ldyBEYXRlKGRhdGVGaW4pIDogbnVsbCxcbiAgICAgIHBsYWNlcyxcbiAgICAgIHRyYW5jaGVzQWdlLFxuICAgICAgcHJpeDogcHJpeFByaW5jaXBhbCxcbiAgICAgIGltYWdlVXJsLFxuICAgIH0sXG4gIH0pO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2FkbWluXCIpO1xufVxuXG4vLyDwn5eR77iPIFNVUFBSSU1FUlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHN1cHByaW1lclNlam91cihpZCkge1xuICAvLyBPbiByw6ljdXDDqHJlIGxlIHPDqWpvdXIgcG91ciBhdm9pciBsJ1VSTCBkZSBsJ2ltYWdlXG4gIGNvbnN0IHNlam91ciA9IGF3YWl0IHByaXNtYS5zZWpvdXIuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGlkIH0gfSk7XG5cbiAgLy8gT24gbmV0dG9pZSBsJ2ltYWdlIHN1ciBWZXJjZWwgQmxvYiBhdmFudCBkZSBzdXBwcmltZXIgbGUgcmVjb3JkIGVuIGJhc2VcbiAgaWYgKHNlam91cj8uaW1hZ2VVcmwpIHtcbiAgICB0cnkgeyBhd2FpdCBkZWwoc2Vqb3VyLmltYWdlVXJsKTsgfSBjYXRjaCAoZSkgeyBjb25zb2xlLmVycm9yKFwiRXJyZXVyIHN1cHByZXNzaW9uIGJsb2JcIiwgZSk7IH1cbiAgfVxuXG4gIGF3YWl0IHByaXNtYS5zZWpvdXIuZGVsZXRlKHtcbiAgICB3aGVyZTogeyBpZCB9LFxuICB9KTtcbiAgXG4gIHJldmFsaWRhdGVQYXRoKFwiL2FkbWluXCIpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdG9nZ2xlU3RhdHV0KGlkLCBub3V2ZWF1U3RhdHV0KSB7XG4gIGF3YWl0IHByaXNtYS5zZWpvdXIudXBkYXRlKHtcbiAgICB3aGVyZTogeyBpZCB9LFxuICAgIGRhdGE6IHsgc3RhdHV0OiBub3V2ZWF1U3RhdHV0IH0sXG4gIH0pO1xuICByZXZhbGlkYXRlUGF0aChcIi9hZG1pblwiKTtcbn1cblxuLy8g4q2QIE1FVFRSRSDDgCBMJ0FGRklDSEUgKE91aSAvIE5vbilcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB0b2dnbGVFbkF2YW50KGlkLCBlbkF2YW50KSB7XG4gIGF3YWl0IHByaXNtYS5zZWpvdXIudXBkYXRlKHtcbiAgICB3aGVyZTogeyBpZCB9LFxuICAgIGRhdGE6IHsgZW5BdmFudDogZW5BdmFudCB9LFxuICB9KTtcbiAgcmV2YWxpZGF0ZVBhdGgoXCIvYWRtaW5cIik7XG59Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIwUkF3R3NCLDRMQUFBIn0=
}),
"[project]/app/actions/data:ef79d6 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toggleStatut",
    ()=>$$RSC_SERVER_ACTION_3
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"60155bc9a34b8f9ea67650ca4dc4f352ad30b2956f":"toggleStatut"},"app/actions/sejours.js",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("60155bc9a34b8f9ea67650ca4dc4f352ad30b2956f", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "toggleStatut");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vc2Vqb3Vycy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuaW1wb3J0IHsgcHV0LCBkZWwgfSBmcm9tIFwiQHZlcmNlbC9ibG9iXCI7IC8vIPCfk7ggSW1wb3J0YXRpb24gZGUgbCdvdXRpbCBkZSBzdG9ja2FnZSBWZXJjZWxcblxuLy8g4p6VIENSw4lFUlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWVyU2Vqb3VyKGZvcm1EYXRhKSB7XG4gIGNvbnN0IHRpdHJlID0gZm9ybURhdGEuZ2V0KFwidGl0cmVcIik7XG4gIGNvbnN0IGxpZXUgPSBmb3JtRGF0YS5nZXQoXCJsaWV1XCIpO1xuICBjb25zdCBzYWlzb24gPSBmb3JtRGF0YS5nZXQoXCJzYWlzb25cIik7XG4gIGNvbnN0IHN0YXR1dCA9IGZvcm1EYXRhLmdldChcInN0YXR1dFwiKTtcbiAgY29uc3QgZGF0ZURlYnV0ID0gZm9ybURhdGEuZ2V0KFwiZGF0ZURlYnV0XCIpO1xuICBjb25zdCBkYXRlRmluID0gZm9ybURhdGEuZ2V0KFwiZGF0ZUZpblwiKTtcbiAgY29uc3QgcGxhY2VzID0gcGFyc2VJbnQoZm9ybURhdGEuZ2V0KFwicGxhY2VzXCIpKSB8fCAwO1xuICBjb25zdCB0cmFuY2hlc0FnZSA9IGZvcm1EYXRhLmdldChcInRyYW5jaGVzQWdlXCIpO1xuICBcbiAgLy8gT24gcsOpY3Vww6hyZSB0b3VzIGxlcyBwcml4IHNhaXNpcyAoZm9ybURhdGEuZ2V0QWxsIHLDqWN1cMOocmUgbGEgbGlzdGUgZGVzIGlucHV0cyBhdmVjIGxlIG3Dqm1lIG5hbWUpXG4gIGNvbnN0IHByaXhBcnJheSA9IGZvcm1EYXRhLmdldEFsbChcInByaXhcIikubWFwKHAgPT4gcGFyc2VGbG9hdChwKSkuZmlsdGVyKHAgPT4gIWlzTmFOKHApKTtcbiAgY29uc3QgcHJpeFByaW5jaXBhbCA9IHByaXhBcnJheVswXSB8fCAwOyAvLyBPbiBzdG9ja2UgbGUgcHJlbWllciBwcml4IGNvbW1lIHByaXggZGUgcsOpZsOpcmVuY2VcblxuICAvLyBHZXN0aW9uIGRlIGwnaW1hZ2UgYXZlYyBWZXJjZWwgQmxvYlxuICBjb25zdCBpbWFnZUZpbGUgPSBmb3JtRGF0YS5nZXQoXCJpbWFnZVwiKTtcbiAgbGV0IGltYWdlVXJsID0gbnVsbDtcblxuICBpZiAoaW1hZ2VGaWxlICYmIGltYWdlRmlsZS5zaXplID4gMCkge1xuICAgIC8vIE9uIGVudm9pZSBsJ2ltYWdlIHN1ciBsZXMgc2VydmV1cnMgZGUgVmVyY2VsXG4gICAgY29uc3QgYmxvYiA9IGF3YWl0IHB1dChgc2Vqb3Vycy8ke0RhdGUubm93KCl9LSR7aW1hZ2VGaWxlLm5hbWV9YCwgaW1hZ2VGaWxlLCB7XG4gICAgICBhY2Nlc3M6ICdwdWJsaWMnLFxuICAgIH0pO1xuICAgIGltYWdlVXJsID0gYmxvYi51cmw7XG4gIH1cblxuICBhd2FpdCBwcmlzbWEuc2Vqb3VyLmNyZWF0ZSh7XG4gICAgZGF0YToge1xuICAgICAgdGl0cmUsXG4gICAgICBsaWV1LFxuICAgICAgc2Fpc29uLFxuICAgICAgc3RhdHV0LFxuICAgICAgZGF0ZURlYnV0OiBkYXRlRGVidXQgPyBuZXcgRGF0ZShkYXRlRGVidXQpIDogbnVsbCxcbiAgICAgIGRhdGVGaW46IGRhdGVGaW4gPyBuZXcgRGF0ZShkYXRlRmluKSA6IG51bGwsXG4gICAgICBwbGFjZXMsXG4gICAgICB0cmFuY2hlc0FnZSxcbiAgICAgIHByaXg6IHByaXhQcmluY2lwYWwsXG4gICAgICBpbWFnZVVybCxcbiAgICB9LFxuICB9KTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9hZG1pblwiKTtcbn1cblxuLy8g4pyP77iPIE1PRElGSUVSXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbW9kaWZpZXJTZWpvdXIoaWQsIGZvcm1EYXRhKSB7XG4gIGNvbnN0IHNlam91ckFjdHVlbCA9IGF3YWl0IHByaXNtYS5zZWpvdXIuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGlkIH0gfSk7XG4gIFxuICBjb25zdCB0aXRyZSA9IGZvcm1EYXRhLmdldChcInRpdHJlXCIpO1xuICBjb25zdCBsaWV1ID0gZm9ybURhdGEuZ2V0KFwibGlldVwiKTtcbiAgY29uc3Qgc2Fpc29uID0gZm9ybURhdGEuZ2V0KFwic2Fpc29uXCIpO1xuICBjb25zdCBzdGF0dXQgPSBmb3JtRGF0YS5nZXQoXCJzdGF0dXRcIik7XG4gIGNvbnN0IGRhdGVEZWJ1dCA9IGZvcm1EYXRhLmdldChcImRhdGVEZWJ1dFwiKTtcbiAgY29uc3QgZGF0ZUZpbiA9IGZvcm1EYXRhLmdldChcImRhdGVGaW5cIik7XG4gIGNvbnN0IHBsYWNlcyA9IHBhcnNlSW50KGZvcm1EYXRhLmdldChcInBsYWNlc1wiKSkgfHwgMDtcbiAgY29uc3QgdHJhbmNoZXNBZ2UgPSBmb3JtRGF0YS5nZXQoXCJ0cmFuY2hlc0FnZVwiKTtcbiAgXG4gIGNvbnN0IHByaXhBcnJheSA9IGZvcm1EYXRhLmdldEFsbChcInByaXhcIikubWFwKHAgPT4gcGFyc2VGbG9hdChwKSkuZmlsdGVyKHAgPT4gIWlzTmFOKHApKTtcbiAgY29uc3QgcHJpeFByaW5jaXBhbCA9IHByaXhBcnJheVswXSB8fCAwO1xuXG4gIC8vIEdlc3Rpb24gZGUgbCdpbWFnZVxuICBjb25zdCBpbWFnZUZpbGUgPSBmb3JtRGF0YS5nZXQoXCJpbWFnZVwiKTtcbiAgbGV0IGltYWdlVXJsID0gc2Vqb3VyQWN0dWVsLmltYWdlVXJsOyAvLyBQYXIgZMOpZmF1dCBvbiBnYXJkZSBsJ2FuY2llbm5lXG5cbiAgLy8gU2kgdW5lIG5vdXZlbGxlIGltYWdlIGVzdCBzw6lsZWN0aW9ubsOpZVxuICBpZiAoaW1hZ2VGaWxlICYmIGltYWdlRmlsZS5zaXplID4gMCkge1xuICAgIC8vIDEuIE9uIHN1cHByaW1lIGwnYW5jaWVubmUgaW1hZ2Ugc3VyIFZlcmNlbCBCbG9iIHBvdXIgbmUgcGFzIGVuY29tYnJlciBsZSBzdG9ja2FnZVxuICAgIGlmIChzZWpvdXJBY3R1ZWwuaW1hZ2VVcmwpIHtcbiAgICAgIHRyeSB7IGF3YWl0IGRlbChzZWpvdXJBY3R1ZWwuaW1hZ2VVcmwpOyB9IGNhdGNoIChlKSB7IGNvbnNvbGUuZXJyb3IoXCJFcnJldXIgc3VwcHJlc3Npb24gYW5jaWVuIGJsb2JcIiwgZSk7IH1cbiAgICB9XG4gICAgLy8gMi4gT24gdXBsb2FkIGxhIG5vdXZlbGxlXG4gICAgY29uc3QgYmxvYiA9IGF3YWl0IHB1dChgc2Vqb3Vycy8ke0RhdGUubm93KCl9LSR7aW1hZ2VGaWxlLm5hbWV9YCwgaW1hZ2VGaWxlLCB7XG4gICAgICBhY2Nlc3M6ICdwdWJsaWMnLFxuICAgIH0pO1xuICAgIGltYWdlVXJsID0gYmxvYi51cmw7XG4gIH1cblxuICBhd2FpdCBwcmlzbWEuc2Vqb3VyLnVwZGF0ZSh7XG4gICAgd2hlcmU6IHsgaWQgfSxcbiAgICBkYXRhOiB7XG4gICAgICB0aXRyZSxcbiAgICAgIGxpZXUsXG4gICAgICBzYWlzb24sXG4gICAgICBzdGF0dXQsXG4gICAgICBkYXRlRGVidXQ6IGRhdGVEZWJ1dCA/IG5ldyBEYXRlKGRhdGVEZWJ1dCkgOiBudWxsLFxuICAgICAgZGF0ZUZpbjogZGF0ZUZpbiA/IG5ldyBEYXRlKGRhdGVGaW4pIDogbnVsbCxcbiAgICAgIHBsYWNlcyxcbiAgICAgIHRyYW5jaGVzQWdlLFxuICAgICAgcHJpeDogcHJpeFByaW5jaXBhbCxcbiAgICAgIGltYWdlVXJsLFxuICAgIH0sXG4gIH0pO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2FkbWluXCIpO1xufVxuXG4vLyDwn5eR77iPIFNVUFBSSU1FUlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHN1cHByaW1lclNlam91cihpZCkge1xuICAvLyBPbiByw6ljdXDDqHJlIGxlIHPDqWpvdXIgcG91ciBhdm9pciBsJ1VSTCBkZSBsJ2ltYWdlXG4gIGNvbnN0IHNlam91ciA9IGF3YWl0IHByaXNtYS5zZWpvdXIuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGlkIH0gfSk7XG5cbiAgLy8gT24gbmV0dG9pZSBsJ2ltYWdlIHN1ciBWZXJjZWwgQmxvYiBhdmFudCBkZSBzdXBwcmltZXIgbGUgcmVjb3JkIGVuIGJhc2VcbiAgaWYgKHNlam91cj8uaW1hZ2VVcmwpIHtcbiAgICB0cnkgeyBhd2FpdCBkZWwoc2Vqb3VyLmltYWdlVXJsKTsgfSBjYXRjaCAoZSkgeyBjb25zb2xlLmVycm9yKFwiRXJyZXVyIHN1cHByZXNzaW9uIGJsb2JcIiwgZSk7IH1cbiAgfVxuXG4gIGF3YWl0IHByaXNtYS5zZWpvdXIuZGVsZXRlKHtcbiAgICB3aGVyZTogeyBpZCB9LFxuICB9KTtcbiAgXG4gIHJldmFsaWRhdGVQYXRoKFwiL2FkbWluXCIpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdG9nZ2xlU3RhdHV0KGlkLCBub3V2ZWF1U3RhdHV0KSB7XG4gIGF3YWl0IHByaXNtYS5zZWpvdXIudXBkYXRlKHtcbiAgICB3aGVyZTogeyBpZCB9LFxuICAgIGRhdGE6IHsgc3RhdHV0OiBub3V2ZWF1U3RhdHV0IH0sXG4gIH0pO1xuICByZXZhbGlkYXRlUGF0aChcIi9hZG1pblwiKTtcbn1cblxuLy8g4q2QIE1FVFRSRSDDgCBMJ0FGRklDSEUgKE91aSAvIE5vbilcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB0b2dnbGVFbkF2YW50KGlkLCBlbkF2YW50KSB7XG4gIGF3YWl0IHByaXNtYS5zZWpvdXIudXBkYXRlKHtcbiAgICB3aGVyZTogeyBpZCB9LFxuICAgIGRhdGE6IHsgZW5BdmFudDogZW5BdmFudCB9LFxuICB9KTtcbiAgcmV2YWxpZGF0ZVBhdGgoXCIvYWRtaW5cIik7XG59Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJ1UkF3SHNCLHlMQUFBIn0=
}),
"[project]/app/actions/data:1bde92 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toggleEnAvant",
    ()=>$$RSC_SERVER_ACTION_4
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"600f4e201cc5decf890e1dd8f59771eb367cd16d5f":"toggleEnAvant"},"app/actions/sejours.js",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("600f4e201cc5decf890e1dd8f59771eb367cd16d5f", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "toggleEnAvant");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vc2Vqb3Vycy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcblxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xuaW1wb3J0IHsgcHV0LCBkZWwgfSBmcm9tIFwiQHZlcmNlbC9ibG9iXCI7IC8vIPCfk7ggSW1wb3J0YXRpb24gZGUgbCdvdXRpbCBkZSBzdG9ja2FnZSBWZXJjZWxcblxuLy8g4p6VIENSw4lFUlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWVyU2Vqb3VyKGZvcm1EYXRhKSB7XG4gIGNvbnN0IHRpdHJlID0gZm9ybURhdGEuZ2V0KFwidGl0cmVcIik7XG4gIGNvbnN0IGxpZXUgPSBmb3JtRGF0YS5nZXQoXCJsaWV1XCIpO1xuICBjb25zdCBzYWlzb24gPSBmb3JtRGF0YS5nZXQoXCJzYWlzb25cIik7XG4gIGNvbnN0IHN0YXR1dCA9IGZvcm1EYXRhLmdldChcInN0YXR1dFwiKTtcbiAgY29uc3QgZGF0ZURlYnV0ID0gZm9ybURhdGEuZ2V0KFwiZGF0ZURlYnV0XCIpO1xuICBjb25zdCBkYXRlRmluID0gZm9ybURhdGEuZ2V0KFwiZGF0ZUZpblwiKTtcbiAgY29uc3QgcGxhY2VzID0gcGFyc2VJbnQoZm9ybURhdGEuZ2V0KFwicGxhY2VzXCIpKSB8fCAwO1xuICBjb25zdCB0cmFuY2hlc0FnZSA9IGZvcm1EYXRhLmdldChcInRyYW5jaGVzQWdlXCIpO1xuICBcbiAgLy8gT24gcsOpY3Vww6hyZSB0b3VzIGxlcyBwcml4IHNhaXNpcyAoZm9ybURhdGEuZ2V0QWxsIHLDqWN1cMOocmUgbGEgbGlzdGUgZGVzIGlucHV0cyBhdmVjIGxlIG3Dqm1lIG5hbWUpXG4gIGNvbnN0IHByaXhBcnJheSA9IGZvcm1EYXRhLmdldEFsbChcInByaXhcIikubWFwKHAgPT4gcGFyc2VGbG9hdChwKSkuZmlsdGVyKHAgPT4gIWlzTmFOKHApKTtcbiAgY29uc3QgcHJpeFByaW5jaXBhbCA9IHByaXhBcnJheVswXSB8fCAwOyAvLyBPbiBzdG9ja2UgbGUgcHJlbWllciBwcml4IGNvbW1lIHByaXggZGUgcsOpZsOpcmVuY2VcblxuICAvLyBHZXN0aW9uIGRlIGwnaW1hZ2UgYXZlYyBWZXJjZWwgQmxvYlxuICBjb25zdCBpbWFnZUZpbGUgPSBmb3JtRGF0YS5nZXQoXCJpbWFnZVwiKTtcbiAgbGV0IGltYWdlVXJsID0gbnVsbDtcblxuICBpZiAoaW1hZ2VGaWxlICYmIGltYWdlRmlsZS5zaXplID4gMCkge1xuICAgIC8vIE9uIGVudm9pZSBsJ2ltYWdlIHN1ciBsZXMgc2VydmV1cnMgZGUgVmVyY2VsXG4gICAgY29uc3QgYmxvYiA9IGF3YWl0IHB1dChgc2Vqb3Vycy8ke0RhdGUubm93KCl9LSR7aW1hZ2VGaWxlLm5hbWV9YCwgaW1hZ2VGaWxlLCB7XG4gICAgICBhY2Nlc3M6ICdwdWJsaWMnLFxuICAgIH0pO1xuICAgIGltYWdlVXJsID0gYmxvYi51cmw7XG4gIH1cblxuICBhd2FpdCBwcmlzbWEuc2Vqb3VyLmNyZWF0ZSh7XG4gICAgZGF0YToge1xuICAgICAgdGl0cmUsXG4gICAgICBsaWV1LFxuICAgICAgc2Fpc29uLFxuICAgICAgc3RhdHV0LFxuICAgICAgZGF0ZURlYnV0OiBkYXRlRGVidXQgPyBuZXcgRGF0ZShkYXRlRGVidXQpIDogbnVsbCxcbiAgICAgIGRhdGVGaW46IGRhdGVGaW4gPyBuZXcgRGF0ZShkYXRlRmluKSA6IG51bGwsXG4gICAgICBwbGFjZXMsXG4gICAgICB0cmFuY2hlc0FnZSxcbiAgICAgIHByaXg6IHByaXhQcmluY2lwYWwsXG4gICAgICBpbWFnZVVybCxcbiAgICB9LFxuICB9KTtcblxuICByZXZhbGlkYXRlUGF0aChcIi9hZG1pblwiKTtcbn1cblxuLy8g4pyP77iPIE1PRElGSUVSXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbW9kaWZpZXJTZWpvdXIoaWQsIGZvcm1EYXRhKSB7XG4gIGNvbnN0IHNlam91ckFjdHVlbCA9IGF3YWl0IHByaXNtYS5zZWpvdXIuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGlkIH0gfSk7XG4gIFxuICBjb25zdCB0aXRyZSA9IGZvcm1EYXRhLmdldChcInRpdHJlXCIpO1xuICBjb25zdCBsaWV1ID0gZm9ybURhdGEuZ2V0KFwibGlldVwiKTtcbiAgY29uc3Qgc2Fpc29uID0gZm9ybURhdGEuZ2V0KFwic2Fpc29uXCIpO1xuICBjb25zdCBzdGF0dXQgPSBmb3JtRGF0YS5nZXQoXCJzdGF0dXRcIik7XG4gIGNvbnN0IGRhdGVEZWJ1dCA9IGZvcm1EYXRhLmdldChcImRhdGVEZWJ1dFwiKTtcbiAgY29uc3QgZGF0ZUZpbiA9IGZvcm1EYXRhLmdldChcImRhdGVGaW5cIik7XG4gIGNvbnN0IHBsYWNlcyA9IHBhcnNlSW50KGZvcm1EYXRhLmdldChcInBsYWNlc1wiKSkgfHwgMDtcbiAgY29uc3QgdHJhbmNoZXNBZ2UgPSBmb3JtRGF0YS5nZXQoXCJ0cmFuY2hlc0FnZVwiKTtcbiAgXG4gIGNvbnN0IHByaXhBcnJheSA9IGZvcm1EYXRhLmdldEFsbChcInByaXhcIikubWFwKHAgPT4gcGFyc2VGbG9hdChwKSkuZmlsdGVyKHAgPT4gIWlzTmFOKHApKTtcbiAgY29uc3QgcHJpeFByaW5jaXBhbCA9IHByaXhBcnJheVswXSB8fCAwO1xuXG4gIC8vIEdlc3Rpb24gZGUgbCdpbWFnZVxuICBjb25zdCBpbWFnZUZpbGUgPSBmb3JtRGF0YS5nZXQoXCJpbWFnZVwiKTtcbiAgbGV0IGltYWdlVXJsID0gc2Vqb3VyQWN0dWVsLmltYWdlVXJsOyAvLyBQYXIgZMOpZmF1dCBvbiBnYXJkZSBsJ2FuY2llbm5lXG5cbiAgLy8gU2kgdW5lIG5vdXZlbGxlIGltYWdlIGVzdCBzw6lsZWN0aW9ubsOpZVxuICBpZiAoaW1hZ2VGaWxlICYmIGltYWdlRmlsZS5zaXplID4gMCkge1xuICAgIC8vIDEuIE9uIHN1cHByaW1lIGwnYW5jaWVubmUgaW1hZ2Ugc3VyIFZlcmNlbCBCbG9iIHBvdXIgbmUgcGFzIGVuY29tYnJlciBsZSBzdG9ja2FnZVxuICAgIGlmIChzZWpvdXJBY3R1ZWwuaW1hZ2VVcmwpIHtcbiAgICAgIHRyeSB7IGF3YWl0IGRlbChzZWpvdXJBY3R1ZWwuaW1hZ2VVcmwpOyB9IGNhdGNoIChlKSB7IGNvbnNvbGUuZXJyb3IoXCJFcnJldXIgc3VwcHJlc3Npb24gYW5jaWVuIGJsb2JcIiwgZSk7IH1cbiAgICB9XG4gICAgLy8gMi4gT24gdXBsb2FkIGxhIG5vdXZlbGxlXG4gICAgY29uc3QgYmxvYiA9IGF3YWl0IHB1dChgc2Vqb3Vycy8ke0RhdGUubm93KCl9LSR7aW1hZ2VGaWxlLm5hbWV9YCwgaW1hZ2VGaWxlLCB7XG4gICAgICBhY2Nlc3M6ICdwdWJsaWMnLFxuICAgIH0pO1xuICAgIGltYWdlVXJsID0gYmxvYi51cmw7XG4gIH1cblxuICBhd2FpdCBwcmlzbWEuc2Vqb3VyLnVwZGF0ZSh7XG4gICAgd2hlcmU6IHsgaWQgfSxcbiAgICBkYXRhOiB7XG4gICAgICB0aXRyZSxcbiAgICAgIGxpZXUsXG4gICAgICBzYWlzb24sXG4gICAgICBzdGF0dXQsXG4gICAgICBkYXRlRGVidXQ6IGRhdGVEZWJ1dCA/IG5ldyBEYXRlKGRhdGVEZWJ1dCkgOiBudWxsLFxuICAgICAgZGF0ZUZpbjogZGF0ZUZpbiA/IG5ldyBEYXRlKGRhdGVGaW4pIDogbnVsbCxcbiAgICAgIHBsYWNlcyxcbiAgICAgIHRyYW5jaGVzQWdlLFxuICAgICAgcHJpeDogcHJpeFByaW5jaXBhbCxcbiAgICAgIGltYWdlVXJsLFxuICAgIH0sXG4gIH0pO1xuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2FkbWluXCIpO1xufVxuXG4vLyDwn5eR77iPIFNVUFBSSU1FUlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHN1cHByaW1lclNlam91cihpZCkge1xuICAvLyBPbiByw6ljdXDDqHJlIGxlIHPDqWpvdXIgcG91ciBhdm9pciBsJ1VSTCBkZSBsJ2ltYWdlXG4gIGNvbnN0IHNlam91ciA9IGF3YWl0IHByaXNtYS5zZWpvdXIuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGlkIH0gfSk7XG5cbiAgLy8gT24gbmV0dG9pZSBsJ2ltYWdlIHN1ciBWZXJjZWwgQmxvYiBhdmFudCBkZSBzdXBwcmltZXIgbGUgcmVjb3JkIGVuIGJhc2VcbiAgaWYgKHNlam91cj8uaW1hZ2VVcmwpIHtcbiAgICB0cnkgeyBhd2FpdCBkZWwoc2Vqb3VyLmltYWdlVXJsKTsgfSBjYXRjaCAoZSkgeyBjb25zb2xlLmVycm9yKFwiRXJyZXVyIHN1cHByZXNzaW9uIGJsb2JcIiwgZSk7IH1cbiAgfVxuXG4gIGF3YWl0IHByaXNtYS5zZWpvdXIuZGVsZXRlKHtcbiAgICB3aGVyZTogeyBpZCB9LFxuICB9KTtcbiAgXG4gIHJldmFsaWRhdGVQYXRoKFwiL2FkbWluXCIpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdG9nZ2xlU3RhdHV0KGlkLCBub3V2ZWF1U3RhdHV0KSB7XG4gIGF3YWl0IHByaXNtYS5zZWpvdXIudXBkYXRlKHtcbiAgICB3aGVyZTogeyBpZCB9LFxuICAgIGRhdGE6IHsgc3RhdHV0OiBub3V2ZWF1U3RhdHV0IH0sXG4gIH0pO1xuICByZXZhbGlkYXRlUGF0aChcIi9hZG1pblwiKTtcbn1cblxuLy8g4q2QIE1FVFRSRSDDgCBMJ0FGRklDSEUgKE91aSAvIE5vbilcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB0b2dnbGVFbkF2YW50KGlkLCBlbkF2YW50KSB7XG4gIGF3YWl0IHByaXNtYS5zZWpvdXIudXBkYXRlKHtcbiAgICB3aGVyZTogeyBpZCB9LFxuICAgIGRhdGE6IHsgZW5BdmFudDogZW5BdmFudCB9LFxuICB9KTtcbiAgcmV2YWxpZGF0ZVBhdGgoXCIvYWRtaW5cIik7XG59Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJ3UkFpSXNCLDBMQUFBIn0=
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-grid.js [app-client] (ecmascript) <export default as LayoutGrid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/list.js [app-client] (ecmascript) <export default as List>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar-days.js [app-client] (ecmascript) <export default as CalendarDays>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clipboard-list.js [app-client] (ecmascript) <export default as ClipboardList>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square-pen.js [app-client] (ecmascript) <export default as Edit>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/funnel.js [app-client] (ecmascript) <export default as Filter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$leaf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Leaf$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/leaf.js [app-client] (ecmascript) <export default as Leaf>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$snowflake$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Snowflake$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/snowflake.js [app-client] (ecmascript) <export default as Snowflake>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flower$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flower$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flower.js [app-client] (ecmascript) <export default as Flower>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye-off.js [app-client] (ecmascript) <export default as EyeOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f$AdminLayout$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/admin/AdminLayout.jsx [app-client] (ecmascript)");
// ⚡ IMPORT DÉCOMMENTÉ : On active la connexion avec les actions serveur
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$6a4f83__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/app/actions/data:6a4f83 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$b956da__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/app/actions/data:b956da [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$896008__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/app/actions/data:896008 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$ef79d6__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/app/actions/data:ef79d6 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$1bde92__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/app/actions/data:1bde92 [app-client] (ecmascript) <text/javascript>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature();
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
const formatAge = (ageString)=>{
    if (!ageString) return "Âges à définir";
    const str = ageString.toLowerCase();
    if (str.includes("ans") || str.includes("sénior") || str.includes("senior")) {
        return ageString;
    }
    return `${ageString} ans`;
};
// ⚡ FONCTION INTELLIGENTE POUR FORMATER LES DATES
const formatSejourDates = (startStr, endStr)=>{
    if (!startStr) return "À définir";
    const start = new Date(startStr);
    if (!endStr) return start.toLocaleDateString("fr-FR");
    const end = new Date(endStr);
    if (start.getTime() === end.getTime()) {
        return start.toLocaleDateString("fr-FR");
    }
    const mois = [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre'
    ];
    const startDay = start.getDate();
    const startMonth = mois[start.getMonth()];
    const startYear = start.getFullYear();
    const endDay = end.getDate();
    const endMonth = mois[end.getMonth()];
    const endYear = end.getFullYear();
    if (startYear !== endYear) return `Du ${startDay} ${startMonth} ${startYear} au ${endDay} ${endMonth} ${endYear}`;
    if (startMonth !== endMonth) return `Du ${startDay} ${startMonth} au ${endDay} ${endMonth}`;
    return `Du ${startDay} au ${endDay} ${startMonth}`;
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
                        lineNumber: 87,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                    lineNumber: 86,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                lineNumber: 85,
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
                        lineNumber: 91,
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
                        lineNumber: 92,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                lineNumber: 90,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
_c = StatCard;
function FilterDropdown({ value, onChange, options, defaultLabel }) {
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const selectedOpt = options.find((o)=>o.value === value);
    const displayLabel = selectedOpt ? selectedOpt.label : defaultLabel;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "relative"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: ()=>setIsOpen(!isOpen),
                style: {
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: `1px solid ${isOpen ? C.yellow : C.lightGray}`,
                    background: C.white,
                    fontSize: "13px",
                    color: C.teal,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    boxShadow: isOpen ? "0 4px 12px rgba(255, 200, 1, 0.15)" : "none"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: displayLabel
                    }, void 0, false, {
                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                        size: 14,
                        style: {
                            transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                            transition: "transform 0.2s",
                            color: C.gray
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    minWidth: "100%",
                    marginTop: "8px",
                    background: C.white,
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    zIndex: 50,
                    overflow: "hidden",
                    border: `1px solid ${C.lightGray}`,
                    whiteSpace: "nowrap"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: ()=>{
                            onChange("");
                            setIsOpen(false);
                        },
                        style: {
                            padding: "12px 16px",
                            fontSize: "13px",
                            fontWeight: 700,
                            color: value === "" ? C.teal : C.gray,
                            cursor: "pointer",
                            background: value === "" ? C.arctic : "transparent"
                        },
                        onMouseOver: (e)=>e.currentTarget.style.background = C.arctic,
                        onMouseOut: (e)=>e.currentTarget.style.background = value === "" ? C.arctic : "transparent",
                        children: defaultLabel
                    }, void 0, false, {
                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                        lineNumber: 115,
                        columnNumber: 11
                    }, this),
                    options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: ()=>{
                                onChange(opt.value);
                                setIsOpen(false);
                            },
                            style: {
                                padding: "12px 16px",
                                fontSize: "13px",
                                fontWeight: 600,
                                color: C.teal,
                                cursor: "pointer",
                                background: value === opt.value ? C.arctic : "transparent"
                            },
                            onMouseOver: (e)=>e.currentTarget.style.background = C.arctic,
                            onMouseOut: (e)=>e.currentTarget.style.background = value === opt.value ? C.arctic : "transparent",
                            children: opt.label
                        }, opt.value, false, {
                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                            lineNumber: 119,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                lineNumber: 114,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
        lineNumber: 104,
        columnNumber: 5
    }, this);
}
_s(FilterDropdown, "+sus0Lb0ewKHdwiUhiTAJFoFyQ0=");
_c1 = FilterDropdown;
function CustomSelect({ name, label, options, defaultValue }) {
    _s1();
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
                lineNumber: 136,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "hidden",
                name: name,
                value: selected.value
            }, void 0, false, {
                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                lineNumber: 137,
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
                    cursor: "pointer"
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
                                lineNumber: 140,
                                columnNumber: 29
                            }, this),
                            selected.label
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                        size: 14,
                        style: {
                            transform: isOpen ? "rotate(180deg)" : "rotate(0)"
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                lineNumber: 138,
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
                            gap: "8px"
                        },
                        children: [
                            opt.icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(opt.icon, {
                                size: 14,
                                color: opt.color || C.teal
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                lineNumber: 149,
                                columnNumber: 28
                            }, this),
                            opt.label
                        ]
                    }, opt.value, true, {
                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                        lineNumber: 148,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                lineNumber: 146,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
        lineNumber: 135,
        columnNumber: 5
    }, this);
}
_s1(CustomSelect, "quk5NPnr/e0BIqUkmvtWExVll/8=");
_c2 = CustomSelect;
function ImageUpload({ defaultValue }) {
    _s2();
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
                lineNumber: 172,
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
                        lineNumber: 174,
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
                        lineNumber: 175,
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
                                lineNumber: 177,
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
                                lineNumber: 178,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                lineNumber: 173,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
        lineNumber: 171,
        columnNumber: 5
    }, this);
}
_s2(ImageUpload, "4n7EaoOxUXrudna9a2MQF+pdY0U=");
_c3 = ImageUpload;
/* ── MODALE CRÉATION / ÉDITION ── */ function ModalSejour({ sejourData, setSejourEnEdition, isSubmitting, setIsSubmitting }) {
    _s3();
    const isEditing = sejourData !== "nouveau" && sejourData !== "nouveau-senior";
    const defaultAge = sejourData === "nouveau-senior" ? "Séniors" : "";
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
                        lineNumber: 195,
                        columnNumber: 293
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                    lineNumber: 195,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    style: {
                        fontSize: "20px",
                        fontWeight: 900,
                        color: C.teal,
                        marginBottom: "24px"
                    },
                    children: isEditing ? "Modifier le séjour" : sejourData === "nouveau-senior" ? "Créer une sortie Sénior" : "Créer un nouveau séjour"
                }, void 0, false, {
                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                    lineNumber: 196,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    action: async (formData)=>{
                        setIsSubmitting(true);
                        // ⚡ DÉCOMMENTÉ : On sauvegarde en base de données
                        if (isEditing) {
                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$b956da__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["modifierSejour"])(sejourData.id, formData);
                        } else {
                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$6a4f83__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["creerSejour"])(formData);
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
                                    lineNumber: 210,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    name: "tranchesAge",
                                    defaultValue: isEditing ? sejourData.tranchesAge : defaultAge,
                                    placeholder: "Âges (ex: 6-12)",
                                    style: {
                                        flex: 1,
                                        padding: "12px",
                                        borderRadius: "12px",
                                        border: `1px solid ${C.lightGray}`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 211,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                            lineNumber: 209,
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
                                    lineNumber: 215,
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
                                    lineNumber: 216,
                                    columnNumber: 14
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                            lineNumber: 214,
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
                                    lineNumber: 220,
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
                                        lineNumber: 222,
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
                                    lineNumber: 224,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                            lineNumber: 219,
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
                                    lineNumber: 228,
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
                                    lineNumber: 229,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                            lineNumber: 227,
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
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$leaf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Leaf$3e$__["Leaf"],
                                            color: C.saffron
                                        },
                                        {
                                            value: "Hiver",
                                            label: "Hiver",
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$snowflake$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Snowflake$3e$__["Snowflake"],
                                            color: C.teal
                                        },
                                        {
                                            value: "Printemps",
                                            label: "Printemps",
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flower$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flower$3e$__["Flower"],
                                            color: "#10b981"
                                        },
                                        {
                                            value: "Été",
                                            label: "Été",
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"],
                                            color: C.yellow
                                        }
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 233,
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
                                    lineNumber: 239,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                            lineNumber: 232,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageUpload, {
                            defaultValue: isEditing ? sejourData.imageUrl : null
                        }, void 0, false, {
                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                            lineNumber: 245,
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
                                    lineNumber: 248,
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
                                    lineNumber: 249,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                            lineNumber: 247,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                    lineNumber: 200,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
            lineNumber: 194,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
        lineNumber: 193,
        columnNumber: 5
    }, this);
}
_s3(ModalSejour, "3qREGAmKm1jQmfUtr/Olc9OwEaE=");
_c4 = ModalSejour;
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
                lineNumber: 263,
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
                                    lineNumber: 266,
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
                                    lineNumber: 267,
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
                                    lineNumber: 268,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                            lineNumber: 265,
                            columnNumber: 16
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                        lineNumber: 265,
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
                                        lineNumber: 273,
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
                                        lineNumber: 274,
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
                                        lineNumber: 275,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, b.id, true, {
                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                lineNumber: 272,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                        lineNumber: 270,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                lineNumber: 264,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
        lineNumber: 262,
        columnNumber: 5
    }, this);
}
_c5 = TableInscriptions;
function TableSejours({ data, onEdit, onDelete, onToggleStatut, onToggleEnAvant }) {
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
            boxShadow: "0 4px 16px rgba(17,76,90,0.04)",
            overflowX: "auto"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            style: {
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "800px"
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
                                    width: "70px"
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                lineNumber: 292,
                                columnNumber: 13
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
                                lineNumber: 293,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                style: {
                                    padding: "16px",
                                    fontSize: "12px",
                                    color: C.gray
                                },
                                children: "ÂGE"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                lineNumber: 294,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                style: {
                                    padding: "16px",
                                    fontSize: "12px",
                                    color: C.gray
                                },
                                children: "REMPLISSAGE"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                lineNumber: 295,
                                columnNumber: 13
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
                                lineNumber: 296,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                style: {
                                    padding: "16px",
                                    fontSize: "12px",
                                    color: C.gray
                                },
                                children: "PRIX"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                lineNumber: 297,
                                columnNumber: 13
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
                                lineNumber: 298,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                        lineNumber: 291,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                    lineNumber: 290,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                    children: data?.map((s)=>{
                        const nbInscrits = s._count?.inscriptions || s.inscriptions?.length || 0;
                        const places = s.places || 0;
                        const pourcentage = places > 0 ? Math.min(100, Math.round(nbInscrits / places * 100)) : 0;
                        const jaugeColor = pourcentage >= 100 ? "#f63656" : pourcentage >= 80 ? C.saffron : "#10b981";
                        const isPublie = s.statut === "Publié";
                        const isEnAvant = s.enAvant;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: "hover-row",
                            style: {
                                borderBottom: `1px solid ${C.arctic}`,
                                transition: "all 0.2s",
                                background: isPublie ? "transparent" : "#f8fafc",
                                opacity: isPublie ? 1 : 0.6
                            },
                            onMouseOver: (e)=>e.currentTarget.style.background = C.arctic,
                            onMouseOut: (e)=>e.currentTarget.style.background = isPublie ? "transparent" : "#f8fafc",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    style: {
                                        padding: "16px"
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            gap: "10px",
                                            alignItems: "center"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>onToggleStatut(s.id, isPublie ? "Brouillon" : "Publié"),
                                                style: {
                                                    background: "none",
                                                    border: "none",
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    opacity: 1
                                                },
                                                title: isPublie ? "Masquer (Passer en Brouillon)" : "Publier",
                                                children: isPublie ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                    size: 18,
                                                    color: "#10b981"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                    lineNumber: 317,
                                                    columnNumber: 35
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                                                    size: 18,
                                                    color: C.gray
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                    lineNumber: 317,
                                                    columnNumber: 73
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                lineNumber: 316,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>onToggleEnAvant(s.id, !isEnAvant),
                                                style: {
                                                    background: "none",
                                                    border: "none",
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    opacity: 1
                                                },
                                                title: isEnAvant ? "Retirer de l'affiche" : "Mettre à l'affiche",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                    size: 18,
                                                    color: isEnAvant ? C.yellow : C.gray,
                                                    fill: isEnAvant ? C.yellow : "transparent"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                    lineNumber: 320,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                lineNumber: 319,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                        lineNumber: 315,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 314,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    style: {
                                        padding: "16px",
                                        fontSize: "13px",
                                        fontWeight: 800,
                                        color: C.teal,
                                        filter: isPublie ? "none" : "grayscale(100%)"
                                    },
                                    children: [
                                        s.titre,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: "11px",
                                                fontWeight: 600,
                                                color: C.gray,
                                                marginTop: "4px"
                                            },
                                            children: s.saison
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 327,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 325,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    style: {
                                        padding: "16px",
                                        fontSize: "13px",
                                        color: C.gray,
                                        fontWeight: 600
                                    },
                                    children: formatAge(s.tranchesAge)
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 330,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    style: {
                                        padding: "16px",
                                        minWidth: "140px",
                                        filter: isPublie ? "none" : "grayscale(100%)"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                justifyContent: "space-between",
                                                fontSize: "12px",
                                                fontWeight: 700,
                                                color: C.teal,
                                                marginBottom: "6px"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        nbInscrits,
                                                        " inscrit",
                                                        nbInscrits > 1 ? 's' : ''
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                    lineNumber: 336,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: C.gray
                                                    },
                                                    children: [
                                                        "/ ",
                                                        places
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                    lineNumber: 337,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 335,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: "100%",
                                                height: "6px",
                                                background: C.lightGray,
                                                borderRadius: "3px",
                                                overflow: "hidden"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    width: `${pourcentage}%`,
                                                    height: "100%",
                                                    background: jaugeColor,
                                                    borderRadius: "3px",
                                                    transition: "width 0.3s"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                lineNumber: 340,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 339,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 334,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    style: {
                                        padding: "16px",
                                        fontSize: "13px",
                                        color: C.gray
                                    },
                                    children: formatSejourDates(s.dateDebut, s.dateFin)
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 344,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    style: {
                                        padding: "16px",
                                        fontSize: "13px",
                                        fontWeight: 800,
                                        color: C.teal
                                    },
                                    children: [
                                        s.prix || 0,
                                        " €"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 348,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    style: {
                                        padding: "16px",
                                        display: "flex",
                                        gap: "6px",
                                        justifyContent: "flex-end",
                                        alignItems: "center"
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
                                                        lineNumber: 351,
                                                        columnNumber: 69
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                    lineNumber: 351,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    title: "Formulaire",
                                                    style: actionBtnStyle,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__["ClipboardList"], {
                                                        size: 15
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                        lineNumber: 352,
                                                        columnNumber: 71
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                    lineNumber: 352,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    title: "Lien public",
                                                    style: actionBtnStyle,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                        size: 15
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                        lineNumber: 353,
                                                        columnNumber: 72
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                    lineNumber: 353,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 350,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            title: "Éditer",
                                            onClick: ()=>onEdit(s),
                                            style: {
                                                ...actionBtnStyle,
                                                opacity: 1
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__["Edit"], {
                                                size: 15
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                lineNumber: 355,
                                                columnNumber: 108
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 355,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            title: "Supprimer",
                                            onClick: ()=>onDelete(s.id),
                                            style: {
                                                ...actionBtnStyle,
                                                color: "#f63656",
                                                background: "#f6365615",
                                                opacity: 1
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                size: 15
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                lineNumber: 356,
                                                columnNumber: 161
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 356,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 349,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, s.id, true, {
                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                            lineNumber: 312,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                    lineNumber: 301,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
            lineNumber: 289,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
        lineNumber: 288,
        columnNumber: 5
    }, this);
}
_c6 = TableSejours;
function GridSejours({ data, onEdit, onDelete, onToggleStatut, onToggleEnAvant }) {
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
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px"
        },
        children: data?.map((s)=>{
            const nbInscrits = s._count?.inscriptions || s.inscriptions?.length || 0;
            const places = s.places || 0;
            const pourcentage = places > 0 ? Math.min(100, Math.round(nbInscrits / places * 100)) : 0;
            const jaugeColor = pourcentage >= 100 ? "#f63656" : pourcentage >= 80 ? C.saffron : "#10b981";
            const isPublie = s.statut === "Publié";
            const isEnAvant = s.enAvant;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hover-row",
                style: {
                    background: isPublie ? C.white : "#f8fafc",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 4px 16px rgba(17,76,90,0.04)",
                    border: `1px solid ${C.lightGray}`,
                    display: "flex",
                    flexDirection: "column",
                    opacity: isPublie ? 1 : 0.6,
                    transition: "all 0.2s"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            height: "130px",
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
                                    objectFit: 'cover',
                                    filter: isPublie ? "none" : "grayscale(100%)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                lineNumber: 384,
                                columnNumber: 29
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
                                lineNumber: 384,
                                columnNumber: 160
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: "absolute",
                                    top: "12px",
                                    left: "12px",
                                    display: "flex",
                                    gap: "8px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onToggleStatut(s.id, isPublie ? "Brouillon" : "Publié"),
                                        style: {
                                            background: "rgba(255,255,255,0.9)",
                                            border: "none",
                                            borderRadius: "8px",
                                            padding: "6px",
                                            cursor: "pointer",
                                            display: "flex",
                                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                            opacity: 1
                                        },
                                        title: isPublie ? "Masquer" : "Publier",
                                        children: isPublie ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                            size: 14,
                                            color: "#10b981"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 388,
                                            columnNumber: 31
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                                            size: 14,
                                            color: C.gray
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 388,
                                            columnNumber: 69
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                        lineNumber: 387,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onToggleEnAvant(s.id, !isEnAvant),
                                        style: {
                                            background: "rgba(255,255,255,0.9)",
                                            border: "none",
                                            borderRadius: "8px",
                                            padding: "6px",
                                            cursor: "pointer",
                                            display: "flex",
                                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                            opacity: 1
                                        },
                                        title: isEnAvant ? "Retirer de l'affiche" : "Mettre à l'affiche",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                            size: 14,
                                            color: isEnAvant ? C.yellow : C.gray,
                                            fill: isEnAvant ? C.yellow : "transparent"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 391,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                        lineNumber: 390,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                lineNumber: 386,
                                columnNumber: 15
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
                                    color: C.teal,
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                                },
                                children: [
                                    s.prix || "0",
                                    " €"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                lineNumber: 395,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                        lineNumber: 383,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "16px",
                            flex: 1,
                            filter: isPublie ? "none" : "grayscale(100%)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    marginBottom: "16px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            fontSize: "16px",
                                            fontWeight: 800,
                                            color: C.teal,
                                            lineHeight: 1.3
                                        },
                                        children: s.titre
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                        lineNumber: 400,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            background: C.arctic,
                                            padding: "4px 8px",
                                            borderRadius: "6px",
                                            fontSize: "10px",
                                            fontWeight: 800,
                                            color: C.teal,
                                            textTransform: "uppercase"
                                        },
                                        children: s.saison
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                        lineNumber: 401,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                lineNumber: 399,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "10px",
                                    marginBottom: "20px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                            fontSize: "12px",
                                            color: C.gray,
                                            fontWeight: 600
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__["CalendarDays"], {
                                                size: 16,
                                                color: C.saffron
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                lineNumber: 406,
                                                columnNumber: 19
                                            }, this),
                                            " ",
                                            formatSejourDates(s.dateDebut, s.dateFin)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                        lineNumber: 405,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                            fontSize: "12px",
                                            color: C.gray,
                                            fontWeight: 600
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                size: 16,
                                                color: "#10b981"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                lineNumber: 409,
                                                columnNumber: 19
                                            }, this),
                                            " ",
                                            s.lieu || "Lieu à définir"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                        lineNumber: 408,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                            fontSize: "12px",
                                            color: C.gray,
                                            fontWeight: 600
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                size: 16,
                                                color: C.teal
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                lineNumber: 412,
                                                columnNumber: 19
                                            }, this),
                                            " ",
                                            formatAge(s.tranchesAge)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                        lineNumber: 411,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                lineNumber: 404,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: C.arctic + "60",
                                    padding: "12px",
                                    borderRadius: "12px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            justifyContent: "space-between",
                                            fontSize: "11px",
                                            fontWeight: 700,
                                            color: C.teal,
                                            marginBottom: "6px"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    nbInscrits,
                                                    " inscrit",
                                                    nbInscrits > 1 ? 's' : ''
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                lineNumber: 418,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: C.gray
                                                },
                                                children: [
                                                    "/ ",
                                                    places,
                                                    " max."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                lineNumber: 419,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                        lineNumber: 417,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: "100%",
                                            height: "6px",
                                            background: C.lightGray,
                                            borderRadius: "3px",
                                            overflow: "hidden"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: `${pourcentage}%`,
                                                height: "100%",
                                                background: jaugeColor,
                                                borderRadius: "3px"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 422,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                        lineNumber: 421,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                lineNumber: 416,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                        lineNumber: 398,
                        columnNumber: 13
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
                                        title: "Voir les inscrits",
                                        style: actionBtnStyle,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 429,
                                            columnNumber: 74
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                        lineNumber: 429,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        title: "Lien du formulaire",
                                        style: actionBtnStyle,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__["ClipboardList"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 430,
                                            columnNumber: 75
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                        lineNumber: 430,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                lineNumber: 428,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: "4px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        title: "Éditer",
                                        onClick: ()=>onEdit(s),
                                        style: {
                                            ...actionBtnStyle,
                                            opacity: 1
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__["Edit"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 433,
                                            columnNumber: 106
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                        lineNumber: 433,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        title: "Supprimer",
                                        onClick: ()=>onDelete(s.id),
                                        style: {
                                            ...actionBtnStyle,
                                            color: "#f63656",
                                            opacity: 1
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 434,
                                            columnNumber: 132
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                        lineNumber: 434,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                lineNumber: 432,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                        lineNumber: 427,
                        columnNumber: 13
                    }, this)
                ]
            }, s.id, true, {
                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                lineNumber: 381,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
        lineNumber: 371,
        columnNumber: 5
    }, this);
}
_c7 = GridSejours;
function AdminDashboardClient({ stats, inscriptions, sejours, clients }) {
    _s4();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("dashboard");
    const [sidebarOpen, setSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [sejourEnEdition, setSejourEnEdition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("table");
    const [filterSaison, setFilterSaison] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [filterAge, setFilterAge] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [filterStatut, setFilterStatut] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const sejoursTries = [
        ...sejours || []
    ].sort((a, b)=>new Date(a.dateDebut) - new Date(b.dateDebut));
    const uniqueAges = [
        ...new Set(sejoursTries.map((s)=>s.tranchesAge).filter(Boolean))
    ];
    const sejoursFiltres = sejoursTries.filter((s)=>{
        if (filterSaison && s.saison !== filterSaison) return false;
        if (filterAge && s.tranchesAge !== filterAge) return false;
        if (filterStatut && s.statut !== filterStatut) return false;
        return true;
    });
    // ⚡ DÉCOMMENTÉ : Déclenche la Server Action de suppression
    const handleDelete = async (id)=>{
        if (window.confirm("Supprimer définitivement ce séjour ?")) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$896008__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["supprimerSejour"])(id);
        }
    };
    // ⚡ DÉCOMMENTÉ : Déclenche la Server Action pour le Statut (Brouillon/Publié)
    const handleToggleStatut = async (id, nouveauStatut)=>{
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$ef79d6__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["toggleStatut"])(id, nouveauStatut);
    };
    // ⚡ DÉCOMMENTÉ : Déclenche la Server Action pour la mise en avant (Etoile)
    const handleToggleEnAvant = async (id, estEnAvant)=>{
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$1bde92__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["toggleEnAvant"])(id, estEnAvant);
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
                lineNumber: 486,
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
                                gap: "20px",
                                flexWrap: "wrap"
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
                                            lineNumber: 496,
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
                                            lineNumber: 501,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 495,
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
                                            lineNumber: 504,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            placeholder: "Rechercher...",
                                            style: {
                                                width: "100%",
                                                padding: "14px 16px 14px 44px",
                                                borderRadius: "14px",
                                                border: `1px solid ${C.lightGray}`,
                                                background: C.white,
                                                outline: "none",
                                                color: C.teal,
                                                fontWeight: 600
                                            },
                                            onFocus: (e)=>e.target.style.borderColor = C.yellow,
                                            onBlur: (e)=>e.target.style.borderColor = C.lightGray
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 505,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 503,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                            lineNumber: 494,
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
                                            lineNumber: 512,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                                            title: "CA",
                                            value: `${stats?.ca || 0} €`,
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$euro$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Euro$3e$__["Euro"],
                                            color: "#10b981"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 513,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                                            title: "Séjours",
                                            value: stats?.sejoursActifs || 0,
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tent$3e$__["Tent"],
                                            color: C.teal
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 514,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                                            title: "Familles",
                                            value: stats?.familles || 0,
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
                                            color: C.yellow
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 515,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 511,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TableInscriptions, {
                                    data: inscriptions
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 517,
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
                                        marginBottom: "24px",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                        gap: "16px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "16px"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: "14px",
                                                        fontWeight: 700,
                                                        color: C.gray
                                                    },
                                                    children: [
                                                        sejoursFiltres.length,
                                                        " séjour(s)"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                    lineNumber: 526,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "12px",
                                                        borderLeft: `1px solid ${C.lightGray}`,
                                                        paddingLeft: "16px"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__["Filter"], {
                                                            size: 16,
                                                            color: C.gray
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                            lineNumber: 529,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterDropdown, {
                                                            value: filterStatut,
                                                            onChange: setFilterStatut,
                                                            options: [
                                                                {
                                                                    value: "Publié",
                                                                    label: "Affichés"
                                                                },
                                                                {
                                                                    value: "Brouillon",
                                                                    label: "Masqués"
                                                                }
                                                            ],
                                                            defaultLabel: "Tous les statuts"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                            lineNumber: 530,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterDropdown, {
                                                            value: filterSaison,
                                                            onChange: setFilterSaison,
                                                            options: [
                                                                {
                                                                    value: "Automne",
                                                                    label: "Automne"
                                                                },
                                                                {
                                                                    value: "Hiver",
                                                                    label: "Hiver"
                                                                },
                                                                {
                                                                    value: "Printemps",
                                                                    label: "Printemps"
                                                                },
                                                                {
                                                                    value: "Été",
                                                                    label: "Été"
                                                                }
                                                            ],
                                                            defaultLabel: "Toutes les saisons"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                            lineNumber: 539,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterDropdown, {
                                                            value: filterAge,
                                                            onChange: setFilterAge,
                                                            options: uniqueAges.map((age)=>({
                                                                    value: age,
                                                                    label: formatAge(age)
                                                                })),
                                                            defaultLabel: "Tous les âges"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                            lineNumber: 550,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                    lineNumber: 528,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 525,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                gap: "12px",
                                                alignItems: "center"
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
                                                    children: "+ Séjour"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                    lineNumber: 560,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setSejourEnEdition("nouveau-senior"),
                                                    style: {
                                                        background: C.lilac,
                                                        color: C.teal,
                                                        border: "none",
                                                        padding: "10px 16px",
                                                        borderRadius: "10px",
                                                        fontWeight: 800,
                                                        cursor: "pointer"
                                                    },
                                                    children: "+ Sortie Sénior"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                    lineNumber: 561,
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
                                                                color: viewMode === "table" ? C.teal : C.gray,
                                                                border: 'none',
                                                                padding: '8px',
                                                                borderRadius: '8px',
                                                                cursor: 'pointer',
                                                                transition: "all 0.2s"
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"], {
                                                                size: 18
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                                lineNumber: 563,
                                                                columnNumber: 277
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                            lineNumber: 563,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setViewMode("grid"),
                                                            style: {
                                                                background: viewMode === "grid" ? C.arctic : "transparent",
                                                                color: viewMode === "grid" ? C.teal : C.gray,
                                                                border: 'none',
                                                                padding: '8px',
                                                                borderRadius: '8px',
                                                                cursor: 'pointer',
                                                                transition: "all 0.2s"
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__["LayoutGrid"], {
                                                                size: 18
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                                lineNumber: 564,
                                                                columnNumber: 274
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                            lineNumber: 564,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                    lineNumber: 562,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 559,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 523,
                                    columnNumber: 15
                                }, this),
                                viewMode === "table" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TableSejours, {
                                    data: sejoursFiltres,
                                    onEdit: setSejourEnEdition,
                                    onDelete: handleDelete,
                                    onToggleStatut: handleToggleStatut,
                                    onToggleEnAvant: handleToggleEnAvant
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 570,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GridSejours, {
                                    data: sejoursFiltres,
                                    onEdit: setSejourEnEdition,
                                    onDelete: handleDelete,
                                    onToggleStatut: handleToggleStatut,
                                    onToggleEnAvant: handleToggleEnAvant
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 571,
                                    columnNumber: 17
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
                                                fontWeight: 800,
                                                marginBottom: "8px"
                                            },
                                            children: [
                                                c.nom,
                                                " ",
                                                c.prenom
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 579,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "4px",
                                                fontSize: "13px",
                                                color: C.gray
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "8px"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                            size: 14
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                            lineNumber: 581,
                                                            columnNumber: 90
                                                        }, this),
                                                        " ",
                                                        c.email
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                    lineNumber: 581,
                                                    columnNumber: 22
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "8px"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                            size: 14
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                            lineNumber: 582,
                                                            columnNumber: 90
                                                        }, this),
                                                        " ",
                                                        c.telephone
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                                    lineNumber: 582,
                                                    columnNumber: 22
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                            lineNumber: 580,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, c.id, true, {
                                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                                    lineNumber: 578,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                            lineNumber: 576,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                    lineNumber: 492,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                lineNumber: 491,
                columnNumber: 7
            }, this),
            sejourEnEdition && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ModalSejour, {
                sejourData: sejourEnEdition,
                setSejourEnEdition: setSejourEnEdition,
                isSubmitting: isSubmitting,
                setIsSubmitting: setIsSubmitting
            }, void 0, false, {
                fileName: "[project]/app/admin/AdminDashboardClient.jsx",
                lineNumber: 592,
                columnNumber: 27
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/AdminDashboardClient.jsx",
        lineNumber: 484,
        columnNumber: 5
    }, this);
}
_s4(AdminDashboardClient, "braGPvfS7zOkmZzUqEmS1lHmac8=");
_c8 = AdminDashboardClient;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
__turbopack_context__.k.register(_c, "StatCard");
__turbopack_context__.k.register(_c1, "FilterDropdown");
__turbopack_context__.k.register(_c2, "CustomSelect");
__turbopack_context__.k.register(_c3, "ImageUpload");
__turbopack_context__.k.register(_c4, "ModalSejour");
__turbopack_context__.k.register(_c5, "TableInscriptions");
__turbopack_context__.k.register(_c6, "TableSejours");
__turbopack_context__.k.register(_c7, "GridSejours");
__turbopack_context__.k.register(_c8, "AdminDashboardClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_1c8f4c98._.js.map