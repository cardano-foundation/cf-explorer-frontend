import BlockPage from "../../pagesobject/Block/BlockPage";
const blockPage = new BlockPage();
describe("block list", () => {
  it("Check action of all items in the screen", () => {

    blockPage
    .goToBlockPage()
    .clickToAnyBlock();
  });
});
