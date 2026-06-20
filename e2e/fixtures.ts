import { expect, test as base } from "@playwright/test";

// Stub the VATSIM status endpoint so E2E never hits the live third-party feed
// (slow, flaky, and its >2MB payload trips Next's data-cache size limit).
export const test = base.extend({
  page: async ({ page }, runTest) => {
    await page.route("**/api/vatsim/online/**", (route) =>
      route.fulfill({
        json: { callsign: null, role: null, roleData: null },
      }),
    );
    await runTest(page);
  },
});

export { expect };
