import { expect, Page } from "@playwright/test";

import { BlockfrostEpochInformationDto } from "../api/dtos/blockfrostEpochInformation.dto";
import { Methods } from "../helpers/methods";
import { KoiosEpochInformationDto } from "../api/dtos/koiosEpochInformation.dto";
import { log } from "../utils/logger";

export function epochDetailPage(page: Page) {
  const epochId = page.locator('div[data-test-id="CircularProgressbarWithChildren__children"] > a');
  const epochStartTime = page.locator('//div[div[div[text()="Start timestamp"]]]/following-sibling::div');
  const epochEndTime = page.locator('//div[div[div[text()="End timestamp"]]]/following-sibling::div');
  const totalOutput = page.locator('//div[div[div[text()="Total output"]]]/following-sibling::div');
  const blocksCount = page.locator('//div[div[div[text()="Blocks"]]]/following-sibling::div');
  const transactionCount = page.locator('//div[div[div[text()="Transaction Count"]]]/following-sibling::div');

  const assertLastActiveEpochDataIsDisplayed = async (lastEpochData: Promise<BlockfrostEpochInformationDto>) => {
    await expect(epochId).toHaveText((await lastEpochData).epoch.toString());
    const startTime = getFormattedTime((await lastEpochData).start_time);
    await expect(epochStartTime).toHaveText(await startTime);
    const endTime = getFormattedTime((await lastEpochData).end_time);
    await expect(epochEndTime).toHaveText(await endTime);
    const receivedOutput = Methods().getNumberFromStringWithNDecimals((await lastEpochData).output, 6);
    const currentOutput = parseFloat(<string>(await totalOutput.textContent())?.replace(/,/g, ""));
    expect(currentOutput).toBeGreaterThanOrEqual(await receivedOutput);
    const currentBlocksCount = parseInt(<string>await blocksCount.textContent());
    expect(currentBlocksCount).toBeGreaterThanOrEqual((await lastEpochData).block_count);
    const currentTransactionsCount = parseInt(<string>await transactionCount.textContent());
    expect(currentTransactionsCount).toBeGreaterThanOrEqual((await lastEpochData).tx_count);
  };

  const assertLastFinishedEpochDataIsDisplayed = async (lastEpochResponse: Promise<KoiosEpochInformationDto[]>) => {
    const lastEpochData = (await lastEpochResponse).at(0);
    if (lastEpochData !== undefined) {
      await expect(epochId).toHaveText(lastEpochData.epoch_no.toString());
      const startTime = getFormattedTime(lastEpochData.start_time);
      await expect(epochStartTime).toHaveText(await startTime);
      const endTime = getFormattedTime(lastEpochData.end_time);
      await expect(epochEndTime).toHaveText(await endTime);
      const receivedOutput = Methods().getNumberFromStringWithNDecimals(lastEpochData.out_sum, 6);
      const currentOutput = parseFloat(<string>(await totalOutput.textContent())?.replace(/,/g, ""));
      expect(currentOutput).toEqual(await receivedOutput);
      const currentBlocksCount = parseInt(<string>await blocksCount.textContent());
      expect(currentBlocksCount).toEqual(lastEpochData.blk_count);
      const currentTransactionsCount = parseInt(<string>await transactionCount.textContent());
      expect(currentTransactionsCount).toEqual(lastEpochData.tx_count);
    } else log.error("Last epoch data object is undefined");
  };
  const getFormattedTime = async (time: number) => {
    return Methods().getTimeAndDateFromEpoch(time);
  };

  return {
    assertLastActiveEpochDataIsDisplayed,
    assertLastFinishedEpochDataIsDisplayed
  };
}
