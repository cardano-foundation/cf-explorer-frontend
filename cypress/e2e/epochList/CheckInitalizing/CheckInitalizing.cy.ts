import EpochPanel from "../../../pagesobject/Epoch/EpochPanel";

const epochPanel = new EpochPanel();
describe('Check initialization the screen',()=>{
beforeEach(() => {
    epochPanel.goToEpochPage();
  })
it("Check initalizing successfully when gridview have data", () => {
    epochPanel
              .verifyEpochNumberIsHyperLink()
              .verifyOrtherFieldIsTextLabel()
              .verifyDefaultInputPage('1')
              .verifyPagingNavigatorDisplay(10);
});

it("Check initalizing successfully when gridview have data current epoch", () => {
    epochPanel
              .verifyProgressCircleIsDisplayed()
              .verifyEpochCurrentDetailDisplay();
});
})