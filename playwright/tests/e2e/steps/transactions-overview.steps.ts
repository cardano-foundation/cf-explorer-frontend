import { createBdd } from "playwright-bdd";
import { expect } from "@playwright/test";

import { koiosApi } from "playwright/api/call-koios/koios.api";

import { transactionOverviewPage } from "../../../pages/transaction-overview.page";
import { transactionDetailPage } from "../../../pages/transaction-detail.page";

const { Given, When, Then } = createBdd();

let addressId: string | null;
let transactionHash: string | null;

Given(/^the user is in the general dashboard page in explorer portal test$/, async ({ page }) => {
  await transactionOverviewPage(page).goToDashboard();
});
When(/^the user selects the Transactions option inside the Blockchain drop down menu$/, async ({ page }) => {
  await transactionOverviewPage(page).goToEpochsFromSidebar();
});
Then(
  /^the user should see the transactions page containing the Search bar and Transactions table$/,
  async ({ page }) => {
    await transactionOverviewPage(page).searchBarOnTransaction();
    await transactionOverviewPage(page).checkTransactionsTable();
  }
);

Given(/^the user is in the transactions page in explorer portal site$/, async ({ page }) => {
  await transactionOverviewPage(page).goToTransactions();
});
When(
  /^the user selects any data of the row execpt the transaction hash, block number, epoch number or addresses hash of one of the transactions record in the table$/,
  async ({ page }) => {
    await transactionOverviewPage(page).openWidget();
  }
);
Then(
  /^the user should see the Info widget data with the respective data of the selected transaction$/,
  async ({ page, request }) => {
    const trxHash = await page.getByTestId("transaction.table.value.txhash#0");
    const ariaLabelValue = await trxHash?.getAttribute("aria-label");
    if (ariaLabelValue) {
      (await koiosApi(request).getTransactionByTrxHash(ariaLabelValue)).json().then(async (data) => {
        await transactionOverviewPage(page).checkCurrenTransactionWidget({ currentTransaction: data });
      });
    }
  }
);

Given(/^the user is in the Transactions page$/, async ({ page }) => {
  await transactionOverviewPage(page).goToTransactions();
});
When(
  /^the user selects the transaction hash of one record of the transactions table in the transactions page$/,
  async ({ page }) => {
    const transactionsTableValueEpoch = page.getByTestId("transaction.table.value.txhash#0");
    transactionHash = await transactionsTableValueEpoch.getAttribute("href");
    await transactionsTableValueEpoch.click();
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
    const transactionsTableValueEpoch = page.getByTestId("transaction.table.value.block#0");
    await transactionsTableValueEpoch.click();
  }
);
Then(/^the user should be redirected to the block detail page of the selected block number$/, async ({ page }) => {
  const deatailPageTitle = page.getByTestId("detail.page.title");
  await expect(deatailPageTitle, "Check title on block detail").toHaveText("Block Details");
});

Given(/^the user is in the Transactions page web$/, async ({ page }) => {
  await transactionOverviewPage(page).goToTransactions();
});
When(
  /^the user selects the epoch number of one record of the transactions table in the transactions page$/,
  async ({ page }) => {
    const transactionsTableValueEpoch = page.getByTestId("transactions.table.value.epoch#0");
    await transactionsTableValueEpoch.click();
  }
);
Then(/^the user should be redirected to the epoch detail page of the selected epoch number$/, async ({ page }) => {
  const deatailPageTitle = page.getByTestId("detail.page.title");
  await expect(deatailPageTitle, "Check title on epoch detail").toHaveText("Epoch Details");
});

Given(/^the user is in the Transactions page for go to address detail page$/, async ({ page }) => {
  await transactionOverviewPage(page).goToTransactions();
});
When(
  /^the user selects the input or output address of one record of the transactions table in the transactions page$/,
  async ({ page }) => {
    const transactionsTableValueEpoch = page.getByTestId("transaction.table.value.inputAddress#0").first();
    addressId = await transactionsTableValueEpoch.getAttribute("href");
    await transactionsTableValueEpoch.click();
  }
);
Then(/^the user should be redirected to the address details page of the selected address hash$/, async ({ page }) => {
  await transactionDetailPage(page).checkAddressDetail({ addressId: addressId || "" });
});

Then(/^the user should be redirected to the address detail page of the selected address hash$/, async ({ page }) => {
  const deatailPageTitle = page.getByTestId("detail.page.title");
  await expect(deatailPageTitle, "Check title on address detail").toHaveText("Address Details");
});

Given(
  /^the user is in the Transactions page for go to transaction detail from detail button in widget$/,
  async ({ page }) => {
    await transactionOverviewPage(page).goToTransactions();
  }
);
Given(
  /^the user open the info widget of one transaction record in the transactions table of transaction page$/,
  async ({ page }) => {
    await transactionOverviewPage(page).openLastestTransactionWidget();
  }
);
When(/^the user selects the view details button in the transcation info widget$/, async ({ page }) => {
  const transactionDetailFromWidgetDetailViewBtn = page.getByTestId("transaction.detailViewEpoch.viewDetail");
  transactionHash = await transactionDetailFromWidgetDetailViewBtn.getAttribute("href");
  await transactionDetailFromWidgetDetailViewBtn.click();
});
Then(/^the transaction details page of the selected transaction should be opened$/, async ({ page }) => {
  await transactionDetailPage(page).checkTransactionsDetail({ transactionHash: transactionHash || "" });
});

Given(/^the user is in the Transactions page to address detail from detail button in widget$/, async ({ page }) => {
  await transactionOverviewPage(page).goToTransactions();
});
Given(/^the user open the info widget of one transaction record in transaction web$/, async ({ page }) => {
  await transactionOverviewPage(page).openLastestTransactionWidget();
});
When(/^the user selects the Input or Output address hash in the transcation info widget$/, async ({ page }) => {
  const addressDetailProducer = page.getByTestId("transaction.widget.inputAddress");
  addressId = await addressDetailProducer.getAttribute("href");
  await addressDetailProducer.click();
});
Then(
  /^the user should be redirected to the address detail page of the selected input address hash$/,
  async ({ page }) => {
    await transactionDetailPage(page).checkAddressDetail({ addressId: addressId || "" });
  }
);

Given(
  /^the user is in the Transactions page for go to transaction detail from summary in widget$/,
  async ({ page }) => {
    await transactionOverviewPage(page).goToTransactions();
  }
);
Given(
  /^the user opens the info widget of any transaction in the transactions table from widget of transaction$/,
  async ({ page }) => {
    await transactionOverviewPage(page).openLastestTransactionWidget();
  }
);
When(/^the user selects the summary section in the info widget$/, async ({ page }) => {
  const transactionDetailFromWidgetBySumary = page.getByTestId("transaction.widget.summary");
  transactionHash = await transactionDetailFromWidgetBySumary.getAttribute("href");
  await transactionDetailFromWidgetBySumary.click();
});
Then(
  /^the transaction detail page of the selected transaction should be opened with the summary section displayed$/,
  async ({ page }) => {
    await transactionDetailPage(page).checkTransactionsDetail({ transactionHash: transactionHash || "" });
  }
);

Given(/^the user is in the Transactions page for go to transaction detail from widget$/, async ({ page }) => {
  await transactionOverviewPage(page).goToTransactions();
});
Given(/^the user opens the info widget of any transaction in the transactions table from widget$/, async ({ page }) => {
  await transactionOverviewPage(page).openLastestTransactionWidget();
});
When(/^the user selects the UTXOs section in the info widget of the selected transaction$/, async ({ page }) => {
  const transactionDetailFromWidgetByUTXO = page.getByTestId("transaction.widget.utxOs");
  transactionHash = await transactionDetailFromWidgetByUTXO.getAttribute("href");
  await transactionDetailFromWidgetByUTXO.click();
});
Then(
  /^the transaction detail page of the selected transaction should be opened with the UTXOs section displayed$/,
  async ({ page }) => {
    await transactionDetailPage(page).checkTransactionsDetail({ transactionHash: transactionHash || "" });
  }
);

Given(
  /^the user is in the Transactions page in the explorer page for go to transaction table from widget$/,
  async ({ page }) => {
    await transactionOverviewPage(page).goToTransactions();
  }
);
Given(
  /^the user opens the info widget of any transaction in the transactions table from widget tab$/,
  async ({ page }) => {
    await transactionOverviewPage(page).openLastestTransactionWidget();
  }
);
When(
  /^the user selects the transaction signatories section in the info widget of the selected transaction$/,
  async ({ page }) => {
    const transactionWidgetTrxSignature = page.getByTestId("transaction.widget.signersInformation");
    transactionHash = await transactionWidgetTrxSignature.getAttribute("href");
    await transactionWidgetTrxSignature.click();
  }
);
Then(
  /^the transaction detail page of the selected transaction should be opened with the transaction signatories section displayed$/,
  async ({ page }) => {
    await transactionDetailPage(page).checkTransactionsDetail({ transactionHash: transactionHash || "" });
  }
);
