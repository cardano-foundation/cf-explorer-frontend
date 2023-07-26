import ContractPage from "cypress/pagesobject/Contract/ContractPage";

const contractPage = new ContractPage();
describe('Check action of "Paging Navigator"',()=>{
beforeEach(() => {
    contractPage.goToContractPage()
                .clickOnContractRecordRandomly();
  })

it("Check action of Paging : Check paging navigator when gridview have ((10*n)+1) records", () => {
    //input randompage with parameter is per page value
    contractPage
              .clickOnPerPageDropdown()
              .changePerPageValue('10')
              .verifyPagingNavigatorDisplay(10)
              .verifyNumberOfBlockDisplayRow('10')
              .inputRandomPage('10')
              .verifyNumberOfBlockDisplayRow('10')
              .clickToTheEndPage()
              .verifyNumberOfBlockDisplayRow('10')
              .verifyTotalPage('10')

});

it("Check action of Paging : Check button [Next>] is enabled", () => {
    //input randompage with parameter is per page value
    contractPage.clickOnPerPageDropdown()
              .changePerPageValue('10')
              .inputRandomPage('10')
              .verifyNextButtonIsEnable()
              .inputRandomPage('10')
              .verifyNextButtonIsEnable()
              .inputRandomPage('10')
              .verifyNextButtonIsEnable();
});

it("Check action of Paging : Check button [Next>] is disabled", () => {
    contractPage.clickToTheEndPage()
                .verifyNextButtonIsDisable();
});

it("Check button [<Prev] is enabled", () => {
    contractPage.clickOnPerPageDropdown()
                .changePerPageValue('10')
                .inputRandomPage('10')
                .verifyPrevButtonIsEnable()
                .inputRandomPage('10')
                .verifyPrevButtonIsEnable()
                .inputRandomPage('10')
                .verifyPrevButtonIsEnable();
});

it("Check action of Paging : Check button [<Prev] is disabled", () => {
    contractPage.verifyDefaultInputPage('1')
                .verifyPrevButtonIsDisable();
});

it("Check action of Paging : Check input [Page] textbox success", () => {
    contractPage
              .verifyInputPage()
});

it("Check action of Paging : Check input [Page] textbox unsuccess", () => {
    contractPage
              .inputPage('0')
              .verifyDefaultInputPage('1')
              .inputPage('abc')
              .verifyDefaultInputPage('1')
              .inputPage('!@#$')
              .verifyDefaultInputPage('1')
});

it("Check action of Paging : Check button [<First page]", () => {
    contractPage.verifyFirstPageButtonIsDisable()
              .inputPage('2')
              .verifyFirstPageButtonIsEnable()
              .clickToTheFirstPage()
              .verifyDefaultInputPage('1');
});

it("Check action of Paging : Check button [<Last page]", () => {
    contractPage.verifyLastPageButtonIsEnable()
              .clickToTheEndPage()
              .verifyLastPageButtonIsDisable()
});
})