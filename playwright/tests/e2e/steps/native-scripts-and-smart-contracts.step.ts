import { createBdd } from "playwright-bdd";

import { addressDetailPage } from "playwright/pages/address-detail.page";
import { nativeScriptAndSmartContractPage } from "playwright/pages/native-scripts-and-smart-contracts.page";
import { tokenDetailPage } from "playwright/pages/token-detail.page";
import { transactionDetailPage } from "playwright/pages/transaction-detail.page";

const { Given, When, Then } = createBdd();

let tokenId = "";
let address = "";
let trxHash = "";

Given(/^the user is in the general dashboard page in explorer portal for show native page$/, async ({ page }) => {
  await nativeScriptAndSmartContractPage(page).goToDashboard();
});
When(
  /^the user selects the Native scirpts and Smart Contracts option inside the Blockchain drop down menu for show native page$/,
  async ({ page }) => {
    await nativeScriptAndSmartContractPage(page).goToNativeAndContractFromSidebar();
  }
);
Then(/^the user should see the Native scipts page containing the Native srcipt info$/, async ({ page }) => {
  await nativeScriptAndSmartContractPage(page).checkNativeScriptTab();
});

Given(/^the user is in the general dashboard page in explorer portal for show contract page$/, async ({ page }) => {
  await nativeScriptAndSmartContractPage(page).goToDashboard();
});
Given(
  /^the user selects the Native scirpts and Smart Contracts option inside the Blockchain drop down menu for show contract page$/,
  async ({ page }) => {
    await nativeScriptAndSmartContractPage(page).goToNativeAndContractFromSidebar();
  }
);
When(/^the user selects the Smart Contract section$/, async ({ page }) => {
  await nativeScriptAndSmartContractPage(page).selectSmartContractTab();
});
Then(/^the user should see the Smart Contract info$/, async ({ page }) => {
  await nativeScriptAndSmartContractPage(page).checkSmartContractTab();
});

Given(/^the user is in the Native Scripts and Smart contracts view for time-locked filter$/, async ({ page }) => {
  await nativeScriptAndSmartContractPage(page).goTo();
});
Given(/^the user selects the filter option in the native script section$/, async ({ page }) => {
  await nativeScriptAndSmartContractPage(page).openNativeScriptFilter();
});
When(/^the user filter by time locked in open status$/, async ({ page }) => {
  nativeScriptAndSmartContractPage(page).chooseTimeLockedFilter();
});
Then(/^the user should see just the native scripts with time-licked in open status$/, async ({ page }) => {
  nativeScriptAndSmartContractPage(page).checkNativeTimeLockedFilter();
});

Given(/^the user is in the Native Scripts and Smart contracts view for multi-sig filter$/, async ({ page }) => {
  await nativeScriptAndSmartContractPage(page).goTo();
});
Given(/^the user selects the filter option in the native scripts section$/, async ({ page }) => {
  await nativeScriptAndSmartContractPage(page).openNativeScriptFilter();
});
When(/^the user filter by multi-sig selecting "yes" option$/, async ({ page }) => {
  nativeScriptAndSmartContractPage(page).chooseMultiSigFilter();
});
Then(/^the user should see just the native scripts with multi-sig label$/, async ({ page }) => {
  nativeScriptAndSmartContractPage(page).checkNativeMultiSigFilter();
});

Given(/^the user is in the Native Scripts and Smart contracts view for version filter$/, async ({ page }) => {
  await nativeScriptAndSmartContractPage(page).goTo();
});
Given(/^the user selects the Smart contract section$/, async ({ page }) => {
  await nativeScriptAndSmartContractPage(page).selectSmartContractTab();
});
Given(/^the user select the filter in the smart contract section$/, async ({ page }) => {
  await nativeScriptAndSmartContractPage(page).openSmartContractFilter();
});
When(/^the user filter by version selecting "Plutus V2" option$/, async ({ page }) => {
  nativeScriptAndSmartContractPage(page).chooseVertionFilter();
});
Then(/^the user should see just the smart contracts with "Plutus V2" version$/, async ({ page }) => {
  await nativeScriptAndSmartContractPage(page).checkVersionContractFilter();
});

Given(
  /^the user is in the Native Scripts and Smart contracts view for native script hash filter$/,
  async ({ page }) => {
    await nativeScriptAndSmartContractPage(page).goTo();
  }
);
When(/^the user selects the script hash of one of the native scripts cards$/, async ({ page }) => {
  await nativeScriptAndSmartContractPage(page).clickNativeCard();
});
Then(
  /^the user should see the Native Script Details page of the selected native script containing the Minting Burning policy data, the Script info, the Token table and the Asset Holders table$/,
  async ({ page }) => {
    await nativeScriptAndSmartContractPage(page).checkNativeScriptDetail();
  }
);

Given(/^the user is in the Native Scripts details page of one native script go to token detail$/, async ({ page }) => {
  await nativeScriptAndSmartContractPage(page).goTo();
  await nativeScriptAndSmartContractPage(page).clickNativeCard();
});
Given(/^the user open the Tokens table$/, async ({ page }) => {
  await nativeScriptAndSmartContractPage(page).clickNativeDetailTokenTab();
});
When(/^the user selects the token ID of any token in the tokens table$/, async ({ page }) => {
  const versionContractValue = page.getByTestId("ns.detail.token.tokenid#0");
  tokenId = (await versionContractValue.getAttribute("aria-label")) || "";
  versionContractValue.click();
});
Then(/^the user should be redirected to the tokens details page of the selected token ID$/, async ({ page }) => {
  await tokenDetailPage(page).checkTokenDetail({ tokenId });
});

Given(
  /^the user is in the Native Scripts and Smart contracts view for contract script hash filter$/,
  async ({ page }) => {
    await nativeScriptAndSmartContractPage(page).goTo();
  }
);
Given(/^the user opens the Smart contracts section$/, async ({ page }) => {
  await nativeScriptAndSmartContractPage(page).selectSmartContractTab();
});
When(/^the user selects the script hash of one of the smart contract cards$/, async ({ page }) => {
  await nativeScriptAndSmartContractPage(page).clickContractCard();
});
Then(
  /^the user should see the Smart contract Details page of the selected smart contract containing the Script hash, version and Transactions table$/,
  async ({ page }) => {
    await nativeScriptAndSmartContractPage(page).checkSmartContractDetail();
  }
);

Given(/^the user is in the Native Scripts details page of one native script$/, async ({ page }) => {
  await nativeScriptAndSmartContractPage(page).goTo();
  await nativeScriptAndSmartContractPage(page).clickNativeCard();
});
Given(/^the user open the Asset holders table$/, async ({ page }) => {
  await nativeScriptAndSmartContractPage(page).chooseAssetHolderTab();
});
When(/^the user selects the Address ID of one of the records in the Asset holders table$/, async ({ page }) => {
  // todoÏ
  const addressHolder = page.getByTestId("ns.detail.assetHolder#0");
  address = (await addressHolder.getAttribute("aria-label")) || "";
  addressHolder.click();
});
Then(/^the user should be redirected to the Address details page of the selected Address ID$/, async ({ page }) => {
  await addressDetailPage(page).checkAddressDetail({ address });
});

Given(/^the user is in the Smart contract details page of one smart contract transactions$/, async ({ page }) => {
  await nativeScriptAndSmartContractPage(page).goTo();
  await nativeScriptAndSmartContractPage(page).selectSmartContractTab();
  await nativeScriptAndSmartContractPage(page).clickContractCard();
});
When(
  /^the user selects the transaction hash of one of the records in the transactions table in Smart Contract details$/,
  async ({ page }) => {
    const transactionHash = page.getByTestId("sm.detail.trxHash#0");
    trxHash = (await transactionHash.getAttribute("aria-label")) || "";
    transactionHash.click();
  }
);
Then(
  /^the user should be redirected to the Transaction details page of the selected transaction hash$/,
  async ({ page }) => {
    await transactionDetailPage(page).checkTransactionsDetail({ transactionHash: trxHash });
  }
);

Given(/^the user is in the Smart contract details page of one smart contract$/, async ({ page }) => {
  await nativeScriptAndSmartContractPage(page).goTo();
  await nativeScriptAndSmartContractPage(page).selectSmartContractTab();
  await nativeScriptAndSmartContractPage(page).clickContractCard();
});
When(/^the user selects the transaction hash of one of the records in the transactions table$/, async ({ page }) => {
  const transactionHash = page.getByTestId("sm.detail.trxHash#0");
  trxHash = (await transactionHash.getAttribute("aria-label")) || "";
  transactionHash.click();
});
Then(
  /^user should see the selected smart contract hash with the same purpose in the contracts section of the transaction details page$/,
  async ({ page }) => {
    await transactionDetailPage(page).checkTransactionsDetail({ transactionHash: trxHash });
  }
);
