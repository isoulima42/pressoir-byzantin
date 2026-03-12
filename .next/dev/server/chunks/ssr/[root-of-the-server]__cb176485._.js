module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/components/ServiceWorkerRegister.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ServiceWorkerRegister
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
function ServiceWorkerRegister() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/sw.js").catch(()=>{
            // SW registration failed — non-critical
            });
        }
    }, []);
    return null;
}
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/components/CustomCursor.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CustomCursor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function CustomCursor() {
    const [mousePosition, setMousePosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        x: -100,
        y: -100
    });
    const [isHovering, setIsHovering] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isClicking, setIsClicking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const springConfig = {
        damping: 25,
        stiffness: 250,
        mass: 0.5
    };
    const cursorX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])(-100, springConfig);
    const cursorY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])(-100, springConfig);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        const shouldEnable = finePointer.matches && !reducedMotion.matches;
        if (!shouldEnable) {
            document.body.classList.remove("custom-cursor-active");
            return;
        }
        document.body.classList.add("custom-cursor-active");
        const updatePosition = (event)=>{
            setMousePosition({
                x: event.clientX,
                y: event.clientY
            });
            cursorX.set(event.clientX - 16);
            cursorY.set(event.clientY - 16);
            setIsVisible(true);
        };
        const updateHoverState = (event)=>{
            const target = event.target;
            if (!(target instanceof Element)) return;
            setIsHovering(Boolean(target.closest("a, button, input, textarea, select, summary, [role='button'], .hover-trigger")));
        };
        const hideCursor = ()=>{
            setIsVisible(false);
            setIsHovering(false);
        };
        const handleMouseDown = ()=>setIsClicking(true);
        const handleMouseUp = ()=>setIsClicking(false);
        window.addEventListener("mousemove", updatePosition);
        window.addEventListener("mouseover", updateHoverState);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mouseleave", hideCursor);
        return ()=>{
            document.body.classList.remove("custom-cursor-active");
            window.removeEventListener("mousemove", updatePosition);
            window.removeEventListener("mouseover", updateHoverState);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mouseleave", hideCursor);
        };
    }, [
        cursorX,
        cursorY,
        pathname
    ]);
    if (!isVisible) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 rounded-full border border-brand-orange/80 mix-blend-exclusion",
                style: {
                    x: cursorX,
                    y: cursorY
                },
                animate: {
                    scale: isClicking ? 0.84 : isHovering ? 1.45 : 1,
                    backgroundColor: isHovering ? "rgba(251, 143, 44, 0.12)" : "transparent"
                },
                transition: {
                    type: "spring",
                    mass: 0.1,
                    stiffness: 200,
                    damping: 15
                }
            }, void 0, false, {
                fileName: "[project]/components/CustomCursor.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-brand-orange shadow-[0_0_10px_2px_rgba(251,143,44,0.45)] mix-blend-exclusion",
                animate: {
                    x: mousePosition.x - 3,
                    y: mousePosition.y - 3,
                    scale: isClicking ? 0.55 : isHovering ? 0 : 1,
                    opacity: isHovering ? 0 : 1
                },
                transition: {
                    type: "tween",
                    ease: "linear",
                    duration: 0
                }
            }, void 0, false, {
                fileName: "[project]/components/CustomCursor.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/lib/constants.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MENU_ITEMS",
    ()=>MENU_ITEMS,
    "NAV_LINKS",
    ()=>NAV_LINKS,
    "PRIMARY_NAV_LINKS",
    ()=>PRIMARY_NAV_LINKS,
    "RESTAURANT",
    ()=>RESTAURANT,
    "SECONDARY_NAV_LINKS",
    ()=>SECONDARY_NAV_LINKS,
    "isActivePath",
    ()=>isActivePath
]);
const RESTAURANT = {
    name: "Le Pressoir Byzantin",
    description: "L'élégance de la Méditerranée, l'âme de l'Orient. Niché au cœur de Villeneuve, Le Pressoir Byzantin est une invitation au voyage.",
    address: "Grand Rue 29, 1844 Villeneuve",
    phone: "079 659 41 52",
    phoneHref: "tel:+41796594152",
    email: "info@lepressoirbyzantin.ch",
    emailHref: "mailto:info@lepressoirbyzantin.ch",
    url: "https://lepressoirbyzantin.ch",
    hours: {
        weekdays: {
            label: "Lundi – Jeudi",
            time: "10h00 – 23h30"
        },
        weekend: {
            label: "Vendredi – Dimanche",
            time: "10h00 – 22h30"
        }
    },
    social: {
        instagram: "https://instagram.com/lepressoirbyzantin",
        tiktok: "https://tiktok.com/@lepressoirbyzantin"
    },
    legal: {
        entity: "Irem Sarl",
        copyright: `© ${new Date().getFullYear()} L'usine Web`,
        notice: "Tous les droits relatifs à cette société appartiennent à Irem Sarl."
    },
    mapsQuery: "Grand Rue 29 1844 Villeneuve",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Grand%20Rue%2029%201844%20Villeneuve",
    mapsEmbed: "https://maps.google.com/maps?q=Grand%20Rue%2029%201844%20Villeneuve&t=m&z=15&output=embed&iwloc=near",
    responseSla: "Réponse sous 24h"
};
const PRIMARY_NAV_LINKS = [
    {
        label: "Notre carte",
        href: "/carte-des-mets"
    },
    {
        label: "Boissons",
        href: "/carte-des-boissons"
    },
    {
        label: "Événements & Traiteur",
        href: "/event-traiteur"
    },
    {
        label: "Galerie",
        href: "/galerie"
    },
    {
        label: "À propos",
        href: "/a-propos"
    },
    {
        label: "Contact",
        href: "/contact"
    }
];
const SECONDARY_NAV_LINKS = [
    {
        label: "Accueil",
        href: "/"
    },
    {
        label: "Réservation",
        href: "/reservation"
    }
];
const NAV_LINKS = [
    ...SECONDARY_NAV_LINKS,
    ...PRIMARY_NAV_LINKS
];
function isActivePath(pathname, href) {
    if (href === "/") {
        return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
}
const MENU_ITEMS = [
    {
        slug: "box-shawarma",
        name: "Box Shawarma",
        price: 14,
        description: "Émincé généreux de viandes marinées aux épices douces, accompagné de son méli-mélo de légumes croquants et de nos sauces signatures.",
        image: "/images/food/box-kebab.png"
    },
    {
        slug: "byzantinne",
        name: "Byzantine",
        price: 21,
        description: "Un alliage subtil de poulet rôti et d'agneau finement tranché, sublimé par la douceur des poivrons confits et le parfum enivrant de l'origan frais.",
        image: "/images/food/pizza-kebab.png"
    },
    {
        slug: "chevremiel",
        name: "Chèvre-miel",
        price: 17.5,
        description: "L'équilibre parfait entre le caractère corsé du fromage de chèvre et la douceur ambrée du miel, couronné de basilic ciselé.",
        image: "/images/food/chevre-miel.png"
    },
    {
        slug: "la-tonnata",
        name: "La tonnata",
        price: 17.5,
        description: "Une rencontre méditerranéenne entre la fondante mozzarella, le thon délicat, les olives noires croquantes et le parfum de l'origan sauvage.",
        image: "/images/food/latonatta.png"
    },
    {
        slug: "nordique",
        name: "Nordique",
        price: 19.5,
        description: "Une escapade fraîche mêlant crème onctueuse, fines tranches de saumon fumé d'exception et la rondeur des pommes de terre rôties.",
        image: "/images/food/Nordique.png"
    },
    {
        slug: "nutella",
        name: "Nutella",
        price: 14.5,
        description: "L'indulgence absolue : pâte croustillante nappée de l'authentique pâte à tartiner et délicatement parsemée d'éclats de noix croquantes.",
        image: "/images/food/nutella.png"
    },
    {
        slug: "romaine",
        name: "Romaine",
        price: 18.5,
        description: "L'intemporel classique italien revisité avec notre sauce tomate à l'ancienne, jambon délicat, champignons frais et notre fromage parfumé.",
        image: "/images/food/romaine.png"
    },
    {
        slug: "tartiflette",
        name: "Tartiflette",
        price: 18.5,
        description: "Une pizza réconfortante et généreuse mariant l'intensité de la crème fraîche double, la générosité des lardons fumés et des oignons rissolés.",
        image: "/images/food/Tartiflette.png"
    },
    {
        slug: "tunisienne",
        name: "Tunisienne",
        price: 18.5,
        description: "Voyagez vers le sud avec la chaleur des épices orientales et le caractère corsé des véritables merguez de boeuf fondantes.",
        image: "/images/food/tunnisien.png"
    }
];
}),
"[project]/components/MobileStickyActions.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MobileStickyActions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function MobileStickyActions() {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    if (pathname.startsWith("/admin") || pathname.startsWith("/reservation")) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pointer-events-none fixed inset-x-0 bottom-4 z-40 px-4 lg:hidden",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "pointer-events-auto mx-auto flex max-w-sm items-center gap-3 rounded-full border border-brand-cream/10 bg-brand-dark/90 p-2 shadow-[0_18px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RESTAURANT"].phoneHref,
                    className: "flex-1 rounded-full border border-brand-cream/15 px-4 py-3 text-center text-xs font-nav uppercase tracking-[0.2em] text-brand-cream",
                    children: "Appeler"
                }, void 0, false, {
                    fileName: "[project]/components/MobileStickyActions.tsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: "/reservation",
                    className: "flex-1 rounded-sm bg-byzantin-gold px-4 py-3 text-center text-xs font-nav uppercase tracking-[0.2em] text-byzantin-chocolate",
                    children: "Réserver"
                }, void 0, false, {
                    fileName: "[project]/components/MobileStickyActions.tsx",
                    lineNumber: 23,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/MobileStickyActions.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/MobileStickyActions.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/MotionProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MotionProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$MotionConfig$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/MotionConfig/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
function MotionProvider({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$MotionConfig$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MotionConfig"], {
        reducedMotion: "user",
        children: children
    }, void 0, false, {
        fileName: "[project]/components/MotionProvider.tsx",
        lineNumber: 10,
        columnNumber: 10
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__cb176485._.js.map