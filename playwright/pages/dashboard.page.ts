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
  const transactionChart = page.getByTestId("home-trending");
  const poolsSection = page.getByTestId("home-top-delegation");
  const latestStories = page.getByTestId("home-latest-stories");
  const searchBar = page.locator('div[data-testid="search-bar"] input');
  const searchButton = page.locator('div[data-testid="search-bar"] + button[type="submit"]');
  const searchFilters = page.getByTestId("all-filters-dropdown");
  const filterOptions = page.getByTestId("filter-options");
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

  const assertDashboardInfoCards = async () => {
    await assert(page).pageTitle("Cardano Blockchain Explorer");
    await expect(adaPriceBox, "Info card with current Ada price should be visible").toBeVisible();
    await expect(marketCap, "Info card with market cap should be visible").toBeVisible();
    await expect(epochBox, "Info card with current epoch info should be displayed").toBeVisible();
    await expect(liveStakeBox, "Info card with current Live stake progression data should be displayed").toBeVisible();
  };

  const assertTransactionsInfoSections = async () => {
    await expect(transactionChart, "Dashboard page should show a transaction chart of the last 24H").toBeVisible();
    const lastTransactionsCards = page.locator('div[class="MuiBox-root css-iqjs4s"]').all();
    expect(
      (await lastTransactionsCards).length.valueOf(),
      "4 Info cards with the last transactions data should be visible"
    ).toEqual(4);
  };

  const assertPoolsInfoSection = async () => {
    await expect(poolsSection, "Dashboard page should show a table with the last 5 most saturated pools").toBeVisible();
  };
  const assertLatestStoriesSection = async () => {
    await expect(
      latestStories,
      "Dashboard page should show a section with the latest stories from Cardano Foundation"
    ).toBeVisible();
  };

  const assertUserLoggedIn = async (userAccount: string) => {
    const userAccountName = await accountButton.textContent();
    expect(userAccount, "User should see his user name in account button").toContain(userAccountName?.trim());
  };
  const applyFilterToSearchBar = async (filterName: string) => {
    await searchFilters.click();
    await filterOptions.filter({ hasText: filterName }).click();
  };

  const searchFor = async (searchInput: string) => {
    await searchBar.fill(searchInput);
    await searchButton.click();
    await new Promise((f) => setTimeout(f, 10000));
  };

  return {
    assertUserLoggedIn,
    assertDashboardInfoCards,
    assertTransactionsInfoSections,
    assertPoolsInfoSection,
    assertLatestStoriesSection,
    applyFilterToSearchBar,
    searchFor,
    openBlocksSection,
    openEpochsSection,
    goTo
  };
}
