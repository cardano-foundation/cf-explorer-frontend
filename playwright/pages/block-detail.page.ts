import { expect, Page } from "@playwright/test";

import { Methods } from "../helpers/methods";
import { BlockInformationDto } from "../api/dtos/blockInformation.dto";

export function blockDetailPage(page: Page) {
  const blockId = page.locator("div[class='MuiBox-root css-l9z3t4']");
  const blockCreateAt = page.locator('//div[div[div[text()="Created At"]]]/following-sibling::div');
  const blockTransactionsCount = page.locator('//div[div[div[text()="Transactions"]]]/following-sibling::div');
  const epochNumber = page.locator('div[data-test-id="CircularProgressbarWithChildren__children"] > a');
  const blockSlotData = page.locator('//div[div[div[text()="Slot - Absolute Slot"]]]/following-sibling::div');
  const blockNumber = page.locator('//div[div[div[text()="Block"]]]/following-sibling::div');
  const blockTotalOutput = page.locator('//div[div[div[text()="Total output in ADA"]]]/following-sibling::div');
  const assertBlockDataIsDisplayed = async (lastBlockDataApi: Promise<BlockInformationDto>) => {
    await expect(blockId).toHaveText((await lastBlockDataApi).hash);
    const convertedTime = Methods().getTimeAndDateFromEpoch((await lastBlockDataApi).time);
    await expect(blockCreateAt).toHaveText(await convertedTime);
    await expect(blockTransactionsCount).toHaveText((await lastBlockDataApi).tx_count.toString());
    await expect(epochNumber).toHaveText((await lastBlockDataApi).epoch.toString());
    const fullSlotData = (await lastBlockDataApi).epoch_slot + " - " + (await lastBlockDataApi).slot;
    await expect(blockSlotData).toHaveText(fullSlotData);
    await expect(blockNumber).toHaveText((await lastBlockDataApi).height.toString());
    const totalOutput = await blockTotalOutput.textContent();
    expect((await lastBlockDataApi).output).toEqual(totalOutput?.replace(/[,.]/g, "").trim());
  };

  return {
    assertBlockDataIsDisplayed
  };
}
