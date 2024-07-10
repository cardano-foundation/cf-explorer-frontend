import { createBdd } from "playwright-bdd";

import { blockfrostApi } from "playwright/api/call-blockfrost/blockfrost.api";

import { transactionDetailPage } from "../../../pages/transaction-detail.page";

const { Given, When, Then } = createBdd();

const CONTRACT_TRX_DETAIL_HASH = "591ed189690aa79cc20e66e388b6620d5336cb076577da8896365bb35868549a";
const STAKE_CERT_TRX_DETAIL_HASH = "d491e2f88bef044abcdec73b5746d3b8724d63b70430b129eba6ec1fe37b0a91";
const MINTING_TRX_DETAIL_HASH = "1e0612fbd127baddfcd555706de96b46c4d4363ac78c73ab4dee6e6a7bf61fe9";
const REGIS_POOL_CERT_TRX_DETAIL_HASH = "a96c79773b7506211eb56bf94886a2face17657d1009f52fb5ea05f19cc8823e";
const DEREGIS_POOL_CERT_TRX_DETAIL_HASH = "b6122442cb2e783087176ed621510c5657cf24d79296fe6285888847924b2541";
const DELEGATION_CERT_TRX_DETAIL_HASH = "841cca81da918feb9fa7257a34630eac95794be712ed3faae6df64f215ce25f2";
const INSTANTANEOUS_REWARD_TRX_DETAIL_HASH = "d689bee077e69269ea7e9e8f5b09f5f93af887c117cd7a1157d09bec209900dd";

Given(/^the user is in the transaction detail page of a transactions with smart contract info$/, async ({ page }) => {
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

Given(/^the user is in the transaction detail page of a minting transaction$/, async ({ page }) => {
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
