import EpochPanel from "../../../pagesobject/Epoch/EpochPanel";

const epochPanel = new EpochPanel();
describe('Check action click on button of Epoch Information ',()=>{

  const epochNumber = '422';
beforeEach(() => {
    epochPanel.goToEpochPage();
    epochPanel.goToSpecificEpochDetails(epochNumber);
  })
it("Check action click on [Back] button ", () => {
    epochPanel.clickOnBackButton()
              .verifyEpochCurrentDetailDisplay();  
});

it("Check action click on [Bookmark] button ", () => {
    epochPanel.signIn()
              .clickBookMark()
              .verifyBookMarkButtonStatusChanged()
              .verifyMessagePopUpDisplayed()
              .verifyClickProfile()
              .clickOnBookMarkPanelThenVerify(epochNumber)
              .clickDeleteBookmark() ;  
});

it("Check display ticket details screen will be saved in personal log", () => {
    epochPanel.signIn()
              .clickBookMark()
              .verifyBookMarkButtonStatusChanged()
              .verifyMessagePopUpDisplayed()
              .verifyClickProfile()
              .clickOnBookMarkPanelThenVerify(epochNumber)
              .clickOnSignOutButton()
              .signIn()
              .clickOnBookMarkPanelThenVerify(epochNumber)
              .clickDeleteBookmark();  
});
})