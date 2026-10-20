import fs from "node:fs";
import path from "node:path";

import { expect, test } from "./fixtures";

// Newest post with at least two markdown images, so the test doesn't depend
// on one specific post existing or keeping its images.
function findPostWithImages() {
  const dir = path.join(process.cwd(), "data", "posts");
  const file = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .sort()
    .reverse()
    .find(
      (f) =>
        (fs.readFileSync(path.join(dir, f), "utf8").match(/!\[[^\]]*\]\(\//g)
          ?.length ?? 0) >= 2,
    );
  if (!file) throw new Error("No post with at least two images found");
  return `/posts/${file.replace(/\.mdx$/, "")}`;
}

test.describe("Image lightbox", () => {
  test("opens a post image in a gallery and closes with Escape", async ({
    page,
  }) => {
    await page.goto(findPostWithImages());

    const buttons = page.getByRole("button", { name: /^Enlarge image/ });
    const total = await buttons.count();
    expect(total).toBeGreaterThanOrEqual(2);

    const target = buttons.nth(1);
    const alt = await target.locator("img").getAttribute("alt");
    await target.click();

    const lightbox = page.locator(".yarl__root");
    await expect(lightbox).toBeVisible();
    await expect(lightbox.locator(".yarl__counter")).toHaveText(
      new RegExp(`^2\\s*/\\s*${total}$`),
    );
    await expect(lightbox.getByText(alt ?? "", { exact: true })).toBeVisible();

    // The enlarged image loads at full quality (inline images use q=75).
    const slideImage = lightbox.locator(".yarl__slide_current img");
    await expect(slideImage).toHaveAttribute("src", /[?&]q=100\b/);
    const srcset = (await slideImage.getAttribute("srcset")) ?? "";
    expect(srcset).not.toMatch(/[?&]q=(?!100\b)/);

    await page.keyboard.press("Escape");
    await expect(lightbox).toBeHidden();
  });
});
