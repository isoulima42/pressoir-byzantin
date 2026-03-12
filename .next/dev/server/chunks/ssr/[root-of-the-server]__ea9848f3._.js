module.exports = [
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/loading.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/loading.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/template.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/template.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/sanity/lib/client.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "client",
    ()=>client,
    "urlFor",
    ()=>urlFor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$client$2f$dist$2f$index$2e$browser$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@sanity/client/dist/index.browser.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$image$2d$url$2f$lib$2f$_chunks$2d$es$2f$compat$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@sanity/image-url/lib/_chunks-es/compat.js [app-rsc] (ecmascript)");
;
;
const projectId = ("TURBOPACK compile-time value", "wfj79vcj");
const dataset = ("TURBOPACK compile-time value", "production");
const apiVersion = ("TURBOPACK compile-time value", "2024-07-11") || "2024-07-11";
const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$client$2f$dist$2f$index$2e$browser$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    perspective: "published"
});
const builder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$image$2d$url$2f$lib$2f$_chunks$2d$es$2f$compat$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createImageUrlBuilder"])(client);
function urlFor(source) {
    return builder.image(source);
}
}),
"[project]/sanity/lib/queries.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAdditionalServices",
    ()=>getAdditionalServices,
    "getAllMenuItems",
    ()=>getAllMenuItems,
    "getAllPages",
    ()=>getAllPages,
    "getGallery",
    ()=>getGallery,
    "getMenuCategories",
    ()=>getMenuCategories,
    "getMenuItemBySlug",
    ()=>getMenuItemBySlug,
    "getMenuItemsByType",
    ()=>getMenuItemsByType,
    "getPageBySlug",
    ()=>getPageBySlug,
    "getReservationSettings",
    ()=>getReservationSettings,
    "getReservationsForDate",
    ()=>getReservationsForDate,
    "getRestaurantInfo",
    ()=>getRestaurantInfo,
    "getServiceCategories",
    ()=>getServiceCategories,
    "getServiceItems",
    ()=>getServiceItems,
    "getTeamMembers",
    ()=>getTeamMembers,
    "getVenueInfo",
    ()=>getVenueInfo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sanity/lib/client.ts [app-rsc] (ecmascript)");
;
async function getMenuCategories(menuType) {
    if (menuType) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["client"].fetch(`*[_type == "menuCategory" && menuType == $menuType] | order(order asc) {
        _id, name, slug, description, order, menuType
      }`, {
            menuType
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["client"].fetch(`*[_type == "menuCategory"] | order(order asc) {
      _id, name, slug, description, order, menuType
    }`);
}
async function getMenuItemsByType(menuType) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["client"].fetch(`*[_type == "menuItem" && available == true && category->menuType == $menuType] | order(category->order asc, name asc) {
      _id, name, slug, description, price, image, available, allergens, tags, extras,
      category->{ _id, name, slug }
    }`, {
        menuType
    });
}
async function getAllMenuItems() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["client"].fetch(`*[_type == "menuItem" && available == true] | order(category->order asc, name asc) {
      _id, name, slug, description, price, image, available, allergens, tags, extras,
      category->{ _id, name, slug }
    }`);
}
async function getMenuItemBySlug(slug) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["client"].fetch(`*[_type == "menuItem" && slug.current == $slug][0] {
      _id, name, slug, description, price, image, available, allergens, tags, extras,
      category->{ _id, name, slug }
    }`, {
        slug
    });
}
async function getPageBySlug(slug) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["client"].fetch(`*[_type == "page" && slug.current == $slug][0] {
      _id, title, slug, heroImage, content, seo
    }`, {
        slug
    });
}
async function getAllPages() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["client"].fetch(`*[_type == "page"] | order(title asc) {
      _id, title, slug, seo
    }`);
}
async function getRestaurantInfo() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["client"].fetch(`*[_type == "restaurantInfo"][0] {
      _id, name, address, phone, email, logo, hours, socialLinks,
      mapsEmbed, legalEntity, copyrightNotice
    }`);
}
async function getServiceCategories() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["client"].fetch(`*[_type == "serviceCategory"] | order(order asc) {
      _id, title, slug, description, icon, image, order
    }`);
}
async function getServiceItems() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["client"].fetch(`*[_type == "serviceItem"] | order(order asc) {
      _id, title, description, order,
      category->{ _id, title, slug }
    }`);
}
async function getVenueInfo() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["client"].fetch(`*[_type == "venueInfo"][0] {
      capacity, features, images
    }`);
}
async function getAdditionalServices() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["client"].fetch(`*[_type == "additionalService"] | order(order asc) {
      _id, title, description, order
    }`);
}
async function getGallery() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["client"].fetch(`*[_type == "gallery"] | order(order asc) {
      _id, title, image, order
    }`);
}
async function getTeamMembers() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["client"].fetch(`*[_type == "teamMember"] | order(order asc) {
      _id, name, role, photo, bio, order
    }`);
}
async function getReservationSettings() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["client"].fetch(`*[_type == "reservationSettings"][0] {
      maxGuestsPerSlot, slotDuration, serviceHours, closedDays,
      advanceBookingDays, minAdvanceHours
    }`);
}
async function getReservationsForDate(date) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["client"].fetch(`*[_type == "reservation" && date == $date && status != "cancelled"] {
      _id, time, guests
    }`, {
        date
    });
}
}),
"[project]/lib/get-layout-data.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getLayoutData",
    ()=>getLayoutData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sanity/lib/queries.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants.ts [app-rsc] (ecmascript)");
;
;
async function getLayoutData() {
    const info = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRestaurantInfo"])().catch(()=>null);
    return {
        name: info?.name ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RESTAURANT"].name,
        address: info?.address ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RESTAURANT"].address,
        phone: info?.phone ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RESTAURANT"].phone,
        email: info?.email ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RESTAURANT"].email,
        mapsEmbed: info?.mapsEmbed ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RESTAURANT"].mapsEmbed,
        legalEntity: info?.legalEntity ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RESTAURANT"].legal.entity,
        copyrightNotice: info?.copyrightNotice ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RESTAURANT"].legal.notice,
        hours: info?.hours?.length ? info.hours : [
            {
                days: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RESTAURANT"].hours.weekdays.label,
                openTime: "10h00",
                closeTime: "23h30"
            },
            {
                days: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RESTAURANT"].hours.weekend.label,
                openTime: "10h00",
                closeTime: "22h30"
            }
        ],
        socialLinks: info?.socialLinks?.length ? info.socialLinks : [
            {
                platform: "instagram",
                url: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RESTAURANT"].social.instagram
            },
            {
                platform: "tiktok",
                url: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RESTAURANT"].social.tiktok
            }
        ]
    };
}
}),
"[project]/components/Header.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/Header.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/Header.tsx <module evaluation>", "default");
}),
"[project]/components/Header.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/Header.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/Header.tsx", "default");
}),
"[project]/components/Header.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Header$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/Header.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Header$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/Header.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Header$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/components/Footer.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/Footer.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/Footer.tsx <module evaluation>", "default");
}),
"[project]/components/Footer.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/Footer.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/Footer.tsx", "default");
}),
"[project]/components/Footer.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Footer$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/Footer.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Footer$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/Footer.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Footer$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/components/JsonLd.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Renders a JSON-LD script tag for structured data.
 * Server Component — no client JS.
 */ __turbopack_context__.s([
    "default",
    ()=>JsonLd
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
;
function JsonLd({ data }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
        type: "application/ld+json",
        dangerouslySetInnerHTML: {
            __html: JSON.stringify(data)
        }
    }, void 0, false, {
        fileName: "[project]/components/JsonLd.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/structured-data.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "breadcrumbJsonLd",
    ()=>breadcrumbJsonLd,
    "menuJsonLd",
    ()=>menuJsonLd,
    "restaurantJsonLd",
    ()=>restaurantJsonLd,
    "serviceJsonLd",
    ()=>serviceJsonLd
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants.ts [app-rsc] (ecmascript)");
;
const SITE_URL = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RESTAURANT"].url;
function breadcrumbJsonLd(items) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i)=>({
                "@type": "ListItem",
                position: i + 1,
                name: item.name,
                item: `${SITE_URL}${item.url}`
            }))
    };
}
function restaurantJsonLd(info) {
    return {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "@id": `${SITE_URL}/#restaurant`,
        name: info.name,
        description: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RESTAURANT"].description,
        url: SITE_URL,
        telephone: info.phone,
        email: info.email,
        address: {
            "@type": "PostalAddress",
            streetAddress: "Grand Rue 29",
            addressLocality: "Villeneuve",
            postalCode: "1844",
            addressCountry: "CH"
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: 46.3978,
            longitude: 6.9253
        },
        image: `${SITE_URL}/images/logo/Artboard-1.png`,
        servesCuisine: [
            "Méditerranéenne",
            "Orientale",
            "Turque",
            "Pizza",
            "Kebab"
        ],
        priceRange: "CHF 12 – CHF 25",
        currenciesAccepted: "CHF",
        paymentAccepted: "Cash, Credit Card",
        openingHoursSpecification: info.hours.map((slot)=>({
                "@type": "OpeningHoursSpecification",
                dayOfWeek: parseDays(slot.days),
                opens: normalizeTime(slot.openTime),
                closes: normalizeTime(slot.closeTime)
            })),
        sameAs: [
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RESTAURANT"].social.instagram,
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RESTAURANT"].social.tiktok
        ],
        menu: `${SITE_URL}/carte-des-mets`,
        acceptsReservations: true,
        hasMenu: {
            "@type": "Menu",
            url: `${SITE_URL}/carte-des-mets`
        }
    };
}
function menuJsonLd(categories) {
    return {
        "@context": "https://schema.org",
        "@type": "Menu",
        name: "Carte des mets",
        url: `${SITE_URL}/carte-des-mets`,
        hasMenuSection: categories.map((cat)=>({
                "@type": "MenuSection",
                name: cat.name,
                hasMenuItem: cat.items.map((item)=>({
                        "@type": "MenuItem",
                        name: item.name,
                        description: item.description ?? "",
                        offers: {
                            "@type": "Offer",
                            price: item.price,
                            priceCurrency: "CHF"
                        }
                    }))
            }))
    };
}
function serviceJsonLd(services) {
    return {
        "@context": "https://schema.org",
        "@type": "FoodService",
        name: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RESTAURANT"].name} — Événements & Traiteur`,
        url: `${SITE_URL}/event-traiteur`,
        provider: {
            "@type": "Restaurant",
            name: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RESTAURANT"].name,
            url: SITE_URL
        },
        areaServed: {
            "@type": "Place",
            name: "Villeneuve, Suisse"
        },
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Prestations",
            itemListElement: services.map((svc)=>({
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: svc.name,
                        description: svc.description ?? ""
                    }
                }))
        }
    };
}
/* ── Helpers ───────────────────────────────────────────── */ function parseDays(days) {
    const mapping = {
        lundi: "Monday",
        mardi: "Tuesday",
        mercredi: "Wednesday",
        jeudi: "Thursday",
        vendredi: "Friday",
        samedi: "Saturday",
        dimanche: "Sunday"
    };
    const lower = days.toLowerCase();
    const result = [];
    // Handle ranges like "Lundi – Jeudi"
    const rangeMatch = lower.match(/(\w+)\s*[–-]\s*(\w+)/);
    if (rangeMatch) {
        const dayOrder = [
            "lundi",
            "mardi",
            "mercredi",
            "jeudi",
            "vendredi",
            "samedi",
            "dimanche"
        ];
        const startIdx = dayOrder.indexOf(rangeMatch[1]);
        const endIdx = dayOrder.indexOf(rangeMatch[2]);
        if (startIdx >= 0 && endIdx >= 0) {
            for(let i = startIdx; i <= endIdx; i++){
                const eng = mapping[dayOrder[i]];
                if (eng) result.push(eng);
            }
        }
    }
    // If nothing matched, try individual days
    if (result.length === 0) {
        for (const [fr, en] of Object.entries(mapping)){
            if (lower.includes(fr)) result.push(en);
        }
    }
    return result;
}
function normalizeTime(time) {
    // "10h00" → "10:00", "23h30" → "23:30"
    return time.replace("h", ":");
}
}),
"[project]/app/event-traiteur/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EventTraiteurPage,
    "generateMetadata",
    ()=>generateMetadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sanity/lib/queries.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sanity/lib/client.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$get$2d$layout$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/get-layout-data.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Header$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Header.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Footer$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Footer.tsx [app-rsc] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/components/services/ServicesContent'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$JsonLd$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/JsonLd.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$structured$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/structured-data.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
async function generateMetadata() {
    const page = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPageBySlug"])("event-traiteur").catch(()=>null);
    return {
        title: page?.seo?.metaTitle ?? "Événements & Traiteur | Le Pressoir Byzantin",
        description: page?.seo?.metaDescription ?? "Sous les voûtes de notre ancien pressoir ou chez vous, confiez-nous vos grandes occasions. Mariages, séminaires et événements sur mesure.",
        openGraph: {
            title: "Événements & Traiteur | Le Pressoir Byzantin",
            description: "Sous les voûtes de notre ancien pressoir ou chez vous, confiez-nous l'organisation de vos réceptions.",
            images: [
                {
                    url: "/images/events/event-2.png"
                }
            ]
        }
    };
}
/* ── Fallback data ─────────────────────────────────────── */ const FALLBACK_CATEGORIES = [
    {
        _id: "svc-cat-prives",
        title: "Événements Privés",
        slug: "evenements-prives",
        description: "Célébrez vos instants précieux dans une atmosphère intimiste et authentique. Notre équipe veille à chaque détail pour que votre fête soit mémorable.",
        icon: "✨",
        items: [
            {
                _id: "f1",
                title: "Anniversaires d'exception"
            },
            {
                _id: "f2",
                title: "Fiançailles & Réceptions de mariage"
            },
            {
                _id: "f3",
                title: "Retrouvailles familiales"
            },
            {
                _id: "f4",
                title: "Célébrations intimes"
            }
        ]
    },
    {
        _id: "svc-cat-pro",
        title: "Rencontres Professionnelles",
        slug: "evenements-professionnels",
        description: "Alliez convivialité et professionnalisme. Notre espace s'adapte à vos besoins pour des réunions stimulantes et des dîners d'affaires mémorables.",
        icon: "🖋️",
        items: [
            {
                _id: "f5",
                title: "Déjeuners & Dîners d'affaires"
            },
            {
                _id: "f6",
                title: "Lancements de produits"
            },
            {
                _id: "f7",
                title: "Soirées de networking"
            },
            {
                _id: "f8",
                title: "Fêtes de fin d'année"
            }
        ]
    },
    {
        _id: "svc-cat-traiteur",
        title: "Service Traiteur & Chef à Domicile",
        slug: "service-traiteur",
        description: "L'excellence du Pressoir Byzantin s'invite à votre table. De la conception sur mesure à la mise en scène, nous orchestons vos réceptions avec passion.",
        icon: "🍽️",
        items: [
            {
                _id: "f9",
                title: "Mezzés & Pièces cocktails"
            },
            {
                _id: "f10",
                title: "Buffets aux saveurs du Levant"
            },
            {
                _id: "f11",
                title: "Dîners de gala"
            },
            {
                _id: "f12",
                title: "Ateliers culinaires & animations"
            }
        ]
    },
    {
        _id: "svc-cat-salle",
        title: "Privatisation du Pressoir",
        slug: "location-de-salle",
        description: "Sous les voûtes de notre ancien pressoir, découvrez un écrin de caractère, privatisable pour donner à vos événements une dimension unique.",
        icon: "🏛️",
        items: []
    }
];
const FALLBACK_VENUE = {
    capacity: 60,
    features: [
        "Un écrin historique au charme préservé",
        "Capacité d'accueil jusqu'à 60 convives assis",
        "Dressage de tables raffiné et personnalisable",
        "Scénographie lumineuse modulable"
    ],
    images: [
        "/images/events/event-1.png",
        "/images/events/event-2.png",
        "/images/events/event-3-scaled.png",
        "/images/events/evennt-4-scaled.png"
    ]
};
const FALLBACK_ADDITIONAL = [
    {
        _id: "a1",
        title: "Curatelle musicale",
        description: "Orchestration, DJ ou artistes live."
    },
    {
        _id: "a2",
        title: "Immortalisation",
        description: "Photographes et vidéastes professionnels."
    },
    {
        _id: "a3",
        title: "Scénographie florale",
        description: "Compositions sur mesure par notre fleuriste."
    },
    {
        _id: "a4",
        title: "Créations culinaires exclusives",
        description: "Menus conçus spécialement pour votre événement."
    }
];
async function EventTraiteurPage() {
    const [sanityCategories, sanityItems, sanityVenue, sanityAdditional, layout] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getServiceCategories"])().catch(()=>null),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getServiceItems"])().catch(()=>null),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getVenueInfo"])().catch(()=>null),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$queries$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAdditionalServices"])().catch(()=>null),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$get$2d$layout$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getLayoutData"])()
    ]);
    // Build categories with their items
    let categories;
    if (sanityCategories?.length > 0) {
        categories = sanityCategories.map((cat)=>{
            const slug = typeof cat.slug === "string" ? cat.slug : cat.slug.current;
            const items = (sanityItems ?? []).filter((item)=>{
                if (!item.category?.slug) return false;
                const s = typeof item.category.slug === "string" ? item.category.slug : item.category.slug.current;
                return s === slug;
            });
            return {
                _id: cat._id,
                title: cat.title,
                slug,
                description: cat.description,
                icon: cat.icon,
                imageUrl: cat.image?.asset?._ref ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["urlFor"])(cat.image).width(800).height(500).url() : undefined,
                items: items.map((i)=>({
                        _id: i._id,
                        title: i.title,
                        description: i.description
                    }))
            };
        });
    } else {
        categories = FALLBACK_CATEGORIES;
    }
    // Venue
    const venue = sanityVenue ? {
        capacity: sanityVenue.capacity ?? 60,
        features: sanityVenue.features ?? FALLBACK_VENUE.features,
        images: sanityVenue.images?.length ? sanityVenue.images.map((img)=>img.asset?._ref ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$lib$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["urlFor"])(img).width(600).height(450).url() : "/images/events/event-1.png") : FALLBACK_VENUE.images
    } : FALLBACK_VENUE;
    // Additional services
    const additionalServices = sanityAdditional?.length > 0 ? sanityAdditional.map((s)=>({
            _id: s._id,
            title: s.title,
            description: s.description
        })) : FALLBACK_ADDITIONAL;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$JsonLd$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$structured$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["breadcrumbJsonLd"])([
                    {
                        name: "Accueil",
                        url: "/"
                    },
                    {
                        name: "Événements & Traiteur",
                        url: "/event-traiteur"
                    }
                ])
            }, void 0, false, {
                fileName: "[project]/app/event-traiteur/page.tsx",
                lineNumber: 200,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Header$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/event-traiteur/page.tsx",
                lineNumber: 206,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                id: "main-content",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(ServicesContent, {
                    categories: categories,
                    venue: venue,
                    additionalServices: additionalServices
                }, void 0, false, {
                    fileName: "[project]/app/event-traiteur/page.tsx",
                    lineNumber: 208,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/event-traiteur/page.tsx",
                lineNumber: 207,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Footer$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                name: layout.name,
                hours: layout.hours,
                socialLinks: layout.socialLinks,
                legalEntity: layout.legalEntity,
                copyrightNotice: layout.copyrightNotice
            }, void 0, false, {
                fileName: "[project]/app/event-traiteur/page.tsx",
                lineNumber: 214,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/app/event-traiteur/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/event-traiteur/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ea9848f3._.js.map