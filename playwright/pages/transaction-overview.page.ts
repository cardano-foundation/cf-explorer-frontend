import { expect, Page } from "@playwright/test";
import moment from "moment";

import { TransactionInformationDto } from "playwright/api/dtos/transactionInformation.dto";

export function transactionOverviewPage(page: Page) {
  const firstTransactionInTable = page.getByTestId("transaction.table.value.txhash#0");
  const searchBarEpoch = page.getByTestId("all-filters-dropdown");
  const sidebarBlockchainButton = page.getByTestId("menu-button-blockchain");
  const epochsTab = page.getByTestId("submenu-button-transactions");
  const transactionTableTitleTxhash = page.getByTestId("transactions.table.title.txhash");
  const transactionTableTitleBlock = page.getByTestId("transactions.table.title.block");
  const transactionTableTitleEpoch = page.getByTestId("transactions.table.title.epoch");
  const transactionTableTitleSlot = page.getByTestId("transactions.table.title.slot");
  const transactionTableTitlelFees = page.getByTestId("transactions.table.title.fees");
  const transactionTableTitleOutputInAda = page.getByTestId("transactions.table.title.outputInAda");
  const transactionTableTitleInputAddress = page.getByTestId("transactions.table.title.inputAddress");
  const transactionTableTitleOutputAddress = page.getByTestId("transactions.table.title.outputAddress");
  const transactionTableValueSlot = page.getByTestId("transactions.table.value.slot#2");
  const transactionWidgetTrxSignature = page.getByTestId("transaction.widget.signersInformation");
  const addressDetailFromWidgetByInputAddress = page.getByTestId("transaction.widget.inputAddress");
  const transactionWidgeSummary = page.getByTestId("transaction.widget.summary");
  const transactionWidgeDetailViewBtn = page.getByTestId("transaction.detailViewEpoch.viewDetail");
  const transactionWidgeUtxo = page.getByTestId("transaction.widget.utxOs");

  const transactionWidgetEpochNo = page.getByTestId("transaction.widget.epoch");
  const transactionWidgetBlockNo = page.getByTestId("transaction.widget.block");
  const transactionWidgetSlotNo = page.getByTestId("transaction.widget.slot");
  const transactionWidgetCreatedAt = page.getByTestId("transaction.widget.createdAt");
  const transactionWidgetEpochSlot = page.getByTestId("transaction.widget.epochSlot");

  const goToTransactionDetailFromTable = async () => {
    await firstTransactionInTable.click();
  };

  const searchBarOnTransaction = async () => {
    await expect(searchBarEpoch).toHaveText("Transactions");
  };

  const goToEpochsFromSidebar = async () => {
    await sidebarBlockchainButton.click();
    await epochsTab.click();
  };

  const goToDashboard = async () => {
    await page.goto("/");
  };

  const goToTransactions = async () => {
    await page.goto("/transactions");
  };

  const goToTransactionDetailFromWidgetDetailViewBtn = async () => {
    await transactionWidgeDetailViewBtn.click();
  };
  const openWidget = async () => {
    await transactionTableValueSlot.click();
  };

  const goToAddrssDetailFromWidgetByInputAddress = async () => {
    await addressDetailFromWidgetByInputAddress.click();
  };

  const goToTransactionDetailFromWidgetBySumary = async () => {
    await transactionWidgeSummary.click();
  };

  const goToTransactionDetailFromWidgetByTrxTab = async () => {
    await transactionWidgetTrxSignature.click();
  };

  const goToTransactionDetailFromWidgetByUTXO = async () => {
    await transactionWidgeUtxo.click();
  };

  const openLastestTransactionWidget = async () => {
    await transactionTableValueSlot.click();
  };

  const checkCurrenTransactionWidget = async ({
    currentTransaction
  }: {
    currentTransaction: TransactionInformationDto[];
  }) => {
    expect(+((await transactionWidgetEpochNo.innerText()) || 0), "Check epoch on transaction widget").toEqual(
      currentTransaction[0].epoch_no
    );
    expect(+((await transactionWidgetBlockNo.innerText()) || 0), "Check block on transaction widget").toEqual(
      currentTransaction[0].block_height
    );
    expect(+((await transactionWidgetSlotNo.innerText()) || 0), "Check slot on transaction widget").toEqual(
      currentTransaction[0].absolute_slot
    );
    expect(
      moment((await transactionWidgetCreatedAt.textContent())?.replace(",", "")).unix(),
      "Check create time on transaction widget"
    ).toEqual(currentTransaction[0]?.tx_timestamp);
    expect(+((await transactionWidgetEpochSlot.innerText()) || 0), "Check epoch slot on transaction widget").toEqual(
      currentTransaction[0].epoch_slot
    );
  };

  const checkTransactionsTable = async () => {
    await expect(transactionTableTitleTxhash, "Check title on transaction table").toHaveText("Tx hash");
    await expect(transactionTableTitleBlock, "Check title on transaction table").toHaveText("Block");
    await expect(transactionTableTitleEpoch, "Check title on transaction table").toHaveText("Epoch");
    await expect(transactionTableTitleSlot, "Check title on transaction table").toHaveText("Slot");
    await expect(transactionTableTitlelFees, "Check title on transaction table").toHaveText("Fees");
    await expect(transactionTableTitleOutputInAda, "Check title on transaction table").toHaveText("Output in ADA");
    await expect(transactionTableTitleInputAddress, "Check title on transaction table").toHaveText("Input Address");
    await expect(transactionTableTitleOutputAddress, "Check title on transaction table").toHaveText("Output Address");
  };

  return {
    goToTransactionDetailFromTable,
    checkCurrenTransactionWidget,
    openWidget,
    searchBarOnTransaction,
    goToEpochsFromSidebar,
    goToDashboard,
    checkTransactionsTable,
    goToTransactions,
    openLastestTransactionWidget,
    goToAddrssDetailFromWidgetByInputAddress,
    goToTransactionDetailFromWidgetDetailViewBtn,
    goToTransactionDetailFromWidgetBySumary,
    goToTransactionDetailFromWidgetByUTXO,
    goToTransactionDetailFromWidgetByTrxTab
  };
}
