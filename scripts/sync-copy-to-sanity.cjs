/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path");
const { createClient } = require("next-sanity");
require("dotenv").config({ path: path.join(__dirname, "..", ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-07-11",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

if (
  !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  !process.env.NEXT_PUBLIC_SANITY_DATASET ||
  !process.env.SANITY_API_TOKEN
) {
  throw new Error("Missing Sanity environment variables in .env.local");
}

function slug(current) {
  return { _type: "slug", current };
}

function block(text, style = "normal") {
  return {
    _type: "block",
    style,
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: [],
        text,
      },
    ],
  };
}

function blocks(paragraphs) {
  return paragraphs.filter(Boolean).map((paragraph) => block(paragraph));
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const PAGE_DOCS = [
  {
    _id: "page-accueil",
    _type: "page",
    title: "Accueil",
    slug: slug("accueil"),
    seo: {
      metaTitle: "Le Pressoir Byzantin | Villeneuve",
      metaDescription:
        "À Villeneuve, Le Pressoir Byzantin marie Orient et Méditerranée autour d'une cuisine faite maison, généreuse et inspirée.",
    },
    content: blocks([
      "Au Pressoir Byzantin, chaque table est une invitation à ralentir, partager et voyager entre les rivages de la Méditerranée et les parfums du Levant.",
      "Notre cuisine assemble braise, pâte dorée, mezzés, douceurs et hospitalité dans un même geste : celui d'accueillir avec générosité.",
      "Qu'il s'agisse d'un déjeuner impromptu, d'un dîner à prolonger ou d'une grande occasion, nous faisons de chaque service un moment habité.",
    ]),
  },
  {
    _id: "page-a-propos",
    _type: "page",
    title: "À propos",
    slug: slug("a-propos"),
    seo: {
      metaTitle: "Notre Histoire | Le Pressoir Byzantin",
      metaDescription:
        "Découvrez l'histoire du Pressoir Byzantin, un lieu où l'hospitalité orientale rencontre l'élégance méditerranéenne au cœur de Villeneuve.",
    },
    content: blocks([
      "Le Pressoir Byzantin est né d'une envie simple : faire dialoguer les recettes de cœur, la chaleur des maisons de famille et l'élégance des grandes tables accueillantes.",
      "Ici, les épices, les pains dorés, les sauces lentes et les produits choisis racontent un héritage vivant plutôt qu'une simple carte.",
      "Notre histoire est celle d'un lieu de partage, pensé pour réunir, célébrer et laisser un souvenir juste.",
    ]),
  },
  {
    _id: "page-contact",
    _type: "page",
    title: "Contact",
    slug: slug("contact"),
    seo: {
      metaTitle: "Contact | Le Pressoir Byzantin",
      metaDescription:
        "Réservation, événement privé, traiteur ou simple question : écrivez au Pressoir Byzantin et confiez-nous vos envies.",
    },
    content: blocks([
      "Une réservation intimiste, un anniversaire sous les voûtes, un service traiteur à imaginer : chaque message est le début d'une conversation que nous prenons le temps d'écouter.",
      "Dites-nous ce que vous imaginez, nous vous répondrons avec clarté, chaleur et attention.",
    ]),
  },
  {
    _id: "page-event-traiteur",
    _type: "page",
    title: "Événements & Traiteur",
    slug: slug("event-traiteur"),
    seo: {
      metaTitle: "Événements & Traiteur | Le Pressoir Byzantin",
      metaDescription:
        "Sous nos voûtes ou chez vous, Le Pressoir Byzantin imagine réceptions, dîners d'affaires et prestations traiteur sur mesure.",
    },
    content: blocks([
      "Sous les pierres de notre ancien pressoir ou dans le lieu de votre choix, nous composons des réceptions à votre mesure, entre raffinement, convivialité et précision du service.",
      "Événements privés, rencontres professionnelles, buffets signatures, dîners assis ou prestations chef à domicile : chaque format est pensé comme une mise en scène de l'accueil.",
      "Notre ambition reste la même : faire naître une table qui vous ressemble et laisse une empreinte juste.",
    ]),
  },
  {
    _id: "page-galerie",
    _type: "page",
    title: "Galerie",
    slug: slug("galerie"),
    seo: {
      metaTitle: "Galerie | Le Pressoir Byzantin",
      metaDescription:
        "Parcourez en images l'atmosphère du Pressoir Byzantin, ses assiettes, ses voûtes et les instants partagés à Villeneuve.",
    },
    content: blocks([
      "La galerie rassemble ce que les mots ne suffisent pas toujours à dire : la lumière d'une salle, le geste d'un service, la gourmandise d'une assiette.",
      "Chaque image prolonge l'univers du Pressoir Byzantin entre chaleur, matière et hospitalité.",
    ]),
  },
];

const RESTAURANT_INFO = {
  _id: "restaurant-info",
  _type: "restaurantInfo",
  name: "Le Pressoir Byzantin",
  address: "Grand Rue 29, 1844 Villeneuve",
  phone: "079 659 41 52",
  email: "info@lepressoirbyzantin.ch",
  hours: [
    {
      _type: "object",
      days: "Lundi - Jeudi",
      openTime: "10h00",
      closeTime: "23h30",
    },
    {
      _type: "object",
      days: "Vendredi - Dimanche",
      openTime: "10h00",
      closeTime: "22h30",
    },
  ],
  socialLinks: [
    {
      _type: "object",
      platform: "instagram",
      url: "https://instagram.com/lepressoirbyzantin",
    },
    {
      _type: "object",
      platform: "tiktok",
      url: "https://tiktok.com/@lepressoirbyzantin",
    },
  ],
  mapsEmbed:
    "https://maps.google.com/maps?q=Grand%20Rue%2029%201844%20Villeneuve&t=m&z=15&output=embed&iwloc=near",
  legalEntity: "Irem Sarl",
  copyrightNotice:
    "Tous les droits relatifs à cette société appartiennent à Irem Sarl.",
};

const SERVICE_CATEGORIES = [
  {
    _id: "svc-cat-prives",
    _type: "serviceCategory",
    title: "Événements Privés",
    slug: slug("evenements-prives"),
    description:
      "Anniversaires, fiançailles, repas de famille ou soirées à célébrer : nous composons des réceptions à l'allure intime et mémorable.",
    icon: "✨",
    order: 1,
  },
  {
    _id: "svc-cat-pro",
    _type: "serviceCategory",
    title: "Rencontres Professionnelles",
    slug: slug("evenements-professionnels"),
    description:
      "Pour vos déjeuners d'affaires, présentations, dîners d'équipe ou temps forts d'entreprise, notre maison offre un cadre qui conjugue distinction et fluidité.",
    icon: "🖋️",
    order: 2,
  },
  {
    _id: "svc-cat-traiteur",
    _type: "serviceCategory",
    title: "Service Traiteur & Chef à Domicile",
    slug: slug("service-traiteur"),
    description:
      "Notre cuisine se déplace avec la même exigence qu'à table : compositions sur mesure, dressages précis et saveurs qui voyagent sans perdre leur âme.",
    icon: "🍽️",
    order: 3,
  },
  {
    _id: "svc-cat-salle",
    _type: "serviceCategory",
    title: "Privatisation du Pressoir",
    slug: slug("location-de-salle"),
    description:
      "Sous les voûtes de notre ancien pressoir, offrez à vos invités un lieu de caractère où la pierre, la lumière et l'accueil racontent déjà une histoire.",
    icon: "🏛️",
    order: 4,
  },
];

const SERVICE_ITEMS = [
  {
    _id: "svc-item-anniversaires",
    _type: "serviceItem",
    title: "Anniversaires et grandes dates",
    description:
      "Des tables pensees pour celebrer avec chaleur, rythme et gourmandise.",
    category: { _type: "reference", _ref: "svc-cat-prives" },
    order: 1,
  },
  {
    _id: "svc-item-mariages",
    _type: "serviceItem",
    title: "Fiançailles et réceptions de mariage",
    description:
      "Une mise en scène raffinée pour accompagner les jours qui comptent vraiment.",
    category: { _type: "reference", _ref: "svc-cat-prives" },
    order: 2,
  },
  {
    _id: "svc-item-famille",
    _type: "serviceItem",
    title: "Retrouvailles familiales",
    description:
      "Des formats souples et accueillants pour réunir plusieurs générations autour d'une même table.",
    category: { _type: "reference", _ref: "svc-cat-prives" },
    order: 3,
  },
  {
    _id: "svc-item-intimes",
    _type: "serviceItem",
    title: "Célébrations intimistes",
    description:
      "Un cadre soigné pour les moments qui gagnent à rester précieux et proches.",
    category: { _type: "reference", _ref: "svc-cat-prives" },
    order: 4,
  },
  {
    _id: "svc-item-business-lunch",
    _type: "serviceItem",
    title: "Déjeuners et dîners d'affaires",
    description:
      "Une table nette, accueillante et parfaitement cadencée pour vos rendez-vous décisifs.",
    category: { _type: "reference", _ref: "svc-cat-pro" },
    order: 1,
  },
  {
    _id: "svc-item-launch",
    _type: "serviceItem",
    title: "Lancements et présentations",
    description:
      "Un service qui accompagne vos annonces avec tenue, clarté et sens du détail.",
    category: { _type: "reference", _ref: "svc-cat-pro" },
    order: 2,
  },
  {
    _id: "svc-item-networking",
    _type: "serviceItem",
    title: "Cocktails et soirées de networking",
    description:
      "Des formats vivants qui favorisent les échanges sans sacrifier l'élégance.",
    category: { _type: "reference", _ref: "svc-cat-pro" },
    order: 3,
  },
  {
    _id: "svc-item-year-end",
    _type: "serviceItem",
    title: "Fêtes de fin d'année",
    description:
      "Une parenthèse festive pour conclure l'année autour d'une cuisine généreuse.",
    category: { _type: "reference", _ref: "svc-cat-pro" },
    order: 4,
  },
  {
    _id: "svc-item-mezzes",
    _type: "serviceItem",
    title: "Mezzés et pièces à partager",
    description:
      "Une entrée en matière conviviale, pensée pour les buffets et les réceptions debout.",
    category: { _type: "reference", _ref: "svc-cat-traiteur" },
    order: 1,
  },
  {
    _id: "svc-item-buffets",
    _type: "serviceItem",
    title: "Buffets du Levant",
    description:
      "Des lignes de service généreuses, riches en couleurs et en parfums.",
    category: { _type: "reference", _ref: "svc-cat-traiteur" },
    order: 2,
  },
  {
    _id: "svc-item-diners",
    _type: "serviceItem",
    title: "Dîners assis et prestations sur mesure",
    description:
      "Une proposition composée selon votre rythme, votre lieu et vos convives.",
    category: { _type: "reference", _ref: "svc-cat-traiteur" },
    order: 3,
  },
  {
    _id: "svc-item-chef",
    _type: "serviceItem",
    title: "Chef à domicile",
    description:
      "L'expérience du Pressoir portée chez vous avec soin, élégance et maîtrise.",
    category: { _type: "reference", _ref: "svc-cat-traiteur" },
    order: 4,
  },
];

const ADDITIONAL_SERVICES = [
  {
    _id: "svc-add-music",
    _type: "additionalService",
    title: "Direction musicale",
    description:
      "DJ, musiciens live ou ambiance sonore sur mesure pour donner le ton juste à la réception.",
    order: 1,
  },
  {
    _id: "svc-add-photo",
    _type: "additionalService",
    title: "Photo et vidéo",
    description:
      "Des partenaires choisis pour capter l'atmosphère sans jamais l'alourdir.",
    order: 2,
  },
  {
    _id: "svc-add-floral",
    _type: "additionalService",
    title: "Décoration florale",
    description:
      "Compositions et détails de table pensés pour prolonger votre intention jusque dans la matière.",
    order: 3,
  },
  {
    _id: "svc-add-menu",
    _type: "additionalService",
    title: "Création de menu sur mesure",
    description:
      "Un menu composé en fonction de votre événement, de vos envies et du rythme du service.",
    order: 4,
  },
];

const VENUE_INFO = {
  _id: "venue-info",
  _type: "venueInfo",
  capacity: 60,
  features: [
    "Un lieu de caractère sous des voûtes de pierre",
    "Jusqu'à 60 convives assis dans une atmosphère chaleureuse",
    "Configuration de table adaptable selon le format de votre réception",
    "Service attentif, cuisine sur mesure et ambiance travaillée dans le moindre détail",
  ],
  images: [],
};

const MENU_CATEGORY_DESCRIPTIONS = {
  salades:
    "Des assiettes fraîches et lumineuses, entre crudités croquantes, herbes vives et équilibre méditerranéen.",
  burgers:
    "Des burgers composés comme des assiettes complètes : pain moelleux, garnitures franches et sauces bien pensées.",
  pizzas:
    "Nos pizzas maison jouent les classiques et les voyages, avec une pâte dorée et des garnitures généreuses.",
  assiettes:
    "Des plats complets, copieux et précis, accompagnés de leurs garnitures signature.",
  pide:
    "La grande spécialité du four : de longues pides dorées aux parfums du Levant et d'Anatolie.",
  shawarmas:
    "Des galettes généreuses, viande ou falafel, roulées minute avec sauces et crudités.",
  tacos:
    "Des tacos gratinés, gourmands et bien construits, pour les faims franches.",
  box:
    "L'essentiel du Pressoir dans un format généreux à savourer sur le pouce ou sans se presser.",
  crepes:
    "Des crêpes sucrées ou salées, à la fois simples, gourmandes et toujours réconfortantes.",
  "aperitifs-cocktails":
    "Spritz, cocktails et spiritueux pour ouvrir le repas avec éclat ou prolonger la soirée avec mesure.",
  bieres:
    "Bières pression, blondes et sans alcool : une sélection fraîche pour accompagner toute la carte.",
  vins:
    "Blancs, rouges et roses choisis pour leur justesse et leur conversation naturelle avec nos assiettes.",
  "boissons-fraiches":
    "Sodas, eaux, thés glacés et boissons de table servis bien frais, selon l'instant et l'envie.",
  "cafes-chocolats-the":
    "Cafés, chocolats et thés pour conclure le repas, ralentir le rythme ou prolonger la conversation.",
};

const MENU_ITEM_OVERRIDES = {
  abricotine:
    "Eau-de-vie d'abricot au fruit éclatant, servie en 2cl pour une fin de repas nette et lumineuse.",
  "aperol-spritz":
    "L'amertume solaire de l'Aperol allongée de bulles vives, pour un apéritif léger et lumineux.",
  martini:
    "Apéritif italien aux notes herbacées, servi en 4cl pour ouvrir le palais avec élégance.",
  morito:
    "Notre version maison du grand classique, entre menthe fraîche, citron vert et fraîcheur désaltérante.",
  "pina-colada":
    "Un accord velouté de coco et d'ananas aux accents de vacances prolongées.",
  vodka:
    "Servie en 4cl, une vodka nette et cristalline pour les amateurs de franchise.",
  "vodka-red-bull":
    "Alliance énergique et franche, servie bien fraîche pour les soirées qui s'étirent.",
  whiskey:
    "Servi en 2cl, aux notes boisées et chaleureuses, pour une finale plus ample.",
  "whiskey-cola":
    "L'accord simple et efficace entre la rondeur du whiskey et la fraîcheur épicée du cola.",
  "le-pressoir-cocktail":
    "Le cocktail signature de la maison, pensé comme une parenthèse fraîche, fruitée et subtilement orientale.",
  "bilz-panache":
    "Panaché léger et désaltérant, servi bien frais en 33cl.",
  "canette-alcool":
    "Sélection de canettes 50cl selon disponibilité : Heineken, Feldschlösschen, Desperados ou Superbock.",
  "corona-extra":
    "La légèreté solaire de Corona, servie bien fraîche en 33cl.",
  desperados:
    "Bière blonde au caractère vif, servie bien fraîche en 25cl.",
  "feldschlosschen-blanche":
    "Bière à pression aux notes douces et légèrement épicées. Disponible en 20cl, 30cl ou 50cl.",
  "feldschlosschen-original":
    "Bière à pression droite et rafraîchissante. Disponible en 20cl, 30cl ou 50cl.",
  "heineken-25":
    "Le grand classique blond, servi bien frais en 25cl.",
  "heineken-50":
    "Le grand classique blond, servi bien frais en 50cl.",
  sagres:
    "Blonde portugaise au profil net et léger, servie fraîche en 25cl.",
  "super-bock":
    "Bière portugaise blonde, équilibrée et désaltérante, servie en 25cl.",
  "valaisanne-sans-alcool":
    "Toute la fraîcheur d'une blonde sans alcool, servie en 33cl.",
  "arkina-100":
    "Eau minérale Arkina, pétillante ou plate, servie fraîche en 100cl.",
  "arkina-35":
    "Eau minérale Arkina, pétillante ou plate, servie fraîche en 35cl.",
  ayran:
    "Boisson lactée salée, fraîche et légère, idéale avec nos spécialités du Levant.",
  citron:
    "Une boisson citronnée vive et rafraîchissante, servie bien fraîche en 50cl.",
  "coca-cola-cherry":
    "Le classique cola relevé d'une note de cerise, en canette 33cl.",
  "coca-cola":
    "Le cola emblématique, servi bien frais en canette 33cl.",
  "coca-cola-zero":
    "Toute la fraîcheur du cola sans sucre, servie en verre 33cl.",
  fusetea:
    "Thé glacé aux accents citronnelle ou pêche-hibiscus, en canette 33cl.",
  "fanta-orange":
    "Une orange vive et pétillante, en canette 33cl.",
  oasis:
    "Une parenthèse fruitée et désaltérante, servie fraîche en 33cl.",
  "red-bull":
    "Boisson énergisante servie bien fraîche en 25cl.",
  "san-benedetto":
    "Eau San Benedetto, pétillante ou plate, servie fraîche en 50cl.",
  sprite:
    "Fraîcheur citron-lime pétillante, en canette 33cl.",
  "tonic-water":
    "Une amertume élégante et désaltérante, servie fraîche en 20cl.",
  valser:
    "Eau Valser, pétillante ou plate, servie fraîche en 50cl.",
  cafe:
    "Un café court et équilibré, pour conclure le repas avec précision.",
  cappuccino:
    "Espresso velouté coiffé d'une mousse légère, tout en douceur.",
  "chocolat-chaud":
    "Une tasse enveloppante au cacao généreux, idéale pour les instants lents.",
  "chocolat-froid":
    "Le plaisir du cacao dans une version fraîche et soyeuse.",
  espresso:
    "Court, intense et droit, pour les amateurs d'arômes francs.",
  "indian-chai":
    "Thé épicé aux accents chaleureux, inspiré des grandes tables d'Orient.",
  "latte-macchiato":
    "Lait onctueux et espresso délicat dans une tasse tout en rondeur.",
  "matcha-cappuccino":
    "L'équilibre singulier du matcha et d'une mousse lactée aérienne.",
  renverse:
    "Un café plus lacté, tout en douceur, pour une pause délicate.",
  "the-en-sachet":
    "Choisissez votre infusion du moment pour une pause simple et parfumée.",
  "the-marocain":
    "Atay à la menthe, servi comme une invitation à la convivialité.",
  "vanille-matcha-latte":
    "La douceur de la vanille rencontre la profondeur végétale du matcha.",
};

function buildWineDescription(item) {
  const suffixes = [
    "Un blanc choisi pour sa fraîcheur, sa tension et sa précision à table",
    "Un rouge sélectionné pour sa structure souple et sa belle présence en bouche",
    "Une cuvée délicate et lumineuse, idéale à l'apéritif ou sur les assiettes les plus fraîches",
    "Une bouteille choisie pour accompagner la carte avec équilibre",
  ];

  let raw = (item.description || "").trim().replace(/\.$/, "");
  let changed = true;
  while (changed) {
    changed = false;
    for (const suffix of suffixes) {
      const next = raw
        .replace(new RegExp(`(?:\\.\\s*)?${escapeRegExp(suffix)}$`), "")
        .trim();
      if (next !== raw) {
        raw = next;
        changed = true;
      }
    }
  }

  if (!raw) {
    return "Une cuvée choisie pour accompagner la carte avec justesse et longueur.";
  }

  if (raw.startsWith("Blanc")) {
    return `${raw}. Un blanc choisi pour sa fraîcheur, sa tension et sa précision à table.`;
  }
  if (raw.startsWith("Rouge")) {
    return `${raw}. Un rouge sélectionné pour sa structure souple et sa belle présence en bouche.`;
  }
  if (raw.startsWith("Rosé") || raw.startsWith("Rose")) {
    return `${raw}. Une cuvée délicate et lumineuse, idéale à l'apéritif ou sur les assiettes les plus fraîches.`;
  }

  return `${raw}. Une bouteille choisie pour accompagner la carte avec équilibre.`;
}

function getMenuDescription(item) {
  const categorySlug = item.category?.slug || "";

  if (MENU_ITEM_OVERRIDES[item.slug]) {
    return MENU_ITEM_OVERRIDES[item.slug];
  }

  if (categorySlug === "vins") {
    return buildWineDescription(item);
  }

  return item.description;
}

async function upsertDocuments(documents) {
  if (documents.length === 0) return;

  const transaction = client.transaction();
  for (const document of documents) {
    transaction.createOrReplace(document);
  }

  await transaction.commit();
}

async function syncPages() {
  await upsertDocuments(PAGE_DOCS);
  return PAGE_DOCS.length;
}

async function syncRestaurantInfo() {
  await client.createOrReplace(RESTAURANT_INFO);
  return 1;
}

async function syncServices() {
  await upsertDocuments(SERVICE_CATEGORIES);
  await upsertDocuments(SERVICE_ITEMS);
  await upsertDocuments(ADDITIONAL_SERVICES);
  await client.createOrReplace(VENUE_INFO);

  return {
    categories: SERVICE_CATEGORIES.length,
    items: SERVICE_ITEMS.length,
    additional: ADDITIONAL_SERVICES.length,
    venue: 1,
  };
}

async function syncMenuCopy() {
  const menuCategories = await client.fetch(
    `*[_type == "menuCategory"]{_id, "slug": slug.current, description}`
  );
  let patchedCategories = 0;
  const categoryTransaction = client.transaction();

  for (const category of menuCategories) {
    const description = MENU_CATEGORY_DESCRIPTIONS[category.slug];
    if (!description || category.description === description) continue;

    categoryTransaction.patch(category._id, (patch) => patch.set({ description }));
    patchedCategories += 1;
  }

  if (patchedCategories > 0) {
    await categoryTransaction.commit();
  }

  const menuItems = await client.fetch(
    `*[_type == "menuItem"]{
      _id,
      name,
      description,
      "slug": slug.current,
      category->{ "slug": slug.current }
    }`
  );

  let patchedItems = 0;
  const itemTransaction = client.transaction();
  for (const item of menuItems) {
    const description = getMenuDescription(item);
    if (!description || description === item.description) continue;

    itemTransaction.patch(item._id, (patch) => patch.set({ description }));
    patchedItems += 1;
  }

  if (patchedItems > 0) {
    await itemTransaction.commit();
  }

  return { categories: patchedCategories, items: patchedItems };
}

async function main() {
  console.log("Syncing editorial copy to Sanity...");

  const pages = await syncPages();
  const restaurantInfo = await syncRestaurantInfo();
  const services = await syncServices();
  const menu = await syncMenuCopy();

  console.log(`Pages synced: ${pages}`);
  console.log(`Restaurant info synced: ${restaurantInfo}`);
  console.log(`Service categories synced: ${services.categories}`);
  console.log(`Service items synced: ${services.items}`);
  console.log(`Additional services synced: ${services.additional}`);
  console.log(`Venue docs synced: ${services.venue}`);
  console.log(`Menu categories patched: ${menu.categories}`);
  console.log(`Menu items patched: ${menu.items}`);
  console.log("Sanity sync complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
