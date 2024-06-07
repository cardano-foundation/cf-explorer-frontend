import { expect, Page } from "@playwright/test";

export function blocksDashboard(page: Page) {
  const blocksTable = page.getByTestId("blocks-card");
  const firstBlocksID = page.locator("td > [aria-label]").first();

  const openLastBlockDetails = async () => {
    await expect(blocksTable).toBeVisible();
    await firstBlocksID.click();
  };

  return {
    openLastBlockDetails
  };
}
