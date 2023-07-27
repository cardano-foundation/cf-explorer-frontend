import EpochPanel from "../../../pagesobject/Epoch/EpochPanel";

const epochPanel = new EpochPanel();

describe('Check format data ',()=>{
beforeEach(() => {
    epochPanel.goToEpochPage();
  })

it("Check format data Start Timestamp, EndTime stamp Total Output", () => {
    epochPanel
              .clickOnOneEpochRecord()
              .verifyDetailEpochPopUpIsDisplayed()
              .verifyDetailEpochPopUpFormat()         
});
})
