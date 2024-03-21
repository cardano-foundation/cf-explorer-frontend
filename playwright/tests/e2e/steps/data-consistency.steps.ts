import { createBdd } from "playwright-bdd";

import { epochsDashboardPage } from "playwright/pages/epochs-dashboard.page";
import { BlockfrostEpochInformationDto } from "playwright/api/dtos/blockfrostEpochInformation.dto";
import { epochDetailPage } from "playwright/pages/epoch-detail.page";
import { koiosService } from "playwright/api/call-koios/koios.service";
import { KoiosEpochInformationDto } from "playwright/api/dtos/koiosEpochInformation.dto";

import { signIn } from "../../../pages/sign-in.page";
import { blocksDashboard } from "../../../pages/blocks-dashboard.page";
import { dashboard } from "../../../pages/dashboard.page";
import { blockfrostService } from "../../../api/call-blockfrost/blockfrost.service";
import { BlockInformationDto } from "../../../api/dtos/blockInformation.dto";
import { blockDetailPage } from "../../../pages/block-detail.page";

const { Given, When, Then } = createBdd();
const username = process.env.USERNAME as string;
const password = process.env.PASSWORD as string;
let lastBlockData: Promise<BlockInformationDto>;
let lastActiveEpochData: Promise<BlockfrostEpochInformationDto>;
let finishedEpochResponse: Promise<KoiosEpochInformationDto[]>;

Given(/^An explorer user logs in into explorer portal$/, async ({ page }) => {
  await signIn(page).goTo();
  await signIn(page).loginAs(username, password);
});
Given(/^the user goes to the blocks information page$/, async ({ page }) => {
  await dashboard(page).openBlocksSection();
});
When(/^the user selects the last block$/, async ({ page }) => {
  await blocksDashboard(page).openLastBlockDetails();
});
When(/^the last block information has been requested through api service$/, async ({ request }) => {
  lastBlockData = (await blockfrostService(request)).getLastBlockData();
});
Then(/^the user should see the same information that the api returns$/, async ({ page }) => {
  await blockDetailPage(page).assertBlockDataIsDisplayed(lastBlockData);
});
Given(/^the user goes to the epochs information page$/, async ({ page }) => {
  await dashboard(page).openEpochsSection();
});
When(/^the user selects the last active epoch$/, async ({ page }) => {
  await epochsDashboardPage(page).openLastActiveEpochDetails();
});
When(/^the last active epoch information has been requested through api service$/, async ({ request }) => {
  lastActiveEpochData = (await blockfrostService(request)).getLastEpochData();
});
Then(/^the user should see the same information for the epoch that the api returns$/, async ({ page }) => {
  await epochDetailPage(page).assertLastActiveEpochDataIsDisplayed(lastActiveEpochData);
});
When(/^the user selects the last finished epoch$/, async ({ page }) => {
  await epochsDashboardPage(page).openLastFinishedEpochDetails();
});
When(/^the last finished epoch information has been requested through api service$/, async ({ request }) => {
  const lastFinishedEpochId = (await blockfrostService(request)).getLastFinishedEpochId();
  finishedEpochResponse = (await koiosService(request)).getEpochById(await lastFinishedEpochId);
});
Then(/^the user should see the same information fort the finished epoch that the api returns$/, async ({ page }) => {
  await epochDetailPage(page).assertLastFinishedEpochDataIsDisplayed(finishedEpochResponse);
});
Then(/^the start time of the active epoch should be the end time of the last finised epoch$/, async ({ page }) => {
  await epochsDashboardPage(page).assertActiveEpochBoundaries();
});
