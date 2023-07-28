import PolicyPage from "cypress/pagesobject/policy/PolicyPage";

const policyPage = new PolicyPage();
describe('Check Policy Asset Holders list tab',()=>{
beforeEach(() => {
  policyPage.goToTokenPage()
            .clickPolicyIdRandomly()
            .clickTabPolicyAssetHolder();
  })

it("Check action of Paging : Check paging navigator when gridview have ((10*n)+1) records", () => {
    //input randompage with parameter is per page value
    policyPage
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
    policyPage.clickOnPerPageDropdown()
              .changePerPageValue('10')
              .inputRandomPage('10')
              .verifyNextButtonIsEnable()
              .inputRandomPage('10')
              .verifyNextButtonIsEnable()
              .inputRandomPage('10')
              .verifyNextButtonIsEnable();
});

it("Check action of Paging : Check button [Next>] is disabled", () => {
    policyPage.clickToTheEndPage()
                .verifyNextButtonIsDisable();
});

it("Check button [<Prev] is enabled", () => {
    policyPage.clickOnPerPageDropdown()
                .changePerPageValue('10')
                .inputRandomPage('10')
                .verifyPrevButtonIsEnable()
                .inputRandomPage('10')
                .verifyPrevButtonIsEnable()
                .inputRandomPage('10')
                .verifyPrevButtonIsEnable();
});

it("Check action of Paging : Check button [<Prev] is disabled", () => {
    policyPage.verifyDefaultInputPage('1')
                .verifyPrevButtonIsDisable();
});

it("Check action of Paging : Check input [Page] textbox success", () => {
    policyPage
              .verifyInputPage()
});

it("Check action of Paging : Check input [Page] textbox unsuccess", () => {
    policyPage
              .inputPage('0')
              .verifyDefaultInputPage('1')
              .inputPage('abc')
              .verifyDefaultInputPage('1')
              .inputPage('!@#$')
              .verifyDefaultInputPage('1')
});

it("Check action of Paging : Check button [<First page]", () => {
    policyPage.verifyFirstPageButtonIsDisable()
              .inputPage('2')
              .verifyFirstPageButtonIsEnable()
              .clickToTheFirstPage()
              .verifyDefaultInputPage('1');
});

it("Check action of Paging : Check button [<Last page]", () => {
    policyPage.verifyLastPageButtonIsEnable()
              .clickToTheEndPage()
              .verifyLastPageButtonIsDisable()
});
})