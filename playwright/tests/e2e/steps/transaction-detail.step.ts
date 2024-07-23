import { createBdd } from "playwright-bdd";

import { blockfrostApi } from "playwright/api/call-blockfrost/blockfrost.api";
import { smartContractlPage } from "playwright/pages/smart-contract.page";
import { stakeRegistrationPage } from "playwright/pages/stake-registration.page";
import { transactionDetailPage } from "playwright//pages/transaction-detail.page";
import { tokenPage } from "playwright/pages/token.page";
import { PoolRegistrationPage } from "playwright/pages/pool-registration.page";
import { PoolDeregistrationPage } from "playwright/pages/pool-deregistration.page";
import { stakeDelegationPage } from "playwright/pages/stake-delegation.page";
import { instantaneousReward } from "playwright/pages/instantaneous-reward.page";

const { Given, When, Then } = createBdd();

let CONTRACT_TRX_DETAIL_HASH = "";
let STAKE_CERT_TRX_DETAIL_HASH = "";
let MINTING_TRX_DETAIL_HASH = "";
let REGIS_POOL_CERT_TRX_DETAIL_HASH = "";
let DEREGIS_POOL_CERT_TRX_DETAIL_HASH = "";
let DELEGATION_CERT_TRX_DETAIL_HASH = "";
let INSTANTANEOUS_REWARD_TRX_DETAIL_HASH = "";

Given(/^the user is in the transaction detail page of a transactions with smart contract info$/, async ({ page }) => {
  await smartContractlPage(page).goToSmartContractPage();
  await smartContractlPage(page).goToSmartContractDetail();
  CONTRACT_TRX_DETAIL_HASH = (await page.getByTestId("sm.detail.trx.hash#0").getAttribute("aria-label")) || "";
  await transactionDetailPage(page).goToTracsactionDetailWithHash({
    transactionHash: CONTRACT_TRX_DETAIL_HASH
  });
});
When(/^the user open the contracts section$/, async ({ page }) => {
  await transactionDetailPage(page).openContractTab();
});
Then(/^the user should see the Contract data$/, async ({ page, request }) => {
  (await blockfrostApi(request).getTrxContractByHash(CONTRACT_TRX_DETAIL_HASH)).json().then(async (data) => {
    await transactionDetailPage(page).checkContractList({ data });
  });
});

Given(/^the user is in the transaction detail page of a transactions with smart contract$/, async ({ page }) => {
  await smartContractlPage(page).goToSmartContractPage();
  await smartContractlPage(page).goToSmartContractDetail();
  CONTRACT_TRX_DETAIL_HASH = (await page.getByTestId("sm.detail.trx.hash#0").getAttribute("aria-label")) || "";
  await transactionDetailPage(page).goToTracsactionDetailWithHash({
    transactionHash: CONTRACT_TRX_DETAIL_HASH
  });
});
Given(/^the user open the contracts section in transaction tab$/, async ({ page }) => {
  await transactionDetailPage(page).openContractTab();
});
When(/^the user selects the view contract button$/, async ({ page }) => {
  await transactionDetailPage(page).openContractDetail();
});
Then(
  /^the user should see the contract details with Redeemer, Compiled code, Reference inputs and Assets$/,
  async ({ page, request }) => {
    (await blockfrostApi(request).getTrxContractByHash(CONTRACT_TRX_DETAIL_HASH)).json().then(async (data) => {
      await transactionDetailPage(page).checkContractDetail({ data });
    });
  }
);

Given(
  /^the user is in the transaction detail page of a registration and deregistration address transaction$/,
  async ({ page }) => {
    await stakeRegistrationPage(page).goToStakeRegistrationPage();
    STAKE_CERT_TRX_DETAIL_HASH = (await page.getByTestId("stake.txHashValue#0").getAttribute("aria-label")) || "";
    await transactionDetailPage(page).goToTracsactionDetailWithHash({
      transactionHash: STAKE_CERT_TRX_DETAIL_HASH
    });
  }
);
When(/^the user selects the stake certificates section$/, async ({ page }) => {
  await transactionDetailPage(page).openStakeCertTab();
});
Then(/^the user should see the Stake adress registration and deregistration info$/, async ({ page, request }) => {
  (await blockfrostApi(request).getTrxStakeCertByHash(STAKE_CERT_TRX_DETAIL_HASH)).json().then(async (data) => {
    await transactionDetailPage(page).checkStakeCertTab({ data });
  });
});

//Todo
Given(/^the user is in the transaction detail page of a minting transaction$/, async ({ page }) => {
  await tokenPage(page).goToTokenPage();
  await tokenPage(page).goToTokenDetailPage();
  await tokenPage(page).openMintingTab();
  MINTING_TRX_DETAIL_HASH = (await page.getByTestId("token.detail.minting.trxHash#0").getAttribute("aria-label")) || "";
  await transactionDetailPage(page).goToTracsactionDetailWithHash({
    transactionHash: MINTING_TRX_DETAIL_HASH
  });
});
When(/^the user selects the minting section$/, async ({ page }) => {
  await transactionDetailPage(page).openMintingTab();
});
Then(/^the user should see the Minting data of the given transaction$/, async ({ page }) => {
  await transactionDetailPage(page).checkMintingTab();
});

Given(/^the user is in the transaction detail page of a pool registration transaction$/, async ({ page }) => {
  await PoolRegistrationPage(page).goToPoolRegistrationPage();
  REGIS_POOL_CERT_TRX_DETAIL_HASH =
    (await page.getByTestId("registrationPools.transactionHashValue#0").getAttribute("aria-label")) || "";
  await transactionDetailPage(page).goToTracsactionDetailWithHash({
    transactionHash: REGIS_POOL_CERT_TRX_DETAIL_HASH
  });
});
When(/^the user selects the pool certificates section$/, async ({ page }) => {
  await transactionDetailPage(page).openPoolCertTab();
});
Then(/^the user should see the Pool registration data of the given transaction$/, async ({ page, request }) => {
  (await blockfrostApi(request).getTrxRegisPoolCertByHash(REGIS_POOL_CERT_TRX_DETAIL_HASH))
    .json()
    .then(async (data) => {
      await transactionDetailPage(page).checkRegisPoolCertTab({ data });
    });
});

Given(/^the user is in the transaction detail page of a pool deregistration transaction$/, async ({ page }) => {
  await PoolDeregistrationPage(page).goToPoolDeregistrationPage();
  DEREGIS_POOL_CERT_TRX_DETAIL_HASH =
    (await page.getByTestId("registrationPools.transactionHashValue#0").getAttribute("aria-label")) || "";
  await transactionDetailPage(page).goToTracsactionDetailWithHash({
    transactionHash: DEREGIS_POOL_CERT_TRX_DETAIL_HASH
  });
});
When(/^the user selects the pool deregistration section$/, async ({ page }) => {
  await transactionDetailPage(page).openPoolCertTab();
});
Then(/^the user should see the Pool deregistration data of the given transaction$/, async ({ page, request }) => {
  (await blockfrostApi(request).getTrxDeregisPoolCertByHash(DEREGIS_POOL_CERT_TRX_DETAIL_HASH))
    .json()
    .then(async (data) => {
      await transactionDetailPage(page).checkDeregisPoolCertTab({ data });
    });
});

Given(/^the user is in the transaction detail page of a delegation transaction$/, async ({ page }) => {
  await stakeDelegationPage(page).goToStakeDelegationPage();
  DELEGATION_CERT_TRX_DETAIL_HASH =
    (await page.getByTestId("stakeDelegations.txHashValue#0").getAttribute("aria-label")) || "";
  await transactionDetailPage(page).goToTracsactionDetailWithHash({
    transactionHash: DELEGATION_CERT_TRX_DETAIL_HASH
  });
});
When(/^the user selects the delegations section$/, async ({ page }) => {
  await transactionDetailPage(page).openDelegationTab();
});
Then(/^the user should see the Delegations data of the given transaction$/, async ({ page, request }) => {
  (await blockfrostApi(request).getTrxDelegationCertByHash(DELEGATION_CERT_TRX_DETAIL_HASH))
    .json()
    .then(async (data) => {
      await transactionDetailPage(page).checkDelegationTab({ data });
    });
});

Given(/^the user is in the transaction detail page of a reward transaction$/, async ({ page }) => {
  await instantaneousReward(page).goToInstantaneousRewardPage();
  INSTANTANEOUS_REWARD_TRX_DETAIL_HASH =
    (await page.getByTestId("instaneousRewards.txHashValue#0").getAttribute("aria-label")) || "";
  await transactionDetailPage(page).goToTracsactionDetailWithHash({
    transactionHash: INSTANTANEOUS_REWARD_TRX_DETAIL_HASH
  });
});
When(/^the user selects the instantaneous reward section$/, async ({ page }) => {
  await transactionDetailPage(page).openInstantaneousRewardsTab();
});
Then(/^the user should see the Instantaneous Rewards data of the given transaction$/, async ({ page, request }) => {
  (await blockfrostApi(request).getTrxInstantaneousRewardByHash(INSTANTANEOUS_REWARD_TRX_DETAIL_HASH))
    .json()
    .then(async (data) => {
      await transactionDetailPage(page).checkInstantaneousRewardTab({ data });
    });
});
