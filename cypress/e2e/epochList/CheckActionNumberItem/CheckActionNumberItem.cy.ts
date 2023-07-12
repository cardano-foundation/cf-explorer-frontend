import EpochPanel from "../../../pagesobject/Epoch/EpochPanel";

const epochPanel = new EpochPanel();
describe('Check action of "Number items" pulldown',()=>{
beforeEach(() => {
    epochPanel.goToEpochPage();
  })
it("Check action of 'Number items' pulldown", () => {
    epochPanel
              .verifyDefaulDisplayRow('50')
              .clickOnPerPageDropdown()
              .verifyDisplayRowSelection(['10','20','50','100'])
              .changePerPageValue('10')
              .verifyNumberOfDisplayRow('10')
              .clickOnPerPageDropdown()
              .changePerPageValue('20')
              .verifyNumberOfDisplayRow('20')
              .clickOnPerPageDropdown()
              .changePerPageValue('50')
              .verifyNumberOfDisplayRow('50')
              .clickOnPerPageDropdown()
              .changePerPageValue('100')
              .verifyNumberOfDisplayRow('100')
             
});
})