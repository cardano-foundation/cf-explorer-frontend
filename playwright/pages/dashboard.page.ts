import { expect, Page } from "@playwright/test";

import { assert } from "../helpers/assert";

export function dashboard(page: Page) {
  const accountButton = page.locator('button[class="MuiButtonBase-root css-1pht75n"]');
  const adaPriceBox = page.getByTestId("ada-price-box");
  const marketCap = page.getByTestId("market-cap-box");
  const epochBox = page.getByTestId("current-epoch-box");
  const liveStakeBox = page.getByTestId("live-stake-box");
  const blockchainMenu = page.getByTestId("menu-button-blockchain");
  const blocksSection = page.getByTestId("submenu-button-blocks");
  const epochsSection = page.getByTestId("submenu-button-epochs");
  const goTo = async () => {
    await page.goto("/");
  };

  const openBlocksSection = async () => {
    await blockchainMenu.click();
    await blocksSection.click();
  };

  const openEpochsSection = async () => {
    await blockchainMenu.click();
    await epochsSection.click();
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
    openBlocksSection,
    openEpochsSection,
    goTo
  };
}
