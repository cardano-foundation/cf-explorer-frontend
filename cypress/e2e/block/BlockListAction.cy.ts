import BlockPage from "../../pagesobject/Block/BlockPage";
import {BlockConstants} from "../../fixtures/constants/BlockConstants"
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
    .verifyQuickViewModel();
  });
});
