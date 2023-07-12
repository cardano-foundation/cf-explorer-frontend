import EpochPanel from "../../../pagesobject/Epoch/EpochPanel";

const epochPanel = new EpochPanel();

describe('Check action of all items at basic epoch popup',()=>{
beforeEach(() => {
    epochPanel.goToEpochPage();
  })

it("Check action of all items at basic epoch popup : Check action of [x] button", () => {
    epochPanel
              .clickOnOneEpochRecord()
              .verifyDetailEpochPopUpIsDisplayed()
              .clickOnCloseEpochDetailPopUp()
              .verifyEpochPopupDisapper()
});

it("Check action of all items at basic epoch popup : Check action of [View Details] icon/button", () => {
    epochPanel
              .clickOnOneEpochRecord()
              .verifyDetailEpochPopUpIsDisplayed()
              .clickOnViewDetailInEpochDetailPopUp()
              .verifyEpochDetail()
              
});

it("Check action of all items at basic epoch popup : Check action of tabs [Block] ", () => {
    epochPanel
              .clickOnOneEpochRecord()
              .verifyDetailEpochPopUpIsDisplayed()
              .clickOnBlockTabInEpochDetailPopUp()
              .verifyEpochDetail()
              
});
})
