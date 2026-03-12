import { getRestaurantInfo, getAllMenuItems, getPageBySlug } from "@/sanity/lib/queries";
import { RESTAURANT, MENU_ITEMS } from "@/lib/constants";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import SignatureDishes from "@/components/SignatureDishes";
import VilleneuveSection from "@/components/VilleneuveSection";
import GoldBanner from "@/components/GoldBanner";
import HoursLocation from "@/components/HoursLocation";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/ui/SectionDivider";
import JsonLd from "@/components/JsonLd";
import { restaurantJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";

export default async function Home() {
  const [info, menuItems, homePage] = await Promise.all([
    getRestaurantInfo().catch(() => null),
    getAllMenuItems().catch(() => null),
    getPageBySlug("accueil").catch(() => null),
  ]);

  // Restaurant info with fallback
  const name = info?.name ?? RESTAURANT.name;
  const address = info?.address ?? RESTAURANT.address;
  const phone = info?.phone ?? RESTAURANT.phone;
  const email = info?.email ?? RESTAURANT.email;
  const mapsEmbed = info?.mapsEmbed ?? RESTAURANT.mapsEmbed;
  const legalEntity = info?.legalEntity ?? RESTAURANT.legal.entity;
  const copyrightNotice = info?.copyrightNotice ?? RESTAURANT.legal.notice;

  const hours = info?.hours?.length
    ? info.hours
    : [
      { days: RESTAURANT.hours.weekdays.label, openTime: "10h00", closeTime: "23h30" },
      { days: RESTAURANT.hours.weekend.label, openTime: "10h00", closeTime: "22h30" },
    ];

  const socialLinks = info?.socialLinks?.length
    ? info.socialLinks
    : [
      { platform: "instagram", url: RESTAURANT.social.instagram },
      { platform: "tiktok", url: RESTAURANT.social.tiktok },
    ];

  // Menu items — pick 3 signatures
  const signatureDishes = menuItems?.length
    ? menuItems.slice(0, 3)
    : MENU_ITEMS.slice(0, 3).map((item) => ({
      name: item.name,
      slug: item.slug,
      description: item.description,
      price: item.price,
      image: item.image,
    }));

  // Page content with fallback
  const tagline =
    homePage?.seo?.metaDescription ??
    "L'élégance de la Méditerranée, l'âme de l'Orient.";

  const philosophyTitle =
    "La table comme passeport";
  const philosophyText =
    "Sous les voûtes du Pressoir Byzantin, la cuisine fait dialoguer braise, pâte dorée, herbes fraîches et hospitalité franche. Ici, le fait maison n'est pas un argument: c'est une manière d'accueillir, de prendre le temps et de faire voyager sans détour.";

  return (
    <>
      <JsonLd data={restaurantJsonLd({ name, address, phone, email, hours })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Accueil", url: "/" }])} />
      <Header />
      <main id="main-content">
        <Hero name={name} tagline={tagline} />
        <Philosophy title={philosophyTitle} text={philosophyText} />
        <SignatureDishes dishes={signatureDishes} />
        <VilleneuveSection />
        <GoldBanner />
        <SectionDivider variant="simple" className="bg-brand-dark py-4" />
        <HoursLocation
          address={address}
          phone={phone}
          email={email}
          hours={hours}
          mapsEmbed={mapsEmbed}
        />
      </main>
      <Footer
        name={name}
        hours={hours}
        socialLinks={socialLinks}
        legalEntity={legalEntity}
        copyrightNotice={copyrightNotice}
      />
    </>
  );
}
