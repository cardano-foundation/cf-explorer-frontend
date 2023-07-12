import EpochPanel from "../../../pagesobject/Epoch/EpochPanel";

const epochPanel = new EpochPanel();
describe('Check initialization the screen',()=>{
beforeEach(() => {
    epochPanel.goToEpochPage();
  })
it.only("Check initalizing successfully when gridview have data", () => {
    epochPanel
              .verifyEpochNumberIsHyperLink()
              .verifyOrtherFieldIsTextLabel()
              .verifyDefaultInputPage('1')
              .verifyPagingNavigatorDisplay();
});
})