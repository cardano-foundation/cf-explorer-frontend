import { expect, Page } from "@playwright/test";
import moment from "moment";

import { TransactionInformationDto } from "playwright/api/dtos/transactionInformation.dto";

export function transactionOverviewPage(page: Page) {
  const firstTransactionInTable = page.getByTestId("transaction.table.value.txhash#0");
  const firstBlockInTable = page.getByTestId("transaction.table.value.block#0");
  const firstEpochInTable = page.getByTestId("transactions.table.value.epoch#0");
  const transactionTableValueSlot = page.getByTestId("transactions.table.value.slot#0");
  const firstInputAddressInTable = page.getByTestId("transaction.table.value.inputAddress#0").first();

  const searchBarEpoch = page.getByTestId("all-filters-dropdown");
  const deatailPageTitle = page.getByTestId("detail.page.title");
  const sidebarBlockchainButton = page.getByTestId("menu-button-blockchain");
  const transactionTab = page.getByTestId("submenu-button-transactions");
  const transactionTableTitleTxhash = page.getByTestId("transactions.table.title.txhash");
  const transactionTableTitleBlock = page.getByTestId("transactions.table.title.block");
  const transactionTableTitleEpoch = page.getByTestId("transactions.table.title.epoch");
  const transactionTableTitleSlot = page.getByTestId("transactions.table.title.slot");
  const transactionTableTitlelFees = page.getByTestId("transactions.table.title.fees");
  const transactionTableTitleOutputInAda = page.getByTestId("transactions.table.title.outputInAda");
  const transactionTableTitleInputAddress = page.getByTestId("transactions.table.title.inputAddress");
  const transactionTableTitleOutputAddress = page.getByTestId("transactions.table.title.outputAddress");
  const transactionWidgeDetailViewBtn = page.getByTestId("transaction.detailViewEpoch.viewDetail");

  const addressDetailFromWidgetByInputAddress = page.getByTestId("transaction.widget.inputAddress");
  const transactionWidgetTrxSignature = page.getByTestId("transaction.widget.signersInformation");
  const transactionWidgeSummary = page.getByTestId("transaction.widget.summary");
  const transactionWidgeUtxo = page.getByTestId("transaction.widget.utxOs");
  const transactionWidgetEpochNo = page.getByTestId("transaction.widget.epoch");
  const transactionWidgetBlockNo = page.getByTestId("transaction.widget.block");
  const transactionWidgetSlotNo = page.getByTestId("transaction.widget.slot");
  const transactionWidgetCreatedAt = page.getByTestId("transaction.widget.createdAt");
  const transactionWidgetEpochSlot = page.getByTestId("transaction.widget.epochSlot");

  const getDetailBlockPageTitle = async () => {
    await expect(deatailPageTitle, "Check title on block detail").toHaveText("Block Details");
  };

  const getDetailEpochPageTitle = async () => {
    await expect(deatailPageTitle, "Check title on epoch detail").toHaveText("Epoch Details");
  };
  const getDetailAddressPageTitle = async () => {
    await expect(deatailPageTitle, "Check title on epoch detail").toHaveText("Address Details");
  };

  const goToTransactionDetailFromTable = async () => {
    await firstTransactionInTable.click();
  };

  const goToBlockDetailFromTable = async () => {
    await firstBlockInTable.click();
  };

  const goToEpochDetailFromTable = async () => {
    await firstEpochInTable.click();
  };

  const getAttributeTxHashWidget = async () => {
    const ariaLabelValue = await firstTransactionInTable?.getAttribute("aria-label");
    return ariaLabelValue;
  };

  const getLinkHrefByInputAddress = async () => {
    const addressId = await firstInputAddressInTable?.getAttribute("href");
    return addressId;
  };

  const getLinkHrefTxHash = async () => {
    const trxHash = await firstTransactionInTable?.getAttribute("href");
    return trxHash;
  };
  const getLinkHrefFromWidgeDetailViewBtn = async () => {
    const trxHash = await transactionWidgeDetailViewBtn?.getAttribute("href");
    return trxHash;
  };

  const getLinkHrefFromWidgetTrxSignature = async () => {
    const trxHash = await transactionWidgetTrxSignature?.getAttribute("href");
    return trxHash;
  };

  const getLinkHrefFromWidgetByUtxo = async () => {
    const trxHash = await transactionWidgeUtxo?.getAttribute("href");
    return trxHash;
  };
  const getLinkHrefFromWidgetBySummary = async () => {
    const trxHash = await transactionWidgeSummary?.getAttribute("href");
    return trxHash;
  };

  const getLinkHrefFromWidgetByInputAddress = async () => {
    const trxHash = await addressDetailFromWidgetByInputAddress?.getAttribute("href");
    return trxHash;
  };

  const searchBarOnTransaction = async () => {
    await expect(searchBarEpoch).toHaveText("Transactions");
  };

  const goToTransactionFromSidebar = async () => {
    await sidebarBlockchainButton.click();
    await transactionTab.click();
  };

  const goToDashboard = async () => {
    await page.goto("/");
  };

  const goToTransactions = async () => {
    await page.goto("/transactions");
  };

  const goToTrxDetailFromWidgetDetailViewBtn = async () => {
    await transactionWidgeDetailViewBtn.click();
  };

  const goToAddressDetailByInputAddreess = async () => {
    await firstInputAddressInTable.click();
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
    goToAddressDetailByInputAddreess,
    getLinkHrefByInputAddress,
    getDetailAddressPageTitle,
    getLinkHrefFromWidgetByInputAddress,
    getLinkHrefFromWidgetBySummary,
    getLinkHrefFromWidgetByUtxo,
    getLinkHrefFromWidgetTrxSignature,
    getLinkHrefFromWidgeDetailViewBtn,
    getDetailEpochPageTitle,
    goToEpochDetailFromTable,
    getDetailBlockPageTitle,
    getAttributeTxHashWidget,
    getLinkHrefTxHash,
    goToBlockDetailFromTable,
    goToTransactionDetailFromTable,
    checkCurrenTransactionWidget,
    openWidget,
    searchBarOnTransaction,
    goToTransactionFromSidebar,
    goToDashboard,
    checkTransactionsTable,
    goToTransactions,
    openLastestTransactionWidget,
    goToAddrssDetailFromWidgetByInputAddress,
    goToTrxDetailFromWidgetDetailViewBtn,
    goToTransactionDetailFromWidgetBySumary,
    goToTransactionDetailFromWidgetByUTXO,
    goToTransactionDetailFromWidgetByTrxTab
  };
}
