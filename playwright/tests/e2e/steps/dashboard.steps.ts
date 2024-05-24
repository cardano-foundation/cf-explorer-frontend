import { createBdd } from "playwright-bdd";

import { dashboard } from "../../../pages/dashboard.page";
import { SearchFilters } from "../../../helpers/SearchFilters";
import { blockfrostService } from "../../../api/call-blockfrost/blockfrost.service";
import { BlockfrostEpochInformationDto } from "../../../api/dtos/blockfrostEpochInformation.dto";
import { epochDetailPage } from "../../../pages/epoch-detail.page";
import { BlockInformationDto } from "../../../api/dtos/blockInformation.dto";
import { blockDetailPage } from "../../../pages/block-detail.page";

const { Given, When, Then } = createBdd();
let epochData: Promise<BlockfrostEpochInformationDto>;
let blockData: Promise<BlockInformationDto>;

Then(/^the user should see the general dashboard page with all the resume information$/, async ({ page }) => {
  // await dashboard(page).assertDashboardInfoCards();
  await dashboard(page).assertTransactionsInfoSections();
  await dashboard(page).assertPoolsInfoSection();
  await dashboard(page).assertLatestStoriesSection();
});

Given(/^the user selects the epochs filter in the search bar$/, async ({ page }) => {
  await dashboard(page).applyFilterToSearchBar(SearchFilters.Epochs);
});
Given(/^epoch information has been requested through api service$/, async ({ request }) => {
  const lastActiveEpochData = (await blockfrostService(request)).getLastEpochData();
  const lastEpochNumber = (await lastActiveEpochData).epoch;
  const searchEpoch = Math.floor(Math.random() * (lastEpochNumber - 1 + 1)) + 1;
  epochData = (await blockfrostService(request)).getEpochById(searchEpoch);
});
When(/^the user search by the epoch number$/, async ({ page }) => {
  await dashboard(page).searchFor((await epochData).epoch.toString());
});
Then(/^the user should be redirected to the searched epoch detail view$/, async ({ page }) => {
  await epochDetailPage(page).assertEpochDataIsDisplayed(epochData);
});

Given(/^the user selects the blocks filter in the search bar$/, async ({ page }) => {
  await dashboard(page).applyFilterToSearchBar(SearchFilters.Blocks);
});
Given(/^a block information has been requested through api service$/, async ({ request }) => {
  const lastBlockData = (await blockfrostService(request)).getLastBlockData();
  const lastBlockNumber = (await lastBlockData).height;
  const searchBlockNumber =
    Math.floor(Math.random() * (lastBlockNumber - lastBlockNumber / 2 + 1)) + Math.floor(lastBlockNumber / 2);
  blockData = (await blockfrostService(request)).getBlockByNumber(searchBlockNumber);
});
When(/^the user search by the block number$/, async ({ page }) => {
  await dashboard(page).searchFor((await blockData).height.toString());
});
Then(/^the user should be redirected to the searched block detail view$/, async ({ page }) => {
  await blockDetailPage(page).assertBlockDataIsDisplayed(blockData);
});

When(/^the user search by block id\/hash$/, async ({ page }) => {
  await dashboard(page).searchFor((await blockData).hash);
});
