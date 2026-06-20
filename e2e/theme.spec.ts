import { expect, test } from "./fixtures";

test.describe("Theme switch", () => {
  test("toggles dark mode and persists the choice", async ({ page }) => {
    await page.goto("/");

    const html = page.locator("html");
    const wasDark = await html.evaluate((el) => el.classList.contains("dark"));

    await page.getByRole("button", { name: "Toggle theme" }).click();

    // Class flips to the opposite of the initial state.
    if (wasDark) {
      await expect(html).not.toHaveClass(/\bdark\b/);
    } else {
      await expect(html).toHaveClass(/\bdark\b/);
    }

    // Preference persisted under next-themes' storageKey.
    const stored = await page.evaluate(() =>
      localStorage.getItem("nightwind-mode"),
    );
    expect(stored).toBe(wasDark ? "light" : "dark");
  });
});
