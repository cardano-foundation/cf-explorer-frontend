import { expect, Page } from "@playwright/test";
import moment from "moment";

import { BlockfrostEpochInformationDto } from "playwright/api/dtos/blockfrostEpochInformation.dto";

export function epochsDashboardPage(page: Page) {
  const epochsTable = page.getByTestId("table-common");
  const lastActiveEpoch = page.locator('div[class="MuiBox-root css-1da2n9u"]');
  const lastFinishedEpoch = page.locator('[class="MuiBox-root css-1r4cx4i"]').first();
  const epochViewDetailsButton = page.locator('a[class="css-62ep8s"]');
  const activeEpochStartTime = page.locator('//div[div[div[text()="Start timestamp"]]]/following-sibling::div');
  const endTimeLastFinishedEpoch = page.locator('span[class="css-1wt18j5"]').nth(1);

  const sidebarBlockchainButton = page.getByTestId("menu-button-blockchain");
  const epochsTab = page.getByTestId("submenu-button-epochs");
  const searchBarEpoch = page.getByTestId("all-filters-dropdown");
  const currentEpoch = page.getByTestId("epoch-no-current-header");

  // Finished Epoch Table
  const startTimeCurrentEpoch = page.getByTestId("epoch.firstEpoch.startTimeValue");
  const endTimeCurrentEpoch = page.getByTestId("epoch.firstEpoch.endTimeValue");
  const epochNoTitleTable = page.getByTestId("epoch.table.epochTitle");
  const startTimeTitleTable = page.getByTestId("epoch.table.startTimeTitle");
  const endTimeTitleTable = page.getByTestId("epoch.table.endTimeTitle");
  const blocksTitleTable = page.getByTestId("epoch.table.blocksTitle");
  const uniqueAccountsTitleTable = page.getByTestId("epoch.table.uniqueAccountsTitle");
  const transactionCountTitleTable = page.getByTestId("epoch.table.transactionCountTitle");
  const rewardsDistributedTitleTable = page.getByTestId("epoch.table.rewardsDistributedTitle");
  const totalOutputTitleTable = page.getByTestId("epoch.table.totalOutputTitle");

  // Epoch widget
  const firstEpochContainer = page.getByTestId("epoch.firstEpoch.container");
  const firstEpochInFinishedTable = page.getByTestId("eye-icon#0");
  const epochNoWidget = page.getByTestId("epoch.detailViewEpoch.epochValue");
  const totalBlockInEpochWidget = page.getByTestId("epoch.detailViewEpoch.totalBlocksValue");
  const startTimeInEpochWidget = page.getByTestId("epoch.detailViewEpoch.startTimeValue");
  const endTimeInEpochWidget = page.getByTestId("epoch.detailViewEpoch.endTimeValue");
  const txCountInEpochWidget = page.getByTestId("epoch.detailViewEpoch.txCountValue");
  const totalOutputInEpochWidget = page.getByTestId("epoch.detailViewEpoch.totalOutputValue");
  const blockTabWidget = page.getByTestId("epoch.detailViewEpoch.blockLink");
  const viewDetailButtonWidget = page.getByTestId("epoch.detailViewEpoch.viewDetail");
  const blockTab = page.getByTestId("epoch.detailViewEpoch.blockLink");

  // Epoch Detail
  const firstBlockInEpochDetail = page.getByTestId("epochList.blockValue#0");
  const firstBlockIdInEpochDetail = page.getByTestId("epochList.blockIdValue#0");
  const detailTitle = page.getByTestId("detail-header-title");
  const transationTableTitle = page.getByTestId("header.table.transactions");
  const startTimeEpochOverview = page.getByTestId("epoch.overview.startTimeValue");
  const endTimeEpochOverview = page.getByTestId("epoch.overview.endTimeValue");
  const totalOutputEpochOverview = page.getByTestId("epoch.overview.totalOutputValue");
  const blockTableTitleEpochOverview = page.getByTestId("epoch.blockList.blocksTitle");
  const blockColumnBlockTable = page.getByTestId("epochList.blockTitle");
  const blockIdColumnBlockTable = page.getByTestId("epochList.blockIdTitle");
  const epochTitleColumnBlockTable = page.getByTestId("epochList.epochTitle");
  const slotTitleColumnBlockTable = page.getByTestId("epochList.slotTitle");
  const slotNoTitleColumnBlockTable = page.getByTestId("epochList.slotNoTitle");
  const createdAtTitleColumnBlockTable = page.getByTestId("epochList.createdAtTitle");
  const txCountTitleColumnBlockTable = page.getByTestId("epochList.txCountTitle");
  const feesTitleColumnBlockTable = page.getByTestId("epochList.feesTitle");
  const outSumTitleColumnBlockTable = page.getByTestId("epochList.outSumTitle");

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

  const goToDashboard = async () => {
    await page.goto("/");
  };
  const goToEpochs = async () => {
    await page.goto("/epochs");
  };
  const goToEpochsFromSidebar = async () => {
    await sidebarBlockchainButton.click();
    await epochsTab.click();
  };

  const searchBarOnEpochs = async () => {
    await expect(searchBarEpoch).toHaveText("Epochs");
  };

  const openWidgetCurrentEpoch = async () => {
    await firstEpochContainer.click();
  };

  const openWidgetFinishedEpoch = async () => {
    await firstEpochInFinishedTable.click();
  };

  const goToEpochsDetailFromWidget = async () => {
    await viewDetailButtonWidget.click();
  };

  const goToEpochsDetailFromWidgetByBlockTab = async () => {
    await blockTab.click();
  };

  const goToBlockDetailFromEpoch = async () => {
    await firstBlockInEpochDetail.click();
  };

  const goToBlockDetailFromEpochByBlockId = async () => {
    await firstBlockIdInEpochDetail.click();
  };

  const checkCurrentEpoch = async ({ lastEpoch }: { lastEpoch?: BlockfrostEpochInformationDto }) => {
    await expect(currentEpoch, "Current epoch no on explorer equal epoch no Blockfrost").toHaveText(
      (lastEpoch?.epoch || "").toString()
    );

    expect(
      moment((await startTimeCurrentEpoch.textContent())?.replace(",", "")).unix(),
      "Start time epoch on explorer equal start time epoch Blockfrost"
    ).toEqual(lastEpoch?.start_time || "");

    expect(
      moment((await endTimeCurrentEpoch.textContent())?.replace(",", "")).unix(),
      "End time epoch on explorer equal end time epoch Blockfrost"
    ).toEqual(lastEpoch?.end_time || "");
  };

  const checkTableFinishedEpochTable = async () => {
    await expect(epochNoTitleTable, "Check title on finished epoch table").toHaveText("Epoch");
    await expect(startTimeTitleTable, "Check title on finished epoch table").toHaveText("Start Timestamp");
    await expect(endTimeTitleTable, "Check title on finished epoch table").toHaveText("End Timestamp");
    await expect(blocksTitleTable, "Check title on finished epoch table").toHaveText("Blocks");
    await expect(uniqueAccountsTitleTable, "Check title on finished epoch table").toHaveText("Unique Accounts");
    await expect(transactionCountTitleTable, "Check title on finished epoch table").toHaveText("Transaction Count");
    await expect(rewardsDistributedTitleTable, "Check title on finished epoch table").toHaveText("Rewards Distributed");
    await expect(totalOutputTitleTable, "Check title on finished epoch table").toHaveText("Total Output");
  };

  const checkCurrentEpochWidget = async ({ currentEpoch }: { currentEpoch?: BlockfrostEpochInformationDto }) => {
    expect(
      parseInt(<string>await epochNoWidget.textContent()),
      "Current epoch no on explorer equal epoch no Blockfrost"
    ).toEqual(currentEpoch?.epoch);

    expect(
      moment((await startTimeInEpochWidget.textContent())?.replace(",", "")).unix(),
      "Start time epoch current on widget equal start time epoch Blockfrost"
    ).toEqual(currentEpoch?.start_time);

    expect(
      moment((await endTimeInEpochWidget.textContent())?.replace(",", "")).unix(),
      "End time epoch current on widget equal end time epoch Blockfrost"
    ).toEqual(currentEpoch?.end_time);

    expect(
      parseInt(<string>await txCountInEpochWidget.textContent()),
      "Total transaction in current epoch on widget to equal or greater than total block in epoch on Blockfrost "
    ).toBeGreaterThanOrEqual(currentEpoch?.tx_count || 0);

    await expect(blockTabWidget, "Block tab on epoch widget").toHaveText("Blocks");

    await expect(viewDetailButtonWidget, "View details button on epoch widget").toHaveText("View details");
  };

  const checkFinishedEpochWidget = async ({ currentEpoch }: { currentEpoch?: BlockfrostEpochInformationDto }) => {
    expect(
      parseInt(<string>await epochNoWidget.textContent()),
      "Finished epoch no on explorer equal epoch no Blockfrost"
    ).toEqual(currentEpoch?.epoch);

    expect(
      moment((await startTimeInEpochWidget.textContent())?.replace(",", "")).unix(),
      "Start time finished epoch on widget to equal start time epoch Blockfrost"
    ).toEqual(currentEpoch?.start_time);

    expect(
      moment((await endTimeInEpochWidget.textContent())?.replace(",", "")).unix(),
      "End time finished epoch on widget to equal end time epoch Blockfrost"
    ).toEqual(currentEpoch?.end_time);

    expect(
      parseInt(<string>await totalBlockInEpochWidget.textContent()),
      "Total block in finished epoch on widget to equal total block in epoch on Blockfrost "
    ).toEqual(currentEpoch?.block_count || 0);

    expect(
      parseInt(<string>await txCountInEpochWidget.textContent()),
      "Total transaction in finished epoch on widget to equal total block in epoch on Blockfrost "
    ).toEqual(currentEpoch?.tx_count || 0);

    expect(
      +((await totalOutputInEpochWidget.textContent())?.replaceAll(",", "") || 0) * 10 ** 6,
      "Total output in finished epoch on widget to equal total block in epoch on Blockfrost "
    ).toEqual(+(currentEpoch?.output || 0));

    await expect(blockTabWidget, "Block tab on epoch widget").toHaveText("Blocks");

    await expect(viewDetailButtonWidget, "View details button on epoch widget").toHaveText("View details");
  };

  const checkEpochDetailPage = async ({ currentEpoch }: { currentEpoch?: BlockfrostEpochInformationDto }) => {
    await expect(detailTitle, "Epoch detail title").toHaveText("Epoch Details");

    expect(
      moment((await startTimeEpochOverview.textContent())?.replace(",", "")).unix(),
      "Start time on epoch detail to equal start time epoch Blockfrost"
    ).toEqual(currentEpoch?.start_time);

    expect(
      moment((await endTimeEpochOverview.textContent())?.replace(",", "")).unix(),
      "End time on epoch detail to equal end time epoch Blockfrost"
    ).toEqual(currentEpoch?.end_time);

    expect(
      +((await totalOutputEpochOverview.textContent())?.replaceAll(",", "") || 0) * 10 ** 6,
      "Total output in epoch detail to equal total block in epoch on Blockfrost "
    ).toEqual(+(currentEpoch?.output || 0));

    await expect(blockTableTitleEpochOverview, "Block table title").toHaveText("Blocks");

    await expect(blockColumnBlockTable, "Check title on finished blocks table").toHaveText("Block");
    await expect(blockIdColumnBlockTable, "Check title on finished blocks table").toHaveText("Block ID");
    await expect(epochTitleColumnBlockTable, "Check title on finished blocks table").toHaveText("Epoch");
    await expect(slotTitleColumnBlockTable, "Check title on finished blocks table").toHaveText("Slot");
    await expect(slotNoTitleColumnBlockTable, "Check title on finished blocks table").toHaveText("Absolute Slot");
    await expect(createdAtTitleColumnBlockTable, "Check title on finished blocks table").toHaveText("Created At");
    await expect(txCountTitleColumnBlockTable, "Check title on finished blocks table").toHaveText("Transactions");
    await expect(feesTitleColumnBlockTable, "Check title on finished blocks table").toHaveText("Fees");
    await expect(outSumTitleColumnBlockTable, "Check title on finished blocks table").toHaveText("Output");
  };

  const checkBlockDetailPage = async () => {
    expect(page.url().includes("/block")).toBe(true);
    await expect(detailTitle).toHaveText("Block Details");
    await expect(transationTableTitle).toHaveText("Transactions");
  };

  return {
    openLastActiveEpochDetails,
    openLastFinishedEpochDetails,
    assertActiveEpochBoundaries,
    checkCurrentEpoch,
    checkTableFinishedEpochTable,
    checkCurrentEpochWidget,
    checkFinishedEpochWidget,
    checkEpochDetailPage,
    checkBlockDetailPage,
    goToDashboard,
    goToEpochs,
    goToEpochsFromSidebar,
    goToEpochsDetailFromWidget,
    goToBlockDetailFromEpoch,
    goToBlockDetailFromEpochByBlockId,
    goToEpochsDetailFromWidgetByBlockTab,
    openWidgetCurrentEpoch,
    openWidgetFinishedEpoch,
    searchBarOnEpochs
  };
}
