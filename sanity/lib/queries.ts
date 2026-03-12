import { client } from "./client";

// --- Menu ---

export async function getMenuCategories(menuType?: "food" | "drink") {
  if (menuType) {
    return client.fetch(
      `*[_type == "menuCategory" && menuType == $menuType] | order(order asc) {
        _id, name, slug, description, order, menuType
      }`,
      { menuType },
    );
  }
  return client.fetch(
    `*[_type == "menuCategory"] | order(order asc) {
      _id, name, slug, description, order, menuType
    }`,
  );
}

export async function getMenuItemsByType(menuType: "food" | "drink") {
  return client.fetch(
    `*[_type == "menuItem" && available == true && category->menuType == $menuType] | order(category->order asc, name asc) {
      _id, name, slug, description, price, image, available, allergens, tags, extras,
      category->{ _id, name, slug }
    }`,
    { menuType },
  );
}

export async function getAllMenuItems() {
  return client.fetch(
    `*[_type == "menuItem" && available == true] | order(category->order asc, name asc) {
      _id, name, slug, description, price, image, available, allergens, tags, extras,
      category->{ _id, name, slug }
    }`,
  );
}

export async function getMenuItemBySlug(slug: string) {
  return client.fetch(
    `*[_type == "menuItem" && slug.current == $slug][0] {
      _id, name, slug, description, price, image, available, allergens, tags, extras,
      category->{ _id, name, slug }
    }`,
    { slug },
  );
}

// --- Pages ---

export async function getPageBySlug(slug: string) {
  return client.fetch(
    `*[_type == "page" && slug.current == $slug][0] {
      _id, title, slug, heroImage, content, seo
    }`,
    { slug },
  );
}

export async function getAllPages() {
  return client.fetch(
    `*[_type == "page"] | order(title asc) {
      _id, title, slug, seo
    }`,
  );
}

// --- Restaurant Info (singleton) ---

export async function getRestaurantInfo() {
  return client.fetch(
    `*[_type == "restaurantInfo"][0] {
      _id, name, address, phone, email, logo, hours, socialLinks,
      mapsEmbed, legalEntity, copyrightNotice
    }`,
  );
}

// --- Event & Traiteur ---

export async function getServiceCategories() {
  return client.fetch(
    `*[_type == "serviceCategory"] | order(order asc) {
      _id, title, slug, description, icon, image, order
    }`,
  );
}

export async function getServiceItems() {
  return client.fetch(
    `*[_type == "serviceItem"] | order(order asc) {
      _id, title, description, order,
      category->{ _id, title, slug }
    }`,
  );
}

export async function getVenueInfo() {
  return client.fetch(
    `*[_type == "venueInfo"][0] {
      capacity, features, images
    }`,
  );
}

export async function getAdditionalServices() {
  return client.fetch(
    `*[_type == "additionalService"] | order(order asc) {
      _id, title, description, order
    }`,
  );
}

// --- Gallery ---

export async function getGallery() {
  return client.fetch(
    `*[_type == "gallery"] | order(order asc) {
      _id, title, image, order
    }`,
  );
}

// --- Team ---

export async function getTeamMembers() {
  return client.fetch(
    `*[_type == "teamMember"] | order(order asc) {
      _id, name, role, photo, bio, order
    }`,
  );
}

// --- Reservations ---

export async function getReservationSettings() {
  return client.fetch(
    `*[_type == "reservationSettings"][0] {
      maxGuestsPerSlot, slotDuration, serviceHours, closedDays,
      advanceBookingDays, minAdvanceHours
    }`,
  );
}

export async function getReservationsForDate(date: string) {
  return client.fetch(
    `*[_type == "reservation" && date == $date && status != "cancelled"] {
      _id, time, guests
    }`,
    { date },
  );
}
