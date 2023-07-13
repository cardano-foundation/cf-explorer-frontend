import EpochPanel from "../../../pagesobject/Epoch/EpochPanel";

const epochPanel = new EpochPanel();
describe('Check initialization the screen',()=>{
beforeEach(() => {
    epochPanel.goToEpochPage();
    epochPanel.goToSpecificEpochDetails('422');
  })
it.only("Check initalizing successfully when gridview have data", () => {
    epochPanel.verifyEpochDetailStatusIsDisplayed()
              .verifyBackButtonIsEnable()
              .verifyBlockNoIsHyperLink()
              .verifyBlockIDIsHyperLink()
              .verifySlotAlongWithEpoch()
              .verifyCreateAtTimeFormat()
              .verifyTransactionDisplayAmount()
              .verifyFeeDisplay()
              .verifyOutputDisplay()
              .verifyPagingNavigatorDisplay(20)
              .verifyDefaultInputPage('1');
              
});
})