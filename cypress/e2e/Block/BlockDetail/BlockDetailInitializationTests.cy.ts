import BlockPage from "../../../pagesobject/Block/BlockPage";
import BlockDetailPage from "../../../pagesobject/Block/BlockDetailPage";
import Utils from "cypress/core/Utils";
import LoginPage from "cypress/pagesobject/LoginPage";
import ProfilePage from "cypress/pagesobject/ProfilePage";

const blockPage = new BlockPage();
const blockDetailPage = new BlockDetailPage();
const loginPage = new LoginPage();
const profilePage = new ProfilePage();
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

  it("Check action of all items in the screen", async () => {
    let randomBlock: number;
    const total = await blockPage
      .goToBlockPage()
      .getTotalBlock();
    randomBlock  = Utils.randomIntFromInterval(1, parseInt(total));
    blockPage
    .clickToRandomRow(randomBlock)
    .clickRamdomlyToEpoch()

    blockPage
    .verifyEpochDetailPageDisplay()
    .goBackToPreviousPage()
    blockDetailPage
    .clickRamdomlyToTxHash()
    .verifyTransactionDetailPageDisplay()
    .goBackToPreviousPage() 
    .hoverToTxHash()
    .verifytxHashShowFull()
    .goBackToPreviousPage()
    ;
  });
  it("Check action of all items in the screen", async () => {
    let randomBlock: number;
    const total = await blockPage
      .goToBlockPage()
      .getTotalBlock();
    randomBlock  = Utils.randomIntFromInterval(1, parseInt(total));
    blockPage
    .clickToRandomRow(randomBlock)
    .clickRandomlyToTransaction()
    .verifyAddressDetailPageDisplay()
    .goBackToPreviousPage()
    .hoverToAddress()
    .verifyTransactionShowFull()
    ;
  });
  it("Check action of 'Number items' pulldown", async () => {
    let randomBlock: number;
    const total = await blockPage
      .goToBlockPage()
      .getTotalBlock();
    randomBlock  = Utils.randomIntFromInterval(1, parseInt(total));
    blockPage
    .clickToRandomRow(randomBlock)
    .clickToPerPage()
    .verifyEnoughChoiceInPerPage()
    ;
  });
  it("Check display 'Bookmark' ", () => {
    const email = "binh.nguyen@sotatek.com";
    const password = "Test1234@";

    blockPage
    .goToHomePage();

    loginPage
    .clickToSignInBtn()
    .enterEmail(email)
    .enterPassword(password)
    .clickToLoginBtn();

    blockPage
    .goToProfilePage();

    profilePage
    .clickToBookMarkBtn()
    .verifyBookMarkColorIsBlue();
  });
  it.only("Check action click on [Bookmark] button ", async () => {
    let randomBlock: number;
    const email = "binh.nguyen@sotatek.com";
    const password = "Test1234@";

    blockPage
    .goToHomePage();

    loginPage
    .clickToSignInBtn()
    .enterEmail(email)
    .enterPassword(password)
    .clickToLoginBtn()
    .verifySignInSuccessFull();

    const total = blockPage
      .goToBlockPage()
      .getTotalBlock();
    randomBlock  = Utils.randomIntFromInterval(1, parseInt(await total));
    blockPage
    .goToBlockPage()
    .clickToRandomRow(randomBlock);

    const blockId = await blockDetailPage
    .getTextElementBlockValue();
    blockDetailPage
    .clickToBookMarkBtn();
    
    profilePage
    .gotoBookMark()
    .clickToBlockBtn()
    .verifyAddBlockToBookMarkSuccessfully(blockId);
  });
  
});
  