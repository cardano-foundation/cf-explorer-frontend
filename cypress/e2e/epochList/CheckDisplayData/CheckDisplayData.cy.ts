import EpochPanel from "../../../pagesobject/Epoch/EpochPanel";

const epochPanel = new EpochPanel();
describe('Check display data of Epoch list screen',()=>{
beforeEach(() => {
    epochPanel.goToEpochPage();
  })
it("Check display data of [Epoch number] column ", () => {
    epochPanel
              .verifyEpochRecordIsInDesc()
              .verifyProgressCircleIsDisplayed();
});

it("Check display data of [Transaction Count] column ", () => {
    epochPanel
              .verifyDisplayOfTransaction();
});

it("Check display data of [Start Timestamp] column  ", () => {
    epochPanel
              .verifyDateTimeFormat('Start Timestamp');
});

it("Check display data of [End Timestamp] column", () => {
    epochPanel
              .verifyDateTimeFormat('End Timestamp');
});

it("Check display data of [Blocks] column ", () => {
    epochPanel
              .verifyDisplayOfBlock();
});

it("Check display data of [Total Output] column ", () => {
    epochPanel
              .verifyDisplayOfTotalOutput();
});

it("Check display data of [Reward Distributed] column", () => {
    epochPanel
              .verifyDisplayOfRewardDistributed();
});
})