import { expect, Page } from "@playwright/test";

import { assert } from "../helpers/assert";

export function dashboard(page: Page) {
  const accountButton = page.locator('button[class="MuiButtonBase-root css-1pht75n"]');
  const adaPriceBox = page.getByTestId("ada-price-box");
  const marketCap = page.getByTestId("market-cap-box");
  const epochBox = page.getByTestId("current-epoch-box");
  const liveStakeBox = page.getByTestId("live-stake-box");
  const goTo = async () => {
    await page.goto("/");
  };

  const assertItLoads = async () => {
    await assert(page).pageTitle("Cardano Blockchain Explorer");
    await expect(adaPriceBox).toBeVisible();
    await expect(marketCap).toBeVisible();
    await expect(epochBox).toBeVisible();
    await expect(liveStakeBox).toBeVisible();
  };

  const assertUserLoggedIn = async (userAccount: string) => {
    const userAccountName = await accountButton.textContent();
    expect(userAccount).toContain(userAccountName?.trim());
  };

  return {
    assertUserLoggedIn,
    assertItLoads,
    goTo
  };
}
