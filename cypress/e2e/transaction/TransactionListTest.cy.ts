import { TransactionConstants } from "cypress/fixtures/constants/TransactionConstants";
import TransactionListPage from "../../pagesobject/transaction/TransactionListPage";

const txnListPage = new TransactionListPage();
describe("transaction list", () => {
  it("Check initialzation the screen", () => {
    txnListPage
      .goToHomePage()
      .clickToBlockChainMenu()
      .clickToTransactionMenu()
      .verifyTransactionListTable()
      .verifyDefaultPage('1')
      .verifyPagingNavigatorDisplay();
});

  it("Check display data of the transaction list table", () => {
    txnListPage
    .goToTransactionListPage()
    .verifyTransactionListTable()
    .verifyDataOfNoColumn()
    .verifyDataOfTxHashColumn()
    .verifyDataOfBlockColumn()
    .verifyDataOfFeesColumn()
    .verifyDataOfOutputInADAColumn()
    .verifyDataOfInputAddressColumn()
    .verifyDataOfOutputAddressColumn()
    .verifyDisplayQuickViews()
  });

  it("Check action of all items in the screen", () => {
    txnListPage
    .goToTransactionListPage()
    .verifyTransactionListTable()
    .hoverToTxHash()
    .verifyDisplayFullData()
    .clickOnAnyTxHash()
    .verifyDisplayTransactionDetailPage()
    .goBackToPreviousPage()
    .verifyTransactionListTable()

    .clickToAnyBlock()
    .verifyDisplayBlockDetailPage()
    .goBackToPreviousPage()
    .verifyTransactionListTable()

    .clickOnAnyEpoch()
    .verifyDisplayEpochDetailPage()
    .goBackToPreviousPage()
    .verifyTransactionListTable()

    .clickOnSortFeesBtn()
    .verifySortedData(TransactionConstants.SORT[1], TransactionConstants.COLUMN_NAME[3])
    .clickOnSortFeesBtn()
    .verifySortedData(TransactionConstants.SORT[0], TransactionConstants.COLUMN_NAME[3])

    .clickOnSortOutputInADABtn()
    .verifySortedData(TransactionConstants.SORT[1], TransactionConstants.COLUMN_NAME[4])
    .clickOnSortOutputInADABtn()
    .verifySortedData(TransactionConstants.SORT[0], TransactionConstants.COLUMN_NAME[4])

    .hoverToInputAddress()
    .verifyDisplayFullData()
    .clickOnAnyInputAddress()
    .verifyDisplayAddressDetailPage()
    .goBackToPreviousPage()
    .verifyTransactionListTable()

    .hoverToOutputAddress()
    .verifyDisplayFullData()
    .clickOnAnyOutputAddress()
    .verifyDisplayAddressDetailPage()
    .goBackToPreviousPage()
    .verifyTransactionListTable()
    
    .clickOnAnyQuickView()
    .verifyQuickViewPopup()
  });

  it("Check action on quick view popup", () => {

    txnListPage
    .goToTransactionListPage()
    .clickOnAnyRecord()
    .verifyQuickViewPopup()
    .hoverToTxHash()
    .verifyDisplayFullData()
    .clickOnTxHash()
    .verifyDisplayTransactionDetailPage()
    .goBackToPreviousPage()
    .verifyTransactionListTable()
    
    .clickOnAnyRecord()
    .verifyQuickViewPopup()
    .hoverToInput()
    .verifyDisplayFullData()
    .clickOnInput()
    .verifyDisplayAddressDetailPage()
    .goBackToPreviousPage()
    .verifyTransactionListTable()
    
    .clickOnAnyRecord()
    .verifyQuickViewPopup()
    .hoverToOutput()
    .verifyDisplayFullData()
    .clickOnOutput()
    .verifyDisplayAddressDetailPage()
    .goBackToPreviousPage()
    .verifyTransactionListTable()
  });

  it("Check action of 'paging navigator' ", () => {
    let defaultNumberRecord = 50;
    txnListPage
    .goToTransactionListPage()
    .verifyDefaultNumberRecord(defaultNumberRecord)

    .clickToPerPage()
    .verifyOptionPerPage()
    .selectOptionPerPage(TransactionConstants.PER_PAGE[0])
    .verifyNumberRecordDisplay()
    
    .clickToPerPage()
    .verifyOptionPerPage()
    .selectOptionPerPage(TransactionConstants.PER_PAGE[1])
    .verifyNumberRecordDisplay()
    
    .clickToPerPage()
    .verifyOptionPerPage()
    .selectOptionPerPage(TransactionConstants.PER_PAGE[2])
    .verifyNumberRecordDisplay()
    
    .clickToPerPage()
    .verifyOptionPerPage()
    .selectOptionPerPage(TransactionConstants.PER_PAGE[3])
    .verifyNumberRecordDisplay()
    
    .enterPageNumber("5")
    .verifyNextPagingSuccessfully()
    .verifyBackPagingSuccessfully()
    .clickOnLastestPageBtn()
    .verifyLastestPageBtnIsDisable()
    .clickOnFisrtPageBtn()
    .verifyFirstPageBtnIsDisable();
  });
});
