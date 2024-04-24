import { expect, Page } from "@playwright/test";

export function epochsDashboardPage(page: Page) {
  const epochsTable = page.getByTestId("table-common");
  const lastActiveEpoch = page.locator('div[class="MuiBox-root css-1da2n9u"]');
  const lastFinishedEpoch = page.locator('[class="MuiBox-root css-1r4cx4i"]').first();
  const epochViewDetailsButton = page.locator('a[class="css-62ep8s"]');
  const activeEpochStartTime = page.locator('//div[div[div[text()="Start timestamp"]]]/following-sibling::div');
  const endTimeLastFinishedEpoch = page.locator('span[class="css-1wt18j5"]').nth(1);

  const openLastActiveEpochDetails = async () => {
    await expect(epochsTable).toBeVisible();
    await lastActiveEpoch.click();
    await epochViewDetailsButton.click();
  };

  const openLastFinishedEpochDetails = async () => {
    await expect(epochsTable).toBeVisible();
    await lastFinishedEpoch.click();
    await epochViewDetailsButton.click();
  };

  const assertActiveEpochBoundaries = async () => {
    expect(await activeEpochStartTime.textContent()).toEqual(await endTimeLastFinishedEpoch.textContent());
  };

  return {
    openLastActiveEpochDetails,
    openLastFinishedEpochDetails,
    assertActiveEpochBoundaries
  };
}
