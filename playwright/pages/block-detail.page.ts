import { expect, Page } from "@playwright/test";

import { Methods } from "../helpers/methods";
import { BlockInformationDto } from "../api/dtos/blockInformation.dto";

export function blockDetailPage(page: Page) {
  const blockId = page.getByTestId("ellipsis-text");
  const blockCreateAt = page.locator('//div[div[div[text()="Created At"]]]/following-sibling::div');
  const blockTransactionsCount = page.locator('//div[div[div[text()="Transactions"]]]/following-sibling::div');
  const epochNumber = page.locator('div[data-test-id="CircularProgressbarWithChildren__children"] > a');
  const blockSlotData = page.locator('//div[div[div[text()="Slot - Absolute Slot"]]]/following-sibling::div');
  const blockNumber = page.locator('//div[div[div[text()="Block"]]]/following-sibling::div');
  const blockTotalOutput = page.locator('//div[div[div[text()="Total output in ADA"]]]/following-sibling::div');
  const assertBlockDataIsDisplayed = async (lastBlockDataApi: Promise<BlockInformationDto>) => {
    await expect(blockId, "The block id is not the expected for the current block details").toHaveText(
      (
        await lastBlockDataApi
      ).hash
    );
    const convertedTime = Methods().getTimeAndDateFromEpoch((await lastBlockDataApi).time);
    const expectedTime = await blockCreateAt.textContent();
    expect(
      expectedTime?.replace(",", ""),
      "The block created date is not the expected for the current block details"
    ).toEqual(await convertedTime);
    await expect(
      blockTransactionsCount,
      "The block transactions count is not the expected for the current block details"
    ).toHaveText((await lastBlockDataApi).tx_count.toString());
    await expect(epochNumber, "The block's epoch number is not the expected for the current block details").toHaveText(
      (await lastBlockDataApi).epoch.toString()
    );
    const fullSlotData = (await lastBlockDataApi).epoch_slot + " - " + (await lastBlockDataApi).slot;
    await expect(blockSlotData, "The slot data is not is not the expected for the current block details").toHaveText(
      fullSlotData
    );
    await expect(blockNumber, "The block number is not is not the expected for the current block details").toHaveText(
      (await lastBlockDataApi).height.toString()
    );
    const totalOutput = await blockTotalOutput.textContent();
    expect(
      (await lastBlockDataApi).output.replace(/0$/, ""),
      "The block's total output is not the expected for the current block details"
    ).toEqual(totalOutput?.replace(/[,.]/g, "").trim());
  };
  return {
    assertBlockDataIsDisplayed
  };
}
