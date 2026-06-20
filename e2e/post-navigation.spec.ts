import { expect, test } from "./fixtures";

test.describe("Home → post detail", () => {
  test("navigates from a home post card to the post page", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { level: 2, name: /Hello there/ }),
    ).toBeVisible();

    // First post card link in the "Latest posts" grid.
    const firstPostLink = page.locator('article a[href^="/posts/"]').first();
    const href = await firstPostLink.getAttribute("href");
    expect(href).toBeTruthy();

    await firstPostLink.click();
    await expect(page).toHaveURL(new RegExp(`${href}$`));

    // The post title renders as the Layout <h2>; proves the async Server
    // Component rendered (the gap unit tests can't cover).
    await expect(page.getByRole("heading", { level: 2 })).toBeVisible();
  });
});
