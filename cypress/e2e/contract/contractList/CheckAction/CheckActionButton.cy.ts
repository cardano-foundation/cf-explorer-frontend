import ContractPage from "cypress/pagesobject/Contract/ContractPage";

const contractPage = new ContractPage();
describe('Check action of button in the "Contract lists" screen',()=>{
beforeEach(() => {
    contractPage.goToContractPage();
  })
it("Check action of hyperlink [Contract address] ", () => {
    contractPage.clickOnContractRecordRandomly()
                .verifyNavigatedToContractDetailPage()
})
it("Check action of hyperlink [Contract address] ", () => {
    contractPage.hoverOnContractRecordRandomly()
                .verifyAddressPopup()
});

it("Check action click on icon [Sort] of Balance ", () => {
    contractPage.clickOnBalanceRandomly()
                .verifyFieldNotClickable()
                .clickOnSortBalance()
                .verifyBalanceIsSorted('desc')
                .clickOnSortBalance()
                .verifyBalanceIsSorted('asc')
});

it("Check action click on [Value] ", () => {
    contractPage.clickOnValueRandomly()
                .verifyFieldNotClickable()
});

it("Check action click on icon [Sort] of Transaction Count", () => {
  contractPage.clickOnSortTransaction()
              .verifyTransactionIsSorted('desc')
              .clickOnSortTransaction()
              .verifyTransactionIsSorted('asc')
});

})