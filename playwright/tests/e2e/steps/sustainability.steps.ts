import { createBdd } from "playwright-bdd";

import { stakeDelegationPage } from "../../../pages/stake-delegation.page";
import { stakeDetailPage } from "../../../pages/stake-detail.page";
import { sustainabilityPage } from "../../../pages/sustainability.page";
import { CardanoMicaIndicatorsDto } from "../../../api/dtos/cardanoMicaIndicatorsDto";
import { Methods } from "../../../helpers/methods";

const { Given, When, Then } = createBdd();
let stakeAddressId = "";
let totalTransactions = "";
let cardanoIndicators: CardanoMicaIndicatorsDto = {} as CardanoMicaIndicatorsDto;

Given(/^the user selects the stake address id from Stake delegations page$/, async ({ page }) => {
  await stakeDelegationPage(page).goToStakeDelegationPage();
  await stakeDelegationPage(page).openStakeAddressDetailPage();
  stakeAddressId = (await stakeDetailPage(page)?.getStakeAddressId()) || "";
  totalTransactions = (await stakeDetailPage(page)?.getStakeAddressTx()) || "";
});
When(/^the user search the stake address id in the Emissions Calculator$/, async ({ page }) => {
  await sustainabilityPage(page).openSustainabilityPage();
  await sustainabilityPage(page).calculateEmissionsForStakeAddress(stakeAddressId);
});
Then(
  /^the user should see the number of transactions and the emissions for the given stake address$/,
  async ({ page }) => {
    await sustainabilityPage(page).checkEmissionsResultForStakeAddress(stakeAddressId, totalTransactions);
  }
);
Given(/^the user is in the sustainability page$/, async ({ page, request }) => {
  await sustainabilityPage(page).openSustainabilityPage();
  cardanoIndicators = await Methods().getCardanoMicaIndicators(request);
});
Then(/^the user should see the Cardano's mica indicator$/, async ({ page }) => {
  await sustainabilityPage(page).checkMicarIndicators(cardanoIndicators);
});
