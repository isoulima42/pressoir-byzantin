export const RESTAURANT = {
  name: "Le Pressoir Byzantin",
  description:
    "L'élégance de la Méditerranée, l'âme de l'Orient. Niché au cœur de Villeneuve, Le Pressoir Byzantin est une invitation au voyage.",
  address: "Grand Rue 29, 1844 Villeneuve",
  phone: "079 659 41 52",
  phoneHref: "tel:+41796594152",
  email: "info@lepressoirbyzantin.ch",
  emailHref: "mailto:info@lepressoirbyzantin.ch",
  url: "https://lepressoirbyzantin.ch",
  hours: {
    weekdays: { label: "Lundi – Jeudi", time: "10h00 – 23h30" },
    weekend: { label: "Vendredi – Dimanche", time: "10h00 – 22h30" },
  },
  social: {
    instagram: "https://instagram.com/lepressoirbyzantin",
    tiktok: "https://tiktok.com/@lepressoirbyzantin",
  },
  legal: {
    entity: "Irem Sarl",
    copyright: `© ${new Date().getFullYear()} L'usine Web`,
    notice:
      "Tous les droits relatifs à cette société appartiennent à Irem Sarl.",
  },
  mapsQuery: "Grand Rue 29 1844 Villeneuve",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Grand%20Rue%2029%201844%20Villeneuve",
  mapsEmbed:
    "https://maps.google.com/maps?q=Grand%20Rue%2029%201844%20Villeneuve&t=m&z=15&output=embed&iwloc=near",
  responseSla: "Réponse sous 24h",
} as const;

export const PRIMARY_NAV_LINKS = [
  { label: "Notre carte", href: "/carte-des-mets" },
  { label: "Boissons", href: "/carte-des-boissons" },
  { label: "Événements & Traiteur", href: "/event-traiteur" },
  { label: "Galerie", href: "/galerie" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
] as const;

export const SECONDARY_NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Réservation", href: "/reservation" },
] as const;

export const NAV_LINKS = [
  ...SECONDARY_NAV_LINKS,
  ...PRIMARY_NAV_LINKS,
] as const;

export function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export const MENU_ITEMS = [
  {
    slug: "box-shawarma",
    name: "Box Shawarma",
    price: 14,
    description: "Émincé généreux de viandes marinées aux épices douces, accompagné de son méli-mélo de légumes croquants et de nos sauces signatures.",
    image: "/images/food/box-kebab.png",
  },
  {
    slug: "byzantinne",
    name: "Byzantine",
    price: 21,
    description:
      "Un alliage subtil de poulet rôti et d'agneau finement tranché, sublimé par la douceur des poivrons confits et le parfum enivrant de l'origan frais.",
    image: "/images/food/pizza-kebab.png",
  },
  {
    slug: "chevremiel",
    name: "Chèvre-miel",
    price: 17.5,
    description: "L'équilibre parfait entre le caractère corsé du fromage de chèvre et la douceur ambrée du miel, couronné de basilic ciselé.",
    image: "/images/food/chevre-miel.png",
  },
  {
    slug: "la-tonnata",
    name: "La tonnata",
    price: 17.5,
    description: "Une rencontre méditerranéenne entre la fondante mozzarella, le thon délicat, les olives noires croquantes et le parfum de l'origan sauvage.",
    image: "/images/food/latonatta.png",
  },
  {
    slug: "nordique",
    name: "Nordique",
    price: 19.5,
    description: "Une escapade fraîche mêlant crème onctueuse, fines tranches de saumon fumé d'exception et la rondeur des pommes de terre rôties.",
    image: "/images/food/Nordique.png",
  },
  {
    slug: "nutella",
    name: "Nutella",
    price: 14.5,
    description: "L'indulgence absolue : pâte croustillante nappée de l'authentique pâte à tartiner et délicatement parsemée d'éclats de noix croquantes.",
    image: "/images/food/nutella.png",
  },
  {
    slug: "romaine",
    name: "Romaine",
    price: 18.5,
    description: "L'intemporel classique italien revisité avec notre sauce tomate à l'ancienne, jambon délicat, champignons frais et notre fromage parfumé.",
    image: "/images/food/romaine.png",
  },
  {
    slug: "tartiflette",
    name: "Tartiflette",
    price: 18.5,
    description: "Une pizza réconfortante et généreuse mariant l'intensité de la crème fraîche double, la générosité des lardons fumés et des oignons rissolés.",
    image: "/images/food/Tartiflette.png",
  },
  {
    slug: "tunisienne",
    name: "Tunisienne",
    price: 18.5,
    description: "Voyagez vers le sud avec la chaleur des épices orientales et le caractère corsé des véritables merguez de boeuf fondantes.",
    image: "/images/food/tunnisien.png",
  },
] as const;
