import EpochPanel from "../../../pagesobject/Epoch/EpochPanel";

const epochPanel = new EpochPanel();
describe('Check action of Pagingp',()=>{
beforeEach(() => {
    epochPanel.goToEpochPage();
  })

it("Check action of Paging : Check paging navigator when gridview have ((10*n)+1) records", () => {
    epochPanel
              .clickOnPerPageDropdown()
              .changePerPageValue('10')
              .verifyPagingNavigatorDisplay(10)
              .clickToNextPageTillTheEndAndCheckNumberRecord('10')
              .verifyTotalPage('10')

});

it("Check action of Paging : Check button [Next>] is enabled", () => {
    epochPanel
              .clickToNextPageAndVerifyNextButtonIsEnable(50);
});

it("Check action of Paging : Check button [Next>] is disabled", () => {
    epochPanel
              .clickToTheEndPage()
              .verifyNextButtonIsDisable();
});

it("Check button [<Prev] is enabled", () => {
    epochPanel
              .clickToNextPageAndVerifyPrevButtonIsEnable(50);
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