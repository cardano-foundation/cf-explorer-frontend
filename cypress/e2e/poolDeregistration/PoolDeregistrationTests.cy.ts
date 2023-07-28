import { PoolDeregistrationConstants } from "cypress/fixtures/constants/PoolDeregistrationConstants";
import PoolDeregistrationPage from "cypress/pagesobject/PoolDeregistration/PoolDeregistrationPage";

const poolDeregistrationPage = new PoolDeregistrationPage();

describe("pool deregistration page", () => {
  it("Check initialzation the screen", () => {
    poolDeregistrationPage
      .goToHomePage()
      .clickOnOperationalCertificatesMenu()
      .clickOnPoolDeregistrationMenu()
      .verifyPoolDeregistrationTable()
      .verifyDefaultPage('1')
      .verifyPagingNavigatorDisplay();
});

  it("Check display data of the pool deregistration table", () => {
    poolDeregistrationPage
    .goToPoolDeregistrationPage()
    .verifyPoolDeregistrationTable()
    .verifyDataOfTxHashColumn()
    .verifyDataOfCreateAtColumn()
    .verifyDataOfBlockColumn()
    .verifyDataOfPoolColumn()
    .verifyDataOfPledgeColumn()
    .verifyDataOfFixedCostColumn()
    .verifyDataOfMarginColumn()
    .verifyDataOfStakeAddressColumn()
  });

  it("Check action of all items in the screen", async () => {
    poolDeregistrationPage
    .goToPoolDeregistrationPage()
    .verifyPoolDeregistrationTable()
    .hoverToTxHash()
    .verifyDisplayFullData()
    .clickOnAnyTxHash()
    .verifyDisplayTransactionDetailPage()
    .goBackToPreviousPage()
    .clickOnSortTxHashBtn()
    .verifySortedData(PoolDeregistrationConstants.SORT[1], PoolDeregistrationConstants.COLUMN_NAME[1])
    .clickOnSortTxHashBtn()
    .verifySortedData(PoolDeregistrationConstants.SORT[0], PoolDeregistrationConstants.COLUMN_NAME[1])

    .clickToAnyBlock()
    .verifyDisplayBlockDetailPage()
    .goBackToPreviousPage()

    .clickOnAnyEpoch()
    .verifyDisplayEpochDetailPage()
    .goBackToPreviousPage()

    .hoverToPool()
    .verifyDisplayFullData();
    const poolName = await poolDeregistrationPage.getFirstPoolName();
    poolDeregistrationPage
    .clickOnFirstPool()
    .verifyDisplayPoolDetailPage(String (poolName))
    .goBackToPreviousPage()

    .clickOnSortPledgeBtn()
    .verifySortedData(PoolDeregistrationConstants.SORT[1], PoolDeregistrationConstants.COLUMN_NAME[4])
    .clickOnSortPledgeBtn()
    .verifySortedData(PoolDeregistrationConstants.SORT[0], PoolDeregistrationConstants.COLUMN_NAME[4])

    .clickOnSortFixedCostBtn()
    .verifySortedData(PoolDeregistrationConstants.SORT[1], PoolDeregistrationConstants.COLUMN_NAME[5])
    .clickOnSortFixedCostBtn()
    .verifySortedData(PoolDeregistrationConstants.SORT[0], PoolDeregistrationConstants.COLUMN_NAME[5])

    .clickOnSortMarginBtn()
    .verifySortedData(PoolDeregistrationConstants.SORT[1], PoolDeregistrationConstants.COLUMN_NAME[6])
    .clickOnSortMarginBtn()
    .verifySortedData(PoolDeregistrationConstants.SORT[0], PoolDeregistrationConstants.COLUMN_NAME[6])

    .hoverToStakeAddress()
    .verifyDisplayFullData()
    .clickOnAnyStakeAddress()
    .verifyDisplayStakeAddressDetailPage();
  });

  it("Check action of 'paging navigator' ", () => {
    let defaultNumberRecord = 50;
    poolDeregistrationPage
    .goToPoolDeregistrationPage()
    .verifyPoolDeregistrationTable()
    .verifyDefaultNumberRecord(defaultNumberRecord)

    .clickToPerPage()
    .verifyOptionPerPage()
    .selectOptionPerPage(PoolDeregistrationConstants.PER_PAGE[0])
    .verifyNumberRecordDisplay()
    
    .clickToPerPage()
    .verifyOptionPerPage()
    .selectOptionPerPage(PoolDeregistrationConstants.PER_PAGE[1])
    .verifyNumberRecordDisplay()
    
    .clickToPerPage()
    .verifyOptionPerPage()
    .selectOptionPerPage(PoolDeregistrationConstants.PER_PAGE[2])
    .verifyNumberRecordDisplay()
    
    .clickToPerPage()
    .verifyOptionPerPage()
    .selectOptionPerPage(PoolDeregistrationConstants.PER_PAGE[3])
    .verifyNumberRecordDisplay()
    
    .enterPageNumber("2")
    .verifyNextPagingSuccessfully()
    .verifyBackPagingSuccessfully()
    .clickOnLastestPageBtn()
    .verifyLastestPageBtnIsDisable()
    .clickOnFisrtPageBtn()
    .verifyFirstPageBtnIsDisable();
  });
});
