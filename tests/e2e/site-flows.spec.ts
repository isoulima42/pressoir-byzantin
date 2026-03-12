import { expect, test } from "@playwright/test";

test("main navigation exposes key sections and the events page is scannable", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Desktop-specific navigation test");

  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Le Pressoir Byzantin" })
  ).toBeVisible();

  await page
    .getByLabel("Navigation principale")
    .getByRole("link", { name: "Événements & Traiteur" })
    .click();

  await expect(page).toHaveURL(/\/event-traiteur$/);
  await expect(
    page.getByRole("heading", { name: "Événements & Traiteur" })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Nos espaces" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Demander une proposition" }).first()
  ).toBeVisible();
});

test("mobile navigation opens the menu and reaches the gallery", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "Mobile-specific smoke test");

  await page.goto("/");
  await page.getByRole("button", { name: "Ouvrir le menu" }).click();
  await expect(page.getByRole("dialog", { name: "Navigation mobile" })).toBeVisible();

  await page
    .getByRole("dialog", { name: "Navigation mobile" })
    .getByRole("link", { name: /Galerie/ })
    .click();

  await expect(page).toHaveURL(/\/galerie$/);
  await expect(page.getByRole("heading", { name: "Galerie" })).toBeVisible();
});

test("reservation flow reaches review and handles a mocked submission", async ({
  page,
}) => {
  await page.route("**/api/reservation", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        confirmationId: "PB-TEST-1234",
      }),
    });
  });

  await page.goto("/reservation");

  await page.locator('[data-testid^="date-option-"]').first().click();
  await page.locator('[data-testid^="time-option-"]').first().click();
  await page.getByRole("button", { name: "Continuer" }).click();

  await expect(page.getByText("Combien serez-vous ?")).toBeVisible();
  await page.getByRole("button", { name: "Continuer" }).click();

  await page.getByLabel("Comment devons-nous vous appeler ? *").fill("Jean Test");
  await page.getByLabel("Email *").fill("jean@example.com");
  await page.getByLabel("Téléphone *").fill("+41 79 000 00 00");
  await page.getByRole("button", { name: "Continuer" }).click();

  await expect(page.getByText("Votre demande")).toBeVisible();
  await Promise.all([
    page.waitForURL(/\/reservation\/confirmation\?/),
    page.locator("form").evaluate((form) => {
      (form as HTMLFormElement).requestSubmit();
    }),
  ]);

  await expect(page.getByRole("heading", { name: "Demande bien reçue" })).toBeVisible();
});

test("events CTA pre-fills the contact form", async ({ page }) => {
  await page.goto("/event-traiteur");
  await page.getByRole("link", { name: "Décrire votre projet" }).click();

  await expect(page).toHaveURL(/\/contact\?subject=evenement/);
  await expect(page.getByLabel("Quel est l'objet de votre message ? *")).toHaveValue(
    "evenement"
  );
});
