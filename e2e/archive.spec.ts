import { test, expect } from "./fixtures";

test.describe("Archive pagination", () => {
  test("advances from page 1 to page 2", async ({ page }) => {
    await page.goto("/archive");
    await expect(
      page.getByRole("heading", { level: 2, name: "Archive" })
    ).toBeVisible();

    const posts = page.locator('article a[href^="/posts/"]');
    await expect(posts.first()).toBeVisible();

    // Two Pagination bars (top + bottom); use the first Next link.
    await page.getByRole("link", { name: /Next/ }).first().click();

    await expect(page).toHaveURL(/\/archive\/page\/2$/);
    await expect(posts.first()).toBeVisible();

    // Previous is now enabled and points back to page 1 (bare basePath).
    await expect(
      page.getByRole("link", { name: /Previous/ }).first()
    ).toHaveAttribute("href", "/archive");
  });
});
