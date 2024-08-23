import { createBdd } from "playwright-bdd";
import { expect } from "@playwright/test";

import { blockfrostApi } from "playwright/api/call-blockfrost/blockfrost.api";
import { koiosApi } from "playwright/api/call-koios/koios.api";
import { topADAHoldersPage } from "playwright/pages/top-ADA-holders.page";
import { addressDetailPage } from "playwright/pages/address-detail.page";
import { poolDetailPage } from "playwright/pages/pool-detail.page";
import { stakeDetailPage } from "playwright/pages/stake-detail.page";

const { Given, When, Then } = createBdd();

let firstAddressValue: string | null;
let firstStakeAddress: string | null;
let firstPoolID: string | null;

Given(/^the user is in the general dashboard page in explorer portal test top ADA holder$/, async ({ page }) => {
  await topADAHoldersPage(page).goToDashboard();
});
When(/^the user selects the Top ADA Holders option inside the Blockchain drop down menu$/, async ({ page }) => {
  await topADAHoldersPage(page).goToTopADAHoldersFromSidebar();
});
Then(
  /^the user should see the top ADA Holders address hash, balance and transaction count sorted by balance$/,
  async ({ page, request }) => {
    let address;
    let balance;
    let txCount;

    await topADAHoldersPage(page).checkTitleTableTabAddADABalance();

    const addressValue = await topADAHoldersPage(page).getAttributeAddress();

    if (addressValue) {
      (await koiosApi(request).getAddress(addressValue)).json().then(async (data) => {
        address = data[0].address;
        balance = data[0].balance;

        const dataTabAddADABalance = { address, balance };

        await topADAHoldersPage(page).checkAddressAndBalace({ dataTabAddADABalance });
      });

      (await blockfrostApi(request).getTxCountTopADAHolder(addressValue)).json().then(async (data) => {
        txCount = data.tx_count;
        await topADAHoldersPage(page).checkTxCount(txCount);
      });
    }
  }
);

Given(/^the user is in the Top ADA Holders section$/, async ({ page }) => {
  await topADAHoldersPage(page).goToTopADAHolders();
});
When(/^the user selects the By amount Staked option$/, async ({ page }) => {
  await topADAHoldersPage(page).goToTabAmountStaked();
});
Then(
  /^the user should see the Stake Address, pool and Stake amount of the Top ADA holders sorted by stake amount$/,
  async ({ page, request }) => {
    let stakeAddress;
    let stakeAmount;

    await topADAHoldersPage(page).checkTitleTableTabAmountStake();
    const stakedAddressValue = await topADAHoldersPage(page).getAttributeAddressStake();
    if (stakedAddressValue) {
      (await blockfrostApi(request).getDataAmountStaked(stakedAddressValue)).json().then(async (data) => {
        stakeAddress = data.stake_address;
        stakeAmount = data.controlled_amount;
        const dataTabAmountStake = { stakeAddress, stakeAmount };
        await topADAHoldersPage(page).checkStakeAddressAndStakeAmount({ dataTabAmountStake });
      });

      (await blockfrostApi(request).getPoolIDAcount(stakedAddressValue)).json().then(async (data) => {
        const firstPool = page.getByTestId("topAddresses.byAmountStaked.pool#0");
        firstPoolID = await firstPool?.getAttribute("aria-label");
        const exists: boolean = data.some((item: { pool_id: string }) => item.pool_id === firstPoolID);
        await expect(exists).toBe(true);
      });
    }
  }
);

Given(/^the user is in the Top ADA Holders section Address ADA Balance$/, async ({ page }) => {
  await topADAHoldersPage(page).goToTopADAHolders();
});
When(/^the user selects the Address hash of one the Top ADA Holders$/, async ({ page }) => {
  const firstAddresses = page.getByTestId("topAddresses.byADABalance.addressValue#0");
  firstAddressValue = await firstAddresses.textContent();
  await firstAddresses.click();
});
Then(/^the user should be redirected to the Address detail page of the selected Address hash$/, async ({ page }) => {
  await addressDetailPage(page).checkAddressDetail({ address: firstAddressValue });
});

Given(/^the user is in the Top ADA Holders section tab Address ADA Balance$/, async ({ page }) => {
  await topADAHoldersPage(page).goToTopADAHolders();
});
Given(/^the user selects the By amount Staked tab option$/, async ({ page }) => {
  await topADAHoldersPage(page).goToTabAmountStaked();
});
When(/^the user selects the Stake Address hash of one the Top ADA Holders$/, async ({ page }) => {
  const firstAddressStaked = page.getByTestId("topAddresses.byAmountStaked.addressValue#0");
  firstStakeAddress = await firstAddressStaked.textContent();
  await firstAddressStaked.click();
});
Then(
  /^the user should be redirected to the Stake Address detail page of the selected Stake Address hash$/,
  async ({ page }) => {
    stakeDetailPage(page).checkStakeDetail({ address: firstStakeAddress });
  }
);

Given(/^the user is in the page Top ADA Holders section$/, async ({ page }) => {
  await topADAHoldersPage(page).goToTopADAHolders();
});
Given(/^the user selects the tab By amount Staked option$/, async ({ page }) => {
  await topADAHoldersPage(page).goToTabAmountStaked();
});
When(/^the user selects the pool link of one the Top ADA Holders$/, async ({ page }) => {
  const firstPool = page.getByTestId("topAddresses.byAmountStaked.pool#0");
  await firstPool.click();
});
Then(/^the user should be redirected to the Pool detail page of the selected pool link$/, async ({ page }) => {
  await poolDetailPage(page).checkPoolDetail({ poolId: firstPoolID });
});
