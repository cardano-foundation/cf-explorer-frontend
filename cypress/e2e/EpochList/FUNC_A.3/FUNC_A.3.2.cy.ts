import EpochPanel from "../../../pagesobject/EpochPanel";

const epochPanel = new EpochPanel();

it("Check format data Start Timestamp, EndTime stamp Total Output",{"retries": 0}, () => {
    // Set the viewport to match the screen size
    cy.viewport(1920,1080);

    epochPanel.goToHomePage();
    epochPanel.clickOnBlockChainDropDownList()
              .clickOnEpochPanel()
              .clickOnOneEpochRecord()
              .verifyDetailEpochPopUpIsDisplayed()
              .verifyDetailEpochPopUpFormat()
              
});
