import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenu")
    .items([
      // Singleton: Restaurant Info
      S.listItem()
        .title("Informations du restaurant")
        .id("restaurantInfo")
        .child(
          S.document()
            .schemaType("restaurantInfo")
            .documentId("restaurantInfo")
            .title("Informations du restaurant"),
        ),

      S.divider(),

      // Menu
      S.listItem()
        .title("Menu")
        .child(
          S.list()
            .title("Menu")
            .items([
              S.documentTypeListItem("menuCategory").title("Catégories"),
              S.documentTypeListItem("menuItem").title("Plats"),
            ]),
        ),

      S.divider(),

      // Reservations
      S.listItem()
        .title("Réservations")
        .child(
          S.list()
            .title("Réservations")
            .items([
              S.listItem()
                .title("Paramètres")
                .id("reservationSettings")
                .child(
                  S.document()
                    .schemaType("reservationSettings")
                    .documentId("reservationSettings")
                    .title("Paramètres de réservation"),
                ),
              S.documentTypeListItem("reservation").title("Réservations"),
            ]),
        ),

      S.divider(),

      // Event & Traiteur
      S.listItem()
        .title("Event & Traiteur")
        .child(
          S.list()
            .title("Event & Traiteur")
            .items([
              S.documentTypeListItem("serviceCategory").title("Catégories de prestations"),
              S.documentTypeListItem("serviceItem").title("Prestations"),
              S.listItem()
                .title("Notre Salle")
                .id("venueInfo")
                .child(
                  S.document()
                    .schemaType("venueInfo")
                    .documentId("venueInfo")
                    .title("Notre Salle"),
                ),
              S.documentTypeListItem("additionalService").title("Services supplémentaires"),
            ]),
        ),

      S.divider(),

      // Content
      S.documentTypeListItem("page").title("Pages"),
      S.documentTypeListItem("gallery").title("Galerie"),
      S.documentTypeListItem("teamMember").title("Équipe"),
    ]);
