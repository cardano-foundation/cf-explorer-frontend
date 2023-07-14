import EpochPanel from "../../../pagesobject/Epoch/EpochPanel";

const epochPanel = new EpochPanel();
describe('Check action of all item on Blocks list section',()=>{

  const epochNumber = '422';

beforeEach(() => {
    epochPanel.goToEpochPage();
    epochPanel.goToSpecificEpochDetails(epochNumber);
  })
it("Check action of [Block number] text button", () => {
    epochPanel.clickOnBackButton()
              .verifyEpochCurrentDetailDisplay();  
});
})