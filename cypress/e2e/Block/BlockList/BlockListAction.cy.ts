import BlockPage from "../../../pagesobject/Block/BlockPage";
import {BlockConstants} from "../../../fixtures/constants/BlockConstants"
const blockPage = new BlockPage();
describe("block list", () => {
  it("Check action of all items in the screen", () => {

    blockPage
    .goToBlockPage()
    .clickToAnyBlock()
    .verifyBlockdetailScreenDisplay()
    .clickToCloseBtn();

    blockPage
    .hoverToBlockId()
    .verifyBlockIdShowFull()
    .clickToEpochCell()
    .verifyEpochDetailPageDisplay()
    .goBackToPreviousPage()
    .clickToTransactionBtn()
    .verifyTranSactionSorted(BlockConstants.SORT[1])
    .clickToTransactionBtn()
    .verifyTranSactionSorted(BlockConstants.SORT[0])
    .clickToQuickView()
    .verifyQuickViewModel()
    .verifyFormatCreatedDateOnQuickViewModel();
  });
  it("Check display data of side menu", () => {

    blockPage
    .goToBlockPage()
    .clickToQuickView()
    .verifyFormatCreatedDateOnQuickViewModel();
  });
  it("Check action click on side menu", () => {

    blockPage
    .goToBlockPage()
    .clickToQuickView()
    .verifyFormatCreatedDateOnQuickViewModel();
  });
  it("Check action of 'paging navigator' ", () => {
    let defaultPage = 50;
    blockPage
    .goToBlockPage()
    .verifyDefaultPageNumber(defaultPage)
    .clickToPerPage()
    .verifyEnoughChoiceInPerPage()
    .clickToPerPage()
    .selectAmountDataPerPage(BlockConstants.PER_PAGE[0])
    .verifyDesiredPageNumberMatchWithDataInList()
    .clickToPerPage()
    .selectAmountDataPerPage(BlockConstants.PER_PAGE[1])
    .verifyDesiredPageNumberMatchWithDataInList()
    .clickToPerPage()
    .selectAmountDataPerPage(BlockConstants.PER_PAGE[2])
    .verifyDesiredPageNumberMatchWithDataInList()
    .clickToPerPage()
    .selectAmountDataPerPage(BlockConstants.PER_PAGE[3])
    .verifyDesiredPageNumberMatchWithDataInList()
    
    .verifyClickNextBtnSuccessfully()
    .clickToNextLastPageBtn()
    .verifyNextLastPageBtnIsDisable()
    
    .clickToBackFisrtPageBtn()
    .verifyFirstPageBtnIsDisable();
  });
  it("Check input [Page] textbox success", () => {

    blockPage
    .goToBlockPage()
    .verifyPageWhenEnterPageNumber("-1")
    .verifyPageWhenEnterPageNumber("10")

  });
});
