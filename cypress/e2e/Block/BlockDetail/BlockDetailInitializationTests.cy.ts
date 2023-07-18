import BlockPage from "../../../pagesobject/Block/BlockPage";
import BlockDetailPage from "../../../pagesobject/Block/BlockDetailPage";
import Utils from "cypress/core/Utils";

const blockPage = new BlockPage();
const blockDetailPage = new BlockDetailPage();
describe("block list", () => {
  it("Check initialzation the screen", async () => {
    let randomBlock: number;
    const total = await blockPage
      .goToBlockPage()
      .getTotalBlock();
    randomBlock  = Utils.randomIntFromInterval(1, parseInt(total));
    blockPage
    .clickToRandomRow(randomBlock)
    .verifyBlockintilizingScreen();
  });
  it("Check display data of the Block Detail", async () => {
    let randomBlock: number;
    const total = await blockPage
      .goToBlockPage()
      .getTotalBlock();
    randomBlock  = Utils.randomIntFromInterval(1, parseInt(total));
    blockPage
    .clickToRandomRow(randomBlock)
    .verifyBlockintilizingScreen()
    .verifyBlockIdDisplayFull()
    .verifyFormatTimeCreatedAt()
    .verifyBlockValueDisplay()
    .veriyTransactionFeesColumn()
    .verifyBlockDisplayCorrectly()
    ;
  });
});
 