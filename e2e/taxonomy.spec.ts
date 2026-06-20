import { test, expect } from "./fixtures";

test.describe("Tag and category pages", () => {
  test("tag index links through to a filtered list", async ({ page }) => {
    await page.goto("/tags");
    await expect(
      page.getByRole("heading", { level: 2, name: "Tags" })
    ).toBeVisible();

    await page.locator('a[href^="/tags/"]').first().click();

    await expect(page).toHaveURL(/\/tags\/.+/);
    await expect(
      page.getByRole("heading", { level: 2, name: /^Tagged:/ })
    ).toBeVisible();
    await expect(
      page.locator('article a[href^="/posts/"]').first()
    ).toBeVisible();
  });

  test("category index links through to a filtered list", async ({ page }) => {
    await page.goto("/category");
    await expect(
      page.getByRole("heading", { level: 2, name: "Categories" })
    ).toBeVisible();

    await page.locator('a[href^="/category/"]').first().click();

    await expect(page).toHaveURL(/\/category\/.+/);
    await expect(
      page.getByRole("heading", { level: 2, name: /^Category:/ })
    ).toBeVisible();
    await expect(
      page.locator('article a[href^="/posts/"]').first()
    ).toBeVisible();
  });
});
