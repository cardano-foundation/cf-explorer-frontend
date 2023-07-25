import { TransactionConstants } from "cypress/fixtures/constants/TransactionConstants";
import TransactionDetailPage from "../../pagesobject/transaction/TransactionDetailPage";
import TransactionListPage from "cypress/pagesobject/transaction/TransactionListPage";

const txnListPage = new TransactionListPage();
const txnDetailPage = new TransactionDetailPage();

describe("transaction detail", () => {
  it("Check initialzation the screen", () => {
    txnListPage
    .goToTransactionListPage();

    const txHash = txnListPage
    .getValueOfLastestTxHash();

    txnListPage
    .clickOnLastestTxHash();

    txnDetailPage
    .verifyTransactionDetailPage(String (txHash));

});

it("Check display transaction detail section", () => {
  txnListPage
  .goToTransactionListPage();

  const txHash = txnListPage.getValueOfLastestTxHash();
  const epoch = txnListPage.getEpochOfLastestTxn();
  const block = txnListPage.getBlockOfLastestTxn();
  const slot = txnListPage.getSlotOfLastestTxn();
  const fees = txnListPage.getFeesOfLastestTxn();
  const totalOutput = txnListPage.getTotalOutputOfLastestTxn();

  txnListPage
  .clickOnLastestTxHash();

  txnDetailPage
  .verifyTransactionDetailPage(String (txHash))
  .verifyDisplayDataOnTransactionDetailSection(String (epoch), String (block), String (slot), String (fees), String (totalOutput));

});

it("Check summary tab", () => {
  txnListPage
  .goToTransactionListPage();
  
  const txHash = txnListPage
  .getValueOfLastestTxHash();

  txnListPage
  .clickOnLastestTxHash();

  txnDetailPage
  .verifyTransactionDetailPage(String (txHash))
  .verifySummaryTab()
  .clickOnFromAddress()
  .verifyStakeAddressDetailPageDisplay()
  .goBackToPreviousPage()
  .clickOnToAddress()
  .verifyStakeAddressDetailPageDisplay()
});

it("Check utxo tab", () => {
  txnListPage
  .goToTransactionListPage();
  
  const txHash = txnListPage
  .getValueOfLastestTxHash();

  txnListPage
  .clickOnLastestTxHash();

  txnDetailPage
  .verifyTransactionDetailPage(String (txHash))
  .verifyUtxoTab()
  .clickOnRamdomlyInputAddress()
  .verifyAddressDetailPageDisplay()
  .goBackToPreviousPage()
  .clickOnRamdomlyOutputAddress()
  .verifyAddressDetailPageDisplay()
});

});
