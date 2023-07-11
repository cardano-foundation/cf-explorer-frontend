import EpochPanel from "../../../pagesobject/EpochPanel";

const epochPanel = new EpochPanel();

it("Check action of all items at basic epoch popup : Check action of [x] button",{"retries": 0}, () => {
    // Set the viewport to match the screen size
    cy.viewport(1920,1080);

    epochPanel.goToHomePage();
    epochPanel.clickOnBlockChainDropDownList()
              .clickOnEpochPanel()
              .clickOnOneEpochRecord()
              .verifyDetailEpochPopUpIsDisplayed()
              .clickOnCloseEpochDetailPopUp()
              .verifyEpochPopupDisapper()
});

it("Check action of all items at basic epoch popup : Check action of [View Details] icon/button",{"retries": 0}, () => {
    // Set the viewport to match the screen size
    cy.viewport(1920,1080);

    epochPanel.goToHomePage();
    epochPanel.clickOnBlockChainDropDownList()
              .clickOnEpochPanel()
              .clickOnOneEpochRecord()
              .verifyDetailEpochPopUpIsDisplayed()
              .clickOnViewDetailInEpochDetailPopUp()
              .verifyEpochDetail()
              
});

it("Check action of all items at basic epoch popup : Check action of tabs [Block] ",{"retries": 0}, () => {
    // Set the viewport to match the screen size
    cy.viewport(1920,1080);

    epochPanel.goToHomePage();
    epochPanel.clickOnBlockChainDropDownList()
              .clickOnEpochPanel()
              .clickOnOneEpochRecord()
              .verifyDetailEpochPopUpIsDisplayed()
              .clickOnBlockTabInEpochDetailPopUp()
              .verifyEpochDetail()
              
});
