import { expect, test } from "@playwright/test";

test("volunteer form: consent is required, then submission succeeds", async ({ page }) => {
  await page.goto("/en/get-involved");
  const form = page.locator("form").filter({ has: page.getByRole("button", { name: "Sign up to volunteer" }) });
  await form.getByLabel("Full name").fill("Jane Chebet");
  await form.getByLabel("Mobile number").fill("0712345678");
  await form.getByLabel("Your ward").selectOption("chemagel");
  await form.getByLabel("Events").check();
  await expect(form.getByRole("checkbox", { name: /I agree/ })).not.toBeChecked();
  await form.getByRole("button", { name: "Sign up to volunteer" }).click();
  await expect(form.getByText("Please tick the box to give consent.")).toBeVisible();
  await form.getByRole("checkbox", { name: /I agree/ }).check();
  await form.getByRole("button", { name: "Sign up to volunteer" }).click();
  await expect(form.getByText(/Thank you\. The campaign will contact you/)).toBeVisible();
});

test("contact form shows Kenyan phone validation in Kiswahili", async ({ page }) => {
  await page.goto("/sw/contact");
  await page.getByLabel("Nambari ya simu").fill("123");
  await page.getByRole("button", { name: "Tuma ujumbe" }).click();
  await expect(page.getByText(/nambari ya simu ya Kenya/)).toBeVisible();
});

test("projects filters live in the URL", async ({ page }) => {
  await page.goto("/en/projects");
  await page.getByLabel("Sector").selectOption("water");
  await expect(page).toHaveURL(/\?sector=water/);
});

test("map: selecting a ward updates the panel", async ({ page }) => {
  await page.goto("/en/map");
  await page.getByRole("button", { name: /Rongena/ }).click();
  await expect(page.locator("aside")).toContainText("12,034");
});

test("SEO: hreflang, OG image, sitemap, JSON-LD", async ({ page, request }) => {
  await page.goto("/en");
  await expect(page.locator('link[rel="alternate"][hreflang="sw-KE"]')).toHaveAttribute("href", /\/sw$/);
  expect(await page.locator('script[type="application/ld+json"]').textContent()).toContain('"@type":"Person"');
  const og = await page.locator('meta[property="og:image"]').first().getAttribute("content");
  expect(og).toBeTruthy();
  expect((await request.get(new URL(og!).pathname)).headers()["content-type"]).toContain("image/png");
  expect(await (await request.get("/sitemap.xml")).text()).toContain("/sw/wards/kapletundo");
});
