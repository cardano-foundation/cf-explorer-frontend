import EpochPanel from "../../../pagesobject/Epoch/EpochPanel";

const epochPanel = new EpochPanel();
describe('Check action of Paging',()=>{
    const epochNumber = '422';
beforeEach(() => {
    epochPanel.goToEpochPage();
    epochPanel.goToSpecificEpochDetails(epochNumber);
  })

  it("Check action of pulldown on Paging", () => {
    epochPanel
              .verifyDefaulDisplayRow('50')
              .clickOnPerPageDropdown()
              .verifyDisplayRowSelection(['10','20','50','100'])
              .changePerPageValue('10')
              .verifyNumberOfBlockDisplayRow('10')
              .clickOnPerPageDropdown()
              .changePerPageValue('20')
              .verifyNumberOfBlockDisplayRow('20')
              .clickOnPerPageDropdown()
              .changePerPageValue('50')
              .verifyNumberOfBlockDisplayRow('50')
              .clickOnPerPageDropdown()
              .changePerPageValue('100')
              .verifyNumberOfBlockDisplayRow('100')
             
});

it("Check action of Paging : Check paging navigator when gridview have ((10*n)+1) records", () => {
    //input randompage with parameter is per page value
    epochPanel
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
    epochPanel.clickOnPerPageDropdown()
              .changePerPageValue('10')
              .inputRandomPage('10')
              .verifyNextButtonIsEnable()
              .inputRandomPage('10')
              .verifyNextButtonIsEnable()
              .inputRandomPage('10')
              .verifyNextButtonIsEnable();
});

it("Check action of Paging : Check button [Next>] is disabled", () => {
    epochPanel
              .clickToTheEndPage()
              .verifyNextButtonIsDisable();
});

it("Check button [<Prev] is enabled", () => {
    epochPanel.clickOnPerPageDropdown()
                .changePerPageValue('10')
                .inputRandomPage('10')
                .verifyPrevButtonIsEnable()
                .inputRandomPage('10')
                .verifyPrevButtonIsEnable()
                .inputRandomPage('10')
                .verifyPrevButtonIsEnable();
});

it("Check action of Paging : Check button [<Prev] is disabled", () => {
    epochPanel
              .verifyPrevButtonIsDisable();
});

it("Check action of Paging : Check input [Page] textbox success", () => {
    epochPanel
              .verifyInputPage()
});

it("Check action of Paging : Check input [Page] textbox unsuccess", () => {
    epochPanel
              .inputPage('0')
              .verifyDefaultInputPage('1')
              .inputPage('1')
              .verifyDefaultInputPage('1')
              .inputPage('abc')
              .verifyDefaultInputPage('1')
              .inputPage('!@#$')
              .verifyDefaultInputPage('1')
});

it("Check action of Paging : Check button [<First page]", () => {
    epochPanel.verifyFirstPageButtonIsDisable()
              .inputPage('2')
              .verifyFirstPageButtonIsEnable()
              .clickToTheFirstPage()
              .verifyDefaultInputPage('1');
});

it("Check action of Paging : Check button [<Last page]", () => {
    epochPanel.verifyLastPageButtonIsEnable()
              .clickToTheEndPage()
              .verifyLastPageButtonIsDisable()
});
})