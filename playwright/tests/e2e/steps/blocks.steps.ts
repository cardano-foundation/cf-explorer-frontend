import { createBdd } from "playwright-bdd";

import { blockfrostApi } from "playwright/api/call-blockfrost/blockfrost.api";
import { BlockInformationDto } from "playwright/api/dtos/blockInformation.dto";

import { blocksDashboard } from "../../../pages/blocks-dashboard.page";
import { blockDetailPage } from "../../../pages/block-detail.page";
import { epochDetailPage } from "../../../pages/epoch-detail.page";

const { Given, When, Then } = createBdd();

let epochNo: string | null;

Given(/^the user is in the general dashboard page in explorer portal block test$/, async ({ page }) => {
  await blocksDashboard(page).goToDashboard();
});
When(/^the user selects the Blocks option inside the Blockchain drop down menu$/, async ({ page }) => {
  await blocksDashboard(page).goToEpochsFromSidebar();
});
Then(/^the user should see the blocks info containing the Search bar and Blocks table$/, async ({ page }) => {
  await blocksDashboard(page).searchBarOnBlocks();
  await blocksDashboard(page).checkBlocksTable();
});

Given(/^the user is in the blocks page in explorer$/, async ({ page }) => {
  await blocksDashboard(page).goToBlocks();
});
When(/^the user selects the block number of one of the blocks record in the table$/, async ({ page }) => {
  await blocksDashboard(page).goToBlockDetailFromBlockNo();
});
Then(
  /^the user should see the block detail page of the selected block number in the table$/,
  async ({ page, request }) => {
    const blockNo = await page.getByTestId("block.detail.overview.value.block");
    if (blockNo) {
      (await blockfrostApi(request).getBlockByNumber(parseInt(<string>await blockNo.textContent())))
        .json()
        .then(async (data) => {
          await blockDetailPage(page).checkBlockOverviewDetailPage({ blockFrostBlock: data as BlockInformationDto });
        });
    }
  }
);

Given(/^the user is in the blocks list page in explorer$/, async ({ page }) => {
  await blocksDashboard(page).goToBlocks();
});
When(/^the user selects the block id of one of the blocks record in the table$/, async ({ page }) => {
  await blocksDashboard(page).goToBlockDetailFromBlockId();
});
Then(/^the user should see the block detail page of the selected block id in the table$/, async ({ page, request }) => {
  const blockNo = await page.getByTestId("block.detail.overview.value.block");
  if (blockNo) {
    (await blockfrostApi(request).getBlockByNumber(parseInt(<string>await blockNo.textContent())))
      .json()
      .then(async (data) => {
        await blockDetailPage(page).checkBlockOverviewDetailPage({ blockFrostBlock: data as BlockInformationDto });
      });
  }
});

Given(/^the user is in the blocks page in explorer portal web$/, async ({ page }) => {
  await blocksDashboard(page).goToBlocks();
});
When(/^the user selects the epoch number of one of the blocks record in the table$/, async ({ page }) => {
  const blocksTableValueEpoch = page.getByTestId("blocks.table.value.epoch#2");
  epochNo = await blocksTableValueEpoch.textContent();
  await blocksTableValueEpoch.click();
});
Then(/^the user should see the epoch detail page of the selected epoch number in the table$/, async ({ page }) => {
  await epochDetailPage(page).checkEpochDetail({ epochNo });
});
