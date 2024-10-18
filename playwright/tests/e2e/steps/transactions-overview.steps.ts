import { createBdd } from "playwright-bdd";

import { transactionOverviewPage } from "../../../pages/transaction-overview.page";
import { transactionDetailPage } from "../../../pages/transaction-detail.page";
import { addressDetailPage } from "../../../pages/address-detail.page";

const { Given, When, Then } = createBdd();

let addressId: string | null;
let transactionHash: string | null;

Given(/^the user is in the general dashboard page in explorer portal test$/, async ({ page }) => {
  await transactionOverviewPage(page).goToDashboard();
});
When(/^the user selects the Transactions option inside the Blockchain drop down menu$/, async ({ page }) => {
  await transactionOverviewPage(page).goToTransactionFromSidebar();
});
Then(
  /^the user should see the transactions page containing the Search bar and Transactions table$/,
  async ({ page }) => {
    await transactionOverviewPage(page).searchBarOnTransaction();
    await transactionOverviewPage(page).checkTransactionsTable();
  }
);

Given(/^the user is in the Transactions page$/, async ({ page }) => {
  await transactionOverviewPage(page).goToTransactions();
});
When(
  /^the user selects the transaction hash of one record of the transactions table in the transactions page$/,
  async ({ page }) => {
    transactionHash = await transactionOverviewPage(page).getLinkHrefTxHash();
    await transactionOverviewPage(page).goToTransactionDetailFromTable();
  }
);
Then(/^the transaction details page of the select transaction should be opened$/, async ({ page }) => {
  await transactionDetailPage(page).checkTransactionsDetail({ transactionHash: transactionHash || "" });
});

Given(/^the user is in the Transactions page portal$/, async ({ page }) => {
  await transactionOverviewPage(page).goToTransactions();
});
When(
  /^the user selects the block number of one record of the transactions table in the transactions page$/,
  async ({ page }) => {
    await transactionOverviewPage(page).goToBlockDetailFromTable();
  }
);
Then(/^the user should be redirected to the block detail page of the selected block number$/, async ({ page }) => {
  await transactionOverviewPage(page).getDetailBlockPageTitle();
});

Given(/^the user is in the Transactions page web$/, async ({ page }) => {
  await transactionOverviewPage(page).goToTransactions();
});
When(
  /^the user selects the epoch number of one record of the transactions table in the transactions page$/,
  async ({ page }) => {
    await transactionOverviewPage(page).goToEpochDetailFromTable();
  }
);
Then(/^the user should be redirected to the epoch detail page of the selected epoch number$/, async ({ page }) => {
  await transactionOverviewPage(page).getDetailEpochPageTitle();
});

Given(/^the user is in the Transactions page for go to address detail page$/, async ({ page }) => {
  await transactionOverviewPage(page).goToTransactions();
});
When(
  /^the user selects the input or output address of one record of the transactions table in the transactions page$/,
  async ({ page }) => {
    addressId = await transactionOverviewPage(page).getLinkHrefByInputAddress();
    await transactionOverviewPage(page).goToAddressDetailByInputAddreess();
  }
);
Then(/^the user should be redirected to the address details page of the selected address hash$/, async ({ page }) => {
  await addressDetailPage(page).checkAddressDetail({ address: addressId || "" });
});
