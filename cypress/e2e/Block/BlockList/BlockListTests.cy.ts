import BlockPage from "../../../pagesobject/Block/BlockPage";
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
