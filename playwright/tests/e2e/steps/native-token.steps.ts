import { createBdd } from "playwright-bdd";

import { blockfrostApi } from "playwright/api/call-blockfrost/blockfrost.api";
import { addressDetailPage } from "playwright/pages/address-detail.page";
import { blockDetailPage } from "playwright/pages/block-detail.page";
import { epochDetailPage } from "playwright/pages/epoch-detail.page";
import { nativeTokenPage } from "playwright/pages/native-token.page";
import { scriptDetailPage } from "playwright/pages/script-detail.page";
import { tokenDetailPage } from "playwright/pages/token-detail.page";
import { transactionDetailPage } from "playwright/pages/transaction-detail.page";

const { Given, When, Then } = createBdd();

let tokenID: string | null;
let scriptHash: string | null;
let transactionHash: string | null;
let address: string | null;
let epochNo: string | null;
let blockNo: string | null;

Given(/^the user is in the general dashboard page in explorer portal for go to tokens page$/, async ({ page }) => {
  await nativeTokenPage(page).goToDashboard();
});
When(/^the user selects the Native Tokens option inside the Blockchain drop down menu$/, async ({ page }) => {
  await nativeTokenPage(page).goToNativeTokenFromSidebar();
});
Then(/^the user should see the Tokens page containing the Search bar and Tokens table$/, async ({ page }) => {
  await nativeTokenPage(page).searchBarOnTokens();
  await nativeTokenPage(page).checkNativeTokenTable();
});

Given(/^the user is in the Native tokens page$/, async ({ page }) => {
  await nativeTokenPage(page).goToNativeTokens();
});
When(/^the user opens the info widget of a given token$/, async ({ page }) => {
  await nativeTokenPage(page).openWidget();
});
Then(
  /^the user should see the Info widget data with the same data of the selected token$/,
  async ({ page, request }) => {
    const policyName = await page.getByTestId("token.widget.policyName").getAttribute("data-policyName");
    (await blockfrostApi(request).getAssetNameByAssetToken(policyName)).json().then(async (data) => {
      await nativeTokenPage(page).checkCurrentTokenWidget({ currentNativeToken: data });
    });
  }
);

Given(/^the user is in the Natives Tokens page in explorer portal$/, async ({ page }) => {
  await nativeTokenPage(page).goToNativeTokens();
});
When(/^the user selects an Asset name of one of the Tokens record in the table$/, async ({ page }) => {
  await nativeTokenPage(page).goToTokensDetailPageFromTableByAssetName();
});
Then(/^the user should see the Token detail page of the selected Token in the table$/, async ({ page, request }) => {
  const policyName = await page.getByTestId("token.asset.name").getAttribute("data-assetName");
  (await blockfrostApi(request).getAssetNameByAssetToken(policyName)).json().then(async (data) => {
    await nativeTokenPage(page).checkCurrentAssetDetail({ currentNativeToken: data });
  });
});

Given(/^the user is in the Natives Tokens page in explorer portal page$/, async ({ page }) => {
  await nativeTokenPage(page).goToNativeTokens();
});
When(/^the user selects a Script hash of one of the Tokens record in the table$/, async ({ page }) => {
  await nativeTokenPage(page).goToTokensDetailPageFromTableByScripthash();
});
Then(/^the user should see the Script detail page of the selected Token in the table$/, async ({ page }) => {
  await nativeTokenPage(page).getDetailTokenPageTitle();
});

Given(/^the user is in the Native Tokens page in explorer portal$/, async ({ page }) => {
  await nativeTokenPage(page).goToNativeTokens();
});
Given(/^the user open the Token info detail widget of one of the tokens in the table$/, async ({ page }) => {
  await nativeTokenPage(page).openWidget();
});
When(/^the user selects the Token id into the token info detail widget$/, async ({ page }) => {
  tokenID = await nativeTokenPage(page).getLinkHrefFromWidgetByTokenID();
  await nativeTokenPage(page).goToTokenDetailFromWidgetByTokenId();
});
Then(/^the user should see the Token detail page of the selected token in the table$/, async ({ page }) => {
  await tokenDetailPage(page).checkTokenID({ tokenID: tokenID || "" });
});

Given(/^the user is in the Native Tokens page in explorer site$/, async ({ page }) => {
  await nativeTokenPage(page).goToNativeTokens();
});
Given(
  /^the user open the Token info detail widget of one of the tokens in the table in Token site$/,
  async ({ page }) => {
    await nativeTokenPage(page).openWidget();
  }
);
When(/^the user selects the script hash into the token info detail widget$/, async ({ page }) => {
  scriptHash = await nativeTokenPage(page).getLinkHrefFromWidgetByScriptHash();
  await nativeTokenPage(page).goToTokenDetailFromWidgetByScriptHash();
});
Then(/^the user should see the Script detail page of the selected token in the table$/, async ({ page }) => {
  await scriptDetailPage(page).checkScriptHash({ scriptHash: scriptHash || "" });
});

Given(/^the user is in the Native Tokens page in explorer portal web$/, async ({ page }) => {
  await nativeTokenPage(page).goToNativeTokens();
});
Given(/^the user open the Token info detail widget of one of the tokens in the table in web$/, async ({ page }) => {
  await nativeTokenPage(page).openWidget();
});
When(/^the user selects the one of the link sections into the token info detail widget in web$/, async ({ page }) => {
  tokenID = await nativeTokenPage(page).getLinkHrefFromWidgetByTransaction();
  await nativeTokenPage(page).goToTokenDetailFromWidgetByTransaction();
});
Then(
  /^the user should see the Token detail page with the displayed information section that was selected before$/,
  async ({ page }) => {
    await nativeTokenPage(page).searchBarOnTokens();
  }
);

Given(/^the user is in the Native tokens page in explorer portal page web$/, async ({ page }) => {
  await nativeTokenPage(page).goToNativeTokens();
});
Given(/^the user open the Token info detail widget of one of the tokens in the table page web$/, async ({ page }) => {
  await nativeTokenPage(page).openWidget();
});
When(/^the user selects the view details button page web$/, async ({ page }) => {
  tokenID = await nativeTokenPage(page).getLinkHrefFromWidgetByViewDetailBtn();
  await nativeTokenPage(page).goToTokenDetailFromWidgetByViewDetailBtn();
});
Then(/^the user should see the Token detail page of the selected block with the Search bar$/, async ({ page }) => {
  await tokenDetailPage(page).checkTokenID({ tokenID: tokenID || "" });
  await nativeTokenPage(page).searchBarOnTokens();
});

Given(/^the user open the detail page of a token in the native tokens page$/, async ({ page }) => {
  await nativeTokenPage(page).goToNativeTokens();
  await nativeTokenPage(page).goToTokensDetailPageFromTableByAssetName();
});
When(/^the user selects the Transaction hash of a transaction in the transactions table$/, async ({ page }) => {
  const nativeDetailTrxTableValueTrx = page.getByTestId("token.transaction.txHash#0");
  transactionHash = await nativeDetailTrxTableValueTrx.getAttribute("aria-label");
  await nativeTokenPage(page).goToTransactionDetailFromTransactionTableByTxHash();
});
Then(
  /^the user should be redirected to the transaction details page of the selected transaction$/,
  async ({ page }) => {
    await transactionDetailPage(page).checkTransactionsDetail({ transactionHash });
  }
);

Given(/^the user open the detail page of a token in the native tokens site$/, async ({ page }) => {
  await nativeTokenPage(page).goToNativeTokens();
  await nativeTokenPage(page).goToTokensDetailPageFromTableByAssetName();
});
When(/^the user selects the Block number in the transactions table$/, async ({ page }) => {
  const nativeDetailTrxTableValueEpcch = page.getByTestId("token.transaction.block#0");
  blockNo = await nativeDetailTrxTableValueEpcch.getAttribute("aria-label");
  await nativeTokenPage(page).goToBlockDetailFromTransactionTableByBlock();
});
Then(/^the user should be redirected to the Block details page of the selected block number$/, async ({ page }) => {
  await blockDetailPage(page).checkBlockDetail({ blockNo });
});

Given(/^the user open the detail page of a token in the native tokens web$/, async ({ page }) => {
  await nativeTokenPage(page).goToNativeTokens();
  await nativeTokenPage(page).goToTokensDetailPageFromTableByAssetName();
});
When(/^the user selects the Epoch number in the transactions table$/, async ({ page }) => {
  const nativeDetailTrxTableValueEpoch = page.getByTestId("token.transaction.epoch#0");
  epochNo = await nativeDetailTrxTableValueEpoch.getAttribute("aria-label");
  await nativeTokenPage(page).goToEpochDetailFromTransactionTableByEpoch();
});
Then(/^the user should be redirected to the Epoch details page of the selected epoch number$/, async ({ page }) => {
  await epochDetailPage(page).checkEpochDetail({ epochNo });
});

Given(/^the user open the detail page of a token in the native tokens page site$/, async ({ page }) => {
  await nativeTokenPage(page).goToNativeTokens();
  await nativeTokenPage(page).goToTokensDetailPageFromTableByAssetName();
});
When(/^the user selects the input addres link in the transactions table$/, async ({ page }) => {
  const nativeDetailTrxTableValueEpoch = page.getByTestId("token.transaction.epoch#0");
  epochNo = await nativeDetailTrxTableValueEpoch.getAttribute("aria-label");
  await nativeTokenPage(page).goToEpochDetailFromTransactionTableByEpoch();
});
Then(/^the user should be redirected to the Address details page of the selected address link$/, async ({ page }) => {
  await epochDetailPage(page).checkEpochDetail({ epochNo });
});

Given(/^the user open the detail page of a token in the native tokens page in web$/, async ({ page }) => {
  await nativeTokenPage(page).goToNativeTokens();
  await nativeTokenPage(page).goToTokensDetailPageFromTableByAssetName();
});
When(/^the user selects the input addres link in the transactions table in web$/, async ({ page }) => {
  const tokenDetailTrxTableValueAddr = page.getByTestId("token.transaction.address#0");
  address = await tokenDetailTrxTableValueAddr.getAttribute("aria-label");
  await nativeTokenPage(page).goToAddressDetailFromTransactionTableByAddress();
});
Then(
  /^the user should be redirected to the Address details page of the selected address link in web$/,
  async ({ page }) => {
    await addressDetailPage(page).checkAddressDetail({ address });
  }
);

Given(/^the user open the detail page of a token in the native tokens page in web site$/, async ({ page }) => {
  await nativeTokenPage(page).goToNativeTokens();
  await nativeTokenPage(page).goToTokensDetailPageFromTableByAssetName();
});
When(/^the user selects the addres link in the top holders section in web site$/, async ({ page }) => {
  const tokenDetailTrxTableValueAddr = page.getByTestId("token.transaction.address#0");
  address = await tokenDetailTrxTableValueAddr.getAttribute("aria-label");
  await nativeTokenPage(page).goToStakeAddressDetailFromTopHolderTableByAddress();
});
Then(
  /^the user should be redirected to the Address details page of the selected address link in web site$/,
  async ({ page }) => {
    await addressDetailPage(page).checkAddressDetail({ address });
  }
);

Given(/^the user open the detail page of a token in the native tokens in webpage$/, async ({ page }) => {
  await nativeTokenPage(page).goToNativeTokens();
  await nativeTokenPage(page).goToTokensDetailPageFromTableByAssetName();
});
When(/^the user selects the transaction hash in the minting section in webpage$/, async ({ page }) => {
  const tokenDetailTrxTableValueTrx = page.getByTestId("token.detail.minting.trxHash#0");
  transactionHash = await tokenDetailTrxTableValueTrx.getAttribute("aria-label");
  await nativeTokenPage(page).goToTransactionDetailFromMintingTableByTxHash();
});
Then(
  /^the user should be redirected to the Transaction details page of the selected transaction hash in webpage$/,
  async ({ page }) => {
    await transactionDetailPage(page).checkTransactionsDetail({ transactionHash });
  }
);
