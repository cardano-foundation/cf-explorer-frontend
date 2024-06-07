import { expect, Page } from "@playwright/test";

import { BlockfrostEpochInformationDto } from "../api/dtos/blockfrostEpochInformation.dto";
import { Methods } from "../helpers/methods";
import { KoiosEpochInformationDto } from "../api/dtos/koiosEpochInformation.dto";
import { log } from "../utils/logger";

export function epochDetailPage(page: Page) {
  const epochId = page.locator('div[data-test-id="CircularProgressbarWithChildren__children"] > a');
  const deatailPageTitle = page.getByTestId("detail.page.title");
  const epochStartTime = page.locator(
    "//div[div[div[@data-testid='epoch.overview.startTimeTitle']]]/following-sibling::div"
  );
  const epochEndTime = page.locator('//div[div[div[text()="End timestamp"]]]/following-sibling::div');
  const totalOutput = page.locator('//div[div[div[text()="Total output"]]]/following-sibling::div');
  const blocksCount = page.locator('//div[div[div[text()="Blocks"]]]/following-sibling::div');
  const transactionCount = page.locator('//div[div[div[text()="Transaction Count"]]]/following-sibling::div');

  const checkEpochDetailPage = async () => {
    expect(deatailPageTitle, "Epoch detail title").toHaveText("Epoch Details");
  };

  const assertEpochDataIsDisplayed = async (lastEpochData: Promise<BlockfrostEpochInformationDto>) => {
    await expect(epochId, "The epoch id is not the expected for the current epoch details").toHaveText(
      (await lastEpochData).epoch.toString()
    );
    const startTime = getFormattedTime((await lastEpochData).start_time);
    const expectedStartTime = await epochStartTime.textContent();
    expect(
      expectedStartTime?.replace(",", ""),
      "The epoch start time is not the expected for the current epoch details"
    ).toEqual(await startTime);
    const endTime = getFormattedTime((await lastEpochData).end_time);
    const expectedEndTime = await epochEndTime.textContent();
    expect(
      expectedEndTime?.replace(",", ""),
      "The epoch end time is not the expected for the current epoch details"
    ).toEqual(await endTime);
    const receivedOutput = Methods().getNumberFromStringWithNDecimals((await lastEpochData).output, 6);
    const currentOutput = parseFloat(<string>(await totalOutput.textContent())?.replace(/,/g, ""));
    expect(
      currentOutput,
      "The epoch's current output is not the expected for the current epoch details"
    ).toBeGreaterThanOrEqual(await receivedOutput);
    const currentBlocksCount = parseInt(<string>await blocksCount.textContent());
    expect(
      currentBlocksCount,
      "The epoch's blocks count is not the expected for the current epoch details"
    ).toBeGreaterThanOrEqual((await lastEpochData).block_count);
    const currentTransactionsCount = parseInt(<string>await transactionCount.textContent());
    expect(
      currentTransactionsCount,
      "The epoch's transactions count is not the expected for the current epoch details"
    ).toBeGreaterThanOrEqual((await lastEpochData).tx_count);
  };

  const assertLastFinishedEpochDataIsDisplayed = async (lastEpochResponse: Promise<KoiosEpochInformationDto[]>) => {
    const lastEpochData = (await lastEpochResponse).at(0);
    if (lastEpochData !== undefined) {
      await expect(epochId, "The epoch id is not the expected for the current epoch details").toHaveText(
        lastEpochData.epoch_no.toString()
      );
      const startTime = getFormattedTime(lastEpochData.start_time);
      const expectedStartTime = await epochStartTime.textContent();
      expect(
        expectedStartTime?.replace(",", ""),
        "The epoch start time is not the expected for the current epoch details"
      ).toEqual(await startTime);
      const endTime = getFormattedTime(lastEpochData.end_time);
      const expectedEndTime = await epochEndTime.textContent();
      expect(
        expectedEndTime?.replace(",", ""),
        "The epoch end time is not the expected for the current epoch details"
      ).toEqual(await endTime);
      const receivedOutput = Methods().getNumberFromStringWithNDecimals(lastEpochData.out_sum, 6);
      const currentOutput = parseFloat(<string>(await totalOutput.textContent())?.replace(/,/g, ""));
      expect(currentOutput, "The epoch's current output is not the expected for the current epoch details").toEqual(
        await receivedOutput
      );
      const currentBlocksCount = parseInt(<string>await blocksCount.textContent());
      expect(currentBlocksCount, "The epoch's blocks count is not the expected for the current epoch details").toEqual(
        lastEpochData.blk_count
      );
      const currentTransactionsCount = parseInt(<string>await transactionCount.textContent());
      expect(
        currentTransactionsCount,
        "The epoch's transactions count is not the expected for the current epoch details"
      ).toEqual(lastEpochData.tx_count);
    } else log.error("Last epoch data object is undefined");
  };
  const getFormattedTime = async (time: number) => {
    return Methods().getTimeAndDateFromEpoch(time);
  };

  return {
    assertEpochDataIsDisplayed,
    assertLastFinishedEpochDataIsDisplayed,
    checkEpochDetailPage
  };
}
