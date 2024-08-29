import { Page } from "@playwright/test";

export function tokenPage(page: Page) {
  const tokenScriptHash = page.getByTestId("token.assetName#0");
  const mintingTab = page.getByTestId("token.detail.mintingTab");

  const goToTokenPage = async () => {
    await page.goto("/tokens", { waitUntil: "load", timeout: 60000 });
  };

  const goToTokenDetailPage = async () => {
    await tokenScriptHash.click({ timeout: 60000 });
  };

  const openMintingTab = async () => {
    await mintingTab.click({ timeout: 60000 });
  };

  return { goToTokenPage, goToTokenDetailPage, openMintingTab };
}
