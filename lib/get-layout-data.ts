import { getRestaurantInfo } from "@/sanity/lib/queries";
import { RESTAURANT } from "@/lib/constants";

export async function getLayoutData() {
  const info = await getRestaurantInfo().catch(() => null);

  return {
    name: info?.name ?? RESTAURANT.name,
    address: info?.address ?? RESTAURANT.address,
    phone: info?.phone ?? RESTAURANT.phone,
    email: info?.email ?? RESTAURANT.email,
    mapsEmbed: info?.mapsEmbed ?? RESTAURANT.mapsEmbed,
    legalEntity: info?.legalEntity ?? RESTAURANT.legal.entity,
    copyrightNotice: info?.copyrightNotice ?? RESTAURANT.legal.notice,
    hours: info?.hours?.length
      ? info.hours
      : [
          { days: RESTAURANT.hours.weekdays.label, openTime: "10h00", closeTime: "23h30" },
          { days: RESTAURANT.hours.weekend.label, openTime: "10h00", closeTime: "22h30" },
        ],
    socialLinks: info?.socialLinks?.length
      ? info.socialLinks
      : [
          { platform: "instagram", url: RESTAURANT.social.instagram },
          { platform: "tiktok", url: RESTAURANT.social.tiktok },
        ],
  };
}
