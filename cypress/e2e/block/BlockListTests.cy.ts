import BlockPage from "../../pagesobject/block/BlockPage";
const { viewportWidth, viewportHeight } = Cypress.config()
const blockPage = new BlockPage();
describe("block list", () => {
  it("Check initialzation the screen", () => {

    blockPage
      .goToHomePage()
      .clickToBlockChainField()
      .clickToBlocksField()
      .verifyColumnName()
      .verifySortBtnEnable()
      .verifyDesiredPageNumberMatchWithDataInList();
  });
});
