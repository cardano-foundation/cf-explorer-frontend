import { expect, Page } from "@playwright/test";

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

  const goToAddressDetailByInputAddreess = async () => {
    await firstInputAddressInTable.click();
  };

  const openWidget = async () => {
    await transactionTableValueSlot.click();
  };

  const openLastestTransactionWidget = async () => {
    await transactionTableValueSlot.click();
  };

  const checkTransactionsTable = async () => {
    await expect(transactionTableTitleTxhash, "Check title on transaction table").toHaveText("Tx hash");
    await expect(transactionTableTitleBlock, "Check title on transaction table").toHaveText("Block");
    await expect(transactionTableTitleEpoch, "Check title on transaction table").toHaveText("Epoch");
    await expect(transactionTableTitleSlot, "Check title on transaction table").toHaveText("Slot");
    await expect(transactionTableTitlelFees, "Check title on transaction table").toHaveText("Fees");
  };

  return {
    goToAddressDetailByInputAddreess,
    getLinkHrefByInputAddress,
    getDetailAddressPageTitle,
    getDetailEpochPageTitle,
    goToEpochDetailFromTable,
    getDetailBlockPageTitle,
    getAttributeTxHashWidget,
    getLinkHrefTxHash,
    goToBlockDetailFromTable,
    goToTransactionDetailFromTable,
    openWidget,
    searchBarOnTransaction,
    goToTransactionFromSidebar,
    goToDashboard,
    checkTransactionsTable,
    goToTransactions,
    openLastestTransactionWidget
  };
}
