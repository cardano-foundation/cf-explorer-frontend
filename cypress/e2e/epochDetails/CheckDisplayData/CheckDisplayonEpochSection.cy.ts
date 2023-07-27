import EpochPanel from "../../../pagesobject/Epoch/EpochPanel";

const epochPanel = new EpochPanel();
describe('Check display data on Epoch information section',()=>{
beforeEach(() => {
    epochPanel.goToEpochPage();
    epochPanel.goToSpecificEpochDetails('422');
  })
it("Check display data on Epoch information section", () => {
    epochPanel.verifyEpochDetailStatusIsDisplayed()
              .verifyEpochDetailsDateTimeFormat()  
              .verifyEpochDetailsTotalOutputDisplay()
              .verifyEpochDetailsSlotDisplay();  
});
})